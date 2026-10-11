import { logisticsFields, tradeJourney } from "../data/company";
import Img from "./Img";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const strip = [
  {
    base: "/img/trade-harbour",
    widths: [600, 1200],
    alt: "Container terminal with gantry cranes and stacked containers at dusk",
    caption: "Container handling at the port",
  },
  {
    base: "/img/trade-loading",
    widths: [600, 1200],
    alt: "Worker checking a container being loaded with stacked sacks at a port",
    caption: "Loading and sealing before departure",
  },
  {
    base: "/img/trade-vessel",
    widths: [600, 1200],
    alt: "Container vessel loaded with stacked containers alongside a berth",
    caption: "Ocean freight to Chennai",
  },
];

export default function GlobalTradeSection() {
  return (
    <section className="section trade" id="trade">
      <div className="container">
        <div className="trade__top">
          <Reveal>
            <SectionHeading
              eyebrow="Supply Chain"
              title="Thailand To Chennai, End To End."
              lede="The Incoterm, destination, packaging and loading decide as much about a shipment as the product itself, so they are agreed before anything is loaded."
            />

            <div className="trade__strip">
              {strip.map((item) => (
                <figure key={item.base}>
                  <Img
                    base={item.base}
                    widths={item.widths}
                    alt={item.alt}
                    aspect="4/3"
                    sizes="(min-width: 620px) 30vw, 100vw"
                  />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          <Reveal delay={110}>
            <figure className="trade__media">
              <Img
                base="/img/trade-vessel"
                widths={[800, 1600]}
                alt="Container vessel alongside a port berth at sunset, stacked containers visible on deck"
                aspect="16/10"
                sizes="(min-width: 900px) 50vw, 100vw"
              />
            </figure>

            {/* Fields stay visibly provisional until the business confirms them. */}
            <dl className="trade__fields">
              {logisticsFields.map((field) => (
                <div className="trade__field" key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="Inquiry To Acceptance"
          />
        </Reveal>

        <Reveal delay={80}>
          <ol className="steps steps--chain">
            {tradeJourney.map((step) => (
              <li className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}