import type { ReactNode } from "react";
import { Container, Btn, Breadcrumbs } from "@/components/ui";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { HeroSpecCard } from "@/components/hero/HeroArt";
import { SplitHeading } from "@/components/motion";
import { TruckLane } from "@/components/hero/TruckLane";
import { org } from "@/content/site";
import type { AccentKey, HeroVariant } from "@/lib/types";

/**
 * The hero band used by every interior page.
 *
 * Layout brief: **the photograph is the banner.** It fills the whole hero at
 * every breakpoint — including phones, where the copy sits on the darker lower
 * half of the frame. Everything else is pared back to what a visitor needs:
 * what this page is, one line of proof, two actions, and a slim fact rail.
 *
 * Mobile contract: min-height in `svh` (browser chrome can never crop it),
 * clamped type, full-width taps, and no element may exceed the viewport width.
 */
export function PageHero({
  eyebrow,
  title,
  tagline,
  image,
  imageAlt,
  variant,
  accent = "blue",
  trail,
  stats = [],
  primaryHref,
  primaryLabel = "Apply now",
  secondaryHref,
  secondaryLabel,
  priority = false,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  variant: HeroVariant;
  accent?: AccentKey;
  trail: { label: string; href?: string }[];
  stats?: { label: string; value: string }[];
  primaryHref: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  const accentDot: Record<AccentKey, string> = {
    blue: "bg-brand-300",
    gold: "bg-gold-400",
    teal: "bg-teal-400",
  };

  return (
    <header className="hero-shell relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[84px] pb-0 sm:pt-[100px] lg:min-h-[90svh] lg:pt-[152px]">
      <HeroBackdrop image={image} alt={imageAlt} priority={priority} overlay="left" />

      <Container className="relative flex flex-1 items-end pb-8 sm:items-center sm:pb-4">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div className="min-w-0 text-center">
            <div className="flex justify-center">
              <Breadcrumbs trail={trail} />
            </div>

            <p className="eyebrow mt-5 flex items-center justify-center gap-2.5 text-gold-400">
              <span className={`h-1.5 w-1.5 rounded-full ${accentDot[accent]}`} />
              {eyebrow}
            </p>

            <SplitHeading
              as="h1"
              text={title}
              immediate
              delay={0.2}
              className="mx-auto mt-3 max-w-[20ch] text-center font-display text-display-lg font-extrabold text-white"
            />

            <p className="mx-auto mt-4 max-w-[52ch] text-center text-hero-body text-white/80">{tagline}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Btn href={primaryHref} variant="primary" size="lg" withArrow className="w-full py-3.5 sm:w-auto sm:py-4">
                {primaryLabel}
              </Btn>
              <Btn
                href={secondaryHref ?? `tel:${org.salesPhone}`}
                variant="outline"
                size="lg"
                className="w-full py-3.5 sm:w-auto sm:py-4"
              >
                {secondaryLabel ?? `Call ${org.salesPhoneDisplay}`}
              </Btn>
            </div>
          </div>

          {/* the page's own spec card — desktop only, so the phone view stays a photograph */}
          <div className="hidden lg:block">
            <HeroSpecCard variant={variant} />
          </div>
        </div>
      </Container>

      {/* slim fact rail — the page's headline numbers, always visible */}
      <div className="relative border-t border-white/12 bg-navy-950/55 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 gap-y-4 py-4 sm:grid-cols-4">
            {stats.slice(0, 4).map((s, i) => (
              <div
                key={s.label}
                className={`min-w-0 ${i > 1 ? "hidden sm:block" : ""} ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""
                }`}
              >
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/50">{s.label}</dt>
                <dd className="mt-1 truncate font-display text-[1rem] font-bold text-white sm:text-[1.05rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      <TruckLane />
    </header>
  );
}
