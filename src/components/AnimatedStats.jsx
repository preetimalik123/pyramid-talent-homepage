import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { statsSection } from "../data/homepageData";

function useAnimatedNumber(value, isActive) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isActive) return undefined;

    let frameId;
    const duration = 1300;
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
  return (
    <motion.article
      className="stat-card"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
    >
      <h3>
        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
      </h3>

      <p>{stat.label}</p>
    </motion.article>
  );
}

export default function AnimatedStats() {
  return (
    <section className="stats-section" aria-label={statsSection.ariaLabel}>
      {statsSection.stats.map((stat, index) => (
        <StatCard stat={stat} index={index} key={stat.label} />
      ))}
    </section>
  );
}
