export default function CTAButton({ children, className = "", type = "button" }) {
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
