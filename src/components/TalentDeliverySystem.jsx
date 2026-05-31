import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { talentDeliverySystem } from "../data/homepageData";

const STEP_OPACITY_RANGES = [
  {
    input: [0, 0.25, 0.45],
    output: [1, 1, 0.52],
  },
  {
    input: [0.26, 0.5, 0.72],
    output: [0.52, 1, 0.52],
  },
  {
    input: [0.56, 0.78, 1],
    output: [0.52, 1, 1],
  },
];

function DeliveryStepCard({ step, opacity }) {
  return (
    <motion.article className="delivery-split-card" style={{ opacity }}>
      <div className="delivery-split-meta">
        <span>{step.number}</span>
        <small>{step.label}</small>
      </div>

      <div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
    </motion.article>
  );
}

export default function TalentDeliverySystem() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stepOpacities = STEP_OPACITY_RANGES.map((range) =>
    useTransform(scrollYProgress, range.input, range.output)
  );

  return (
    <section
      id={talentDeliverySystem.id}
      className="delivery-split-section ux-delivery-section"
      ref={sectionRef}
    >
      <div className="delivery-split-sticky">
        <div className="delivery-split-shade" aria-hidden="true" />

        <div className="delivery-split-content">
          <span className="section-kicker">{talentDeliverySystem.kicker}</span>

          <h2>{talentDeliverySystem.title}</h2>

          <p>{talentDeliverySystem.description}</p>

          <div className="delivery-split-progress">
            <motion.i style={{ width: progressWidth }} aria-hidden="true" />
          </div>

          <div className="delivery-split-steps">
            {talentDeliverySystem.steps.map((step, index) => (
              <DeliveryStepCard
                step={step}
                opacity={stepOpacities[index]}
                key={step.title}
              />
            ))}
          </div>
        </div>

        <div className="delivery-particle-free" aria-hidden="true" />
      </div>
    </section>
  );
}
