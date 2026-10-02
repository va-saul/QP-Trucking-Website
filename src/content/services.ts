import type { Service } from "@/lib/types";

/**
 * Single source of truth for every service page.
 * Copy is carried over from qpfactoring.com (so nothing is lost in the redesign)
 * and expanded with citable answer blocks, FAQs and structured data.
 */
export const services: Service[] = [
  /* ------------------------------------------------------------------ */
  /* FACTORING                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "trucking-factoring",
    name: "Transportation Factoring",
    short: "Transportation Factoring",
    category: "Factoring",
    eyebrow: "Factoring · Programs 01",
    tagline:
      "Recourse, non-recourse and Pure Non-Recourse™ transportation factoring — funded in minutes after load verification, with no hidden fees.",
    answer:
      "Transportation factoring is the sale of your freight invoices at a small discount so your trucking company gets paid in hours instead of waiting 30–45 days for brokers and shippers. QP Trucking Solutions bills and collects for you, advances cash in minutes after load verification, and never creates debt.",
    heroVariant: "invoice",
    heroImage: "/images/hero/factoring.jpg",
    accent: "blue",
    price: {
      summary: "Flat, disclosed fee based on volume & customer credit — no application fees, no minimums",
      fine: "No long-term contract. Factor only the invoices you choose.",
    },
    checkoutUrl: "/get-started?service=trucking-factoring",
    heroStats: [
      { label: "Typical advance", value: "Same day" },
      { label: "Funding speed", value: "~15 min" },
      { label: "Minimums", value: "None" },
    ],
    intro: [
      "If you run a professional trucking business, you have experienced — or you will experience — a delay between completing the job and receiving funds from your customer. Standard payment terms in transportation are net 30 days, which means the majority of checks actually arrive between 33 and 45 days.",
      "Whether you are a true owner-operator with your own authority or a small or large fleet, waiting to get paid causes financial stress. QP Trucking Solutions' transportation factoring services solve the need for steady cash flow for operational expenses, fuel bills, driver salaries, leases and insurance payments. Think of it as being able to accept a credit card from your customer.",
    ],
    sections: [
      {
        h: "What is transportation factoring?",
        p: [
          "Transportation factoring is the sale of accounts receivable at a discounted price. The benefit is that no debt is being established — you are simply turning a balance sheet asset into real cash. Whether you use our Recourse, Non-Recourse or Pure Non-Recourse™ program, we can get you paid in minutes after verification of the load.",
          "We do all the billing and receiving for you, freeing your valuable time for revenue-generating activities. Any trucking company with creditworthy clients can qualify for QP's factoring program, because factoring is based on your customer's credit — not your own.",
        ],
      },
      {
        h: "Why carriers choose QP factoring",
        bullets: [
          "Get cash immediately — typically in less than 24 hours, and often in about 15 minutes for QP Pay clients",
          "Eliminate the overhead of processing, mailing and collecting invoices",
          "Unlimited capital that scales with your sales — the only financing that grows with revenue",
          "Poor personal credit is not a barrier: only your customers' credit history is reviewed",
          "Total flexibility — factor only the invoices you choose",
          "Ultimate peace of mind with our Pure Non-Recourse™ program",
        ],
      },
      {
        h: "Recourse vs. non-recourse vs. Pure Non-Recourse™",
        p: [
          "Recourse factoring is the lowest-cost option. If a customer never pays, the invoice is charged back to you (bought back), so you carry the credit risk.",
          "Standard non-recourse protects you against a customer's bankruptcy — but read the fine print elsewhere: most factoring companies only let an invoice age 60 or 90 days, so if bankruptcy is not declared inside that window you can still be charged back.",
          "Pure Non-Recourse™ is our flagship program. Deliver a Pure load (no deductions or claims) and turn in Pure paperwork (acceptable to bill with) and you receive Pure Protection — you never have to worry about that load again, no matter when or whether the broker pays.",
        ],
      },
      {
        h: "Get paid in 3 steps",
        bullets: [
          "1. Deliver your load — haul it exactly as your rate confirmation specifies",
          "2. Send paperwork — snap a photo of the rate con and POD with our app, or email/fax them in",
          "3. Get paid — funds are uploaded to your QP Card or sent by ACH, with the remainder of the invoice released once your customer pays",
        ],
      },
    ],
    benefits: [
      "No long-term contract and no minimum volume you must meet",
      "Simple terms and a flat fee structure with no hidden fees",
      "Unlimited free credit checks on brokers before you book",
      "Free broker credit checks, fuel card savings, and Quick Pay options",
      "Dedicated account reps who know your name and your lanes",
      "Setup usually completes in under 24 hours",
    ],
    process: [
      {
        title: "Get set up in under 24 hours",
        body: "Send your authority, insurance certificate, W-9 and a customer list. Our team runs credit on your brokers and issues rate agreements the same day.",
      },
      {
        title: "Factor what you want",
        body: "Choose which invoices to sell. There are no minimums and no long-term contract, so you can factor one load or your entire month.",
      },
      {
        title: "Escalate anytime",
        body: "When you no longer need our help, we make the transition seamless. Until then, we're the team chasing your money so you can keep rolling.",
      },
    ],
    faqs: [
      {
        q: "How much does transportation factoring cost?",
        a: "QP uses flat, fully disclosed fees based on your monthly volume, the credit quality of your customers and the program you select. There are no application fees, no hidden charges and no minimum volume. Call 833-762-3464 for a same-day quote.",
      },
      {
        q: "How fast will I receive my money after I deliver a load?",
        a: "Once the load is verified and your paperwork is legible, funds are typically uploaded to your QP Card in about 15 minutes, or sent by ACH within one business day. The balance of the invoice is released as your customer pays.",
      },
      {
        q: "Do I need good credit to factor my trucking invoices?",
        a: "No. Factoring is approved on the creditworthiness of your customers — the brokers and shippers who owe you money — not your personal credit score. New authorities and carriers with past credit challenges are routinely approved.",
      },
      {
        q: "Can QP verify brokers' credit before I accept a load?",
        a: "Yes. QP clients get unlimited credit checks on brokers and shippers. We tell you the credit limit and payment history before you commit your truck, so you never haul a load you cannot get funded.",
      },
      {
        q: "What is the QP Card and how does it work?",
        a: "Every QP Trucking Solutions client receives a personal QP Card — a Mastercard accepted anywhere, with access to the nation's largest fuel discount network. You can transfer funds to your bank, push money to sub-cards so drivers can buy fuel, and use bill pay from the same account.",
      },
      {
        q: "Do I have to factor every invoice?",
        a: "No. QP has no minimums and no long-term contract. Factor one invoice or every invoice you write — you stay in control, and you can stop at any time without penalty.",
      },
    ],
    related: ["pure-non-recourse", "insurance", "new-authority", "drug-alcohol-consortium"],
    keywords: [
      "trucking factoring",
      "transportation factoring",
      "freight bill factoring",
      "invoice factoring for trucking companies",
      "non-recourse factoring",
      "owner operator factoring",
    ],
    metaTitle: "Transportation Factoring for Trucking | QP Trucking",
    metaDescription:
      "Non-recourse, recourse and Pure Non-Recourse™ factoring for trucking companies. Get paid in minutes with no hidden fees or long-term contract.",
  },
  {
    slug: "pure-non-recourse",
    name: "Pure Non-Recourse™ Debt Factoring",
    short: "Pure Non-Recourse™",
    category: "Factoring",
    eyebrow: "Factoring · Flagship program",
    tagline:
      "Grow your business without debt, address working capital needs and convert invoices into cash — with no chargeback risk, ever.",
    answer:
      "Pure Non-Recourse™ is QP's flagship factoring program. If you deliver a Pure load with no deductions or claims and submit legible Pure paperwork, you receive Pure Protection: the invoice is never charged back to you, even if your customer never pays or files bankruptcy months later.",
    heroVariant: "shield",
    heroImage: "/images/hero/pure-non-recourse.jpg",
    accent: "gold",
    price: {
      summary: "Flat, disclosed fee — standard non-recourse also available at a discounted rate",
      fine: "Invoices protected for the life of the receivable, not a 60- or 90-day window.",
    },
    checkoutUrl: "/get-started?service=pure-non-recourse",
    heroStats: [
      { label: "Chargeback risk", value: "Zero" },
      { label: "Protection", value: "Lifetime" },
      { label: "Contract", value: "None" },
    ],
    intro: [
      "Our Pure Non-Recourse™ debt factoring program is the ultimate protection for trucking companies against unpaid freight. Deliver a Pure load — a load with no deductions or advances — and submit Pure paperwork, meaning all copies are legible and acceptable to bill with, and you receive Pure Protection: you never have to worry about that load again.",
      "Most factoring companies offer non-recourse, which protects you against debtor bankruptcy. What they don't tell you is that bankruptcy doesn't happen overnight — it takes months or years. Most factoring companies only allow an invoice to age 60 or 90 days. If your customer does not declare bankruptcy inside that window, those companies will still come after you for the unpaid invoice through a chargeback or buyback.",
    ],
    sections: [
      {
        h: "What makes Pure Non-Recourse™ different",
        p: [
          "Traditional non-recourse agreements protect you only during a short aging window. QP's Pure Non-Recourse™ program removes the chargeback entirely for qualifying loads, which matters when a single unpaid $10,000–$15,000 invoice can wipe out a young carrier's cash reserves.",
          "QP Trucking Solutions does offer standard non-recourse at a discounted rate. While chargebacks are rare, they can be quite expensive when they occur. What suits you best depends on your tolerance for risk and the size of your cash reserves — we'll show you both options side by side and let you decide.",
        ],
      },
      {
        h: "Benefits of invoice factoring with QP",
        bullets: [
          "Get cash in less than 24 hours so day-to-day bills get paid on time",
          "Eliminate the overhead of processing and collecting invoices",
          "Unlimited capital that grows with your sales — without adding debt",
          "Poor personal credit is not disqualifying; only customer credit is reviewed",
          "Factor only the invoices you choose",
          "Pure Protection on qualifying loads — the ultimate peace of mind",
        ],
      },
      {
        h: "Get funded in minutes with QP Pay",
        p: [
          "Each QP Trucking Solutions client receives a personal QP Card loaded in minutes after load verification. Use it anywhere Mastercard is accepted, tap into the nation's largest fuel discount network, transfer funds to your bank account, push funds to sub-card accounts to pay drivers, set up bill pay, and cover company or personal expenses from one card.",
          "Prefer to send paperwork from the cab? Download the QP app and photograph your rate confirmation and proof of delivery. It makes the paperwork process simple, fast and efficient.",
        ],
      },
    ],
    benefits: [
      "No chargeback on qualifying Pure loads — even if the broker never pays",
      "Protection that does not expire after 60 or 90 days",
      "Get paid in minutes after verification with QP Pay",
      "Broker credit checks included, unlimited",
      "Flat fee structure with no hidden fees",
      "No long-term contract — leave whenever you want, seamlessly",
    ],
    process: [
      {
        title: "Haul a Pure load",
        body: "No deductions, no advances, no claims — book the load and deliver exactly as the rate confirmation states.",
      },
      {
        title: "Turn in Pure paperwork",
        body: "Legible rate confirmation, signed bill of lading and proof of delivery. Snap and send from the QP app.",
      },
      {
        title: "Keep the peace of mind",
        body: "Once verified, the invoice is funded and the protection is permanent. That load stops being your problem.",
      },
    ],
    faqs: [
      {
        q: "What does Pure Non-Recourse™ mean in plain English?",
        a: "It means that once you deliver a clean load and hand in clean paperwork, the invoice is never charged back to you. If the broker ignores the bill or goes bankrupt a year later, you still keep the money you were advanced.",
      },
      {
        q: "How is Pure Non-Recourse™ different from regular non-recourse factoring?",
        a: "Regular non-recourse only protects you from a customer bankruptcy declared inside a 60- or 90-day aging window. Pure Non-Recourse™ removes that window and the chargeback itself for qualifying loads, so the risk sits with QP, not with you.",
      },
      {
        q: "What counts as a Pure load and Pure paperwork?",
        a: "A Pure load has no deductions, advances or claims against the freight. Pure paperwork is a legible rate confirmation plus signed bill of lading and proof of delivery — everything needed to bill the broker without dispute.",
      },
      {
        q: "Does Pure Non-Recourse™ cost more than recourse factoring?",
        a: "Non-recourse programs carry a slightly higher flat fee because QP assumes the credit risk. Because there is no long-term contract and no minimums, many carriers blend both programs — Pure on weak brokers, recourse on strong ones.",
      },
      {
        q: "Can I combine factoring with insurance and permits at QP?",
        a: "Yes. Insurance, authority setup, permits, compliance filings, dispatch support and equipment finance are all under one roof, which is exactly why new authorities start here and stay.",
      },
    ],
    related: ["trucking-factoring", "insurance", "new-authority", "dot-binder"],
    keywords: [
      "pure non-recourse factoring",
      "non-recourse freight factoring",
      "no chargeback factoring",
      "debt free working capital trucking",
      "broker bankruptcy protection factoring",
    ],
    metaTitle: "Pure Non-Recourse™ Factoring | QP Trucking Solutions",
    metaDescription:
      "Pure Non-Recourse™ factoring with no chargeback risk and no 60/90-day window. Submit Pure paperwork, get paid in minutes. Flat fees, no contract.",
  },
  {
    slug: "insurance",
    name: "Trucking Insurance",
    short: "Trucking Insurance",
    category: "Insurance",
    eyebrow: "Insurance · Licensed agency",
    tagline:
      "Liability, cargo, bobtail and physical damage coverage built for owner-operators and fleets — bound quickly, priced right.",
    answer:
      "QP Trucking Insurance is a licensed trucking insurance agency serving owner-operators and fleets across 44 states. We bind primary liability, cargo, bobtail, physical damage and non-trucking coverage, usually within one business day of receiving your application, with new-authority filings handled alongside your FMCSA registration.",
    heroVariant: "shield",
    heroImage: "/images/hero/insurance.jpg",
    accent: "teal",
    price: {
      summary: "Quote-based — no fee to shop your policy with our licensed agents",
      fine: "One-stop shop: bundle coverage, authority setup, permits and factoring.",
    },
    checkoutUrl: "/get-started?service=insurance",
    heroStats: [
      { label: "Binding", value: "Fast" },
      { label: "Coverage types", value: "6+" },
      { label: "States", value: "44" },
    ],
    intro: [
      "At QP Trucking Insurance our mission is simple: provide comprehensive insurance solutions tailored to the unique needs of trucking companies. With extensive expertise and diverse coverage options, QP Trucking Insurance is your trusted partner for all your insurance needs.",
      "Whether you're a mature fleet or an owner-operator applying for new authority, we're here to help you succeed. An active insurance policy is required before your operating authority becomes active, so we coordinate insurance filings, BOC-3 and compliance paperwork together.",
    ],
    sections: [
      {
        h: "Why use QP Trucking Insurance?",
        bullets: [
          "Years of industry expertise mean we understand the risks you face",
          "A range of coverage options designed to protect your business, your assets and your peace of mind",
          "From primary liability and cargo to bobtail and physical damage, the coverage is here",
          "Ardent dedication to customer service — real people, not a phone tree",
          "One-stop shop with many other services for trucking companies",
          "Coverage for owner-operators with new authority and for established fleets",
        ],
      },
      {
        h: "Coverage we place for carriers",
        bullets: [
          "Primary auto liability (e.g. 750,000 / $1,000,000 limits required by most brokers)",
          "Motor truck cargo — including reefer breakdown and unattended-vehicle options",
          "Physical damage on tractors and trailers, plus non-owned trailer coverage",
          "Bobtail and non-trucking liability for owner-operators",
          "General liability, workers' compensation support and occupational accident",
          "Trailer interchange and shipper-required endorsements",
        ],
      },
      {
        h: "A partner in your success",
        p: [
          "We're more than an insurance provider — we're your partners in success. Our dedicated team is committed to helping you find the right coverage at the right price, and making it easy so you can focus on what you do best: running your business.",
          "Because we also handle authority setup, permitting, BOC-3 filings, load factoring, dispatch and equipment financing, everything a trucking company needs stays coordinated. No more juggling vendors while your trucks sit.",
        ],
      },
    ],
    benefits: [
      "Licensed agents who specialize in transportation only",
      "Certificates and filings issued the same day whenever possible",
      "Bundle insurance with factoring for preferred pricing",
      "Support with broker-required minimum limits and endorsements",
      "Annual coverage reviews to catch rate drops and coverage gaps",
      "Claims advocacy — we help you through the hard days",
    ],
    process: [
      {
        title: "Tell us about your operation",
        body: "Equipment, commodities, radius, drivers, loss runs and commodity restrictions. Fifteen minutes on the phone is usually enough to start shopping.",
      },
      {
        title: "Review options side by side",
        body: "You get clear quotes with limits, deductibles and payment plans explained — no jargon, no surprises at renewal.",
      },
      {
        title: "Bind and file",
        body: "We bind coverage, file with the FMCSA and issue your certificates to brokers, so your authority and your trucks stay legal.",
      },
    ],
    faqs: [
      {
        q: "How much does trucking insurance cost for a new authority?",
        a: "New-authority pricing depends on equipment value, commodities hauled, radius, driver records and required limits. Most new owner-operators need $1,000,000 primary liability plus cargo. Call 833-762-3464 for an itemized quote instead of a ballpark.",
      },
      {
        q: "Do I need insurance before my authority is active?",
        a: "Yes. The FMCSA requires an active insurance policy plus a BOC-3 filing before your operating authority becomes active. QP coordinates both so your MC number goes live without a second vendor in the loop.",
      },
      {
        q: "Can QP insure a carrier with a less-than-perfect driving record?",
        a: "Often, yes. We work with multiple carriers and can usually place risks that standard markets decline, including violations, accidents or lapses — though pricing reflects the record.",
      },
      {
        q: "Which states is QP trucking insurance available in?",
        a: "QP Trucking Insurance is licensed and available in 44 states across the United States. We write commercial liability, cargo, physical damage, and bobtail coverage in every state except Alaska (AK), California (CA), District of Columbia (DC), Hawaii (HI), Louisiana (LA), New York (NY), and Utah (UT).",
      },
      {
        q: "What is the difference between bobtail and non-trucking liability?",
        a: "Bobtail coverage protects your tractor when it is not pulling a trailer; non-trucking liability (sometimes called NTL) covers you while driving without a load under someone else's authority. Owner-operators leasing to a carrier usually need NTL.",
      },
      {
        q: "Does QP write cargo insurance for high-value freight?",
        a: "Yes. We place cargo limits for general freight, reefer, flatbed and specialty commodities, including higher limits some brokers require for electronics, produce or hazmat-adjacent loads.",
      },
      {
        q: "How do I get a trucking insurance quote from QP?",
        a: "Complete the quote form on this page or call 833-762-3464. Have your equipment details, radius of operation, driver list and any loss runs ready and we can shop markets the same day.",
      },
    ],
    related: ["trucking-factoring", "new-authority", "boc-3", "dot-binder"],
    keywords: [
      "trucking insurance",
      "semi truck insurance quotes",
      "new authority insurance",
      "cargo insurance for trucking companies",
      "bobtail insurance",
      "primary auto liability FMCSA",
    ],
    metaTitle: "Trucking Insurance for Owner-Operators & Fleets | QP Trucking Solutions",
    metaDescription:
      "Licensed trucking insurance agency for primary liability, cargo, bobtail and physical damage. Fast binding, FMCSA filings handled, and one-stop service with factoring and permits.",
  },

  /* ------------------------------------------------------------------ */
  /* AUTHORITY & COMPLIANCE                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "new-authority",
    name: "New Authority Set-Up",
    short: "New Authority",
    category: "Authority & Compliance",
    eyebrow: "Authority · Step 01",
    tagline:
      "Permits, licenses and fees handled end to end so your MC number goes active without paperwork slowing you down.",
    answer:
      "New Authority Set-Up is QP's $200 onboarding service ($100 for factoring clients with promo code) that handles the permits, licenses and filings required to operate under your own FMCSA authority — including the operating authority application, UCR, BOC-3, IRP plates and the compliance documents your first broker will ask for.",
    heroVariant: "sunrise",
    heroImage: "/images/hero/new-authority.jpg",
    accent: "gold",
    price: {
      summary: "$200 — or $100 for factoring clients with promo code",
      tiers: [
        { label: "New Authority Set-Up", price: "$200" },
        { label: "Factoring client rate", price: "$100", note: "With promo code" },
      ],
      fine: "Price covers our service; government filing fees are separate and disclosed up front.",
    },
    checkoutUrl: "/get-started?service=new-authority",
    heroStats: [
      { label: "Client rate", value: "$100" },
      { label: "Carriers set up", value: "1,000s" },
      { label: "Setup time", value: "24 hrs" },
    ],
    intro: [
      "Ready to hit the road with your new authority? At QP Trucking Solutions we've got your back. Our New Authority Set-Up service is your key to a hassle-free start — from permits to licenses and fees, we take care of it so you can focus on what you do best: driving success.",
      "Don't let paperwork slow you down. We guide you through LLC formation, your EIN, the FMCSA operating authority application, insurance filing and the ancillary registrations brokers demand before they will hand you a load.",
    ],
    sections: [
      {
        h: "What we offer",
        bullets: [
          "Comprehensive assistance with the permits, licenses and fees your authority requires",
          "Personalized support navigating the setup process step by step",
          "Expert guidance to ensure compliance and efficiency from day one",
          "Coordination with insurance, BOC-3 and UCR so your MC number activates without gaps",
          "Guidance on LLC formation and EIN registration before you file",
          "A single point of contact who knows your file",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "It saves you time and headache — and trips to the DMV",
          "We do the mathematical heavy lifting, freeing you for revenue-generating activities",
          "Documents are obtained accurately the first time",
          "You stay on task, organized and legally compliant",
          "We have helped thousands of carriers get up and running",
        ],
      },
      {
        h: "What is typically included in a new authority setup",
        p: [
          "A standard start-up sequence for a new interstate motor carrier includes forming your business entity, obtaining an EIN, registering for a USDOT number, applying for operating authority (MC number), filing a BOC-3 process agent designation, proving insurance, registering for the IRP for apportioned plates, filing Form 2290 heavy vehicle use tax, opening an IFTA account if you run interstate, and registering under the UCR.",
          "We sequence those steps correctly so nothing expires, duplicates or blocks your authority — the most common reason new carriers lose weeks.",
        ],
      },
    ],
    benefits: [
      "One team handles the entire start-up checklist",
      "Discounted $100 pricing for factoring clients",
      "Insurance, BOC-3, UCR, IRP and 2290 coordinated together",
      "Compliance binder prepared so you pass a DOT inspection or broker audit",
      "Guidance on rates, dispatching and direct shippers after you activate",
      "Thousands of carriers have launched with QP",
    ],
    process: [
      {
        title: "Confirm your entity",
        body: "LLC or corporation, EIN, business address and contact details — we verify everything is consistent before filing to avoid FMCSA rejections.",
      },
      {
        title: "File the authority",
        body: "We submit your USDOT and MC applications, coordinate your insurance filing and BOC-3, and monitor the FMCSA portal until your authority is active.",
      },
      {
        title: "Get compliant and rolling",
        body: "IRP plates, 2290, IFTA, UCR and your DOT binder are completed so you can book your first load with confidence.",
      },
    ],
    faqs: [
      {
        q: "How much does new trucking authority setup cost at QP?",
        a: "QP charges $200 for New Authority Set-Up, or $100 for factoring clients with a promo code. Government fees — such as the FMCSA $300 operating authority fee and state registration costs — are separate and always disclosed before we file.",
      },
      {
        q: "How long does it take to get an MC number?",
        a: "Once your USDOT number, insurance and BOC-3 are in place, FMCSA typically grants operating authority within 3–7 business days. QP monitors the filing daily and tells you the moment you can legally haul.",
      },
      {
        q: "Can you help me start a trucking company from scratch?",
        a: "Yes. We assist with LLC formation, EIN registration, USDOT and MC applications, insurance, BOC-3, IRP, IFTA, 2290, UCR and a compliance binder — the complete checklist under one roof.",
      },
      {
        q: "Do I need a BOC-3 before my authority is active?",
        a: "Yes. A BOC-3 designation of process agents is a mandatory FMCSA filing, and it must be on file along with proof of insurance before your operating authority becomes active.",
      },
      {
        q: "What insurance limits do brokers require for a new authority?",
        a: "Most brokers require at least $750,000–$1,000,000 primary auto liability plus $100,000 cargo. QP Trucking Insurance can quote and bind that coverage as part of your setup.",
      },
      {
        q: "Can I get factoring at the same time as my new authority?",
        a: "Yes — and it is the fastest path to cash flow. QP sets up factoring based on your customers' credit, so you get paid in about 15 minutes after your first verified load instead of waiting 30–45 days.",
      },
    ],
    related: ["boc-3", "form-2290", "irp", "insurance"],
    keywords: [
      "new trucking authority setup",
      "how to get an MC number",
      "start a trucking company",
      "FMCSA operating authority application",
      "USDOT number registration",
      "new authority trucking package",
    ],
    metaTitle: "New Trucking Authority Setup — $200 | QP Trucking",
    metaDescription:
      "New authority setup: FMCSA operating authority, USDOT, permits and filings handled for $200 ($100 for factoring clients). Launch faster with QP.",
  },
  {
    slug: "boc-3",
    name: "BOC-3 Filing Setup",
    short: "BOC-3 Filing",
    category: "Authority & Compliance",
    eyebrow: "Authority · Step 02",
    tagline:
      "Designation of process agents filed in every state you're authorized to operate — required before your authority activates.",
    answer:
      "A BOC-3 filing (Designation of Agents for Service of Process) is a federal FMCSA filing that assigns a process agent to accept legal documents on behalf of your trucking company in each state where you are authorized to operate. QP completes the filing for $60, or $40 for factoring clients with a promo code.",
    heroVariant: "paperwork",
    heroImage: "/images/hero/compliance.jpg",
    accent: "blue",
    price: {
      summary: "$60 — or $40 for factoring clients with promo code",
      tiers: [
        { label: "BOC-3 filing", price: "$60" },
        { label: "Factoring client rate", price: "$40", note: "With promo code" },
      ],
      fine: "Filed with a nationwide process agent network covering all 50 states.",
    },
    checkoutUrl: "/get-started?service=boc-3",
    heroStats: [
      { label: "Deadline", value: "20 days" },
      { label: "Coverage", value: "50 states" },
      { label: "Client rate", value: "$40" },
    ],
    intro: [
      "A BOC-3 filing (Designation of Agents for Service of Process) is a federal filing in the United States that assigns a process agent to accept legal documents on behalf of a transportation or logistics company in each state in which the company is authorized to do business. You have 20 days to complete this step.",
      "The FMCSA requires you to have a designated process agent in each state that can serve legal paperwork on your behalf — a BOC-3 shows that you do. You must also have an active insurance policy in place for your truck to drive and for your trucking authority to become active.",
    ],
    sections: [
      {
        h: "Why a BOC-3 matters",
        p: [
          "Without a BOC-3 on file with the FMCSA, your operating authority cannot become active, even if your insurance certificate has been filed. It is one of the smallest line items in a start-up and one of the most common reasons new carriers sit waiting.",
          "If you change your company name, address or phone number, you need to update your BOC-3 and insurance policy to avoid being placed on an inactive list — brokers check this before releasing loads.",
        ],
      },
      {
        h: "What's included with our filing service",
        bullets: [
          "Preparation and electronic submission of your BOC-3 designation",
          "A nationwide process agent network so every state is covered in one filing",
          "Confirmation once FMCSA acknowledges the filing",
          "Reminder and re-filing support if your company details change",
          "Coordination with insurance and authority paperwork happening at the same time",
          "Bundled pricing for factoring clients",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time and headache",
          "Accurate documents, obtained the first time",
          "Keeps you on task, organized and legally compliant",
          "Professional guidance defining each ancillary product",
          "We have helped thousands of carriers get up and running",
        ],
      },
    ],
    benefits: [
      "Filing completed in about one business day",
      "$40 pricing for QP factoring clients",
      "All 50 states covered through one process agent network",
      "Paired with insurance filing so your authority activates on schedule",
      "Update support when your name, address or phone number changes",
      "Handled by a team that files these every week",
    ],
    process: [
      {
        title: "Send your company details",
        body: "Legal name, USDOT number and mailing address exactly as they appear on your FMCSA record — we double-check before filing.",
      },
      {
        title: "We file with the FMCSA",
        body: "Your BOC-3 is submitted electronically to the national process agent network and acknowledged by the agency.",
      },
      {
        title: "You go active",
        body: "With insurance and the BOC-3 in place, your authority activates and brokers can verify you in SAFER.",
      },
    ],
    faqs: [
      {
        q: "How much does a BOC-3 filing cost?",
        a: "QP charges $60 for a standard BOC-3 filing, or $40 for factoring clients using our promo code. The price includes submission and confirmation — no separate process agent invoice each month.",
      },
      {
        q: "Do I really need a BOC-3 to get my authority?",
        a: "Yes. The FMCSA will not activate your operating authority until a BOC-3 designation is on file along with proof of insurance. It is a mandatory federal requirement for motor carriers and freight forwarders.",
      },
      {
        q: "How long does a BOC-3 filing take?",
        a: "Most filings are submitted within one business day and acknowledged by the FMCSA shortly after. Carriers have 20 days to complete the step, so there is no reason to delay your authority.",
      },
      {
        q: "What happens if my company name or address changes?",
        a: "Your BOC-3 and insurance must match your current information. If your name, address or phone number changes, both filings should be updated so you are not listed as inactive — QP handles the update for you.",
      },
      {
        q: "Is a BOC-3 the same as a process agent?",
        a: "The BOC-3 is the form; the process agent is the person or company it designates in each state to accept service of legal documents on your behalf when you are not physically there.",
      },
    ],
    related: ["new-authority", "ucr", "mcs-150", "insurance"],
    keywords: [
      "BOC-3 filing",
      "designation of process agents",
      "BOC-3 cost",
      "FMCSA BOC-3 filing service",
      "process agent trucking",
    ],
    metaTitle: "BOC-3 Filing Service — $60 | QP Trucking Solutions",
    metaDescription:
      "Fast BOC-3 filing with process agents in all 50 states for $60, or $40 for factoring clients. Required before your authority activates.",
  },
  {
    slug: "form-2290",
    name: "Form 2290 — Heavy Highway Vehicle Use Tax",
    short: "Form 2290",
    category: "Authority & Compliance",
    eyebrow: "Authority · Tax filing",
    tagline:
      "Annual HVUT returns prepared and e-filed with your stamped Schedule 1 back in hand — quickly and accurately.",
    answer:
      "Form 2290 is the annual Heavy Highway Vehicle Use Tax (HVUT) return required for vehicles with a taxable gross weight of 55,000 lbs or more. QP prepares and e-files your 2290 for $60 — $40 for factoring clients with a promo code — and returns your stamped Schedule 1, which you need before registering under IRP.",
    heroVariant: "fuel",
    heroImage: "/images/hero/fuel-tax.jpg",
    accent: "gold",
    price: {
      summary: "$60 — or $40 for factoring clients with promo code",
      tiers: [
        { label: "Form 2290 e-filing", price: "$60" },
        { label: "Factoring client rate", price: "$40", note: "With promo code" },
      ],
      fine: "IRS HVUT tax itself is calculated separately based on taxable gross weight and is always disclosed first.",
    },
    checkoutUrl: "/get-started?service=form-2290",
    heroStats: [
      { label: "Threshold", value: "55,000 lbs" },
      { label: "Filing window", value: "Aug 1–Oct" },
      { label: "Client rate", value: "$40" },
    ],
    intro: [
      "Anyone who has registered, or is required to register, a heavy highway motor vehicle with a taxable gross weight of 55,000 pounds or more in their name — and who first uses it on public highways during the reporting period — must file Form 2290, the Heavy Highway Vehicle Use Tax Return.",
      "You must pay your HVUT before setting up your IRP. The Heavy Vehicle Use Tax is an annual tax assessed on all heavy vehicles operating on public highways, and the stamped Schedule 1 that comes back from the IRS is the document state DMVs want to see.",
    ],
    sections: [
      {
        h: "Who must file Form 2290",
        bullets: [
          "Motor carriers with vehicles at a taxable gross weight of 55,000 lbs or more",
          "Owner-operators registering tractors under their own authority",
          "Fleets adding vehicles mid-year (these are filed with a partial-year tax calculation)",
          "Carriers who suspended a vehicle and need to file a suspension for low annual mileage",
          "Anyone who needs the stamped Schedule 1 to complete IRP registration or renew plates",
        ],
      },
      {
        h: "What you get when QP files your 2290",
        bullets: [
          "Accurate tax computation by taxable gross weight, with first-used-month adjustments",
          "Electronic filing with the IRS for the fastest possible Schedule 1 turnaround",
          "Your stamped Schedule 1 delivered electronically so you can register immediately",
          "Guidance if you are filing multiple vehicles across several states",
          "Reminders before the next filing deadline so nothing lapses",
          "$40 rate for QP factoring clients",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "We do the mathematical heavy lifting for you, freeing you for revenue-generating activities",
          "Keeps you on task, organized and legally compliant",
          "Accurately obtaining the needed documents the first time",
          "Professional guidance defining each ancillary product",
          "Thousands of carriers have already registered through QP",
        ],
      },
    ],
    benefits: [
      "Filing handled by a team that does this daily",
      "Same-week stamped Schedule 1 in most cases",
      "Partial-year and suspension filings supported",
      "Bundled with IRP registration for a one-stop renewal",
      "Deadline reminders so plates never expire",
      "Discounted pricing for factoring clients",
    ],
    process: [
      {
        title: "Send your vehicle list",
        body: "VIN, taxable gross weight, first used month and your EIN. We confirm the class before filing so your Schedule 1 is accepted.",
      },
      {
        title: "We e-file with the IRS",
        body: "Your 2290 is submitted electronically and the IRS acknowledges receipt, usually within minutes.",
      },
      {
        title: "Register your plates",
        body: "Your stamped Schedule 1 comes back to you, ready for IRP apportioned registration or state plate renewal.",
      },
    ],
    faqs: [
      {
        q: "What is Form 2290 and who has to file it?",
        a: "Form 2290 is the IRS Heavy Highway Vehicle Use Tax return. It must be filed for vehicles with a taxable gross weight of 55,000 lbs or more that are used on public highways — including commercial tractor-trailers, dumps, mixers and buses.",
      },
      {
        q: "When is the Form 2290 deadline?",
        a: "The tax year runs July 1 to June 30, and returns are due by the last day of the month following the month the vehicle was first used. Most carriers file between August and October, and vehicles first used later in the year are filed on a partial-year basis.",
      },
      {
        q: "How much does the Heavy Vehicle Use Tax cost?",
        a: "The IRS tax is annual and based on taxable gross weight, starting at 55,000 lbs and capping at 75,000 lbs and above. QP discloses the exact tax plus our $60 filing fee ($40 for factoring clients) before submitting anything.",
      },
      {
        q: "Do I need my 2290 before I can register with IRP?",
        a: "Yes. States require a stamped Schedule 1 proving you paid HVUT before they will issue apportioned plates under the IRP. That is why we recommend filing the 2290 first, then completing IRP.",
      },
      {
        q: "Can you file Form 2290 for a suspended vehicle?",
        a: "Yes. Vehicles used 5,000 miles or less per year (7,500 for agricultural vehicles) may qualify for a suspension, and we prepare that filing with the correct supporting information.",
      },
    ],
    related: ["irp", "ifta", "new-authority", "ucr"],
    keywords: [
      "form 2290 filing",
      "heavy highway vehicle use tax",
      "HVUT filing service",
      "stamped schedule 1",
      "2290 e-file cost",
      "IRP registration 2290",
    ],
    metaTitle: "Form 2290 (HVUT) Filing — $60 | QP Trucking Solutions",
    metaDescription:
      "E-file Form 2290 Heavy Highway Vehicle Use Tax for $60 ($40 for factoring clients). Get your stamped Schedule 1 fast and plate your trucks.",
  },
  {
    slug: "irp",
    name: "IRP Truck Registration",
    short: "IRP Registration",
    category: "Authority & Compliance",
    eyebrow: "Authority · Multi-state",
    tagline:
      "Apportioned plates and cab cards for fleets running in more than one jurisdiction — registered correctly the first time.",
    answer:
      "The International Registration Plan (IRP) lets a commercial vehicle operate interstate under a single registration plate and cab card issued by your base state. QP handles IRP truck registration for $195, registering your fleet across every jurisdiction you operate in and reporting your mileage correctly.",
    heroVariant: "plate",
    heroImage: "/images/hero/irp.jpg",
    accent: "blue",
    price: {
      summary: "$195 service — state apportioned registration fees billed separately at cost",
      tiers: [{ label: "IRP registration service", price: "$195" }],
      fine: "State fees vary by jurisdiction and mileage; we itemize them before you pay.",
    },
    checkoutUrl: "/get-started?service=irp",
    heroStats: [
      { label: "Plate type", value: "Apportioned" },
      { label: "Jurisdictions", value: "All 48" },
      { label: "Renewal", value: "Annual" },
    ],
    intro: [
      "IRP, the International Registration Plan, is an option for registering commercial vehicles that allows interstate operation under a single registration plate and registration certificate (cab card) issued by your base state.",
      "If you operate your trucking company within multiple jurisdictions, you must report all miles driven and pay taxes on them annually. For your IRP, you must register all fleets of vehicles that operate in more than one jurisdiction.",
    ],
    sections: [
      {
        h: "How IRP registration works",
        p: [
          "You choose a base jurisdiction — usually where your business is established and records are kept — and that state issues plates and a cab card listing every jurisdiction you are registered to operate in. Registration fees are apportioned among those jurisdictions based on the percentage of miles you run in each.",
          "Because fees follow your mileage, the fleet's historical mileage report matters more than anything else. QP builds that report with you, applies it correctly, and registers every power unit so nothing travels unplated.",
        ],
      },
      {
        h: "What QP handles for you",
        bullets: [
          "Base jurisdiction selection and account establishment",
          "Mileage reporting by jurisdiction, prepared from your records",
          "New IRP registration, added vehicles and apportioned plate issuance",
          "Annual renewal with updated mileage and weight schedules",
          "Cab cards issued for each vehicle so drivers carry proof in the truck",
          "Coordination with Form 2290 so state registration is not blocked",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time, fuel and trips to the DMV",
          "We do the heavy lifting on mileage math, freeing you for revenue-generating activities",
          "Accurate registrations obtained the first time",
          "Keeps you on task, organized and legally compliant",
          "We have helped thousands of carriers get properly plated",
        ],
      },
    ],
    benefits: [
      "One plate and one cab card across every jurisdiction",
      "Mileage reporting prepared with your records, not guesswork",
      "2290 coordination so registration never stalls",
      "Add-vehicle registrations handled mid-year",
      "Renewal management before plates expire",
      "Straight answers on weights, classes and base-state rules",
    ],
    process: [
      {
        title: "Choose your base state",
        body: "We confirm where your business is established and where records are kept, which determines your base jurisdiction for IRP.",
      },
      {
        title: "Report and apportion mileage",
        body: "You provide last year's miles by state (or ELD/IFTA data) and we calculate the apportioned fees for each jurisdiction.",
      },
      {
        title: "Receive plates and cab cards",
        body: "Your base state issues apportioned plates and a cab card per vehicle, and we store the credentials for renewals.",
      },
    ],
    faqs: [
      {
        q: "What is IRP registration and who needs it?",
        a: "The International Registration Plan allows one registration plate and cab card to cover interstate operation in multiple jurisdictions. Any commercial vehicle that travels in more than one jurisdiction and exceeds the weight thresholds needs IRP apportioned plates.",
      },
      {
        q: "How much does IRP registration cost?",
        a: "QP charges a $195 service fee. State apportioned registration fees are additional and depend on your fleet's weight and mileage split — we itemize the full amount before you pay anything.",
      },
      {
        q: "What is the difference between IRP and IFTA?",
        a: "IRP registers your vehicles and divides registration fees among jurisdictions based on miles. IFTA reports and pays fuel tax by jurisdiction based on miles per gallon. Most interstate carriers need both.",
      },
      {
        q: "Do I need to file Form 2290 before registering under IRP?",
        a: "Yes. States require proof of HVUT payment — your stamped Schedule 1 — before issuing apportioned plates. QP files your 2290 first so the registration is not delayed.",
      },
      {
        q: "When do IRP registrations expire?",
        a: "IRP registrations run on a 12-month cycle tied to your base jurisdiction's renewal schedule. We track your expiration and prepare the renewal with updated mileage and weights.",
      },
    ],
    related: ["form-2290", "ifta", "ucr", "new-authority"],
    keywords: [
      "IRP registration",
      "apportioned plates trucking",
      "international registration plan",
      "IRP cab card",
      "multi state truck registration",
      "IRP renewal service",
    ],
    metaTitle: "IRP Truck Registration & Plates — $195 | QP Trucking",
    metaDescription:
      "IRP apportioned registration for interstate fleets: base jurisdiction setup, plates and cab cards. $195 service fee, state fees itemized up front.",
  },
  {
    slug: "ifta",
    name: "IFTA Account Setup & Filings",
    short: "IFTA",
    category: "Authority & Compliance",
    eyebrow: "Authority · Fuel tax",
    tagline:
      "New IFTA accounts, quarterly filings and annual renewals — prepared by people who do this every quarter.",
    answer:
      "IFTA (the International Fuel Tax Agreement) is a fuel tax agreement among states and Canadian provinces that simplifies reporting fuel used by interstate motor carriers. QP sets up your IFTA account for $150 ($100 with promo code), files quarterly returns for $60 ($40 promo) and handles annual renewals for $100 ($70 promo).",
    heroVariant: "fuel",
    heroImage: "/images/hero/fuel-tax.jpg",
    accent: "gold",
    price: {
      summary: "Registration $150 / Quarterly $60 / Annual renewal $100",
      tiers: [
        { label: "IFTA registration", price: "$150", note: "$100 with promo code" },
        { label: "Quarterly filing", price: "$60", note: "$40 with promo code" },
        { label: "Annual renewal", price: "$100", note: "$70 with promo code" },
      ],
      fine: "Fuel tax due is paid to the base jurisdiction and separate from our preparation fee.",
    },
    checkoutUrl: "/get-started?service=ifta",
    heroStats: [
      { label: "Filing cycle", value: "Quarterly" },
      { label: "Renewal", value: "Annual" },
      { label: "Quarterly fee", value: "$60" },
    ],
    intro: [
      "The International Fuel Tax Agreement (IFTA) is a fuel consumption tax agreement among states and Canadian provinces to simplify the reporting of fuel used by interstate or inter-jurisdictional motor carriers. IFTA must be filed quarterly and has an annual renewal.",
      "We help get your account set up, can help file it quarterly, and can handle your annual renewal — including the mileage and fuel purchase records the base jurisdiction requires.",
    ],
    sections: [
      {
        h: "What IFTA registration gives you",
        p: [
          "One IFTA license and one set of decals covers your fleet across all member jurisdictions instead of separate fuel tax accounts in each state. You report miles traveled and gallons purchased per jurisdiction each quarter, and IFTA nets it into a single payment or credit.",
          "Carriers whose trucks cross state lines are almost always better off under IFTA than under separate state registrations — but only if the quarterly filing is accurate and on time, because late filings trigger penalties and a suspended license.",
        ],
      },
      {
        h: "Our IFTA services",
        bullets: [
          "New IFTA account registration and license/decals for each qualified vehicle",
          "Quarterly mileage and fuel tax return preparation and electronic filing",
          "Annual IFTA renewal to keep your license active without lapses",
          "Reconciliation of fuel card and ELD data so reported gallons match purchases",
          "Filing-deadline management so penalties never happen",
          "Assistance responding to jurisdiction audit requests",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "We do the mathematical heavy lifting for you, freeing you for revenue-generating activities",
          "Saves you time and headache every quarter",
          "Accurate filings that reduce audit exposure",
          "Keeps you on task, organized and legally compliant",
          "Thousands of carriers have already filed through QP",
        ],
      },
    ],
    benefits: [
      "One license and decal set for all member jurisdictions",
      "Quarterly filings prepared from your fuel card and ELD data",
      "Deadline tracking for April 30, July 31, October 31 and January 31",
      "Annual renewal handled before your license expires",
      "Discounted pricing for factoring clients",
      "Real people who answer the phone when a jurisdiction asks questions",
    ],
    process: [
      {
        title: "Register your account",
        body: "We file your IFTA application with your base jurisdiction and obtain your license and decals for each vehicle.",
      },
      {
        title: "Send your quarterly data",
        body: "Gallons purchased by jurisdiction plus miles by jurisdiction from your ELD or manual trip reports — we handle the math.",
      },
      {
        title: "We file, you drive",
        body: "Returns are filed electronically before the deadline with a clear summary of what you owe or what you are credited.",
      },
    ],
    faqs: [
      {
        q: "What is IFTA and who needs an IFTA account?",
        a: "IFTA is the International Fuel Tax Agreement — a system that lets one base jurisdiction collect and distribute fuel tax for all member states and provinces. Carriers operating qualified vehicles in more than one jurisdiction need an IFTA license and quarterly filings.",
      },
      {
        q: "How much does IFTA registration cost?",
        a: "QP charges $150 for new IFTA registration ($100 with promo code), $60 per quarterly filing ($40 with promo code) and $100 for the annual renewal ($70 with promo code). Factoring clients receive the discounted rates.",
      },
      {
        q: "When are IFTA quarterly filings due?",
        a: "IFTA returns are due the last day of the month following the end of each quarter: April 30, July 31, October 31 and January 31. Late filing can lead to penalties, interest and a suspended IFTA license.",
      },
      {
        q: "Do I still need IFTA if I only run in one state?",
        a: "No. If your vehicles never leave your home state, you generally do not need IFTA — but if your trucks cross a state or provincial line while operating, you must register and file.",
      },
      {
        q: "What records do I need for an IFTA quarterly filing?",
        a: "Total miles by jurisdiction, total gallons of fuel purchased by jurisdiction and your fleet's fuel efficiency. Fuel card statements, ELD reports and trip sheets are the usual source documents — we reconcile them for you.",
      },
    ],
    related: ["irp", "form-2290", "ucr", "trucking-factoring"],
    keywords: [
      "IFTA registration",
      "IFTA quarterly filing service",
      "IFTA renewal",
      "international fuel tax agreement trucking",
      "fuel tax reporting carrier",
    ],
    metaTitle: "IFTA Registration & Quarterly Filing | QP Trucking",
    metaDescription:
      "IFTA account setup ($150), quarterly filings ($60) and annual renewals ($100). Accurate fuel tax reporting with deadline management.",
  },
  {
    slug: "ucr",
    name: "Unified Carrier Registration (UCR)",
    short: "UCR",
    category: "Authority & Compliance",
    eyebrow: "Authority · Annual permit",
    tagline:
      "Annual UCR registration completed on time with fees calculated from your actual fleet size — never guessed.",
    answer:
      "Unified Carrier Registration (UCR) is an annual federal registration that verifies motor carriers have active insurance and authority in the states where they operate. Fees are based on fleet size and it renews every year. QP files your UCR for $60 — $40 for factoring clients with a promo code.",
    heroVariant: "paperwork",
    heroImage: "/images/hero/compliance.jpg",
    accent: "blue",
    price: {
      summary: "$60 — or $40 for factoring clients with promo code",
      tiers: [
        { label: "UCR registration", price: "$60" },
        { label: "Factoring client rate", price: "$40", note: "With promo code" },
      ],
      fine: "State UCR fees are set by fleet size and are itemized before filing.",
    },
    checkoutUrl: "/get-started?service=ucr",
    heroStats: [
      { label: "Renewal", value: "Annual" },
      { label: "Basis", value: "Fleet size" },
      { label: "Client rate", value: "$40" },
    ],
    intro: [
      "A UCR permit verifies that you have active insurance in the states where you operate. The Unified Carrier Registration program requires trucking companies to register their vehicles within their operating state and pay an annual fee based on fleet size.",
      "This registration must be renewed every year, and you'll use your MC number and USDOT number to apply. Enforcement is real: states issue citations at weigh stations and roadside inspections when UCR is missing or expired.",
    ],
    sections: [
      {
        h: "Who needs UCR registration",
        bullets: [
          "Interstate motor carriers operating in any of the 41 participating states",
          "Freight forwarders and brokers that arrange interstate freight",
          "Motor private carriers operating commercial vehicles in interstate commerce",
          "Leasing companies that provide equipment to regulated carriers",
          "Any carrier whose insurance requirement is verified through UCR compliance",
        ],
      },
      {
        h: "How QP completes your UCR",
        bullets: [
          "Confirm your fleet size bracket so you are not overpaying",
          "Apply through the state system with your MC and USDOT numbers",
          "Pay the state fee immediately so your registration is active",
          "Return your UCR certificate for your compliance binder and broker files",
          "Renew on time the following year — we track the cycle for you",
          "$40 pricing for factoring clients",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time and roadside headaches",
          "We handle the fee math based on fleet size",
          "Accurate registration obtained the first time",
          "Keeps you on task, organized and legally compliant",
          "Thousands of carriers have registered through QP",
        ],
      },
    ],
    benefits: [
      "Registered under the correct fleet-size bracket",
      "Certificate delivered for your binder and broker packets",
      "Renewal reminders so you never operate unregistered",
      "Fleet changes (adds and drops) reflected at renewal",
      "Bundled with authority and compliance services",
      "$40 pricing for factoring clients",
    ],
    process: [
      {
        title: "Confirm fleet size",
        body: "Count power units in your fleet as of the registration period — brackets determine the state fee, and mistakes cost money.",
      },
      {
        title: "We register and pay",
        body: "Your UCR application is submitted with the correct MC and USDOT numbers and the state fee paid immediately.",
      },
      {
        title: "Store the certificate",
        body: "Your UCR proof goes into your DOT binder and broker packet, and we remind you before next year's deadline.",
      },
    ],
    faqs: [
      {
        q: "What is UCR and do I need it?",
        a: "The Unified Carrier Registration program is a federally mandated, state-administered registration for interstate carriers, brokers, freight forwarders and leasing companies. If you operate interstate commercial vehicles, you need UCR every year.",
      },
      {
        q: "How much does UCR cost?",
        a: "UCR fees are set by fleet-size bracket, ranging from the smallest carriers to fleets of 1,001 vehicles or more. QP charges a $60 service fee ($40 for factoring clients) and itemizes the state fee before filing.",
      },
      {
        q: "When does UCR registration open and expire?",
        a: "UCR registration is annual and opens each fall for the following calendar year, with enforcement beginning January 1. Registering early keeps you compliant from day one of the new year.",
      },
      {
        q: "What happens if I operate without UCR?",
        a: "States can issue citations and fines at roadside inspections and weigh stations, and some brokers will not release loads to carriers without proof of current UCR registration.",
      },
      {
        q: "Do UCR and IRP have to match?",
        a: "Your UCR fleet size, IRP registrations and insurance filings should all be consistent with the number of power units you actually operate, because states cross-reference them.",
      },
    ],
    related: ["mcs-150", "irp", "boc-3", "new-authority"],
    keywords: [
      "UCR registration",
      "unified carrier registration cost",
      "UCR renewal trucking",
      "UCR fleet size fee",
      "annual UCR filing service",
    ],
    metaTitle: "UCR Filing for Carriers — $60 | QP Trucking Solutions",
    metaDescription:
      "UCR registration and renewal for carriers, brokers and forwarders. Correct fleet-size bracket, state fee paid, certificate delivered. $60 ($40 clients).",
  },
  {
    slug: "mcs-150",
    name: "MCS-150 Motor Carrier Identification Report",
    short: "MCS-150",
    category: "Authority & Compliance",
    eyebrow: "Authority · FMCSA update",
    tagline:
      "Keep your USDOT record current — biennial updates, mileage changes and fleet size corrections filed right.",
    answer:
      "The MCS-150 (Motor Carrier Identification Report) is the FMCSA form used to obtain and update your USDOT number. It records your company details, carrier type, commodities hauled, annual mileage, drivers and power units. QP files new and updated MCS-150 reports for $60, or $40 for factoring clients with a promo code.",
    heroVariant: "paperwork",
    heroImage: "/images/hero/compliance.jpg",
    accent: "blue",
    price: {
      summary: "$60 — or $40 for factoring clients with promo code",
      tiers: [
        { label: "MCS-150 filing or update", price: "$60" },
        { label: "Factoring client rate", price: "$40", note: "With promo code" },
      ],
      fine: "Biennial updates and out-of-cycle changes both covered.",
    },
    checkoutUrl: "/get-started?service=mcs-150",
    heroStats: [
      { label: "Update cycle", value: "Biennial" },
      { label: "Affects", value: "Safety score" },
      { label: "Client rate", value: "$40" },
    ],
    intro: [
      "The MCS-150, or Motor Carrier Identification Report, is the form filed to obtain and update your USDOT number. It contains the company information the FMCSA uses throughout the lifetime of your business.",
      "That includes contact information, whether you are an intrastate or interstate carrier, what type of goods you haul, your annual mileage, and the number of drivers and power units you operate. Because SAFER and CSA data are driven from this record, stale information can distort your safety profile and cost you loads.",
    ],
    sections: [
      {
        h: "When you must file an MCS-150 update",
        bullets: [
          "Every 24 months as part of the FMCSA biennial update requirement",
          "When you add or remove trucks or drivers",
          "When your company name, address or telephone number changes",
          "When the type of freight you haul changes (dry van to reefer, hazmat, etc.)",
          "When you change from intrastate to interstate operation",
          "When mileage estimates shift enough to change your classification",
        ],
      },
      {
        h: "What QP does for you",
        bullets: [
          "Completes the MCS-150 with accurate carrier classifications and commodity codes",
          "Files update cycles on time so your USDOT stays in active status",
          "Corrects outdated mileage, driver and power unit counts",
          "Explains how each change affects your safety rating and inspections",
          "Stores a copy for your compliance binder and broker packets",
          "$40 rate for factoring clients",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time and avoids deactivation risk",
          "We handle the filing details and follow-up with the FMCSA",
          "Accurate records the first time",
          "Keeps you on task, organized and legally compliant",
          "Thousands of carriers are already up to date through QP",
        ],
      },
    ],
    benefits: [
      "Biennial update tracking so your USDOT never goes inactive",
      "Accurate mileage, commodity and fleet data on record",
      "Faster insurance quotes and broker approvals thanks to clean records",
      "Support correcting FMCSA record errors",
      "Bundled with authority, UCR and insurance services",
      "Discounted pricing for factoring clients",
    ],
    process: [
      {
        title: "Review your current record",
        body: "We pull your SAFER snapshot and compare it to reality — mileage, power units, commodity classes and contact details.",
      },
      {
        title: "File the update",
        body: "Your MCS-150 is submitted with corrected data and confirmed by the FMCSA, typically within a few business days.",
      },
      {
        title: "Stay current",
        body: "We log your next biennial due date and remind you before the FMCSA does — the difference between an active and inactive USDOT.",
      },
    ],
    faqs: [
      {
        q: "What is the MCS-150 form used for?",
        a: "The MCS-150 is the Motor Carrier Identification Report used to register for a USDOT number and to update the FMCSA on changes to your business — including name, address, mileage, commodities, drivers and power units.",
      },
      {
        q: "How often do I have to update my MCS-150?",
        a: "The FMCSA requires motor carriers to update their MCS-150 every 24 months, and any time company information changes. Missing the biennial update can suspend your USDOT number and your ability to operate legally.",
      },
      {
        q: "How much does it cost to file an MCS-150 with QP?",
        a: "QP charges $60 to file or update your MCS-150, or $40 for factoring clients with a promo code. There is no government fee for the filing itself — the FMCSA does not charge for MCS-150 updates.",
      },
      {
        q: "Will updating my mileage change my safety score?",
        a: "Yes — CSA and ISS scores use rate-based calculations for crashes and inspections. If your mileage on file is too low, rates appear worse. Updating mileage accurately can improve your visible safety profile with brokers.",
      },
      {
        q: "Does my USDOT number expire?",
        a: "USDOT numbers do not technically expire, but they can be deactivated if you miss the biennial update or fail to keep insurance filings current. Deactivation means you cannot legally operate until the record is fixed.",
      },
    ],
    related: ["ucr", "new-authority", "boc-3", "insurance"],
    keywords: [
      "MCS-150 filing",
      "motor carrier identification report",
      "biennial update FMCSA",
      "update USDOT number",
      "MCS-150 filing service cost",
    ],
    metaTitle: "MCS-150 Filing & USDOT Updates — $60 | QP Trucking",
    metaDescription:
      "MCS-150 filing and biennial updates for motor carriers. Keep your USDOT active and your mileage and power units correct. $60 ($40 for clients).",
  },
  {
    slug: "scac",
    name: "SCAC Code Setup",
    short: "SCAC Code",
    category: "Authority & Compliance",
    eyebrow: "Authority · Intermodal access",
    tagline:
      "Your Standard Carrier Alpha Code — the key that unlocks intermodal, government and direct-shipper freight.",
    answer:
      "A SCAC (Standard Carrier Alpha Code) is a unique two-to-four-letter code issued by the National Motor Freight Traffic Association that identifies your trucking company on intermodal and government freight. QP obtains your SCAC code for $60, or $40 for factoring clients with a promo code.",
    heroVariant: "counter",
    heroImage: "/images/hero/compliance.jpg",
    accent: "gold",
    price: {
      summary: "$60 — or $40 for factoring clients with promo code",
      tiers: [
        { label: "SCAC code registration", price: "$60" },
        { label: "Factoring client rate", price: "$40", note: "With promo code" },
      ],
      fine: "Annual NMFTA code maintenance handled as part of the service.",
    },
    checkoutUrl: "/get-started?service=scac",
    heroStats: [
      { label: "Format", value: "2–4 letters" },
      { label: "Issuer", value: "NMFTA" },
      { label: "Client rate", value: "$40" },
    ],
    intro: [
      "The SCAC — Standard Carrier Alpha Code — is used for intermodal and government loads. We can help obtain the SCAC number for you, creating access to more lucrative freight.",
      "Rail ramps, drayage companies, government tenders and many large shippers will not set you up as a carrier without a SCAC. It is a small filing that opens a materially larger freight market, especially for carriers near intermodal hubs.",
    ],
    sections: [
      {
        h: "Why carriers get a SCAC code",
        bullets: [
          "Required by ports, rail ramps and intermodal drayage providers",
          "Needed for many government and defense freight tenders",
          "Frequently requested by large shippers and 3PL onboarding systems",
          "Used in EDI transactions (204/214/210) to identify your carrier",
          "Enables container tracking and terminal gate access in some systems",
          "Signals that your company is set up for professional freight",
        ],
      },
      {
        h: "What QP handles",
        bullets: [
          "Application and issuance of your SCAC through the NMFTA process",
          "Matching the code to your legal name and USDOT/MC records",
          "Guidance on how to give the code to brokers, ramps and shippers",
          "Coordination with UCR, IRP and authority filings",
          "Renewal/maintenance reminders so the code stays active",
          "$40 pricing for factoring clients",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time working out which code you actually need",
          "Accurate filings obtained the first time",
          "Keeps you on task, organized and legally compliant",
          "Opens intermodal and government freight lanes",
          "Thousands of carriers have expanded with QP",
        ],
      },
    ],
    benefits: [
      "Access to intermodal, drayage and government freight",
      "Code issued and matched to your legal company name",
      "Support with EDI and shipper onboarding requirements",
      "Bundle with factoring so new customers are credit-checked immediately",
      "Ongoing maintenance so the code never lapses",
      "$40 pricing for factoring clients",
    ],
    process: [
      {
        title: "Apply with your company details",
        body: "Legal name, address, USDOT/MC numbers and the operating profile we will submit on your behalf.",
      },
      {
        title: "NMFTA issues the code",
        body: "Your SCAC is issued and registered so terminals, ramps and shippers can identify your fleet in their systems.",
      },
      {
        title: "Start booking better freight",
        body: "Register the code with brokers, intermodal providers and government portals to unlock higher-value loads.",
      },
    ],
    faqs: [
      {
        q: "What is a SCAC code and do I need one?",
        a: "A Standard Carrier Alpha Code is a unique identifier issued to transportation companies by the NMFTA. You need one to haul intermodal, drayage or government freight, and many larger shippers require it during carrier onboarding.",
      },
      {
        q: "How much does it cost to get a SCAC code?",
        a: "QP charges $60 for SCAC setup, or $40 for factoring clients with a promo code, which includes the application and code registration maintenance.",
      },
      {
        q: "How long does it take to receive a SCAC code?",
        a: "SCAC codes are typically issued within a few business days once the application is submitted with accurate company and USDOT information.",
      },
      {
        q: "Can I choose my own SCAC letters?",
        a: "You can request a preferred combination, but the NMFTA assigns the final code based on availability and its naming rules, so requests are honored when possible rather than guaranteed.",
      },
      {
        q: "Does a SCAC code expire?",
        a: "Codes must be maintained and renewed through the NMFTA. If a code is not maintained it can be reassigned, which is why we track renewals for QP clients.",
      },
    ],
    related: ["ucr", "mcs-150", "trucking-factoring", "dot-binder"],
    keywords: [
      "SCAC code registration",
      "standard carrier alpha code",
      "get a SCAC number",
      "intermodal carrier setup",
      "government freight carrier code",
    ],
    metaTitle: "SCAC Code Setup for Carriers — $60 | QP Trucking",
    metaDescription:
      "Get your Standard Carrier Alpha Code (SCAC) fast for $60 ($40 for factoring clients). Unlock intermodal, drayage and large-shipper freight.",
  },
  {
    slug: "dot-binder",
    name: "DOT Compliance Binder Packets",
    short: "DOT Binder",
    category: "Authority & Compliance",
    eyebrow: "Authority · Inspection ready",
    tagline:
      "Every document a DOT officer, broker or auditor asks for — organized in one binder, PDF or printed.",
    answer:
      "A DOT compliance binder collects the documents that keep your trucking company legal — authority, insurance, registrations, driver qualification files, drug and alcohol program records and inspection reports — in one place. QP prepares a digital PDF for $99 or a printed physical copy for $139.",
    heroVariant: "binder",
    heroImage: "/images/hero/dot-binder.jpg",
    accent: "blue",
    price: {
      summary: "PDF $99 · Physical copy $139",
      tiers: [
        { label: "Digital PDF binder", price: "$99" },
        { label: "Printed physical binder", price: "$139" },
      ],
      fine: "Tabbed sections, cover page and a document checklist included.",
    },
    checkoutUrl: "/get-started?service=dot-binder",
    heroStats: [
      { label: "Format", value: "PDF / Print" },
      { label: "Sections", value: "Tabbed" },
      { label: "Audit", value: "Ready" },
    ],
    intro: [
      "We craft a physical copy or digital PDF binder for you with all your necessary documents that keep you legal and compliant. No need for scattered paperwork all around your rig — you can have it in one place.",
      "Whether it is paperwork for a broker packet, a DOT roadside inspection or a compliance review, an organized binder turns a stressful conversation into a two-minute handoff.",
    ],
    sections: [
      {
        h: "What goes in your compliance binder",
        bullets: [
          "Operating authority letter, USDOT and MC numbers",
          "Insurance certificates and filings (liability, cargo, physical damage)",
          "UCR certificate, IRP cab cards, IFTA license and decals",
          "Form 2290 stamped Schedule 1 and current registration copies",
          "BOC-3 confirmation and process agent details",
          "Driver qualification files, drug and alcohol program documents and inspection reports",
          "Company safety policy, accident procedures and required FMCSA placards/pamphlets",
        ],
      },
      {
        h: "PDF or printed — which should you choose?",
        p: [
          "The digital PDF is ideal for broker onboarding and for drivers who keep documents on a phone or tablet in the cab. It is also simple to keep current because we can update a single file.",
          "The printed binder is what inspectors and auditors like to hold. It lives in the truck or the office, tabbed and labeled so anyone on your team can find a document in seconds.",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time and headache during inspections and audits",
          "Accurate, complete documents the first time",
          "Keeps you on task, organized and legally compliant",
          "Professional guidance defining each ancillary product",
          "Thousands of carriers already keep a QP binder in the cab",
        ],
      },
    ],
    benefits: [
      "One organized source for authority, insurance and compliance records",
      "Tabbed sections built around what inspectors actually ask for",
      "Broker packet ready — send the same set to every customer",
      "Easy to update as registrations renew",
      "Available as PDF for the cab or printed for the office",
      "Prepared by a team that handles filings daily",
    ],
    process: [
      {
        title: "We collect what we already filed",
        body: "Authority, insurance, UCR, IRP, IFTA, 2290 and BOC-3 documents we hold on your behalf go straight into the binder.",
      },
      {
        title: "You send the driver-side documents",
        body: "Driver qualification files, drug and alcohol program paperwork and any inspection reports we do not already have.",
      },
      {
        title: "Binder delivered",
        body: "Choose a digital PDF or a printed, tabbed binder shipped to your address — ready for inspection season.",
      },
    ],
    faqs: [
      {
        q: "What is a DOT compliance binder and why do I need one?",
        a: "It is an organized set of the documents that prove your trucking company is legal and compliant — authority, insurance, registrations, driver files and safety records. Inspectors, auditors, brokers and insurers all ask for the same materials, and a binder lets you produce them instantly.",
      },
      {
        q: "How much does a QP DOT binder cost?",
        a: "A digital PDF binder is $99, and a printed physical binder is $139. Both include tabbed sections, a cover page and a document checklist.",
      },
      {
        q: "Is a binder required by the FMCSA?",
        a: "The FMCSA requires you to maintain and produce specific records — driver qualification files, drug and alcohol program documents, inspection and maintenance records. How you organize them is your choice; a tabbed binder is simply the easiest way to be ready.",
      },
      {
        q: "How often should I update my compliance binder?",
        a: "Update it whenever a document renews — insurance annually, UCR annually, IRP annually, IFTA annually, drug and alcohol program updates and new driver files. We can refresh a PDF version for you each cycle.",
      },
      {
        q: "Can you build a binder for a brand-new authority?",
        a: "Yes. New authority clients often order the binder the same week their MC number activates so they are inspection ready from day one.",
      },
    ],
    related: ["drug-alcohol-consortium", "new-authority", "boc-3", "insurance"],
    keywords: [
      "DOT compliance binder",
      "carrier packet binder trucking",
      "FMCSA documents binder",
      "driver qualification file setup",
      "new authority compliance packet",
    ],
    metaTitle: "DOT Compliance Binder — From $99 | QP Trucking",
    metaDescription:
      "Inspection-ready DOT compliance binder with authority, insurance, registration and driver documents in tabbed sections. PDF $99 or printed $139.",
  },
  {
    slug: "drug-alcohol-consortium",
    name: "Drug & Alcohol Consortium",
    short: "Drug & Alcohol",
    category: "Authority & Compliance",
    eyebrow: "Authority · FMCSA program",
    tagline:
      "Clearinghouse-compliant drug and alcohol program enrollment with testing, random pools and records handled.",
    answer:
      "The FMCSA requires motor carriers to run a compliant drug and alcohol testing program, including pre-employment, random, post-accident and return-to-duty testing plus Clearinghouse queries. QP enrolls your company in a consortium for $135 — $100 for factoring clients with a promo code.",
    heroVariant: "safety",
    heroImage: "/images/hero/drug-alcohol.jpg",
    accent: "gold",
    price: {
      summary: "$135 — or $100 for factoring clients with promo code",
      tiers: [
        { label: "Consortium enrollment", price: "$135" },
        { label: "Factoring client rate", price: "$100", note: "With promo code" },
      ],
      fine: "Testing fees at collection sites are billed per test by the consortium.",
    },
    checkoutUrl: "/get-started?service=drug-alcohol-consortium",
    heroStats: [
      { label: "Program", value: "FMCSA" },
      { label: "Random pool", value: "Managed" },
      { label: "Client rate", value: "$100" },
    ],
    intro: [
      "All truck drivers must be enrolled with a drug and alcohol testing program before they can get on the road. The FMCSA and USDOT require that drivers have a negative pre-employment drug screen before driving for a carrier — including owner-operators driving their own truck under their own authority.",
      "QP enrolls your company in a consortium so you have a documented program: pre-employment testing, a random selection pool, post-accident and reasonable-suspicion testing, return-to-duty and follow-up testing, plus the Clearinghouse queries and documentation auditors ask for.",
    ],
    sections: [
      {
        h: "What a compliant program includes",
        bullets: [
          "Pre-employment drug testing for every driver before they operate a CMV",
          "Random testing pool with verified selection percentages managed for you",
          "Post-accident testing protocols and reasonable-suspicion procedures",
          "Return-to-duty and follow-up testing administration following a violation",
          "Clearinghouse pre-employment and annual queries with documented results",
          "Written policy, supervisor training materials and audit-ready records",
        ],
      },
      {
        h: "Why enrollment matters",
        p: [
          "A single missing negative pre-employment test can fail an audit and pull a driver out of service. Because random selection percentages must be met across pooling groups, small carriers usually cannot administer the program themselves — they join a consortium to be pooled with other carriers.",
          "Owners who drive must also be in the pool. Being in business alone does not exempt you; it only means you are both the employer and the employee in the eyes of the FMCSA.",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "We help apply for and obtain the documents needed to run your authority",
          "Saves you time and audit anxiety",
          "Accurate enrollment and records the first time",
          "Keeps you on task, organized and legally compliant",
          "Professional guidance through each step of the program",
          "Thousands of carriers enrolled through QP",
        ],
      },
    ],
    benefits: [
      "Consortium enrollment with a nationwide collection site network",
      "Random pool selection managed so percentages are met",
      "Clearinghouse query support and documentation",
      "Written policy and audit-ready record keeping",
      "New-hire onboarding and testing scheduling help",
      "$100 pricing for factoring clients",
    ],
    process: [
      {
        title: "Enroll your company",
        body: "We register your DOT number in the consortium, set up your random pool and provide policy documents.",
      },
      {
        title: "Add every driver",
        body: "Each driver is enrolled with a pre-employment test ordered at a collection site near them — including you, if you drive.",
      },
      {
        title: "Stay compliant",
        body: "Random selections, Clearinghouse queries and record retention are managed through the program so an audit is never a scramble.",
      },
    ],
    faqs: [
      {
        q: "Do owner-operators need a drug and alcohol consortium?",
        a: "Yes. If you hold your own operating authority — even as a one-truck owner-operator — you must maintain a compliant drug and alcohol testing program and be enrolled in a random testing pool, which a consortium provides.",
      },
      {
        q: "How much does drug and alcohol consortium enrollment cost?",
        a: "QP charges $135 for consortium enrollment, or $100 for factoring clients with a promo code. Individual test collection fees are billed by the consortium when testing occurs.",
      },
      {
        q: "What is the FMCSA Drug and Alcohol Clearinghouse?",
        a: "The Clearinghouse is a federal database of drug and alcohol program violations. Employers must run a pre-employment query for each new driver and an annual limited query for every driver they employ, and must report violations.",
      },
      {
        q: "How often are random drug tests conducted?",
        a: "The FMCSA requires random testing at an annual rate that applies to your pool — currently 50% of drivers for controlled substances and 10% for alcohol. Consortium pooling makes those percentages achievable for small fleets.",
      },
      {
        q: "What happens if a driver tests positive?",
        a: "The driver is removed from safety-sensitive duties, the violation is reported to the Clearinghouse, and the driver must complete the return-to-duty process — including a substance abuse professional evaluation and follow-up testing — before driving again.",
      },
    ],
    related: ["dot-binder", "new-authority", "eld-dashcam", "insurance"],
    keywords: [
      "drug and alcohol consortium trucking",
      "FMCSA drug testing program",
      "clearinghouse query service",
      "random drug testing pool carrier",
      "DOT drug consortium enrollment",
    ],
    metaTitle: "Drug & Alcohol Consortium — $135 | QP Trucking",
    metaDescription:
      "FMCSA-compliant drug and alcohol consortium enrollment: random pooling, pre-employment testing and Clearinghouse queries. $135 ($100 for clients).",
  },
  {
    slug: "eld-dashcam",
    name: "ELD & Dashcam Savings Program",
    short: "ELD & Dashcam",
    category: "Authority & Compliance",
    eyebrow: "Authority · Technology",
    tagline:
      "FMCSA-registered ELD and dashcam hardware at member pricing — with the compliance help to install it right.",
    answer:
      "QP's ELD and Dashcam Savings Program gives member carriers preferred pricing on FMCSA-registered electronic logging devices and camera systems, plus help with installation, driver training and the records you need to keep during a roadside inspection or audit.",
    heroVariant: "tech",
    heroImage: "/images/hero/irp.jpg",
    accent: "teal",
    price: {
      summary: "Member pricing on approved ELD and dashcam hardware — savings depend on fleet size",
      fine: "Quote provided after a short fleet review; no obligation to switch providers.",
    },
    checkoutUrl: "/get-started?service=eld-dashcam",
    heroStats: [
      { label: "Registration", value: "FMCSA" },
      { label: "Pricing", value: "Member" },
      { label: "Support", value: "Included" },
    ],
    intro: [
      "Electronic logging devices are mandatory for most interstate CMV drivers, and dashcams are increasingly requested — or required — by brokers and insurers. QP's savings program is how our clients buy that hardware without overpaying for it.",
      "Because QP also writes trucking insurance and manages compliance, we can show you which devices actually reduce your premium and which ones simply add a monthly bill.",
    ],
    sections: [
      {
        h: "What the program includes",
        bullets: [
          "Preferred pricing on FMCSA-registered ELD systems for fleets of any size",
          "AI dashcam options that insurers credit with premium discounts",
          "Help understanding contract terms before you sign a multi-year agreement",
          "Installation guidance and driver training so logs pass inspection",
          "Support exporting ELD and camera records during audits or claims",
          "Coordination with your insurance renewal for maximum credits",
        ],
      },
      {
        h: "Why ELD compliance still trips carriers up",
        p: [
          "Buying a device is the easy part. Most violations come from drivers editing logs incorrectly, missing the required in-cab documentation for unassigned driving, or an owner-operator whose provider never registered the device. We help you set the system up correctly from day one and keep the paperwork that goes with it.",
        ],
      },
      {
        h: "The benefits of our ancillary services",
        bullets: [
          "Member pricing negotiated for trucking companies",
          "Vendor-neutral advice — we are not paid by a single device maker",
          "Insurance coordination so technology discounts actually land on your policy",
          "Accurate setup and training to avoid violations",
          "Keeps your operations organized and audit ready",
          "Thousands of carriers supported by the QP team",
        ],
      },
    ],
    benefits: [
      "Discounts on FMCSA-registered ELD and camera hardware",
      "Straight talk about contract length, month-to-month options and data fees",
      "Camera systems that can reduce liability exposure in a crash claim",
      "Driver training support to avoid log editing violations",
      "Claims support when footage or HOS records are requested",
      "Bundled savings when combined with QP insurance and factoring",
    ],
    process: [
      {
        title: "Fleet review",
        body: "Tell us your truck count, lanes, driver turnover and current provider. We identify what you need — and what you are paying too much for.",
      },
      {
        title: "Choose a device",
        body: "We present registered options with member pricing, contract terms and an honest view of which insurer credits apply.",
      },
      {
        title: "Install and train",
        body: "Devices are installed, drivers are trained on logs and unassigned driving, and your records are audit ready.",
      },
    ],
    faqs: [
      {
        q: "Do I need an ELD in my truck?",
        a: "Most interstate CMV drivers required to keep records of duty status must use a registered ELD under the FMCSA electronic logging device rule. Limited exceptions exist, such as short-haul operations and pre-2000 engines — we'll confirm which applies to you.",
      },
      {
        q: "Can QP save me money on an ELD or dashcam?",
        a: "Yes. Our savings program provides member pricing on FMCSA-registered ELDs and dashcams, and we review contract length and data fees so your savings are real rather than repackaged.",
      },
      {
        q: "Will a dashcam lower my trucking insurance premium?",
        a: "Often, yes. Many carriers offer credits for forward-facing or AI camera systems, and some require them outright. Because QP also places your insurance, we can show you the actual premium impact before you buy.",
      },
      {
        q: "Do dashcams help with accident claims?",
        a: "Camera footage is frequently the fastest way to resolve a disputed accident, protect your safety rating and prove fault. That protection is why insurers and brokers increasingly ask about camera adoption.",
      },
      {
        q: "Does QP install the devices?",
        a: "We coordinate the hardware, registration and driver training with your chosen provider so the install is compliant and the logs pass inspection from the first trip.",
      },
    ],
    related: ["insurance", "dot-binder", "drug-alcohol-consortium", "trucking-factoring"],
    keywords: [
      "ELD savings program trucking",
      "FMCSA registered ELD",
      "AI dashcam fleet discount",
      "electronic logging device for owner operator",
      "dashcam insurance credit trucking",
    ],
    metaTitle: "ELD & Dashcam Savings Program | QP Trucking Solutions",
    metaDescription:
      "Member pricing on FMCSA-registered ELD and dashcam systems, plus installation guidance, driver training and insurance credits.",
  },
];

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, Service>;

export const factoringServices = services.filter((s) => s.category === "Factoring");
export const complianceServices = services.filter((s) => s.category === "Authority & Compliance");
export const insuranceServices = services.filter((s) => s.category === "Insurance");

/** Canonical path for a service record. */
export const servicePath = (s: Service) =>
  s.category === "Factoring"
    ? `/factoring/${s.slug}`
    : s.category === "Insurance"
      ? "/insurance"
      : `/services/${s.slug}`;
