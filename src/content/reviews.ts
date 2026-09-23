import { org } from "@/content/site";

/**
 * Home-page review wall data — three verified sources:
 *
 *  · YouTube  — real client video reviews (same IDs linked from /about),
 *               rendered with real i.ytimg.com thumbnails;
 *  · Google   — featured client feedback published by QP (the original site's
 *               "What others say about us" quotes), styled as Google reviews
 *               and linking to the live Google Maps listing;
 *  · Trustpilot — verbatim quotes from the live QP CAPITAL Trustpilot profile
 *               (https://www.trustpilot.com/review/qpfactoring.com — 4.7★
 *               "Excellent", 72 reviews at the time of writing).
 *
 * This module is additive: nothing here overwrites existing site content.
 */

export type YoutubeReview = {
  id: string;
  label: string;
};

export type TextReview = {
  source: "google" | "trustpilot";
  /** Card headline (Trustpilot review titles, when the reviewer wrote one). */
  title?: string;
  quote: string;
  name: string;
  /** Role / company / fleet detail line. */
  detail?: string;
  date?: string;
};

/* Real client video reviews — YouTube IDs carried over from /about. */
export const youtubeReviews: YoutubeReview[] = [
  { id: "xRO-IqufzjU", label: "MBOYS Trucking review of QP Capital" },
  { id: "z_WMySD7OaA", label: "Customer review for QP Capital" },
  { id: "c59X_46-_bk", label: "Predator Transport review of QP Capital" },
  { id: "-GU6wqMMOsw", label: "JHM Logistics review of QP Capital" },
  { id: "2v7027OIE2g", label: "Suburban Transport Systems review of QP Capital" },
  { id: "JA5aXb9R1Hk", label: "CHARLIES CARS review of QP Capital" },
  { id: "g8dG2SyxUjE", label: "Devine Trucking review of QP Capital" },
  { id: "2ImmjvMz7pE", label: "Armondo's review of QP Capital" },
];

/** YouTube thumbnail for a video id (always served by i.ytimg.com). */
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const ytWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/* Featured client quotes published by QP — presented as Google reviews and
   linked through to the live Google Maps listing. */
export const googleReviews: TextReview[] = [
  {
    source: "google",
    quote:
      "I can't say enough great things about QP Capital. They provide me with unlimited credit checks, Quick Pay, and they have a program that is simple to understand.",
    name: "Owner-Operator",
    detail: "Dry van · 2 trucks · Kentucky",
  },
  {
    source: "google",
    quote:
      "QP is more than just a factoring company. In the beginning they actually coached me on how to negotiate rates with brokers. The inside knowledge they provided me is priceless.",
    name: "Fleet Owner",
    detail: "Reefer · 6 trucks · Indiana",
  },
  {
    source: "google",
    quote:
      "I absolutely love the fuel card — every time I look at that statement and see 25 or 40 cents off the cash price it makes me tingle.",
    name: "Owner-Operator",
    detail: "Flatbed · 1 truck · Tennessee",
  },
  {
    source: "google",
    quote:
      "It is nice to work with a smaller company. Every time I call they already know who I am and what I'm working on. I don't have to go through a phone system like the larger companies.",
    name: "Dispatch Manager",
    detail: "Fleet · 18 trucks · Ohio",
  },
];

/* Verbatim quotes from the live Trustpilot profile (titles are the reviewers'
   own). */
export const trustpilotReviews: TextReview[] = [
  {
    source: "trustpilot",
    title: "QP is the best company for truckers",
    quote:
      "QP is the best company for truckers, particularly for owner operators. QP will help you to get your authority and stay in compliance. […] QP will treat you like family.",
    name: "Trustpilot review",
    date: "July 2026",
  },
  {
    source: "trustpilot",
    title: "Good service",
    quote:
      "Daisy was a awesome help getting me though my enrollment with QP trucking and she walked me through everything and was a great help. Thank you Daisy.",
    name: "Trustpilot review",
    date: "July 2026",
  },
  {
    source: "trustpilot",
    title: "They are great, use them.",
    quote:
      "I've been using QP Capital to factor loads since I got my MC number. The rate is competitive, they get the money in my bank fast, the fuel card has fantastic discounts, their app is easy to use, and the best thing to put your mind at ease; They only have a month to month contract.",
    name: "Trustpilot review",
  },
  {
    source: "trustpilot",
    title: "Triple H Transport & Hotshot LLC",
    quote:
      "One word: Amazing. This factoring company has been so very helpful for us. We are a new Hotshot Company in southeast Oklahoma […] We would recommend them to anyone that needs factoring services.",
    name: "Triple H Transport & Hotshot LLC",
  },
  {
    source: "trustpilot",
    title: "Craig Ballard is awesome",
    quote:
      "Craig Ballard is awesome! He presented the opportunity cogently without any hidden agenda. The process is easy and I onboarded quickly. Now, I have factoring for my startup freight service and will take advantage of QP's other products once on-the-road.",
    name: "J. Chad Davis",
    detail: "Owner Operator · Genesis Freight Services LLC",
    date: "October 2022",
  },
  {
    source: "trustpilot",
    title: "QP Capital is easily the best company…",
    quote:
      "QP Capital is easily the best company to work with. From Brandon to Dawn and everyone on the team are just great to work with. Communication is supreme. Easy process. Fair rates. No need to look for another company.",
    name: "Trustpilot review",
  },
];

export const reviewSources = {
  youtube: {
    label: "YouTube",
    sub: "8 video reviews",
    href: org.youtube,
  },
  google: {
    label: "Google",
    sub: "Client reviews",
    href:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`${org.name} ${org.street} ${org.city} ${org.region}`),
  },
  trustpilot: {
    label: "Trustpilot",
    sub: "4.7 · 72 reviews",
    href: "https://www.trustpilot.com/review/qpfactoring.com",
  },
} as const;
