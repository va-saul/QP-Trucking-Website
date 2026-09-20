import { PageHero } from "@/components/hero/PageHero";
import { Container, Section, Btn } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { org } from "@/content/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How QP Capital LLC (QP Trucking Solutions) collects, uses, shares and protects personal information submitted through qpfactoring.com, including SMS, payment and credit data, and how to exercise your privacy rights.",
  path: "/privacy-policy",
  image: "/images/hero/compliance.jpg",
});

const sections = [
  {
    h: "1. What information do we collect?",
    body: [
      "We collect personal information that you voluntarily provide when you express an interest in our services, complete a form, apply for factoring or insurance, or contact us. Depending on how you interact with us this may include your name, email address, phone number, company name, USDOT and MC numbers, mailing address, driver and equipment details, and payment information (debit or credit card numbers and billing addresses).",
      "With your consent or as permitted by law, we may also process sensitive information such as creditworthiness data, social security numbers or other government identifiers when it is necessary to underwrite factoring or insurance.",
      "Payment data is processed by our payment partners (for example Authorize.Net). We do not store full card numbers on our own servers.",
      "Like most websites we automatically collect certain information when you visit — IP address, browser and device characteristics, operating system, language preference, referring URLs, country and usage data. This information is not used to identify you personally and is primarily used for security, analytics and improving our services.",
    ],
  },
  {
    h: "2. How do we process your information?",
    body: [
      "We process your information to provide, improve and administer our services; to communicate with you about quotes, accounts, funding, filings and renewals; to run credit checks on your customers as part of factoring; to verify eligibility for insurance and compliance products; to comply with legal obligations; and to prevent fraud and secure our services.",
      "We process information only when we have a valid legal reason to do so — typically your consent, performance of a contract, our legitimate business interests, or legal compliance.",
    ],
  },
  {
    h: "3. When and with whom do we share your personal information?",
    body: [
      "We may share information with insurance carriers and markets to obtain quotes and bind coverage; with credit reporting agencies and fraud prevention services; with payment processors; with filing agencies and government portals where a filing requires your details; and with service providers who perform work on our behalf under confidentiality obligations.",
      "We do not sell your personal information. We may disclose information where required by law, subpoena or to protect the rights, property or safety of QP Capital LLC, our clients or others. If we are involved in a merger, acquisition or sale of assets, information may be transferred as part of that transaction subject to this notice.",
    ],
  },
  {
    h: "4. Do we use cookies and other tracking technologies?",
    body: [
      "We may use cookies and similar technologies to maintain sessions, remember preferences and understand how visitors use our site. You can set your browser to refuse cookies, although some parts of the site may not function properly as a result.",
    ],
  },
  {
    h: "5. How long do we keep your information?",
    body: [
      "We keep personal information for as long as necessary to fulfill the purposes described in this notice, unless a longer retention period is required by law — for example tax, accounting, insurance or money-services record-keeping requirements. When there is no ongoing legitimate business need, we delete or anonymize the information.",
    ],
  },
  {
    h: "6. How do we keep your information safe?",
    body: [
      "We have organizational and technical processes in place to protect your personal information, including access controls, encrypted transmission and vendor due diligence. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise that unauthorized third parties will never defeat our security.",
    ],
  },
  {
    h: "7. Do we collect information from minors?",
    body: [
      "Our services are intended for businesses and individuals of legal contracting age. We do not knowingly collect data from children under 18. If we learn that personal information from users under 18 has been collected, we will deactivate the account and delete the data.",
    ],
  },
  {
    h: "8. What are your privacy rights?",
    body: [
      "Depending on your location, you may have the right to request access to the personal information we hold about you, to request correction or deletion, to withdraw consent at any time, and to opt out of certain processing. To exercise these rights, email " +
        org.privacyEmail +
        " or call " +
        org.officePhoneDisplay +
        ". We will consider and act on requests in accordance with applicable data protection laws, and we may need to verify your identity before responding.",
    ],
  },
  {
    h: "9. Controls for do-not-track features",
    body: [
      "Some browsers include a Do-Not-Track (DNT) feature. Because there is no industry consensus on how DNT signals should be honored, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.",
    ],
  },
  {
    h: "10. Do California residents have specific privacy rights?",
    body: [
      "California residents may request information about the categories of personal information we collect, the sources, the business purposes, and the categories of third parties with whom we share it, in line with the California Consumer Privacy Act as amended. To make a request, contact us using the details below.",
    ],
  },
  {
    h: "11. Do Virginia residents have specific privacy rights?",
    body: [
      "Virginia residents may have rights to confirm whether we process their personal data, to access, correct or delete it, to obtain a portable copy, and to opt out of targeted advertising or profiling, subject to the Virginia Consumer Data Protection Act. You may appeal a decision we make about your request by replying to our response.",
    ],
  },
  {
    h: "12. Do we make updates to this notice?",
    body: [
      "We may update this privacy notice from time to time. The revised version will be posted on this page with an updated revision date. If we make material changes we will notify you by posting a prominent notice or contacting you directly where required.",
    ],
  },
  {
    h: "13. How can you contact us about this notice?",
    body: [
      `${org.legalName}, ${org.street}, ${org.city}, ${org.region} ${org.postalCode}. Email ${org.email} or ${org.privacyEmail}. Phone ${org.officePhoneDisplay}. Business hours: ${org.hoursDisplay}.`,
    ],
  },
  {
    h: "14. How can you review, update or delete the data we collect from you?",
    body: [
      "You can request access to the personal information we hold about you, or ask that it be corrected or deleted, by emailing " +
        org.privacyEmail +
        ". Some records must be retained to comply with insurance, tax, anti-fraud and financial record-keeping laws, and we will explain any such limitation in our response.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Privacy policy", href: "/privacy-policy" },
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        tagline="This privacy notice for QP Capital LLC describes how and why we might collect, store, use and share your information when you use our services, including when you visit qpfactoring.com."
        image="/images/hero/compliance.jpg"
        imageAlt="QP Trucking Solutions privacy policy"
        variant="binder"
        accent="blue"
        trail={[
          { label: "Home", href: "/" },
          { label: "Privacy policy", href: "/privacy-policy" },
        ]}
        stats={[
          { label: "Entity", value: org.legalName },
          { label: "Contact", value: org.privacyEmail },
          { label: "Location", value: "Louisville, KY" },
          { label: "Questions?", value: org.officePhoneDisplay },
        ]}
        primaryHref="/contact"
        primaryLabel="Contact us"
        secondaryHref={`mailto:${org.privacyEmail}`}
        secondaryLabel="Email privacy team"
      />

      <Section tone="paper">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-[1.15rem] border border-brand-300/40 bg-brand-100/60 p-5 sm:p-6">
              <p className="eyebrow text-brand-600">Summary of key points</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-700">
                We collect the information you give us (contact details, business information, and in some cases credit
                and payment data) so we can quote and deliver factoring, insurance and compliance services. We do not
                sell your information. You can request access, correction or deletion at any time by emailing{" "}
                <a href={`mailto:${org.privacyEmail}`} className="font-semibold text-brand-500">
                  {org.privacyEmail}
                </a>
                .
              </p>
            </div>

            <nav aria-label="Privacy policy contents" className="mt-8">
              <p className="eyebrow text-steel-600">Contents</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#section-${i + 1}`} className="text-[0.9rem] text-brand-500 hover:underline">
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 grid gap-8">
              {sections.map((s, i) => (
                <section key={s.h} id={`section-${i + 1}`}>
                  <h2 className="font-display text-display-sm text-navy-900">{s.h}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-3 text-[1rem] leading-relaxed text-steel-700">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-[1.15rem] border border-steel-200 bg-bone p-6">
              <p className="eyebrow text-brand-500">Questions about your data?</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-steel-700">
                Email <strong>{org.privacyEmail}</strong> or call <strong>{org.officePhoneDisplay}</strong>. We will
                respond to verified requests in line with applicable law.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn href={`mailto:${org.privacyEmail}`} variant="primary" withArrow>
                  Email the privacy team
                </Btn>
                <Btn href="/contact" variant="outlineDark">
                  Contact QP
                </Btn>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
