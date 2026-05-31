import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import Marquee from "../common/Marquee";
import { partners } from "../../data/homepageData";

export default function PartnersSection() {
  return (
    <Reveal>
      <section
        className="section partners-section"
        id="partners"
        aria-labelledby="partners-title"
      >
        <SectionHeader
          kicker="Our Industry Partnerships"
          id="partners-title"
          title="Connected to a wider workforce and enterprise partnership ecosystem."
        />

        <Marquee
          items={partners}
          repeat={2}
          getKey={(partner, index) => `${partner.name}-${index}`}
          renderItem={(partner, index) => (
            <div className="partner-logo-card" key={`${partner.name}-${index}`}>
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        />
      </section>
    </Reveal>
  );
}
