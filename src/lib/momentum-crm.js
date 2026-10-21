/**
 * Momentum CRM (NowCerts AMS white-label of GoHighLevel / LeadConnector v2)
 * integration & automatic custom-field mapper for all QP Trucking website forms:
 *
 *   1. LeadForm (variant="consult")        — /contact, /get-started, service pages
 *   2. LeadForm (variant="quote")          — /insurance quick quote
 *   3. EquipmentFinanceForm                — /programs/equipment-finance credit app
 *   4. InsuranceIntakeDetails (9 sections) — /insurance full commercial trucking intake
 *
 * Zero external dependencies. Runs identically inside Next.js API routes,
 * Node 20+ CLI scripts (`npm run crm:sync`), and `node --test` suites.
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

/** Sub-account Location ID configured in `src/app/layout.tsx` (Momentum CRM chat widget). */
const DEFAULT_MOMENTUM_LOCATION_ID = "yvQJy3oBoDmK005drBmX";

const SCHEMA_CACHE_TTL_MS = 5 * 60 * 1000;

/** @type {Map<string, { expiresAt: number; fields: any[] }>} */
const customFieldCache = new Map();

/** @type {Map<string, { expiresAt: number; objects: any[] }>} */
const customObjectCache = new Map();

/** @type {Set<string>} */
const autoSyncedLocations = new Set();

/**
 * Complete catalog of every non-standard field submitted across all 4 website forms,
 * with canonical display names, Momentum/NowCerts snapshot aliases, target folder,
 * and preferred data type if created via `npm run crm:sync -- --create-missing`.
 */
const FIELD_CATALOG = [
  // ================= SHARED / CONSULTATION & QUICK QUOTE =================
  {
    key: "service",
    name: "Service Needed",
    folder: "QP Website — General & Compliance",
    dataType: "TEXT",
    aliases: ["What do you need?", "Service Requested", "Service Interest", "Interested Service", "Product / Service"],
  },
  {
    key: "fleet",
    name: "Fleet Size",
    folder: "QP Website — General & Compliance",
    dataType: "TEXT",
    aliases: ["Number of Trucks", "Truck Count", "Fleet Size Range"],
  },
  {
    key: "radius",
    name: "Radius of Operation",
    folder: "QP Website — General & Compliance",
    dataType: "TEXT",
    aliases: ["Operating Radius", "Haul Radius"],
  },
  {
    key: "message",
    name: "Website Inquiry Notes",
    folder: "QP Website — General & Compliance",
    dataType: "LARGE_TEXT",
    aliases: ["Anything else we should know?", "Message", "Comments", "Inquiry Details", "Additional Notes"],
  },
  {
    key: "page",
    name: "Submitted Page URL",
    folder: "QP Website — General & Compliance",
    dataType: "TEXT",
    aliases: ["Source Page", "Landing Page", "Website Page"],
  },
  {
    key: "formCategoryLabel",
    name: "Website Form Type",
    folder: "QP Website — General & Compliance",
    dataType: "TEXT",
    aliases: ["Form Name", "Form Type", "Submission Type"],
  },

  // ================= SECTION 01: CONTACT & FMCSA DOT =================
  {
    key: "dotNumber",
    name: "USDOT Number",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["DOT Number", "DOT #", "DOT#", "USDOT", "USDOT #", "USDOT / MC number", "Field #1 — USDOT Number"],
  },
  {
    key: "mcNumber",
    name: "MC Number",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["MC #", "MC#", "Motor Carrier Number", "Docket Number"],
  },
  {
    key: "businessName",
    name: "Business Name",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Legal Business Name", "Legal Name of Business", "Carrier Legal Name"],
  },
  {
    key: "datePosted",
    name: "Date Posted",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Posted Date"],
  },
  {
    key: "contactSource",
    name: "Contact source",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Lead Source Detail"],
  },
  {
    key: "contactType",
    name: "Contact type",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Prospect Type"],
  },
  {
    key: "lead",
    name: "Lead",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Lead Status", "Lead Owner"],
  },
  {
    key: "secondOwnerFirstName",
    name: "2nd Owner First Name",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Second Owner First Name", "Co-Owner First Name"],
  },
  {
    key: "secondOwnerLastName",
    name: "2nd Owner Last Name",
    folder: "Contact",
    dataType: "TEXT",
    aliases: ["Second Owner Last Name", "Co-Owner Last Name"],
  },
  {
    key: "typeOfContact",
    name: "Type of Contact",
    folder: "Contact",
    dataType: "TEXT",
    aliases: [],
  },

  // ================= SECTION 02: NEW AUTHORITY QUESTIONS =================
  {
    key: "bindCoverageDate",
    name: "When are you looking to Bind Coverage or when would you like policy to start?",
    folder: "Insured Information Needed",
    dataType: "TEXT",
    aliases: [
      "Question 1 — When are you looking to Bind Coverage or when would you like policy to start?",
      "Bind Coverage Date",
      "Desired Effective Date",
    ],
  },
  {
    key: "receivedQuotesWithWho",
    name: "So I don't double quote you. Have you received any insurance quotes yet? With who?",
    folder: "Insured Information Needed",
    dataType: "TEXT",
    aliases: [
      "Question 2 — So I don't double quote you. Have you received any insurance quotes yet? With who?",
      "Have you received any insurance quotes yet? With who?",
      "Other Insurance Quotes",
    ],
  },
  {
    key: "downPaymentAvailable",
    name: "Insurance Down Payments are usually between $3000-$6000 do you have that available before that date?",
    folder: "Insured Information Needed",
    dataType: "TEXT",
    aliases: [
      "Question 3 — Insurance Down Payments are usually between $3000-$6000 do you have that available before that date?",
      "Down Payment Available",
    ],
  },
  {
    key: "companyRep",
    name: "Company Rep",
    folder: "Insured Information Needed",
    dataType: "TEXT",
    aliases: ["Assigned Rep", "Producer"],
  },
  {
    key: "referReason",
    name: "Refer Reason",
    folder: "Insured Information Needed",
    dataType: "TEXT",
    aliases: ["Referral Reason"],
  },

  // ================= SECTION 03: GENERAL INFO =================
  {
    key: "generalBusinessName",
    name: "Business name",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Insured Business Name"],
  },
  {
    key: "relatedContacts",
    name: "2 related contacts",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Related Contacts"],
  },
  {
    key: "dateBusinessStarted",
    name: "Date Business Started",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Date Established", "Year Business Started"],
  },
  {
    key: "eldProvider",
    name: "Who is your ELD provider?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["ELD Provider"],
  },
  {
    key: "ein",
    name: "Company EIN",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["EIN", "FEIN", "Tax ID#", "Tax ID", "Federal Tax ID"],
  },
  {
    key: "ownerDlNumber",
    name: "Owner's Driver License Number",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Owners Driver License Number", "Owner DL Number", "Owner License Number"],
  },
  {
    key: "ownerSsn",
    name: "Owner's Social Security Number",
    folder: "General Info",
    dataType: "TEXT",
    sensitive: true,
    aliases: ["Owners Social Security Number", "Owner SSN", "SSN", "Guarantor SSN"],
  },
  {
    key: "ownerMaritalStatus",
    name: "Owner Married Or Single?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Marital Status", "Owner Marital Status"],
  },
  {
    key: "ownerCdlClass",
    name: "Does Owner have class A, B, or C CDL",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Owner CDL Class"],
  },
  {
    key: "ownerCdlYears",
    name: "How long has owner had CDL?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Owner CDL Years", "Years with CDL"],
  },
  {
    key: "ownerInvolvement",
    name: "What is the owners involvement in this venture?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: [
      "If the owner does not drive — What is the owners involvement in this venture?",
      "If the owner does not drive - What is the owners involvement in this venture?",
      "Owner Involvement",
    ],
  },
  {
    key: "ownerExperienceYears",
    name: "How many years of experience does the owner have in trucking?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Owner Experience Years", "Years in Trucking"],
  },
  {
    key: "hazmat",
    name: "Do you haul Hazardous substances or materials?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Hazmat", "Haul Hazmat"],
  },
  {
    key: "commodities",
    name: "List Commodities",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Commodities", "Commodities Hauled", "Cargo Hauled"],
  },
  {
    key: "commodityPercentages",
    name: "% of loads for each Commodity",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Commodity Percentages"],
  },
  {
    key: "averageValue",
    name: "Average Value",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Average Cargo Value", "Average Load Value"],
  },
  {
    key: "maxValue",
    name: "Max Value",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Max Cargo Value", "Maximum Load Value"],
  },
  {
    key: "hiringPlans",
    name: "Does the applicant plan on hiring any additional owner/operators in the next 12 months? If yes, how many and who and how will they hire them?",
    folder: "General Info",
    dataType: "LARGE_TEXT",
    aliases: ["Hiring Plans"],
  },
  {
    key: "secondOwnerDob",
    name: "2nd Owner DOB",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Second Owner DOB", "Co-Guarantor Birthdate"],
  },
  {
    key: "secondOwnerSsn",
    name: "2nd Owner Social",
    folder: "General Info",
    dataType: "TEXT",
    sensitive: true,
    aliases: ["2nd Owner SSN", "Second Owner SSN", "Co-Guarantor SSN"],
  },
  {
    key: "businessStructure",
    name: "What is business Structure (LLC, Corporation, sole prop?)",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Business Structure", "Business Type", "Entity Type"],
  },
  {
    key: "dba",
    name: "Do you have a DBA?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["DBA", "Doing Business As"],
  },
  {
    key: "businessDescription",
    name: "Describe Business",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Type of Business", "Business Description"],
  },
  {
    key: "primaryBusiness",
    name: "Is this your primary business?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Primary Business"],
  },
  {
    key: "primaryBusinessExplanation",
    name: "If no, Explain",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Primary Business Explanation"],
  },
  {
    key: "filedBankruptcy",
    name: "Have you ever filed bankruptcy?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Filed Bankruptcy", "Current bankruptcy / child support?"],
  },
  {
    key: "hireVehicles",
    name: "Do you hire any vehicles?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Hire Vehicles"],
  },
  {
    key: "hireVehiclesExplanation",
    name: "If Yes, Explain",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Hire Vehicles Explanation"],
  },
  {
    key: "insuredId",
    name: "Insured ID",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["NowCerts Insured ID", "NowCerts ID"],
  },
  {
    key: "grossReceipts",
    name: "Gross Receipts expected for this coming year?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Expected Gross Receipts", "Gross Receipts"],
  },
  {
    key: "multiStateOperation",
    name: "Do you operate in more than one state?",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Multi State Operation"],
  },
  {
    key: "annualMileage",
    name: "Annual Mileage",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Total Annual Mileage"],
  },
  {
    key: "totalPowerUnits",
    name: "Total Power Units",
    folder: "General Info",
    dataType: "TEXT",
    aliases: ["Power Units"],
  },

  // ================= SECTION 04: OPERATION INFORMATION =================
  {
    key: "carrierType",
    name: "Are you a common carrier or contract hauler?",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Carrier Type", "Carrier Classification"],
  },
  {
    key: "regularRoute",
    name: "Do you operate over a regular route?",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Regular Route"],
  },
  {
    key: "doubleTripleTrailers",
    name: "Do you pull Double or Triple Trailers?",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Double or Triple Trailers"],
  },
  {
    key: "brokerageAuthority",
    name: "Does the insured have brokerage authority?",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Brokerage Authority"],
  },
  {
    key: "rentLeaseToOthers",
    name: "Do you rent or lease your vehicles to others?",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Rent or Lease Vehicles to Others"],
  },
  {
    key: "filingsRequired",
    name: "Filings Required (State/Federal)",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Filings Required"],
  },
  {
    key: "rangeOfTransport",
    name: "Range of Transport (Interstate or Intrastate?)",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Range of Transport"],
  },
  {
    key: "estimatedMileage",
    name: "Estimated Total Annual Mileage?",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Estimated Annual Mileage"],
  },
  {
    key: "timeZone",
    name: "Time zone",
    folder: "Operation Information",
    dataType: "TEXT",
    aliases: ["Carrier Time Zone"],
  },

  // ================= SECTION 05: RENEWAL QUOTE BUSINESS INFORMATION =================
  {
    key: "currentPolicyEndDate",
    name: "When does the current policy End?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Current Policy End Date", "Policy Expiration Date"],
  },
  {
    key: "changedOperatingName",
    name: "Have you ever changed your operating name?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Changed Operating Name"],
  },
  {
    key: "isSubsidiary",
    name: "Do you operate as a subsidiary of another company?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Is Subsidiary"],
  },
  {
    key: "subsidiaryName",
    name: "Which subsidiary?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["If yes — Which subsidiary?", "Subsidiary Name"],
  },
  {
    key: "otherOperations",
    name: "Do you own or manage any other transportation operations that are not covered?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Other Transportation Operations"],
  },
  {
    key: "otherOperationsDetails",
    name: "Which operations?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["If yes — Which operations?", "Other Operations Details"],
  },
  {
    key: "leaseAuthority",
    name: "Do you lease your authority?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Lease Authority"],
  },
  {
    key: "appointAgentsOrContractors",
    name: "Do you appoint agents or hire independent contractors to operate on your behalf?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Appoint Agents or Contractors"],
  },
  {
    key: "authorityChangesPast3Years",
    name: "Have you purchased, sold or applied for authority over the past 3 years?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Authority Changes Past 3 Years"],
  },
  {
    key: "authorityWithdrawnOrProbation",
    name: "Have you ever lost or had authority withdrawn or have you been/are under probation by any regulatory authority (FHWA, PUC, etc.)?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Authority Withdrawn or Probation"],
  },
  {
    key: "interchangeAgreements",
    name: "Do you have agreements with other carriers for interchange of equipment or transportation of loads?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Interchange Agreements"],
  },
  {
    key: "priorInsuranceCompany",
    name: "Have you ever had insurance under this business before? If so what company?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Prior Insurance Company", "Prior Carrier"],
  },
  {
    key: "cancelledOrNonRenewed",
    name: "Has insured been cancelled or non-renewed? If yes, provide details",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Cancelled or Non-Renewed"],
  },
  {
    key: "yearsPriorInsurance",
    name: "Years of Prior Insurance under this name?",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Years of Prior Insurance"],
  },
  {
    key: "unitsInsured",
    name: "# of units insured",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Units Insured"],
  },
  {
    key: "priorAmountPaid",
    name: "Amount Paid",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Prior Amount Paid", "Prior Premium"],
  },
  {
    key: "priorCoverType",
    name: "Cover Type",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Prior Cover Type"],
  },
  {
    key: "numberOfLosses",
    name: "# of losses",
    folder: "Renewal Quote Business Information",
    dataType: "TEXT",
    aliases: ["Number of Losses", "Loss Count"],
  },

  // ================= SECTIONS 06–09: REPEATABLE SCHEDULE SUMMARIES & MVR =================
  {
    key: "driversSummary",
    name: "Drivers Schedule Summary",
    folder: "QP Website — Intake Schedules",
    dataType: "LARGE_TEXT",
    aliases: ["Drivers Summary", "Driver List"],
  },
  {
    key: "vehiclesSummary",
    name: "Vehicles Schedule Summary",
    folder: "QP Website — Intake Schedules",
    dataType: "LARGE_TEXT",
    aliases: ["Vehicles Summary", "Vehicle List", "Fleet Schedule"],
  },
  {
    key: "policiesSummary",
    name: "Existing Policies Summary",
    folder: "QP Website — Intake Schedules",
    dataType: "LARGE_TEXT",
    aliases: ["Policies Summary", "Current Filings Summary"],
  },
  {
    key: "mvrAuthorizedLabel",
    name: "MVR Authorization Signed",
    folder: "QP Website — Intake Schedules",
    dataType: "TEXT",
    aliases: ["MVR Authorization", "MVR Consent"],
  },
  {
    key: "mvrDetailsSummary",
    name: "MVR Driver License Details",
    folder: "QP Website — Intake Schedules",
    dataType: "LARGE_TEXT",
    aliases: ["MVR Details"],
  },

  // ================= EQUIPMENT FINANCE CREDIT APPLICATION =================
  {
    key: "priceOfEquipment",
    name: "Price of Equipment ($)",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Equipment Price", "Price of Equipment"],
  },
  {
    key: "financingAmountRequested",
    name: "Financing Amount Requested ($)",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Financing Amount Requested", "Loan Amount Requested"],
  },
  {
    key: "downPaymentAmount",
    name: "Down Payment Amount ($)",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Equipment Down Payment", "Down Payment Amount"],
  },
  {
    key: "equipmentDescription",
    name: "Equipment / Vehicle Description",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Equipment / vehicle (year, make, model, VIN)", "Equipment Financed"],
  },
  {
    key: "vendorSeller",
    name: "Equipment Vendor / Seller",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Vendor / seller"],
  },
  {
    key: "vendorContactName",
    name: "Equipment Vendor Contact Name",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Vendor Contact Name"],
  },
  {
    key: "vendorPhone",
    name: "Equipment Vendor Phone",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Vendor Phone"],
  },
  {
    key: "vendorAddress",
    name: "Equipment Vendor Address",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Vendor Address"],
  },
  {
    key: "vendorCityStateZip",
    name: "Equipment Vendor City, State, Zip",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Vendor City State Zip"],
  },
  {
    key: "businessGoodStanding",
    name: "Business in Good Standing",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Is business in good standing / active?"],
  },
  {
    key: "numberOfEmployees",
    name: "Number of Employees",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["# of employees"],
  },
  {
    key: "mailingAddressCombined",
    name: "Business Mailing Address",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Mailing address (if different)"],
  },
  {
    key: "mainPhone",
    name: "Business Main Phone",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Company Phone"],
  },
  {
    key: "fax",
    name: "Business Fax",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Fax"],
  },
  {
    key: "businessEmail",
    name: "Business Email",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Company Email"],
  },
  {
    key: "majorityOwner",
    name: "Majority Owner",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Are you the majority-owner of the company?"],
  },
  {
    key: "positionAtCompany",
    name: "Position at Company",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["What is your current position at the company?", "Title / Position"],
  },
  {
    key: "repossessionsOrTaxLiens",
    name: "Repossessions or Tax Liens",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Any repossessions and / or tax liens?"],
  },
  {
    key: "liensExplanation",
    name: "Repossessions / Tax Liens Explanation",
    folder: "QP Website — Equipment Finance",
    dataType: "LARGE_TEXT",
    aliases: ["Reason for repossessions and / or tax liens (w/ date)"],
  },
  {
    key: "officersSummary",
    name: "Officers / Members (10%+ Ownership)",
    folder: "QP Website — Equipment Finance",
    dataType: "LARGE_TEXT",
    aliases: ["Officers Summary", "Ownership Breakdown"],
  },
  {
    key: "gHousing",
    name: "Guarantor Housing (Own/Rent)",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Homeowner or renting?"],
  },
  {
    key: "guarantorFullHomeAddress",
    name: "Guarantor Home Address",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Primary home address"],
  },
  {
    key: "gMobilePhone",
    name: "Guarantor Mobile Phone",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: [],
  },
  {
    key: "coGuarantorSummary",
    name: "Co-Guarantor Details",
    folder: "QP Website — Equipment Finance",
    dataType: "LARGE_TEXT",
    aliases: ["Co-Guarantor Information"],
  },
  {
    key: "guarantorSignature",
    name: "Guarantor E-Signature",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["Guarantor signature (type full legal name)"],
  },
  {
    key: "guarantorSignatureDate",
    name: "Guarantor Signature Date",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: [],
  },
  {
    key: "coGuarantorSignature",
    name: "Co-Guarantor E-Signature",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: [],
  },
  {
    key: "ecoaAcknowledged",
    name: "ECOA & Credit Authorization Signed",
    folder: "QP Website — Equipment Finance",
    dataType: "TEXT",
    aliases: ["ECOA Acknowledged"],
  },
];

/**
 * Repeatable Custom Object property labels in NowCerts / Momentum CRM snapshots
 * (`Driver`, `Vehicle`, `Existing Policies` / `Policies`).
 */
const CUSTOM_OBJECT_DEFS = {
  driver: {
    objectNames: ["driver", "drivers"],
    fields: [
      { key: "name", labels: ["Driver Name", "Name", "Full Name"] },
      { key: "dob", labels: ["Date of Birth", "DOB", "Birthdate"] },
      { key: "dlNumber", labels: ["DL#", "DL Number", "Driver License Number", "License Number"] },
      { key: "dlState", labels: ["Driver License State", "DL State", "License State", "State"] },
      { key: "email", labels: ["Email (for MVR permission)", "Email"] },
      { key: "phone", labels: ["Phone # (For MVR Permission)", "Phone"] },
      { key: "cdlClass", labels: ["CDL Class (A,B,C)", "CDL Class"] },
      { key: "expYears", labels: ["# of years exp with CDL Class", "CDL Experience Years", "Experience"] },
      { key: "hireDate", labels: ["Date of Hire", "Hire Date"] },
      { key: "violations", labels: ["# of Violations", "Violations"] },
      { key: "accidents", labels: ["# of Accidents", "Accidents"] },
      { key: "accidentDetails", labels: ["Details of Accidents?", "Accident Details"] },
      { key: "ownerOperator", labels: ["Owner Operator?", "Owner Operator"] },
    ],
  },
  vehicle: {
    objectNames: ["vehicle", "vehicles", "equipment", "auto"],
    fields: [
      { key: "year", labels: ["Year", "Model Year"] },
      { key: "make", labels: ["Make"] },
      { key: "model", labels: ["Model"] },
      { key: "purchaseDate", labels: ["Date Purchased", "Purchase Date"] },
      { key: "purchaseCost", labels: ["Cost When Purchased", "Purchase Cost", "Original Cost"] },
      { key: "specialEquipmentValue", labels: ["Value of Permanently attached special equipment", "Special Equipment Value"] },
      { key: "bodyType", labels: ["Body Type", "Vehicle Type"] },
      { key: "vin", labels: ["17 digit VIN", "VIN", "VIN Number"] },
      { key: "rearAxles", labels: ["Number of rear axles", "Rear Axles"] },
      { key: "abs", labels: ["Does the vehicle have anti-lock brakes?", "Anti-Lock Brakes", "ABS"] },
      { key: "airbags", labels: ["Does the vehicle have airbags?", "Airbags"] },
      { key: "gvw", labels: ["GVW", "Gross Vehicle Weight"] },
      { key: "statedValue", labels: ["Stated Value", "Vehicle Value"] },
      { key: "maxRadius", labels: ["Max Radius", "Radius"] },
      { key: "owner", labels: ["Owner of Vehicle", "Vehicle Owner"] },
      { key: "lossPayee", labels: ["Loss Payee", "Lienholder"] },
    ],
  },
  policy: {
    objectNames: ["existing_policies", "existingpolicies", "policy", "policies"],
    fields: [
      { key: "number", labels: ["Policy Number", "Policy #"] },
      { key: "status", labels: ["Status", "Policy Status"] },
      { key: "effectiveDate", labels: ["Effective Date"] },
      { key: "expirationDate", labels: ["Expiration Date"] },
      { key: "cancellationDate", labels: ["Cancellation Date"] },
      { key: "agent", labels: ["Agent"] },
      { key: "csr", labels: ["CSR"] },
      { key: "lob", labels: ["Line of Business", "LOB"] },
      { key: "lobClass", labels: ["LOB Class"] },
      { key: "limit", labels: ["Coverage Limit (FMCSA filing)", "Coverage Limit", "Limit"] },
      { key: "carrier", labels: ["Carrier Name", "Carrier", "Insurance Company"] },
      { key: "mga", labels: ["MGA"] },
      { key: "businessType", labels: ["Business Type"] },
      { key: "commission", labels: ["Commission"] },
      { key: "totalPremium", labels: ["Total Premium"] },
      { key: "rwlQt", labels: ["RWL_Qt"] },
      { key: "rwlPol", labels: ["RWL_Pol"] },
      { key: "percentChange", labels: ["Percentage Change"] },
      { key: "premium", labels: ["Policy Premium", "Premium"] },
      { key: "referralSource", labels: ["Referral Source"] },
      { key: "referralContact", labels: ["Referral Source Contact"] },
      { key: "primaryOffice", labels: ["Primary Office"] },
      { key: "databaseId", labels: ["Database ID"] },
    ],
  },
};

function str(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function firstNonEmpty(...values) {
  for (const v of values) {
    const s = str(v);
    if (s) return s;
  }
  return "";
}

/** Canonical alphanumeric token for fuzzy label / fieldKey matching. */
function normalizeToken(label) {
  return String(label || "")
    .toLowerCase()
    .replace(/^contact\./, "")
    .replace(/^custom_objects\.[^.]+\./, "")
    .replace(/^question\s*\d+\s*[-—:]\s*/i, "")
    .replace(/[^a-z0-9]+/g, "");
}

function slugTag(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/™/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Splits a full name string ("Jordan A. Reeves") into `{ firstName, lastName }`. */
function splitFullName(fullName) {
  const clean = str(fullName).replace(/\s+/g, " ");
  if (!clean) return { firstName: "", lastName: "" };
  const parts = clean.split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** Parses `"Louisville, KY 40202"` or `"Louisville KY 40202-1234"` when structured fields aren't separate. */
function parseCityStateZip(raw) {
  const clean = str(raw);
  if (!clean) return { city: "", state: "", postalCode: "" };
  const match = /^(.+?)[,\s]+([A-Za-z]{2})\s+(\d{5}(?:-\d{4})?)$/.exec(clean);
  if (match) {
    return {
      city: match[1].replace(/,\s*$/, "").trim(),
      state: match[2].toUpperCase(),
      postalCode: match[3],
    };
  }
  const cityState = /^(.+?),\s*([A-Za-z]{2})$/.exec(clean);
  if (cityState) {
    return { city: cityState[1].trim(), state: cityState[2].toUpperCase(), postalCode: "" };
  }
  return { city: clean, state: "", postalCode: "" };
}

/** Normalizes US 10-digit numbers to E.164 (`+15025550134`), keeping international/custom strings safe. */
function normalizePhone(raw) {
  const clean = str(raw);
  if (!clean) return "";
  const digits = clean.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (clean.startsWith("+") && digits.length >= 8) return `+${digits}`;
  return clean;
}

/** Normalizes common date inputs (`YYYY-MM-DD`, `MM/DD/YYYY`, `Sep 18, 2026`) to ISO `YYYY-MM-DD` when valid. */
function normalizeIsoDate(raw) {
  const clean = str(raw);
  if (!clean) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
  const mdy = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(clean);
  if (mdy) {
    const mm = mdy[1].padStart(2, "0");
    const dd = mdy[2].padStart(2, "0");
    return `${mdy[3]}-${mm}-${dd}`;
  }
  const parsed = Date.parse(clean);
  if (!Number.isNaN(parsed)) {
    const d = new Date(parsed);
    const yyyy = d.getUTCFullYear();
    if (yyyy >= 1900 && yyyy <= 2100) {
      return d.toISOString().slice(0, 10);
    }
  }
  return "";
}

function normalizeCountry(raw) {
  const clean = str(raw);
  if (!clean) return "US";
  if (/^(us|usa|u\.s\.a\.?|united states|united states of america)$/i.test(clean)) return "US";
  return clean;
}

/** Masks SSN values (`123-45-6789` -> `•••-••-6789`) in human-readable Notes while keeping full value on restricted SSN custom field. */
function maskSensitive(raw) {
  const digits = str(raw).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length >= 4) return `•••-••-${digits.slice(-4)}`;
  return "•••";
}

function formatRecordsSummary(records, defs) {
  if (!Array.isArray(records) || records.length === 0) return "";
  return records
    .map((rec, idx) => {
      const n = rec.index || idx + 1;
      const parts = [];
      for (const f of defs) {
        const v = str(rec[f.key]);
        if (v) parts.push(`${f.labels[0]}: ${v}`);
      }
      return parts.length ? `#${n} — ${parts.join(" | ")}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * Normalizes any website form submission into standard GoHighLevel Contact fields,
 * normalized custom field values, CRM routing tags, and a structured Contact Note.
 *
 * @param {Record<string, unknown>} payload
 * @param {Array<{ name: string; type: string; bytes: number }>} [documents]
 */
function normalizeSubmission(payload, documents = []) {
  const nested =
    payload.formData && typeof payload.formData === "object" && !Array.isArray(payload.formData)
      ? /** @type {Record<string, unknown>} */ (payload.formData)
      : {};
  const merged = { ...nested, ...payload };
  delete merged.formData;

  const isIntake = payload.formType === "insurance-intake";
  const isEquipFinance = payload.source === "equipment-finance" || Boolean(payload.priceOfEquipment || payload.guarantorSignature);
  const isQuote = payload.source === "quote";

  /** @type {"insurance-intake" | "insurance-quote" | "equipment-finance" | "consultation"} */
  const formKind = isIntake
    ? "insurance-intake"
    : isQuote
      ? "insurance-quote"
      : isEquipFinance
        ? "equipment-finance"
        : "consultation";

  const formLabels = {
    "insurance-intake": "Full Commercial Trucking Insurance Intake",
    "insurance-quote": "Quick Trucking Insurance Quote",
    "equipment-finance": "Heavy Equipment Purchase Finance Credit Application",
    consultation: "Website Consultation / Service Inquiry",
  };

  const splitPrimary = splitFullName(firstNonEmpty(merged.name));
  const firstName = firstNonEmpty(merged.firstName, merged["First name"], splitPrimary.firstName);
  const lastName = firstNonEmpty(merged.lastName, merged["Last name"], splitPrimary.lastName);
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || str(merged.name);

  const splitSecond = splitFullName(merged.cgName);
  const secondOwnerFirstName = firstNonEmpty(merged.secondOwnerFirstName, splitSecond.firstName);
  const secondOwnerLastName = firstNonEmpty(merged.secondOwnerLastName, splitSecond.lastName);

  const bizCsz = parseCityStateZip(merged.businessCityStateZip);
  const guarCsz = parseCityStateZip(merged.gHomeCityStateZip);

  const address1 = firstNonEmpty(merged.mailingStreet, merged.businessAddress, merged.gHomeAddress);
  const city = firstNonEmpty(merged.mailingCity, bizCsz.city, guarCsz.city);
  const state = firstNonEmpty(merged.mailingState, bizCsz.state, guarCsz.state);
  const postalCode = firstNonEmpty(merged.mailingZip, bizCsz.postalCode, guarCsz.postalCode);
  const country = normalizeCountry(merged.mailingCountry);

  const companyName = firstNonEmpty(merged.company, merged.businessName, merged.generalBusinessName);
  const dobIso = normalizeIsoDate(firstNonEmpty(merged.dob, merged.gBirthdate));
  const rawDot = firstNonEmpty(merged.dotNumber, merged.dot);
  const cleanDot = rawDot.replace(/^usdot\s*#?\s*/i, "").trim();

  /** @type {string[]} */
  const tags = ["website-lead", formKind];
  if (formKind === "insurance-intake" || formKind === "insurance-quote") {
    tags.push("trucking-insurance", "nowcerts-prospect");
  }
  if (formKind === "equipment-finance") {
    tags.push("qp-capital");
  }
  if (str(merged.service)) {
    const svcSlug = slugTag(merged.service);
    if (svcSlug) tags.push(`service-${svcSlug}`);
  }

  const drivers = Array.isArray(payload.drivers) ? payload.drivers : [];
  const vehicles = Array.isArray(payload.vehicles) ? payload.vehicles : [];
  const existingPolicies = Array.isArray(payload.existingPolicies) ? payload.existingPolicies : [];

  const driversSummary = formatRecordsSummary(drivers, CUSTOM_OBJECT_DEFS.driver.fields);
  const vehiclesSummary = formatRecordsSummary(vehicles, CUSTOM_OBJECT_DEFS.vehicle.fields);
  const policiesSummary = formatRecordsSummary(existingPolicies, CUSTOM_OBJECT_DEFS.policy.fields);

  const officersLines = [1, 2, 3]
    .map((n) => {
      const oName = str(merged[`officer${n}Name`]);
      const oTitle = str(merged[`officer${n}Title`]);
      const oPct = str(merged[`officer${n}Ownership`]);
      if (!oName && !oTitle && !oPct) return "";
      return `Officer #${n}: ${[oName, oTitle, oPct ? `${oPct}% ownership` : ""].filter(Boolean).join(" · ")}`;
    })
    .filter(Boolean)
    .join("\n");

  const coGuarantorLines = [
    str(merged.cgName) ? `Name: ${str(merged.cgName)}` : "",
    str(merged.cgBirthdate) ? `DOB: ${str(merged.cgBirthdate)}` : "",
    str(merged.cgSsn) ? `SSN: ${maskSensitive(merged.cgSsn)}` : "",
    str(merged.cgHousing) ? `Housing: ${str(merged.cgHousing)}` : "",
    [str(merged.cgHomeAddress), str(merged.cgHomeCityStateZip)].filter(Boolean).join(", ")
      ? `Address: ${[str(merged.cgHomeAddress), str(merged.cgHomeCityStateZip)].filter(Boolean).join(", ")}`
      : "",
    str(merged.cgMainPhone) ? `Main Phone: ${str(merged.cgMainPhone)}` : "",
    str(merged.cgMobilePhone) ? `Mobile: ${str(merged.cgMobilePhone)}` : "",
    str(merged.cgEmail) ? `Email: ${str(merged.cgEmail)}` : "",
    str(merged.cgBankruptcyChildSupport) ? `Bankruptcy/Child Support: ${str(merged.cgBankruptcyChildSupport)}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  const mvrDetailsSummary = [1, 2]
    .map((n) => {
      const dl = str(merged[`mvr_driver_${n}_dl`]);
      const st = str(merged[`mvr_driver_${n}_state`]);
      const hire = str(merged[`mvr_driver_${n}_hireDate`]);
      const mDob = str(merged[`mvr_driver_${n}_dob`]);
      if (!dl && !st && !hire && !mDob) return "";
      return `Driver #${n}: ${[dl ? `DL ${dl}` : "", st ? `State ${st}` : "", hire ? `Hired ${hire}` : "", mDob ? `DOB ${mDob}` : ""].filter(Boolean).join(" · ")}`;
    })
    .filter(Boolean)
    .join("\n");

  /** @type {Record<string, string>} */
  const fieldValues = {};
  for (const [k, v] of Object.entries(merged)) {
    if (v !== undefined && v !== null && typeof v !== "object" && str(v) !== "") {
      fieldValues[k] = str(v);
    }
  }

  // Enriched cross-form normalized keys so every form populates shared CRM fields cleanly.
  if (cleanDot) fieldValues.dotNumber = cleanDot;
  if (companyName) fieldValues.businessName = firstNonEmpty(merged.businessName, companyName);
  if (secondOwnerFirstName) fieldValues.secondOwnerFirstName = secondOwnerFirstName;
  if (secondOwnerLastName) fieldValues.secondOwnerLastName = secondOwnerLastName;
  fieldValues.formCategoryLabel = formLabels[formKind];

  if (str(merged.taxId) && !fieldValues.ein) fieldValues.ein = str(merged.taxId);
  if (str(merged.businessType) && !fieldValues.businessStructure) fieldValues.businessStructure = str(merged.businessType);
  if (str(merged.dateEstablished) && !fieldValues.dateBusinessStarted) fieldValues.dateBusinessStarted = str(merged.dateEstablished);
  if (str(merged.typeOfBusiness) && !fieldValues.businessDescription) fieldValues.businessDescription = str(merged.typeOfBusiness);
  if (str(merged.gSsn) && !fieldValues.ownerSsn) fieldValues.ownerSsn = str(merged.gSsn);
  if (str(merged.cgSsn) && !fieldValues.secondOwnerSsn) fieldValues.secondOwnerSsn = str(merged.cgSsn);
  if (str(merged.cgBirthdate) && !fieldValues.secondOwnerDob) fieldValues.secondOwnerDob = str(merged.cgBirthdate);
  if (str(merged.gBankruptcyChildSupport) && !fieldValues.filedBankruptcy) {
    fieldValues.filedBankruptcy = str(merged.gBankruptcyChildSupport);
  }
  if (str(merged.mailingAddress) || str(merged.mailingCityStateZip)) {
    fieldValues.mailingAddressCombined = [str(merged.mailingAddress), str(merged.mailingCityStateZip)].filter(Boolean).join(", ");
  }
  if (str(merged.gHomeAddress) || str(merged.gHomeCityStateZip)) {
    fieldValues.guarantorFullHomeAddress = [str(merged.gHomeAddress), str(merged.gHomeCityStateZip)].filter(Boolean).join(", ");
  }
  if (officersLines) fieldValues.officersSummary = officersLines;
  if (coGuarantorLines) fieldValues.coGuarantorSummary = coGuarantorLines;
  if (merged.acknowledged) {
    fieldValues.ecoaAcknowledged = merged.acknowledged === "on" || merged.acknowledged === true ? "Yes" : str(merged.acknowledged);
  }
  if (typeof merged.mvrAuthorized === "boolean") {
    fieldValues.mvrAuthorizedLabel = merged.mvrAuthorized ? "Yes" : "No";
  }
  if (mvrDetailsSummary) fieldValues.mvrDetailsSummary = mvrDetailsSummary;
  if (driversSummary) fieldValues.driversSummary = driversSummary;
  if (vehiclesSummary) fieldValues.vehiclesSummary = vehiclesSummary;
  if (policiesSummary) fieldValues.policiesSummary = policiesSummary;

  const standardContact = {
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    name: fullName || undefined,
    email: str(merged.email) || undefined,
    phone: normalizePhone(merged.phone) || undefined,
    companyName: companyName || undefined,
    address1: address1 || undefined,
    city: city || undefined,
    state: state || undefined,
    postalCode: postalCode || undefined,
    country: country || undefined,
    ...(dobIso ? { dateOfBirth: dobIso } : {}),
    ...(str(merged.website) ? { website: str(merged.website) } : {}),
    source: firstNonEmpty(merged.contactSource, `Website — ${formLabels[formKind]}`),
    tags: Array.from(new Set(tags)),
  };

  const noteBody = buildContactNote({
    formLabel: formLabels[formKind],
    page: str(merged.page),
    standardContact,
    fieldValues,
    driversSummary,
    vehiclesSummary,
    policiesSummary,
    fmcsaFilledFields: Array.isArray(payload.fmcsaFilledFields) ? payload.fmcsaFilledFields : [],
    documents,
  });

  return {
    formKind,
    formLabel: formLabels[formKind],
    standardContact,
    fieldValues,
    drivers,
    vehicles,
    existingPolicies,
    noteBody,
  };
}

/**
 * Formats a clean, complete Contact Note in Momentum CRM so agents see every single
 * submitted field, schedule card, FMCSA badge, and attachment filename immediately.
 */
function buildContactNote({
  formLabel,
  page,
  standardContact,
  fieldValues,
  driversSummary,
  vehiclesSummary,
  policiesSummary,
  fmcsaFilledFields,
  documents,
}) {
  const lines = [
    `=== ${formLabel.toUpperCase()} ===`,
    `Submitted: ${new Date().toISOString()}${page ? ` · Page: ${page}` : ""}`,
    "",
    "-- Contact & Business --",
  ];

  const headerPairs = [
    ["Contact Name", standardContact.name],
    ["Company", standardContact.companyName],
    ["Phone", standardContact.phone],
    ["Email", standardContact.email],
    [
      "Address",
      [standardContact.address1, standardContact.city, standardContact.state, standardContact.postalCode]
        .filter(Boolean)
        .join(", "),
    ],
  ];
  for (const [k, v] of headerPairs) {
    if (v) lines.push(`${k}: ${v}`);
  }

  const skipInScalarDump = new Set([
    "driversSummary",
    "vehiclesSummary",
    "policiesSummary",
    "formCategoryLabel",
  ]);
  const sensitiveKeys = new Set(FIELD_CATALOG.filter((f) => f.sensitive).map((f) => f.key));
  sensitiveKeys.add("gSsn");
  sensitiveKeys.add("cgSsn");

  const fmcsaSet = new Set(fmcsaFilledFields || []);
  const detailLines = [];
  for (const entry of FIELD_CATALOG) {
    if (skipInScalarDump.has(entry.key)) continue;
    const rawVal = fieldValues[entry.key];
    if (!rawVal) continue;
    const displayVal = sensitiveKeys.has(entry.key) ? maskSensitive(rawVal) : rawVal;
    const badge = fmcsaSet.has(entry.key) ? " [FMCSA]" : "";
    detailLines.push(`${entry.name}: ${displayVal}${badge}`);
  }

  if (detailLines.length) {
    lines.push("", "-- Form & Custom Field Details --", ...detailLines);
  }
  if (driversSummary) {
    lines.push("", "-- Drivers Schedule --", driversSummary);
  }
  if (vehiclesSummary) {
    lines.push("", "-- Vehicles Schedule --", vehiclesSummary);
  }
  if (policiesSummary) {
    lines.push("", "-- Existing Policies / Filings --", policiesSummary);
  }
  if (documents && documents.length) {
    lines.push(
      "",
      "-- Uploaded Documents (Emailed to Agent Inbox) --",
      documents.map((d) => `• ${d.name} (${Math.max(1, Math.round(d.bytes / 1024))} KB)`).join("\n")
    );
  }

  return lines.join("\n");
}

/**
 * Coerces a candidate string value to satisfy GoHighLevel's custom field `dataType`
 * validation rules. Returns `undefined` when a value cannot safely fit a strict type
 * (the original value is always preserved on the Contact Note).
 */
function coerceValueForGhlField(rawValue, remoteField) {
  const value = str(rawValue);
  if (!value) return undefined;
  const dataType = String(remoteField?.dataType || "TEXT").toUpperCase();

  if (dataType === "NUMERICAL" || dataType === "MONETORY" || dataType === "MONETARY") {
    const cleaned = value.replace(/[$,%\s,]/g, "");
    const numMatch = /^-?\d+(?:\.\d+)?$/.exec(cleaned);
    if (!numMatch) return undefined;
    return Number(numMatch[0]);
  }

  if (dataType === "DATE") {
    const iso = normalizeIsoDate(value);
    return iso || undefined;
  }

  const options = Array.isArray(remoteField?.picklistOptions) ? remoteField.picklistOptions : [];
  if ((dataType === "SINGLE_OPTIONS" || dataType === "RADIO") && options.length > 0) {
    const exact = options.find((opt) => String(opt).trim().toLowerCase() === value.toLowerCase());
    if (exact !== undefined) return String(exact);
    const fuzzy = options.find((opt) => normalizeToken(opt) === normalizeToken(value));
    if (fuzzy !== undefined) return String(fuzzy);
    return undefined;
  }

  if ((dataType === "MULTIPLE_OPTIONS" || dataType === "CHECKBOX") && options.length > 0) {
    const parts = value.split(/[,;|]+/).map((p) => p.trim()).filter(Boolean);
    const matched = parts
      .map((p) => options.find((opt) => normalizeToken(opt) === normalizeToken(p)))
      .filter((v) => v !== undefined)
      .map(String);
    return matched.length > 0 ? matched : undefined;
  }

  return value;
}

/**
 * Dynamically matches live Momentum CRM custom fields against `FIELD_CATALOG` + any
 * raw form field keys (`driver_1_name`, custom keys, etc.).
 *
 * @param {any[]} remoteFields
 * @param {Record<string, string>} fieldValues
 */
function matchCustomFields(remoteFields, fieldValues) {
  /** @type {Map<string, any[]>} */
  const tokenIndex = new Map();
  for (const rf of remoteFields || []) {
    if (!rf || !rf.id || rf.documentType === "folder") continue;
    const tokens = new Set([
      normalizeToken(rf.name),
      normalizeToken(rf.fieldKey),
    ]);
    for (const tok of tokens) {
      if (!tok) continue;
      if (!tokenIndex.has(tok)) tokenIndex.set(tok, []);
      tokenIndex.get(tok).push(rf);
    }
  }

  const usedIds = new Set();
  /** @type {Array<{ id: string; key?: string; field_value: unknown }>} */
  const mapped = [];

  const tryBind = (candidates, value) => {
    if (!str(value)) return;
    for (const candidate of candidates) {
      const matches = tokenIndex.get(normalizeToken(candidate)) || [];
      for (const rf of matches) {
        if (usedIds.has(rf.id)) continue;
        const coerced = coerceValueForGhlField(value, rf);
        if (coerced === undefined) continue;
        usedIds.add(rf.id);
        mapped.push({
          id: rf.id,
          ...(rf.fieldKey ? { key: rf.fieldKey } : {}),
          field_value: coerced,
        });
      }
    }
  };

  for (const entry of FIELD_CATALOG) {
    const val = fieldValues[entry.key];
    if (!val) continue;
    tryBind([entry.key, entry.name, ...(entry.aliases || [])], val);
  }

  // Also map any additional custom fields matching raw keys (e.g. `driver_1_name` or custom CRM fields).
  for (const [rawKey, rawVal] of Object.entries(fieldValues)) {
    if (!rawVal) continue;
    tryBind([rawKey], rawVal);
  }

  return mapped;
}

async function ghlRequest(fetchImpl, token, method, pathName, body) {
  const res = await fetchImpl(`${GHL_API_BASE}${pathName}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = {};
  }
  return { ok: res.ok, status: res.status, json };
}

async function loadContactCustomFields(fetchImpl, token, locationId, forceRefresh = false) {
  const cached = customFieldCache.get(locationId);
  if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
    return cached.fields;
  }
  const res = await ghlRequest(
    fetchImpl,
    token,
    "GET",
    `/locations/${encodeURIComponent(locationId)}/customFields?model=contact`
  );
  if (!res.ok) {
    throw new Error(`Momentum customFields lookup responded ${res.status}`);
  }
  const fields = Array.isArray(res.json.customFields) ? res.json.customFields : [];
  customFieldCache.set(locationId, { expiresAt: Date.now() + SCHEMA_CACHE_TTL_MS, fields });
  return fields;
}

/**
 * Inspects Momentum CRM's live custom fields and optionally creates organized folders
 * & missing custom fields so 100% of website form fields map into dedicated CRM fields.
 */
async function syncCustomFieldsSchema({
  token,
  locationId = DEFAULT_MOMENTUM_LOCATION_ID,
  createMissing = false,
  fetchImpl = globalThis.fetch,
}) {
  const existing = await loadContactCustomFields(fetchImpl, token, locationId, true);
  const tokenToField = new Map();
  const folderNameToId = new Map();

  for (const item of existing) {
    if (!item) continue;
    if (item.documentType === "folder") {
      folderNameToId.set(normalizeToken(item.name), item.id);
      continue;
    }
    tokenToField.set(normalizeToken(item.name), item);
    if (item.fieldKey) tokenToField.set(normalizeToken(item.fieldKey), item);
  }

  const matched = [];
  const missing = [];
  const created = [];

  for (const entry of FIELD_CATALOG) {
    const candidates = [entry.key, entry.name, ...(entry.aliases || [])];
    const found = candidates.map((c) => tokenToField.get(normalizeToken(c))).find(Boolean);
    if (found) {
      matched.push({ key: entry.key, name: entry.name, crmId: found.id, crmName: found.name, crmKey: found.fieldKey });
    } else {
      missing.push(entry);
    }
  }

  if (createMissing && missing.length > 0) {
    for (const entry of missing) {
      let parentId = folderNameToId.get(normalizeToken(entry.folder));
      if (!parentId && entry.folder) {
        const folderRes = await ghlRequest(
          fetchImpl,
          token,
          "POST",
          `/locations/${encodeURIComponent(locationId)}/customFields`,
          { name: entry.folder, documentType: "folder", model: "contact" }
        );
        if (folderRes.ok && folderRes.json?.customFieldFolder?.id) {
          parentId = folderRes.json.customFieldFolder.id;
        } else if (folderRes.ok && folderRes.json?.id) {
          parentId = folderRes.json.id;
        }
        if (parentId) folderNameToId.set(normalizeToken(entry.folder), parentId);
      }

      const createBody = {
        name: entry.name,
        dataType: entry.dataType || "TEXT",
        documentType: "field",
        model: "contact",
        ...(parentId ? { parentId } : {}),
      };
      const fieldRes = await ghlRequest(
        fetchImpl,
        token,
        "POST",
        `/locations/${encodeURIComponent(locationId)}/customFields`,
        createBody
      );
      if (fieldRes.ok) {
        const cf = fieldRes.json?.customField || fieldRes.json;
        created.push({ key: entry.key, name: entry.name, crmId: cf?.id, crmKey: cf?.fieldKey });
      }
    }
    customFieldCache.delete(locationId);
  }

  return {
    locationId,
    totalCatalogFields: FIELD_CATALOG.length,
    matchedCount: matched.length,
    missingCount: missing.length - created.length,
    createdCount: created.length,
    matched,
    missing: createMissing ? missing.filter((m) => !created.some((c) => c.key === m.key)) : missing,
    created,
  };
}

/**
 * Syncs repeatable `Driver`, `Vehicle`, and `Existing Policies` cards into Momentum CRM
 * Custom Objects when those Custom Object schemas exist on the location.
 */
async function syncRepeatableCustomObjects({ fetchImpl, token, locationId, contactId, normalized }) {
  const hasAny =
    normalized.drivers.length > 0 || normalized.vehicles.length > 0 || normalized.existingPolicies.length > 0;
  if (!hasAny) return;

  let objects = customObjectCache.get(locationId)?.objects;
  if (!objects) {
    const listRes = await ghlRequest(
      fetchImpl,
      token,
      "GET",
      `/objects/?locationId=${encodeURIComponent(locationId)}`
    );
    if (!listRes.ok) return;
    objects = Array.isArray(listRes.json?.objects) ? listRes.json.objects : [];
    customObjectCache.set(locationId, { expiresAt: Date.now() + SCHEMA_CACHE_TTL_MS, objects });
  }

  const batches = [
    { kind: "driver", records: normalized.drivers, def: CUSTOM_OBJECT_DEFS.driver },
    { kind: "vehicle", records: normalized.vehicles, def: CUSTOM_OBJECT_DEFS.vehicle },
    { kind: "policy", records: normalized.existingPolicies, def: CUSTOM_OBJECT_DEFS.policy },
  ];

  for (const batch of batches) {
    if (!batch.records.length) continue;
    const targetNames = new Set(batch.def.objectNames.map(normalizeToken));
    const schemaSummary = objects.find(
      (obj) =>
        targetNames.has(normalizeToken(obj?.key)) ||
        targetNames.has(normalizeToken(obj?.labels?.singular)) ||
        targetNames.has(normalizeToken(obj?.labels?.plural))
    );
    if (!schemaSummary?.key) continue;

    const schemaRes = await ghlRequest(
      fetchImpl,
      token,
      "GET",
      `/objects/${encodeURIComponent(schemaSummary.key)}?locationId=${encodeURIComponent(locationId)}`
    );
    if (!schemaRes.ok) continue;

    const schemaFields = Array.isArray(schemaRes.json?.fields) ? schemaRes.json.fields : [];
    const propLookup = new Map();
    for (const sf of schemaFields) {
      const shortKey = String(sf.fieldKey || "").split(".").pop();
      if (!shortKey) continue;
      propLookup.set(normalizeToken(sf.name), shortKey);
      propLookup.set(normalizeToken(shortKey), shortKey);
    }

    const assocRes = await ghlRequest(
      fetchImpl,
      token,
      "GET",
      `/associations/objectKey/${encodeURIComponent(schemaSummary.key)}?locationId=${encodeURIComponent(locationId)}`
    );
    const associations = Array.isArray(assocRes.json?.associations) ? assocRes.json.associations : [];
    const contactAssoc = associations.find(
      (a) => a.firstObjectKey === "contact" || a.secondObjectKey === "contact"
    );

    for (const card of batch.records) {
      /** @type {Record<string, unknown>} */
      const properties = {};
      for (const fDef of batch.def.fields) {
        const val = str(card[fDef.key]);
        if (!val) continue;
        const propKey = [fDef.key, ...fDef.labels]
          .map((lbl) => propLookup.get(normalizeToken(lbl)))
          .find(Boolean);
        if (propKey) properties[propKey] = val;
      }
      if (Object.keys(properties).length === 0) continue;

      const createRec = await ghlRequest(
        fetchImpl,
        token,
        "POST",
        `/objects/${encodeURIComponent(schemaSummary.key)}/records`,
        { locationId, properties }
      );
      const recordId = createRec.json?.record?.id || createRec.json?.id;
      if (createRec.ok && recordId && contactAssoc?.id) {
        const contactFirst = contactAssoc.firstObjectKey === "contact";
        await ghlRequest(fetchImpl, token, "POST", "/associations/relations", {
          locationId,
          associationId: contactAssoc.id,
          firstRecordId: contactFirst ? contactId : recordId,
          secondRecordId: contactFirst ? recordId : contactId,
        });
      }
    }
  }
}

/**
 * Upserts the Contact in Momentum CRM, handling both location configurations:
 *  - Default deduplication ON  -> `POST /contacts/upsert`
 *  - "Allow Duplicate Contacts" ON (`400`) -> `GET /contacts/` search + `PUT` / `POST`
 *  - Strict field validation (`422`) -> automatic safe retry without rejected custom fields
 */
async function upsertMomentumContact(fetchImpl, token, locationId, standardContact, customFields) {
  const baseBody = {
    locationId,
    ...standardContact,
    ...(customFields.length > 0 ? { customFields } : {}),
  };

  let res = await ghlRequest(fetchImpl, token, "POST", "/contacts/upsert", baseBody);

  // If a custom field or non-E.164 phone triggered 422, retry cleanly so the lead is never lost.
  if (res.status === 422) {
    const safePhone = standardContact.phone?.startsWith("+") ? standardContact.phone : undefined;
    res = await ghlRequest(fetchImpl, token, "POST", "/contacts/upsert", {
      locationId,
      ...standardContact,
      phone: safePhone,
    });
  }

  // Locations with "Allow Duplicate Contacts" enabled reject /contacts/upsert with HTTP 400.
  if (res.status === 400) {
    const query = standardContact.email || standardContact.phone || "";
    let existingId = "";
    if (query) {
      const searchRes = await ghlRequest(
        fetchImpl,
        token,
        "GET",
        `/contacts/?locationId=${encodeURIComponent(locationId)}&query=${encodeURIComponent(query)}&limit=1`
      );
      if (searchRes.ok && Array.isArray(searchRes.json?.contacts) && searchRes.json.contacts[0]?.id) {
        existingId = searchRes.json.contacts[0].id;
      }
    }

    if (existingId) {
      res = await ghlRequest(fetchImpl, token, "PUT", `/contacts/${encodeURIComponent(existingId)}`, {
        ...standardContact,
        ...(customFields.length > 0 ? { customFields } : {}),
      });
    } else {
      res = await ghlRequest(fetchImpl, token, "POST", "/contacts/", baseBody);
    }
  }

  if (!res.ok) {
    throw new Error(`Momentum contact upsert responded ${res.status}`);
  }

  const contactId = res.json?.contact?.id || res.json?.id;
  if (!contactId) {
    throw new Error("Momentum contact upsert returned no contact id");
  }
  return contactId;
}

/**
 * Full end-to-end delivery of any website form submission into Momentum CRM
 * (GoHighLevel / LeadConnector v2 API).
 *
 * @param {Record<string, unknown>} payload
 * @param {{
 *   documents?: Array<{ name: string; type: string; bytes: number }>;
 *   fetchImpl?: typeof globalThis.fetch;
 *   env?: Record<string, string | undefined>;
 * }} [options]
 */
async function sendToMomentumCrm(payload, options = {}) {
  const env = options.env || process.env;
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const token = str(env.GHL_PRIVATE_INTEGRATION_TOKEN);
  const locationId = str(env.GHL_LOCATION_ID) || DEFAULT_MOMENTUM_LOCATION_ID;

  if (!token) {
    throw new Error("GHL_PRIVATE_INTEGRATION_TOKEN is not configured");
  }

  const normalized = normalizeSubmission(payload, options.documents || []);

  // Auto-ensure missing custom fields exist once per server instance by default
  // (so users without bash/CLI never have to run a terminal command).
  if (env.GHL_AUTO_CREATE_CUSTOM_FIELDS !== "false" && !autoSyncedLocations.has(locationId)) {
    try {
      await syncCustomFieldsSchema({ token, locationId, createMissing: true, fetchImpl });
      autoSyncedLocations.add(locationId);
    } catch {
      // Non-fatal if token lacks locations/customFields.write scope.
    }
  }

  let remoteFields = [];
  try {
    remoteFields = await loadContactCustomFields(fetchImpl, token, locationId);
  } catch {
    // Non-fatal if token only has contacts.write scope; standard fields + Note still deliver.
    remoteFields = [];
  }

  const customFields = matchCustomFields(remoteFields, normalized.fieldValues);
  const contactId = await upsertMomentumContact(
    fetchImpl,
    token,
    locationId,
    normalized.standardContact,
    customFields
  );

  // Attach full structured submission Note on the Contact timeline (zero-data-loss guarantee).
  await ghlRequest(fetchImpl, token, "POST", `/contacts/${encodeURIComponent(contactId)}/notes`, {
    body: normalized.noteBody,
  });

  // Sync repeatable Driver, Vehicle, and Policy cards when Custom Objects are enabled.
  try {
    await syncRepeatableCustomObjects({ fetchImpl, token, locationId, contactId, normalized });
  } catch {
    // Non-fatal so optional Custom Object permissions never fail lead delivery.
  }

  // Optional direct Opportunity creation when pipeline env vars are set.
  const pipelineId = str(env.GHL_PIPELINE_ID);
  const stageId = str(env.GHL_STAGE_ID);
  if (pipelineId && stageId) {
    await ghlRequest(fetchImpl, token, "POST", "/opportunities/upsert", {
      locationId,
      pipelineId,
      pipelineStageId: stageId,
      contactId,
      name: `${normalized.standardContact.companyName || normalized.standardContact.name || "Website Lead"} — ${normalized.formLabel}`,
      status: "open",
      source: normalized.standardContact.source,
    });
  }

  return {
    contactId,
    formKind: normalized.formKind,
    mappedCustomFieldCount: customFields.length,
  };
}

function buildSampleLeadPayload() {
  /** @type {Record<string, unknown>} */
  const formData = {};
  for (const entry of FIELD_CATALOG) {
    if (entry.sensitive) continue;
    formData[entry.key] = `Sample — ${entry.name}`;
  }
  return {
    formType: "insurance-intake",
    source: "insurance-intake",
    page: "/crm-setup",
    firstName: "Jordan",
    lastName: "Reeves (Sample Lead)",
    name: "Jordan Reeves",
    email: "sample-lead@qpfactoring.test",
    phone: "(502) 555-0134",
    company: "Reeves Transport LLC",
    businessName: "Reeves Transport LLC",
    generalBusinessName: "Reeves Transport LLC",
    dotNumber: "1234567",
    mcNumber: "MC-987654",
    service: "Trucking insurance",
    fleet: "2–5 trucks",
    radius: "Long-haul (500+ miles)",
    message: "Sample verification lead sent from QP Website CRM Setup page.",
    mailingStreet: "100 Main St",
    mailingCity: "Louisville",
    mailingState: "KY",
    mailingZip: "40202",
    mailingCountry: "United States",
    dob: "1985-06-15",
    ein: "12-3456789",
    priceOfEquipment: "$68,500",
    financingAmountRequested: "$58,500",
    downPaymentAmount: "$10,000",
    equipmentDescription: "2022 Freightliner Cascadia · VIN 1FUJA6CK54LM12345",
    vendorSeller: "Kentucky Truck Sales",
    mvrAuthorized: true,
    drivers: [
      {
        index: 1,
        name: "Jordan Reeves",
        dob: "1985-06-15",
        dlNumber: "R12345678",
        dlState: "KY",
        cdlClass: "A",
        expYears: "8",
      },
    ],
    vehicles: [
      {
        index: 1,
        year: "2022",
        make: "Freightliner",
        model: "Cascadia",
        vin: "1FUJA6CK54LM12345",
        statedValue: "$68,500",
      },
    ],
    existingPolicies: [
      {
        index: 1,
        number: "POL-100200",
        carrier: "Sample Carrier",
        lob: "BI&PD",
        limit: "$1,000,000",
        effectiveDate: "01/01/2026",
      },
    ],
    formData,
  };
}

function clearMomentumCaches() {
  customFieldCache.clear();
  customObjectCache.clear();
  autoSyncedLocations.clear();
}

module.exports = {
  GHL_API_BASE,
  GHL_API_VERSION,
  DEFAULT_MOMENTUM_LOCATION_ID,
  FIELD_CATALOG,
  CUSTOM_OBJECT_DEFS,
  normalizeSubmission,
  matchCustomFields,
  coerceValueForGhlField,
  syncCustomFieldsSchema,
  sendToMomentumCrm,
  buildSampleLeadPayload,
  clearMomentumCaches,
};
