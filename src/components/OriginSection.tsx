import { origin } from "../data/company";
import Img from "./Img";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function OriginSection() {
  return (
    <section className="section origin" id="origin">
      <div className="container origin__grid">
        <Reveal className="origin__media">
          <figure>
            <Img
              base={origin.image.base}
              widths={[...origin.image.widths]}
              alt={origin.image.alt}
              aspect={origin.image.aspect}
              sizes={origin.image.sizes}
            />
          </figure>
          <p className="origin__caption">
            {origin.image.caption}
            <span>{origin.image.credit}</span>
          </p>
        </Reveal>

        <Reveal className="origin__copy" delay={120}>
          <SectionHeading
            eyebrow="Origin"
            title={origin.heading}
            lede={origin.lede}
          />

          <div className="prose origin__prose">
            {origin.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <dl className="origin__facts">
            {origin.facts.map((fact) => (
              <div className="origin__fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
