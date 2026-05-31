import Reveal from "../common/Reveal";
import ResourceCard from "../common/ResourceCard";
import SectionHeader from "../common/SectionHeader";
import { resources } from "../../data/homepageData";

export default function ResourcesSection() {
  return (
    <Reveal>
      <section id="resources" className="section resources-section" aria-labelledby="resources-title">
        <SectionHeader
          kicker="More on Pyramid Talent"
          id="resources-title"
          title="Resources, insights, and workforce perspectives."
          description="Explore more thinking from Pyramid Talent around hiring models, workforce transformation, and scalable talent delivery."
        />

        <div className="resource-grid">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
