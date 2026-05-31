import { lazy, Suspense } from "react";

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
const IndustriesStickyTabs = lazy(() => import("./components/IndustriesStickyTabs"));
const HorizontalProof = lazy(() => import("./components/HorizontalProof"));

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion();

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
          {!prefersReducedMotion && (
            <Suspense fallback={null}>
              <ParticleScene />
            </Suspense>
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
          rootMargin="900px"
          fallback={<div className="section-loader" aria-hidden="true" />}
        >
          <Suspense fallback={<div className="section-loader" aria-hidden="true" />}>
            <IndustriesStickyTabs />
          </Suspense>
        </LazyOnVisible>

        <LazyOnVisible
          rootMargin="900px"
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
