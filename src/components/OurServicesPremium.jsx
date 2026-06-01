import { motion } from "framer-motion";
import {
  Handshake,
  SearchCheck,
  UsersRound,
  Globe2,
} from "lucide-react";
import SectionHeader from "./common/SectionHeader";
import { servicesSection } from "../data/homepageData";
import CTAButton from "./common/CTAButton";

const SERVICE_ICONS = {
  handshake: Handshake,
  searchCheck: SearchCheck,
  usersRound: UsersRound,
  globe: Globe2,
};

const SERVICES_CTA_LINK = "https://pyramidci.com/talent-hire-page/";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ServiceCard({ service }) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <motion.article
      className={`services-hyre-card ${service.glow}`}
      variants={cardVariants}
    
    >
      <div className="service-card-noise" />
      <div className="service-card-light" />
      <div className="service-card-shine" />

      <div className="service-card-topline">
        {Icon && (
          <motion.div
            className="service-icon-wrap"
            whileHover={{
              scale: 1.06,
              rotate: 3,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 16,
            }}
          >
            <Icon size={25} strokeWidth={1.8} />
          </motion.div>
        )}

        <span>{service.label}</span>
      </div>

      <div className="service-card-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </motion.article>
  );
}

export default function OurServicesPremium() {
  return (
    <section className="services-hyre-section" id={servicesSection.id}>
      <div className="services-hyre-bg" />

      <motion.div
        className="services-hyre-header"
        variants={headerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.18,
          margin: "180px 0px -40px 0px",
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SectionHeader
          kicker={servicesSection.kicker}
          title={servicesSection.title}
          description={servicesSection.description}
        />
      </motion.div>

      <motion.div
        className="services-hyre-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.08,
          margin: "220px 0px -80px 0px",
        }}
      >
        {servicesSection.services.map((service) => (
          <ServiceCard service={service} key={service.title} />
        ))}
      </motion.div>

      <div className="services-section-cta-wrap">
        <CTAButton
          as="a"
          href={SERVICES_CTA_LINK}
          className="pt-read-more services-section-cta"
        >
          {servicesSection.ctaLabel}
        </CTAButton>
      </div>
    </section>
  );
}
