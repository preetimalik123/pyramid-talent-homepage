import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Industries",
    href: "#industries",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "Partners",
    href: "#partners",
  },
  {
    label: "Resources",
    href: "#resources",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-nav" aria-label="Primary navigation">
      <a className="site-nav-brand" href="#home" onClick={closeMenu} aria-label="Pyramid Talent home">
        <img
          className="site-nav-logo"
          src="https://pyramidci.com/wp-content/uploads/2025/08/Frame-1973341695.svg"
          alt="Pyramid Talent"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </a>

      <button
        type="button"
        className="site-nav-toggle"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={isOpen ? "site-nav-links is-open" : "site-nav-links"}
        aria-label="Landing page sections"
      >
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
