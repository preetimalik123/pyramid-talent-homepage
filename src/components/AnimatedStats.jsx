import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { statsSection } from "../data/homepageData";

const statMeta = [
  { eyebrow: "Clients", note: "Trusted enterprise relationships" },
  { eyebrow: "Network", note: "Recruiting specialists" },
  { eyebrow: "Scale", note: "Annual placements delivered" },
  { eyebrow: "Delivery", note: "Assignment completion rate" },
];

function useAnimatedNumber(value, isActive) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isActive) return undefined;

    let frameId;
    const duration = 1200;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [isActive, value]);

  return current;
}

function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const current = useAnimatedNumber(value, isInView);

  const display =
    value >= 10000 ? `${Math.round(current / 1000)}k` : current.toLocaleString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }) {
  const meta = statMeta[index] || {};

  return (
    <motion.article
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="stat-card__eyebrow">{meta.eyebrow}</span>

      <h3>
        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
      </h3>

      <p>{stat.label}</p>

      {meta.note && <small>{meta.note}</small>}
    </motion.article>
  );
}

export default function AnimatedStats() {
  return (
    <section className="stats-section" aria-label={statsSection.ariaLabel}>
      <div className="stats-section__shell">
        <div className="stats-section__header">
          <span className="section-kicker">Talent impact</span>
          <h2>Scale you can measure.</h2>
        </div>

        <div className="stats-grid">
          {statsSection.stats.map((stat, index) => (
            <StatCard stat={stat} index={index} key={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
