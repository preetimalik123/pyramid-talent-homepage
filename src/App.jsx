import { lazy, Suspense, useEffect, useState } from "react";

import Footer from "./components/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar";

import AnimatedStats from "./components/AnimatedStats";
import TalentDeliverySystem from "./components/TalentDeliverySystem";
import OurServicesPremium from "./components/OurServicesPremium";

import IntroSection from "./components/sections/IntroSection";
import {
  FinalParticleValueSection,
  GlobalTalentNetworkSection,
} from "./components/sections/ParticleTextSections";
import PathwaysSection from "./components/sections/PathwaysSection";
import PartnersSection from "./components/sections/PartnersSection";
import ResourcesSection from "./components/sections/ResourcesSection";
import NextStepCTA from "./components/sections/NextStepCTA";

import SEO from "./components/SEO";
import LazyOnVisible from "./components/common/LazyOnVisible";
import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";

const ParticleScene = lazy(() => import("./components/ParticleScene"));
const IndustriesTabs = lazy(() => import("./components/IndustriesTabs"));
const HorizontalProof = lazy(() => import("./components/HorizontalProof"));

function useIsCompactViewport(maxWidth = 768) {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= maxWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [maxWidth]);

  return isCompact;
}


export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCompactViewport = useIsCompactViewport();

  return (
    <div className="app">
      <SEO />
      <Navbar />

      <Hero />

      <main id="main-content">
        <section
          className="particle-stage"
          aria-label="Pyramid Talent workforce delivery story"
        >
          {!prefersReducedMotion && !isCompactViewport && (
            <LazyOnVisible rootMargin="250px" fallback={null}>
              <Suspense fallback={null}>
                <ParticleScene />
              </Suspense>
            </LazyOnVisible>
          )}

          <IntroSection />

          <AnimatedStats />

          <TalentDeliverySystem />

          <GlobalTalentNetworkSection />

          <FinalParticleValueSection />

          <PathwaysSection />
        </section>

        <OurServicesPremium />

        <LazyOnVisible
          rootMargin="500px"
          fallback={<div className="section-loader" aria-hidden="true" />}
        >
          <Suspense fallback={<div className="section-loader" aria-hidden="true" />}>
            <IndustriesTabs />
          </Suspense>
        </LazyOnVisible>

        <LazyOnVisible
          rootMargin="500px"
          fallback={<div className="section-loader" aria-hidden="true" />}
        >
          <Suspense fallback={<div className="section-loader" aria-hidden="true" />}>
            <HorizontalProof />
          </Suspense>
        </LazyOnVisible>

        <PartnersSection />

        <ResourcesSection />

        <NextStepCTA />

        <Footer />
      </main>
    </div>
  );
}
