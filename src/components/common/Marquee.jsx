export default function Marquee({
  items,
  repeat = 2,
  className = "marquee",
  trackClassName = "marquee-track",
  getKey = (item, index) => `${item.name ?? item}-${index}`,
  renderItem,
}) {
  const repeatedItems = Array.from({ length: repeat }, () => items).flat();

  return (
    <div className={className}>
      <div className={trackClassName}>
        {repeatedItems.map((item, index) =>
          renderItem ? (
            renderItem(item, index)
          ) : (
            <span key={getKey(item, index)}>{item.name ?? item}</span>
          )
        )}
      </div>
    </div>
  );
}
