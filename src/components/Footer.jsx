const socials = [
  {
    label: "LinkedIn",
    short: "in",
    href: "https://www.linkedin.com/company/pyramid-consulting/",
  },
  {
    label: "Facebook",
    short: "f",
    href: "https://www.facebook.com/PyramidConsultingInc",
  },
  {
    label: "Instagram",
    short: "◎",
    href: "https://www.instagram.com/pyramidciglobal/",
  },
  {
    label: "X",
    short: "𝕏",
    href: "https://x.com/PyramidCiGlobal",
  },
];

const audienceLinks = [
  { label: "For Job Seekers", href: "https://pyramidci.com/job-seeker/" },
  { label: "For Employers", href: "https://pyramidci.com/talent-hire-page/" },
];

const companyLinks = [
  { label: "About Us", href: "https://pyramidci.com/about-us/" },
  { label: "Resources", href: "https://pyramidci.com/resources/" },
  { label: "Contact Us", href: "https://pyramidci.com/contact-us/" },
  { label: "Careers", href: "https://pyramidci.com/career-overview/" },
];

const policyLinks = [
  { label: "GDPR", href: "https://pyramidci.com/gdpr/" },
  { label: "CCPA/CCRA", href: "https://pyramidci.com/ccpa-ccra/" },
  { label: "Privacy", href: "https://pyramidci.com/privacy/" },
  {
    label: "Reasonable Accommodation Policy",
    href: "https://pyramidci.com/reasonable-accommodation-policy/",
  },
];

const brandLogos = [
  {
    label: "Pyramid Consulting",
    href: "https://pyramidci.com/",
    src: "https://pyramidci.com/wp-content/uploads/2024/07/Frame-1973341810-1.svg",
    className: "footer-logo-pyramid",
  },
  {
    label: "Pyramid Talent",
    href: "https://pyramidci.com/talent-home-page/",
    src: "https://pyramidci.com/wp-content/uploads/2024/07/Frame-1973341806.svg",
    className: "footer-logo-talent",
  },
  {
    label: "Celsior",
    href: "https://celsiortech.com/",
    src: "https://pyramidci.com/wp-content/uploads/2024/07/Frame-1973341807.svg",
    className: "footer-logo-celsior",
  },
  {
    label: "GenSpark",
    href: "https://genspark.net/",
    src: "https://pyramidci.com/wp-content/uploads/2024/07/Frame-1973341808.svg",
    className: "footer-logo-genspark",
  },
];
function SocialLinks() {
  return (
    <div className="footer-socials" aria-label="Social links">
      {socials.map((item) => (
        <a
          href={item.href}
          aria-label={item.label}
          key={item.label}
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true">{item.short}</span>
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
  const [parentLogo, ...familyLogos] = brandLogos;

  return (
    <div
      className="footer-brand-block"
      aria-label="Pyramid Consulting brand family"
    >
      <a
        className="footer-parent-logo"
        href={parentLogo.href}
        aria-label={parentLogo.label}
      >
        <img
          src={parentLogo.src}
          alt={parentLogo.label}
          className={parentLogo.className}
          loading="lazy"
        />
      </a>

      <div className="footer-brand-rule" />

      <div className="footer-family-logos">
        {familyLogos.map((logo) => (
          <a href={logo.href} aria-label={logo.label} key={logo.label}>
            <img
              src={logo.src}
              alt={logo.label}
              className={logo.className}
              loading="lazy"
            />
          </a>
        ))}
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
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-policy-links">
            {policyLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
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
