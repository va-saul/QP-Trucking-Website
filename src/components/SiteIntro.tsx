"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LOGO_SRC } from "@/components/brand";
import { org } from "@/content/site";
import { prefersReducedMotion } from "@/components/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * THE 3D TRUCK SPLASH — the Home-page startup animation.
 *
 * Plays like a splash screen whenever a visitor comes to the Home page
 * (`/`) — the site's front door. On an opaque night-sky stage (the site's
 * navy curtains), a perspective highway grid rushes toward the viewer while
 * a CSS-3D truck (real cuboid planes + spinning wheels, the supplied logo
 * on its trailer side) is GSAP-driven in from the horizon on the Z axis
 * with a rotationY swing. The QP mark flips in above it in true 3D, the
 * wordmark rises word-by-word in rotateX, then the truck drives off and the
 * two curtain halves split open to hand over to the hero.
 *
 * Guarantees:
 *  · only mounts on `/` (Home) — interior routes stay clean;
 *  · the curtains are fully opaque, so the splash sits on its own
 *    solid/gradient stage and never blends into page content;
 *  · one logo file only (`LOGO_SRC` = the supplied Logo.png, rendered in
 *    true colour — BRAND-LOCK.md);
 *  · crawlers / no-JS visitors never see the curtain (CSS gates on `js-anim`);
 *  · `prefers-reduced-motion` skips it entirely;
 *  · click / tap / any key skips straight to the page;
 *  · body scroll is locked only while the splash is on screen, and
 *    ScrollTrigger is refreshed when it lifts (so no reveal stays hidden).
 */
export function SiteIntro() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);
  /* Seed from the SSR pathname so the Home page renders the curtain in the
     server HTML — the opaque stage covers the hero from the first paint. */
  const [run, setRun] = useState(() => (pathname === "/" ? 1 : 0));
  const [finished, setFinished] = useState(0);
  const prevPath = useRef(pathname);

  /* A new run starts every time the Home page is opened (page load or
     in-app navigation). Leaving the Home page cancels any run. */
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (pathname !== "/") {
      setRun(0);
      return;
    }
    setRun((r) => r + 1);
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || run === 0 || run === finished) return;

    const finishNow = () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("qp:intro-done"));
      ScrollTrigger.refresh();
      setFinished(run);
    };

    if (prefersReducedMotion()) {
      finishNow();
      return;
    }

    document.body.style.overflow = "hidden";

    const vw = window.innerWidth;
    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ onComplete: finishNow });

      tl
        // highway grid rises into perspective
        .fromTo(
          "[data-intro-road]",
          { yPercent: 55, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out" },
          0,
        )
        // the 3D truck drives in from the horizon, swinging on Y
        .fromTo(
          "[data-intro-truck]",
          { x: -vw * 0.72, z: -650, rotationY: 34, autoAlpha: 0, transformPerspective: 1200 },
          { x: 0, z: 0, rotationY: 0, autoAlpha: 1, duration: 1.15, ease: "power3.out" },
          0.12,
        )
        .fromTo(
          "[data-intro-shadow]",
          { scaleX: 0.4, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out" },
          0.5,
        )
        // the mark: full 3D flip-in above the truck
        .fromTo(
          "[data-intro-logo]",
          { rotationY: -128, rotationX: 24, scale: 0.55, autoAlpha: 0, transformPerspective: 1000 },
          { rotationY: 0, rotationX: 0, scale: 1, autoAlpha: 1, duration: 0.95, ease: "power3.out" },
          0.7,
        )
        .fromTo(
          "[data-intro-glow]",
          { scale: 0.4, autoAlpha: 0 },
          { scale: 1, autoAlpha: 0.9, duration: 0.7, ease: "power2.out" },
          0.9,
        )
        // wordmark rises out of the floor, word by word, in rotateX
        .fromTo(
          "[data-intro-word]",
          { rotationX: 88, yPercent: 45, autoAlpha: 0, transformPerspective: 700 },
          { rotationX: 0, yPercent: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" },
          1.05,
        )
        .fromTo(
          "[data-intro-tag]",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          1.4,
        )
        // the truck drives off past the camera…
        .to(
          "[data-intro-truck]",
          { x: vw * 0.78, rotationY: -26, z: -120, duration: 0.75, ease: "power2.in" },
          2.0,
        )
        .to("[data-intro-shadow]", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, 2.0)
        // …the lockup tilts back and lifts away in Z…
        .to(
          "[data-intro-lockup]",
          { z: 300, rotationX: 16, autoAlpha: 0, duration: 0.55, ease: "power3.in" },
          2.15,
        )
        .to("[data-intro-road]", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, 2.2)
        // …and the two curtain halves split open
        .to("[data-intro-top]", { yPercent: -101, duration: 0.55, ease: "power4.inOut" }, 2.4)
        .to("[data-intro-bottom]", { yPercent: 101, duration: 0.55, ease: "power4.inOut" }, 2.4)
        .to(root, { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, 2.85);
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
  }, [run, finished]);

  if (run === finished) return null;

  return (
    <div ref={rootRef} className="intro-overlay" aria-hidden="true">
      <span data-intro-top className="intro-half intro-half-top" />
      <span data-intro-bottom className="intro-half intro-half-bottom" />
      <span data-intro-road className="intro-road" />

      <div className="relative z-10 grid h-full place-items-center">
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          {/* logo + wordmark lockup */}
          <div
            data-intro-lockup
            className="flex flex-col items-center gap-5"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="relative block">
              <span data-intro-glow className="absolute -inset-9 rounded-full bg-brand-400/25 blur-3xl" />
              {/* the one and only logo file — true colour (BRAND-LOCK.md) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-intro-logo
                src={LOGO_SRC}
                alt=""
                width={560}
                height={560}
                className="relative block h-[86px] w-[86px] drop-shadow-[0_18px_44px_rgba(4,18,42,0.65)] sm:h-[104px] sm:w-[104px]"
              />
            </span>
            <p className="flex flex-wrap justify-center gap-x-3 font-display text-[1.45rem] font-extrabold tracking-tight text-white sm:text-[1.9rem]">
              {org.name.split(" ").map((w) => (
                <span key={w} data-intro-word className="inline-block">
                  {w}
                </span>
              ))}
            </p>
            <p data-intro-tag className="eyebrow -mt-2 text-gold-400">
              Pure Non-Recourse™ factoring · Insurance · Compliance
            </p>
          </div>

          {/* the CSS-3D truck */}
          <div data-intro-truck className="truck3d-wrap mt-2" style={{ transformStyle: "preserve-3d" }}>
            <span data-intro-shadow className="truck3d-shadow" />
            <div className="truck3d">
              {/* trailer */}
              <div className="t-face t-trailer-side">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="truck3d-logo" src={LOGO_SRC} alt="" />
                <span className="truck3d-word">
                  QP Trucking
                  <small>Solutions</small>
                </span>
              </div>
              <div className="t-face t-trailer-side-far" />
              <div className="t-face t-trailer-top" />
              <div className="t-face t-trailer-back" />
              <div className="t-face t-trailer-front" />
              {/* cab */}
              <div className="t-face t-cab-side" />
              <div className="t-face t-cab-side-far" />
              <div className="t-face t-cab-top" />
              <div className="t-face t-cab-front" />
              {/* wheels */}
              <span className="t-wheel t-wheel-near-1">
                <i />
              </span>
              <span className="t-wheel t-wheel-near-2">
                <i />
              </span>
              <span className="t-wheel t-wheel-near-3">
                <i />
              </span>
              <span className="t-wheel t-wheel-far-1">
                <i />
              </span>
              <span className="t-wheel t-wheel-far-2">
                <i />
              </span>
              <span className="t-wheel t-wheel-far-3">
                <i />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
