import { particleStorySections } from "../../data/homepageData";

export function GlobalTalentNetworkSection() {
  const section = particleStorySections.globalTalentNetwork;

  return (
    <section
      id={section.id}
      className={section.sectionClassName}
      aria-label={section.ariaLabel}
    >
      <div className="ux-particle-context">
        <span className="section-kicker">{section.kicker}</span>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
    </section>
  );
}

export function FinalParticleValueSection() {
  const section = particleStorySections.finalValue;

  return (
    <section
      id={section.id}
      className={section.sectionClassName}
      aria-label={section.ariaLabel}
    >
      <div className="ux-final-frame">
        {section.labels.map((label) => (
          <span className={label.className} key={label.text}>
            {label.text}
          </span>
        ))}
      </div>
    </section>
  );
}
