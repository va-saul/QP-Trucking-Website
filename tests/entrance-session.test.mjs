import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Use the existing TypeScript dev dependency; no browser or test framework is required.
const source = readFileSync(new URL("../src/lib/entrance-session.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function environment({ pathname = "/", storage = new Map(), reduced = false, storageError } = {}) {
  const classes = new Set();
  const root = {
    dataset: {},
    classList: {
      add: (value) => classes.add(value),
      remove: (value) => classes.delete(value),
      contains: (value) => classes.has(value),
    },
  };
  const window = Object.assign(new EventTarget(), {
    location: { pathname },
    matchMedia: () => ({ matches: reduced }),
    sessionStorage: {
      getItem(key) {
        if (storageError === "read") throw new Error("Storage blocked");
        return storage.get(key) ?? null;
      },
      setItem(key, value) {
        if (storageError === "write") throw new Error("Storage full");
        storage.set(key, value);
      },
    },
  });
  const sandbox = vm.createContext({ window, document: { documentElement: root }, Event, exports: {} });
  vm.runInContext(compiled, sandbox);
  const policy = sandbox.exports;
  return {
    window,
    root,
    storage,
    policy,
    bootstrap: () => vm.runInContext(policy.ENTRANCE_BOOTSTRAP, sandbox),
  };
}

test("server rendering is static and does not access browser APIs", () => {
  const sandbox = vm.createContext({ exports: {} });
  vm.runInContext(compiled, sandbox);
  assert.equal(sandbox.exports.getEntranceSnapshot(), false);
  assert.doesNotThrow(() => sandbox.exports.finishEntranceSession());
});

test("a fresh visitor gets the entrance on whichever page they open first", () => {
  for (const pathname of ["/", "/about", "/services/new-authority"]) {
    const env = environment({ pathname });
    env.bootstrap();
    assert.equal(env.policy.getEntranceSnapshot(), true);
    assert.equal(env.root.dataset.qpEntryPath, pathname);
    assert.equal(env.storage.get(env.policy.ENTRANCE_SESSION_KEY), "1");
  }
});

test("all entry-page components share the decision, without consuming each other's entrance", () => {
  const env = environment();
  env.storage.set("unrelated-setting", "keep-me");
  env.bootstrap();
  for (let i = 0; i < 20; i++) assert.equal(env.policy.getEntranceSnapshot(), true);
  assert.equal(env.storage.get("unrelated-setting"), "keep-me");
});

test("refreshes and full-document navigation within the same session stay static", () => {
  const first = environment();
  first.bootstrap();
  for (const pathname of ["/", "/about", "/contact"]) {
    const next = environment({ pathname, storage: first.storage });
    next.bootstrap();
    assert.equal(next.policy.getEntranceSnapshot(), false);
    assert.equal(next.root.classList.contains("js-anim"), false);
  }
});

test("client navigation ends the entrance permanently, including back/forward", () => {
  const env = environment({ pathname: "/about" });
  env.bootstrap();
  env.window.location.pathname = "/contact";
  assert.equal(env.policy.getEntranceSnapshot(), false);
  env.policy.finishEntranceSession();
  env.window.location.pathname = "/about";
  assert.equal(env.policy.getEntranceSnapshot(), false);
  assert.equal(env.root.dataset.qpEntryPath, undefined);
});

test("separate visitors or fresh tab sessions each get their own entrance", () => {
  const first = environment();
  first.bootstrap();
  first.policy.finishEntranceSession();
  const other = environment();
  other.bootstrap();
  assert.equal(other.policy.getEntranceSnapshot(), true);
});

test("reduced-motion preference skips the entrance and marks the session as visited", () => {
  const env = environment({ reduced: true });
  env.bootstrap();
  assert.equal(env.policy.getEntranceSnapshot(), false);
  assert.equal(env.storage.get(env.policy.ENTRANCE_SESSION_KEY), "1");
  const later = environment({ storage: env.storage, reduced: false });
  later.bootstrap();
  assert.equal(later.policy.getEntranceSnapshot(), false);
});

test("blocked or full session storage fails safely to static content", () => {
  for (const storageError of ["read", "write"]) {
    const env = environment({ storageError });
    assert.doesNotThrow(env.bootstrap);
    assert.equal(env.policy.getEntranceSnapshot(), false);
    assert.equal(env.root.classList.contains("js-anim"), false);
  }
});

test("finishing notifies mounted effects once so they clean up; subscriptions are removable", () => {
  const env = environment();
  env.bootstrap();
  let notifications = 0;
  const unsubscribe = env.policy.subscribeEntranceSession(() => notifications++);
  env.policy.finishEntranceSession();
  env.policy.finishEntranceSession();
  assert.equal(notifications, 1);
  assert.equal(env.policy.getEntranceSnapshot(), false);
  unsubscribe();
  env.window.dispatchEvent(new Event(env.policy.ENTRANCE_CHANGE_EVENT));
  assert.equal(notifications, 1);
});
