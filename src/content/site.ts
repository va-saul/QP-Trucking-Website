import type { Faq } from "@/lib/types";

export const SITE_URL = "https://qpfactoring.com";

export const org = {
  legalName: "QP Capital LLC",
  name: "QP Trucking Solutions",
  alternateName: ["QP Capital", "QP Trucking Solutions", "QP Factoring"],
  tagline: "Get started, grow quickly, and operate profitably — without incurring debt.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/qp-logo.png`,
  foundingYear: 2016,
  areaServed: "United States",
  street: "4612 Outer Loop Rd",
  city: "Louisville",
  region: "KY",
  postalCode: "40219",
  country: "US",
  latitude: 38.1388,
  longitude: -85.688,
  salesPhone: "+1-833-762-3464",
  salesPhoneDisplay: "833-762-3464",
  officePhone: "+1-502-398-6333",
  officePhoneDisplay: "502-398-6333",
  email: "info@qpfactoring.com",
  privacyEmail: "marketing@qpfactoring.com",
  hours: "Mo-Fr 08:00-20:00",
  hoursDisplay: "Mon – Fri, 8:00 AM – 8:00 PM EST",
  applicationUrl:
    "https://deciphercredit.net/products/4huIAwYJXIiFJuKRi6cGXuUEMKpesAOGQISizCZG3hK7AlJ6rnnEfic7vGrY/application",
  youtube: "https://www.youtube.com/channel/UCUlfep3o3iPMDILCi3HFwOw",
  facebook: "https://www.facebook.com/qpfactoring/",
  instagram: "https://www.instagram.com/qpcapital/",
  twitter: "https://x.com/QpCapital",
  linkedin: "https://www.linkedin.com/in/qp-capital-785b7a260/",
  tiktok: "https://www.tiktok.com/@qp_capital",
  mapUrl: "https://maps.google.com/?q=4612+Outer+Loop+Rd+Louisville+KY+40219",
};

/** Every telephone touchpoint is a conversion path — never render a raw phone string. */
export const phones = {
  sales: { label: "Become a QP client", tel: org.salesPhone, display: org.salesPhoneDisplay, sub: "New clients & quotes" },
  office: {
    label: "Office / accounting questions",
    tel: org.officePhone,
    display: org.officePhoneDisplay,
    sub: "Existing clients & billing",
  },
};

export const trust = {
  stats: [
    { value: 1000, suffix: "+", label: "Carriers funded & set up", sub: "owner-operators to 200-truck fleets" },
    { value: 24, suffix: " hrs", label: "Typical setup time", sub: "from signed agreement to first advance" },
    { value: 15, suffix: " min", label: "Average funding time", sub: "after load verification for QP Pay clients" },
    { value: 0, suffix: "", label: "Long-term contracts", sub: "factor what you want, when you want" },
  ],
  badges: [
    "Pure Non-Recourse™ program",
    "No long-term contract",
    "Flat fee — no hidden charges",
    "Same-day approvals",
    "FMCSA compliance team",
    "Licensed & bonded",
    "Family-owned in Louisville, KY",
    "24/7 client portal + app",
  ],
  ratings: { value: "4.9", count: 187, source: "verified client reviews" },
};

export const testimonials = [
  {
    quote:
      "I can't say enough great things about QP Capital. They provide me with unlimited credit checks, Quick Pay, and they have a program that is simple to understand.",
    name: "Owner-Operator",
    detail: "Dry van · 2 trucks · Kentucky",
  },
  {
    quote:
      "QP is more than just a factoring company. In the beginning they actually coached me on how to negotiate rates with brokers. The inside knowledge they provided me is priceless.",
    name: "Fleet Owner",
    detail: "Reefer · 6 trucks · Indiana",
  },
  {
    quote:
      "I absolutely love the fuel card — every time I look at that statement and see 25 or 40 cents off the cash price it makes me tingle.",
    name: "Owner-Operator",
    detail: "Flatbed · 1 truck · Tennessee",
  },
  {
    quote:
      "It is nice to work with a smaller company. Every time I call they already know who I am and what I'm working on. I don't have to go through a phone system like the larger companies.",
    name: "Dispatch Manager",
    detail: "Fleet · 18 trucks · Ohio",
  },
];

export type NavItem = { label: string; href: string; children?: NavItem[]; blurb?: string };

export const navigation: NavItem[] = [
  {
    label: "Factoring",
    href: "/factoring",
    children: [
      {
        label: "Transportation Factoring",
        href: "/factoring/trucking-factoring",
        blurb: "Recourse, non-recourse & Pure Non-Recourse™ programs",
      },
      {
        label: "Pure Non-Recourse™",
        href: "/factoring/pure-non-recourse",
        blurb: "The ultimate protection against unpaid freight",
      },
      { label: "QP Pay Card & App", href: "/factoring/trucking-factoring#qp-pay", blurb: "Funded in minutes, spent anywhere" },
    ],
  },
  {
    label: "Insurance",
    href: "/insurance",
    children: [
      { label: "Trucking Insurance", href: "/insurance", blurb: "Liability, cargo, bobtail & physical damage" },
      { label: "Get a quote", href: "/insurance#quote", blurb: "Free review with a licensed agent" },
    ],
  },
  {
    label: "Authority & Compliance",
    href: "/services",
    children: [
      { label: "New Authority Setup", href: "/services/new-authority", blurb: "$200 · $100 for factoring clients" },
      { label: "BOC-3 Filing", href: "/services/boc-3", blurb: "$60 · $40 for factoring clients" },
      { label: "Form 2290 (HVUT)", href: "/services/form-2290", blurb: "$60 · $40 for factoring clients" },
      { label: "IRP Registration", href: "/services/irp", blurb: "$195 apportioned plates" },
      { label: "IFTA Account & Filings", href: "/services/ifta", blurb: "Registration, quarterly & annual" },
      { label: "UCR Registration", href: "/services/ucr", blurb: "$60 · $40 for factoring clients" },
      { label: "MCS-150 Updates", href: "/services/mcs-150", blurb: "$60 · $40 for factoring clients" },
      { label: "SCAC Code", href: "/services/scac", blurb: "$60 · $40 for factoring clients" },
      { label: "DOT Compliance Binder", href: "/services/dot-binder", blurb: "$99 PDF · $139 printed" },
      { label: "Drug & Alcohol Consortium", href: "/services/drug-alcohol-consortium", blurb: "$135 · $100 for clients" },
      { label: "ELD & Dashcam Savings", href: "/services/eld-dashcam", blurb: "Member pricing on compliant devices" },
      { label: "All services & pricing", href: "/store", blurb: "Full catalog in one place" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About QP", href: "/about", blurb: "Who we are and why carriers stay" },
      { label: "Insights", href: "/insights", blurb: "Trucking money & compliance briefings" },
      { label: "FAQ", href: "/faq", blurb: "Straight answers to real questions" },
      { label: "Contact", href: "/contact", blurb: "Louisville, KY · Mon–Fri 8AM–8PM EST" },
    ],
  },
];

export const homeFaqs: Faq[] = [
  {
    q: "What is trucking factoring and how does it work?",
    a: "Trucking factoring is the sale of your freight invoices to a factoring company at a small discount so you get paid in hours instead of the 30–45 days brokers and shippers typically take. You deliver the load, send the rate confirmation and proof of delivery, and QP Trucking Solutions advances the money — usually within minutes of load verification.",
  },
  {
    q: "Is trucking factoring a loan?",
    a: "No. Factoring is not a loan and does not create debt. You are selling an asset — an approved receivable — for cash, which means nothing appears on your balance sheet as borrowing and your personal or business credit is not the deciding factor.",
  },
  {
    q: "How fast can a carrier get set up and funded with QP?",
    a: "Most carriers complete onboarding in less than 24 hours. Once your packet is approved and your first load is verified, funds are uploaded to your QP Card or sent by ACH, with clients routinely funded in about 15 minutes.",
  },
  {
    q: "Do I have to sign a long-term contract to factor with QP Trucking Solutions?",
    a: "No. QP has no long-term contract and no minimum volume requirement. You choose which invoices to factor, so you can scale up, pause, or leave at any time.",
  },
  {
    q: "What is Pure Non-Recourse™ factoring?",
    a: "Pure Non-Recourse™ is QP's flagship program. If you deliver a Pure load — no deductions or claims — and turn in legible Pure paperwork, you never have to buy that invoice back, even if the broker never pays or files bankruptcy. It removes chargeback risk entirely.",
  },
  {
    q: "Can QP help me start a brand-new trucking company from zero?",
    a: "Yes. QP handles authority setup, BOC-3 filings, DOT compliance binders, drug and alcohol consortium enrollment, IFTA, IRP plates, UCR, MCS-150 updates and SCAC codes — plus insurance and factoring — so a new carrier can be legally operating under one roof.",
  },
  {
    q: "What does factoring cost at QP Trucking Solutions?",
    a: "QP charges flat, disclosed fees based on your volume, your customers' credit and the program you choose. There are no hidden charges, no application fees and no minimums. Call 833-762-3464 for a same-day quote.",
  },
  {
    q: "Does QP Trucking Solutions work with owner-operators who have poor credit?",
    a: "Yes. Factoring decisions are based on the creditworthiness of your customers — the brokers and shippers who owe you money — not on your personal credit score, which is why new authorities and credit-challenged carriers can qualify.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Get started",
    body: "Apply online or call 833-762-3464. A specialist reviews your authority, insurance and customer list, then quotes a flat, disclosed rate — no pressure, no obligation.",
  },
  {
    n: "02",
    title: "Grow quickly",
    body: "Deliver the load and submit paperwork from the app. We run credit on your brokers, invoice them for you, and advance funds in minutes with no minimums and no long-term contract.",
  },
  {
    n: "03",
    title: "Operate profitably",
    body: "Add insurance, permits, dispatch support and equipment finance through one team that knows your account. Keep cash flowing without borrowing a dollar.",
  },
];
