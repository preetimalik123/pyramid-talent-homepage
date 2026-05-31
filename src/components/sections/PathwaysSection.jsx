import Reveal from "../common/Reveal";
import PathwayCard from "../common/PathwayCard";
import { pathways } from "../../data/homepageData";

export default function PathwaysSection() {
  return (
    <Reveal>
      <section className="section pathways-section ux-particle-pathways">
        <div className="pathway-grid">
          {pathways.map((pathway) => (
            <PathwayCard key={pathway.audience} {...pathway} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
