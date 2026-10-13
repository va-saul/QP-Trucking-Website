const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Compile the real helper module in memory (no generated files, no new dependency).
const filename = path.resolve('src/lib/insurance-intake.ts');
const lib = new Module(filename, module);
lib.filename = filename;
lib.paths = module.paths;
lib._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const {
  addRecordCount, collectRecords, mergeFmcsaFields, mergeFmcsaPolicies, pruneRecordValues,
  recordFieldId, removeRecordAt, RECORD_LIMITS, isRecordEmpty,
} = lib.exports;

test('record ids keep the flat names the lead payload already uses', () => {
  assert.equal(recordFieldId('vehicle', 2, 'vin'), 'vehicle_2_vin');
  assert.equal(recordFieldId('driver', 1, 'dlState'), 'driver_1_dlState');
  assert.equal(recordFieldId('policy', 3, 'number'), 'policy_3_number');
});

test('FMCSA values fill only empty fields; applicant edits made during the lookup are kept', () => {
  // The applicant typed a phone and a city while the request was in flight.
  const typed = { phone: '555-9999', mailingCity: 'Tulsa' };
  const found = { phone: '555-0100', mailingCity: 'Dallas', mailingState: 'TX' };
  const merged = mergeFmcsaFields(typed, {}, found);
  assert.equal(merged.values.phone, '555-9999');
  assert.equal(merged.values.mailingCity, 'Tulsa');
  assert.equal(merged.values.mailingState, 'TX');
  assert.deepEqual(merged.filled, ['mailingState']);
  assert.equal(merged.tagged.mailingState, true);
  assert.equal(merged.tagged.phone, undefined, 'an applicant-typed value is never tagged FMCSA');
});

test('whitespace-only values count as empty for lookup fills', () => {
  const merged = mergeFmcsaFields({ ein: '   ' }, {}, { ein: '123456789' });
  assert.equal(merged.values.ein, '123456789');
});

test('adding records stops at the per-kind limit', () => {
  assert.equal(addRecordCount(1, 'driver'), 2);
  assert.equal(addRecordCount(RECORD_LIMITS.vehicle, 'vehicle'), RECORD_LIMITS.vehicle);
  assert.equal(addRecordCount(RECORD_LIMITS.policy - 1, 'policy'), RECORD_LIMITS.policy);
});

test('removing a middle vehicle keeps the others and their values, with contiguous numbering', () => {
  const values = {
    vehicle_1_vin: '1FTFW1ET5DKE12345', vehicle_1_year: '2019',
    vehicle_2_vin: '1XKAD49X0LJ000002', vehicle_2_year: '2020',
    vehicle_3_vin: '3AKJGLDR0GSGY0003', vehicle_3_year: '2021',
  };
  const tagged = { vehicle_3_year: true };
  const result = removeRecordAt(values, tagged, 'vehicle', 2, 3);
  assert.equal(result.count, 2);
  assert.equal(result.values.vehicle_1_vin, '1FTFW1ET5DKE12345');
  assert.equal(result.values.vehicle_2_vin, '3AKJGLDR0GSGY0003', 'vehicle 3 shifted into slot 2 intact');
  assert.equal(result.values.vehicle_2_year, '2021');
  assert.equal(result.values.vehicle_3_vin, undefined, 'the old last slot is cleared');
  assert.equal(result.tagged.vehicle_2_year, true, 'FMCSA provenance moves with its record');
  assert.equal(result.tagged.vehicle_3_year, undefined);
});

test('removing the only record clears it and keeps one blank card', () => {
  const result = removeRecordAt({ driver_1_name: 'Pat Example' }, {}, 'driver', 1, 1);
  assert.equal(result.count, 1);
  assert.equal(result.values.driver_1_name, undefined);
});

test('multiple drivers, vehicles and policies are all collected in on-screen order', () => {
  const values = {
    driver_1_name: ' Alex Driver ', driver_1_dlState: 'TX',
    driver_2_name: '', driver_2_dlState: '',
    driver_3_name: 'Sam Driver',
    vehicle_1_vin: '1FTFW1ET5DKE12345',
    vehicle_2_vin: '1XKAD49X0LJ000002', vehicle_2_year: '2020',
    policy_1_number: 'GRT41448A',
  };
  const drivers = collectRecords(values, {}, 'driver', 3);
  assert.deepEqual(drivers.map((d) => d.index), [1, 3], 'a blank card is skipped but numbering is kept');
  assert.equal(drivers[0].name, 'Alex Driver', 'values are trimmed');
  assert.equal(drivers[1].name, 'Sam Driver');
  const vehicles = collectRecords(values, {}, 'vehicle', 2);
  assert.equal(vehicles.length, 2);
  assert.equal(vehicles[1].year, '2020');
  assert.equal(collectRecords(values, {}, 'policy', 1)[0].number, 'GRT41448A');
});

test('payload provenance lists only fields still carrying an FMCSA value', () => {
  const values = { policy_1_number: 'GRT41448A', policy_1_carrier: 'Edited Insurer' };
  const tagged = { policy_1_number: true, policy_1_carrier: false };
  const [record] = collectRecords(values, tagged, 'policy', 1);
  assert.deepEqual(record.autoFilledFields, ['number']);
});

test('stale values beyond the visible card count never ship', () => {
  const values = { driver_1_name: 'Kept', driver_2_name: 'Stale after removal', mailingCity: 'Dallas' };
  const pruned = pruneRecordValues(values, { driver: 1, vehicle: 1, policy: 1 });
  assert.equal(pruned.driver_1_name, 'Kept');
  assert.equal(pruned.driver_2_name, undefined);
  assert.equal(pruned.mailingCity, 'Dallas', 'scalar fields are never pruned');
});

test('a policy filing is placed on the first empty card, and the card count grows as needed', () => {
  const result = mergeFmcsaPolicies({}, {}, 1, [
    { number: 'GRT41448A', carrier: 'Great West', lob: 'BI&PD', lobClass: 'Primary', limit: '$1,000,000', effectiveDate: '05/22/2025' },
    { number: 'IMP 1353069', carrier: 'Great American', lob: 'Cargo', lobClass: '', limit: '$5,000', effectiveDate: '05/01/2010' },
  ]);
  assert.equal(result.loaded, 2);
  assert.equal(result.count, 2);
  assert.equal(result.values.policy_1_number, 'GRT41448A');
  assert.equal(result.values.policy_2_number, 'IMP 1353069');
  assert.equal(result.values.policy_2_limit, '$5,000');
  assert.equal(result.tagged.policy_1_carrier, true);
  assert.equal(result.values.policy_2_lobClass, undefined, 'blank FMCSA values are not written');
});

test('applicant-typed policies are never overwritten, and a new filing is appended beside them', () => {
  const typed = { policy_1_carrier: 'My broker-written policy', policy_1_premium: '4200' };
  const result = mergeFmcsaPolicies(typed, {}, 1, [{ number: 'GRT41448A', carrier: 'Great West', lob: 'BI&PD' }]);
  assert.equal(result.values.policy_1_carrier, 'My broker-written policy');
  assert.equal(result.values.policy_1_number, undefined, 'the card the applicant filled is left as typed');
  assert.equal(result.values.policy_2_number, 'GRT41448A');
  assert.equal(result.count, 2);
});

test('re-running the lookup does not duplicate a filing already on a card', () => {
  const first = mergeFmcsaPolicies({}, {}, 1, [{ number: 'GRT-41448A', carrier: 'Great West' }]);
  const second = mergeFmcsaPolicies(first.values, first.tagged, first.count, [
    { number: 'grt41448a', carrier: 'Great West' },
  ]);
  assert.equal(second.loaded, 0);
  assert.equal(second.duplicates, 1);
  assert.equal(second.count, 1);
});

test('filings past the policy limit are counted as overflow, not silently dropped', () => {
  const policies = Array.from({ length: RECORD_LIMITS.policy + 2 }, (_, i) => ({ number: `P${i}`, carrier: 'X' }));
  const result = mergeFmcsaPolicies({}, {}, 1, policies);
  assert.equal(result.count, RECORD_LIMITS.policy);
  assert.equal(result.loaded, RECORD_LIMITS.policy);
  assert.equal(result.overflow, 2);
});

test('isRecordEmpty ignores whitespace and recognizes filled cards', () => {
  assert.equal(isRecordEmpty({ vehicle_1_vin: '   ' }, 'vehicle', 1), true);
  assert.equal(isRecordEmpty({ vehicle_1_vin: '1FTFW1ET5DKE12345' }, 'vehicle', 1), false);
});
