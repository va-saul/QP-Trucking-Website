import { Container, Btn } from "@/components/ui";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { HeroSpecCard } from "@/components/hero/HeroArt";
import { SplitHeading, Reveal } from "@/components/motion";
import { TruckLane } from "@/components/hero/TruckLane";
import { org, trust } from "@/content/site";

/**
 * Homepage banner — the biggest image on the site.
 *
 * The client photograph fills the entire first screen at every size; the
 * original promise ("get started, grow quickly, and operate profitably —
 * without incurring debt!") sits over the darker half, with both phone lines
 * one tap away. Everything else moved out of the hero so the photograph leads.
 */
export function HomeHero() {
  return (
    <header className="hero-shell relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[84px] sm:pt-[100px] lg:min-h-[92svh] lg:pt-[152px]">
      <HeroBackdrop
        image="/images/hero/home.jpg"
        alt="QP Trucking Solutions client fleet running interstate at golden hour"
        priority
        overlay="left"
      />

      <Container className="relative flex flex-1 items-end pb-8 sm:items-center sm:pb-4">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="min-w-0 text-center">
            <p className="eyebrow flex items-center justify-center gap-2.5 text-gold-400">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Pure Non-Recourse™ factoring · Insurance · Compliance
            </p>

            <SplitHeading
              as="h1"
              immediate
              delay={0.2}
              text="Get started, grow quickly, and operate profitably — without incurring debt!"
              className="mx-auto mt-3 max-w-[17ch] font-display text-display-lg font-extrabold text-white sm:max-w-[19ch] text-center"
            />

            <p className="mx-auto mt-4 max-w-[54ch] text-center text-hero-body text-white/80">
              QP Trucking Solutions turns your freight invoices into same-day cash, keeps your authority compliant, and
              places the insurance brokers demand — one family-owned team in Louisville, Kentucky, owned by Brandon Bennett.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Btn href="/get-started" variant="primary" size="lg" withArrow className="w-full py-3.5 sm:w-auto sm:py-4">
                Become a QP client
              </Btn>
              <Btn
                href={`tel:${org.officePhone}`}
                variant="outline"
                size="lg"
                className="w-full py-3.5 sm:w-auto sm:py-4"
              >
                {org.officePhoneDisplay}
              </Btn>
            </div>

            <Reveal delay={0.35} className="mt-6">
              <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-[0.82rem] text-white/65">
                {[
                  "Funding in ~15 minutes",
                  "Setup under 24 hours",
                  "No long-term contract",
                  `Sales ${org.salesPhoneDisplay}`,
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold-400" />
                    {t}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          <div className="hidden lg:block">
            <HeroSpecCard variant="highway" />
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/12 bg-navy-950/55 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 gap-y-4 py-4 sm:grid-cols-4">
            {trust.stats.map((s, i) => (
              <div
                key={s.label}
                className={`min-w-0 ${i > 1 ? "hidden sm:block" : ""} ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""
                }`}
              >
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/50">{s.label}</dt>
                <dd className="mt-1 truncate font-display text-[1rem] font-bold text-white sm:text-[1.05rem]">
                  {s.value.toLocaleString()}
                  {s.suffix}
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
