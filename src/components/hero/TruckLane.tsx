/**
 * Decorative "freight lane" strip: dashed lane markers with a QP truck rolling
 * across the bottom of the entry hero once. The session's `js-anim` flag
 * enables its CSS animation; subsequent pages and reduced-motion visits are static.
 * The decorative SVG remains aria-hidden.
 */
export function TruckLane({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 h-14 overflow-hidden ${className ?? ""}`}>
      <div className="lane-line absolute bottom-3 left-0 w-full opacity-25" />
      <div className="truck-roll absolute bottom-[13px]">
        <svg width="132" height="42" viewBox="0 0 132 42" fill="none" className="drop-shadow-[0_6px_18px_rgba(0,0,0,.55)]">
          {/* trailer */}
          <rect x="2" y="6" width="78" height="22" rx="2.5" fill="#e9eef6" />
          <rect x="2" y="6" width="78" height="22" rx="2.5" fill="url(#qpgrad)" fillOpacity="0.35" />
          <rect x="6" y="10" width="70" height="14" rx="1.5" fill="#0a2450" opacity="0.18" />
          {/* tractor */}
          <path d="M82 10h20l9 10v8H82V10Z" fill="#2f6fe0" />
          <rect x="103" y="14" width="16" height="12" rx="2" fill="#1b4fa0" />
          <path d="M119 18h8l3 6v4h-11v-10Z" fill="#e9eef6" />
          <rect x="82" y="26" width="48" height="4" rx="2" fill="#123a72" />
          {/* wheels */}
          <circle cx="20" cy="31" r="5" fill="#04122a" />
          <circle cx="62" cy="31" r="5" fill="#04122a" />
          <circle cx="92" cy="31" r="5" fill="#04122a" />
          <circle cx="118" cy="31" r="5" fill="#04122a" />
          <circle cx="20" cy="31" r="2" fill="#8a98ac" />
          <circle cx="62" cy="31" r="2" fill="#8a98ac" />
          <circle cx="92" cy="31" r="2" fill="#8a98ac" />
          <circle cx="118" cy="31" r="2" fill="#8a98ac" />
          <defs>
            <linearGradient id="qpgrad" x1="0" y1="0" x2="80" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2f6fe0" />
              <stop offset="1" stopColor="#04122a" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
