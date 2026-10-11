import { ArrowRight, Clock, FileText, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { contactChannels } from "../data/company";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ICONS = {
  mail: Mail,
  phone: Phone,
  pin: MapPin,
  clock: Clock,
  file: FileText,
  share: Share2,
} as const;

export default function ContactSection() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__layout">
          <Reveal className="contact__intro">
            <SectionHeading
              eyebrow="Contact"
              title="Request A Quotation."
              lede="Send the product, quantity and delivery point and we will confirm availability, specification and commercial terms against it."
            />

            {/* The quote path is the primary action, so it carries the emphasis
                rather than sitting below a wall of contact cards. */}
            <a className="btn btn--primary contact__cta" href="#quote">
              Start your inquiry
              <ArrowRight size={16} className="btn__icon" aria-hidden="true" />
            </a>
          </Reveal>

          {/* Only verified details are rendered. There is no placeholder state:
              a card reading "to be published" is worse than no card. */}
          <Reveal className="contact__details" delay={90}>
            <h3 className="contact__details-title">Direct lines</h3>
            <ul className="contact__list">
              {contactChannels.map((channel) => {
                const Icon = ICONS[channel.icon];
                return (
                  <li className="contact-row" key={channel.id}>
                    <span className="contact-row__icon" aria-hidden="true">
                      <Icon size={16} strokeWidth={1.8} />
                    </span>
                    <span className="contact-row__body">
                      <span className="contact-row__label">{channel.label}</span>
                      <a className="contact-row__value" href={channel.href}>
                        {channel.value}
                      </a>
                      {channel.note ? (
                        <span className="contact-row__note">{channel.note}</span>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}