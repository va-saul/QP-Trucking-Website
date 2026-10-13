const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Compile the actual route in memory; no generated source or new test dependency.
const filename = path.resolve('src/app/api/fmcsa/route.ts');
const route = new Module(filename, module);
route.filename = filename;
route.paths = module.paths;
route._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { GET } = route.exports;
const originalFetch = global.fetch;
const originalKey = process.env.FMCSA_API_KEY;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.FMCSA_API_KEY;
  else process.env.FMCSA_API_KEY = originalKey;
});

function mock({ carrier = {}, motus = {}, dockets = [], cargo = [], onFetch } = {}) {
  process.env.FMCSA_API_KEY = ' test-key \n';
  const calls = [];
  global.fetch = async (input) => {
    const url = new URL(input);
    calls.push(url);
    const custom = onFetch?.(url, calls);
    if (custom) return custom;
    if (url.host === 'mobile.fmcsa.dot.gov') {
      assert.equal(url.searchParams.get('webKey'), 'test-key');
      if (url.pathname.endsWith('/cargo-carried')) return Response.json({ content: cargo });
      if (url.pathname.endsWith('/docket-numbers')) return Response.json({ content: { results: dockets } });
      return Response.json({ content: { carrier: { dotNumber: 5681380, legalName: 'Test Carrier', ...carrier } } });
    }
    const dataset = url.pathname.split('/').pop().replace('.json', '');
    const where = url.searchParams.get('$where');
    return Response.json(motus[dataset]?.(where) ?? []);
  };
  return calls;
}
const lookup = async (query = 'dot=5681380') => {
  const response = await GET(new Request(`https://example.test/api/fmcsa?${query}`));
  return { status: response.status, ...await response.json() };
};

test('uses Motus contact fallback, whole-dollar coverage, and explicit No filing flags', async () => {
  mock({ carrier: { cargoInsuranceOnFile: true, bondInsuranceOnFile: true }, motus: {
    'inys-ebih': () => [{ bus_telno: '555-0100', mail_street_po: '10 Main St', mail_city: 'Dallas',
      mail_state_code: 'tx', mail_zip_code: '75001', mail_undeliverable_mail: 'Y',
      cargo_file: 'N', bond_file: 'N', bipd_file: '1000000', min_cov_amount: '750000' }],
  } });
  const result = await lookup();
  assert.equal(result.status, 200);
  assert.equal(result.fields.phone, '555-0100');
  assert.equal(result.fields.mailingState, 'TX');
  assert.equal(result.fields.mailingZip, '75001');
  assert.equal(result.data.mailUndeliverable, true);
  assert.equal(result.data.insurance.bipdOnFile, '$1,000,000');
  assert.equal(result.data.insurance.bipdRequired, '$750,000');
  assert.equal(result.data.insurance.cargoOnFile, 'No');
  assert.equal(result.data.insurance.bondOnFile, 'No');
  assert.equal(result.debug, undefined);
});

test('derives a missing MC from Motus, retries insurance by docket, and normalizes compact dates', async () => {
  const calls = mock({ motus: {
    'inys-ebih': () => [{ docket_number: 'MC47730539' }],
    'c5y8-a4uz': (where) => where.startsWith('docket_number') ? [{ policy_no: 'P123',
      insurance_company_name: 'Example Insurer', ins_type_code: '1', effective_date: '20261012' }] : [],
    'xe5s-wca7': (where) => where.startsWith('docket_number') ? [{ insurance_company_name: 'Prior Insurer',
      filing_status_reason: 'Cancelled', cancl_effective_date: '20251012', effective_date: '20201012' }] : [],
    'yu5v-wbh6': (where) => where.startsWith('docket_number') ? [
      { op_auth_status: 'Active', status_change_date: '20201012' },
      { op_auth_status: 'Pending', status_change_date: '20261012', reason: 'Application' },
    ] : [],
  } });
  const result = await lookup('dot=5681380&debug=1');
  assert.equal(result.fields.mcNumber, 'MC47730539');
  assert.equal(result.data.mcSource, 'motus');
  assert.equal(result.data.mcPending, true);
  assert.equal(result.data.authority.status, 'Pending');
  assert.equal(result.data.authority.date, '10/12/2026');
  assert.equal(result.fields.policy_1_effectiveDate, '10/12/2026');
  assert.match(result.fields.cancelledOrNonRenewed, /10\/12\/2025/);
  assert.ok(Number(result.fields.yearsPriorInsurance) >= 5);
  assert.equal(result.sources.motusInsur.via, 'docket');
  assert.equal(result.sources.motusInsur.docketTried, true);
  assert.equal(result.debug.motusInsur.policy_no, 'P123');
  assert.ok(calls.some(url => url.searchParams.get('$where')?.includes('MC0047730539')));
});

test('QC values win and QC required amounts in thousands are formatted as dollars', async () => {
  mock({ carrier: { telephone: '555-0200', mailingStreet: 'QC Street', mailingCity: 'Austin',
    mailingState: 'TX', mailingZip: '78701', bipdRequiredAmount: 750 },
    dockets: [{ docket: { prefix: 'MC', docketNumber: '0545087' } }],
    cargo: [{ cargoClassDesc: 'General Freight' }], motus: {
      'inys-ebih': () => [{ bus_telno: '555-0100', mail_street_po: 'Motus Street', docket_number: 'MC999' }],
    } });
  const result = await lookup();
  assert.equal(result.fields.phone, '555-0200');
  assert.equal(result.fields.mailingStreet, 'QC Street');
  assert.equal(result.fields.mcNumber, 'MC0545087');
  assert.equal(result.data.mcSource, 'qcmobile');
  assert.equal(result.data.insurance.bipdRequired, '$750,000');
  assert.equal(result.fields.commodities, 'General Freight');
});

test('empty and failed docket retries remain distinguishable without failing core lookup', async () => {
  mock({ dockets: [{ prefix: 'MC', docketNumber: '12345' }], onFetch: (url) =>
    url.pathname.endsWith('/c5y8-a4uz.json') && url.searchParams.get('$where').startsWith('docket_number')
      ? new Response('Unavailable', { status: 400 }) : null });
  const result = await lookup();
  assert.equal(result.ok, true);
  assert.equal(result.sources.motusInsur.status, 'empty');
  assert.match(result.sources.motusInsur.docketError, /400/);
  assert.equal(result.sources.motusInsHist.docketTried, true);
  assert.equal(result.sources.motusInsHist.docketError, undefined);
  assert.equal(result.fields.policy_1_number, undefined);
});

test('does not fabricate MC authority from FF/MX dockets', async () => {
  mock({ carrier: { docketNumber: 'FF12345' }, motus: { 'inys-ebih': () => [{ docket_number: 'MX54321' }] } });
  const result = await lookup();
  assert.equal(result.fields.mcNumber, undefined);
  assert.equal(result.data.mc, '');
});

test('validates configuration and DOT before contacting upstream', async () => {
  global.fetch = () => { throw new Error('Unexpected upstream call'); };
  delete process.env.FMCSA_API_KEY;
  assert.equal((await lookup()).code, 'not_configured');
  process.env.FMCSA_API_KEY = 'test-key';
  assert.equal((await lookup('')).code, 'missing_dot');
  assert.equal((await lookup('dot=abc')).code, 'invalid_dot');
});

test('reports invalid key and missing carrier without returning partial success', async () => {
  mock({ onFetch: () => new Response('Forbidden', { status: 403 }) });
  assert.equal((await lookup()).code, 'invalid_key');
  mock({ onFetch: () => new Response('Not found', { status: 404 }) });
  assert.equal((await lookup()).code, 'not_found');
});

test('retries a throttled supplemental source once and preserves the core record', async () => {
  let attempts = 0;
  mock({ onFetch: (url) => {
    if (!url.pathname.endsWith('/cargo-carried')) return null;
    return ++attempts === 1 ? new Response('Throttled', { status: 429 }) :
      Response.json({ content: [{ cargoClassDesc: 'Machinery' }] });
  } });
  const result = await lookup();
  assert.equal(attempts, 2);
  assert.equal(result.fields.commodities, 'Machinery');
  assert.equal(result.sources.qcmobileCargo.status, 'ok');
});
