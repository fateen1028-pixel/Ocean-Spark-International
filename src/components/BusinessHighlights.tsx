import { Boxes, Flame, Handshake, Ship } from "lucide-react";
import { businessHighlights } from "../data/company";
import Reveal from "./Reveal";

const ICONS = { flame: Flame, boxes: Boxes, ship: Ship, handshake: Handshake } as const;

export default function BusinessHighlights() {
  return (
    <section className="highlights section--tight" aria-label="Business focus areas">
      <div className="container">
        <Reveal>
          <ul className="highlights__grid">
            {businessHighlights.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <li className="highlight" key={item.title}>
                  <Icon
                    className="highlight__icon"
                    size={22}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="highlight__title">{item.title}</p>
                  <p className="highlight__note">{item.note}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}