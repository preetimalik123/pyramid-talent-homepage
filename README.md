# Pyramid Talent Homepage Design

A modern, responsive homepage design for the Pyramid Talent landing page, built using React, Vite, SCSS, Styled Components, Framer Motion, and React Three Fiber.

The goal of this project is to preserve the original Pyramid Talent content structure while presenting it with a more premium, interactive, and enterprise-focused user experience.

---

## Live Demo

Vercel Deployment:  
`https://`

GitHub Repository:  
`https://github.come`

---

## Tech Stack

- React
- Vite
- SCSS
- Styled Components
- Framer Motion
- React Three Fiber
- Three.js
- Lucide React
- GSAP-style scroll/animation thinking, implemented mainly with Framer Motion and Three.js

---

## Project Overview

This homepage redesign is based on the Pyramid Talent website content and structure.

Key sections include:

- Hero section with animated visual treatment
- Introduction / value proposition
- Talent delivery system
- Our Services
- Industries We Serve
- Client and consultant testimonials
- Industry partnerships logo marquee
- Resources / More on Pyramid Talent
- Final CTA
- Footer

The design focuses on a premium dark UI, subtle motion, interactive sections, and a clear content hierarchy.

---

## Features

- Fully responsive layout for desktop, tablet, and mobile
- Interactive hero animation
- Scroll-based particle storytelling
- Click-based Industries section for better UX
- Mobile-friendly accordion behavior for industry tabs
- Animated service cards
- Horizontal testimonial interaction
- SVG logo marquee for industry partnerships
- Reusable data-driven components
- SCSS architecture with section-based styling
- Accessibility-conscious structure with semantic sections and labels
- SEO-conscious metadata and page structure

---

## UX Decisions

### Industries Section

The Industries section was changed from a scroll-driven tab interaction to a click-based tab system.

This improves usability because users are not forced to scroll through every industry before moving to the next section.

On smaller screens, the section uses vertical title tabs with dropdown cards to keep the interaction simple and mobile-friendly.

### Footer

The footer content stays close to the original Pyramid Talent footer structure. It includes only relevant links and brand information from the reference site, while improving spacing, contrast, and visual polish.

### Partner Logos

The Industry Partnerships section uses SVG logo URLs from the Pyramid Talent website. Since some logos are dark, CSS filters are used to make them visible on the dark UI.

---

## Accessibility Considerations

- Semantic HTML sections
- Proper `aria-label` usage where needed
- Button-based tab interactions
- Descriptive image alt text for partner logos
- Keyboard-friendly links and buttons
- Reduced visual clutter on mobile layouts

---

## SEO Considerations

Although this is a React/Vite client-rendered project, the implementation is SEO-conscious through:

- Semantic HTML structure
- Clear heading hierarchy
- Static metadata in `index.html`
- Meaningful section IDs
- Important text rendered as real HTML, not only canvas or images
- `robots.txt` and `sitemap.xml` support

For a production SEO-critical website, this project could be migrated to Next.js or another SSR/SSG framework.

---

## Performance Considerations

- Lazy loading used where appropriate
- Optimized Vite production build
- Canvas/particle animation limited for performance
- Reduced unnecessary re-renders
- Responsive layouts avoid heavy effects on smaller screens
- SVG logos loaded with `loading="lazy"` and `decoding="async"`

---

## Folder Structure

```txt
src/
  components/
    common/
    sections/
  data/
    homepageData.js
  styles/
    abstracts/
    base/
    components/
    sections/
  App.jsx
  main.jsx
