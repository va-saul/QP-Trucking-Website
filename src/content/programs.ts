import type { Faq } from "@/lib/types";
import { org } from "@/content/site";

/**
 * Single source of truth for the two QP programs carried over from the
 * QP Trucking Solutions knowledge base & referral center.
 */

/* ------------------------------------------------------------------ */
/* AMBASSADOR PROGRAM                                                  */
/* ------------------------------------------------------------------ */

export const ambassadorProgram = {
  path: "/programs/ambassador",
  eyebrow: "QP Programs · Ambassador",
  name: "QP Ambassador Referral Program",
  short: "Ambassador Program",
  tagline:
    "Refer trucking companies and owner-operators to QP Capital, QP Trucking Insurance, fuel card programs and operating authority services — and get paid top-tier referral payouts on every qualified client.",
  heroImage: "/images/hero/ambassador.jpg",
  imageAlt:
    "Two truckers shaking hands beside a navy semi truck at a freight terminal at dusk",
  heroVariant: "ambassador" as const,
  accent: "gold" as const,
  heroStats: [
    { label: "Factoring referral", value: "$500–$700" },
    { label: "Insurance referral", value: "Up to $250" },
    { label: "Fuel card referral", value: "$100" },
    { label: "Authority services", value: "$20 each" },
  ],
  answer:
    "The QP Ambassador Program pays referral payouts to anyone who sends qualified trucking companies and owner-operators to QP — $500–$700 per factoring referral, up to $250 per insurance referral, $100 per fuel card and dispatch referral, and $20 for every completed operating-authority service.",
  intro: [
    "Ambassadors earn a direct payout for every qualified referral across the full portfolio of QP trucking solutions — QP Capital factoring, QP Trucking Insurance, fuel card programs and operating authority services. No fleet required: you connect carriers to QP, and QP pays you when the referral qualifies.",
    "Payouts scale with your volume. Send one tractor referral and earn $500; refer 10+ entities in a month and every unit pays $600; 20+ and each one pays $700.",
  ],
  commissions: [
    {
      dept: "QP Capital",
      title: "Factoring Referral",
      payout: "$500 – $700",
      when: "Paid upon 1st load factored",
      detail:
        "Paid on the first load factored for tractors / semis. Scales to $600 per unit at 10+ referrals a month, or $700 per unit at 20+ referrals a month.",
    },
    {
      dept: "QP Capital",
      title: "Hot Shot Referral",
      payout: "$250",
      when: "Paid upon 1st load factored",
      detail:
        "Hot shot factoring referrals pay $250 on the first load factored. Box trucks, sprinter vans and car haulers are not eligible for factoring referral payouts.",
    },
    {
      dept: "QP Trucking Insurance",
      title: "Insurance Referral",
      payout: "Up to $250",
      when: "Internal point evaluation",
      detail:
        "Based on QP's proprietary internal point system — clients do not even need to bind insurance with QP Trucking Insurance to qualify for point earnings.",
    },
    {
      dept: "Fuel Savings",
      title: "Fuel Card Referral",
      payout: "$100",
      when: "Per active fuel card account",
      detail:
        "Flat payout for each enrolled fleet or owner-operator signing up for QP fuel card programs and nationwide network discounts.",
    },
    {
      dept: "Dispatch",
      title: "Dispatch Referral",
      payout: "$100",
      when: "Paid upon 1st load dispatched",
      detail: "The $100 dispatch referral is paid once the first load is successfully dispatched.",
    },
    {
      dept: "Operating Authority",
      title: "Authority Services",
      payout: "$20 / service",
      when: "Paid upon service payment",
      detail:
        "Earn $20 for every completion service completed — LLC setup, EIN, BOC-3, IFTA, UCR, 2290 and more — upon receipt of payment.",
    },
  ],
  routing: {
    rule:
      "To be paid as an ambassador, referrals must be routed to the specific department that handles them — not to Sales or Information & Enrollment. Each department confirms its own referrals, so correct routing is what makes a referral payable.",
    contacts: [
      {
        title: "Factoring referrals",
        scope: "Invoice factoring, fuel advances and QP Capital accounts.",
        phone: "+1-502-398-6333",
        phoneDisplay: "502-398-6333 ext 99",
        email: "onboarding@qpfactoring.com",
      },
      {
        title: "Insurance referrals",
        scope: "Trucking liability, physical damage, motor truck cargo and general liability leads.",
        phone: "+1-844-777-2331",
        phoneDisplay: "844-777-2331",
        email: "insurance@qpfactoring.com",
      },
      {
        title: "Authority completion",
        scope: "New authorities, BOC-3, UCR, IRP, IFTA filings, 2290 taxes, LLC formations and SCAC codes.",
        phone: "+1-502-265-4213",
        phoneDisplay: "502-265-4213",
        email: "dawn@qpfactoring.com",
      },
    ],
    fallback: "Not sure which department a lead belongs to? Send it through the form or call the main line and the team will route it correctly.",
    fallbackPhone: org.salesPhone,
    fallbackPhoneDisplay: org.salesPhoneDisplay,
  },
  authorityPricing: [
    { category: "Setup", service: "New Authority", price: "$100" },
    { category: "Filing", service: "IFTA Quarterly", price: "$40" },
    { category: "Compliance", service: "BOC-3", price: "$40" },
    { category: "Safety", service: "Drug Consortium", price: "$100" },
    { category: "Registration", service: "UCR", price: "$40" },
    { category: "Filing", service: "MCS-150", price: "$40" },
    { category: "Tax", service: "2290 Heavy Vehicle Tax", price: "$40" },
    { category: "Compliance", service: "SCAC Code", price: "$40" },
    { category: "Registration", service: "IRP App", price: "$195" },
    { category: "Corporate", service: "LLC Setup", price: "$100" },
    { category: "Registration", service: "IFTA Initial", price: "$100" },
    { category: "Tax", service: "EIN App", price: "$100" },
  ],
  authorityPricingNote: "All listed prices require an annual factoring contract with QP Capital.",
  applicationUrl: org.applicationUrl,
  proTip:
    "Your referral can also complete the factoring application directly and list your company name in the referral box on the application — attribution is captured automatically.",
  rules: [
    "Tractors / semis: $500 paid upon first load factored. Scales to $600 per unit at 10+ entities a month, or $700 per unit at 20+ entities a month.",
    "Hot shots: $250 factoring referral paid on first load factored.",
    "Equipment exclusions: no factoring referral payouts for box trucks, sprinter vans or car haulers.",
    "Insurance referrals: evaluated via internal points; does not require the lead to bind insurance with QP Trucking Insurance.",
    "Dispatch referrals: the $100 dispatch referral is paid upon the first load successfully dispatched.",
    "Operating authority: the $20 authority completion is paid upon receipt of payment for the service.",
    "Authority pricing: special authority prices require an annual factoring agreement. Prices subject to change.",
    "General terms: all terms, conditions and payout schedules are subject to periodic review and change.",
  ],
  faqs: [
    {
      q: "How much does the QP Ambassador Program pay for a factoring referral?",
      a: "Ambassadors earn $500 for each qualified tractor / semi factoring referral, paid when the first load is factored. Volume scales the payout: $600 per unit at 10+ referrals in a month and $700 per unit at 20+. Hot shot referrals pay $250 on the first load factored.",
    },
    {
      q: "Which referrals are not eligible for ambassador payouts?",
      a: "Factoring referrals for box trucks, sprinter vans and car haulers are excluded from factoring referral payouts. Everything else in the portfolio — tractors / semis, hot shots, insurance, fuel cards, dispatch and operating authority services — qualifies.",
    },
    {
      q: "Does my insurance referral have to bind coverage with QP Trucking Insurance for me to earn?",
      a: "No. Insurance referrals are evaluated on QP's proprietary internal point system, and clients do not even need to bind insurance with QP Trucking Insurance to qualify for point earnings — up to $250 per referral.",
    },
    {
      q: "How do I submit a referral so it counts toward my payout?",
      a: "Route the referral to the department that handles it — factoring leads to 502-398-6333 ext 99 or onboarding@qpfactoring.com, insurance leads to 844-777-2331 or insurance@qpfactoring.com, and authority work to 502-265-4213 or dawn@qpfactoring.com. Correct department routing is required to be paid. Your referral can also complete the factoring application and list your company name in the referral box.",
    },
    {
      q: "When are ambassador commissions paid?",
      a: "Factoring and hot shot payouts land on the first load factored; fuel card and dispatch payouts on the first active account or dispatched load; the $20 authority completion and the insurance point evaluation are paid per their own schedules. All payout schedules are subject to periodic review.",
    },
  ] as Faq[],
  metaTitle: "Ambassador Referral Program — Earn Up to $700",
  metaDescription:
    "Refer carriers to QP factoring, insurance, fuel cards and authority services. Earn $500–$700 per factoring referral plus bonuses on other services.",
  keywords: [
    "trucking referral program",
    "factoring referral payout",
    "QP ambassador program",
    "refer a trucking company",
    "trucking insurance referral",
  ],
};

/* ------------------------------------------------------------------ */
/* CIRCLE NETWORK                                                      */
/* ------------------------------------------------------------------ */

export const circleNetworkProgram = {
  path: "/programs/circle-network",
  eyebrow: "QP Programs · Circle Network",
  name: "The Circle Network",
  short: "Circle Network",
  tagline:
    "Going the extra mile for every member — exclusive perks, financial support and a dedicated network of brokers for our premium Circle members.",
  heroImage: "/images/hero/circle-network.jpg",
  imageAlt:
    "Convoy of polished navy semi trucks on an open highway at golden sunrise",
  heroVariant: "circle" as const,
  accent: "gold" as const,
  heroStats: [
    { label: "Annual member value", value: "$2,000+" },
    { label: "Factoring fee", value: "0%" },
    { label: "New-authority brokers", value: "40+" },
    { label: "Member benefits", value: "6 included" },
  ],
  answer:
    "The Circle Network is QP Trucking Solutions' premium member tier: $2,000+ in annual value with no-fee factoring, free fuel card setup, complimentary IFTA & IRP processing, a safety & wellness kit, a Circle swag bundle, and 50% down-payment assistance for semi-truck insurance — plus a directory of 40+ brokers that onboard brand-new authorities.",
  intro: [
    "The Circle Network is QP's premium support tier for carriers. Every member automatically receives the full benefit stack — financial support that shows up on your statement every month, and a broker network that keeps brand-new authorities moving while everyone else tells them to call back in ninety days.",
  ],
  benefits: [
    {
      title: "No-Fee Factoring",
      circleOnly: true,
      body: "The standard factoring program with 0% factoring fees for Circle members. Keep 100% of your invoice value.",
    },
    {
      title: "Free Fuel Card Setup",
      circleOnly: false,
      body: "Start saving immediately with no setup fees on QP's premium fuel card program.",
    },
    {
      title: "Complimentary IFTA & IRP",
      circleOnly: false,
      body: "QP waives its processing fee. Members only pay the state-required filing costs.",
    },
    {
      title: "Safety & Wellness Kit",
      circleOnly: false,
      body: "Includes a custom safety manual, exercise bands for the road, and healthy snack packs.",
    },
    {
      title: "Circle Swag Bundle",
      circleOnly: false,
      body: "Hats, T-shirts, clipboards, sunglasses and tire thumpers — Louisville Sluggers.",
    },
    {
      title: "1/2 Down Assistance",
      circleOnly: true,
      body: "Exclusive access to 50% down payment assistance for semi-truck insurance binding.",
    },
  ],
  brokersIntro:
    "Top brokers that onboard carriers with 0–90 days of authority — the directory QP uses for newer Circle members who need day-one freight.",
  brokers: [
    { name: "Rankin and Sons LLC", type: "Broker", mcAge: "0 days", mc: "MC-1044337", dot: "3295627", policy: "Indiana-based; case-by-case (no strict age rule)", services: "General freight" },
    { name: "D&L Transport", type: "Broker", mcAge: "<30 days", mc: "MC-512088", dot: "2233590", policy: "Very new-authority friendly; day-1 loads reported", services: "FTL · LTL · Intermodal" },
    { name: "James River Carriers", type: "Carrier/Broker", mcAge: "~30 days", mc: "MC-83735", dot: "3113083", policy: "Onboards new carriers after ~30 days", services: "Dry van & dedicated" },
    { name: "MegaCorp Logistics", type: "Broker/3PL", mcAge: "~30–60 days", mc: "MC-671004", dot: "2243917", policy: "Welcomes newer carriers; emphasizes communication", services: "FTL · LTL · Intermodal" },
    { name: "Ryan Transportation", type: "Broker/3PL", mcAge: "0 days", mc: "MC-196502", dot: "2213666", policy: "Generally open to new carriers with proper vetting", services: "FTL · Bulk · Intermodal" },
    { name: "CoVar Transportation", type: "Broker (Bulk)", mcAge: "0 days", mc: "MC-893200", dot: "2559392", policy: "Specializes in bulk; no strict tenure requirement", services: "Dry bulk · Hopper · Tanker" },
    { name: "Circle Logistics, Inc.", type: "Broker", mcAge: "0 days", mc: "MC-858832", dot: "2242221", policy: "No formal minimum; moderately new-carrier friendly", services: "TL · Specialized · LTL" },
    { name: "Hub Group, Inc.", type: "3PL", mcAge: "0 days", mc: "MC-507885", dot: "2233376", policy: "Day-1 friendly; extensive carrier network", services: "Intermodal · TL · LTL" },
    { name: "Aegis Logistics Group", type: "Broker", mcAge: "0 days", mc: "MC-984301", dot: "2919180", policy: "Smaller brokerage; accommodating to new carriers", services: "General freight" },
    { name: "England Logistics", type: "Broker (3PL)", mcAge: "0 days", mc: "MC-210239", dot: "441308", policy: "Day-one friendly; C.R. England division", services: "TL · LTL · Intermodal" },
    { name: "Choptank Transport", type: "Broker (3PL)", mcAge: "0 days", mc: "MC-383378", dot: "2226374", policy: "Very new-carrier friendly; day-1 setups possible", services: "Dry van · Reefer · LTL" },
    { name: "Uber Freight", type: "Broker (Digital)", mcAge: "0 days", mc: "MC-987790", dot: "2926893", policy: "App-based; designed for new carriers (day-1)", services: "FTL · Power-only · LTL" },
    { name: "C.H. Robinson", type: "Broker/3PL", mcAge: "0 days", mc: "MC-131029", dot: "2211804", policy: "Reputable for manual approval of brand-new MCs", services: "All modes" },
    { name: "Total Quality Logistics", type: "Broker (3PL)", mcAge: "0 days", mc: "MC-322572", dot: "2223295", policy: "Very flexible; reports of immediate onboarding", services: "FTL · LTL · Drayage" },
    { name: "Spot Freight", type: "Broker", mcAge: "0–30 days", mc: "MC-665776", dot: "2243571", policy: "Open to new carriers; fast-growing tech-broker", services: "FTL · Reefer · LTL" },
    { name: "GlobalTranz", type: "Broker/3PL", mcAge: "0–30 days", mc: "MC-501299", dot: "2233025", policy: "New-authority friendly; often onboards startups", services: "All modes" },
    { name: "King of Freight", type: "Broker", mcAge: "0–30 days", mc: "MC-659555", dot: "2243200", policy: "Aggressive growth; works with new authorities", services: "FTL (Van/Reefer/Flat)" },
  ],
  brokersNote:
    "Broker appetite and minimums change — QP verifies the live carrier requirements with every broker before recommending a load. The full Circle directory holds 40+ brokers.",
  enrollment: [
    {
      title: "Talk to the enrollment team",
      body: "Call 833-762-3464 or start online. The team reviews your authority, fleet and goals and walks through the $2,000 in saved Circle value.",
    },
    {
      title: "Activate your membership",
      body: "Once interested, the enrollment team completes the final consultation and activates your Circle benefits — no-fee factoring, waived IFTA & IRP processing and the rest.",
    },
    {
      title: "Run the circle",
      body: "Freight from the new-authority broker directory, fuel savings from day one, and a team that already knows your file when you call.",
    },
  ],
  faqs: [
    {
      q: "What is the Circle Network?",
      a: "The Circle Network is QP Trucking Solutions' premium member tier. Every Circle member automatically receives no-fee factoring, free fuel card setup, complimentary IFTA & IRP processing, a safety & wellness kit, a Circle swag bundle and 50% down-payment assistance for semi-truck insurance — $2,000+ in annual value.",
    },
    {
      q: "What does no-fee factoring mean for Circle members?",
      a: "Circle members run the standard factoring program with 0% factoring fees, keeping 100% of their invoice value while QP still handles billing, collections and credit checks on their brokers.",
    },
    {
      q: "Can brand-new authorities get freight through the Circle Network?",
      a: "Yes. Circle members get access to a directory of 40+ brokers that onboard carriers with 0–90 days of authority — including day-one friendly brokers like Hub Group, Choptank Transport, England Logistics and Uber Freight.",
    },
    {
      q: "How does a carrier join the Circle Network?",
      a: "Start with a conversation: call 833-762-3464 or send the get-started form. The enrollment team reviews your operation, confirms the $2,000 in saved value and activates your membership after the final consultation.",
    },
    {
      q: "What does the 1/2 down assistance cover?",
      a: "Circle members get exclusive access to 50% down payment assistance for semi-truck insurance binding, which lowers the cash needed up front to get a truck insured and on the road.",
    },
  ] as Faq[],
  metaTitle: "Circle Network Premium Membership",
  metaDescription:
    "QP's premium member tier: 0% factoring fees, free fuel card setup, free IFTA & IRP processing, insurance down-payment help and a broker directory.",
  keywords: [
    "Circle Network trucking",
    "no fee factoring",
    "new authority brokers",
    "trucking membership program",
    "owner operator benefits",
  ],
};

/* ------------------------------------------------------------------ */
/* QP FUEL CARD                                                        */
/* ------------------------------------------------------------------ */

export const fuelCardProgram = {
  path: "/programs/fuel-card",
  eyebrow: "QP Programs · Fuel Card",
  name: "QP Fuel Card Program",
  short: "QP Fuel Card",
  tagline:
    "Industry-leading fuel savings and financial flexibility — 48¢/gal average savings at partners, accepted at 9,000+ stations, with approval paths for every credit profile.",
  heroImage: "/images/hero/fuel-card.jpg",
  imageAlt: "Truck driver using a QP fuel card at a truck stop fuel island at dusk",
  heroVariant: "fuelcard" as const,
  accent: "gold" as const,
  heroStats: [
    { label: "Avg partner savings", value: "48¢/gal" },
    { label: "Stations", value: "9,000+" },
    { label: "Carrier savings", value: "$1,000+/mo·truck" },
    { label: "POS fees", value: "$0" },
  ],
  answer:
    "The QP Fuel Card is QP Trucking Solutions' fuel savings card: 48¢/gal average savings at partner stations, acceptance at 9,000+ stations with universal Mastercard backing, major TA/Petro discounts, maintenance discounts, no gallon minimums and zero POS fees — with flexible approvals that do not require traditional credit.",
  intro: [
    "Fuel is your second-largest expense after the truck note. The QP Card cuts it directly at the pump — and the approval paths are built for real carriers, not just perfect credit.",
  ],
  network: [
    "48¢/gal average savings at partner stations",
    "Accepted at 9,000+ stations nationwide",
    "Major TA / Petro discounts",
    "Maintenance discounts included",
    "No gallon minimums",
  ],
  approvals: [
    "Fuel advance: load-based funding",
    "Security deposit program",
    "No traditional credit needed",
    "Dedicated account rep",
  ],
  savings: [
    "Save $1,000+ per month per truck",
    "Universal Mastercard acceptance",
    "Sub-cards for drivers",
    "Zero POS fees",
  ],
  fees: [
    { item: "Registration draft", price: "$3.50" },
    { item: "ATM withdrawal", price: "$2.50" },
    { item: "QP Pay (quick funding)", price: "$5.00" },
    { item: "Fuel advance — 50% of load, $1K max", price: "$15.00" },
    { item: "POS purchases", price: "$0.00" },
    { item: "Customer service", price: "$0.00" },
  ],
  escrow: [
    { score: "700+", escrow: "$0", total: "$1,500" },
    { score: "650–699", escrow: "$500", total: "$1,800" },
    { score: "600–649", escrow: "$750", total: "$2,500" },
    { score: "550–599", escrow: "$1,200", total: "$2,500" },
    { score: "549 & below", escrow: "$1,500", total: "$2,500" },
  ],
  escrowNote:
    "A 2% reserve account is required for all Line of Credit participants regardless of tier. Weekly repayment is mandatory for continued access.",
  wexUrl: "https://wexinc.my.salesforce-sites.com/creditapplication/OTRBOCA?pgm=QPCapitalPreferred",
  faqs: [
    {
      q: "How much can a carrier save with the QP Fuel Card?",
      a: "Partners average 48¢/gal in discounts, with major TA/Petro savings and maintenance discounts included. In real-world use carriers save $1,000+ per month per truck, and there are no gallon minimums.",
    },
    {
      q: "Where is the QP Fuel Card accepted?",
      a: "At 9,000+ stations in the discount network, plus universal Mastercard acceptance everywhere else. Sub-cards are available for drivers, and POS purchases carry zero fees.",
    },
    {
      q: "Can I get approved with credit challenges?",
      a: "Yes. QP offers flexible approval paths that do not require traditional credit: load-based fuel advances and a security deposit program, each with a dedicated account rep.",
    },
    {
      q: "What does the QP Fuel Card cost to use?",
      a: "POS purchases and customer service are $0. Other transactions are priced plainly: registration draft $3.50, ATM withdrawal $2.50, QP Pay quick funding $5.00, and fuel advance (50% of load, $1K max) $15.00.",
    },
  ] as Faq[],
  metaTitle: "QP Fuel Card — 48¢/gal at 9,000+ Stations",
  metaDescription:
    "QP fuel card: 48¢/gal average savings, 9,000+ stations, TA/Petro discounts, zero POS fees and flexible approvals with no traditional credit needed.",
  keywords: [
    "trucking fuel card",
    "fuel discount program",
    "owner operator fuel savings",
    "fuel card no credit",
    "QP fuel card",
  ],
};

/* ------------------------------------------------------------------ */
/* EQUIPMENT FINANCE                                                   */
/* ------------------------------------------------------------------ */

export const equipmentFinanceProgram = {
  path: "/programs/equipment-finance",
  eyebrow: "QP Programs · Equipment Finance",
  name: "Equipment Finance",
  short: "Equipment Finance",
  tagline:
    "Put quality iron in your fleet without draining your working capital — tractors, trailers and equipment financed through the same team that factors your invoices.",
  heroImage: "/images/hero/equipment-finance.jpg",
  imageAlt: "New navy semi truck on a dealership lot at dusk with keys being handed over",
  heroVariant: "equipment" as const,
  accent: "gold" as const,
  heroStats: [
    { label: "Finances", value: "Tractors & trailers" },
    { label: "Reviewed by", value: "QP specialists" },
    { label: "Pairs with", value: "Factoring & insurance" },
    { label: "Application", value: "One form" },
  ],
  answer:
    "QP Trucking Solutions' equipment finance helps carriers add tractors, trailers and rolling equipment without draining working capital. You send the equipment details and seller information through one application, and a QP specialist structures the deal alongside your factoring, insurance and compliance — everything under one roof.",
  intro: [
    "A truck that sits waiting on financing is a truck that earns nothing. QP's equipment finance keeps your cash flow and your fleet growing together: the same team that advances on your invoices reviews your equipment deal, so the structure fits how your business actually earns.",
    "Send the application below with the equipment you want to finance. A specialist reviews every submission personally and comes back with structure options — no obligation, no pressure.",
  ],
  finances: [
    "Tractors — new and used semi trucks",
    "Trailers — dry van, reefer, flatbed and more",
    "Rolling equipment for your existing fleet",
    "Add-on units as your freight grows",
  ],
  why: [
    "One roof: financing reviewed beside your factoring, insurance and compliance file",
    "Working capital stays in the business — the truck earns while it pays",
    "Specialists who understand trucking cash flow, not a generic lending queue",
    "New authorities and growing fleets both welcome to apply",
  ],
  prepare: [
    "Vendor invoice or specs for the equipment, with price and down payment",
    "Business details: legal name, tax ID#, business type and officers/members with 10%+ ownership",
    "Personal details for each guarantor with 10%+ ownership (co-guarantor too, if applicable)",
    "A typed signature — the online form mirrors the paper credit application",
  ],
  faqs: [
    {
      q: "What equipment can I finance through QP?",
      a: "Tractors, trailers and rolling equipment for trucking companies — new or used. Submit the equipment details through the application and a QP specialist reviews the deal with you.",
    },
    {
      q: "Do I have to be a factoring client to use equipment finance?",
      a: "No, but most carriers pair the two: when QP advances on your invoices, the equipment structure is built around your real cash flow, and everything sits with one team.",
    },
    {
      q: "What do I need to apply?",
      a: "The same details as the paper Heavy Equipment Purchase Finance Credit Application: the equipment price, financing amount and down payment; the vendor/seller and their address; your business information (legal name, tax ID#, business type, officers and members with 10%+ ownership); and personal information for each guarantor. The online form collects all of it in one pass.",
    },
    {
      q: "How fast is a decision?",
      a: "A specialist reviews every application personally — during business hours (Mon–Fri, 8AM–8PM EST) you will hear back quickly, and you can always call 833-762-3464 to move a deal forward.",
    },
  ] as Faq[],
  metaTitle: "Equipment Finance for Trucking Companies",
  metaDescription:
    "Finance tractors, trailers and equipment with specialists who know trucking cash flow. One application. Pair with factoring and insurance.",
  keywords: [
    "semi truck financing",
    "trucking equipment finance",
    "tractor trailer financing",
    "owner operator truck financing",
    "equipment finance application",
  ],
};
