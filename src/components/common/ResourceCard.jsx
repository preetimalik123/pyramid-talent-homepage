export default function ResourceCard({ type, title, text, ctaLabel = "Read More" }) {
  return (
    <article className="resource-card">
      <span>{type}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <button type="button">{ctaLabel}</button>
    </article>
  );
}
