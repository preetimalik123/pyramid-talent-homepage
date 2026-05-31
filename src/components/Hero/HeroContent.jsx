export default function HeroContent() {
  return (
    <div className="pt-hero-content">
      <div className="pt-hero-tag">Global Talent Solutions</div>

      <h1>Creating Greater Value for All, Together</h1>

      <p>
        We connect industry leaders with the best talent across the globe and
        ensure they are the best fit for each other.
      </p>

      <div className="pt-hero-actions">
        <a className="pt-hero-primary" href="https://pyramidci.com/job-seeker/">
          <span>For Employers</span>
          <span aria-hidden="true">→</span>
        </a>

        <a className="pt-hero-secondary" href="https://pyramidci.com/talent-hire-page/">
          <span>For Job Seekers</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
