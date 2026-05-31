import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { convergingTalentFlow } from "../data/homepageData";

function ParticleStream({ count, className, style }) {
  return (
    <motion.div className={className} style={style}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} style={{ "--i": index }} />
      ))}
    </motion.div>
  );
}

function FlowStoryArticle({ step, opacity }) {
  return (
    <motion.article style={{ opacity }}>
      <small>{step.number}</small>
      <h2>{step.title}</h2>
      <p>{step.text}</p>
    </motion.article>
  );
}

export default function ConvergingTalentFlow() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const incomingX = useTransform(scrollYProgress, [0, 1], ["-10vw", "2vw"]);
  const outgoingX = useTransform(scrollYProgress, [0, 1], ["10vw", "-2vw"]);

  const engineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  const stepOneOpacity = useTransform(scrollYProgress, [0, 0.22, 0.34], [1, 1, 0]);
  const stepTwoOpacity = useTransform(scrollYProgress, [0.28, 0.42, 0.62], [0, 1, 0]);
  const stepThreeOpacity = useTransform(scrollYProgress, [0.58, 0.76, 1], [0, 1, 1]);

  const stepOpacities = [stepOneOpacity, stepTwoOpacity, stepThreeOpacity];

  return (
    <section className="talent-system-flow" ref={sectionRef}>
      <div className="talent-system-sticky">
        <div className="system-grid-overlay" />

        <ParticleStream className="demand-stream" count={34} style={{ x: incomingX }} />
        <ParticleStream className="talent-stream" count={16} style={{ x: outgoingX }} />

        <motion.div className="system-engine" style={{ scale: engineScale }}>
          <div className="engine-orbit orbit-one" />
          <div className="engine-orbit orbit-two" />
          <div className="engine-core-dot" />

          <span>Pyramid Talent Engine</span>
        </motion.div>

        <div className="flow-story-copy">
          {convergingTalentFlow.steps.map((step, index) => (
            <FlowStoryArticle
              step={step}
              opacity={stepOpacities[index]}
              key={step.title}
            />
          ))}
        </div>

        <div className="flow-bottom-line">
          {convergingTalentFlow.bottomLabels.map((label, index) => (
            <Fragment key={label}>
              <span>{label}</span>
              {index < convergingTalentFlow.bottomLabels.length - 1 && <i />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
