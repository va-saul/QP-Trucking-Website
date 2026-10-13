/**
 * Pure helpers for the insurance intake's repeatable records (drivers, vehicles,
 * existing policies).
 *
 * Every value lives in one flat map keyed `${kind}_${n}_${field}` (for example
 * `vehicle_2_vin`). That keeps the field ids the lead payload already uses, so CRM
 * mappings do not change. Nothing in this module reads the network or the DOM,
 * so the edit-preservation rules can be unit tested directly.
 */

export type RecordKind = "driver" | "vehicle" | "policy";
export type RecordField = { key: string; label: string; type?: string };
export type FieldValues = Record<string, string>;
export type TaggedFields = Record<string, boolean>;
export type RecordCounts = Record<RecordKind, number>;

/** Upper bounds keep one submission from growing without limit. */
export const RECORD_LIMITS: RecordCounts = { driver: 20, vehicle: 30, policy: 10 };

export const DRIVER_FIELDS: RecordField[] = [
  { key: "name", label: "Driver Name" },
  { key: "dob", label: "Date of Birth" },
  { key: "dlNumber", label: "DL#" },
  { key: "dlState", label: "Driver License State", type: "state-select" },
  { key: "email", label: "Email (for MVR permission)" },
  { key: "phone", label: "Phone # (For MVR Permission)" },
  { key: "cdlClass", label: "CDL Class (A,B,C)" },
  { key: "expYears", label: "# of years exp with CDL Class" },
  { key: "hireDate", label: "Date of Hire" },
  { key: "violations", label: "# of Violations" },
  { key: "accidents", label: "# of Accidents" },
  { key: "accidentDetails", label: "Details of Accidents?" },
  { key: "ownerOperator", label: "Owner Operator?" },
];

export const VEHICLE_FIELDS: RecordField[] = [
  { key: "year", label: "Year" },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "purchaseDate", label: "Date Purchased" },
  { key: "purchaseCost", label: "Cost When Purchased" },
  { key: "specialEquipmentValue", label: "Value of Permanently attached special equipment" },
  { key: "bodyType", label: "Body Type" },
  { key: "vin", label: "17 digit VIN" },
  { key: "rearAxles", label: "Number of rear axles" },
  { key: "abs", label: "Does the vehicle have anti-lock brakes?" },
  { key: "airbags", label: "Does the vehicle have airbags?" },
  { key: "gvw", label: "GVW" },
  { key: "statedValue", label: "Stated Value" },
  { key: "maxRadius", label: "Max Radius" },
  { key: "owner", label: "Owner of Vehicle" },
  { key: "lossPayee", label: "Loss Payee" },
];

/**
 * Policy fields. `number` through `limit` can be filled from an FMCSA insurance
 * filing; the rest (agent, premium, term dates, MGA, ...) come only from the
 * policy document and are never filled from public records.
 */
export const POLICY_FIELDS: RecordField[] = [
  { key: "number", label: "Policy Number" },
  { key: "status", label: "Status" },
  { key: "effectiveDate", label: "Effective Date" },
  { key: "expirationDate", label: "Expiration Date" },
  { key: "cancellationDate", label: "Cancellation Date" },
  { key: "agent", label: "Agent" },
  { key: "csr", label: "CSR" },
  { key: "lob", label: "Line of Business" },
  { key: "lobClass", label: "LOB Class" },
  { key: "limit", label: "Coverage Limit (FMCSA filing)" },
  { key: "carrier", label: "Carrier Name" },
  { key: "mga", label: "MGA" },
  { key: "businessType", label: "Business Type" },
  { key: "commission", label: "Commission" },
  { key: "totalPremium", label: "Total Premium" },
  { key: "rwlQt", label: "RWL_Qt" },
  { key: "rwlPol", label: "RWL_Pol" },
  { key: "percentChange", label: "Percentage Change" },
  { key: "premium", label: "Policy Premium" },
  { key: "referralSource", label: "Referral Source" },
  { key: "referralContact", label: "Referral Source Contact" },
  { key: "primaryOffice", label: "Primary Office" },
  { key: "databaseId", label: "Database ID" },
];

export const RECORD_FIELDS: Record<RecordKind, RecordField[]> = {
  driver: DRIVER_FIELDS,
  vehicle: VEHICLE_FIELDS,
  policy: POLICY_FIELDS,
};

export const INITIAL_RECORD_COUNTS: RecordCounts = { driver: 1, vehicle: 1, policy: 1 };

export function recordFieldId(kind: RecordKind, index: number, key: string): string {
  return `${kind}_${index}_${key}`;
}

const RECORD_ID_PATTERN = /^(driver|vehicle|policy)_(\d+)_/;

export function hasValue(value: unknown): boolean {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

export function isRecordEmpty(values: FieldValues, kind: RecordKind, index: number): boolean {
  return RECORD_FIELDS[kind].every((f) => !hasValue(values[recordFieldId(kind, index, f.key)]));
}

/** Adds one blank record; never exceeds the per-kind limit. */
export function addRecordCount(count: number, kind: RecordKind): number {
  return Math.min(Math.max(count, 1) + 1, RECORD_LIMITS[kind]);
}

/**
 * Removes record `index` and shifts later records down so numbering stays
 * contiguous. Values and FMCSA provenance tags move with their records, so no
 * entered value is lost when a middle record is removed. Removing the only
 * record clears it and keeps one blank card on screen.
 */
export function removeRecordAt(
  values: FieldValues,
  tagged: TaggedFields,
  kind: RecordKind,
  index: number,
  count: number
): { values: FieldValues; tagged: TaggedFields; count: number } {
  const keys = RECORD_FIELDS[kind].map((f) => f.key);
  const nextValues: FieldValues = { ...values };
  const nextTagged: TaggedFields = { ...tagged };

  if (count <= 1) {
    for (const key of keys) {
      delete nextValues[recordFieldId(kind, 1, key)];
      delete nextTagged[recordFieldId(kind, 1, key)];
    }
    return { values: nextValues, tagged: nextTagged, count: 1 };
  }

  for (let i = index; i < count; i++) {
    for (const key of keys) {
      const from = recordFieldId(kind, i + 1, key);
      const to = recordFieldId(kind, i, key);
      if (values[from] !== undefined) nextValues[to] = values[from];
      else delete nextValues[to];
      if (tagged[from]) nextTagged[to] = true;
      else delete nextTagged[to];
    }
  }
  for (const key of keys) {
    delete nextValues[recordFieldId(kind, count, key)];
    delete nextTagged[recordFieldId(kind, count, key)];
  }
  return { values: nextValues, tagged: nextTagged, count: count - 1 };
}

/**
 * Fills only fields that are still empty. An applicant's typed value always wins,
 * even when it was typed while the lookup was in flight.
 */
export function mergeFmcsaFields(
  values: FieldValues,
  tagged: TaggedFields,
  found: FieldValues
): { values: FieldValues; tagged: TaggedFields; filled: string[] } {
  const nextValues: FieldValues = { ...values };
  const nextTagged: TaggedFields = { ...tagged };
  const filled: string[] = [];
  for (const [key, value] of Object.entries(found)) {
    if (!hasValue(value) || hasValue(values[key])) continue;
    nextValues[key] = value;
    nextTagged[key] = true;
    filled.push(key);
  }
  return { values: nextValues, tagged: nextTagged, filled };
}

/** Compact form of a policy number, so `GRT-41448A` and `grt41448a` match. */
export function normalizePolicyNumber(value: unknown): string {
  return String(value ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export type PolicyMergeResult = {
  values: FieldValues;
  tagged: TaggedFields;
  count: number;
  /** Filings loaded into a card (fills an empty card or appends a new one). */
  loaded: number;
  /** Filings whose policy number is already on a card. Those cards are kept as typed. */
  duplicates: number;
  /** Filings that did not fit under RECORD_LIMITS.policy. */
  overflow: number;
};

/**
 * Places FMCSA policy filings on the policy cards without overwriting anything
 * the applicant has entered. A filing whose policy number already appears is
 * skipped. Otherwise it fills the first completely empty card, or a new card
 * is appended.
 */
export function mergeFmcsaPolicies(
  values: FieldValues,
  tagged: TaggedFields,
  count: number,
  policies: FieldValues[]
): PolicyMergeResult {
  const nextValues: FieldValues = { ...values };
  const nextTagged: TaggedFields = { ...tagged };
  let nextCount = Math.max(count, 1);
  const known = new Set<string>();
  for (let i = 1; i <= nextCount; i++) {
    const n = normalizePolicyNumber(nextValues[recordFieldId("policy", i, "number")]);
    if (n) known.add(n);
  }

  let loaded = 0;
  let duplicates = 0;
  let overflow = 0;
  for (const policy of policies) {
    const number = normalizePolicyNumber(policy.number);
    if (number && known.has(number)) {
      duplicates++;
      continue;
    }

    let slot = 0;
    for (let i = 1; i <= nextCount; i++) {
      if (isRecordEmpty(nextValues, "policy", i)) {
        slot = i;
        break;
      }
    }
    if (!slot) {
      if (nextCount >= RECORD_LIMITS.policy) {
        overflow++;
        continue;
      }
      nextCount++;
      slot = nextCount;
    }

    for (const field of POLICY_FIELDS) {
      const value = policy[field.key];
      if (!hasValue(value)) continue;
      const id = recordFieldId("policy", slot, field.key);
      nextValues[id] = value;
      nextTagged[id] = true;
    }
    if (number) known.add(number);
    loaded++;
  }

  return { values: nextValues, tagged: nextTagged, count: nextCount, loaded, duplicates, overflow };
}

export type CollectedRecord = Record<string, string | number | string[]> & {
  index: number;
  /** Field keys whose current value came from an FMCSA/Motus lookup and was not edited. */
  autoFilledFields?: string[];
};

/** Non-empty records for the lead payload, in on-screen order. */
export function collectRecords(
  values: FieldValues,
  tagged: TaggedFields,
  kind: RecordKind,
  count: number
): CollectedRecord[] {
  const records: CollectedRecord[] = [];
  for (let index = 1; index <= count; index++) {
    if (isRecordEmpty(values, kind, index)) continue;
    const record: CollectedRecord = { index };
    const autoFilled: string[] = [];
    for (const field of RECORD_FIELDS[kind]) {
      const id = recordFieldId(kind, index, field.key);
      if (!hasValue(values[id])) continue;
      record[field.key] = values[id].trim();
      if (tagged[id]) autoFilled.push(field.key);
    }
    if (autoFilled.length) record.autoFilledFields = autoFilled;
    records.push(record);
  }
  return records;
}

/** Drops record fields beyond the visible card count so stale values never ship. */
export function pruneRecordValues(values: FieldValues, counts: RecordCounts): FieldValues {
  const out: FieldValues = {};
  for (const [id, value] of Object.entries(values)) {
    const match = RECORD_ID_PATTERN.exec(id);
    if (match) {
      const kind = match[1] as RecordKind;
      const index = Number(match[2]);
      if (index < 1 || index > counts[kind]) continue;
    }
    out[id] = value;
  }
  return out;
}
