"use client";

/**
 * Mobile bottom navigation — app-style dock that's always reachable on
 * phones. Restored per request:
 *
 *  · a prominent raised CALL button in the center (the 3464 sales line),
 *  · a "More" button opening the social-media drawer, whose default call
 *    line is 833-762-3464 (tel:+1-833-762-3464),
 *  · quick links (Home · Services · Contact) alongside.
 *
 * Replaces the sticky two-button CTA bar on small screens (they would
 * overlap); the sticky bar component itself is left untouched.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { org } from "@/content/site";

type NavItem = { label: string; href: string; icon: ReactNode };

const NavIcon = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  ),
  services: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3c0 1-.8 1.8-1.8 1.8A16 16 0 0 1 3.2 5.8C3.2 4.8 4 4 5 4Z" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  // close the drawer when the route changes
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // close on escape
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const items: NavItem[] = [
    { label: "Home", href: "/", icon: NavIcon.home },
    { label: "Services", href: "/services", icon: NavIcon.services },
    { label: "", href: `tel:${org.salesPhone}`, icon: NavIcon.phone },
    { label: "Contact", href: "/contact", icon: NavIcon.contact },
    { label: "More", href: "#more", icon: NavIcon.more },
  ];

  return (
    <>
      {/* More drawer: quick links + social media + the 3464 call line */}
      {moreOpen && (
        <div className="fixed inset-0 z-[56] lg:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" aria-hidden="true" />
          <div
            role="dialog"
            aria-label="More"
            className="absolute inset-x-3 bottom-[92px] rounded-[1.25rem] border border-white/15 bg-navy-900/95 p-4 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-gold-400">
              More · Follow QP Trucking Solutions
            </p>

            {/* quick links */}
            <div className="mb-3 grid grid-cols-4 gap-2 border-b border-white/10 pb-3">
              {[
                { label: "Get started", href: "/get-started" },
                { label: "About", href: "/about" },
                { label: "Store", href: "/store" },
                { label: "FAQ", href: "/faq" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl border border-white/10 bg-white/[0.05] py-2.5 text-center text-[0.68rem] font-semibold text-white/85 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* social media */}
            <div className="grid grid-cols-3 gap-3">
              <SocialButton href={org.facebook} label="Facebook" color="#1877F2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.6 1.6-1.6h1.7V3.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.7V13h2.7v8h3.1Z" />
                </svg>
              </SocialButton>
              <SocialButton href={org.instagram} label="Instagram" color="#E1306C">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </SocialButton>
              <SocialButton href={org.twitter} label="X" color="#fff">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.2 3h3l-6.6 7.5L22.5 21h-6l-4.7-6.2L6.4 21h-3l7-8L2.5 3h6.1l4.2 5.6L18.2 3Zm-1 16.2h1.7L7 4.7H5.2L17.2 19.2Z" />
                </svg>
              </SocialButton>
              <SocialButton href={org.linkedin} label="LinkedIn" color="#0A66C2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z" />
                </svg>
              </SocialButton>
              <SocialButton href={org.youtube} label="YouTube" color="#FF0000">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M22 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 5 12 5 12 5s-4.4 0-7.2.2c-.4.1-1.2.1-2 .9C2.2 6.6 2 8 2 8S1.8 9.7 1.8 11.3v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 7.3.2 7.3.2s4.4 0 7.2-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.4C22.2 9.7 22 8 22 8ZM9.8 15V9l5.2 3-5.2 3Z" />
                </svg>
              </SocialButton>
              <SocialButton href={org.tiktok} label="TikTok" color="#fff">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M19.3 7.2a5.6 5.6 0 0 1-3.4-1.2V15a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v2.9a3 3 0 1 0 2.1 2.8V2h2.8a5.6 5.6 0 0 0 3.4 4.3v2.9Z" />
                </svg>
              </SocialButton>
            </div>

            {/* the default call line — sales, ending in 3464 */}
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-3">
              <a
                href={`tel:${org.salesPhone}`}
                className="flex items-center justify-center gap-2 rounded-full bg-gold-400 py-3 text-[0.9rem] font-bold text-navy-950"
              >
                {NavIcon.phone}
                Call sales: {org.salesPhoneDisplay}
              </a>
              <a
                href={`tel:${org.officePhone}`}
                className="text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/55 hover:text-white"
              >
                Office: {org.officePhoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation bar */}
      <nav
        aria-label="Mobile bottom"
        className="fixed inset-x-0 bottom-0 z-[57] border-t border-white/10 bg-navy-950/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto flex max-w-md items-end justify-around px-2">
          {items.map((item, i) => {
            // Center call FAB — the 3464 line is one tap away
            if (i === 2) {
              return (
                <a
                  key="call"
                  href={`tel:${org.salesPhone}`}
                  aria-label={`Call QP Trucking Solutions at ${org.salesPhoneDisplay}`}
                  className="pulse-ring relative -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-navy-950 shadow-[0_10px_24px_-8px_rgba(242,180,65,0.8)]"
                >
                  {NavIcon.phone}
                </a>
              );
            }
            const active = item.label !== "More" && isActive(item.href);
            const isMore = item.label === "More";
            const cls = `flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[0.62rem] font-semibold transition-colors ${
              active
                ? "text-gold-400"
                : isMore && moreOpen
                  ? "text-gold-400"
                  : "text-white/65 hover:text-white"
            }`;
            if (isMore) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setMoreOpen((v) => !v);
                  }}
                  aria-label="More"
                  aria-expanded={moreOpen}
                  className={cls}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={cls}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function SocialButton({
  href,
  label,
  color,
  children,
}: {
  href: string;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex flex-col items-center gap-1.5 rounded-[0.9rem] border border-white/10 bg-white/[0.05] py-3 text-white transition-transform hover:-translate-y-0.5 hover:bg-white/[0.1]"
    >
      <span style={{ color }} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        {children}
      </span>
      <span className="text-[0.7rem] font-semibold">{label}</span>
    </a>
  );
}
