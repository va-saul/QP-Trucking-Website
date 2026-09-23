import type { Faq } from "@/lib/types";

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type Insight = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  image: string;
  author: string;
  readingMinutes: number;
  category: "Industry news" | "Money & cash flow" | "Compliance" | "Glossary";
  keywords: string[];
  blocks: InsightBlock[];
  faqs?: Faq[];
  glossary?: { term: string; definition: string }[];
};

/**
 * Editorial carried over from the original qpfactoring.com blog (so the URLs
 * keep their content) plus evergreen reference material for AEO/GEO citations.
 */
export const insights: Insight[] = [
  {
    slug: "how-trucking-factoring-works",
    title: "How Trucking Factoring Works: A Practical Guide for Carriers",
    description:
      "Learn how trucking factoring turns approved freight invoices into working capital, what happens from paperwork to payment, and which fees and contract terms to compare.",
    excerpt:
      "Trucking factoring is the sale of an approved freight invoice for earlier access to cash. Here is the invoice-to-cash process, the paperwork carriers commonly need, and the questions to ask before choosing a factor.",
    date: "2026-09-23",
    image: "/images/hero/factoring.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 7,
    category: "Money & cash flow",
    keywords: [
      "how trucking factoring works",
      "freight invoice factoring explained",
      "invoice factoring for owner operators",
      "trucking factoring fees",
      "factoring documents for carriers",
    ],
    blocks: [
      {
        type: "p",
        text: "Trucking factoring is a way for a carrier to sell an approved freight invoice to a factoring company and receive funds sooner than waiting for the broker or shipper's normal payment terms. The factor verifies the receivable, advances funds according to the agreed terms, and handles collection as set out in the contract.",
      },
      { type: "h2", text: "How the invoice-to-cash process works" },
      {
        type: "ul",
        items: [
          "Deliver the load and keep the signed proof of delivery and rate confirmation.",
          "Submit the invoice and required load documents through the factor's approved process.",
          "The factor reviews the paperwork and checks that the broker or shipper and invoice meet its approval rules.",
          "If approved, the factor advances funds under the fee, timing and reserve terms in your agreement.",
          "The factor invoices or collects from the customer; the exact workflow and any remaining balance are defined by your contract.",
        ],
      },
      { type: "h2", text: "Factoring is a receivables transaction, not a bank loan" },
      {
        type: "p",
        text: "In a factoring arrangement, the carrier sells or assigns eligible invoices rather than borrowing against a conventional term loan. That distinction does not make every factoring agreement identical: the recourse rules, approval process, fees, reserves, notice requirements and termination terms still matter. Read the written agreement and ask the provider to explain each charge before signing.",
      },
      { type: "h2", text: "What carriers should compare" },
      {
        type: "ul",
        items: [
          "The complete fee schedule, including how fees change with invoice age and whether any separate charges apply.",
          "Recourse, non-recourse and chargeback terms — ask what specific events are covered and which remain the carrier's responsibility.",
          "Minimum volume, contract length, termination notice and any early-exit fee.",
          "Which brokers and shippers are approved, how credit checks work, and how disputes or deductions are handled.",
          "Funding options, customer service access, online tools and how missing paperwork affects a payment.",
        ],
      },
      { type: "h2", text: "Common documents a factor may request" },
      {
        type: "p",
        text: "A carrier is commonly asked for operating authority details, a certificate of insurance, a completed W-9, a customer or broker list, and load documents such as the rate confirmation and proof of delivery. Requirements vary by provider and customer, so confirm the checklist before submitting an invoice.",
      },
      { type: "h2", text: "How QP Trucking Solutions approaches factoring" },
      {
        type: "p",
        text: "QP Trucking Solutions offers recourse, non-recourse and Pure Non-Recourse™ factoring programs with fees disclosed before enrollment. QP also provides broker credit checks to clients and has no long-term contract requirement. The right option depends on your customers, volume and risk preferences; ask for the program terms in writing and compare them with your current cash-flow needs.",
      },
    ],
    faqs: [
      {
        q: "How quickly does a carrier get paid after factoring an invoice?",
        a: "Timing depends on the factor's approval process, the customer's credit and whether the load paperwork is complete. Ask the provider to state its funding cutoff times and what happens when a document needs correction.",
      },
      {
        q: "Does a carrier need excellent personal credit to factor invoices?",
        a: "Factoring providers commonly focus on the creditworthiness of the broker or shipper that owes the invoice, but each company has its own onboarding and approval requirements. Ask what information it evaluates before applying.",
      },
      {
        q: "What is the difference between recourse and non-recourse factoring?",
        a: "The contract defines when a carrier must repurchase or repay an invoice. Non-recourse protection is limited to the events and conditions specified in the agreement; it should not be assumed to cover every dispute, deduction or paperwork issue.",
      },
      {
        q: "What documents should I have ready to apply?",
        a: "A provider may request your authority information, certificate of insurance, W-9, customer list and sample load paperwork. Confirm the exact checklist with the provider you choose.",
      },
    ],
  },
  {
    slug: "new-trucking-authority-checklist-cost",
    title: "New Trucking Authority Checklist: The Steps and Costs to Plan For",
    description:
      "Starting a trucking company? Follow a practical sequence for business setup, operating authority, insurance and filings, and learn which service and government costs to verify.",
    excerpt:
      "A new authority launch involves more than one application. Use this step-by-step checklist to organize your business details, insurance, registrations and first-load paperwork without confusing service fees with government charges.",
    date: "2026-09-23",
    image: "/images/hero/new-authority.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 8,
    category: "Compliance",
    keywords: [
      "new trucking authority checklist",
      "how to start a trucking company",
      "new authority trucking costs",
      "FMCSA operating authority steps",
      "new carrier permits and filings",
    ],
    blocks: [
      {
        type: "p",
        text: "A new trucking authority launch is a sequence of business, FMCSA, insurance and state-filing tasks. The exact requirements depend on your operation, equipment and location, so use this checklist to plan the work and confirm current deadlines and fees with the relevant regulator or a qualified service provider.",
      },
      { type: "h2", text: "A practical order of operations" },
      {
        type: "ul",
        items: [
          "Set up the business information you will use consistently, including legal name, address, ownership details, tax ID and business banking.",
          "Determine which USDOT registration and operating-authority filings apply to the type of transportation you plan to perform.",
          "Arrange required insurance and verify that the policy information matches your legal business and authority records.",
          "Handle the process-agent designation and applicable tax, registration and permit tasks, such as BOC-3, Form 2290, IRP, IFTA and UCR when required for your operation.",
          "Prepare a compliance system for driver qualification, vehicle maintenance, drug-and-alcohol program requirements and records that apply to your business.",
          "Before booking, confirm that the authority and insurance status are active and that your broker packet and load paperwork are ready.",
        ],
      },
      { type: "h2", text: "Plan costs in separate buckets" },
      {
        type: "p",
        text: "Build a launch budget that separates professional preparation or filing service fees from government charges, state registration fees, insurance premiums, equipment costs and working capital. A published service price is not necessarily the total cost of starting operations: some government and state charges are passed through separately, and insurance pricing depends on the operation and underwriting details.",
      },
      {
        type: "p",
        text: "QP publishes service pricing for authority setup and compliance filings in its catalog. Review the current prices at /store and ask which government or state fees are additional before authorizing work. Requirements and amounts can change, so confirm the current figures for your specific filing before paying.",
      },
      { type: "h2", text: "Information to gather before you begin" },
      {
        type: "ul",
        items: [
          "Legal business name, formation details, tax ID and responsible-party contact information.",
          "USDOT or MC details if already issued, plus the business address and intended operation type.",
          "Truck and trailer details, garaging location, commodities, operating radius and estimated mileage.",
          "Driver roster and the documents your insurance or compliance provider asks you to supply.",
          "A target start date and a list of the brokers or shippers you expect to work with.",
        ],
      },
      { type: "h2", text: "Avoid delays with a consistency check" },
      {
        type: "p",
        text: "Before submitting anything, compare the business name, address, USDOT information and insurance documents across the application packet. Mismatched or incomplete details can lead to corrections and extra waiting. Keep copies of submission confirmations and check official status sources rather than assuming that a submitted application is already active.",
      },
      {
        type: "p",
        text: "QP Trucking Solutions coordinates authority setup, insurance and compliance services from one team. A specialist can help identify the steps relevant to your situation, but final requirements and approval timing are determined by the applicable government agencies and insurance providers.",
      },
    ],
    faqs: [
      {
        q: "What should I do first when starting a trucking company?",
        a: "Start by confirming your business details and the type of operation you plan to run. Those details guide which USDOT, operating-authority, insurance and state filing steps apply.",
      },
      {
        q: "How much does it cost to get new trucking authority?",
        a: "There is no single total for every carrier. Separate service fees from government and state charges, insurance, equipment and working capital, then verify the current itemized amounts for your operation. QP's published service prices are listed at /store.",
      },
      {
        q: "Can I start hauling as soon as I submit an authority application?",
        a: "Do not treat submission as approval. Confirm that the authority and any required insurance filings show the status needed for your operation before accepting or hauling a load.",
      },
      {
        q: "Does QP help with insurance and compliance as well as authority setup?",
        a: "Yes. QP offers trucking insurance and a range of compliance services, including authority setup and related filings. The exact services needed depend on your operation and location.",
      },
    ],
  },
  {
    slug: "trucking-insurance-quote-checklist",
    title: "Trucking Insurance Quote Checklist: What to Prepare Before You Call",
    description:
      "Get a more complete trucking insurance quote by organizing your DOT details, equipment, drivers, cargo, operating radius and prior coverage before speaking with an agent.",
    excerpt:
      "A clear insurance submission starts with accurate business, vehicle, driver and operating details. This checklist helps owner-operators and fleets prepare for a more useful first conversation with a licensed agent.",
    date: "2026-09-23",
    image: "/images/hero/insurance.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 6,
    category: "Compliance",
    keywords: [
      "trucking insurance quote checklist",
      "commercial truck insurance information needed",
      "owner operator insurance quote",
      "truck insurance application documents",
      "commercial auto insurance for trucking",
    ],
    blocks: [
      {
        type: "p",
        text: "To request a trucking insurance quote, prepare accurate details about the business, vehicles, drivers, cargo and operating territory. A licensed agent can use that information to understand the exposure, identify questions for the underwriter and compare available options; a quote is not a bound policy until coverage is accepted and confirmed.",
      },
      { type: "h2", text: "Business and authority details" },
      {
        type: "ul",
        items: [
          "Legal business name, business address, contact person, USDOT number and MC number if applicable.",
          "Business start date, ownership structure and a short description of the operation.",
          "Whether the operation is new authority, an established carrier or a renewal, and the requested effective date.",
          "The states or regions where the vehicles are garaged and regularly operated.",
        ],
      },
      { type: "h2", text: "Vehicles, drivers and the work you haul" },
      {
        type: "ul",
        items: [
          "For each power unit and trailer: year, make, model, VIN, stated value and any permanently attached equipment.",
          "For each driver: experience, license state and class, hire date, and any information the agent needs to request records with proper authorization.",
          "Commodities hauled, typical shipment value, hazmat status where applicable and the operating radius.",
          "Estimated annual mileage, number of power units and whether you hire, lease or interchange equipment.",
        ],
      },
      { type: "h2", text: "Current or prior coverage" },
      {
        type: "p",
        text: "If you have existing insurance, gather the declarations page, policy expiration date, coverage limits, deductibles and any information about prior cancellations or losses that the agent requests. Share accurate history; missing or inconsistent information can lead to a revised quote or delay during underwriting.",
      },
      { type: "h2", text: "Compare more than the premium" },
      {
        type: "ul",
        items: [
          "Confirm the coverage types, limits, deductibles and exclusions that apply to your operation.",
          "Ask which drivers, vehicles, commodities and territories are included or restricted.",
          "Check how filings and certificates will be handled and when they will be effective.",
          "Review the down payment, installment schedule and any fees with the agent before binding.",
          "Ask what documents are still outstanding and how a material business change should be reported.",
        ],
      },
      {
        type: "p",
        text: "QP Trucking Insurance offers quote support for owner-operators and fleets and can coordinate coverage questions with authority and compliance work. Use the online insurance intake to begin, and provide sensitive identity or driver information only through the authorized process explained by the licensed agent.",
      },
    ],
    faqs: [
      {
        q: "What information is needed for a trucking insurance quote?",
        a: "An agent commonly needs business and DOT details, vehicle and driver information, cargo, operating radius, mileage and prior coverage or loss history. The exact checklist varies by operation and insurer.",
      },
      {
        q: "Does requesting an insurance quote mean my policy is active?",
        a: "No. A quote is an offer to consider coverage. A policy is not bound until the application is accepted, required payment and documents are handled, and the agent confirms the effective coverage.",
      },
      {
        q: "Should I choose a policy based only on the lowest premium?",
        a: "No. Compare limits, deductibles, exclusions, covered drivers and vehicles, territory, filing support and payment terms as well as the premium. Ask the agent to explain any difference you do not understand.",
      },
      {
        q: "Can I use FMCSA lookup to pre-fill an insurance intake?",
        a: "The QP insurance intake can look up some carrier details using a DOT number when the FMCSA connection is configured. Verify the returned details and complete any missing or outdated information before submitting.",
      },
    ],
  },
  {
    slug: "top-5-trucking-scams-and-how-to-avoid-them",
    title: "Top 5 Trucking Scams and How to Avoid Them",
    description:
      "The five fraud schemes hitting carriers and brokers hardest — load scams, fake drivers, false freight claims, DOT impostors and phony repair shops — plus the verification steps that stop them.",
    excerpt:
      "Fraud follows the money, and in trucking the money moves fast. Here are the five schemes we see most often and the exact checks our clients use to shut them down.",
    date: "2023-01-30",
    updated: "2026-08-20",
    image: "/images/hero/factoring.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 6,
    category: "Compliance",
    keywords: ["trucking scams", "freight fraud", "double brokering", "fuel card security", "carrier identity theft"],
    blocks: [
      {
        type: "p",
        text: "Freight fraud is not a fringe problem — it is a daily cost of doing business. The schemes below are the five our clients report most often, followed by the procedures that make a carrier very hard to rob.",
      },
      { type: "h2", text: "1. The load scam" },
      {
        type: "p",
        text: "A scammer — often using the name of a legitimate carrier — books a load with a broker and immediately requests a fuel advance to cover over-the-road expenses. Professional fraudsters may even verify the request with a falsified bill of lading claiming the load was picked up. Once the cash advance lands, they disappear, leaving the broker out of pocket and still hunting for a real carrier. The more aggressive variant: the fraudulent carrier actually picks up the load, then holds it for ransom demanding an electronic funds transfer.",
      },
      { type: "h2", text: "2. The driver in need scam" },
      {
        type: "p",
        text: "A classic truck stop play. A fraudster poses as one of your drivers — usually targeting carriers with large driver pools — and calls dispatch requesting a cash advance for fuel or a repair. The details they use are picked up from conversation or simply by loitering around a truck stop and overhearing information.",
      },
      { type: "h2", text: "3. False freight claims" },
      {
        type: "p",
        text: "The driver is kept off the dock while loading and the trailer doors are sealed for security — which is ironic, because the sealed doors are part of the fraud. The driver was denied the chance to supervise loading, count or inspect the freight, yet is required to sign for piece count. The shortfall is not discovered until delivery.",
      },
      { type: "h2", text: "4. The DOT scam" },
      {
        type: "p",
        text: "Two versions exist. In the first, someone poses as a Department of Transportation representative or an on-site officer during a DOT inspection and contacts the trucking company demanding immediate payment for a fictitious violation. In the second, a letter arrives requesting payment to 'file your DOT renewal' and threatens fines for non-payment. Remember: biennial USDOT updates are filed free on the FMCSA website.",
      },
      { type: "h2", text: "5. The phony repair shop scam" },
      {
        type: "p",
        text: "The fraudster poses as a repair shop that has serviced your truck or trailer, supplying a vehicle number, plate number and the driver's name while demanding immediate payment before releasing the equipment — sometimes with a convincing phony invoice. A close cousin: an urgent demand for payment for a tow that never happened.",
      },
      { type: "h2", text: "How to avoid trucking scams" },
      {
        type: "p",
        text: "Identity theft is at the heart of most of these schemes. The countermeasures are simple, cheap, and extremely effective.",
      },
      {
        type: "ul",
        items: [
          "Validate the driver: speak to the driver whose vehicle is involved before releasing funds. Never accept a phone handover from a 'service provider' to the driver as proof of identity.",
          "Validate the service provider: demands for immediate payment for unscheduled service are a red flag. Confirm the provider did not simply lift information off the side of the truck.",
          "Ask identifying questions: full name, employee number and date of birth confirm both the driver and the equipment being serviced.",
          "Check the number: validate the incoming phone number against your own database, the vendor's website or a public listing.",
          "Send money to the driver, not the third party: have the driver pay the provider, then obtain a receipt on letterhead with a valid address and phone number.",
          "Use fuel cards instead of cash: fuel cards remove the need for drivers to carry large amounts of cash and give you real-time control of limits and locations.",
        ],
      },
      { type: "h2", text: "Why fuel cards are a fraud control, not just a discount" },
      {
        type: "ul",
        items: [
          "Eliminates the need for drivers to carry large amounts of cash",
          "Fuel discounts at retail and terminal locations across North America put real money back on your bottom line",
          "Authorized staff can add funds on the road, safely and securely, like a debit card",
          "Set product, volume and dollar limits — and monitor expenses so you control costs",
          "Security information is required for every transaction, and a lost card can be shut off immediately",
          "24/7 online access gives you a real-time view of fleet activity",
          "Detailed transaction data flows back to the home office and makes IFTA fuel tax reporting simpler",
        ],
      },
      {
        type: "p",
        text: "Every QP Trucking Solutions factoring client receives a QP Card with access to the nation's largest fuel discount network — which means the anti-fraud control and the fuel savings arrive together.",
      },
    ],
  },
  {
    slug: "new-fines-for-double-brokering",
    title: "New Fines for Double Brokering: What Carriers Should Know",
    description:
      "Double brokering can put a load in the hands of an unauthorized carrier — and federal law allows civil penalties of up to $10,000 per incident under MAP-21.",
    excerpt:
      "Brokerage trade groups are pushing the double-brokering issue back into the spotlight. The penalty provision has been on the books since MAP-21 — and it is up to $10,000 per incident.",
    date: "2023-02-14",
    updated: "2026-08-20",
    image: "/images/hero/compliance.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 3,
    category: "Industry news",
    keywords: ["double brokering", "MAP-21 penalties", "freight broker rules", "carrier authority", "FMCSA enforcement"],
    blocks: [
      {
        type: "p",
        text: "The leading trade group representing the brokerage industry is diving anew into double brokering — the practice of re-brokering a load, sometimes to a company without proper authority, without the original broker's knowledge. As one industry voice put it, the original broker often doesn't find out 'unless something bad happens.'",
      },
      {
        type: "p",
        text: "There is a federal penalty provision that already exists. MAP-21, passed in 2012, includes penalties for double brokering of up to $10,000 per incident. During the writing of that law, the intent was described plainly: give regulators a civil penalty provision to financially go after bad actors in the space.",
      },
      { type: "h2", text: "What this means for carriers and factoring clients" },
      {
        type: "ul",
        items: [
          "Confirm that the broker on your rate confirmation holds active authority and is the party named on the load tender",
          "Never accept a load from a carrier that claims to be 'brokering on behalf' of a broker without written consent",
          "Keep the paper trail: rate confirmations, recorded check calls and signed BOLs are your defense if a broker refuses to pay",
          "Watch for red flags: pressure to start immediately, a rate far above market, or a broker who cannot provide their MC number",
          "Run a credit and authority check on every new customer before you dispatch — QP clients get unlimited broker credit checks",
        ],
      },
      {
        type: "p",
        text: "Under our Pure Non-Recourse™ program, qualifying loads carry no chargeback risk — but the first line of defense is still due diligence. QP verifies brokers for clients before dispatch, at no additional cost.",
      },
    ],
  },
  {
    slug: "get-to-know-your-trucking-terms",
    title: "Get to Know Your Trucking Terms: The Complete Glossary",
    description:
      "From accessorial charges to white glove logistics — a plain-English glossary of trucking, freight and logistics terminology used by carriers, brokers and shippers every day.",
    excerpt:
      "New to the industry, or onboarding dispatchers and drivers? This is the working vocabulary of freight — roughly 80 terms, defined simply.",
    date: "2024-03-15",
    updated: "2026-08-20",
    image: "/images/hero/factoring.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 12,
    category: "Glossary",
    keywords: [
      "trucking terminology",
      "freight glossary",
      "logistics terms",
      "bill of lading definition",
      "accessorial charge meaning",
      "detention vs demurrage",
    ],
    blocks: [
      {
        type: "p",
        text: "Trucking runs on shorthand. If you are starting an authority, onboarding drivers or training dispatch staff, this glossary keeps everyone speaking the same language — and it doubles as a quick reference when a broker or shipper uses a term you have not heard.",
      },
      {
        type: "p",
        text: "Use your browser's find function to jump straight to a term, or scan the list below.",
      },
    ],
    glossary: [
      { term: "Accessorial Charge", definition: "Amount billed for additional, supplemental or special services, usually a flat fee. Examples include tarps, dunnage, layovers and detention." },
      { term: "All-in Line Haul", definition: "Fuel surcharge (FSC) plus line haul." },
      { term: "Backhaul", definition: "The return movement of a transportation vehicle from its delivery point back to its point of origin." },
      { term: "Bill of Lading (BOL / eBOL)", definition: "A document between a shipper and carrier acknowledging receipt of goods for transport, now also available electronically. It describes the nature of the cargo, weight, size or piece count, and the origin and destination." },
      { term: "Blockchain", definition: "A traceability ledger that builds immutable blocks of information and prevents tampering with data. In logistics it can be a private consortium or a publicly traded system." },
      { term: "Bobtailing", definition: "Driving a cargo-carrying semi-truck without a trailer attached. Often happens when a driver is first dispatched to a pickup site." },
      { term: "Box Truck", definition: "Also known as a box van, cube van, bob truck or cube truck — a chassis cab truck with an enclosed cuboid cargo area." },
      { term: "Broker (freight)", definition: "An individual or company that acts as a liaison between a shipper who needs shipping services and an authorized motor carrier." },
      { term: "Carrier", definition: "A company that utilizes trucks and trailers to move goods from point A to point B." },
      { term: "Coil Racks", definition: "Prefabricated cradles made of wood or steel used to hold rolled coils so they cannot roll on a trailer." },
      { term: "Compliance, Safety & Accountability (CSA)", definition: "An FMCSA program that focuses carrier and driver attention on safety performance, with the goal of reducing large-truck crashes, injuries and fatalities." },
      { term: "Commodity", definition: "Any article of commerce, including raw material, manufactured or grown products." },
      { term: "Common Carrier", definition: "A person or company that transports goods for any other person or company and is responsible for loss of the goods during transport." },
      { term: "Consignee", definition: "The person or location to whom a shipment is to be delivered, whether by land, sea or air." },
      { term: "Container", definition: "A standard-sized rectangular box used to move freight by ship, rail or highway. International containers are 20' or 40' and meet ISO standards; domestic containers run up to 53' and are built for rail and highway." },
      { term: "Dead-Heading", definition: "Operating a truck without cargo." },
      { term: "Declared Value", definition: "The value of a shipment as declared by the shipper or owner." },
      { term: "Dedicated Fleet", definition: "A group of trucks a shipper uses solely for moving its freight — typically higher cost with guaranteed capacity and locked-in rates." },
      { term: "Dedicated Truck", definition: "A driver pulling freight for one specific customer only, with no partial loads added." },
      { term: "DEF (Diesel Exhaust Fluid)", definition: "The urea-based fluid injected into modern diesel exhaust systems to reduce emissions." },
      { term: "Department of Transportation (DOT)", definition: "Oversees U.S. federal highway, air, railroad, maritime and other transportation administration functions." },
      { term: "Detention / Demurrage", definition: "Charges for excess retention of equipment, typically caused by late loading or unloading." },
      { term: "DOT Number", definition: "A unique identifier issued to companies engaged in interstate — and in some cases intrastate — commerce, used for safety monitoring, audits and investigations. Not the same as an MC number." },
      { term: "Double Drop", definition: "A flatbed with the lowest deck, normally used for oversized or over-height loads." },
      { term: "Drop and Hook", definition: "When a driver drops a loaded trailer at a facility and hooks to a pre-loaded trailer at the same facility." },
      { term: "Dunnage", definition: "Filler material placed in empty spaces to keep cargo from moving — typically lumber, foam padding or inflatable bags." },
      { term: "Duty Status", definition: "Drivers maintain a 24-hour Record of Duty Status documenting work and rest periods, kept current to the last change, with the previous 7 days retained and available to law enforcement." },
      { term: "Electronic Logging Device (ELD)", definition: "A device that records drive time, mileage, speed and engine data as required by the FMCSA ELD mandate (and the Canadian mandate)." },
      { term: "Escorts", definition: "Vehicles assisting the movement of oversize shipments, alerting other drivers and helping control traffic with beacons or flags." },
      { term: "Flatbed", definition: "A trailer with a flat, open load-carrying area used for oversized and oddly shaped cargo." },
      { term: "FMCSA", definition: "The Federal Motor Carrier Safety Administration — the agency within the DOT that regulates commercial motor vehicle safety." },
      { term: "Freight Class", definition: "In LTL shipping, the category of freight as defined by the National Motor Freight Traffic Association, which determines shipping charges." },
      { term: "Freight Forwarder", definition: "Facilitates shipping for a third party. Similar to a broker but typically handles international goods, is defined as a carrier, and can be held responsible for claims and cargo loss." },
      { term: "Fuel Surcharge (FSC)", definition: "An adjustment added to the cost of moving freight, based on the weekly national average fuel price, expressed as cents per mile or a percentage of line haul." },
      { term: "Full Truckload (FTL)", definition: "A shipment occupying an entire trailer, moved by dry van, flatbed or reefer." },
      { term: "Ghost Load", definition: "Loads posted that rarely mature into real freight — commonly posted by brand-new brokers without funds for reliable services." },
      { term: "Hazmat", definition: "Hazardous materials as classified by the EPA; transport is strictly regulated by the DOT." },
      { term: "Hot Shot", definition: "Smaller trailers (typically 24–40 feet) pulled by larger pickup trucks, common for smaller loads and LTL shipments." },
      { term: "Hours of Service (HOS)", definition: "Regulations limiting when and how long drivers may drive." },
      { term: "Interchange Agreement", definition: "A contract between two companies to switch or take control of a trailer to pick up and deliver shipments — common in border towns." },
      { term: "Intermodal", definition: "A single trailer or container that moves by more than one form of transportation, such as truck and rail or truck and ship." },
      { term: "Interstate / Intrastate", definition: "Interstate shipments originate in one state and are destined for another, crossing state lines. Intrastate means goods move from one location to another within the same state." },
      { term: "Jackknife", definition: "When the trailer of a tractor-trailer pushes the towing vehicle to one side or all the way around so it faces backward, resembling a folding pocket knife." },
      { term: "Just in Time (JIT)", definition: "A manufacturing system depending on frequent, small deliveries to keep on-site inventory to a minimum." },
      { term: "Lane", definition: "A move from point A to point B. A regularly-run lane is often called a dedicated lane." },
      { term: "Last Mile", definition: "The final movement of an item to its destination, whether a parcel or a full truckload making its last stop." },
      { term: "Layover", definition: "When a driver is detained overnight or for a 24-hour period waiting to pick up or deliver, usually with fees involved." },
      { term: "Line Haul", definition: "The rate per mile, in dollars and cents, for transporting items." },
      { term: "Less-Than-Truckload (LTL)", definition: "Freight quantity less than what is required for a full truckload rate; carriers often consolidate several LTL shipments on one truck." },
      { term: "Lumper", definition: "A third-party worker who loads or unloads a trailer, with the fee often charged to the carrier and frequently reimbursable by the shipper or broker." },
      { term: "Managed Transportation", definition: "A 3PL takes over a company's shipping and logistics needs from tendering through final delivery." },
      { term: "MC Number", definition: "A Motor Carrier number — the interstate operating authority and unique identifier assigned by the FMCSA to carriers operating in interstate commerce." },
      { term: "National Motor Freight Classification (NMFC)", definition: "A standard comparison of commodities moving in interstate, intrastate and foreign commerce, with 18 classes based on density, stowability, handling and liability." },
      { term: "Owner-Operator", definition: "A truck driver who owns and operates their own truck." },
      { term: "Over-Dimensional", definition: "Cargo larger than legal width, length, height or weight limits that cannot be broken down into smaller units." },
      { term: "Parcel", definition: "Small package freight, typically weighing less than 150 pounds — the dominant form of e-commerce fulfillment." },
      { term: "Partial", definition: "A truck compiling multiple shipments from several customers; transit times can be longer due to multiple stops." },
      { term: "Permits", definition: "Permission obtained from states allowing carriers to transport freight exceeding legal weight and size limits." },
      { term: "Placard", definition: "Warning signs placed on all four sides of a trailer indicating hazardous materials are being carried." },
      { term: "Proof of Delivery (POD / ePOD)", definition: "Signed documents — usually a bill of lading — showing a shipment was received at the delivery location, also available electronically." },
      { term: "PRO Number", definition: "A number assigned by the carrier to reference the shipment, also used for tracking." },
      { term: "Pup Trailer", definition: "A short semitrailer, usually 26–32 feet long, with a single axle." },
      { term: "Rate Confirmation", definition: "A document confirming the agreed amount for the service between the shipper or broker and the carrier." },
      { term: "Reefer", definition: "A trailer with insulated walls and a self-powered refrigeration unit, most commonly used for food." },
      { term: "Removable Gooseneck (RGN)", definition: "A heavy-haul flatbed trailer providing drive-on, drive-off accessibility by raising, lowering and removing the gooseneck." },
      { term: "Sealed Trailer", definition: "A trailer with a seal ensuring the load has not been tampered with." },
      { term: "Shipper", definition: "The consignor, exporter or seller named on the bill of lading, who may or may not be the party initiating the shipment." },
      { term: "Sliding Tandem", definition: "A mechanism allowing tandem axle suspension to move back and forth on a semi-trailer to adjust weight distribution between axles and the fifth wheel." },
      { term: "Spread Axle", definition: "A tandem axle assembly spaced further apart than the standard 54 inches." },
      { term: "Standard Carrier Alpha Code (SCAC)", definition: "A unique 2–4 letter code used to identify transportation companies, required for intermodal and government freight." },
      { term: "Tandem Axle", definition: "A pair of axles and associated suspension usually located close together." },
      { term: "Team Drivers", definition: "Two drivers who alternate driving and resting, typically used for expedited shipments at a greater cost." },
      { term: "Third-Party Logistics (3PL)", definition: "A company that provides transportation or logistics services without functioning as the shipper or the carrier." },
      { term: "Thru Trailer Service (TTS)", definition: "Cargo remains on the same trailer during an international shipment — the opposite of a trans-load, and generally considered safer." },
      { term: "TONU", definition: "Truck Ordered, Not Used — a cancellation charge for ordering a truck and then cancelling the order." },
      { term: "Tractor", definition: "A power unit designed to draw or pull a semi-trailer." },
      { term: "Trans-Load", definition: "Moving a product from one trailer to another to keep a shipment moving; standard practice at international borders." },
      { term: "Transportation Management System (TMS)", definition: "A system of record for tracking shipments, tendering loads and communicating with other parties in the network." },
      { term: "TWIC", definition: "Transportation Worker Identification Credential — needed for unescorted access to secure areas of MTSA-regulated facilities and vessels." },
      { term: "ULSD", definition: "Ultra Low Sulfur Diesel." },
      { term: "Warehousing", definition: "Locations used to store and stage goods before fulfillment, including temporary pop-up warehouses for demand peaks." },
      { term: "Warehouse Management System (WMS)", definition: "A system of record for managing warehouse activities, often integrated with the TMS for better transparency." },
      { term: "White Glove Logistics", definition: "Specialized fulfillment including installation, debris removal and extra care during delivery." },
    ],
  },
  {
    slug: "carriers-hoping-for-relief-on-insurance-premiums",
    title: "Carriers Hoping for Relief on Insurance Premiums",
    description:
      "Nuclear verdicts, medical costs and repair rates keep pushing trucking insurance premiums up. Here is how fleets are fighting back with technology — and what underwriters actually look at.",
    excerpt:
      "Nuclear verdicts are not easing, claims severity keeps climbing, and social inflation is real. Fleets are turning to cameras, telemetry and AI to bend the curve.",
    date: "2023-02-06",
    updated: "2026-08-20",
    image: "/images/hero/insurance.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 4,
    category: "Money & cash flow",
    keywords: ["trucking insurance rates", "nuclear verdicts", "fleet telemetry", "dashcam insurance discount", "commercial auto premiums"],
    blocks: [
      {
        type: "p",
        text: "In a hard insurance market, fleets still have options to control costs. Carriers are turning to technology — cameras, telemetry and artificial intelligence — to mitigate risk and reduce premiums.",
      },
      {
        type: "p",
        text: "The pressure is structural. The frequency and severity of nuclear verdicts do not appear to be decreasing, and the cost of the average insurance claim keeps rising. As one industry risk expert described it: when you review the telemetry data, the motorist is at fault roughly 90% of the time — but the first impression is that the big rig caused it, and the carrier always has to defend itself.",
      },
      {
        type: "p",
        text: "Social inflation, medical costs, truck replacement costs and repair rates all put upward pressure on rates, because they all drive loss costs and severity. Underwriters are looking at the frequency of claims and the cost of those claims.",
      },
      { type: "h2", text: "What actually moves your premium" },
      {
        type: "ul",
        items: [
          "Camera and telemetry adoption — forward-facing and AI dashcams are increasingly credited by markets, and some require them",
          "Driver hiring standards, MVR monitoring and turnover",
          "Loss history relative to miles run: accurate mileage on your MCS-150 changes rate-based scoring",
          "Commodity and radius: long-haul, high-value and hazmat freight prices differently",
          "Maintenance documentation and safety program records",
          "Deductible and payment structure — a higher deductible lowers premium but raises exposure",
        ],
      },
      { type: "h2", text: "The QP approach" },
      {
        type: "p",
        text: "Because QP Trucking Insurance sits inside the same company that handles factoring and compliance, we can see the whole picture: how your trucks are equipped, how your drivers are documented, and what credits the market will actually apply. We also run an ELD and dashcam savings program so the technology that reduces claims is not the technology that breaks your budget.",
      },
      {
        type: "p",
        text: "Before any renewal, ask two questions: which credits am I eligible for, and what documentation does the underwriter want to see? Most carriers leave money on the table simply because nobody asked.",
      },
    ],
  },
  {
    slug: "rush-hour-times-getting-worse-for-truckers",
    title: "Rush Hour Times Are Getting Worse for Truckers",
    description:
      "Peak-hour speeds at the top 100 freight bottlenecks fell to 36.3 mph as drivers waited 6% longer in congested corridors. What that means for detention pay, scheduling and costs per mile.",
    excerpt:
      "ATRI's bottleneck data shows average peak-hour speeds slipping to 36.3 mph at the nation's top 100 freight chokepoints. For carriers, lost time is lost money.",
    date: "2023-02-09",
    updated: "2026-08-20",
    image: "/images/hero/home.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 3,
    category: "Industry news",
    keywords: ["freight bottlenecks", "ATRI bottleneck report", "detention pay", "trucking congestion cost", "peak hour speeds"],
    blocks: [
      {
        type: "p",
        text: "Truck drivers waited 6% longer on average in 2022 while moving through the nation's most congested sections of highway at rush hour, according to data compiled by the American Transportation Research Institute (ATRI), a not-for-profit affiliate of the American Trucking Associations.",
      },
      {
        type: "p",
        text: "Average peak-hour speeds were clocked at 36.3 mph at the top 100 freight bottlenecks, compared with 38.6 mph the year before — a meaningful drop in productivity for every carrier running those lanes.",
      },
      { type: "h2", text: "Why bottlenecks are a cash-flow problem, not just an irritation" },
      {
        type: "ul",
        items: [
          "Sitting in traffic burns hours of service you cannot bill",
          "Late arrivals create detention disputes and hurt your on-time metrics with brokers",
          "Fuel burn per loaded mile climbs while revenue per mile stays flat",
          "Tight appointment windows force drivers into peak congestion to avoid rescheduling",
        ],
      },
      {
        type: "p",
        text: "The practical response is operational: build congestion buffers into appointment planning, document detention carefully with timestamped arrival and departure records, and price lanes that consistently burn extra hours accordingly. Because QP factors invoices and handles collections, we can also see which brokers actually pay detention — and which ones never do.",
      },
    ],
  },
  {
    slug: "are-carriers-being-to-hopeful",
    title: "Are Carriers Being Too Hopeful About Freight Recovery?",
    description:
      "Freight sentiment data showed carriers split on near-term profitability while staying positive on the longer term. What the indexes said about spot rates, investment and hiring.",
    excerpt:
      "Few in freight had high hopes for first-quarter profits, yet longer-term sentiment stayed positive. Here is what the sentiment indexes actually revealed.",
    date: "2023-01-23",
    updated: "2026-08-20",
    image: "/images/hero/factoring.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 3,
    category: "Industry news",
    keywords: ["freight sentiment index", "truckload spot rates", "carrier profitability", "freight market outlook", "NTIL spot rate"],
    blocks: [
      {
        type: "p",
        text: "Few in freight appeared to have high hopes for profits in the first quarter, but the landscape was at least starting to look a little brighter for carriers, according to the Q1 Freight Sentiment Indexes.",
      },
      {
        type: "p",
        text: "The only category that declined besides near-term profitability was longer-term workforce — which nonetheless held solidly positive and was down only slightly from the prior quarter. Truckload spot rates, as measured by the FreightWaves National Truckload Index less fuel, had hit a low of $1.67 in mid-November.",
      },
      {
        type: "p",
        text: "That does not discount that, when including a long-term perspective, carriers saw themselves in a marginally stronger position than three months earlier. In the business investment subcategory, shippers scored highest — meaning they were the most likely to consider it a good time to spend on new technology.",
      },
      { type: "h2", text: "The lesson for owner-operators and small fleets" },
      {
        type: "ul",
        items: [
          "Sentiment and spot rates move faster than contracts — build working capital buffers before the slow quarters, not during them",
          "Factoring smooths the gap: it turns receivables into cash without adding debt, so a soft quarter does not become a missed payment",
          "Use soft markets to renegotiate insurance, fuel and equipment costs while carriers are competing for your business",
          "Invest in technology when margins allow, because the savings compound through the next cycle",
        ],
      },
      {
        type: "p",
        text: "The carriers that survive cycles are rarely the ones with the best rate. They are the ones with the most predictable cash flow.",
      },
    ],
  },
  {
    slug: "a-sleeper-cab-with-a-jacuzzi",
    title: "A Sleeper Cab With a Jacuzzi? The Ever-Expanding Definition of Driver Comfort",
    description:
      "Sleeper cab design keeps pushing into territory once reserved for hotel rooms. A look at what drivers actually value on the road — and what carriers should weigh before buying.",
    excerpt:
      "From memory-foam bunks to built-in refrigeration, sleeper comfort has become a retention tool. Not every upgrade pays for itself.",
    date: "2023-01-25",
    updated: "2026-08-20",
    image: "/images/hero/irp.jpg",
    author: "QP Trucking Solutions",
    readingMinutes: 3,
    category: "Industry news",
    keywords: ["sleeper cab features", "driver retention", "truck cab comfort", "owner operator equipment", "driver recruiting"],
    blocks: [
      {
        type: "p",
        text: "Sleeper cab design has been creeping toward hotel-room territory for years: larger bunks, better insulation, more storage, integrated refrigeration and power systems that let drivers run appliances without idling all night.",
      },
      {
        type: "p",
        text: "For carriers competing for experienced drivers, cab quality has become a real recruitment and retention lever — particularly on long-haul lanes where drivers spend weeks away from home. For owner-operators, the calculus is different: every upgrade has to earn its keep in resale value, weight, fuel economy or driver happiness.",
      },
      { type: "h2", text: "What drivers actually value" },
      {
        type: "ul",
        items: [
          "A comfortable mattress and a bunk that stays cool in summer",
          "Reliable auxiliary power so the engine does not have to idle",
          "Storage that keeps the cab livable rather than cluttered",
          "Stable temperature and quiet insulation on rest breaks",
          "Connectivity strong enough for video calls, streaming and family time",
        ],
      },
      {
        type: "p",
        text: "The financiers' view: equipment that improves driver retention and reduces idle time is easier to justify than equipment that only looks impressive. If you are financing a tractor, QP can help you structure it alongside your factoring line so the payment tracks the revenue the truck produces.",
      },
    ],
  },
];

export const insightsBySlug = Object.fromEntries(insights.map((i) => [i.slug, i])) as Record<string, Insight>;

export const glossaryTerms = insights.find((i) => i.slug === "get-to-know-your-trucking-terms")?.glossary ?? [];
