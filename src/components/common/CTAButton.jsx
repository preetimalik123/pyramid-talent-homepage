export default function CTAButton({
  children,
  className = "",
  type = "button",
  as = "button",
  href,
  ...props
}) {
  if (as === "a") {
    return (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
}
