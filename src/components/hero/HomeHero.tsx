import Link from "next/link";
import { Container, Btn, Chip } from "@/components/ui";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { SplitHeading, Reveal } from "@/components/motion";
import { org, trust } from "@/content/site";

/**
 * Homepage banner.
 *
 * Mobile contract ("must show full on mobile screens"): the banner photograph
 * is a full-bleed background layer behind the copy, so it fills the whole band
 * edge to edge on every viewport instead of sitting in a plate on one side.
 * Nothing is cropped out of frame and no block overflows the viewport width.
 *
 * Original headline promise (\"get started, grow quickly, and operate
 * profitably — without incurring debt!\") and both phone lines stay surfaced,
 * since phone calls are the highest-intent conversion here.
 */
export function HomeHero() {
  return (
    <header className="hero-shell relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[calc(62.5vw+1.5rem)] lg:min-h-[92svh] lg:pt-[126px]">
      <HeroBanner
        image="/images/hero/home.jpg"
        alt="QP Trucking Solutions client fleet running interstate at golden hour"
        priority
      />

      <Container className="relative flex flex-1 items-center">
        <div className="w-full min-w-0 max-w-[46rem]">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Chip tone="gold">Pure Non-Recourse™ factoring</Chip>
            <Chip tone="dark">Insurance</Chip>
            <Chip tone="dark">Authority &amp; compliance</Chip>
          </div>

          <SplitHeading
            as="h1"
            immediate
            delay={0.12}
            text="Get started, grow quickly, and operate profitably — without incurring debt!"
            className="font-display text-display-lg font-extrabold text-white max-w-[17ch] sm:max-w-[19ch]"
          />

          <p className="mt-4 max-w-[56ch] text-hero-body text-steel-200/90 sm:mt-5">
            QP Trucking Solutions turns your freight invoices into same-day cash, keeps your authority compliant, and
            places the insurance brokers demand — all from one family-owned team in Louisville, Kentucky.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <Btn href="/get-started" variant="primary" size="lg" withArrow className="w-full py-3.5 sm:w-auto sm:py-4">
              Become a QP client
            </Btn>
            <Btn href={`tel:${org.officePhone}`} variant="outline" size="lg" className="w-full py-3.5 sm:w-auto sm:py-4">
              {org.officePhoneDisplay}
            </Btn>
          </div>

          {/* both phone lines, always visible — the original site's key feature */}
          <div className="mt-6 grid max-w-[34rem] gap-2.5 sm:grid-cols-2">
            <a
              href={`tel:${org.salesPhone}`}
              className="glass flex items-center justify-between gap-3 rounded-[1rem] px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5 sm:py-3.5"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-gold-400">
                  Become a QP client
                </span>
                <span className="mt-1 block font-display text-[1.05rem] font-bold text-white">
                  {org.salesPhoneDisplay}
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-950">
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </a>
            <a
              href={`tel:${org.officePhone}`}
              className="glass flex items-center justify-between gap-3 rounded-[1rem] px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5 sm:py-3.5"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brand-300">
                  Office / accounting
                </span>
                <span className="mt-1 block font-display text-[1.05rem] font-bold text-white">
                  {org.officePhoneDisplay}
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M4.2 3.3h3l1.4 3.5-2 1.4a10.4 10.4 0 0 0 5.2 5.2l1.4-2 3.5 1.4v3c0 .8-.7 1.4-1.5 1.4A14.6 14.6 0 0 1 2.8 4.8c0-.8.6-1.5 1.4-1.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </a>
          </div>

          <Reveal delay={0.3} className="mt-4 hidden sm:block">
            <p className="text-[0.82rem] text-white/60">
              Not sure how to get started?{" "}
              <Link href="/get-started" className="font-semibold text-white underline decoration-gold-400/60 underline-offset-4 hover:decoration-gold-400">
                Have one of our experts contact you
              </Link>{" "}
              for a free consultation.
            </p>
          </Reveal>
        </div>
      </Container>

      <div className="relative border-t border-white/12 bg-navy-950/45 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 gap-y-4 py-4 sm:grid-cols-4">
            {trust.stats.map((s, i) => (
              <div
                key={s.label}
                className={`min-w-0 ${i > 1 ? "hidden sm:block" : ""} ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-5" : ""
                }`}
              >
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/55">{s.label}</dt>
                <dd className="mt-1 truncate font-display text-[1rem] font-bold text-white sm:text-[1.06rem]">
                  {s.value.toLocaleString()}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </header>
  );
}
