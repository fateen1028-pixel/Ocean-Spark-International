import { whyWorkWithUs } from "../data/company";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function WhyWorkWithUs() {
  return (
    <section className="section why" id="why">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Why Work With Us"
            title="Trade With Confidence."
            lede="Four things we treat as part of the product, not an extra. Each one exists because a cross-border buyer cannot see or verify anything until the cargo arrives."
          />
        </Reveal>

        <Reveal delay={80}>
          <ul className="why__grid">
            {whyWorkWithUs.map((item, i) => (
              <li className="why__card" key={item.title}>
                <p className="why__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}