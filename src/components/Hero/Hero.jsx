import "./Hero.scss";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="pt-hero" id="home" aria-label="Pyramid Talent hero">
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
