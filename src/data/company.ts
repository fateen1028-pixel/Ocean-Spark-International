/**
 * Company configuration.
 *
 * Everything below that is marked `pending` is a placeholder. The UI renders
 * these in a visibly provisional state so an unverified detail is never
 * presented to a buyer as fact. Replace the value and it renders as real.
 *
 * COMMERCIAL CONFIDENTIALITY — READ BEFORE EDITING.
 * The internal investment proposal for this business contains confidential
 * figures: investment amounts, purchase/selling prices, landed costs, exchange
 * rate assumptions, margins, turnover and profit forecasts, supplier advance
 * and customer credit terms, working-capital maths, and monthly/annual volumes.
 * None of that may be added here, or anywhere else that ships to the browser
 * (component copy, data files, metadata, JSON-LD, comments, env vars). Only the
 * operational description of the trade — origin, route, stages, Incoterm basis,
 * inspection and documentation practice — is public. If a number cannot be
 * published without revealing commercially sensitive information, it stays out.
 */

export const company = {
  name: "Ocean Spark International",
  shortName: "Ocean Spark",
  legalName: "", // pending: registered entity name
  tagline: "Imported from Thailand. Cleared at Chennai.",
  founded: "", // pending: "Est. 20XX"
  description:
    "Coconut shell charcoal imported from Thailand into Chennai and supplied in bulk to distributors, wholesalers and industrial buyers.",
  seo: {
    title: "Ocean Spark International | Coconut Shell Charcoal Importer, Chennai",
    description:
      "Coconut shell charcoal imported from Thailand into Chennai, Tamil Nadu and supplied in bulk. Lump charcoal, briquettes and industrial grades for distributors, wholesalers and industrial buyers.",
    // Replace with the live domain before deploying — used for canonical, OG and sitemap.
    siteUrl: "https://oceansparkinternational.com",
  },
} as const;

/**
 * Contact channels — VERIFIED DETAILS ONLY.
 *
 * A channel is listed here only once the business has confirmed the value.
 * Unconfirmed channels are deliberately absent rather than rendered as a
 * "to be published" card: a wall of empty placeholders reads as an unfinished
 * business to a buyer. Add an entry when the detail is real.
 */
export type ContactChannel = {
  id: string;
  label: string;
  icon: "mail" | "phone" | "pin" | "clock" | "file" | "share";
  value: string;
  href?: string;
  note?: string;
};

export const contactChannels: ContactChannel[] = [
  {
    id: "phone",
    label: "Telephone",
    icon: "phone",
    value: "+91 91763 41095",
    href: "tel:+919176341095",
    note: "Call or WhatsApp during Indian business hours.",
  },
  // Add the others as they are confirmed:
  // { id: "email",  label: "Business Email", icon: "mail", value: "sales@…", href: "mailto:sales@…" }
  // { id: "whatsapp", label: "WhatsApp",  icon: "phone", value: "+91 …", href: "https://wa.me/91…" }
  // { id: "office", label: "Registered Office", icon: "pin", value: "…" }
];

export const socialLinks: { label: string; href: string }[] = [
  // Add only profiles that are actually maintained.
];

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Origin", href: "#origin" },
  { label: "Products", href: "#products" },
  { label: "Quality", href: "#quality" },
  { label: "Supply Chain", href: "#trade" },
  { label: "Contact", href: "#contact" },
];

/**
 * Footer navigation. An item without `href` renders as clearly-labelled
 * pending text rather than a link that goes nowhere.
 */
export const footerNav: { label: string; href?: string }[] = [
  { label: "About Us", href: "#about" },
  { label: "Origin", href: "#origin" },
  { label: "Products", href: "#products" },
  { label: "Quality & Inspection", href: "#quality" },
  { label: "Supply Chain", href: "#trade" },
  { label: "Request a Quote", href: "#quote" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy.html" },
];

/**
 * The origin story. Country of origin and destination market are known
 * business facts and are stated plainly. Anything we have not confirmed —
 * tonnages, named mills, port and berth numbers — is deliberately absent
 * rather than estimated.
 */
export const origin = {
  country: "Thailand",
  destination: "India",
  /** The coconut belt these consignments are drawn from. */
  provinces: ["Prachuap Khiri Khan", "Chumphon", "Surat Thani"],
  /** Discharge port named in the trade proposal. */
  dischargePort: "Chennai",
  /** Region served by the operation. */
  market: "Tamil Nadu",
  heading: "It Starts In Southern Thailand.",
  lede: "Every consignment we supply begins as a coconut shell in Thailand — grown along the peninsula's Gulf coast, carbonised in earth kilns, and shipped to Chennai as a finished industrial fuel.",
  body: [
    "Shell charcoal is carbon, made the slow way: shells are burned sealed against oxygen, at low heat, over several days. That slow burn is what separates it from wood charcoal — the result is harder, cleaner and holds heat long enough to carry a restaurant service.",
    "The shells are a by-product of mills that already press the fruit for oil and milk. We do not grow or burn the coconut. Our part is matching a grade to a buyer, describing it accurately, and keeping the paperwork and timetable moving around a shipment that has to arrive.",
  ],
  /** Short, checkable statements — not decoration. */
  facts: [
    { label: "Country of Origin", value: "Thailand" },
    { label: "Growing Region", value: "Prachuap Khiri Khan · Chumphon · Surat Thani" },
    { label: "Discharge Port", value: "Chennai, Tamil Nadu" },
    { label: "Raw Material", value: "Whole coconut shells, a mill by-product" },
    { label: "Method", value: "Sealed-kiln carbonisation, slow and low-heat" },
    { label: "Market", value: "Tamil Nadu — wholesale, distribution and industrial" },
  ],
  image: {
    base: "/img/origin-grove",
    widths: [600, 1200],
    alt: "Rows of tall coconut palms in a plantation, thick green fronds filling the canopy overhead",
    aspect: "4/5",
    sizes: "(min-width: 1080px) 46vw, 100vw",
    caption: "Coconut palms in Thailand's southern growing belt.",
    credit: "Photo: Vyacheslav Argenberg, CC BY 4.0",
  },
} as const;

export const businessHighlights = [
  {
    icon: "flame",
    title: "Coconut Shell Charcoal",
    note: "Whole-shell lump charcoal, carbonised in southern Thailand.",
  },
  {
    icon: "ship",
    title: "Sourced In Thailand",
    note: "Drawn from the coconut belt in Chumphon and the southern provinces.",
  },
  {
    icon: "boxes",
    title: "Supplied Through Chennai",
    note: "Bulk movement for distributors and industrial buyers in Tamil Nadu.",
  },
  {
    icon: "handshake",
    title: "B2B Supply Only",
    note: "Built for wholesale and long-term commercial relationships.",
  },
] as const;

export const whyWorkWithUs = [
  {
    title: "One Trade Chain",
    body: "Supplier, freight, Chennai clearance and inland delivery are coordinated as a single movement, so you deal with one party across the route.",
  },
  {
    title: "Specification In Writing",
    body: "Form, grade, particle size and packaging are agreed before a quotation is issued, so both sides quote from the same document.",
  },
  {
    title: "Checked Before Commitment",
    body: "Material is examined against the agreed specification before it is committed, not disputed once it has arrived.",
  },
  {
    title: "Plain Answers",
    body: "Enquiries get an answer about what is available and what is still being confirmed, rather than a delay with no explanation.",
  },
] as const;

export const aboutPoints = [
  "We source in Thailand and supply in India, so the description you receive is the description the cargo was loaded against.",
  "Product information is shared in writing before commercial terms are agreed.",
  "We work toward repeat business, which makes clear communication more useful than a fast answer.",
  "Bulk orders are handled as coordinated movements of goods, paperwork and timelines.",
];

/**
 * The single end-to-end journey, inquiry through to acceptance.
 *
 * This replaces what were two separate step lists (a "route" list and an
 * "inquiry" list) that repeated each other's stages and read as two
 * processes. One timeline now carries the whole commercial movement.
 *
 * Wording is deliberately procedural — how a consignment is handled — rather
 * than a claim that a given volume, capacity or track record exists. Lead
 * times and payment terms are quoted per order, never published.
 */
export const tradeJourney: { title: string; body: string }[] = [
  {
    title: "Enquiry",
    body: "Send the product form, indicative quantity and delivery point. Terms are confirmed in writing before anything is ordered.",
  },
  {
    title: "Specification",
    body: "Form, grade, particle size and packaging are agreed against what can actually be sourced, and recorded on the quotation.",
  },
  {
    title: "Origin & Loading",
    body: "Material is bagged and containerised at origin, checked against the agreed specification, and sealed for shipment.",
  },
  {
    title: "Ocean Freight",
    body: "The consignment travels from the Thai port to Chennai on a booked sailing. Documents are prepared for the shipment.",
  },
  {
    title: "Clearance & Delivery",
    body: "Import clearance is completed at Chennai and the consignment is moved to your nominated destination in Tamil Nadu.",
  },
  {
    title: "Inspection & Acceptance",
    body: "Material is examined on arrival against the specification agreed at order, and any discrepancy is raised at that point.",
  },
];

/**
 * Trade facts. Only what is confirmed is published.
 *
 * The Incoterm, lead time, minimum order and payment terms are quoted on the
 * individual quotation, so they are absent here — publishing a placeholder for
 * each one produced a column of "Quoted per order" that told a buyer nothing.
 * Add a row only when the business has settled the value.
 */
export const logisticsFields: { label: string; value: string }[] = [
  { label: "Country of Origin", value: "Thailand" },
  { label: "Growing Region", value: "Prachuap Khiri Khan · Chumphon · Surat Thani" },
  { label: "Discharge Port", value: "Chennai, Tamil Nadu, India" },
  { label: "Market Served", value: "Tamil Nadu — wholesale & distribution" },
  { label: "Product Form", value: "Whole-shell lump charcoal" },
  { label: "Basis of Trade", value: "Quotation on request, per order" },
];

/**
 * Documents a buyer can request with a consignment.
 *
 * These name the categories of paperwork that travel with an import
 * consignment. Nothing here asserts that a certificate or third-party report
 * already exists — every document is issued per shipment, and only once it has
 * actually been prepared. Drop any line the business does not issue.
 */
export const documentSlots: {
  label: string;
  src?: string;
}[] = [
  { label: "Commercial Invoice" },
  { label: "Packing List" },
  { label: "Bill of Lading" },
  { label: "Import & Clearance Records" },
  { label: "Specification Sheet" },
];