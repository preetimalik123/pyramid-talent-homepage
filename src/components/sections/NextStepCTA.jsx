import Reveal from "../common/Reveal";
import CTAButton from "../common/CTAButton";
import { nextStep } from "../../data/homepageData";

export default function NextStepCTA() {
  return (
    <section className="final-cta next-step-cta" id="contact">
      <div className="next-step-bg" />
      <div className="next-step-orb next-step-orb-one" />
      <div className="next-step-orb next-step-orb-two" />

      <Reveal>
        <div className="next-step-shell">
          <div className="next-step-copy">
            <div className="section-kicker">{nextStep.kicker}</div>

            <h2>{nextStep.title}</h2>

            <p>{nextStep.description}</p>

            <div className="next-step-actions">
              {nextStep.actions.map((action) => (
                <CTAButton className={action.className} key={action.label}>
                  {action.label}
                </CTAButton>
              ))}
            </div>
          </div>

          <div
            className="next-step-panel"
            aria-label="Pyramid Talent next step pathways"
          >
            <div className="next-step-flow-stack">
              {nextStep.cards.map((card, index) => (
                <div className="next-step-flow-item" key={card.audience}>
                  <article className={`next-step-mini-card ${card.className}`}>
                    <span>{card.audience}</span>
                    <strong>{card.text}</strong>
                  </article>

                  {index < nextStep.cards.length - 1 && (
                    <div className="next-step-panel-line" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <div className="next-step-signal">
              <span>Demand</span>
              <i />
              <span>Qualified Talent</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
