/**
 * Tiny bridge between the opening SiteIntro sequence and hero animations:
 * the intro fires `qp:reveal` the moment its curtain starts lifting, and
 * intro-gated elements (like the homepage H1) start their own reveal then.
 * When no intro ever runs, `markRevealed` is fired immediately instead.
 */
export const REVEAL_EVENT = "qp:reveal";

declare global {
  interface Window {
    /** Set once the site intro has finished (or was skipped) this load. */
    __qpRevealed?: boolean;
  }
}

export const isRevealed = () => typeof window !== "undefined" && Boolean(window.__qpRevealed);

export function markRevealed() {
  if (typeof window === "undefined" || window.__qpRevealed) return;
  window.__qpRevealed = true;
  window.dispatchEvent(new Event(REVEAL_EVENT));
}
