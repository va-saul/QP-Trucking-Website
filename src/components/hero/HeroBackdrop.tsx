"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/components/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Full-bleed hero photograph.
 *
 * This is the "big hero image": the banner fills the entire hero band on every
 * breakpoint (including phones, where it reads as a full-screen photograph with
 * the headline sitting on the darker lower half). GSAP gives it a slow entrance
 * push-in and a scrubbed parallax as the page scrolls away.
 */
export function HeroBackdrop({
  image,
  alt,
  priority = false,
  overlay = "left",
}: {
  image: string;
  alt: string;
  priority?: boolean;
  /** Where the copy sits — controls which side the scrim darkens. */
  overlay?: "left" | "bottom";
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // entrance: slow push-in from a slightly larger crop
      gsap.fromTo(
        img,
        { scale: 1.14, opacity: 0.35 },
        { scale: 1.02, opacity: 1, duration: 1.9, ease: "power2.out" },
      );
      // scroll: the photograph drifts slower than the page, the content lifts away
      gsap.to(img, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: wrap, start: "top top", end: "bottom top", scrub: 0.8 },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div ref={imgRef} data-hero-media className="absolute inset-[-6%] will-change-transform">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* scrims keep the copy legible without hiding the photograph */}
      <span
        aria-hidden="true"
        className={
          overlay === "left"
            ? "absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-navy-950/95 lg:bg-gradient-to-r lg:from-navy-950/96 lg:via-navy-950/78 lg:to-navy-950/30"
            : "absolute inset-0 bg-gradient-to-b from-navy-950/88 via-navy-950/72 to-navy-950/96"
        }
      />
      {/* thin footer glow so the hero melts into the page */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent"
      />
    </div>
  );
}
