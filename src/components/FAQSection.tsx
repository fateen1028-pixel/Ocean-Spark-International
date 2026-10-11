import { useId, useState } from "react";
import { MessageCircleQuestion, Plus } from "lucide-react";
import { faqs } from "../data/faqs";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FAQSection() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq" id="faq">
      <div className="container faq__layout">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions Buyers Ask."
            lede="Straight answers, including the ones we can only confirm per inquiry."
          />
        </Reveal>

        <Reveal delay={90}>
          <div className="faq__list">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <div className="faq__item" key={faq.question}>
                  <h3 className="faq__q">
                    <button
                      type="button"
                      className="faq__trigger"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span>{faq.question}</span>
                      <Plus className="faq__icon" size={17} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </h3>

                  <div className="faq__panel" id={panelId} role="region" aria-labelledby={buttonId} data-open={isOpen}>
                    <div>
                      <div className="faq__answer">
                        {faq.answer ? (
                          <p>{faq.answer}</p>
                        ) : (
                          <p className="faq__pending">
                            <MessageCircleQuestion size={14} aria-hidden="true" /> Confirmed on
                            inquiry — this depends on current availability and route.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}