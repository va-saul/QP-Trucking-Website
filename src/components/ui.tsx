import Link from "next/link";
import type { ReactNode } from "react";
import { org, phones } from "@/content/site";
import { QPMark } from "@/components/brand";
import { CountUp, Reveal } from "@/components/motion";
import type { Service } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  LAYOUT                                                            */
/* ------------------------------------------------------------------ */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-7 lg:px-8 ${className ?? ""}`}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "bone" | "steel" | "navy" | "blueprint";
  id?: string;
}) {
  const tones: Record<string, string> = {
    paper: "bg-paper text-navy-900",
    bone: "bg-bone text-navy-900",
    steel: "bg-steel-50 text-navy-900",
    navy: "bg-navy-900 text-white",
    blueprint: "bg-navy-950 text-white",
  };
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className ?? ""}`}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  cta,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  cta?: ReactNode;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={`max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
        {eyebrow ? (
          <p className={`eyebrow mb-3 ${isDark ? "text-brand-500" : "text-gold-400"}`}>
            <span className="inline-flex items-center gap-2">
              <span className={`h-px w-6 ${isDark ? "bg-brand-500" : "bg-gold-400"}`} />
              {eyebrow}
            </span>
          </p>
        ) : null}
        <h2 className={`font-display text-display-md ${isDark ? "text-navy-900" : "text-white"}`}>{title}</h2>
        {intro ? (
          <p className={`mt-4 text-[1.02rem] leading-relaxed ${isDark ? "text-steel-600" : "text-steel-200/85"}`}>
            {intro}
          </p>
        ) : null}
      </div>
      {cta ? <div className="shrink-0">{cta}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BUTTONS                                                           */
/* ------------------------------------------------------------------ */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "outlineDark" | "ghost";
  size?: "md" | "lg" | "sm";
  className?: string;
  withArrow?: boolean;
  ariaLabel?: string;
};

export function Btn({ href, children, variant = "primary", size = "md", className, withArrow = false, ariaLabel }: BtnProps) {
  const sizes = {
    sm: "px-4 py-2.5 text-[0.86rem]",
    md: "px-6 py-3.5 text-[0.95rem]",
    lg: "px-7 py-4 text-[1rem]",
  };
  const variants = {
    primary: "btn-primary",
    gold: "btn-gold",
    outline: "btn-outline",
    outlineDark: "btn-outline-dark",
    ghost: "text-brand-500 hover:text-brand-400 underline-offset-4 hover:underline",
  };
  const cls = `btn ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {withArrow ? (
        <svg viewBox="0 0 20 20" className="relative z-10 h-4 w-4 shrink-0" aria-hidden="true">
          <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
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

export function Chip({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" | "gold" | "brand" }) {
  const tones = {
    dark: "bg-white/10 text-white border border-white/20",
    light: "bg-navy-900/5 text-navy-800 border border-navy-900/10",
    gold: "bg-gold-100 text-gold-600 border border-gold-400/40",
    brand: "bg-brand-100 text-brand-600 border border-brand-300/50",
  };
  return <span className={`chip ${tones[tone]}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  AEO: the "quick answer" block that AI engines love to quote       */
/* ------------------------------------------------------------------ */
export function AnswerBox({ question, answer, tone = "light" }: { question: string; answer: string; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <div
      className={`relative overflow-hidden rounded-[1.15rem] border p-5 sm:p-7 ${
        isDark ? "border-white/15 bg-white/[0.06] text-white" : "border-brand-300/40 bg-brand-100/70 text-navy-900"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-[5px] ${isDark ? "bg-gold-400" : "bg-brand-500"}`}
      />
      <p className={`eyebrow mb-2.5 ${isDark ? "text-gold-400" : "text-brand-600"}`}>Quick answer</p>
      <p className="font-display text-[1.05rem] font-bold sm:text-[1.15rem]">{question}</p>
      <p className={`mt-2 text-[0.98rem] leading-relaxed ${isDark ? "text-steel-200/90" : "text-steel-700"}`}>{answer}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BREADCRUMBS                                                       */
/* ------------------------------------------------------------------ */
export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] text-white/65">
      {trail.map((t, i) => (
        <span key={t.label} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          {t.href && i < trail.length - 1 ? (
            <Link href={t.href} className="hover:text-white">
              {t.label}
            </Link>
          ) : (
            <span className="text-white/90">{t.label}</span>
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
    <dl className={`grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4 ${isDark ? "text-white" : "text-navy-900"}`}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="min-w-0">
          <div className={`${isDark ? "border-white/15" : "border-navy-900/10"} border-t pt-4`}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className={`font-display text-[2rem] font-extrabold leading-none sm:text-[2.5rem] ${isDark ? "text-white" : "text-navy-900"}`}>
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              </span>
              <p className={`mt-2 text-[0.92rem] font-semibold ${isDark ? "text-white/90" : "text-navy-900"}`}>{s.label}</p>
              {s.sub ? <p className={`mt-1 text-[0.82rem] ${isDark ? "text-steel-200/70" : "text-steel-600"}`}>{s.sub}</p> : null}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST MARQUEE                                                     */
/* ------------------------------------------------------------------ */
export function TrustMarquee({ items, tone = "navy" }: { items: string[]; tone?: "navy" | "bone" }) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y ${
        tone === "navy" ? "border-white/10 bg-navy-950/60 text-white" : "border-navy-900/10 bg-bone text-navy-900"
      }`}
    >
      <div className="marquee py-4">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="eyebrow flex shrink-0 items-center gap-4 px-6 text-[0.72rem]">
            <QPMark tone={tone === "navy" ? "white" : "navy"} className="h-4 w-4 opacity-70" />
            {t}
            <span className={tone === "navy" ? "text-white/25" : "text-navy-900/25"}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE + PRICE CARDS                                             */
/* ------------------------------------------------------------------ */
export function PriceTicket({
  label,
  price,
  note,
  benchmark,
  cta,
  tone = "light",
}: {
  label: string;
  price: string;
  note?: string;
  benchmark?: string;
  cta?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="ticket grid grid-cols-1 sm:grid-cols-[1fr_auto]">
      <div className="p-5 sm:p-6">
        <p className="eyebrow text-brand-500">{label}</p>
        <p className="mt-3 font-display text-[2.1rem] font-extrabold leading-none text-navy-900">{price}</p>
        {note ? <p className="mt-2 text-[0.86rem] text-gold-600 font-semibold">{note}</p> : null}
        {benchmark ? <p className="mt-3 text-[0.86rem] leading-relaxed text-steel-600">{benchmark}</p> : null}
      </div>
      {cta ? (
        <div className="ticket-perforation flex flex-col justify-center gap-3 p-5 sm:w-[260px] sm:p-6">{cta}</div>
      ) : null}
    </div>
  );
}

export function ServiceCard({ service, href, index }: { service: Service; href: string; index?: number }) {
  return (
    <Reveal className="h-full" delay={(index ?? 0) * 0.05}>
      <Link
        href={href}
        className="card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.15rem] border border-steel-200 bg-paper p-5 sm:p-6"
      >
        <div className="relative">
          <p className="eyebrow text-steel-400">
            {typeof index === "number" ? String(index + 1).padStart(2, "0") : service.category}
          </p>
          <h3 className="mt-3 font-display text-[1.18rem] font-bold leading-snug text-navy-900">{service.short}</h3>
          <p className="mt-2.5 line-clamp-3 text-[0.92rem] leading-relaxed text-steel-600">{service.tagline}</p>
        </div>
        <div className="relative mt-5 flex items-center justify-between border-t border-steel-100 pt-4">
          <span className="font-mono text-[0.8rem] font-medium text-brand-500">
            {service.price?.tiers?.[0]?.price ?? service.price?.summary.split("—")[0].slice(0, 22) ?? "Learn more"}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900/5 text-navy-900 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS                                                           */
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
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
          <div
            className={`relative h-full rounded-[1.15rem] border p-6 ${
              isDark ? "border-navy-900/10 bg-steel-50" : "border-white/12 bg-white/[0.05]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute right-5 top-4 font-display text-[2.6rem] font-extrabold leading-none ${
                isDark ? "text-navy-900/10" : "text-white/10"
              }`}
            >
              {s.n ?? String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={`relative font-display text-[1.15rem] font-bold ${isDark ? "text-navy-900" : "text-white"}`}>
              {s.title}
            </h3>
            <p className={`relative mt-3 text-[0.94rem] leading-relaxed ${isDark ? "text-steel-600" : "text-steel-200/85"}`}>
              {s.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA BAND — the closing conversion block used on every page        */
/* ------------------------------------------------------------------ */
export function CtaBand({
  eyebrow = "Ready when you are",
  title,
  body,
  serviceId,
  primaryLabel = "Start my application",
  tone = "navy",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  serviceId?: string;
  primaryLabel?: string;
  tone?: "navy" | "gold";
}) {
  const href = serviceId ? `/get-started?service=${serviceId}` : "/get-started";
  const isGold = tone === "gold";
  return (
    <section className={`relative overflow-hidden ${isGold ? "bg-gold-100" : "hero-shell"}`}>
      <Container className="relative py-14 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_auto]">
          <div>
            <p className={`eyebrow mb-3 ${isGold ? "text-gold-600" : "text-gold-400"}`}>
              <span className="inline-flex items-center gap-2">
                <span className={`h-px w-6 ${isGold ? "bg-gold-600" : "bg-gold-400"}`} />
                {eyebrow}
              </span>
            </p>
            <h2 className={`font-display text-display-sm ${isGold ? "text-navy-900" : "text-white"}`}>{title}</h2>
            <p className={`mt-3 max-w-2xl text-[1rem] leading-relaxed ${isGold ? "text-steel-700" : "text-steel-200/85"}`}>
              {body}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Btn href={href} variant="gold" size="lg" withArrow>
              {primaryLabel}
            </Btn>
            <Btn href={`tel:${org.salesPhone}`} variant={isGold ? "outlineDark" : "outline"} size="lg">
              Call {org.salesPhoneDisplay}
            </Btn>
          </div>
        </div>
        <div className={`mt-8 grid gap-4 border-t pt-6 sm:grid-cols-3 ${isGold ? "border-gold-600/20" : "border-white/12"}`}>
          {[
            { k: "Sales & new clients", v: org.salesPhoneDisplay, href: `tel:${org.salesPhone}` },
            { k: "Office / accounting", v: org.officePhoneDisplay, href: `tel:${org.officePhone}` },
            { k: "Email us", v: org.email, href: `mailto:${org.email}` },
          ].map((r) => (
            <div key={r.k}>
              <p className={`eyebrow text-[0.64rem] ${isGold ? "text-steel-600" : "text-white/55"}`}>{r.k}</p>
              <a
                href={r.href}
                className={`mt-1 inline-block font-display text-[1.05rem] font-bold ${isGold ? "text-navy-900" : "text-white"} hover:underline`}
              >
                {r.v}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RELATED SERVICES                                                  */
/* ------------------------------------------------------------------ */
export function RelatedServices({ items }: { items: { label: string; href: string; blurb: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((r, i) => (
        <Reveal key={r.href} delay={i * 0.06}>
          <Link
            href={r.href}
            className="card-hover group flex h-full flex-col justify-between rounded-[1rem] border border-steel-200 bg-paper p-5"
          >
            <div>
              <p className="eyebrow text-brand-500">Also at QP</p>
              <h3 className="mt-2.5 font-display text-[1.05rem] font-bold text-navy-900">{r.label}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-steel-600">{r.blurb}</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-brand-500">
              Explore
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST BADGES                                                      */
/* ------------------------------------------------------------------ */
export function TrustBadges({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((b) => (
        <li
          key={b}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold ${
            isDark ? "border-white/15 bg-white/[0.06] text-white/90" : "border-steel-200 bg-paper text-navy-800"
          }`}
        >
          <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${isDark ? "text-gold-400" : "text-brand-500"}`} aria-hidden="true">
            <path d="m5 10.5 3.2 3.2L15 6.9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {b}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                      */
/* ------------------------------------------------------------------ */
export function Testimonials({ items }: { items: { quote: string; name: string; detail: string }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((t, i) => (
        <Reveal key={t.quote} delay={i * 0.07}>
          <figure className="relative h-full overflow-hidden rounded-[1.15rem] border border-white/12 bg-white/[0.05] p-6">
            <span aria-hidden="true" className="absolute right-5 top-2 font-display text-[4rem] leading-none text-white/10">
              &rdquo;
            </span>
            <blockquote className="relative text-[1rem] leading-relaxed text-white/90">{t.quote}</blockquote>
            <figcaption className="relative mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/25 text-[0.8rem] font-bold text-white">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-[0.9rem] font-bold text-white">{t.name}</span>
                <span className="block text-[0.8rem] text-white/60">{t.detail}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
