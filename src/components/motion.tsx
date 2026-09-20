"use client";

/**
 * Motion primitives built on GSAP 3 (ScrollTrigger + SplitText).
 * Everything degrades gracefully: content is only hidden once JS confirms it
 * can animate (the `js-anim` class is set by an inline script in <head>), and
 * every animation is skipped for users who prefer reduced motion.
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { REVEAL_EVENT, isRevealed } from "@/lib/reveal";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  Reveal — scroll-triggered fade/slide for any block                */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  stagger,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, direct children matching [data-item] are staggered. */
  stagger?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const items = stagger ? el.querySelectorAll("[data-item]") : null;
      const targets = items && items.length ? items : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref as never} className={className} data-reveal>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  SplitHeading — word-by-word mask reveal for display headings      */
/* ------------------------------------------------------------------ */
export function SplitHeading({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  immediate = false,
  waitForReveal = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  /** Play on mount instead of on scroll (used by the hero). */
  immediate?: boolean;
  /** Hold the animation until the site intro lifts its curtain (homepage). */
  waitForReveal?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let split: SplitText | null = null;
    let ctx: gsap.Context | null = null;
    let cancelled = false;
    let fallback: number | undefined;

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        split = SplitText.create(el, {
          type: "lines,words",
          linesClass: "split-line",
          wordsClass: "split-word",
          aria: "auto",
        });

        gsap.set(el, { opacity: 1, y: 0 });
        gsap.set(split.words, { yPercent: 118, opacity: 0 });
        gsap.set(split.lines, { overflow: "hidden", paddingBottom: "0.06em" });

        gsap.to(split.words, {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power4.out",
          delay,
          stagger: 0.045,
          ...(immediate ? {} : { scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
        });
      }, el);
    };

    // wait for webfonts so line breaks are measured correctly
    const boot = () => {
      if (cancelled) return;
      if (document.fonts?.status === "loaded") run();
      else document.fonts?.ready.then(() => run());
    };

    /* When the intro cinematic is playing, start only as its curtain lifts
       (or after a safety timeout if anything blocked it). */
    const gated = waitForReveal && !isRevealed();
    if (gated) {
      const onReveal = () => {
        window.removeEventListener(REVEAL_EVENT, onReveal);
        window.clearTimeout(fallback);
        boot();
      };
      window.addEventListener(REVEAL_EVENT, onReveal);
      fallback = window.setTimeout(onReveal, 5200);
    } else {
      boot();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
      split?.revert();
    };
  }, [text, delay, immediate, waitForReveal]);

  return (
    <Tag ref={ref} className={className} data-reveal>
      {text}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  CountUp — animated statistics                                     */
/* ------------------------------------------------------------------ */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.n).toLocaleString()}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax — subtle depth on decorative hero layers                 */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  strength = 60,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: strength * -0.5 },
        {
          y: strength,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [strength]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RouteProgress — the "rolling freight" reading indicator           */
/* ------------------------------------------------------------------ */
export function RouteProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const setWidth = (p: number) => {
      bar.style.transform = `scaleX(${p})`;
    };

    if (prefersReducedMotion()) return;

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      setWidth(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-brand-400 via-brand-300 to-gold-400"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic — pointer-reactive CTA lift (desktop pointers only)      */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.15);
      yTo(relY * 0.28);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Float — perpetual gentle drift for hero art accents               */
/* ------------------------------------------------------------------ */
export function Float({
  children,
  className,
  amount = 10,
  duration = 4.5,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const tween = gsap.to(el, {
      y: amount,
      duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
    };
  }, [amount, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
