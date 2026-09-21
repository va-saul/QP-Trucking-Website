"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  finishEntranceSession,
  getEntranceSnapshot,
  subscribeEntranceSession,
} from "@/lib/entrance-session";

const getServerSnapshot = () => false;

/** Shared by every decorative GSAP effect; the server always renders the final content. */
export function useEntranceAnimation(): boolean {
  return useSyncExternalStore(subscribeEntranceSession, getEntranceSnapshot, getServerSnapshot);
}

/** Lives in the persistent root layout, outside the per-page component tree. */
export function EntranceSession() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Clear before a new page paints, and notify mounted effects to clean up.
    // Deleting the entry path prevents back/forward navigation from replaying it.
    const entryPath = document.documentElement.dataset.qpEntryPath;
    if (entryPath !== undefined && pathname !== entryPath) finishEntranceSession();
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => {
      if (media.matches) finishEntranceSession();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) finishEntranceSession();
    };

    onPreferenceChange();
    media.addEventListener("change", onPreferenceChange);
    window.addEventListener("pagehide", finishEntranceSession);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      media.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("pagehide", finishEntranceSession);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
