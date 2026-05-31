const socials = [
  { label: "LinkedIn", short: "in", href: "#" },
  { label: "Facebook", short: "f", href: "#" },
  { label: "Instagram", short: "◎", href: "#" },
  { label: "X", short: "𝕏", href: "#" },
];

const audienceLinks = [
  { label: "For Job Seekers", href: "https://pyramidci.com/job-seeker/" },
  { label: "For Employers", href: "https://pyramidci.com/talent-hire-page/" },
];

const companyLinks = ["About Us", "Resources", "Contact Us", "Careers"];

const policyLinks = [
  "GDPR",
  "CCPA/CCRA",
  "Privacy",
  "Reasonable Accommodation Policy",
];

function SocialLinks() {
  return (
    <div className="footer-socials" aria-label="Social links">
      {socials.map((item) => (
        <a href={item.href} aria-label={item.label} key={item.label}>
          {item.short}
        </a>
      ))}
    </div>
  );
}

function AudienceLinks() {
  return (
    <nav className="footer-audience-links" aria-label="Audience links">
      {audienceLinks.map((item) => (
        <a href={item.href} key={item.label}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function FooterBrand() {
  return (
    <div className="footer-brand-block" aria-label="Pyramid Consulting brand family">
      <a className="footer-parent-logo" href="#" aria-label="Pyramid Consulting">
        <span className="footer-logo-mark" />
        <span className="footer-logo-copy">
          <strong>pyramid</strong>
          <small>CONSULTING</small>
        </span>
      </a>

      <div className="footer-brand-rule" />

      <div className="footer-family-logos">
        <span>
          pyramid <small>TALENT</small>
        </span>
        <span>celsior</span>
        <span>genspark</span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Pyramid Talent footer">
      <div className="footer-bg" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-top">
          <SocialLinks />
          <AudienceLinks />
        </div>

        <div className="footer-divider" />

        <div className="footer-main">
          <FooterBrand />

          <nav className="footer-company-links" aria-label="Company links">
            {companyLinks.map((link) => (
              <a href="#" key={link}>
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-policy-links">
            {policyLinks.map((link) => (
              <a href="#" key={link}>
                {link}
              </a>
            ))}
          </div>

          <p>
            Microsoft privacy statement | Web Accessibility | Privacy
            introduction | © 2026 Pyramid Consulting, Inc. | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
