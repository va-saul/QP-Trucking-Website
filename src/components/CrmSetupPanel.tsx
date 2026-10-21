"use client";

import { useState } from "react";

type SetupResponse = {
  ok: boolean;
  configured?: boolean;
  action?: string;
  locationId?: string;
  totalCatalogFields?: number;
  matchedCount?: number;
  missingCount?: number;
  createdCount?: number;
  missingFieldNames?: string[];
  contactId?: string;
  mappedCustomFieldCount?: number;
  error?: string;
};

export function CrmSetupPanel() {
  const [token, setToken] = useState("");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [result, setResult] = useState<SetupResponse | null>(null);

  async function runAction(action: "inspect" | "create-missing" | "send-test") {
    if (!token.trim()) {
      setResult({
        ok: false,
        error: "Paste your Momentum CRM Private Integration Token (pit-...) first.",
      });
      return;
    }

    setLoadingAction(action);
    setResult(null);

    try {
      const res = await fetch("/api/crm-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify({ action }),
      });
      const json = (await res.json()) as SetupResponse;
      setResult(json);
    } catch {
      setResult({
        ok: false,
        error: "Network error while contacting /api/crm-setup. Please try again.",
      });
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[1.2rem] border border-steel-200 bg-paper p-6 shadow-[var(--shadow-card)] sm:p-8">
      <p className="eyebrow text-brand-500">Zero-Terminal Admin Tool</p>
      <h1 className="mt-2 font-display text-[1.6rem] font-bold text-navy-900 sm:text-[1.9rem]">
        Momentum CRM Connection &amp; Custom Field Sync
      </h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-steel-600">
        No bash or local files needed. First save <code className="font-mono text-navy-900">GHL_PRIVATE_INTEGRATION_TOKEN</code> in{" "}
        <strong>Vercel → Settings → Environment Variables</strong> and redeploy. Then paste that same{" "}
        <code className="font-mono text-navy-900">pit-...</code> token below to verify your connection, auto-create any
        missing custom fields, and send a test lead into Momentum CRM.
      </p>

      <div className="mt-6">
        <label
          htmlFor="crm-token-input"
          className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-steel-600"
        >
          Momentum CRM Private Integration Token (Verified Against Vercel Env Var)
        </label>
        <input
          id="crm-token-input"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="pit-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          className="w-full rounded-[0.75rem] border border-steel-200 bg-white px-4 py-3 font-mono text-[0.92rem] text-navy-900 placeholder:text-steel-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
        />
        <p className="mt-1.5 text-[0.78rem] text-steel-500">
          Held only in browser memory while this tab is open — never saved to cookies, local storage, or server logs.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          disabled={loadingAction !== null}
          onClick={() => runAction("inspect")}
          className="btn btn-outline-dark justify-center px-4 py-3.5 text-[0.86rem] disabled:opacity-50"
        >
          {loadingAction === "inspect" ? "Checking…" : "1. Check Fields"}
        </button>

        <button
          type="button"
          disabled={loadingAction !== null}
          onClick={() => runAction("create-missing")}
          className="btn btn-primary justify-center px-4 py-3.5 text-[0.86rem] disabled:opacity-50"
        >
          {loadingAction === "create-missing" ? "Creating Fields…" : "2. Auto-Create Fields"}
        </button>

        <button
          type="button"
          disabled={loadingAction !== null}
          onClick={() => runAction("send-test")}
          className="btn btn-outline-dark justify-center px-4 py-3.5 text-[0.86rem] disabled:opacity-50"
        >
          {loadingAction === "send-test" ? "Sending Test Lead…" : "3. Send Test Lead"}
        </button>
      </div>

      {result ? (
        <div
          className={`mt-6 rounded-[0.9rem] border p-5 text-[0.9rem] leading-relaxed ${
            result.ok
              ? "border-emerald-300 bg-emerald-50 text-emerald-950"
              : "border-rose-300 bg-rose-50 text-rose-950"
          }`}
        >
          {!result.ok ? (
            <p className="font-semibold">{result.error}</p>
          ) : result.action === "send-test" ? (
            <div>
              <p className="font-display text-[1.05rem] font-bold">
                Test Lead Sent to Momentum CRM!
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Momentum Location ID:</strong> <code className="font-mono">{result.locationId}</code>
                </li>
                <li>
                  <strong>Created / Upserted Contact ID:</strong> <code className="font-mono">{result.contactId}</code>
                </li>
                <li>
                  <strong>Populated Custom Fields:</strong> {result.mappedCustomFieldCount} fields + Tags + Full Contact Note
                </li>
              </ul>
              <p className="mt-3 text-[0.84rem]">
                Open <strong>Contacts</strong> inside Momentum CRM and search for{" "}
                <strong>Jordan Reeves (Sample Lead)</strong> to see every mapped field and the formatted Note.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-display text-[1.05rem] font-bold">
                {result.action === "create-missing"
                  ? "Custom Field Sync Complete!"
                  : "Momentum CRM Connected Successfully!"}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>Momentum Location ID:</strong> <code className="font-mono">{result.locationId}</code>
                </li>
                <li>
                  <strong>Total Website Form Fields:</strong> {result.totalCatalogFields}
                </li>
                <li>
                  <strong>Matched in Momentum CRM:</strong> {result.matchedCount}
                </li>
                {result.action === "create-missing" ? (
                  <li>
                    <strong>Newly Created in Momentum CRM:</strong> {result.createdCount}
                  </li>
                ) : null}
                <li>
                  <strong>Remaining Unmatched Fields:</strong> {result.missingCount}
                </li>
              </ul>
              {result.missingFieldNames && result.missingFieldNames.length > 0 ? (
                <details className="mt-3">
                  <summary className="cursor-pointer font-semibold underline">
                    View {result.missingFieldNames.length} missing fields (click &ldquo;2. Auto-Create Fields&rdquo; above to add them)
                  </summary>
                  <ul className="mt-2 max-h-56 overflow-y-auto rounded bg-white/80 p-3 font-mono text-[0.76rem] text-navy-900">
                    {result.missingFieldNames.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
