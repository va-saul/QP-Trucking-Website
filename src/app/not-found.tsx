import Link from "next/link";
import { Btn, Container } from "@/components/ui";
import { QPMark } from "@/components/brand";
import { org } from "@/content/site";

export default function NotFound() {
  return (
    <div className="hero-shell relative flex min-h-[100svh] items-center overflow-hidden pt-[110px] pb-16">
      <span aria-hidden="true" className="stripe-band pointer-events-none absolute inset-0 opacity-45" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <QPMark tone="white" className="mx-auto h-14 w-14" />
          <p className="eyebrow mt-6 text-gold-400">Error 404 · load not found</p>
          <h1 className="mt-4 font-display text-display-lg font-extrabold text-white">
            This route doesn&apos;t exist — but your next load can.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-steel-200/85">
            The page you were looking for has moved or never existed. Everything QP offers is one click away below — or
            call {org.salesPhoneDisplay} and a specialist will point you to the right place.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn href="/" variant="primary" size="lg" withArrow>
              Back to home
            </Btn>
            <Btn href="/store" variant="outline" size="lg">
              Services &amp; pricing
            </Btn>
            <Btn href={`tel:${org.salesPhone}`} variant="outline" size="lg">
              Call {org.salesPhoneDisplay}
            </Btn>
          </div>

          <div className="mt-10 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: "Factoring", h: "/factoring" },
              { l: "Trucking insurance", h: "/insurance" },
              { l: "Authority setup", h: "/services/new-authority" },
              { l: "FAQ", h: "/faq" },
            ].map((q) => (
              <Link
                key={q.h}
                href={q.h}
                className="glass rounded-[1rem] px-4 py-3.5 text-center font-display text-[0.98rem] font-bold text-white transition-transform duration-300 hover:-translate-y-1"
              >
                {q.l}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
