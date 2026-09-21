/** One shared entrance decision per tab session, never one storage check per effect. */
export const ENTRANCE_SESSION_KEY = "qp:entrance-seen:v1";
export const ENTRANCE_CHANGE_EVENT = "qp:entrance-change";

/**
 * Runs before hydration. All first-page effects share the same DOM flag, while
 * refreshes and subsequent document loads see the sessionStorage marker.
 * Storage blocked/unavailable? Fail open to a fully visible, static website.
 */
export const ENTRANCE_BOOTSTRAP = `(() => {
  try {
    const seen = window.sessionStorage.getItem(${JSON.stringify(ENTRANCE_SESSION_KEY)}) === "1";
    window.sessionStorage.setItem(${JSON.stringify(ENTRANCE_SESSION_KEY)}, "1");
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.dataset.qpEntryPath = window.location.pathname;
    document.documentElement.classList.add("js-anim");
  } catch {
    // The content and logo remain visible without storage or animation support.
  }
})();`;

export function getEntranceSnapshot(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const root = document.documentElement;
  return (
    root.classList.contains("js-anim") &&
    root.dataset.qpEntryPath === window.location.pathname &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Never re-enable within this document, including a return to its first URL. */
export function finishEntranceSession(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const root = document.documentElement;
  if (!root.classList.contains("js-anim") && root.dataset.qpEntryPath === undefined) return;
  root.classList.remove("js-anim");
  delete root.dataset.qpEntryPath;
  window.dispatchEvent(new Event(ENTRANCE_CHANGE_EVENT));
}

export function subscribeEntranceSession(listener: () => void): () => void {
  window.addEventListener(ENTRANCE_CHANGE_EVENT, listener);
  return () => window.removeEventListener(ENTRANCE_CHANGE_EVENT, listener);
}
