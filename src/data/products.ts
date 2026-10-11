/**
 * Product catalogue.
 *
 * `specs` values are deliberately `string | null`. A null value is never
 * rendered as a number — the row is dropped from the spec table and the card
 * falls back to a neutral line. That is what keeps the site from inventing
 * moisture, ash, fixed-carbon or volatile-matter figures.
 *
 * IMAGES. Only the core line carries photography. The two secondary lines have
 * no accurate image available: the files previously used for them showed a
 * wood fire and a generic flame, which misrepresented the product. Rather than
 * present a wrong-subject picture or duplicate the core photograph, those lines
 * are listed as enquiry items with no photo. Add `featured: true` plus a real
 * image when genuine photography exists for a line.
 *
 * `offered: false` removes a line entirely.
 */

export type ProductSpec = {
  /** e.g. "6–8%" — supply real figures, leave null until you do. */
  moisture: string | null;
  ash: string | null;
  fixedCarbon: string | null;
  volatileMatter: string | null;
};

export type Product = {
  id: string;
  name: string;
  /** Short qualifier shown as a chip over the photograph. */
  tag: string;
  offered: boolean;
  /** The one line shown with a large photograph. Everything else is a list item. */
  featured?: boolean;
  summary: string;
  applications: string[];
  form: string | null;
  grade: string | null;
  packaging: string | null;
  moq: string | null;
  datasheet: string | null;
  specs: ProductSpec;
  image: ProductImage | null;
};

export type ProductImage = {
  base: string;
  widths: number[];
  alt: string;
  /** Rendered box ratio as "width/height" — drives the width/height attrs. */
  aspect: string;
  sizes: string;
};

export const products: Product[] = [
  {
    id: "shell-charcoal",
    name: "Coconut Shell Charcoal",
    tag: "Core Product",
    offered: true,
    featured: true,
    summary:
      "Whole-shell charcoal in lump form, carbonised in southern Thailand and supplied in bulk through Chennai. The hard shell gives a dense charcoal that burns hot and long, which is why it is the standard fuel for grilling, BBQ and industrial heat.",
    applications: ["BBQ & grilling", "Restaurant supply", "Industrial fuel"],
    form: null, // pending: e.g. "Lump / 5–15 cm"
    grade: null, // pending: e.g. "Restaurant, Industrial"
    packaging: null, // pending: e.g. "PP bags 25 kg, 50 kg"
    moq: null, // pending: e.g. "1 × 20ft container"
    datasheet: null, // pending: path to an approved PDF
    specs: {
      moisture: null,
      ash: null,
      fixedCarbon: null,
      volatileMatter: null,
    },
    image: {
      base: "/img/product-charcoal",
      widths: [600, 1200],
      alt: "Whole coconut shell charcoal lumps, brown and charcoal-grey, spread across a wire mesh drying screen",
      aspect: "16/11",
      sizes: "(min-width: 960px) 58vw, 100vw",
    },
  },
  {
    id: "shell-charcoal-briquettes",
    name: "Coconut Shell Charcoal Briquettes",
    tag: "Formed",
    offered: true,
    summary:
      "Pressed into a uniform, stackable form for buyers who want a consistent shape to pack, count and handle.",
    applications: ["BBQ & grilling", "Household fuel", "Retail packs"],
    form: null,
    grade: null,
    packaging: null,
    moq: null,
    datasheet: null,
    specs: {
      moisture: null,
      ash: null,
      fixedCarbon: null,
      volatileMatter: null,
    },
    image: null,
  },
  {
    id: "industrial-grade",
    name: "Bulk & Graded Supply",
    tag: "Bulk",
    offered: true,
    summary:
      "Graded shell charcoal for industrial fuel users and distributors, supplied against defined volume and packing configuration.",
    applications: ["Industrial fuel", "Bulk distribution"],
    form: null,
    grade: null,
    packaging: null,
    moq: null,
    datasheet: null,
    specs: {
      moisture: null,
      ash: null,
      fixedCarbon: null,
      volatileMatter: null,
    },
    image: null,
  },
];

export const offeredProducts = products.filter((p) => p.offered);

/** The line shown with photography. */
export const featuredProduct = offeredProducts.find((p) => p.featured) ?? null;

/** The remaining lines, rendered as a compact enquiry list. */
export const secondaryProducts = offeredProducts.filter((p) => !p.featured);