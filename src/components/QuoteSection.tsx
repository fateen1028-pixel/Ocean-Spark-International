import { Clock, ShieldCheck, Truck } from "lucide-react";
import QuoteForm from "./QuoteForm";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const aside = [
  {
    Icon: Truck,
    text: "Tell us the destination and quantity and the quotation is built around your actual movement.",
  },
  {
    Icon: ShieldCheck,
    text: "Specification, grade and packaging are confirmed in writing before commercial terms are agreed.",
  },
  {
    Icon: Clock,
    text: "You will get a reply that answers the question or tells you plainly what is still being confirmed.",
  },
];

export default function QuoteSection() {
  return (
    <section className="section section--dark quote" id="quote">
      <div className="container quote__grid">
        <Reveal className="quote__aside">
          <SectionHeading
            eyebrow="Business Inquiry"
            title="Request A Quotation."
            lede="The more specific your requirement, the more specific the quotation. Send the product, quantity and delivery point, and we will confirm availability, specification and commercial terms against it."
          />

          <ul className="quote__aside-list">
            {aside.map(({ Icon, text }) => (
              <li key={text}>
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={110}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}