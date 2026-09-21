"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LOGO_SRC } from "@/components/brand";
import { org } from "@/content/site";
import { prefersReducedMotion } from "@/components/motion";

/**
 * THE 3D STARTUP ANIMATION.
 *
 * Plays once per page load, before the hero takes over: the QP mark flips in
 * on a true 3D axis (rotationY/rotationX with a transformPerspective) over a
 * perspective highway grid rushing toward the viewer, the wordmark rises
 * word-by-word out of the floor in rotateX, then the whole stage tilts back
 * and lifts away in Z to hand the page to the hero entrance.
 *
 * Guarantees:
 *  · the same single logo file (`LOGO_SRC`) is used — no second artwork;
 *  · crawlers / no-JS visitors never see the curtain (CSS gates it on
 *    `js-anim`, which only exists once JS runs);
 *  · `prefers-reduced-motion` skips it entirely;
 *  · click / tap / any key skips straight to the page;
 *  · body scroll is locked only while the intro is on screen.
 */
export function SiteIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || done) return;

    const finish = () => {
      document.body.style.overflow = "";
      setDone(true);
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ onComplete: finish });

      tl
        // curtain on
        .fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" })
        // highway grid rises into perspective
        .fromTo(
          "[data-intro-road]",
          { yPercent: 55, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out" },
          0,
        )
        // the mark: full 3D flip-in
        .fromTo(
          "[data-intro-logo]",
          { rotationY: -128, rotationX: 24, scale: 0.55, autoAlpha: 0, transformPerspective: 1000 },
          { rotationY: 0, rotationX: 0, scale: 1, autoAlpha: 1, duration: 1.05, ease: "power3.out" },
          0.15,
        )
        .fromTo(
          "[data-intro-glow]",
          { scale: 0.4, autoAlpha: 0 },
          { scale: 1, autoAlpha: 0.9, duration: 0.8, ease: "power2.out" },
          0.4,
        )
        // wordmark rises out of the floor, word by word, in rotateX
        .fromTo(
          "[data-intro-word]",
          { rotationX: 88, yPercent: 45, autoAlpha: 0, transformPerspective: 700 },
          { rotationX: 0, yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09, ease: "power3.out" },
          0.8,
        )
        .fromTo(
          "[data-intro-tag]",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
          1.2,
        )
        // exit: the stage tilts back and flies past the camera…
        .to(
          "[data-intro-stage]",
          { z: 300, rotationX: 16, autoAlpha: 0, duration: 0.65, ease: "power3.in" },
          1.85,
        )
        // …and the curtain lifts
        .to(root, { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 2.1);
    }, root);

    const skip = () => tl?.progress(1);
    root.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      root.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <div ref={rootRef} className="intro-overlay" aria-hidden="true">
      <span data-intro-road className="intro-road" />
      <div
        data-intro-stage
        className="relative flex flex-col items-center gap-6 px-6 text-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="relative block">
          <span data-intro-glow className="absolute -inset-9 rounded-full bg-brand-400/25 blur-3xl" />
          {/* the one and only logo file — never a second artwork */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-intro-logo
            src={LOGO_SRC}
            alt=""
            width={132}
            height={132}
            className="relative block h-[104px] w-[104px] drop-shadow-[0_18px_44px_rgba(4,18,42,0.65)] sm:h-[132px] sm:w-[132px]"
          />
        </span>
        <p className="flex flex-wrap justify-center gap-x-3 font-display text-[1.55rem] font-extrabold tracking-tight text-navy-900 sm:text-[2.1rem]">
          {org.name.split(" ").map((w) => (
            <span key={w} data-intro-word className="inline-block">
              {w}
            </span>
          ))}
        </p>
        <p data-intro-tag className="eyebrow text-brand-500">
          Pure Non-Recourse™ factoring · Insurance · Compliance
        </p>
      </div>
    </div>
  );
}
