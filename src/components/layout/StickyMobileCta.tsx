"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { org } from "@/content/site";

/**
 * Always-reachable conversion bar for phones: call or apply without scrolling
 * back up. Appears once the visitor has moved past the hero.
 */
export function StickyMobileCta({ label = "Start application" }: { label?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[58] border-t border-white/10 bg-navy-950/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={`tel:${org.salesPhone}`}
          className="btn btn-outline flex-1 py-3.5 text-[0.9rem]"
          aria-label={`Call QP Trucking Solutions at ${org.salesPhoneDisplay}`}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
              fill="currentColor"
            />
          </svg>
          Call now
        </a>
        <Link href="/get-started" className="btn btn-primary flex-[1.35] py-3.5 text-[0.9rem]">
          {label}
        </Link>
      </div>
    </div>
  );
}
