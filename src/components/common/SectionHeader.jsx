export default function SectionHeader({
  kicker,
  title,
  description,
  id,
  className = "",
  children,
}) {
  return (
    <div className={`section-header ${className}`.trim()}>
      {kicker && <div className="section-kicker">{kicker}</div>}

      {title && <h2 id={id}>{title}</h2>}

      {description && <p>{description}</p>}

      {children}
    </div>
  );
}
