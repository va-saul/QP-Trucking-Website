const { test, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const crm = require("../src/lib/momentum-crm");

// Compile the real /api/lead route in memory to verify full end-to-end integration.
const filename = path.resolve("src/app/api/lead/route.ts");
const route = new Module(filename, module);
route.filename = filename;
route.paths = module.paths;
route._compile(
  ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText,
  filename
);
const { POST } = route.exports;

const originalFetch = global.fetch;
const originalEnv = { ...process.env };

afterEach(() => {
  global.fetch = originalFetch;
  crm.clearMomentumCaches();
  for (const k of Object.keys(process.env)) {
    if (!(k in originalEnv)) delete process.env[k];
  }
  for (const [k, v] of Object.entries(originalEnv)) {
    process.env[k] = v;
  }
});

test("normalizes Consultation & Quick Quote LeadForm payloads into standard contact + custom fields + tags", () => {
  const quote = crm.normalizeSubmission({
    name: "Jordan A. Reeves",
    phone: "(502) 555-0134",
    email: "jordan@reevestransport.test",
    company: "Reeves Transport LLC",
    service: "Trucking insurance",
    fleet: "2–5 trucks",
    dot: "USDOT 5681380",
    radius: "Long-haul (500+ miles)",
    message: "Need COI by Friday",
    source: "quote",
    page: "/insurance",
  });

  assert.equal(quote.formKind, "insurance-quote");
  assert.equal(quote.standardContact.firstName, "Jordan");
  assert.equal(quote.standardContact.lastName, "A. Reeves");
  assert.equal(quote.standardContact.phone, "+15025550134");
  assert.equal(quote.standardContact.companyName, "Reeves Transport LLC");
  assert.equal(quote.fieldValues.dotNumber, "5681380");
  assert.equal(quote.fieldValues.fleet, "2–5 trucks");
  assert.equal(quote.fieldValues.radius, "Long-haul (500+ miles)");
  assert.ok(quote.standardContact.tags.includes("insurance-quote"));
  assert.ok(quote.standardContact.tags.includes("nowcerts-prospect"));
});

test("normalizes EquipmentFinanceForm payload: parses city/state/zip, aliases EIN/SSN, masks SSN in Note", () => {
  const app = crm.normalizeSubmission({
    name: "Elena Morales",
    phone: "502-555-0199",
    email: "elena@moralestrucking.test",
    company: "Morales Freight Inc",
    priceOfEquipment: "$68,500",
    financingAmountRequested: "$58,500",
    downPaymentAmount: "$10,000",
    equipmentDescription: "2022 Freightliner Cascadia",
    vendorSeller: "Kentucky Truck Sales",
    taxId: "99-1234567",
    businessType: "Corp",
    businessAddress: "450 Industrial Pkwy",
    businessCityStateZip: "Louisville, KY 40202",
    officer1Name: "Elena Morales",
    officer1Title: "President",
    officer1Ownership: "80",
    gSsn: "123-45-6789",
    gBirthdate: "1984-09-12",
    cgName: "Carlos Morales",
    cgSsn: "987-65-4321",
    guarantorSignature: "Elena Morales",
    acknowledged: "on",
    source: "equipment-finance",
    page: "/programs/equipment-finance",
  });

  assert.equal(app.formKind, "equipment-finance");
  assert.equal(app.standardContact.city, "Louisville");
  assert.equal(app.standardContact.state, "KY");
  assert.equal(app.standardContact.postalCode, "40202");
  assert.equal(app.standardContact.address1, "450 Industrial Pkwy");
  assert.equal(app.standardContact.dateOfBirth, "1984-09-12");
  assert.equal(app.fieldValues.ein, "99-1234567");
  assert.equal(app.fieldValues.ownerSsn, "123-45-6789");
  assert.equal(app.fieldValues.secondOwnerFirstName, "Carlos");
  assert.equal(app.fieldValues.secondOwnerLastName, "Morales");
  assert.equal(app.fieldValues.ecoaAcknowledged, "Yes");
  assert.equal(app.noteBody.includes("123-45-6789"), false, "full SSN is never written into Contact Note");
  assert.equal(app.noteBody.includes("•••-••-6789"), true, "masked last-4 SSN is shown in Contact Note");
});

test("matches live Momentum / NowCerts custom fields across labels, aliases, question prefixes & data types", () => {
  const remoteFields = [
    { id: "cf_dot", name: "DOT Number", fieldKey: "contact.dot_number", dataType: "TEXT" },
    { id: "cf_q1", name: "When are you looking to Bind Coverage or when would you like policy to start?", dataType: "TEXT" },
    { id: "cf_price", name: "Price of Equipment ($)", dataType: "MONETORY" },
    { id: "cf_units", name: "Total Power Units", dataType: "NUMERICAL" },
    { id: "cf_started", name: "Date Business Started", dataType: "DATE" },
    { id: "cf_hazmat", name: "Do you haul Hazardous substances or materials?", dataType: "SINGLE_OPTIONS", picklistOptions: ["Yes", "No"] },
    { id: "folder_1", name: "General Info", documentType: "folder" },
  ];

  const normalized = crm.normalizeSubmission({
    formType: "insurance-intake",
    firstName: "Casey",
    phone: "555-0100",
    email: "casey@example.test",
    dotNumber: "5681380",
    formData: {
      bindCoverageDate: "11/01/2026",
      priceOfEquipment: "$68,500",
      totalPowerUnits: "4",
      dateBusinessStarted: "Sep 18, 2026",
      hazmat: "no",
    },
  });

  const mapped = crm.matchCustomFields(remoteFields, normalized.fieldValues);
  const byId = Object.fromEntries(mapped.map((m) => [m.id, m.field_value]));

  assert.equal(byId.cf_dot, "5681380");
  assert.equal(byId.cf_q1, "11/01/2026");
  assert.equal(byId.cf_price, 68500, "monetary field cleans currency symbols to number");
  assert.equal(byId.cf_units, 4, "numerical field coerces string to number");
  assert.equal(byId.cf_started, "2026-09-18", "human date parses cleanly to ISO YYYY-MM-DD");
  assert.equal(byId.cf_hazmat, "No", "single-option picklist matches case-insensitively");
  assert.equal(byId.folder_1, undefined, "folders are never treated as fields");
});

test("delivers full Insurance Intake to Momentum CRM API: Contact upsert + Note + Driver/Vehicle Custom Objects", async () => {
  process.env.GHL_PRIVATE_INTEGRATION_TOKEN = "pit-test-token";
  const calls = [];

  global.fetch = async (input, init) => {
    const url = String(input);
    const method = init?.method || "GET";
    const body = typeof init?.body === "string" ? JSON.parse(init.body) : null;
    calls.push({ method, url, body });

    if (url.includes("/customFields?model=contact")) {
      return Response.json({
        customFields: [
          { id: "cf_dot", name: "USDOT Number", fieldKey: "contact.usdot_number", dataType: "TEXT" },
          { id: "cf_eld", name: "Who is your ELD provider?", fieldKey: "contact.eld_provider", dataType: "TEXT" },
        ],
      });
    }
    if (url.endsWith("/contacts/upsert")) {
      return Response.json({ contact: { id: "cnt_999" } });
    }
    if (url.endsWith("/contacts/cnt_999/notes")) {
      return Response.json({ note: { id: "note_1" } });
    }
    if (url.includes("/objects/?locationId=")) {
      return Response.json({
        objects: [
          { key: "custom_objects.drivers", labels: { singular: "Driver", plural: "Drivers" } },
          { key: "custom_objects.vehicles", labels: { singular: "Vehicle", plural: "Vehicles" } },
        ],
      });
    }
    if (url.includes("/objects/custom_objects.drivers?")) {
      return Response.json({
        fields: [
          { fieldKey: "custom_objects.drivers.driver_name", name: "Driver Name" },
          { fieldKey: "custom_objects.drivers.dl", name: "DL#" },
        ],
      });
    }
    if (url.includes("/objects/custom_objects.vehicles?")) {
      return Response.json({
        fields: [
          { fieldKey: "custom_objects.vehicles.vin", name: "17 digit VIN" },
          { fieldKey: "custom_objects.vehicles.make", name: "Make" },
        ],
      });
    }
    if (url.includes("/associations/objectKey/")) {
      return Response.json({
        associations: [{ id: "assoc_1", firstObjectKey: "contact", secondObjectKey: "custom_objects.record" }],
      });
    }
    if (url.includes("/objects/") && url.endsWith("/records")) {
      return Response.json({ record: { id: "rec_123" } });
    }
    if (url.endsWith("/associations/relations")) {
      return Response.json({ ok: true });
    }
    return Response.json({ ok: true });
  };

  const res = await POST(
    new Request("https://example.test/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "insurance-intake",
        firstName: "Casey",
        lastName: "Dispatcher",
        phone: "502-555-0100",
        email: "casey@example.test",
        dotNumber: "5681380",
        drivers: [{ index: 1, name: "Alex Driver", dlNumber: "D7654321" }],
        vehicles: [{ index: 1, make: "Kenworth", vin: "1XKAD49X0LJ000002" }],
        formData: { dotNumber: "5681380", eldProvider: "Samsara" },
      }),
    })
  );

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const upsert = calls.find((c) => c.url.endsWith("/contacts/upsert"));
  assert.equal(upsert.body.locationId, crm.DEFAULT_MOMENTUM_LOCATION_ID);
  assert.equal(upsert.body.firstName, "Casey");
  assert.equal(upsert.body.phone, "+15025550100");
  assert.deepEqual(upsert.body.customFields, [
    { id: "cf_dot", key: "contact.usdot_number", field_value: "5681380" },
    { id: "cf_eld", key: "contact.eld_provider", field_value: "Samsara" },
  ]);

  const noteCall = calls.find((c) => c.url.endsWith("/contacts/cnt_999/notes"));
  assert.ok(noteCall.body.body.includes("Alex Driver"), "Contact Note records full Drivers schedule");
  assert.ok(noteCall.body.body.includes("1XKAD49X0LJ000002"), "Contact Note records full Vehicles schedule");

  const driverRec = calls.find((c) => c.url.endsWith("/objects/custom_objects.drivers/records"));
  assert.deepEqual(driverRec.body.properties, { driver_name: "Alex Driver", dl: "D7654321" });

  const vehicleRec = calls.find((c) => c.url.endsWith("/objects/custom_objects.vehicles/records"));
  assert.deepEqual(vehicleRec.body.properties, { vin: "1XKAD49X0LJ000002", make: "Kenworth" });

  const assocCalls = calls.filter((c) => c.url.endsWith("/associations/relations"));
  assert.equal(assocCalls.length, 2, "both Driver and Vehicle records are associated with the Contact");
});

test("falls back automatically to Search + Update when Momentum location has Allow Duplicate Contacts enabled (HTTP 400)", async () => {
  const calls = [];
  const fetchMock = async (input, init) => {
    const url = String(input);
    const method = init?.method || "GET";
    const body = typeof init?.body === "string" ? JSON.parse(init.body) : null;
    calls.push({ method, url, body });

    if (url.includes("/customFields")) return Response.json({ customFields: [] });
    if (url.endsWith("/contacts/upsert")) return Response.json({ message: "Duplicate contacts allowed" }, { status: 400 });
    if (url.includes("/contacts/?locationId=")) return Response.json({ contacts: [{ id: "existing_cnt_42" }] });
    if (method === "PUT" && url.endsWith("/contacts/existing_cnt_42")) return Response.json({ contact: { id: "existing_cnt_42" } });
    if (url.endsWith("/contacts/existing_cnt_42/notes")) return Response.json({ note: { id: "n1" } });
    return Response.json({ ok: true });
  };

  const result = await crm.sendToMomentumCrm(
    { name: "Sam Carrier", phone: "5025550111", email: "sam@carrier.test", source: "consult" },
    { fetchImpl: fetchMock, env: { GHL_PRIVATE_INTEGRATION_TOKEN: "pit-dup-test" } }
  );

  assert.equal(result.contactId, "existing_cnt_42");
  assert.ok(calls.some((c) => c.method === "PUT" && c.url.endsWith("/contacts/existing_cnt_42")));
});

test("/api/crm-setup enforces token verification (503 unconfigured, 401 mismatch, 200 valid sync & test)", async () => {
  const setupFile = path.resolve("src/app/api/crm-setup/route.ts");
  const setupMod = new Module(setupFile, module);
  setupMod.filename = setupFile;
  setupMod.paths = module.paths;
  setupMod._compile(
    ts.transpileModule(fs.readFileSync(setupFile, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    setupFile
  );
  const setupPost = setupMod.exports.POST;

  delete process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const unconfigured = await setupPost(
    new Request("https://example.test/api/crm-setup", {
      method: "POST",
      headers: { Authorization: "Bearer pit-anything", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "inspect" }),
    })
  );
  assert.equal(unconfigured.status, 503);

  process.env.GHL_PRIVATE_INTEGRATION_TOKEN = "pit-real-secret";
  const wrongToken = await setupPost(
    new Request("https://example.test/api/crm-setup", {
      method: "POST",
      headers: { Authorization: "Bearer pit-wrong-secret", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "inspect" }),
    })
  );
  assert.equal(wrongToken.status, 401);

  global.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/customFields")) {
      return Response.json({ customFields: [{ id: "cf_1", name: "USDOT Number", dataType: "TEXT" }] });
    }
    if (url.endsWith("/contacts/upsert")) return Response.json({ contact: { id: "cnt_test_1" } });
    return Response.json({ ok: true });
  };

  const okInspect = await setupPost(
    new Request("https://example.test/api/crm-setup", {
      method: "POST",
      headers: { Authorization: "Bearer pit-real-secret", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "inspect" }),
    })
  );
  assert.equal(okInspect.status, 200);
  const inspectBody = await okInspect.json();
  assert.equal(inspectBody.matchedCount, 1);

  const okTestLead = await setupPost(
    new Request("https://example.test/api/crm-setup", {
      method: "POST",
      headers: { Authorization: "Bearer pit-real-secret", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send-test" }),
    })
  );
  assert.equal(okTestLead.status, 200);
  assert.equal((await okTestLead.json()).contactId, "cnt_test_1");
});

