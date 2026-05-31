import CTAButton from "./CTAButton";

const CTA_LINKS = {
  employer: "https://pyramidci.com/talent-hire-page/",
  talent: "https://pyramidci.com/job-seeker/",
};

function getDefaultCtaHref(audience = "", className = "") {
  const value = `${audience} ${className}`.toLowerCase();

  if (value.includes("employer")) {
    return CTA_LINKS.employer;
  }

  return CTA_LINKS.talent;
}

export default function PathwayCard({
  audience,
  title,
  description,
  ctaLabel,
  ctaHref,
  className = "",
}) {
  const href = ctaHref || getDefaultCtaHref(audience, className);

  return (
    <article className={`pathway-card ${className}`.trim()}>
      <div>
        <span>{audience}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <CTAButton as="a" href={href} className="pt-read-more pathway-card__cta">
        {ctaLabel}
      </CTAButton>
    </article>
  );
}
