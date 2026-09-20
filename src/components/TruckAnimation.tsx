"use client";

/**
 * Page-enter truck animation — a QP truck drives across the screen with
 * "QP Trucking Solutions" written on the trailer, using GSAP for smooth
 * motion. Plays once per route change (on initial mount) then fades out
 * so the site becomes interactive.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/components/motion";

export function TruckAnimation() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const truckRef = useRef<SVGGElement | null>(null);
  const trailerRef = useRef<SVGRectElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const wheelsRef = useRef<SVGGElement | null>(null);
  const smokeRefs = useRef<(SVGGElement | null)[]>([]);
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const truck = truckRef.current;
    const trailer = trailerRef.current;
    const text = textRef.current;
    const wheels = wheelsRef.current;
    if (!overlay || !truck || !trailer || !text || !wheels) return;

    // reduced motion: skip the intro, remove overlay immediately
    if (prefersReducedMotion()) {
      setVisible(false);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(truck, { xPercent: -120, y: 0 });
      gsap.set(text, { opacity: 0, y: 6 });
      gsap.set(smokeRefs.current, { scale: 0.1, opacity: 0, transformOrigin: "center" });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlay, {
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: () => setVisible(false),
          });
        },
      });

      // 1. Truck enters from left, smooth easing
      tl.to(truck, {
        xPercent: -5,
        duration: 1.5,
        ease: "power2.out",
      })
        // 2. Pause + let text fade in on trailer
        .to(text, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
        // 3. Slight "delivering" pause
        .to({}, { duration: 0.35 })
        // 4. Truck drives off to the right
        .to(truck, {
          xPercent: 120,
          duration: 1.2,
          ease: "power2.in",
        }, "+=0.1");

      // Continuous wheel rotation while the timeline plays
      if (wheels) {
        gsap.to(wheels.querySelectorAll("circle.wheel"), {
          rotation: 360 * 6,
          duration: tl.totalDuration() + 0.2,
          ease: "none",
        });
      }

      // Trailer subtle bob
      gsap.to(truck, {
        y: -2,
        duration: 0.35,
        yoyo: true,
        repeat: 6,
        ease: "sine.inOut",
      });

      // Puffs of smoke from the exhaust during exit
      smokeRefs.current.forEach((s, i) => {
        if (!s) return;
        gsap.to(s, {
          scale: 1.6,
          opacity: 0.7,
          duration: 0.6,
          delay: 2.1 + i * 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.1,
        });
      });
    }, overlay);

    return () => ctx.revert();
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-950"
    >
      {/* subtle backdrop glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 65%, rgba(47,111,224,0.35), transparent 70%)",
        }}
      />

      {/* Road line */}
      <div className="absolute bottom-[28%] left-0 right-0 h-[3px] overflow-hidden opacity-40">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #f2b441 0, #f2b441 44px, transparent 44px, transparent 88px)",
            backgroundSize: "88px 3px",
            backgroundRepeat: "repeat-x",
          }}
        />
      </div>

      <svg
        viewBox="0 0 800 220"
        className="relative w-[min(92vw,680px)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="qp-truck-grad" x1="0" y1="0" x2="480" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2f6fe0" />
            <stop offset="100%" stopColor="#061a38" />
          </linearGradient>
          <linearGradient id="qp-tractor-grad" x1="0" y1="0" x2="0" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3f82f0" />
            <stop offset="100%" stopColor="#1b4fa0" />
          </linearGradient>
          <linearGradient id="qp-cab-grad" x1="0" y1="0" x2="60" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2f6fe0" />
            <stop offset="100%" stopColor="#0a2450" />
          </linearGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="400" cy="180" rx="260" ry="10" fill="rgba(0,0,0,0.35)" />

        <g ref={truckRef}>
          {/* SMOKE PUFFS (exhaust) */}
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              ref={(el) => {
                smokeRefs.current[i] = el;
              }}
              transform={`translate(${605 - i * 12}, ${78 - i * 4})`}
            >
              <circle r={8 - i * 1.2} fill="rgba(255,255,255,0.55)" />
            </g>
          ))}

          {/* TRAILER */}
          <g>
            <rect
              ref={trailerRef}
              x="20"
              y="50"
              width="430"
              height="110"
              rx="8"
              fill="#eef3fa"
              stroke="#b9c6d8"
              strokeWidth="2"
            />
            <rect x="20" y="50" width="430" height="110" rx="8" fill="url(#qp-truck-grad)" opacity="0.08" />

            {/* Decorative stripe */}
            <rect x="20" y="126" width="430" height="10" fill="#1b4fa0" />
            <rect x="20" y="126" width="430" height="4" fill="#f2b441" />

            {/* QP Monogram badge */}
            <g transform="translate(48, 70)">
              <circle cx="22" cy="22" r="21" fill="none" stroke="#1b4fa0" strokeWidth="4" />
              <path d="M22 2v40M22 22H2M22 22h40M4 22A18 18 0 0 1 22 4v18H4Z" fill="#1b4fa0" opacity="0.55" stroke="#1b4fa0" strokeWidth="3" strokeLinecap="round" />
              <path d="M40 22A18 18 0 0 1 22 40V22h18Z" fill="#1b4fa0" opacity="0.25" />
            </g>

            {/* "QP Trucking Solutions" text on trailer */}
            <text
              ref={textRef}
              x="245"
              y="100"
              textAnchor="middle"
              fontFamily="Bitter, Georgia, serif"
              fontWeight="800"
              fontSize="30"
              fill="#061a38"
              letterSpacing="0.5"
            >
              QP Trucking
            </text>
            <text
              x="245"
              y="124"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              fontSize="16"
              fill="#1b4fa0"
              letterSpacing="3"
            >
              SOLUTIONS
            </text>
          </g>

          {/* TRACTOR / CAB */}
          <g>
            {/* Main cab body */}
            <path
              d="M460 70 h90 l30 34 v46 h-120 v-80z"
              fill="url(#qp-tractor-grad)"
            />
            {/* Sleeper/window section */}
            <path d="M460 70 h34 v80 h-34z" fill="#0a2450" opacity="0.55" />
            {/* Windshield */}
            <path d="M498 74 h50 l26 30 h-76 z" fill="#cfe0fa" opacity="0.9" />
            <path d="M498 74 h50 l26 30 h-76 z" fill="#0a2450" opacity="0.15" />
            {/* Window divider */}
            <line x1="530" y1="76" x2="544" y2="104" stroke="#0a2450" strokeWidth="1.5" opacity="0.5" />
            {/* Front bumper/grill */}
            <rect x="580" y="90" width="22" height="50" rx="3" fill="#04122a" />
            <rect x="582" y="96" width="18" height="4" rx="1" fill="#2f6fe0" />
            <rect x="582" y="104" width="18" height="4" rx="1" fill="#2f6fe0" />
            <rect x="582" y="112" width="18" height="4" rx="1" fill="#2f6fe0" />
            <rect x="582" y="120" width="18" height="4" rx="1" fill="#f2b441" />
            {/* Headlight */}
            <circle cx="592" cy="96" r="4" fill="#fdf1dc" />
            {/* Exhaust pipe */}
            <rect x="456" y="42" width="8" height="40" rx="2" fill="#4a5770" />
            <rect x="454" y="38" width="12" height="8" rx="2" fill="#2a3448" />
            {/* Chassis */}
            <rect x="458" y="146" width="144" height="8" rx="3" fill="#04122a" />
            {/* Gold accent stripe */}
            <rect x="460" y="140" width="142" height="4" fill="#f2b441" />
          </g>

          {/* WHEELS */}
          <g ref={wheelsRef}>
            {[80, 280, 380, 490, 560].map((cx, i) => (
              <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 162px`, transformBox: "fill-box" }}>
                <circle cx={cx} cy={162} r="18" fill="#04122a" />
                <circle cx={cx} cy={162} r="18" fill="none" stroke="#1a2742" strokeWidth="2" />
                <circle cx={cx} cy={162} r="8" fill="#8a98ac" />
                <circle cx={cx} cy={162} r="3" fill="#04122a" />
                {/* lug nuts */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <circle
                    key={deg}
                    cx={cx + Math.cos((deg * Math.PI) / 180) * 12}
                    cy={162 + Math.sin((deg * Math.PI) / 180) * 12}
                    r="1.8"
                    fill="#3a4459"
                  />
                ))}
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Loading tagline */}
      <div className="absolute bottom-[18%] left-0 right-0 text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-gold-400/90">
          Delivering your route…
        </p>
      </div>
    </div>
  );
}
