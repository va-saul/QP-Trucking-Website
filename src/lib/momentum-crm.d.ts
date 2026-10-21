export const GHL_API_BASE: string;
export const GHL_API_VERSION: string;
export const DEFAULT_MOMENTUM_LOCATION_ID: string;

export type FormKind =
  | "insurance-intake"
  | "insurance-quote"
  | "equipment-finance"
  | "consultation";

export interface FieldCatalogEntry {
  key: string;
  name: string;
  folder: string;
  dataType: string;
  sensitive?: boolean;
  aliases: string[];
}

export const FIELD_CATALOG: FieldCatalogEntry[];
export const CUSTOM_OBJECT_DEFS: Record<
  "driver" | "vehicle" | "policy",
  {
    objectNames: string[];
    fields: Array<{ key: string; labels: string[] }>;
  }
>;

export interface DocumentMeta {
  name: string;
  type: string;
  bytes: number;
}

export interface NormalizedSubmission {
  formKind: FormKind;
  formLabel: string;
  standardContact: {
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    address1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    dateOfBirth?: string;
    website?: string;
    source: string;
    tags: string[];
  };
  fieldValues: Record<string, string>;
  drivers: Array<Record<string, unknown>>;
  vehicles: Array<Record<string, unknown>>;
  existingPolicies: Array<Record<string, unknown>>;
  noteBody: string;
}

export function normalizeSubmission(
  payload: Record<string, unknown>,
  documents?: DocumentMeta[]
): NormalizedSubmission;

export function coerceValueForGhlField(
  rawValue: unknown,
  remoteField: Record<string, unknown>
): unknown;

export function matchCustomFields(
  remoteFields: Array<Record<string, unknown>>,
  fieldValues: Record<string, string>
): Array<{ id: string; key?: string; field_value: unknown }>;

export function syncCustomFieldsSchema(options: {
  token: string;
  locationId?: string;
  createMissing?: boolean;
  fetchImpl?: typeof globalThis.fetch;
}): Promise<{
  locationId: string;
  totalCatalogFields: number;
  matchedCount: number;
  missingCount: number;
  createdCount: number;
  matched: Array<{ key: string; name: string; crmId: string; crmName: string; crmKey?: string }>;
  missing: FieldCatalogEntry[];
  created: Array<{ key: string; name: string; crmId?: string; crmKey?: string }>;
}>;

export function sendToMomentumCrm(
  payload: Record<string, unknown>,
  options?: {
    documents?: DocumentMeta[];
    fetchImpl?: typeof globalThis.fetch;
    env?: Record<string, string | undefined>;
  }
): Promise<{
  contactId: string;
  formKind: FormKind;
  mappedCustomFieldCount: number;
}>;

export function buildSampleLeadPayload(): Record<string, unknown>;
export function clearMomentumCaches(): void;
