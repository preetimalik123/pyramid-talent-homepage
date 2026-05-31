import { enterpriseCapabilitySection } from "../data/homepageData";

function CapabilityModule({ item, index }) {
  return (
    <article className={`capability-module module-${index + 1}`}>
      <div className={`module-icon ${item.icon}`} aria-hidden="true">
        <i />
      </div>

      <small>{item.number}</small>

      <h3>{item.title}</h3>

      <p>{item.text}</p>
    </article>
  );
}

export default function EnterpriseCapabilityGrid() {
  return (
    <section className="enterprise-grid-section">
      <div className="enterprise-panel">
        <span>{enterpriseCapabilitySection.kicker}</span>

        <h2>{enterpriseCapabilitySection.title}</h2>

        <p>{enterpriseCapabilitySection.description}</p>

        <button type="button">{enterpriseCapabilitySection.ctaLabel}</button>
      </div>

      <div className="capability-map">
        {enterpriseCapabilitySection.capabilities.map((item, index) => (
          <CapabilityModule item={item} index={index} key={item.title} />
        ))}
      </div>
    </section>
  );
}
