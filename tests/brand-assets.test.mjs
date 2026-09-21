import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const original = readFileSync(new URL("../Logo.png", import.meta.url));
const source = readFileSync(new URL("../src/content/brand.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const sandbox = vm.createContext({ exports: {} });
vm.runInContext(compiled, sandbox);
const { LOGO_SRC, LOGO_INTRINSIC } = sandbox.exports;

// A logo replacement must be an explicit, approved change — not a redesign side effect.
const approvedOriginalSha256 = "87dea8cc6e19e2967cf909b88a800ebe8952a307a6ca3d5c349150eae7aa58c6";

test("the original supplied Logo.png has not been redrawn or recolored", () => {
  assert.equal(createHash("sha256").update(original).digest("hex"), approvedOriginalSha256);
});

test("the website and browser icon serve the original logo byte-for-byte", () => {
  assert.equal(LOGO_SRC, "/images/brand/qp-logo-original.png");
  const served = readFileSync(new URL(`../public${LOGO_SRC}`, import.meta.url));
  const icon = readFileSync(new URL("../src/app/icon.png", import.meta.url));
  assert.deepEqual(served, original);
  assert.deepEqual(icon, original);
});

test("shared logo metadata preserves the original PNG dimensions", () => {
  assert.equal(original.subarray(1, 4).toString(), "PNG");
  assert.equal(original.readUInt32BE(16), LOGO_INTRINSIC.w);
  assert.equal(original.readUInt32BE(20), LOGO_INTRINSIC.h);
  assert.equal(LOGO_INTRINSIC.w / LOGO_INTRINSIC.h, 1);
});
