const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Compile the real lead route in memory, as the FMCSA tests do.
const filename = path.resolve('src/app/api/lead/route.ts');
const route = new Module(filename, module);
route.filename = filename;
route.paths = module.paths;
route._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { POST } = route.exports;

const originalFetch = global.fetch;
const originalEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_WEBHOOK_URL: process.env.LEAD_WEBHOOK_URL,
};
const originalConsoleError = console.error;
afterEach(() => {
  global.fetch = originalFetch;
  console.error = originalConsoleError;
  for (const [k, v] of Object.entries(originalEnv)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
});

const PDF = (size = 1024) => Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.alloc(Math.max(0, size - 9), 0x20)]);
const PNG = () => Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(64, 0)]);

const intakePayload = (overrides = {}) => ({
  formType: 'insurance-intake',
  firstName: 'Casey',
  phone: '555-0100',
  email: 'casey@example.test',
  dotNumber: '5681380',
  drivers: [{ index: 1, name: 'Alex Driver', dlNumber: 'D7654321' }],
  formData: { dotNumber: '5681380', driver_1_name: 'Alex Driver', driver_1_dlNumber: 'D7654321', vehicle_1_vin: '1FTFW1ET5DKE12345' },
  ...overrides,
});

/** Records every outbound call; the delivery endpoints return success unless `fail` says otherwise. */
function mockDelivery({ fail = {} } = {}) {
  const calls = [];
  global.fetch = async (input, init) => {
    const url = String(input);
    const body = typeof init?.body === 'string' ? JSON.parse(init.body) : null;
    calls.push({ url, body });
    if (url.startsWith('https://api.resend.com')) {
      return fail.email ? new Response('nope', { status: 500 }) : Response.json({ id: 'email_1' });
    }
    return fail.webhook ? new Response('nope', { status: 500 }) : new Response('ok', { status: 200 });
  };
  return calls;
}

const jsonRequest = (body) => new Request('https://example.test/api/lead', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

function multipartRequest(payload, files = []) {
  const form = new FormData();
  form.append('payload', JSON.stringify(payload));
  for (const { name, bytes, type } of files) {
    form.append('files', new File([bytes], name, { type: type || 'application/octet-stream' }));
  }
  return new Request('https://example.test/api/lead', { method: 'POST', body: form });
}

test('JSON submissions still deliver to the CRM webhook and email, with flattened intake fields', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example.test/hook';
  const calls = mockDelivery();
  const response = await POST(jsonRequest(intakePayload()));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  const hook = calls.find((c) => c.url.includes('crm.example.test'));
  assert.equal(hook.body.driver_1_name, 'Alex Driver', 'nested formData is flattened for the CRM');
  assert.equal(hook.body.drivers[0].dlNumber, 'D7654321', 'record arrays are delivered as sent');
  assert.equal(calls.find((c) => c.url.startsWith('https://api.resend.com')).body.attachments, undefined);
});

test('documents are attached to the agent email as base64, never sent to the webhook', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example.test/hook';
  const calls = mockDelivery();
  const pdf = PDF(2048);
  const response = await POST(multipartRequest(intakePayload(), [
    { name: '../../secret/Dec Page.pdf', bytes: pdf, type: 'application/pdf' },
    { name: 'fleet schedule.png', bytes: PNG(), type: 'image/png' },
  ]));
  assert.equal(response.status, 200);

  const email = calls.find((c) => c.url.startsWith('https://api.resend.com')).body;
  assert.equal(email.attachments.length, 2);
  assert.equal(email.attachments[0].filename, 'Dec Page.pdf', 'path segments are removed from the name');
  assert.equal(email.attachments[0].content, pdf.toString('base64'));
  assert.equal(email.attachments[1].filename, 'fleet schedule.png');
  assert.match(email.text, /not parsed automatically/);

  const hook = calls.find((c) => c.url.includes('crm.example.test'));
  assert.ok(hook, 'webhook still receives the lead after the email succeeds');
  assert.equal(JSON.stringify(hook.body).includes(pdf.toString('base64')), false, 'file bytes never reach the CRM');
  assert.deepEqual(hook.body.documents.map((d) => d.name), ['Dec Page.pdf', 'fleet schedule.png']);
});

test('the file type is detected from its bytes, so a renamed file is refused', async () => {
  process.env.RESEND_API_KEY = 're_test';
  mockDelivery();
  const response = await POST(multipartRequest(intakePayload(), [
    { name: 'declarations.pdf', bytes: Buffer.from('<html>not a pdf</html>'), type: 'application/pdf' },
  ]));
  assert.equal(response.status, 422);
  assert.match((await response.json()).error, /Only PDF, JPG or PNG/);
});

test('document limits: at most 3 files, 2 MB each, 3.5 MB total', async () => {
  process.env.RESEND_API_KEY = 're_test';
  mockDelivery();
  const four = await POST(multipartRequest(intakePayload(), Array.from({ length: 4 }, (_, i) => ({ name: `f${i}.pdf`, bytes: PDF() }))));
  assert.equal(four.status, 422);

  const big = await POST(multipartRequest(intakePayload(), [{ name: 'big.pdf', bytes: PDF(2 * 1024 * 1024 + 1) }]));
  assert.equal(big.status, 422);
  assert.match((await big.json()).error, /2 MB or smaller/);

  const total = await POST(multipartRequest(intakePayload(), [
    { name: 'a.pdf', bytes: PDF(2 * 1024 * 1024) },
    { name: 'b.pdf', bytes: PDF(2 * 1024 * 1024) },
  ]));
  assert.equal(total.status, 422);
  assert.match((await total.json()).error, /3\.5 MB/);
});

test('documents are refused (503) when email delivery is not configured, and nothing is sent', async () => {
  delete process.env.RESEND_API_KEY;
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example.test/hook';
  const calls = mockDelivery();
  console.error = () => {};
  const response = await POST(multipartRequest(intakePayload(), [{ name: 'dec.pdf', bytes: PDF() }]));
  assert.equal(response.status, 503);
  assert.equal(calls.length, 0, 'a document submission never falls back to the webhook without its files');
});

test('a failed email with documents rejects the lead and does not reach the CRM (no duplicate on retry)', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example.test/hook';
  const calls = mockDelivery({ fail: { email: true } });
  console.error = () => {};
  const response = await POST(multipartRequest(intakePayload(), [{ name: 'dec.pdf', bytes: PDF() }]));
  assert.equal(response.status, 502);
  assert.equal(calls.some((c) => c.url.includes('crm.example.test')), false);
});

test('missing required contact fields are still rejected for multipart submissions', async () => {
  process.env.RESEND_API_KEY = 're_test';
  mockDelivery();
  const response = await POST(multipartRequest({ formType: 'insurance-intake', firstName: 'Casey' }, [{ name: 'dec.pdf', bytes: PDF() }]));
  assert.equal(response.status, 422);
  assert.match((await response.json()).error, /Phone, Email/);
});

test('server logs carry channel status only, never DOBs, license numbers or other intake details', async () => {
  process.env.RESEND_API_KEY = 're_test';
  process.env.LEAD_WEBHOOK_URL = 'https://crm.example.test/hook';
  mockDelivery({ fail: { email: true, webhook: true } });
  const logged = [];
  console.error = (...args) => logged.push(args.map((a) => (a instanceof Error ? a.message : String(a))).join(' '));
  const response = await POST(jsonRequest(intakePayload({ formData: { driver_1_dlNumber: 'D7654321', driver_1_dob: '1980-02-03' } })));
  assert.equal(response.status, 502);
  const text = logged.join('\n');
  assert.ok(logged.length > 0, 'failures are still logged');
  assert.equal(text.includes('D7654321'), false);
  assert.equal(text.includes('1980-02-03'), false);
  assert.equal(text.includes('casey@example.test'), false);
});
