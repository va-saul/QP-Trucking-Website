export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "tip"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated: string;
  image: string;
  author: string;
  authorRole: string;
  readingMinutes: number;
  category: "Factoring & Cash Flow" | "Insurance" | "Authority & Compliance" | "Fuel & Equipment" | "Safety & Fraud";
  keywords: string[];
  blocks: BlogBlock[];
  faqs: { q: string; a: string }[];
  references: { title: string; url: string; source: string }[];
  relatedServices?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-trucking-factoring-works-complete-guide-2026",
    title: "How Trucking Factoring Works: Complete Guide for Owner-Operators (2026)",
    description:
      "The plain-English guide to freight factoring for trucking companies — how it works, what it costs, recourse vs non-recourse vs Pure Non-Recourse™, and how carriers get paid in 15 minutes with QP Trucking Solutions.",
    excerpt:
      "From rate confirmation to cash in minutes — everything an owner-operator needs to know before selling a freight invoice, including the fee traps to avoid.",
    date: "2026-03-10",
    updated: "2026-09-18",
    image: "/images/hero/factoring.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 9,
    category: "Factoring & Cash Flow",
    keywords: [
      "how trucking factoring works",
      "trucking factoring",
      "freight factoring",
      "invoice factoring for trucking companies",
      "best trucking factoring company",
      "truck factoring rates",
      "factoring company for owner operators",
      "non-recourse factoring trucking",
      "how does freight factoring work",
    ],
    blocks: [
      {
        type: "p",
        text: "If you run a trucking company, you have felt the gap between delivering the load and getting paid for it. Standard terms in transportation are Net 30 — which in practice means 33 to 45 days in the mail and in the broker’s queue. Factoring closes that gap by buying your freight invoice today so you operate on cash, not on promises.",
      },
      {
        type: "p",
        text: "QP Trucking Solutions (QP Capital LLC, owned by Brandon Bennett in Louisville, KY) purchases the receivable at a small, flat, disclosed discount and then bills and collects for you. No debt appears on your balance sheet, no personal credit pull decides the outcome, and no long-term contract locks you in. Owner-operators to 200-truck fleets use it as a line of working capital that grows with revenue — the only financing that scales with sales.",
      },
      { type: "h2", text: "What trucking factoring is — and what it is not" },
      {
        type: "p",
        text: "Transportation factoring is the sale of accounts receivable at a discounted price. You are turning a balance sheet asset — an approved freight bill — into cash. It is not a loan, it does not create debt, and it does not require collateral beyond the invoices themselves. Approval is based on your customer’s credit — the broker or shipper who owes you money — not yours, which is why new authorities and credit-challenged carriers are routinely approved.",
      },
      {
        type: "ul",
        items: [
          "You haul the load exactly as the rate confirmation specifies and obtain a signed proof of delivery (POD / ePOD / BOL).",
          "You send the rate confirmation and POD to QP by phone photo, app, email or fax — legible, complete paperwork is everything.",
          "QP verifies the load and does a free credit check on the broker before you commit your truck.",
          "Funds are uploaded to your QP Card or sent by ACH — routinely in about 15 minutes for QP Pay clients — with the balance released when your customer pays.",
        ],
      },
      { type: "h2", text: "The three fees and terms that actually matter" },
      {
        type: "p",
        text: "QP uses flat, disclosed fees with no application fees, no hidden charges and no minimum volume. What moves your rate is (1) monthly volume, (2) the credit quality of your customers, and (3) the program you choose: recourse, non-recourse or Pure Non-Recourse™. Read the program comparison before you sign, because the cheaper fee can carry the larger risk.",
      },
      { type: "h3", text: "Recourse vs non-recourse vs Pure Non-Recourse™ at a glance" },
      {
        type: "ul",
        items: [
          "Recourse — lowest fee, you carry the credit risk. If the customer never pays, the invoice is charged back to you.",
          "Standard non-recourse — QP carries default, but most competitors only protect you inside a 60–90 day aging window. If bankruptcy is not declared inside that window, the chargeback comes back to you.",
          "Pure Non-Recourse™ (QP flagship) — deliver a Pure load (no deductions/claims) and submit Pure paperwork (legible, billable), and you receive Pure Protection: no chargeback ever, even if the broker never pays or goes bankrupt a year later.",
        ],
      },
      { type: "quote", text: "A single unpaid $10,000–$15,000 invoice can wipe out a young carrier’s reserve. Pure Non-Recourse™ exists so that load stops being your problem the moment it is verified.", cite: "QP Trucking Solutions — Factoring team, Louisville, KY" },
      { type: "h2", text: "The QP Card and fuel savings — where factoring pays twice" },
      {
        type: "p",
        text: "Every factoring client receives a QP Card — a Mastercard funded in minutes after verification, accepted anywhere, and tied to the nation’s largest fuel discount network. Carriers report 25–40 cents off per gallon — the difference between breaking even and making money on fuel. Push funds to driver sub-cards, set product and dollar limits, shut off a lost card instantly, and get IFTA-ready fuel reporting back to the office.",
      },
      {
        type: "ul",
        items: [
          "No need for drivers to carry cash — fraud controls are built in (product/volume/dollar limits, transaction security).",
          "Authorized staff add funds on the road like a debit card; 24/7 portal shows fleet activity in real time.",
          "Use the same card for permits, insurance, maintenance — one account for operating expenses.",
          "Bundle factoring + insurance for preferred pricing (QP is also a licensed trucking insurance agency).",
        ],
      },
      { type: "h2", text: "How to avoid factoring mistakes that cost carriers thousands" },
      {
        type: "ul",
        items: [
          "Require free broker credit checks before you book — QP clients get unlimited checks. If a broker scores poorly, do not haul it.",
          "Keep paperwork legible and complete: rate con + signed BOL + POD. Bad paperwork is the #1 reason funding slows.",
          "Match your program to the customer: run Pure Non-Recourse™ on weak or new brokers, recourse on the strong ones.",
          "Avoid minimums and long-term contracts if you value flexibility — QP has neither, by design.",
          "Ask for the fee in writing, with no reserve surprises, no maintenance fees and no UCC tricks at exit.",
        ],
      },
      { type: "tip", text: "Pro tip from dispatch: photograph paperwork in the QP app before you leave the delivery dock — daylight, flat surface, four corners visible. Loads funded from the cab before you finish post-trip." },
    ],
    faqs: [
      {
        q: "How much does trucking factoring cost in 2026?",
        a: "QP uses flat, disclosed fees based on your monthly volume, customer credit and program choice — no application fees, no hidden charges, no minimums. A personalized quote takes one call (833-762-3464) with your authority, insurance and customer list. Most carriers are quoted the same day.",
      },
      {
        q: "Who owns QP Trucking Solutions and can I talk to the owner’s team?",
        a: "QP Trucking Solutions (QP Capital LLC) is owned by Brandon Bennett in Louisville, Kentucky (4612 Outer Loop Rd, KY 40219). Brandon built QP as a family-owned team where carriers talk to people who know the file. Call 833-762-3464 and you reach Brandon’s team — not a phone menu.",
      },
      {
        q: "Do I need good personal credit to factor freight invoices?",
        a: "No. Factoring decisions are based on the creditworthiness of your customers (brokers/shippers), not your personal score. New authorities are routinely approved when the customer checks out.",
      },
      {
        q: "How fast will I get paid after delivering a load?",
        a: "After load verification and legible paperwork, funds are typically uploaded to your QP Card in about 15 minutes or sent by ACH within one business day. The balance of the invoice is released when your customer pays.",
      },
      {
        q: "What is the difference between recourse and Pure Non-Recourse™ factoring?",
        a: "Recourse is cheapest but you buy the invoice back if the customer never pays. Standard non-recourse protects against bankruptcy inside a 60–90 day window. Pure Non-Recourse™ removes the window: for qualifying Pure loads/paperwork, QP carries the risk for the life of the receivable — even if the broker never pays.",
      },
    ],
    references: [
      { title: "FMCSA — Operating Authority & Registration", url: "https://www.fmcsa.dot.gov/registration", source: "FMCSA" },
      { title: "SBA — How to Start a Business", url: "https://www.sba.gov/business-guide/launch-your-business", source: "U.S. Small Business Administration" },
      { title: "OOIDA — Factoring & Business Education", url: "https://www.ooida.com/", source: "OOIDA" },
      { title: "DAT — What Is Freight Factoring?", url: "https://www.dat.com/blog/what-is-freight-factoring", source: "DAT Freight & Analytics" },
      { title: "FreightWaves — Freight Factoring Market Explained", url: "https://www.freightwaves.com/news", source: "FreightWaves" },
      { title: "CFPB — Factoring disclosures & small-business finance", url: "https://www.consumerfinance.gov/", source: "CFPB" },
    ],
    relatedServices: ["trucking-factoring", "pure-non-recourse", "insurance", "new-authority"],
  },
  {
    slug: "pure-non-recourse-vs-non-recourse-factoring",
    title: "Pure Non-Recourse vs Non-Recourse vs Recourse Factoring: Which Protects Your Cash Flow?",
    description:
      "Recourse, standard non-recourse and QP’s Pure Non-Recourse™ compared — aging windows, bankruptcy risk, pricing and when each program makes sense for owner-operators and fleets.",
    excerpt:
      "The cheapest fee can carry the biggest risk. Here is how the three factoring structures actually protect (or expose) your cash flow when a broker does not pay.",
    date: "2026-03-18",
    updated: "2026-09-18",
    image: "/images/hero/pure-non-recourse.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 8,
    category: "Factoring & Cash Flow",
    keywords: [
      "pure non-recourse factoring",
      "non-recourse factoring",
      "recourse factoring",
      "non-recourse vs recourse factoring trucking",
      "no chargeback factoring",
      "factoring chargeback explained",
      "best factoring for new authority",
      "broker bankruptcy factoring",
    ],
    blocks: [
      {
        type: "p",
        text: "Every factoring company quotes a rate. The real question is who carries the risk when a broker goes dark. That language lives in the recourse clause — and most carriers do not read it until the chargeback letter arrives.",
      },
      { type: "h2", text: "Recourse factoring — lowest fee, you carry the risk" },
      {
        type: "p",
        text: "In a recourse agreement, if your customer never pays, the invoice is charged back to you — you ‘buy it back.’ The advance fee is lowest because the factoring company assumes little credit risk. Established carriers with strong, familiar brokers and healthy reserves sometimes choose recourse to save on fee percentage and self-insure the occasional loss.",
      },
      { type: "h2", text: "Standard non-recourse — protection, but with a window" },
      {
        type: "p",
        text: "Standard non-recourse advertises “bankruptcy protection,” and it is real — if the broker files bankruptcy and the invoice is still inside a 60- or 90-day aging window, you are not charged back. The problem is timing: bankruptcy rarely happens on a schedule. Companies often drift, pay late, then file months later — outside the window where you were protected. When that happens under many competitor contracts, the chargeback comes back to you anyway.",
      },
      { type: "h2", text: "Pure Non-Recourse™ — no window, no chargeback on qualifying loads" },
      {
        type: "p",
        text: "Pure Non-Recourse™ is QP’s flagship program. Deliver a Pure load — no deductions, no advances, no claims — and submit Pure paperwork — legible rate confirmation, signed BOL and POD that is billable without dispute — and you receive Pure Protection for the life of the receivable. No 60-day clock, no buyback, even if the broker never pays or goes bankrupt a year later.",
      },
      {
        type: "ul",
        items: [
          "Pure load = hauled exactly as rate con states, no shortages, no damages, no detention disputes that become deductions.",
          "Pure paperwork = copies are legible, names match, signatures present, accessorials documented — everything a billing department needs to pay without a dispute.",
          "Protection lasts for the life of the invoice, not the aging window — which is why new authorities choose it on weak customers.",
          "QP still offers standard non-recourse at a discounted rate for carriers who want to mix programs.",
        ],
      },
      { type: "h2", text: "Pricing vs risk — how carriers actually mix programs" },
      {
        type: "p",
        text: "Non-recourse costs slightly more because QP assumes the credit risk. Many small fleets run a blended book: Pure Non-Recourse™ on new, low-rated or thin-capital brokers; standard non-recourse on mid-tier customers; recourse only on the brokers they have run for years without a hiccup. Because QP has no long-term contract and no minimums, you can move invoices between programs as your book evolves — no penalty for choosing protection when you need it.",
      },
      { type: "quote", text: "What suits you best depends on your tolerance for risk and the size of your cash reserves — we’ll show you both options side by side and let you decide.", cite: "QP Trucking Solutions — Pure Non-Recourse™ page" },
      { type: "h2", text: "Checklist before you sign any factoring agreement" },
      {
        type: "ul",
        items: [
          "Is the fee flat and disclosed in writing, with no reserve manipulation?",
          "What is the exact recourse language — and the aging window for non-recourse?",
          "Are credit checks on brokers free and unlimited?",
          "Is there a long-term contract, a minimum volume, or an expensive exit/UCC release?",
          "Do you get a QP Card with fuel discounts — or is that an upsell elsewhere?",
          "Who handles collections when a broker is slow — you, or the factor?",
        ],
      },
      { type: "tip", text: "Ask the sales rep to show you a sample chargeback letter and where the protection ends. If they will not, you have your answer." },
    ],
    faqs: [
      {
        q: "What counts as a Pure load and Pure paperwork?",
        a: "A Pure load has no deductions, advances or claims against the freight. Pure paperwork is a legible rate confirmation plus signed bill of lading and proof of delivery — everything needed to bill the broker without dispute. Meet both and the invoice is protected for life of the receivable.",
      },
      {
        q: "Who is Brandon Bennett and why did QP create Pure Non-Recourse™?",
        a: "Brandon Bennett is the owner of QP Trucking Solutions (QP Capital LLC) in Louisville, KY. He created Pure Non-Recourse™ after seeing new authorities wiped out by one unpaid $15K invoice — the program removes the 60/90-day window so qualifying loads never come back as a chargeback.",
      },
      {
        q: "Does Pure Non-Recourse™ cost more?",
        a: "Yes — slightly, because QP carries the credit risk permanently. Many carriers blend programs: Pure on weak brokers, recourse on strong ones. With no minimums and no long-term contract, you can choose protection invoice by invoice.",
      },
      {
        q: "Can I factor only some invoices with QP?",
        a: "Yes. No minimums, no long-term contract. Factor one invoice or every invoice — you stay in control and can pause or leave anytime without penalty.",
      },
      {
        q: "What happens if my broker goes bankrupt after 120 days?",
        a: "Under many standard non-recourse contracts outside 60–90 days, you would be charged back. Under Pure Non-Recourse™ with a qualifying load/paperwork, there is no chargeback — QP carries the risk even if bankruptcy is declared months later.",
      },
    ],
    references: [
      { title: "FMCSA — Freight Factoring & Broker Authority", url: "https://www.fmcsa.dot.gov/", source: "FMCSA" },
      { title: "DAT — Recourse vs Non-Recourse Factoring", url: "https://www.dat.com/blog/recourse-vs-non-recourse-factoring", source: "DAT" },
      { title: "FreightWaves — Broker Bankruptcies & Carrier Risk", url: "https://www.freightwaves.com/news/broker-bankruptcies-rising", source: "FreightWaves" },
      { title: "OOIDA — Owner-Operator Business Education", url: "https://www.ooida.com/business/", source: "OOIDA" },
      { title: "SBA — Financing options & cash flow", url: "https://www.sba.gov/business-guide/manage-your-business/manage-your-finances", source: "SBA" },
    ],
    relatedServices: ["pure-non-recourse", "trucking-factoring", "insurance"],
  },
  {
    slug: "how-to-start-a-trucking-company-new-authority-checklist",
    title: "How to Start a Trucking Company in 2026: New Authority Checklist (LLC to First Load)",
    description:
      "Step-by-step checklist to start a trucking company — LLC, EIN, USDOT, MC authority, BOC-3, insurance, IRP, IFTA, 2290, UCR, drug consortium and compliance binder — with costs and timelines.",
    excerpt:
      "From entity to active MC number without wasted weeks — the exact sequence, documents and fees to get your first load legally and profitably.",
    date: "2026-04-02",
    updated: "2026-09-18",
    image: "/images/hero/new-authority.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 11,
    category: "Authority & Compliance",
    keywords: [
      "how to start a trucking company",
      "new authority checklist trucking",
      "how to get MC number",
      "how to get USDOT number",
      "start trucking company steps",
      "new authority cost 2026",
      "FMCSA operating authority",
      "trucking company LLC EIN",
    ],
    blocks: [
      {
        type: "p",
        text: "Starting a trucking company is a paperwork marathon with a clock. File one form out of order and you lose weeks — insurance cannot bind without authority, authority cannot go active without BOC-3 and insurance, plates cannot issue without 2290. The checklist below is the order that gets you from LLC to first load fastest, with the 2026 fees disclosed.",
      },
      { type: "h2", text: "Phase 1 — Entity and identity (before you file with FMCSA)" },
      {
        type: "ul",
        items: [
          "Form the LLC or corporation in your home state and obtain the EIN from the IRS — the address and legal name must match everywhere.",
          "Set up the business bank account, W-9 and a real business address where service of process can find you.",
          "Decide interstate vs intrastate, for-hire vs private, and what you will haul — it determines insurance limits and filings.",
        ],
      },
      { type: "h2", text: "Phase 2 — FMCSA authority (the 3–7 day window that decides your start date)" },
      {
        type: "p",
        text: "Apply for the USDOT number, then for operating authority (MC number). The FMCSA application itself is $300 in government fees. Before the MC can go active, two filings must be acknowledged by the agency: proof of insurance (BMC-91/91X filed by the insurer) and the BOC-3 designation of process agents. QP sequences this daily so nothing blocks you.",
      },
      {
        type: "ul",
        items: [
          "USDOT + MC application (FMCSA) — government fee $300 disclosed up front.",
          "BOC-3 filing — QP $60, $40 for factoring clients (all 50 states via national process agent, 20-day deadline but file immediately).",
          "Insurance binds and files to FMCSA — liability + cargo at broker-required limits (typically $750K–$1M liability).",
        ],
      },
      { type: "h2", text: "Phase 3 — Register the trucks and fuel taxes" },
      {
        type: "ul",
        items: [
          "Form 2290 (HVUT) — file first, get the stamped Schedule 1 — QP $60 / $40 client rate. Required before IRP plates issue.",
          "IRP apportioned registration — QP $195 service plus state mileage-based fees. One plate + cab card covers all jurisdictions.",
          "IFTA license & decals — QP $150 / $100 client rate; quarterly filings $60 / $40 each, annual renewal $100 / $70.",
          "UCR — annual, fleet-size based — QP $60 / $40 client rate. Apply with MC + USDOT.",
          "MCS-150 — keep mileage, drivers, power units and commodity accurate. QP $60 / $40 — no government fee, but missing the biennial update deactivates your USDOT.",
        ],
      },
      { type: "h2", text: "Phase 4 — Drivers, safety and audit readiness" },
      {
        type: "ul",
        items: [
          "Drug & Alcohol Consortium enrollment — QP $135 / $100. Every driver needs a negative pre-employment test before driving a CMV — including you if you drive. Clearinghouse queries are mandatory.",
          "DOT Compliance Binder — QP $99 PDF / $139 printed, tabbed for inspector or broker packet handoff in two minutes.",
          "ELD & Dashcam — FMCSA-registered ELD required for most interstate CMV drivers; QP savings program gives member pricing plus insurance credits.",
          "SCAC code — $60 / $40. Needed for intermodal, rail ramps, government and many large-shipper onboarding systems (2–4 letters, NMFTA issued).",
        ],
      },
      { type: "quote", text: "We have helped thousands of carriers get up and running — from one truck to 200 — because the same team that files your authority also runs your factoring and insurance. One phone number, 833-762-3464.", cite: "QP Trucking Solutions, New Authority page" },
      { type: "h3", text: "2026 pricing snapshot (QP service fees)" },
      {
        type: "ul",
        items: [
          "New Authority Set-Up — $200, or $100 with factoring client promo code (government fees separate).",
          "BOC-3, 2290, UCR, MCS-150, SCAC — $60 each, $40 for factoring clients.",
          "IFTA registration $150 / quarterly $60 / annual $100 (promo: $100 / $40 / $70).",
          "Drug & Alcohol Consortium $135 / $100; DOT Binder PDF $99 / Print $139; IRP $195 service.",
          "Factoring — flat disclosed fee, no minimums, no long-term contract. Get quote same day at 833-762-3464.",
        ],
      },
      { type: "tip", text: "Timeline reality: entity/EIN/insurance/BOC-3 in 1–2 days, FMCSA MC active in 3–7 days after insurance filing, IRP/IFTA plates and binder in the same week. Many QP clients are legally rolling in under two weeks — and funded in 15 minutes after first verified load." },
    ],
    faqs: [
      {
        q: "How long does it take to get a new trucking authority?",
        a: "Once USDOT, insurance and BOC-3 are acknowledged, FMCSA typically grants MC authority in 3–7 business days. QP monitors the portal daily and tells you the moment you can legally haul.",
      },
      {
        q: "Who is Brandon Bennett and does he oversee new authorities?",
        a: "Brandon Bennett owns QP Capital LLC (QP Trucking Solutions) in Louisville, KY. He built QP as a one-stop new-authority shop — factoring, insurance, BOC-3, 2290, IRP, IFTA, UCR, SCAC, drug consortium and binder — so a first-time carrier does not waste weeks juggling vendors.",
      },
      {
        q: "How much does new authority cost at QP?",
        a: "QP charges $200 for New Authority Set-Up, or $100 for factoring clients with promo. BOC-3, 2290, UCR, MCS-150, SCAC are $60 each ($40 client rate). Govt fees like the FMCSA $300 MC fee and state plate/2290 tax are separate and disclosed before filing.",
      },
      {
        q: "Do I need a drug consortium if I am the only driver?",
        a: "Yes. If you hold your own authority — even one truck — you must maintain a compliant testing program and be in a random pool via a consortium. Owner-operators who drive are both employer and employee under FMCSA rules.",
      },
      {
        q: "Can QP factor my first loads while authority is still pending?",
        a: "We set up factoring based on customer credit, so approval is ready the moment authority is active. Many clients are funded in ~15 minutes after first verified POD — no waiting 30–45 days from day one.",
      },
    ],
    references: [
      { title: "FMCSA — Get Authority to Operate", url: "https://www.fmcsa.dot.gov/registration/get-authority", source: "FMCSA" },
      { title: "FMCSA — BOC-3 Process Agents", url: "https://www.fmcsa.dot.gov/registration/process-agents", source: "FMCSA" },
      { title: "IRS — Form 2290 & HVUT", url: "https://www.irs.gov/businesses/small-businesses-self-employed/trucking-tax-center", source: "IRS" },
      { title: "FMCSA — USDOT & MCS-150 Registration", url: "https://www.fmcsa.dot.gov/registration/usdot-number", source: "FMCSA" },
      { title: "SBA — Launch Your Business", url: "https://www.sba.gov/business-guide/launch-your-business", source: "SBA" },
      { title: "OOIDA — Starting a Trucking Business", url: "https://www.ooida.com/business/", source: "OOIDA" },
    ],
    relatedServices: ["new-authority", "boc-3", "form-2290", "irp", "ifta", "insurance"],
  },
  {
    slug: "trucking-insurance-costs-2026-how-to-lower-premiums",
    title: "Trucking Insurance Costs in 2026: Why Premiums Are Rising and How to Lower Them",
    description:
      "Why semi truck insurance keeps rising — nuclear verdicts, medical costs, repair rates — and the six levers that actually move your premium, plus how QP binds coverage fast.",
    excerpt:
      "Hard market, higher verdicts, higher severity. Here is what underwriters really price — and how cameras, hiring standards and clean filings earn credits.",
    date: "2026-04-12",
    updated: "2026-09-18",
    image: "/images/hero/insurance.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 10,
    category: "Insurance",
    keywords: [
      "trucking insurance cost",
      "semi truck insurance",
      "trucking insurance rates 2026",
      "owner operator insurance cost",
      "commercial truck insurance",
      "trucking insurance quotes",
      "primary liability trucking insurance",
      "cargo insurance trucking",
    ],
    blocks: [
      {
        type: "p",
        text: "In a hard market, even clean fleets see increases. The causes are structural: nuclear verdicts are not easing, medical inflation keeps climbing, tractor/trailer replacement and repair costs rose sharply, and social inflation pushes both frequency and severity. Underwriters price two things above all — frequency of claims and cost of claims — so everything that reduces either can earn a credit.",
      },
      { type: "h2", text: "What actually moves your premium in 2026" },
      {
        type: "ul",
        items: [
          "Camera & telemetry adoption — forward-facing and AI dashcams are increasingly credited or required. Video exonerates drivers in ~90% of reviewed incidents where the car was at fault.",
          "Driver hiring, MVR monitoring and turnover — strict standards and continuous MVR pulls beat one-time checks.",
          "Loss history per mile — accurate mileage on your MCS-150 changes rate-based scoring. Under-reported miles make you look worse.",
          "Commodity & radius — long-haul, high-value, reefer and hazmat price differently than short-haul general freight.",
          "Maintenance documentation & safety program records — complete DVIRs, inspection reports and training logs matter at renewal.",
          "Deductible & payment structure — higher deductible lowers premium but raises exposure when a loss hits.",
        ],
      },
      { type: "h2", text: "What coverage you need before your authority goes active" },
      {
        type: "ul",
        items: [
          "Primary auto liability — most brokers require $750,000–$1,000,000 per occurrence (FMCSA filings BMC-91/91X prove it).",
          "Motor truck cargo — frequently $100,000 required; reefer breakdown and unattended-vehicle endorsements cost extra but matter.",
          "Physical damage on tractor/trailer, non-owned trailer coverage, and bobtail / NTL for owner-operators leasing to a carrier.",
          "General liability, occupational accident and trailer interchange when the broker or shipper demands it.",
        ],
      },
      { type: "h2", text: "How QP Trucking Insurance keeps the quote honest" },
      {
        type: "p",
        text: "Because QP also handles factoring and compliance, we see the whole picture — how trucks are equipped, how drivers are documented, and which credits the market will actually apply. We shop multiple carriers, explain limits and deductibles in plain English, file with FMCSA, and issue certificates the same day when possible. Bundle with factoring for preferred pricing. We also run an ELD & dashcam savings program so the technology that reduces claims does not become a budget breaker.",
      },
      { type: "quote", text: "Before any renewal, ask: which credits am I eligible for, and what documentation does the underwriter want to see? Most carriers leave money on the table simply because nobody asked.", cite: "QP Trucking Insurance — Louisville, KY" },
      { type: "h2", text: "Five moves that lower premium before renewal" },
      {
        type: "ul",
        items: [
          "Install FMCSA-registered ELD + AI dashcam and train drivers on log editing — unassigned driving and bad edits drive violations.",
          "Update MCS-150 mileage and power units so rates reflect real exposure, not stale estimates.",
          "Centralize DVIRs, maintenance receipts and driver files — auditors and underwriters ask for the same packet.",
          "Request higher deductibles only after checking cash reserve against a single claim.",
          "Price your lanes with congestion buffers — late arrivals hurt on-time metrics brokers share with insurers.",
        ],
      },
      { type: "tip", text: "New authority? QP coordinates insurance, BOC-3 and permits together so your MC goes live without a gap — and the same day you bind, factoring setup can begin." },
    ],
    faqs: [
      {
        q: "How much does trucking insurance cost for a new authority?",
        a: "Depends on equipment value, commodities, radius, driver records and required limits. Most new owner-operators need $1M liability + $100K cargo. Call 833-762-3464 with equipment, radius, driver list and loss runs for an itemized same-day quote — not a ballpark.",
      },
      {
        q: "Who leads QP Trucking Insurance?",
        a: "QP Trucking Solutions is owned by Brandon Bennett (QP Capital LLC, Louisville, KY). His insurance agency writes trucking risks exclusively — so the team that files your authority also shops your premium with the credits underwriters actually recognize.",
      },
      {
        q: "Do I need insurance before my authority is active?",
        a: "Yes. FMCSA requires an active insurance filing plus BOC-3 before your operating authority becomes active. QP coordinates both so your MC number goes live without a second vendor.",
      },
      {
        q: "Will a dashcam lower my trucking insurance premium?",
        a: "Often yes — many markets credit forward-facing or AI cameras, and some require them. Because QP places your policy, we can show the actual premium impact before you buy.",
      },
      {
        q: "Which states does QP Trucking Insurance serve?",
        a: "44 states across the U.S. — all except AK, CA, DC, HI, LA, NY and UT. If you operate interstate in those 44, we can quote liability, cargo, bobtail, physical damage and NTL.",
      },
    ],
    references: [
      { title: "FMCSA — Insurance Filing Requirements", url: "https://www.fmcsa.dot.gov/registration/insurance-filing-requirements", source: "FMCSA" },
      { title: "ATRI — Topics & Insurance/ Safety Research", url: "https://truckingresearch.org/", source: "ATRI" },
      { title: "FMCSA — SafeStat & CSA Overview", url: "https://csa.fmcsa.dot.gov/", source: "FMCSA" },
      { title: "FreightWaves — The Rising Cost of Trucking Insurance", url: "https://www.freightwaves.com/news/insurance-rates-trucking-2024", source: "FreightWaves" },
      { title: "OOIDA — Owner-Operator Insurance Resources", url: "https://www.ooida.com/", source: "OOIDA" },
    ],
    relatedServices: ["insurance", "eld-dashcam", "mcs-150", "dot-binder"],
  },
  {
    slug: "ifta-irp-ucr-form-2290-guide-fuel-tax-registration",
    title: "IFTA, IRP, UCR & Form 2290 Explained: Fuel Tax and Registration Guide for Fleets",
    description:
      "The complete guide to IFTA quarterly filings, IRP apportioned plates, UCR fleet-size registration and Form 2290 HVUT — with costs, deadlines, mileage rules and how QP files accurately the first time.",
    excerpt:
      "One truck crossing one state line creates four filings. Here is exactly when IFTA, IRP, UCR and 2290 apply, what they cost, and how to keep them from blocking your plates.",
    date: "2026-04-20",
    updated: "2026-09-18",
    image: "/images/hero/fuel-tax.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 10,
    category: "Authority & Compliance",
    keywords: [
      "IFTA filing trucking",
      "IRP registration apportioned plates",
      "UCR registration cost",
      "form 2290 HVUT filing",
      "IFTA quarterly filing deadline",
      "IRP vs IFTA",
      "heavy highway use tax 2290",
      "fuel tax reporting trucking",
    ],
    blocks: [
      {
        type: "p",
        text: "Most interstate carriers need all four — IFTA, IRP, UCR and Form 2290 — and the order matters. File 2290 first (you need the stamped Schedule 1 to get plates), then IRP plates, then keep IFTA and UCR current every quarter and year so roadside stops do not become citations.",
      },
      { type: "h2", text: "Form 2290 — Heavy Highway Vehicle Use Tax (HVUT)" },
      {
        type: "ul",
        items: [
          "Required for vehicles with taxable gross weight 55,000 lbs or more operating on public highways — the tax year runs July 1–June 30.",
          "Due the last day of the month following first use; most carriers file August–October. QP e-files for $60 ($40 client rate) and returns your stamped Schedule 1 for IRP.",
          "IRS tax is based on weight (55K to 75K+ lbs). QP discloses the tax plus filing fee before submitting.",
          "Low-mileage (≤5,000 mi / 7,500 ag) may qualify for suspension — we prepare that filing too.",
        ],
      },
      { type: "h2", text: "IRP — International Registration Plan (plates & cab cards)" },
      {
        type: "ul",
        items: [
          "One apportioned plate and cab card per power unit covers all jurisdictions you operate in — fees are apportioned by percentage of miles run in each.",
          "Choose a base jurisdiction where business is established and records are kept; the base issues plates/cab cards listing every jurisdiction.",
          "QP service $195 plus state mileage-based fees itemized up front; handles new registrations, added vehicles and annual renewals.",
          "Mileage accuracy is everything — ELD/IFTA data builds the fleet mileage report that drives apportionment.",
        ],
      },
      { type: "h2", text: "IFTA — Fuel tax reporting (the quarterly one that suspends you if you are late)" },
      {
        type: "ul",
        items: [
          "One IFTA license + decals covers your fleet instead of separate state fuel accounts; you net miles per gallon per jurisdiction into a single payment or credit.",
          "Filed quarterly — due April 30, July 31, October 31, January 31. Late = penalties, interest, suspended license.",
          "QP registration $150 / $100 client rate; quarterly filing $60 / $40; annual renewal $100 / $70. Reports reconciled from fuel card + ELD data.",
          "Needs total miles by jurisdiction + gallons purchased per jurisdiction — exactly why QP’s fuel card reporting matters.",
        ],
      },
      { type: "h2", text: "UCR — Unified Carrier Registration (the annual fleet-size permit)" },
      {
        type: "ul",
        items: [
          "Verifies active insurance and authority in states where you operate — required for interstate carriers, brokers, forwarders and leasing companies in 41 participating states.",
          "Fee is by fleet-size bracket (1 to 1,001+ power units), paid annually; enforcement is at weigh stations and roadside. QP files for $60 / $40 with certificate delivered for your binder.",
          "Open each fall for the following year; enforcement begins Jan 1 — early filing avoids day-one citations.",
          "Fleet size should match IRP/insurance/MCS-150 counts — states cross-reference.",
        ],
      },
      { type: "quote", text: "IRP registers your vehicles; IFTA reports and pays fuel tax by jurisdiction. Most interstate carriers need both, and the paperwork that feeds them is the same mileage.", cite: "QP — IRP vs IFTA explainer" },
      { type: "h2", text: "How QP keeps all four from expiring" },
      {
        type: "p",
        text: "We track every cycle for you — IRP renewal by base-state schedule, IFTA quarterlies before the deadline, UCR each fall, and 2290 before plates issue — so plates never expire and audits do not scramble. And because the same portal that funds your invoices also holds your fuel purchase data, IFTA gallons and miles reconcile without guesswork. Owned by Brandon Bennett, the team in Louisville files these every week.",
      },
      { type: "tip", text: "Keep a digital DOT binder PDF ($99) with Schedule 1, cab cards, IFTA license, UCR certificate and insurance — broker packets and inspections become a two-minute handoff." },
    ],
    faqs: [
      {
        q: "What is the difference between IRP and IFTA?",
        a: "IRP registers vehicles and divides registration fees among jurisdictions based on miles and weight. IFTA reports and pays fuel tax per jurisdiction based on miles per gallon. Most interstate interstate carriers need both — IRP for plates, IFTA for fuel tax.",
      },
      {
        q: "When are IFTA quarterly filings due?",
        a: "Last day of month after each quarter: April 30, July 31, Oct 31, Jan 31. Late = penalties + interest + suspended IFTA license. QP tracks the deadline and files from your fuel card + ELD data.",
      },
      {
        q: "Who handles these filings at QP?",
        a: "Brandon Bennett’s team in Louisville, KY — the same people who set up your factoring and insurance — prepare IFTA, IRP, 2290 and UCR so documents match and nothing blocks your authority. 4612 Outer Loop Rd, Louisville, KY 40219.",
      },
      {
        q: "How much does IFTA/IRP/2290/UCR cost at QP?",
        a: "2290 $60/$40 client, IRP $195 service, IFTA $150 registration / $60 quarterly / $100 annual (promo $100/$40/$70), UCR $60/$40. State taxes/fees are itemized at cost before you pay.",
      },
      {
        q: "Do I need 2290 before I can get IRP plates?",
        a: "Yes. States require stamped Schedule 1 proving HVUT payment before issuing apportioned plates. File 2290 first — QP does it electronically for fastest turnaround.",
      },
    ],
    references: [
      { title: "IRS — Trucking Tax Center (Form 2290)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/trucking-tax-center", source: "IRS" },
      { title: "IRP, Inc. — International Registration Plan", url: "https://www.irponline.org/", source: "IRP Inc." },
      { title: "IFTA, Inc. — International Fuel Tax Agreement", url: "https://www.iftach.org/", source: "IFTA Inc." },
      { title: "FMCSA — Registration & Authority", url: "https://www.fmcsa.dot.gov/registration", source: "FMCSA" },
      { title: "FMCSA — Unified Carrier Registration", url: "https://www.fmcsa.dot.gov/registration/unified-carrier-registration", source: "FMCSA" },
    ],
    relatedServices: ["ifta", "irp", "form-2290", "ucr", "dot-binder"],
  },
  {
    slug: "dot-compliance-binder-fmcsa-audit-checklist",
    title: "DOT Compliance Binder & FMCSA Audit Checklist: Stay Inspection-Ready Every Day",
    description:
      "The DOT compliance binder that passes inspections and compliance reviews — what goes in it, how to keep it current, and the audit checklist carriers actually need.",
    excerpt:
      "One binder, tabbed, in the cab and the office — the difference between a five-minute inspection and an out-of-service order.",
    date: "2026-05-02",
    updated: "2026-09-18",
    image: "/images/hero/dot-binder.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 8,
    category: "Authority & Compliance",
    keywords: [
      "DOT compliance binder",
      "FMCSA audit checklist",
      "DOT audit requirements trucking",
      "carrier compliance binder",
      "FMCSA compliance review",
      "DOT inspection checklist trucking",
      "driver qualification file checklist",
    ],
    blocks: [
      {
        type: "p",
        text: "Inspectors, auditors, brokers and insurers ask for the same packet — authority letter, insurance certificates, registrations, driver files, drug program and inspection reports. Scatter that across a truck, a glove box and a kitchen drawer and a simple inspection becomes an OOS or a failed audit. An organized DOT binder turns it into a two-minute handoff.",
      },
      { type: "h2", text: "What goes in a QP DOT compliance binder (PDF $99 / Print $139)" },
      {
        type: "ul",
        items: [
          "Authority: USDOT & MC numbers, operating authority letter — the first documents a broker checks in SAFER.",
          "Insurance: liability, cargo, physical damage certificates and FMCSA filing confirmations.",
          "Registrations: UCR certificate, IRP cab cards, IFTA license + decals, Form 2290 stamped Schedule 1, current registration copies.",
          "Process agent: BOC-3 confirmation with nationwide coverage (all 50 states, 20-day deadline but filed day one).",
          "Driver files: DQ files, MVRs, medical cards, road test, employment verifications — one section per driver.",
          "Safety: drug & alcohol program policy, Clearinghouse queries, random pool records, inspection & maintenance reports, accident register, FMCSA-required placards/pamphlets.",
        ],
      },
      { type: "h2", text: "FMCSA compliance review vs roadside inspection — what each looks for" },
      {
        type: "p",
        text: "A roadside inspection (Level 1–3) checks driver, vehicle and paperwork in minutes — ELD, license, medical, logs, permits, equipment. A compliance review (safety audit) pulls records for months: DQ files without medical currency, missing pre-employment drug test, lapsed IFTA or UCR, incomplete maintenance files. Both are passable with the same habit: current, organized records in one place.",
      },
      {
        type: "ul",
        items: [
          "Keep a digital PDF for broker onboarding and a printed, tabbed binder for the truck — QP can update the PDF each renewal so nothing drifts.",
          "Refresh whenever a document renews: insurance annually, UCR/IRP/IFTA annually, new driver file, new drug test.",
          "Cross-check fleet counts — UCR, IRP, insurance and MCS-150 should reflect the same number of power units; states cross-reference.",
          "Train drivers on the handoff: ‘Open the binder to Section 2, it is right here’ — inspectors remember professionalism.",
        ],
      },
      { type: "h2", text: "Why new authorities should start with the binder" },
      {
        type: "p",
        text: "The week your MC goes active, brokers ask for the packet and inspectors can stop you. Many QP clients order the binder the same week as authority setup — authority, insurance, UCR, IRP, IFTA, 2290 and BOC-3 documents we already filed go straight in, and driver-side paperwork is added next. Thousands of carriers keep a QP binder in the cab because it was built from filings that happen every week in Louisville, not from a template.",
      },
      { type: "quote", text: "No scattered paperwork all around your rig — have it in one place, ready for the inspector who decides your day.", cite: "QP — DOT Binder service" },
      { type: "tip", text: "Update tip: store the binder PDF in the QP portal + the truck. When QP reminds you about a renewal (UCR each fall, IFTA each quarter), the refreshed PDF is ready to send to brokers the same hour." },
    ],
    faqs: [
      {
        q: "Is a DOT compliance binder required by FMCSA?",
        a: "FMCSA requires you to maintain and produce specific records — DQ files, drug program, inspection/maintenance — but not a specific binder format. A tabbed binder is the most professional way to be ready instantly for inspection or audit.",
      },
      {
        q: "What does Brandon Bennett’s team put in the binder?",
        a: "Everything QP filed for you — authority letter, insurance certs, UCR, IRP cab cards, IFTA license, 2290 Schedule 1, BOC-3 — plus your driver files, drug program docs and inspection reports, organized in tabs with a cover page and checklist. Owner Brandon Bennett’s office is 4612 Outer Loop Rd, Louisville, KY 40219.",
      },
      {
        q: "How often should I update the binder?",
        a: "Whenever a document renews — insurance annually, UCR/IRP/IFTA annually, new driver/drug test, new inspection. QP can refresh the PDF each cycle so the broker packet you send is current.",
      },
      {
        q: "PDF or printed binder — which do I need?",
        a: "Digital PDF is ideal for broker onboarding and phone/tablet in cab; printed lives in the truck for roadside. Many carriers keep both — PDF $99, printed $139 at QP.",
      },
    ],
    references: [
      { title: "FMCSA — Safety Audit & Compliance Review", url: "https://www.fmcsa.dot.gov/safety/compliance-review", source: "FMCSA" },
      { title: "FMCSA — Driver Qualification Files", url: "https://www.fmcsa.dot.gov/registration/driver-qualification", source: "FMCSA" },
      { title: "CVSA — Inspection Levels Explained", url: "https://www.cvsa.org/inspections/", source: "CVSA" },
      { title: "FMCSA — Hours of Service & ELD", url: "https://www.fmcsa.dot.gov/hours-service/elds", source: "FMCSA" },
      { title: "OOIDA — Compliance Resources", url: "https://www.ooida.com/", source: "OOIDA" },
    ],
    relatedServices: ["dot-binder", "new-authority", "drug-alcohol-consortium", "insurance"],
  },
  {
    slug: "boc-3-mcs150-scac-drug-consortium-explained",
    title: "BOC-3, MCS-150, SCAC & Drug Consortium: The Hidden Filings That Keep Your Authority Active",
    description:
      "The four filings that silently kill authorities — BOC-3 process agents, MCS-150 biennial updates, SCAC codes and drug consortium/Clearinghouse — explained with costs, deadlines and fixes.",
    excerpt:
      "Small fees, big consequences — miss one of these four and your USDOT goes inactive, brokers refuse loads, or a driver is pulled from service.",
    date: "2026-05-14",
    updated: "2026-09-18",
    image: "/images/hero/compliance.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 9,
    category: "Authority & Compliance",
    keywords: [
      "BOC-3 filing trucking",
      "MCS-150 biennial update",
      "MCS-150 filing service",
      "SCAC code trucking",
      "drug and alcohol consortium trucking",
      "FMCSA clearinghouse query",
      "keep trucking authority active",
    ],
    blocks: [
      {
        type: "p",
        text: "Authority does not expire as much as it is deactivated — and these four filings are why. Each costs $60 at QP ($40 for factoring clients), each is a few minutes to file, and each will sideline a truck if you skip it. Here is what each one does, when it is due, and how to keep it current without thinking about it again.",
      },
      { type: "h2", text: "BOC-3 — Designation of process agents (file before authority goes active)" },
      {
        type: "ul",
        items: [
          "Federal filing that assigns a process agent to accept legal documents on your behalf in each state you operate in — required before MC goes active.",
          "You have 20 days, but there is no reason to wait — QP completes it via nationwide network covering all 50 states for $60 / $40 client rate, filed day one and coordinated with insurance.",
          "If company name, address or phone changes, BOC-3 + insurance must be updated — or SAFER shows you as inactive and brokers will not release loads.",
        ],
      },
      { type: "h2", text: "MCS-150 — Motor Carrier Identification Report (the biennial that deactivates you)" },
      {
        type: "ul",
        items: [
          "Records company details FMCSA uses for life of business — contact, carrier type, commodities, mileage, drivers & power units. Drives SAFER/CSA scoring.",
          "Due every 24 months and any time information changes — miss it and USDOT goes inactive (you cannot legally operate).",
          "QP files for $60 / $40 (no government fee). We pull SAFER, compare to reality — mileage under-reported makes rates look worse — and confirm biennial date so you never go inactive.",
          "Also the mileage number underwriters use for rate-based safety scoring; accurate mileage can improve broker-facing safety profile.",
        ],
      },
      { type: "h2", text: "SCAC — Standard Carrier Alpha Code (the 2–4 letters that unlock freight)" },
      {
        type: "ul",
        items: [
          "Unique 2–4 letter code issued by NMFTA — required for intermodal/rail ramps, ports, drayage, government tenders and many large shipper/3PL onboarding systems; used in EDI 204/214/210 to identify your carrier.",
          "Request a preferred combo but NMFTA assigns final based on availability; must be maintained or it is reassigned. QP $60 / $40, handles application and code maintenance.",
          "Without a SCAC, intermodal and government freight — often the higher-value lanes near hubs — is closed to you.",
        ],
      },
      { type: "h2", text: "Drug & Alcohol Consortium + Clearinghouse (the driver program every authority needs)" },
      {
        type: "ul",
        items: [
          "Owner-operators with own authority are both employer and employee — you must be enrolled in a random testing pool via a consortium; QP $135 / $100 plus per-test collection fees.",
          "Program includes pre-employment, random (pooled to meet 50% controlled substances / 10% alcohol annual rates), post-accident, reasonable-suspicion, return-to-duty/follow-up testing.",
          "Clearinghouse — FMCSA database of violations: run pre-employment query for each new driver + annual limited query for every driver; report violations promptly. A single missing negative pre-employment test can fail an audit and pull a driver out of service.",
          "Written policy, supervisor training, audit-ready records — QP manages random selections, queries and retention so audit is never a scramble.",
        ],
      },
      { type: "quote", text: "Being in business alone does not exempt you; it only means you are both employer and employee in the eyes of FMCSA — including random testing.", cite: "QP — Drug & Alcohol Consortium" },
      { type: "tip", text: "QP ties them together: when your MCS-150, BOC-3, UCR, IRP and insurance counts disagree, states cross-reference and flag you. We store the correct power unit count and propagate it to every filing." },
    ],
    faqs: [
      {
        q: "Do owner-operators need a drug consortium if alone?",
        a: "Yes. If you hold your own authority — even one truck — you must maintain compliant testing and be in a random pool via consortium. QP enrolls you for $135/$100 and manages pool, tests and Clearinghouse queries.",
      },
      {
        q: "How often is MCS-150 due and what if I miss it?",
        a: "Every 24 months plus any time info changes. Miss biennial and USDOT goes inactive — you cannot legally operate until record is fixed. QP tracks due date and files for $60/$40.",
      },
      {
        q: "Who handles these four filings at QP?",
        a: "Brandon Bennett’s team in Louisville, KY (4612 Outer Loop Rd, 40219) files BOC-3, MCS-150, SCAC and drug consortium weekly — so the same file that funds your freight also keeps authority active.",
      },
      {
        q: "What is a SCAC code and do I need one?",
        a: "A 2–4 letter carrier ID issued by NMFTA, required for intermodal/government freight and many shipper EDI systems. $60/$40 at QP; without it those lanes are closed.",
      },
      {
        q: "What happens if company address changes?",
        a: "Update BOC-3 + insurance and MCS-150 immediately so SAFER matches reality — brokers check before releasing loads. QP handles the update for you.",
      },
    ],
    references: [
      { title: "FMCSA — BOC-3 Process Agents", url: "https://www.fmcsa.dot.gov/registration/process-agents", source: "FMCSA" },
      { title: "FMCSA — MCS-150 Instructions", url: "https://www.fmcsa.dot.gov/registration/mcs-150", source: "FMCSA" },
      { title: "NMFTA — SCAC Application & Renewal", url: "https://nmfta.org/scac/", source: "NMFTA" },
      { title: "FMCSA Drug & Alcohol Clearinghouse", url: "https://clearinghouse.fmcsa.dot.gov/", source: "FMCSA Clearinghouse" },
      { title: "FMCSA — Drug & Alcohol Testing Requirements", url: "https://www.fmcsa.dot.gov/regulations/drug-alcohol-testing", source: "FMCSA" },
    ],
    relatedServices: ["boc-3", "mcs-150", "scac", "drug-alcohol-consortium", "dot-binder"],
  },
  {
    slug: "fuel-cards-for-truckers-save-25-40-cents-per-gallon",
    title: "Fuel Cards for Truckers: Save 25–40¢ Per Gallon and Stop Fuel Fraud (2026 Guide)",
    description:
      "The complete fuel card guide for owner-operators and fleets — how fuel discounts work, which network is largest, fraud controls that actually stop theft, and why QP’s fuel card funds in minutes.",
    excerpt:
      "The most controllable cost on the statement — how 25–40¢/gal savings compound, and the controls that keep drivers honest and fraud out.",
    date: "2026-05-22",
    updated: "2026-09-18",
    image: "/images/hero/factoring.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 9,
    category: "Fuel & Equipment",
    keywords: [
      "fuel card for truckers",
      "best fuel card for owner operators",
      "trucking fuel card discounts",
      "fuel card savings 25 cents per gallon",
      "fleet fuel card trucking",
      "QP fuel card",
      "diesel fuel discounts trucking 2026",
      "prevent fuel fraud trucking",
    ],
    blocks: [
      {
        type: "p",
        text: "Fuel is 22–28% of cost per mile — and the only line item where a card swipe cuts the price instantly. A 30-cent discount on 18,000 gallons a year (a single reefer running 120K miles at 6.5 mpg) is $5,400 back — without negotiating rates, without adding a customer, without a mile more. For a 10-truck fleet, that is $54,000.",
      },
      { type: "h2", text: "How fuel card discounts actually work" },
      {
        type: "ul",
        items: [
          "Network fuel cards negotiate volume pricing with truck stops/terminals — the nation’s largest network covers retail + terminal locations across North America.",
          "Discount is per gallon off cash price, settled on statement. QP clients report 25–40¢ off retail — not an introductory promo, every fill.",
          "IFTA-ready reporting flows back: gallons by jurisdiction mapped for quarterly filings, so the finance office reconciles miles vs purchases without spreadsheets.",
          "Mastercard acceptance means the same QP Card that holds your factoring advance also buys fuel — funded in ~15 minutes after load verification.",
        ],
      },
      { type: "h2", text: "The fraud problem cash cannot solve" },
      {
        type: "p",
        text: "Cash advances and driver carries are fraud’s easiest path. Fuel cards replace both with controls that dispatch sets in seconds — and accounting sees in real time.",
      },
      {
        type: "ul",
        items: [
          "Set product, volume and dollar limits per card/driver; require security for every transaction; shut off a lost card instantly from portal.",
          "Authorized staff add funds on the road like a debit card — driver pays provider with card, obtains receipt on letterhead with address/phone, no reimbursement chase.",
          "24/7 online access: see every transaction by card, stop, product and gallon — plus exception alerts for off-network or after-hours fueling.",
          "Identity theft scams (fake repair shop calls demanding immediate cash) fail when the answer is ‘we don’t carry cash — use the card’.",
        ],
      },
      { type: "h2", text: "QP Fuel Card — the highlighted difference" },
      {
        type: "p",
        text: "Every QP factoring client receives a QP Card on day one — no separate application, no credit check. Transfer to bank, push to driver sub-cards, set bill pay, and buy parts, DEF and maintenance off the same balance. It is the same account that receives your freight advances in minutes, so cash and discounts live together. Owned by Brandon Bennett, QP bundles factoring + fuel savings because carriers asked for one roof.",
      },
      {
        type: "ul",
        items: [
          "Accepted anywhere Mastercard is accepted — not a closed-loop that locks you to one chain.",
          "Push funds to driver sub-accounts so each truck carries its own limit; limit by gallons, not just dollars.",
          "Detailed fuel data exports for IFTA — no re-typing from receipts; QP team reconciles fuel card + ELD miles each quarter.",
          "No long-term contract on factoring means you keep the card because it saves money — not because a contract says so.",
        ],
      },
      { type: "quote", text: "I absolutely love the fuel card — every time I look at that statement and see 25 or 40 cents off the cash price it makes me tingle.", cite: "QP client — Owner-Operator, Flatbed · 1 truck · TN" },
      { type: "h2", text: "How to choose a fuel card (the carrier’s checklist)" },
      {
        type: "ul",
        items: [
          "Largest network near your lanes — not the advertised ‘best’ price at three stops you never hit.",
          "Real-time controls (per driver/per truck) and instant shut-off vs next-day phone calls.",
          "IFTA-grade reporting exported by jurisdiction vs PDF on statement only.",
          "Fees that are flat and disclosed vs swiped fees that eat the discount.",
          "Card that funds from freight factoring in minutes vs a prepaid card you must load from bank 2–3 days out.",
        ],
      },
      { type: "tip", text: "Dispatch math: at $3.85 diesel, 35¢ off is 9% — the same as getting a $135 rate con to $147 without bidding. Multiply by gallons, not hope." },
    ],
    faqs: [
      {
        q: "How much do QP clients actually save with the fuel card?",
        a: "Carriers report 25–40¢ per gallon off cash price across North America’s largest fuel discount network. Savings depend on lane and stop, but at 18K gallons/year a 30¢ discount is ~$5,400 per truck — before factoring benefits.",
      },
      {
        q: "Who is Brandon Bennett and does the fuel card come with factoring?",
        a: "Brandon Bennett owns QP Trucking Solutions (QP Capital LLC, Louisville, KY). Every factoring client receives a QP Card funded in minutes after load verification — so fuel discounts and fast cash are one account, not two vendors.",
      },
      {
        q: "Can I set limits per driver with the QP fuel card?",
        a: "Yes — product, volume and dollar limits per sub-card, real-time portal, and instant shut-off if a card is lost. No driver needs to carry cash.",
      },
      {
        q: "Does the fuel card help with IFTA?",
        a: "Yes. Detailed transaction data flows to the office by jurisdiction and makes IFTA fuel tax reporting far simpler — QP reconciles fuel card + ELD miles each quarter.",
      },
      {
        q: "Is the QP Card a credit card?",
        a: "No — it is a Mastercard-funded account that receives your factoring advances. No long-term contract, no credit pull for the card; spend anywhere Mastercard is accepted.",
      },
    ],
    references: [
      { title: "NASTC — Fuel Network & Savings for Carriers", url: "https://www.nastc.com/", source: "NASTC" },
      { title: "FMCSA — IFTA & Fuel Tax Reporting", url: "https://www.fmcsa.dot.gov/", source: "FMCSA" },
      { title: "DAT — Fuel & Operating Costs for Carriers", url: "https://www.dat.com/resources", source: "DAT" },
      { title: "ATRI — Operational Costs of Trucking", url: "https://truckingresearch.org/research/operational-costs-of-trucking/", source: "ATRI" },
      { title: "FreightWaves — Fuel Card & Freight Fraud Prevention", url: "https://www.freightwaves.com/news", source: "FreightWaves" },
    ],
    relatedServices: ["trucking-factoring", "ifta", "dot-binder"],
  },
  {
    slug: "eld-mandate-dashcam-guide-2026",
    title: "ELD Mandate & Dashcam Guide 2026: FMCSA Rules, Best Devices and Insurance Discounts",
    description:
      "ELD mandate refresher for 2026 — who must have a registered ELD, how to avoid log-edit violations, and which AI dashcams actually lower insurance premiums.",
    excerpt:
      "The device is mandatory; the violations are avoidable — and the camera that proves fault can pay for itself at renewal.",
    date: "2026-05-30",
    updated: "2026-09-18",
    image: "/images/hero/eld.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 9,
    category: "Safety & Fraud",
    keywords: [
      "ELD mandate trucking 2026",
      "FMCSA ELD rules",
      "electronic logging device owner operator",
      "best ELD for trucking",
      "AI dashcam trucking insurance discount",
      "dashcam for truckers",
      "FMCSA registered ELD",
      "ELD violations how to avoid",
    ],
    blocks: [
      {
        type: "p",
        text: "Most interstate CMV drivers required to keep records of duty status must use a registered ELD. The device itself is the easy part — most violations come from drivers editing logs incorrectly, missing in-cab documentation for unassigned driving, or an owner-operator whose provider never registered the device with FMCSA in the first place. The 2026 refresher below is how to stay legal and how to buy smart.",
      },
      { type: "h2", text: "Who must have an ELD — and the two real exceptions" },
      {
        type: "ul",
        items: [
          "Required for most drivers who keep RODS — interstate CMVs operating beyond short-haul exception. The device must be FMCSA-registered and listed on FMCSA’s registered devices list.",
          "Short-haul exception (100/150 air-mile) and pre-2000 engine exception — QP confirms which applies to your operation; most interstate for-hire carriers do not qualify.",
          "In-cab duties: driver instruction sheet, transfer instructions, and handling of unassigned driving must be in the truck or the inspection fails even if logs are perfect.",
        ],
      },
      { type: "h2", text: "The five log mistakes that draw citations" },
      {
        type: "ul",
        items: [
          "Editing driving time incorrectly — especially rounding or deleting unassigned driving instead of annotating.",
          "Unassigned driving not reviewed at start of shift — it must be accepted or annotated, not ignored.",
          "Wrong driver login or co-driver misuse — HOS follows the driver, not the truck.",
          "Missing location description or malfunction annotation when ELD shows diagnostic event.",
          "No supporting documents retained — fuel receipts, BOL/POD and ELD logs must reconcile; mismatches invite deeper audit.",
        ],
      },
      { type: "h2", text: "Dashcams — the policy credit that also wins claims" },
      {
        type: "p",
        text: "Forward-facing and AI interior cameras are increasingly credited or required by insurers — and they are the fastest way to exonerate a driver. In telemetry-reviewed crashes, the car is at fault roughly 90% of the time — but the first impression is that the truck caused it. Video shifts the claim from story to evidence.",
      },
      {
        type: "ul",
        items: [
          "Credits: many markets credit forward-facing; AI (distraction, following distance, lane departure) often earns an extra tier.",
          "Claims: footage resolves fault faster, protects safety rating, and reduces nuclear verdict exposure — which is why premiums increasingly depend on it.",
          "Privacy: inward-facing policies must be disclosed to drivers; QP recommends written policy and clear use limits.",
          "Retention: store at least 30 days forward + event-triggered clips; insurers and plaintiffs’ counsel both request it.",
        ],
      },
      { type: "h2", text: "How QP’s ELD & Dashcam Savings Program buys smarter" },
      {
        type: "p",
        text: "QP provides member pricing on FMCSA-registered ELDs and dashcams, vendor-neutral advice (not paid by one device maker), and coordination with your insurance renewal so camera credits actually land on the policy. We review contract length, month-to-month options and data fees so savings are real rather than repackaged — quote after a short fleet review (truck count, lanes, turnover, current provider).",
      },
      {
        type: "ul",
        items: [
          "Preferred pricing negotiated for trucking companies — savings depend on fleet size.",
          "Installation guidance + driver training on logs and unassigned driving so first trip passes inspection.",
          "Support exporting ELD and camera records during audits or claims — the records that decide fault.",
          "Bundle with QP factoring + insurance — the same team that files authority also shops the renewal.",
        ],
      },
      { type: "quote", text: "Buying a device is the easy part. Most violations come from bad setup, not bad hardware.", cite: "QP — ELD & Dashcam program" },
      { type: "tip", text: "Before you sign a 36-month ELD contract, ask: month-to-month price, early termination, who owns the data at exit. QP shows you the comparison in writing." },
    ],
    faqs: [
      {
        q: "Do I need an ELD if I am leased to a carrier?",
        a: "Usually yes if you operate a CMV required to keep RODS — the ELD requirement follows the driver/vehicle, not who holds authority. The short-haul and pre-2000 exceptions are narrow; QP confirms which applies.",
      },
      {
        q: "Will a dashcam lower my trucking insurance?",
        a: "Often yes — many insurers credit forward-facing/AI cameras and some require them. Because QP writes your insurance, we show the actual premium impact before you buy rather than a promise.",
      },
      {
        q: "Who owns QP and can he advise on ELD vs insurance?",
        a: "Brandon Bennett owns QP Trucking Solutions (QP Capital LLC). His team in Louisville coordinates ELD/dashcam choice with your insurance renewal — so the device you buy actually reduces the premium you pay.",
      },
      {
        q: "What is unassigned driving and why does it trigger OOS?",
        a: "Time/distance the ELD records without a driver logged in. It must be reviewed and annotated/reassigned at next login. Ignoring it or deleting it is a common violation that fails inspections.",
      },
      {
        q: "How does QP help with ELD installation?",
        a: "We coordinate hardware, FMCSA registration, in-cab documents and driver training with your chosen provider so the install is compliant and first-trip logs pass.",
      },
    ],
    references: [
      { title: "FMCSA — ELD Rule & Registered Devices", url: "https://www.fmcsa.dot.gov/hours-service/elds", source: "FMCSA" },
      { title: "FMCSA — Hours of Service Regulations", url: "https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations", source: "FMCSA" },
      { title: "CVSA — ELD Inspection & Enforcement", url: "https://www.cvsa.org/", source: "CVSA" },
      { title: "FMCSA — CSA & Safety Measurement", url: "https://csa.fmcsa.dot.gov/", source: "FMCSA CSA" },
      { title: "ATRI — Safety Technology & Risk", url: "https://truckingresearch.org/", source: "ATRI" },
    ],
    relatedServices: ["eld-dashcam", "insurance", "dot-binder"],
  },
  {
    slug: "top-5-trucking-scams-double-brokering-fraud-protection",
    title: "Top 5 Trucking Scams and Double-Brokering Fraud: How Carriers Protect Their Loads (2026 Update)",
    description:
      "The five fraud schemes hitting carriers hardest in 2026 — load scams, driver-impersonation, false claims, DOT impostors, repair fraud — plus double-brokering red flags and the fuel card check that stops them.",
    excerpt:
      "Fraud follows freight rates. Here are the five schemes our clients report most — and the verification steps that make your carrier ID very hard to rob.",
    date: "2026-06-08",
    updated: "2026-09-18",
    image: "/images/hero/factoring.jpg",
    author: "Brandon Bennett",
    authorRole: "Owner, QP Trucking Solutions",
    readingMinutes: 10,
    category: "Safety & Fraud",
    keywords: [
      "trucking scams 2026",
      "freight fraud prevention",
      "double brokering trucking",
      "carrier identity theft",
      "load scam trucking",
      "DOT scam trucking",
      "double brokering fines MAP-21",
      "how to avoid freight fraud",
    ],
    blocks: [
      {
        type: "p",
        text: "Freight fraud is not fringe — it is a daily cost of doing business, peaking whenever capacity tightens. The five schemes below are what QP clients report most often, followed by the procedures that make a carrier ID hard to rob. We also cover double brokering — the federal MAP-21 penalty is $10,000 per incident — and why it matters to factoring risk.",
      },
      { type: "h2", text: "1. The load scam (fake carrier, real advance)" },
      {
        type: "p",
        text: "A scammer impersonates a legitimate carrier, books a load, immediately requests a fuel advance for ‘over-the-road expenses,’ and may even produce a falsified BOL claiming pickup. Once the advance lands, they disappear — or worse, they actually pick up the load and hold it for ransom demanding an EFT. The common thread is pressure to pay fast.",
      },
      { type: "h2", text: "2. The driver-in-need scam (truck stop impersonation)" },
      {
        type: "p",
        text: "A fraudster poses as one of your drivers — usually targeting larger driver pools — and calls dispatch requesting cash for fuel or repair. Details are lifted from overheard conversation or from markings on the truck itself. The request is urgent, the amount is plausible, and the phone number is spoofed.",
      },
      { type: "h2", text: "3. False freight claims (sealed trailer, denied inspection)" },
      {
        type: "p",
        text: "Driver is kept off the dock while loading, trailer is sealed for ‘security,’ and the BOL requires a piece count signature anyway. The shortage is discovered only at delivery — and the sealed doors that were supposed to protect the load were part of the fraud. Drivers are pressured to sign for count they could not verify.",
      },
      { type: "h2", text: "4. The DOT impostor scam" },
      {
        type: "p",
        text: "Two variants. One poses as DOT or an on-site officer during inspection and demands immediate payment for a fictitious violation. The second is a letter requesting payment to ‘file your DOT renewal’ with a threat of fines. Remember: biennial USDOT updates are free on the FMCSA site — QP files MCS-150 for $60/$40, the government fee is $0.",
      },
      { type: "h2", text: "5. The phony repair shop scam (and the tow you never ordered)" },
      {
        type: "p",
        text: "You get an urgent demand for payment before equipment is released — with a convincing invoice bearing your plate and driver name — from a shop that never touched your truck. Or a tow bill for a tow that never happened. The details were lifted off the side of the trailer at the truck stop.",
      },
      { type: "h2", text: "Double brokering — re-brokering your load to an unauthorized carrier" },
      {
        type: "p",
        text: "Double brokering is the practice of re-brokering a load, sometimes to a company without proper authority, without the original broker’s knowledge. The brokerage trade group has pushed the issue again — the original broker often does not find out ‘unless something bad happens.’ Federal law already allows up to $10,000 per incident under MAP-21 (2012) — the intent was to give regulators a civil penalty to go after bad actors.",
      },
      {
        type: "ul",
        items: [
          "Confirm the broker on the rate confirmation holds active authority and matches the load tender — QP runs unlimited free credit/authority checks for clients before dispatch.",
          "Never accept a load from a carrier claiming to ‘broker on behalf’ of the broker without written consent.",
          "Keep the paper trail: rate cons, recorded check calls, signed BOLs — your defense if a broker refuses to pay.",
          "Red flags: pressure to start immediately, rate far above market, broker who cannot provide MC number or whose MC was issued days ago.",
          "Under Pure Non-Recourse™, qualifying loads carry no chargeback risk — but due diligence is still the first defense.",
        ],
      },
      { type: "h2", text: "Six verification steps that stop most scams" },
      {
        type: "ul",
        items: [
          "Validate the driver: speak to the driver whose vehicle is involved before releasing funds. Never accept a phone handover from a ‘provider’ to the driver as proof.",
          "Validate the provider: unscheduled service demanding immediate payment is a red flag. Confirm the provider did not lift info off the truck.",
          "Ask identifying questions: full name, employee number and date of birth confirm driver and equipment.",
          "Check the number: validate incoming phone against your database, vendor website or public listing — do not trust caller ID.",
          "Send money to the driver, not the third party: have driver pay provider and obtain receipt on letterhead with valid address/phone.",
          "Use fuel cards instead of cash: remove need for large cash carries; set product/volume/dollar limits and shut off a lost card instantly. QP clients get the QP Card with the largest fuel discount network.",
        ],
      },
      { type: "quote", text: "The brokerage trade group is diving anew into double brokering — the penalty under MAP-21 is up to $10,000 per incident. Validate before you haul.", cite: "FreightWaves / TIA — Double brokering enforcement" },
      { type: "tip", text: "Driver-side habit: never sign a BOL for a count you could not verify. Write ‘shipper load & count — driver not present at loading’ rather than the piece count if you were denied inspection." },
    ],
    faqs: [
      {
        q: "What is double brokering and is it illegal?",
        a: "Double brokering is re-brokering a load to another carrier/broker without the original broker’s consent, sometimes to an unauthorized carrier. Federal law under MAP-21 allows civil penalties up to $10,000 per incident.",
      },
      {
        q: "How do I know if a broker is legitimate before I haul?",
        a: "Run a credit and authority check before dispatch — QP clients get unlimited free checks. Confirm active MC, rate con matches tender, phone and MC issuance date make sense, and be wary of far-above-market rates or pressure to start now.",
      },
      {
        q: "Who is Brandon Bennett and how does QP help prevent fraud?",
        a: "Brandon Bennett owns QP Trucking Solutions (QP Capital LLC, Louisville, KY). His team verifies brokers, provides unlimited credit checks, funds via the QP Card (not cash), and educates on fraud patterns so new authorities are not easy targets.",
      },
      {
        q: "Does QP’s fuel card help prevent scams?",
        a: "Yes. Eliminating cash removes the fraud vector. Set limits, monitor in real time, shut off a lost card instantly, and require security for every transaction — plus detailed IFTA reporting.",
      },
      {
        q: "What should I do if a load is held for ransom?",
        a: "Do not send an EFT under duress. Document the actors, preserve rate con/BOL/call records, contact the original broker immediately, file a police report, and report to FMCSA’s fraud resources. QP helps clients preserve the paper trail for collection/claims.",
      },
    ],
    references: [
      { title: "FMCSA — Protect Yourself from Freight Fraud", url: "https://www.fmcsa.dot.gov/protect-your-move", source: "FMCSA" },
      { title: "FreightWaves — Double Brokering & Fraud Trends", url: "https://www.freightwaves.com/news/double-brokering-fraud-trends", source: "FreightWaves" },
      { title: "TIA — Double Brokering Awareness & Penalties", url: "https://www.tianet.org/", source: "TIA" },
      { title: "FMCSA — MAP-21 Act & Civil Penalties", url: "https://www.fmcsa.dot.gov/map-21", source: "FMCSA" },
      { title: "DAT — Carrier Identity Theft Prevention", url: "https://www.dat.com/blog/protecting-your-carrier-identity", source: "DAT" },
      { title: "ATRI — Operational Costs & Fraud Impact", url: "https://truckingresearch.org/", source: "ATRI" },
    ],
    relatedServices: ["trucking-factoring", "pure-non-recourse", "dot-binder"],
  },
];

export const blogBySlug = Object.fromEntries(blogPosts.map((p) => [p.slug, p])) as Record<string, BlogPost>;

export const blogCategories = [...new Set(blogPosts.map((b) => b.category))] as string[];

export const featuredBlogSlugs = [
  "how-trucking-factoring-works-complete-guide-2026",
  "fuel-cards-for-truckers-save-25-40-cents-per-gallon",
  "how-to-start-a-trucking-company-new-authority-checklist",
];
