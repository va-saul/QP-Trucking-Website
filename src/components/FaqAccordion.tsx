"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Faq } from "@/lib/types";
import { useEntranceAnimation } from "@/components/EntranceSession";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Accordion FAQ. Answers stay in the DOM and in the JSON-LD (FAQPage) so search
 * engines and AI answer engines can read every word even when collapsed.
 */
export function FaqAccordion({
  faqs,
  tone = "light",
  columns = 1,
  defaultOpen = 0,
}: {
  faqs: Faq[];
  tone?: "light" | "dark";
  columns?: 1 | 2;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const isDark = tone === "dark";
  const listRef = useRef<HTMLDivElement | null>(null);
  const animateEntrance = useEntranceAnimation();

  // answers slide in as the list scrolls into view
  useEffect(() => {
    const el = listRef.current;
    if (!el || !animateEntrance) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-faq-item]"),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [animateEntrance, faqs]);

  return (
    <div ref={listRef} className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            data-faq-item
            className={`overflow-hidden rounded-[1rem] border transition-colors duration-300 ${
              isDark
                ? isOpen
                  ? "border-gold-400/45 bg-white/[0.07]"
                  : "border-white/12 bg-white/[0.035] hover:border-white/25"
                : isOpen
                  ? "border-brand-300 bg-brand-100/50"
                  : "border-steel-200 bg-paper hover:border-brand-300/70"
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span
                  className={`font-display text-[1rem] font-bold leading-snug sm:text-[1.06rem] ${
                    isDark ? "text-white" : "text-navy-900"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[1rem] font-bold transition-transform duration-300 ${
                    isDark ? "border-white/25 text-white" : "border-navy-900/20 text-navy-900"
                  } ${isOpen ? "rotate-45 bg-gold-400 text-navy-900 border-gold-400" : "rotate-0"}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div className="faq-panel" data-open={isOpen}>
              <div>
                <p
                  className={`px-5 pb-5 text-[0.95rem] leading-relaxed sm:px-6 sm:pb-6 ${
                    isDark ? "text-steel-200/85" : "text-steel-600"
                  }`}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
