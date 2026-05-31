import Reveal from "../common/Reveal";
import { introContent } from "../../data/homepageData";

export default function IntroSection() {
  return (
    <Reveal>
      <section className="section intro-section">
        <div className="split-layout">
          <div>
            <div className="section-kicker">{introContent.kicker}</div>
            <h2>{introContent.title}</h2>
          </div>

          <div>
            {introContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
