import { Check, FileText } from "lucide-react";
import { documentSlots } from "../data/company";
import Img from "./Img";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Quality practice. These describe how material is handled, not results: no
 * figure, grade, certificate or inspection outcome is claimed, because none
 * has been independently confirmed. Anything numeric is issued per shipment
 * against the grade actually quoted.
 */
const points = [
  "Form, grading, moisture and packaging are agreed in writing before an order is released, so both sides work from the same document.",
  "Specification figures are issued per grade against the quotation, so the numbers you receive match the cargo you buy.",
  "Material is examined on arrival against the agreed specification, and any discrepancy is raised at that point rather than after the fact.",
  "Shipping and import documents travel with the consignment, so the paperwork behind the cargo is available to your own team.",
  "Where you need independent verification, tell us what you require and we will confirm what can be arranged for that shipment.",
];

const shots = [
  {
    base: "/img/product-charcoal",
    widths: [600, 1200],
    alt: "Whole coconut shell charcoal lumps spread across a wire mesh drying screen",
    caption: "Whole-shell lump — graded by hand before packing",
    wide: false,
  },
  {
    base: "/img/inspect-shell",
    widths: [600, 1200],
    alt: "Dried coconut shells and husk fragments piled after separation, before carbonisation",
    caption: "Raw shell input — the origin of the charcoal grade",
    wide: false,
  },
];

export default function QualitySection() {
  return (
    <section className="section section--dark quality" id="quality">
      <div className="container quality__grid">
        <Reveal className="quality__copy">
          <SectionHeading
            eyebrow={"Quality & Inspection"}
            title="Know What You're Buying."
            lede="Charcoal is not a standardised product the way a manufactured component is. Two shipments of the same nominal grade can differ. The job of a supplier is to make those differences explicit rather than let a buyer discover them at discharge."
          />

          <ul className="quality__list">
            {points.map((point) => (
              <li key={point}>
                <Check size={14} strokeWidth={3} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Documents stay inert until a real, approved file is supplied. */}
          <div className="docs">
            <p className="docs__title">Documents Released With A Consignment</p>
            <p className="docs__note">
              Each consignment is supplied with its commercial, shipping and import paperwork.
              Request the specific documents you need with your inquiry and we will confirm which
              apply to your order.
            </p>
            <ul className="docs__list">
              {documentSlots.map((doc) =>
                doc.src ? (
                  <li key={doc.label}>
                    <a className="docs__item" href={doc.src}>
                      <FileText size={13} aria-hidden="true" />
                      {doc.label}
                    </a>
                  </li>
                ) : (
                  <li className="docs__item" key={doc.label}>
                    <FileText size={13} aria-hidden="true" />
                    {doc.label}
                  </li>
                ),
              )}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="quality__shots">
            {shots.map((shot) => (
              <figure
                className={`quality__shot${shot.wide ? " quality__shot--wide" : ""}`}
                key={shot.base}
              >
                <Img
                  base={shot.base}
                  widths={shot.widths}
                  alt={shot.alt}
                  aspect={shot.wide ? "2/1" : "1/1"}
                  sizes="(min-width: 960px) 24vw, 45vw"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}