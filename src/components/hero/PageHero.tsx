import type { ReactNode } from "react";
import { Container, Btn, Breadcrumbs, Chip } from "@/components/ui";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { SplitHeading } from "@/components/motion";
import { org } from "@/content/site";
import type { AccentKey, HeroVariant } from "@/lib/types";

/**
 * The hero band used by every interior page.
 *
 * The page's banner photograph is a full-bleed background layer behind the
 * copy — the whole picture fills the band on mobile and desktop alike, instead
 * of being boxed into a plate on the right-hand side of the screen.
 *
 * Mobile contract (\"must show full on mobile screens\"):
 *  · min-height in `svh` units so phone browser chrome never clips it
 *  · copy clamps down to small-screen sizes and stays inside the viewport
 *  · the banner is background-positioned `cover`, so it always fills the frame
 *    edge to edge with no letterboxing and no sideways overflow
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
  chips = [],
  stats = [],
  primaryHref,
  primaryLabel = "Apply now",
  secondaryHref,
  secondaryLabel,
  priority = false,
  children,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  /** Retained for call-site compatibility (artwork is now the full-bleed banner). */
  variant: HeroVariant;
  accent?: AccentKey;
  trail: { label: string; href?: string }[];
  chips?: string[];
  stats?: { label: string; value: string }[];
  primaryHref: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  void variant;

  const accentDot: Record<AccentKey, string> = {
    blue: "bg-brand-300",
    gold: "bg-gold-400",
    teal: "bg-teal-400",
  };

  return (
    <header className="hero-shell relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[calc(62.5vw+1.5rem)] lg:min-h-[90svh] lg:pt-[124px]">
      <HeroBanner image={image} alt={imageAlt} priority={priority} />

      <Container className="relative flex flex-1 items-center">
        <div className="w-full min-w-0 max-w-[46rem] pb-1 sm:pb-2 lg:pb-4">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Breadcrumbs trail={trail} />
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Chip tone="gold">{eyebrow}</Chip>
            {chips.slice(0, 3).map((c) => (
              <Chip key={c} tone="dark">
                {c}
              </Chip>
            ))}
          </div>

          <SplitHeading
            as="h1"
            text={title}
            immediate
            delay={0.15}
            className="font-display text-display-lg font-extrabold text-white max-w-[19ch] sm:max-w-[22ch]"
          />

          <p className="mt-4 max-w-[54ch] text-hero-body text-steel-200/90 sm:mt-5">{tagline}</p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
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

          <ul className="mt-6 hidden flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-white/70 sm:mt-7 sm:flex">
            {[
              { icon: "shield", text: "No long-term contract" },
              { icon: "bolt", text: "Setup in under 24 hours" },
              { icon: "pin", text: `Louisville, KY · serving 48 states` },
            ].map((t) => (
              <li key={t.text} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${accentDot[accent]}`} />
                {t.text}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* stat rail */}
      {stats.length ? (
        <div className="relative border-t border-white/12 bg-navy-950/45 backdrop-blur-sm">
          <Container>
            <dl className="grid grid-cols-2 gap-y-4 py-4 sm:grid-cols-4 sm:gap-y-0">
              {stats.slice(0, 4).map((s, i) => (
                <div
                  key={s.label}
                  className={`min-w-0 ${i > 1 ? "hidden sm:block" : ""} ${i > 0 ? "sm:pl-5" : ""} ${
                    i === 0 ? "" : "sm:border-l sm:border-white/10"
                  }`}
                >
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/55">{s.label}</dt>
                  <dd className="mt-1 truncate font-display text-[1rem] font-bold text-white sm:text-[1.08rem]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      ) : null}

      {children}
    </header>
  );
}
