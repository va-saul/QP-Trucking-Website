import Link from "next/link";
import type { ReactNode } from "react";
import { org, phones } from "@/content/site";
import { BrandLockup } from "@/components/brand";
import { CountUp, Reveal } from "@/components/motion";
import { Marquee, RuleDraw } from "@/components/motion-extra";
import type { Service } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  LAYOUT                                                            */
/* ------------------------------------------------------------------ */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8 ${className ?? ""}`}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "bone" | "steel" | "navy" | "ink";
  id?: string;
}) {
  const tones: Record<string, string> = {
    paper: "bg-paper text-navy-900",
    bone: "bg-bone text-navy-900",
    steel: "bg-steel-50 text-navy-900",
    navy: "bg-navy-900 text-white",
    ink: "bg-navy-950 text-white",
  };
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-28 ${tones[tone]} ${className ?? ""}`}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "dark",
  cta,
  rule = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  cta?: ReactNode;
  rule?: boolean;
}) {
  const isDark = tone === "dark";
  return (
    <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center mx-auto" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
        {eyebrow ? <p className={`eyebrow mb-3 ${isDark ? "text-brand-500" : "text-gold-400"} ${align === "center" ? "mx-auto" : ""}`}>{eyebrow}</p> : null}
        {rule ? <RuleDraw className={`mb-5 mx-auto ${align === "center" ? "mx-auto" : ""} ${isDark ? "bg-steel-200" : "bg-white/20"}`} /> : null}
        <h2 className={`font-display text-display-md ${isDark ? "text-navy-900" : "text-white"} ${align === "center" ? "mx-auto text-center" : ""}`}>{title}</h2>
        {intro ? (
          <p className={`mt-4 text-[1.02rem] leading-relaxed ${isDark ? "text-steel-600" : "text-white/75"} ${align === "center" ? "mx-auto text-center" : ""}`}>{intro}</p>
        ) : null}
      </div>
      {cta ? <div className={`shrink-0 ${align === "center" ? "mx-auto" : ""}`}>{cta}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BUTTONS                                                           */
/* ------------------------------------------------------------------ */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "outlineDark" | "ghost" | "link";
  size?: "md" | "lg" | "sm";
  className?: string;
  withArrow?: boolean;
  ariaLabel?: string;
};

export function Btn({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ariaLabel,
}: BtnProps) {
  const sizes = { sm: "px-4 py-2.5 text-[0.86rem]", md: "px-6 py-3.5 text-[0.95rem]", lg: "px-7 py-4 text-[1rem]" };
  const variants = {
    primary: "btn-primary",
    gold: "btn-gold",
    outline: "btn-outline",
    outlineDark: "btn-outline-dark",
    ghost: "btn-ghost",
    link: "text-brand-500 hover:text-brand-400 underline-offset-4 hover:underline",
  };
  const cls = `btn ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {withArrow ? (
        <svg viewBox="0 0 20 20" className="relative z-10 h-4 w-4 shrink-0" aria-hidden="true">
          <path
            d="M4 10h11M10.5 5l5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </>
  );

  const isExternal = /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

export function CallBtn({ which = "sales", variant = "outline" }: { which?: "sales" | "office"; variant?: BtnProps["variant"] }) {
  const p = phones[which];
  return (
    <Btn href={`tel:${p.tel}`} variant={variant} size="md" ariaLabel={`Call ${p.display}`}>
      {p.display}
    </Btn>
  );
}

/** Small inline pill — used sparingly, for status/proof only. */
export function Chip({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" | "gold" | "brand" }) {
  const tones = {
    dark: "bg-white/8 text-white/85 border border-white/15",
    light: "bg-navy-900/4 text-navy-800 border border-navy-900/10",
    gold: "bg-gold-100 text-gold-600 border border-gold-400/40",
    brand: "bg-brand-100 text-brand-600 border border-brand-300/40",
  };
  return <span className={`chip ${tones[tone]}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  AEO: the quotable answer block                                    */
/* ------------------------------------------------------------------ */
export function AnswerBox({
  question,
  answer,
  tone = "light",
  label = "Quick answer",
}: {
  question: string;
  answer: string;
  tone?: "light" | "dark";
  label?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div className={`border-l-2 pl-5 sm:pl-6 ${isDark ? "border-gold-400" : "border-brand-500"}`}>
      <p className={`eyebrow mb-2 ${isDark ? "text-gold-400" : "text-brand-500"}`}>{label}</p>
      <p className={`font-display text-[1.05rem] font-bold sm:text-[1.15rem] ${isDark ? "text-white" : "text-navy-900"}`}>
        {question}
      </p>
      <p className={`mt-2 text-[0.98rem] leading-relaxed ${isDark ? "text-white/75" : "text-steel-700"}`}>{answer}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BREADCRUMBS                                                       */
/* ------------------------------------------------------------------ */
export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.76rem] text-white/55">
      {trail.map((t, i) => (
        <span key={t.label} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          {t.href && i < trail.length - 1 ? (
            <Link href={t.href} className="transition-colors hover:text-white">
              {t.label}
            </Link>
          ) : (
            <span className="text-white/85">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS                                                             */
/* ------------------------------------------------------------------ */
export function StatStrip({
  stats,
  tone = "dark",
}: {
  stats: { value: number; suffix?: string; label: string; sub?: string }[];
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 ${isDark ? "text-navy-900" : "text-white"}`}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="min-w-0">
          <div className={`border-t pt-5 ${isDark ? "border-steel-200" : "border-white/15"}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className={`font-display text-[2.1rem] font-extrabold leading-none sm:text-[2.6rem] ${isDark ? "text-navy-900" : "text-white"}`}>
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              </span>
              <p className={`mt-3 text-[0.9rem] font-semibold ${isDark ? "text-navy-900" : "text-white/90"}`}>{s.label}</p>
              {s.sub ? <p className={`mt-1 text-[0.82rem] ${isDark ? "text-steel-600" : "text-white/55"}`}>{s.sub}</p> : null}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST MARQUEE — scroll-reactive ticker                            */
/* ------------------------------------------------------------------ */
export function TrustMarquee({ items, tone = "navy" }: { items: string[]; tone?: "navy" | "bone" }) {
  const row = [...items, ...items];
  const isNavy = tone === "navy";
  return (
    <Marquee tone={tone} speed={52}>
      {row.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className={`eyebrow flex shrink-0 items-center gap-4 px-7 text-[0.68rem] ${isNavy ? "text-white/70" : "text-navy-800/70"}`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${isNavy ? "bg-gold-400/70" : "bg-brand-500/70"}`}
          />
          {t}
          <span className={isNavy ? "text-white/20" : "text-navy-900/20"}>·</span>
        </span>
      ))}
    </Marquee>
  );
}

/* ------------------------------------------------------------------ */
/*  PRICE TICKET — the one intentionally "designed" object            */
/* ------------------------------------------------------------------ */
export function PriceTicket({
  label,
  price,
  note,
  benchmark,
  cta,
}: {
  label: string;
  price: string;
  note?: string;
  benchmark?: string;
  cta?: ReactNode;
}) {
  return (
    <div className="ticket grid grid-cols-1 sm:grid-cols-[1fr_auto]">
      <div className="p-5 sm:p-6">
        <p className="eyebrow text-brand-500">{label}</p>
        <p className="mt-3 font-display text-[2.2rem] font-extrabold leading-none text-navy-900">{price}</p>
        {note ? <p className="mt-2 text-[0.86rem] font-semibold text-gold-600">{note}</p> : null}
        {benchmark ? <p className="mt-3 text-[0.86rem] leading-relaxed text-steel-600">{benchmark}</p> : null}
      </div>
      {cta ? <div className="ticket-perforation flex flex-col justify-center gap-3 p-5 sm:w-[250px] sm:p-6">{cta}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE CARD — quiet by default, no chrome                        */
/* ------------------------------------------------------------------ */
export function ServiceCard({ service, href, index }: { service: Service; href: string; index?: number }) {
  return (
    <Reveal className="h-full" delay={((index ?? 0) % 3) * 0.06}>
      <Link
        href={href}
        className="group flex h-full flex-col justify-between border-t border-steel-200 pt-5 transition-colors duration-300 hover:border-brand-400"
      >
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel-400">
            {typeof index === "number" ? String(index + 1).padStart(2, "0") : ""}
            {typeof index === "number" ? " · " : ""}
            {service.category}
          </p>
          <h3 className="mt-3 font-display text-[1.14rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-500">
            {service.short}
          </h3>
          <p className="mt-2.5 text-[0.92rem] leading-relaxed text-steel-600">{service.tagline}</p>
        </div>
        <div className="mt-5 flex items-center gap-3 text-[0.82rem]">
          <span className="font-mono font-medium text-brand-500">
            {service.price?.tiers?.[0]?.price ?? "Flat fee"}
            {service.price?.tiers?.[1] ? ` · ${service.price.tiers[1].price} clients` : ""}
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-steel-200 transition-colors duration-300 group-hover:bg-brand-300"
          />
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-navy-900 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS — numbered rows, no boxes                                 */
/* ------------------------------------------------------------------ */
export function ProcessSteps({
  steps,
  tone = "dark",
}: {
  steps: { n?: string; title: string; body: string }[];
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.08} className={`border-t pt-5 ${isDark ? "border-steel-200" : "border-white/15"}`}>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-500">
            {s.n ?? String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-3 font-display text-[1.1rem] font-bold ${isDark ? "text-navy-900" : "text-white"}`}>{s.title}</h3>
          <p className={`mt-2.5 text-[0.94rem] leading-relaxed ${isDark ? "text-steel-600" : "text-white/70"}`}>{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA BAND — closing conversion block, kept calm                    */
/* ------------------------------------------------------------------ */
export function CtaBand({
  eyebrow = "Ready when you are",
  title,
  body,
  serviceId,
  primaryLabel = "Start my application",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  serviceId?: string;
  primaryLabel?: string;
  tone?: "navy" | "gold";
}) {
  const href = serviceId ? `/get-started?service=${serviceId}` : "/get-started";
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <span aria-hidden="true" className="stripe-band absolute inset-0 opacity-20" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[360px] rounded-full bg-brand-500/15 blur-[120px]"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_auto]">
          <div>
            <p className="eyebrow text-gold-400">{eyebrow}</p>
            <h2 className="mt-4 font-display text-display-sm text-white">{title}</h2>
            <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-white/70">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Btn href={href} variant="gold" size="lg" withArrow>
              {primaryLabel}
            </Btn>
            <Btn href={`tel:${org.salesPhone}`} variant="outline" size="lg">
              Call {org.salesPhoneDisplay}
            </Btn>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[0.88rem]">
          {[
            { k: "Sales", v: org.salesPhoneDisplay, href: `tel:${org.salesPhone}` },
            { k: "Office / accounting", v: org.officePhoneDisplay, href: `tel:${org.officePhone}` },
            { k: "Email", v: org.email, href: `mailto:${org.email}` },
          ].map((r) => (
            <span key={r.k} className="flex items-baseline gap-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/45">{r.k}</span>
              <a href={r.href} className="font-display text-[1rem] font-bold text-white hover:text-gold-400">
                {r.v}
              </a>
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RELATED SERVICES — a quiet link list                              */
/* ------------------------------------------------------------------ */
export function RelatedServices({ items }: { items: { label: string; href: string; blurb: string }[] }) {
  return (
    <ul className="grid gap-px overflow-hidden border-t border-steel-200 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((r, i) => (
        <Reveal as="li" key={r.href} delay={i * 0.05} className="min-w-0">
          <Link href={r.href} className="group flex h-full flex-col justify-between gap-4 py-6 pr-6">
            <div>
              <h3 className="font-display text-[1.05rem] font-bold text-navy-900 transition-colors group-hover:text-brand-500">
                {r.label}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-steel-600">{r.blurb}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-brand-500">
              Explore
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST LIST — inline, no pills                                     */
/* ------------------------------------------------------------------ */
export function TrustBadges({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <ul className={`grid gap-x-8 gap-y-2.5 sm:grid-cols-2 ${isDark ? "text-white/80" : "text-navy-800"}`}>
      {items.map((b) => (
        <li key={b} className="flex items-center gap-3 text-[0.92rem]">
          <span className={`h-1 w-1 shrink-0 rounded-full ${isDark ? "bg-gold-400" : "bg-brand-500"}`} />
          {b}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS — quotes divided by hairlines, not cards             */
/* ------------------------------------------------------------------ */
export function Testimonials({ items }: { items: { quote: string; name: string; detail: string }[] }) {
  return (
    <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      {items.map((t, i) => (
        <Reveal key={t.quote} delay={i * 0.06} className="border-t border-white/12 pt-6">
          <figure>
            <blockquote className="font-display text-[1.1rem] font-medium leading-relaxed text-white/90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/50">
              {t.name}
              <span aria-hidden="true" className="h-px w-6 bg-white/25" />
              {t.detail}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

export { BrandLockup };
