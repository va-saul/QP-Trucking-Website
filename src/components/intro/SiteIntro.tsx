"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Truck3D } from "@/components/intro/Truck3D";
import { LogoStacked } from "@/components/brand";
import { markRevealed } from "@/lib/reveal";

/**
 * The opening cinematic: a GSAP-choreographed CSS-3D QP truck hauls across
 * a perspective freeway, pauses under the brand lockup, then accelerates
 * off as the curtain lifts onto the hero.
 *
 * It only ever plays for real users who can see it:
 *  - renders nothing without JS (gated by the `js-anim` html class), and
 *  - is skipped for reduced-motion visitors and for the rest of the session
 *    (the `intro-skip` class is stamped by an inline script before paint).
 */
export function SiteIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    /* Second+ visit, reduced motion, or no-JS: never animate — just make
       sure gated hero content plays immediately. */
    if (document.documentElement.classList.contains("intro-skip")) {
      markRevealed();
      setGone(true);
      return;
    }

    document.body.style.overflow = "hidden";

    let tl: gsap.core.Timeline | null = null;

    const finish = () => {
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("qp-intro-done", "1");
      } catch {
        /* private mode — the html class still covers this page view */
      }
      document.documentElement.classList.add("intro-skip");
      markRevealed();
      setGone(true);
    };

    /* skip on tap / click / Escape — fast-forward, don't jump-cut */
    const skip = () => {
      if (tl && tl.progress() < 1) tl.timeScale(3.4);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    el.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);

    let ctx: gsap.Context | undefined;
    try {
      ctx = gsap.context(() => {
      const rims = el.querySelectorAll(".qp3d-rim");
      const streaks = el.querySelectorAll(".qp-streak");

      /* perpetual motions, throttled up/down by timeScale */
      const spin = gsap.to(rims, { rotation: "+=360", ease: "none", duration: 0.42, repeat: -1 });
      const road = gsap.to(".qp-road-dashes", { backgroundPosition: "-=360px 0px", ease: "none", duration: 0.55, repeat: -1 });
      const idle = gsap.to(".qp3d", { y: -2.5, ease: "sine.inOut", duration: 0.65, repeat: -1, yoyo: true });
      spin.timeScale(0.01);
      road.timeScale(0.01);

      streaks.forEach((s, i) => {
        gsap.fromTo(
          s,
          { xPercent: -240, opacity: 0 },
          {
            xPercent: 260,
            opacity: 0.5,
            ease: "none",
            duration: 0.55 + i * 0.09,
            repeat: -1,
            repeatDelay: 0.35 + i * 0.18,
            delay: i * 0.14,
          },
        );
      });

      tl = gsap.timeline({ onComplete: finish });

      /* 1 — the rig rolls in off the freeway and eases to a stop */
      tl.fromTo(".qp3d-wrap", { x: "-135vw" }, { x: "0vw", duration: 1.25, ease: "power3.out" }, 0.15)
        .fromTo(spin, { timeScale: 5.5 }, { timeScale: 0.55, duration: 1.2, ease: "power2.out" }, 0.15)
        .fromTo(road, { timeScale: 5.5 }, { timeScale: 0.55, duration: 1.2, ease: "power2.out" }, 0.15)
        .fromTo(
          ".qp3d-wrap",
          { rotate: -1.1 },
          { rotate: 0, duration: 0.9, ease: "elastic.out(1.1, 0.5)" },
          0.55,
        )

        /* 2 — brand lockup rises over the idling truck */
        .fromTo(
          ".qp-intro-brand",
          { opacity: 0, y: 34, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
          1.0,
        )
        .fromTo(
          ".qp-intro-tag",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          1.22,
        )
        .fromTo(
          ".qp-intro-glow",
          { opacity: 0 },
          { opacity: 1, duration: 0.7, ease: "sine.out" },
          0.9,
        )

        /* 3 — punch it: the truck launches off-screen, curtain follows */
        .to({}, { duration: 0.55 })
        .to([".qp-intro-brand", ".qp-intro-tag", ".qp-intro-skip"], { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" })
        .to([spin, road], { timeScale: 9, duration: 0.5, ease: "power2.in" }, "<")
        .to(".qp3d-wrap", { x: "140vw", duration: 0.95, ease: "power3.in" }, "<+=0.02")
        .add(() => markRevealed(), "-=0.28")
        .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.28")
        .to(".qp-intro-scene", { yPercent: 14, duration: 0.85, ease: "power4.inOut" }, "<");
      }, el);
    } catch {
      /* if anything ever breaks in the sequence, drop the curtain now */
      finish();
    }

    return () => {
      el.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      ctx?.revert();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="qp-intro fixed inset-0 z-[200] overflow-hidden"
      style={{ background: "radial-gradient(1200px 640px at 50% 66%, #123a72 0%, #061a38 52%, #04122a 100%)" }}
    >
      <div className="qp-intro-scene grain absolute inset-0">
        {/* sky: blueprint grid + horizon glow */}
        <span aria-hidden="true" className="blueprint absolute inset-0 opacity-60" />
        <span
          aria-hidden="true"
          className="qp-intro-glow absolute left-1/2 top-1/2 h-[46vmin] w-[72vmin] -translate-x-1/2 -translate-y-[38%] rounded-full opacity-0"
          style={{ background: "radial-gradient(ellipse, rgba(47,111,224,.32), rgba(47,111,224,0) 66%)" }}
        />

        {/* speed streaks */}
        {[16, 27, 41, 57, 70].map((top, i) => (
          <span
            key={i}
            className="qp-streak absolute left-0 h-[2px] w-[26vw] opacity-0"
            style={{
              top: `${top}%`,
              background: "linear-gradient(90deg, transparent, rgba(233,238,246,.8) 45%, rgba(242,180,65,.9), transparent)",
            }}
          />
        ))}

        {/* the freeway — a perspective plane stretching below the fold,
            with scrolling lane dashes (each marking distorts naturally) */}
        <div className="qp-road absolute inset-x-0 bottom-0 h-[30%]" style={{ perspective: "700px" }}>
          <div
            className="absolute inset-x-0 top-0 h-[240%]"
            style={{
              transform: "rotateX(72deg)",
              transformOrigin: "50% 0%",
              background: "linear-gradient(180deg, #0e1f3a 0%, #081426 30%, #040b18 100%)",
              boxShadow: "inset 0 40px 70px -30px rgba(2,8,20,.9)",
            }}
          >
            {/* centre lane markings — painted once, scrolled by GSAP */}
            <div
              aria-hidden="true"
              className="qp-road-dashes absolute left-0 right-0"
              style={{
                top: "34%",
                height: 8,
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(242,180,65,.95) 0 60px, transparent 60px 180px)",
                backgroundSize: "360px 100%",
                boxShadow: "0 0 14px rgba(242,180,65,.35)",
              }}
            />
            <span aria-hidden="true" className="absolute left-0 right-0" style={{ top: "8%", height: 3, background: "rgba(233,238,246,.4)" }} />
            <span aria-hidden="true" className="absolute left-0 right-0" style={{ top: "62%", height: 4, background: "rgba(233,238,246,.22)" }} />
            {/* asphalt sheen */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(70% 90% at 50% 0%, rgba(47,111,224,.14), transparent 60%)" }}
            />
          </div>
          {/* horizon light */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(242,180,65,.55), transparent)" }}
          />
        </div>

        {/* the 3D rig */}
        <div className="qp3d-wrap absolute inset-x-0 bottom-[9%] flex justify-center">
          <div className="qp3d-scale relative" style={{ width: 640, height: 230, perspective: "1500px" }}>
            <Truck3D />
          </div>
        </div>

        {/* brand lockup */}
        <div className="qp-intro-brand absolute inset-x-0 top-[9%] flex flex-col items-center opacity-0 sm:top-[11%]">
          <LogoStacked tone="white" markClassName="h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20" />
          <span aria-hidden="true" className="mt-3 h-[3px] w-24 rounded-full" style={{ background: "linear-gradient(90deg,#e8a33d,#f2b441)" }} />
        </div>
        <p className="qp-intro-tag absolute inset-x-0 top-[41%] px-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.3em] text-gold-400 opacity-0 sm:top-[43%] sm:text-[0.72rem]">
          Factoring · Insurance · Authority &amp; Compliance
        </p>

        {/* skip hint */}
        <div className="qp-intro-skip absolute inset-x-0 bottom-[3.5%] text-center font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/50">
          Tap anywhere to skip
        </div>
      </div>
    </div>
  );
}
