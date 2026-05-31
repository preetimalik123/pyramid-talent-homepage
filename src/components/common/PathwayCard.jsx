export default function PathwayCard({
  audience,
  title,
  description,
  ctaLabel,
  className = "",
}) {
  return (
    <article className={`pathway-card ${className}`.trim()}>
      <div>
        <span>{audience}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <button type="button">{ctaLabel}</button>
    </article>
  );
}
