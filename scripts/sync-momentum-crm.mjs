#!/usr/bin/env node

/**
 * Momentum CRM (NowCerts / GoHighLevel) Setup, Custom-Field Sync & Webhook Helper
 *
 * Usage:
 *   # 1. Inspect existing Momentum CRM custom fields & check mapping coverage (dry run):
 *   GHL_PRIVATE_INTEGRATION_TOKEN=pit-... npm run crm:sync
 *
 *   # 2. Automatically create any missing folders & custom fields in Momentum CRM:
 *   GHL_PRIVATE_INTEGRATION_TOKEN=pit-... npm run crm:sync -- --create-missing
 *
 *   # 3. Push a live test lead into Momentum CRM to verify fields, tags & Contact Note:
 *   GHL_PRIVATE_INTEGRATION_TOKEN=pit-... npm run crm:sync -- --send-test
 *
 *   # 4. Or send a complete sample payload containing ALL website form fields to a
 *   #    Momentum Workflow Inbound Webhook ("Fetch Sample Requests"):
 *   LEAD_WEBHOOK_URL="https://services.leadconnectorhq.com/hooks/..." npm run crm:webhook-sample
 */

import fs from "node:fs";
import path from "node:path";
import crm from "../src/lib/momentum-crm.js";

const {
  DEFAULT_MOMENTUM_LOCATION_ID,
  buildSampleLeadPayload,
  normalizeSubmission,
  syncCustomFieldsSchema,
  sendToMomentumCrm,
} = crm;

// Load `.env.local` or `.env` automatically if present and not already set in env.
for (const envFile of [".env.local", ".env"]) {
  const full = path.resolve(process.cwd(), envFile);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

const args = new Set(process.argv.slice(2));
const createMissing = args.has("--create-missing");
const sendTest = args.has("--send-test");
const sendWebhookSample = args.has("--webhook-sample");

const buildFullSamplePayload = buildSampleLeadPayload;

async function run() {
  if (sendWebhookSample) {
    const url = process.env.LEAD_WEBHOOK_URL;
    if (!url) {
      console.error("Missing LEAD_WEBHOOK_URL. Set LEAD_WEBHOOK_URL in .env.local or pass it inline.");
      process.exit(1);
    }
    const sample = buildFullSamplePayload();
    const normalized = normalizeSubmission(sample, []);
    const body = {
      firstName: normalized.standardContact.firstName,
      lastName: normalized.standardContact.lastName,
      companyName: normalized.standardContact.companyName,
      address1: normalized.standardContact.address1,
      city: normalized.standardContact.city,
      state: normalized.standardContact.state,
      postalCode: normalized.standardContact.postalCode,
      country: normalized.standardContact.country,
      tags: normalized.standardContact.tags,
      formKind: normalized.formKind,
      crmNote: normalized.noteBody,
      ...sample.formData,
      ...sample,
    };
    delete body.formData;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`Webhook responded with HTTP ${res.status}`);
      process.exit(1);
    }
    console.log(`Sample payload with ${Object.keys(body).length} keys posted to LEAD_WEBHOOK_URL (HTTP ${res.status}).`);
    console.log("Now click 'Fetch Sample Requests' in your Momentum CRM Inbound Webhook trigger to map fields.");
    return;
  }

  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID || DEFAULT_MOMENTUM_LOCATION_ID;

  if (!token) {
    console.error("Missing GHL_PRIVATE_INTEGRATION_TOKEN.");
    console.error(
      `Add GHL_PRIVATE_INTEGRATION_TOKEN=pit-... to .env.local (Location ID defaults to ${locationId}), then re-run.`
    );
    process.exit(1);
  }

  console.log(`Connecting to Momentum CRM (Location ID: ${locationId})...`);
  const report = await syncCustomFieldsSchema({ token, locationId, createMissing });

  console.log(`\nCustom Field Coverage Report:`);
  console.log(`  Total website catalog fields : ${report.totalCatalogFields}`);
  console.log(`  Already matched in Momentum  : ${report.matchedCount}`);
  if (createMissing) {
    console.log(`  Newly created in Momentum    : ${report.createdCount}`);
  }
  console.log(`  Unmatched remaining          : ${report.missingCount}`);

  if (!createMissing && report.missing.length > 0) {
    console.log(
      `\nTip: run \`npm run crm:sync -- --create-missing\` to automatically create the ${report.missing.length} missing custom fields in Momentum CRM.`
    );
  }

  if (sendTest) {
    console.log("\nSending end-to-end sample Contact + Custom Fields + Note to Momentum CRM...");
    const result = await sendToMomentumCrm(buildFullSamplePayload());
    console.log(
      `Success! Upserted Contact ID: ${result.contactId} (${result.mappedCustomFieldCount} custom fields populated + Note attached).`
    );
  }
}

run().catch((err) => {
  console.error("CRM sync failed:", err.message);
  process.exit(1);
});
