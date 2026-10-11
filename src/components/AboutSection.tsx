import { Check } from "lucide-react";
import { aboutPoints } from "../data/company";
import Img from "./Img";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <SectionHeading
            eyebrow="About Us"
            title="An Import Business, Not A Middleman."
            lede="Ocean Spark International supplies coconut shell charcoal sourced in Thailand and delivered in bulk to buyers in Tamil Nadu."
          />

          <div className="prose">
            <p>
              Moving charcoal between two countries runs on information. A buyer in India and a
              supplier in Thailand rarely share the same assumptions about grade, packaging or
              timing. Most of the friction in this trade is not the product — it is the ambiguity
              around it.
            </p>

            <p>
              So the work is stating what the product is, stating what has been checked, and
              saying plainly when something is still being confirmed.
            </p>
          </div>

          <ul className="about__points">
            {aboutPoints.map((point) => (
              <li key={point}>
                <Check size={13} strokeWidth={3} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about__media" delay={120}>
          <figure>
            {/* Was `about-bulk`: an abstract close-up of empty sacks. Replaced
                with charcoal actually in a bag, which is what is being traded. */}
            <Img
              base="/img/inspect-lump"
              widths={[600, 1200]}
              alt="Coconut shell charcoal being tipped from a paper sack into a metal pan"
              aspect="4/3"
              sizes="(min-width: 900px) 44vw, 100vw"
            />
          </figure>
          <p className="about__media-note">
            Charcoal bagged and graded to the agreed specification before loading.
          </p>
        </Reveal>
      </div>
    </section>
  );
}