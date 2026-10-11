/**
 * FAQ content.
 *
 * Answers that depend on real company operations use `answer: null`. Those
 * render as an explicit "confirm on inquiry" line rather than an invented
 * fact. Product-definition questions (what coconut shell charcoal *is*) are
 * general industry knowledge and are answered directly.
 */

export type Faq = {
  question: string;
  answer: string | null;
};

export const faqs: Faq[] = [
  {
    question: "What is coconut shell charcoal?",
    answer:
      "Coconut shell charcoal is a hard charcoal produced by carbonising the hard shell of the coconut rather than the soft inner husk. Because the shell is a dense material, the resulting charcoal is heavier and harder than wood charcoal for a similar size, which is why it is widely used for grilling, BBQ and industrial fuel applications.",
  },
  {
    question: "Where does the charcoal come from?",
    answer:
      "Thailand. We buy from producers in the southern coconut belt — principally Chumphon, Surat Thani and Prachuap Khiri Khan — and import into India through Chennai.",
  },
  {
    question: "How does a shipment reach India?",
    answer:
      "Material is containerised at origin, moves by ocean freight to Chennai, is cleared there, and is then transported to your destination. You deal with a single party across the whole route rather than separate forwarders.",
  },
  {
    question: "What Incoterm do you quote on?",
    answer:
      "The basis of trade is stated on each quotation, because it depends on your delivery point and how you account for freight. Raise what you need in your inquiry and we will quote against it.",
  },
  {
    question: "How long does a shipment take?",
    answer:
      "Lead time is quoted per order rather than published, because it depends on the sailing schedule, port congestion, order size and your destination. Once we have your requirement, we confirm the timeline in writing with the quotation.",
  },
  {
    question: "Do you supply whole shells or broken charcoal?",
    answer:
      "Whole, unbroken shell charcoal is the line we lead with. It keeps its shape through the burn, sheds fewer fines on handling and packs predictably into a sack, which matters when you are filling a container. Broken and graded charcoal is available for buyers who need a defined particle size. State which you need and we will confirm what can be supplied against your volume.",
  },
  {
    question: "What product forms are available?",
    answer:
      "Whole-shell lump charcoal is the core line. Formed briquettes and bulk graded supply are quoted on request — use the product selector on the inquiry form and we will confirm availability and specification against your quantity.",
  },
  {
    question: "Can buyers request product specifications?",
    answer:
      "Yes. Request specifications through the inquiry form with your product of interest and indicative volume. Specification figures are shared against the grade being quoted rather than published as a general range, because they vary by batch and grade.",
  },
  {
    question: "How is quality checked?",
    answer:
      "Form, grading, moisture and packaging are agreed in writing before an order is released. Material is examined on arrival against the specification agreed at order, and any discrepancy is raised at that point. If you need independent verification, tell us what you require and we will confirm what can be arranged.",
  },
  {
    question: "Are bulk orders accepted?",
    answer:
      "Bulk inquiries are the core of the business. Include your estimated order quantity and destination in the inquiry form so the quotation can be prepared against the actual movement rather than a generic price list.",
  },
  {
    question: "Which packaging options are available?",
    answer:
      "Packaging is confirmed per order against form, quantity and destination. State your packaging preference in the inquiry form and we will confirm what can be arranged for that shipment.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "Payment terms are agreed in writing per order and are not published, because they depend on the buyer, the volume and the commercial terms of the quotation. They are stated on the quotation itself, so there is no ambiguity about what applies to your order.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Use the inquiry form on this page. The more detail you provide — product form, quantity, packaging preference and destination — the more specific the quotation can be. You will get a response that either answers the question or tells you what is still being confirmed.",
  },
  {
    question: "Which countries and ports can the company serve?",
    answer:
      "India is our base market, supplied through Chennai into Tamil Nadu and wider India. Destinations beyond that are confirmed case by case against quantity and the commercial terms agreed. Provide your destination port in the inquiry form and we will confirm what is workable for that route.",
  },
  {
    question: "What documentation is available?",
    answer:
      "Each consignment is supplied with its commercial, shipping and import paperwork. Request the specific documents you need with your inquiry and we will confirm which apply to your order.",
  },
];

export const packagingOptions = [
  "Not specified",
  "PP bags",
  "Burlap / woven sacks",
  "Cartons",
  "Bulk / containerised",
  "Custom packaging",
] as const;

/**
 * "Not specified" is first deliberately. The old order made a 20ft container
 * the pre-selected default, which told us a volume the visitor had not chosen.
 */
export const quantityOptions = [
  "Not specified",
  "Trial / sample quantity",
  "1 × 20ft container",
  "1 × 40ft container",
  "Multiple containers",
  "Bulk break-bulk",
] as const;

export const countryOptions = [
  "Not specified",
  "Bangladesh",
  "Brazil",
  "Egypt",
  "Germany",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "Pakistan",
  "Saudi Arabia",
  "South Korea",
  "Spain",
  "Thailand",
  "Türkiye",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Other",
] as const;