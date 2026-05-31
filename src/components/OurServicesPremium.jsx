import { motion } from "framer-motion";
import {
  Handshake,
  SearchCheck,
  UsersRound,
  Globe2,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "./common/SectionHeader";
import { servicesSection } from "../data/homepageData";

const SERVICE_ICONS = {
  handshake: Handshake,
  searchCheck: SearchCheck,
  usersRound: UsersRound,
  globe: Globe2,
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 95,
    scale: 0.94,
    rotateX: 7,
    filter: "blur(16px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
  },
};

function ServiceCard({ service, index }) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <motion.article
      className={`services-hyre-card ${service.glow}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.35,
        margin: "0px 0px -80px 0px",
      }}
      transition={{
        duration: 0.78,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.18,
      }}
      whileHover={{
        y: -12,
        scale: 1.014,
        rotateX: 2,
        rotateY: index % 2 === 0 ? -2 : 2,
        transition: {
          duration: 0.32,
          ease: "easeOut",
        },
      }}
    >
      <div className="service-card-noise" />
      <div className="service-card-light" />
      <div className="service-card-shine" />

      <div className="service-card-topline">
        {Icon && (
          <motion.div
            className="service-icon-wrap"
            whileHover={{
              scale: 1.08,
              rotate: 4,
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
        initial={{
          opacity: 0,
          y: 36,
          filter: "blur(12px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.45,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SectionHeader
          kicker={servicesSection.kicker}
          title={servicesSection.title}
          description={servicesSection.description}
        />
      </motion.div>

      <div className="services-hyre-grid">
        {servicesSection.services.map((service, index) => (
          <ServiceCard service={service} index={index} key={service.title} />
        ))}
      </div>

      <div className="services-section-cta-wrap">
        <button type="button" className="services-section-cta">
          <span>{servicesSection.ctaLabel}</span>
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
