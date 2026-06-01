import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { useRef } from "react";
import { horizontalProofSection } from "../data/homepageData";

const ProofSection = styled.section`
  position: relative;
  height: 330vh;
  margin-bottom: clamp(140px, 16vh, 220px);
  background:
    radial-gradient(circle at 72% 38%, rgba(147, 197, 253, 0.18), transparent 30%),
    radial-gradient(circle at 28% 72%, rgba(168, 85, 247, 0.12), transparent 34%),
    linear-gradient(180deg, rgba(2, 6, 23, 0.92), rgba(2, 6, 23, 1));
  border-block: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 1180px) {
    height: auto;
    margin-bottom: 100px;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  padding: 118px 8% 110px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(147, 197, 253, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(147, 197, 253, 0.07) 1px, transparent 1px);
    background-size: 80px 80px;
    opacity: 0.22;
    mask-image: radial-gradient(circle at center, black, transparent 78%);
  }

  @media (max-width: 1180px) {
    position: relative;
    height: auto;
    padding: 96px 7% 110px;
  }

  @media (max-width: 800px) {
    padding: 90px 24px 96px;
  }
`;

const LargeCopy = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(360px, 0.62fr);
  gap: clamp(42px, 5vw, 84px);
  align-items: start;

  h2 {
    max-width: 940px;
    margin: 0;
    font-size: clamp(54px, 7.35vw, 116px);
    line-height: 0.88;
    letter-spacing: -5.2px;
    font-weight: 500;
  }

  p {
    max-width: 460px;
    margin: 14px 0 0;
    color: rgba(255, 255, 255, 0.75);
    font-size: clamp(16px, 1.22vw, 20px);
    line-height: 1.58;
  }

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
    gap: 30px;

    h2 {
      max-width: 100%;
      font-size: clamp(52px, 9vw, 100px);
      letter-spacing: -4px;
    }

    p {
      max-width: 720px;
      margin-top: 0;
    }
  }

  @media (max-width: 800px) {
    h2 {
      font-size: 58px;
      letter-spacing: -3px;
    }
  }

  @media (max-width: 520px) {
    h2 {
      font-size: 42px;
      line-height: 0.95;
      letter-spacing: -2px;
    }
  }
`;

const CardTrack = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 92px;
  z-index: 5;
  display: flex;
  gap: 34px;
  width: max-content;
  will-change: transform;

  @media (max-width: 1180px) {
    position: relative;
    left: auto;
    bottom: auto;
    margin-top: 48px;
    flex-direction: column;
    gap: 20px;
    transform: none !important;
    width: 100%;
  }
`;

const ProofCard = styled.article`
  width: clamp(320px, 28vw, 410px);
  min-height: 250px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 28px;
  color: #eaf4ff;
  background:
    linear-gradient(180deg, rgba(226, 232, 240, 0.16), rgba(15, 23, 42, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(20px);
  box-shadow:
    0 40px 110px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  &:nth-child(2) {
    margin-top: 42px;
  }

  &:nth-child(3) {
    margin-top: -18px;
  }

  &:nth-child(4) {
    margin-top: 56px;
  }

  blockquote {
    margin: 24px 0 32px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 16px;
    line-height: 1.55;
  }

  strong {
    display: block;
    color: white;
    font-size: 14px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  span {
    display: block;
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.58);
    font-size: 13px;
  }

  @media (max-width: 1180px) {
    width: 100%;
    min-height: auto;

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      margin-top: 0;
    }
  }

  @media (max-width: 520px) {
    padding: 26px;
    border-radius: 22px;
  }
`;

const ProofLogo = styled.div`
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #020617;
  background: #eaf4ff;
  font-weight: 700;
  letter-spacing: -1px;
`;

export default function HorizontalProof() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["22vw", "-76vw"]);

  return (
    <ProofSection id="testimonials" ref={sectionRef} aria-labelledby="testimonials-title">
      <Sticky>
        <LargeCopy>
          <h2 id="testimonials-title">
            {horizontalProofSection.titleLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>

          <p>{horizontalProofSection.description}</p>
        </LargeCopy>

        <CardTrack style={{ x }}>
          {horizontalProofSection.cards.map((card) => (
            <ProofCard key={card.quote}>
              <ProofLogo aria-hidden="true">{card.logo}</ProofLogo>

              <blockquote>“{card.quote}”</blockquote>

              <div>
                <strong>{card.name}</strong>
                <span>{card.role}</span>
              </div>
            </ProofCard>
          ))}
        </CardTrack>
      </Sticky>
    </ProofSection>
  );
}
