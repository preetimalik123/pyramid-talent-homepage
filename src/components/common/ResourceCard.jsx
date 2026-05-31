import CTAButton from "./CTAButton";

export default function ResourceCard({
  type,
  title,
  text,
  href = "https://pyramidci.com/resources/",
  ctaLabel = "Read More",
}) {
  return (
    <article className="resource-card">
      <div>
        <span>{type}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      <CTAButton as="a" href={href} className="pt-read-more resource-card__cta">
        {ctaLabel}
      </CTAButton>
    </article>
  );
}
