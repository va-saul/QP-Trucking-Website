"use client";

/**
 * ReviewsRail — the home-page review side scroller.
 *
 * One horizontally scrolling rail carrying every live review source:
 * YouTube video cards (real thumbnails), Google review cards and verified
 * Trustpilot cards. Scroll-snap, arrow buttons and mouse-drag all drive the
 * same rail; each card links out to its real source. Purely additive — no
 * existing home-page block is touched.
 */

import { useRef, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  googleReviews,
  reviewSources,
  trustpilotReviews,
  ytThumb,
  ytWatch,
  youtubeReviews,
  type TextReview,
  type YoutubeReview,
} from "@/content/reviews";

/* ------------------------------------------------------------------ */
/*  Source marks                                                       */
/* ------------------------------------------------------------------ */

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.63h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.18-2 3.44-4.96 3.44-8.56z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.03-6.45-4.75H1.71v2.98A11.99 11.99 0 0 0 12 24z"
      />
      <path fill="#FBBC05" d="M5.55 14.67a7.2 7.2 0 0 1 0-4.6V7.09H1.71a12 12 0 0 0 0 10.56l3.84-2.98z" />
      <path
        fill="#EA4335"
        d="M12 4.75c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.22 15.1 0 12 0 7.44 0 3.5 2.62 1.71 6.42l3.84 2.98C6.46 6.75 9 4.75 12 4.75z"
      />
    </svg>
  );
}

function GoldStars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[15px] w-[15px]" aria-hidden="true">
          <path
            d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.42 5.06 17l.94-5.5-4-3.9 5.53-.8L10 1.8z"
            fill="#FBBC04"
          />
        </svg>
      ))}
    </span>
  );
}

function TrustStar() {
  /* Trustpilot's star: white star on the brand-green square. */
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] shrink-0" aria-hidden="true">
      <rect width="24" height="24" rx="2" fill="#00B67A" />
      <path
        d="M12 3.6l2.45 4.96 5.48.8-3.96 3.86.94 5.46L12 16.11l-4.91 2.57.94-5.46-3.96-3.86 5.48-.8L12 3.6z"
        fill="#fff"
      />
    </svg>
  );
}

function SourceChip({ tone, children }: { tone: "yt" | "google" | "trust"; children: ReactNode }) {
  const tones = {
    yt: "bg-[#FF0000]/15 text-[#ff6b6b] border-[#FF0000]/25",
    google: "bg-white text-navy-800 border-navy-900/10",
    trust: "bg-[#00B67A]/12 text-[#33c99a] border-[#00B67A]/25",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Cards                                                              */
/* ------------------------------------------------------------------ */

/** Every rail item (the direct scroller child) carries the fixed width +
    snap alignment so flex never squeezes a card. */
const ITEM = "flex w-[290px] shrink-0 snap-start sm:w-[320px]";

function YouTubeCard({ video }: { video: YoutubeReview }) {
  return (
    <a
      href={ytWatch(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.1rem] border border-white/12 bg-white/[0.04] transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="relative block aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ytThumb(video.id)}
          alt={`Video review: ${video.label}`}
          width={480}
          height={360}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF0000] shadow-[0_10px_26px_-8px_rgba(255,0,0,0.7)] transition-transform duration-300 group-hover:scale-110"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-white">
            <path d="M7 5l8 5-8 5V5Z" fill="currentColor" />
          </svg>
        </span>
      </span>
      <span className="flex flex-col gap-3 p-4">
        <SourceChip tone="yt">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M22 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7.2.2c-.4.1-1.2.1-2 .9C2.2 6.6 2 8 2 8S1.8 9.7 1.8 11.3v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 7.3.2 7.3.2s4.4 0 7.2-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.4C22.2 9.7 22 8 22 8ZM9.8 15V9l5.2 3-5.2 3Z" />
          </svg>
          YouTube
        </SourceChip>
        <span className="block font-display text-[0.98rem] font-bold leading-snug text-white">{video.label}</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/55">Watch the review</span>
      </span>
    </a>
  );
}

function TextCard({ review }: { review: TextReview }) {
  const isGoogle = review.source === "google";
  return (
    <a
      href={isGoogle ? reviewSources.google.href : reviewSources.trustpilot.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col gap-4 rounded-[1.1rem] border border-navy-900/8 bg-white p-5 text-left shadow-[0_18px_40px_-24px_rgba(4,18,42,0.55)] transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="flex items-center justify-between">
        {isGoogle ? (
          <SourceChip tone="google">
            <GoogleG className="h-3 w-3" />
            Google review
          </SourceChip>
        ) : (
          <SourceChip tone="trust">
            <TrustStar />
            Trustpilot
          </SourceChip>
        )}
        {isGoogle ? <GoldStars /> : (
          <span className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <TrustStar key={i} />
            ))}
          </span>
        )}
      </span>

      {review.title ? (
        <span className="block font-display text-[0.98rem] font-bold leading-snug text-navy-900">{review.title}</span>
      ) : null}

      <span className="block text-[0.9rem] leading-relaxed text-steel-700">
        <span aria-hidden="true" className="font-display text-[1.05rem] font-bold text-navy-800">&ldquo;</span>
        {review.quote}
        <span aria-hidden="true" className="font-display text-[1.05rem] font-bold text-navy-800">&rdquo;</span>
      </span>

      <span className="mt-auto flex items-center gap-2.5 border-t border-steel-200 pt-3.5">
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-bold ${
            isGoogle ? "bg-brand-500 text-white" : "bg-[#00B67A] text-white"
          }`}
        >
          {review.name.charAt(0)}
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[0.8rem] font-semibold text-navy-900">{review.name}</span>
          {review.detail ? (
            <span className="truncate text-[0.7rem] text-steel-600">{review.detail}</span>
          ) : null}
        </span>
        {review.date ? (
          <span className="ml-auto shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-steel-400">
            {review.date}
          </span>
        ) : null}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Rail                                                               */
/* ------------------------------------------------------------------ */

function SourcePill({ s, icon }: { s: { label: string; sub: string; href: string }; icon: ReactNode }) {
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 transition-colors hover:bg-white/[0.12]"
    >
      <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center">{icon}</span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.8rem] font-bold text-white">{s.label}</span>
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/55">{s.sub}</span>
      </span>
    </a>
  );
}

export function ReviewsRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragMoved = useRef(false);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 680), behavior: "smooth" });
  };

  /* Mouse drag-to-scroll (touch natively scrolls). */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = railRef.current;
    if (!el) return;
    const startX = e.pageX;
    const origin = el.scrollLeft;
    dragMoved.current = false;
    el.classList.add("dragging");

    const move = (ev: globalThis.PointerEvent) => {
      const dx = ev.pageX - startX;
      if (Math.abs(dx) > 5) dragMoved.current = true;
      el.scrollLeft = origin - dx;
    };
    const up = () => {
      el.classList.remove("dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  /* Suppress the card link after a drag gesture. */
  const onClickCapture = (e: ReactMouseEvent) => {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      dragMoved.current = false;
    }
  };

  return (
    <div className="mt-10">
      {/* the three sources, each linking to the real profile */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <SourcePill
          s={reviewSources.youtube}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FF0000" aria-hidden="true">
              <path d="M22 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7.2.2c-.4.1-1.2.1-2 .9C2.2 6.6 2 8 2 8S1.8 9.7 1.8 11.3v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 7.3.2 7.3.2s4.4 0 7.2-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.4C22.2 9.7 22 8 22 8ZM9.8 15V9l5.2 3-5.2 3Z" />
            </svg>
          }
        />
        <SourcePill s={reviewSources.google} icon={<GoogleG className="h-5 w-5" />} />
        <SourcePill
          s={reviewSources.trustpilot}
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <rect width="24" height="24" rx="3" fill="#00B67A" />
              <path
                d="M12 3.6l2.45 4.96 5.48.8-3.96 3.86.94 5.46L12 16.11l-4.91 2.57.94-5.46-3.96-3.86 5.48-.8L12 3.6z"
                fill="#fff"
              />
            </svg>
          }
        />
      </div>

      <div className="group relative mt-8">
        {/* rail arrows */}
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll reviews left"
          className="absolute -left-3 top-[38%] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-navy-950/85 text-white/85 shadow-xl backdrop-blur transition-colors hover:bg-navy-900 hover:text-white sm:flex"
        >
          <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" aria-hidden="true">
            <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll reviews right"
          className="absolute -right-3 top-[38%] z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-navy-950/85 text-white/85 shadow-xl backdrop-blur transition-colors hover:bg-navy-900 hover:text-white sm:flex"
        >
          <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" aria-hidden="true">
            <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* edge fades */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-8 bg-gradient-to-r from-navy-950 to-transparent sm:w-12" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-8 bg-gradient-to-l from-navy-950 to-transparent sm:w-12" />

        {/* THE SIDE SCROLLER — YouTube + Google + Trustpilot */}
        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onClickCapture={onClickCapture}
          role="list"
          aria-label="Client reviews from YouTube, Google and Trustpilot"
          className="review-rail scroller flex cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto scroll-smooth px-1 pb-5 pt-1 active:cursor-grabbing sm:gap-5"
        >
          {youtubeReviews.map((v) => (
            <div role="listitem" key={v.id} className={ITEM}>
              <YouTubeCard video={v} />
            </div>
          ))}
          {googleReviews.map((r, i) => (
            <div role="listitem" key={`g-${i}`} className={ITEM}>
              <TextCard review={r} />
            </div>
          ))}
          {trustpilotReviews.map((r, i) => (
            <div role="listitem" key={`t-${i}`} className={ITEM}>
              <TextCard review={r} />
            </div>
          ))}

          {/* end cap — every source, all in one place */}
          <div role="listitem" className="flex w-[250px] shrink-0 snap-start items-center">
            <div className="flex w-full flex-col gap-3 rounded-[1.1rem] border border-dashed border-white/20 p-5 text-left">
              <span className="eyebrow text-gold-400">More reviews</span>
              <a href={reviewSources.youtube.href} target="_blank" rel="noopener noreferrer" className="link-sweep text-[0.88rem] font-semibold text-white">
                All video reviews on YouTube →
              </a>
              <a href={reviewSources.google.href} target="_blank" rel="noopener noreferrer" className="link-sweep text-[0.88rem] font-semibold text-white">
                QP on Google Maps →
              </a>
              <a href={reviewSources.trustpilot.href} target="_blank" rel="noopener noreferrer" className="link-sweep text-[0.88rem] font-semibold text-white">
                All 72 reviews on Trustpilot →
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">
        Swipe or drag · 18 reviews from 3 sources
      </p>
    </div>
  );
}
