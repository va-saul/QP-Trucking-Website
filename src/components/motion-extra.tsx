"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEntranceAnimation } from "@/components/EntranceSession";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * One marquee pass on the entry page, responsive to scroll speed/direction.
 * Later pages and reduced-motion visits get a static row, not a repeating ticker.
 */
export function Marquee({
  children,
  speed = 42,
  className,
  tone = "navy",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  tone?: "navy" | "bone";
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animateEntrance = useEntranceAnimation();

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !animateEntrance) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: "none",
      });

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 320);
          const dir = self.direction === -1 ? -1 : 1;
          gsap.to(tween, {
            timeScale: dir * (1 + Math.abs(v) * 0.6),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => st.kill();
    }, wrap);

    return () => ctx.revert();
  }, [animateEntrance, speed]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden border-y ${
        tone === "navy" ? "border-white/10 bg-navy-950/70 text-white" : "border-navy-900/10 bg-bone text-navy-900"
      } ${className ?? ""}`}
    >
      <div ref={trackRef} className="flex w-max py-4 will-change-transform">
        {children}
      </div>
    </div>
  );
}

/** Hairline rule that draws itself as the section scrolls into view. */
export function RuleDraw({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const animateEntrance = useEntranceAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el || !animateEntrance) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [animateEntrance]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`block h-px w-full origin-left bg-steel-200 ${className ?? ""}`}
      style={{ transform: "scaleX(1)" }}
    />
  );
}
