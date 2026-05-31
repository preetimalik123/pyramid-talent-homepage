import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Cpu,
  Dna,
  Factory,
  HeartPulse,
  Plane,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  UserRoundPlus,
  UsersRound,
  Zap,
} from "lucide-react";
import { useState } from "react";
import CTAButton from "./common/CTAButton";
import { industriesSection } from "../data/homepageData";

const INDUSTRY_ICONS = {
  building: Building2,
  calendar: CalendarDays,
  cpu: Cpu,
  dna: Dna,
  factory: Factory,
  heartPulse: HeartPulse,
  plane: Plane,
  radioTower: RadioTower,
  shieldCheck: ShieldCheck,
  shoppingBag: ShoppingBag,
  userRoundPlus: UserRoundPlus,
  usersRound: UsersRound,
  zap: Zap,
};

function IndustryMetrics({ metrics, iconSize = 19 }) {
  return (
    <>
      {metrics.map((metric) => {
        const MetricIcon = INDUSTRY_ICONS[metric.icon];

        return (
          <div className="pt-proof-row" key={metric.label}>
            <span className="pt-proof-icon" aria-hidden="true">
              {MetricIcon && <MetricIcon size={iconSize} strokeWidth={1.75} />}
            </span>

            <div>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

function IndustryCard({ industry, activeIndex, total }) {
  return (
    <motion.article
      className="pt-industry-card"
      id="active-industry-panel"
      key={industry.id}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pt-industry-card-label">{industriesSection.cardLabel}</div>

      <div className="pt-industry-card-main">
        <div className="pt-industry-copy">
          <h3>{industry.title}</h3>

          <p>{industry.description}</p>

          {industry.note && (
            <strong className="pt-industry-note">{industry.note}</strong>
          )}
        </div>

        <div className="pt-industry-proof">
          <IndustryMetrics metrics={industry.metrics} />
        </div>
      </div>

      <div className="pt-industry-card-bottom">
        <em>
          {activeIndex + 1} / {total}
        </em>
      </div>
    </motion.article>
  );
}

function IndustryAccordionPanel({ industry, index, total }) {
  return (
    <motion.div
      className="pt-mobile-industry-panel"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pt-mobile-industry-panel-inner">
        <div className="pt-mobile-industry-copy">
          <p>{industry.description}</p>

          {industry.note && (
            <strong className="pt-industry-note">{industry.note}</strong>
          )}
        </div>

        <div className="pt-mobile-industry-proof">
          <IndustryMetrics metrics={industry.metrics} iconSize={18} />
        </div>

        <div className="pt-mobile-industry-footer">
          <CTAButton className="pt-read-more">
            {industriesSection.readMoreLabel}
          </CTAButton>

          <em>
            {index + 1} / {total}
          </em>
        </div>
      </div>
    </motion.div>
  );
}

export default function IndustriesStickyTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openMobileIndex, setOpenMobileIndex] = useState(0);

  const industries = industriesSection.industries;
  const activeIndustry = industries[activeIndex];
  const activeProgress =
    industries.length > 1 ? (activeIndex / (industries.length - 1)) * 100 : 0;

  return (
    <section
      className="pt-industries"
      id="industries"
      aria-labelledby="industries-title"
    >
      <div className="pt-industries-grid-bg" aria-hidden="true" />

      <div className="pt-industries-shell">
        <div className="pt-industries-topbar">
          <div className="pt-industries-heading">
            <span className="section-kicker">{industriesSection.kicker}</span>

            <h2 id="industries-title">{industriesSection.title}</h2>

            <p>{industriesSection.description}</p>
          </div>

          <CTAButton className="pt-industries-read-more">
            {industriesSection.readMoreLabel}
          </CTAButton>
        </div>

        <div className="pt-industries-desktop-layout">
          <nav
            className="pt-industries-tabs"
            aria-label={industriesSection.tabsAriaLabel}
            style={{ "--active-progress": `${activeProgress}%` }}
          >
            {industries.map((industry, index) => (
              <button
                type="button"
                key={industry.id}
                className={
                  activeIndex === index
                    ? "pt-industry-tab active"
                    : "pt-industry-tab"
                }
                onClick={() => setActiveIndex(index)}
                aria-current={activeIndex === index ? "true" : undefined}
                aria-controls="active-industry-panel"
              >
                <span>{industry.number}</span>
                <strong>{industry.title}</strong>
              </button>
            ))}
          </nav>

          <div className="pt-industries-right">
            <AnimatePresence mode="wait">
              <IndustryCard
                industry={activeIndustry}
                activeIndex={activeIndex}
                total={industries.length}
                key={activeIndustry.id}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-industries-mobile-list">
          {industries.map((industry, index) => {
            const isOpen = openMobileIndex === index;
            const panelId = `industry-mobile-panel-${industry.id}`;

            return (
              <article className="pt-mobile-industry-item" key={industry.id}>
                <button
                  type="button"
                  className={
                    isOpen
                      ? "pt-mobile-industry-trigger active"
                      : "pt-mobile-industry-trigger"
                  }
                  onClick={() =>
                    setOpenMobileIndex((current) =>
                      current === index ? -1 : index
                    )
                  }
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span>{industry.number}</span>
                  <strong>{industry.title}</strong>
                  <i aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <div id={panelId}>
                      <IndustryAccordionPanel
                        industry={industry}
                        index={index}
                        total={industries.length}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
