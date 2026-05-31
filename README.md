# Pyramid Talent Homepage Redesign

A premium, responsive homepage concept for **Pyramid Talent**, built using the content and business messaging from the existing Pyramid Talent homepage.

The goal of this project is not to copy the current website layout. Instead, it reinterprets the same content into a more modern, enterprise-grade, high-trust digital experience suitable for staffing, talent solutions, technology, and workforce transformation audiences.

---

## Live Demo

**Vercel Deployment**  
https://pyramid-talent.vercel.app

**GitHub Repository**  
https://github.com/preetimalik123/pyramid-talent-homepage

---

## Content Source

This redesign uses the existing Pyramid Talent homepage as the content base:

https://pyramidci.com/talent-home-page/

The content has been reorganized, shortened, and visually restructured to improve flow while keeping the core business message aligned with Pyramid Talent.

---

## Tech Stack

- **React.js** — component-based frontend structure
- **Vite** — fast development server and optimized production build
- **SCSS** — modular section-based styling
- **Styled Components** — component-scoped styling where useful
- **Framer Motion** — reveal animations, card transitions, and interaction states
- **Three.js** — WebGL-based particle and visual storytelling logic
- **React Three Fiber** — React renderer for Three.js scenes
- **Lucide React** — lightweight icon system
- **JavaScript / JSX** — application logic and UI composition

---

## Libraries Used

| Library | Purpose |
|---|---|
| React | UI rendering and component structure |
| Vite | Build tooling and local development |
| SCSS | Responsive layout, visual system, and section styles |
| Styled Components | Component-level styling support |
| Framer Motion | Scroll reveals, card animations, hover states, and motion polish |
| Three.js | Particle systems and WebGL visuals |
| React Three Fiber | React integration for Three.js |
| Lucide React | Icons for services, industries, and UI details |

---

## Setup Steps

### 1. Clone the repository

```bash
git clone https://github.com/preetimalik123/pyramid-talent-homepage.git
```

### 2. Move into the project folder

```bash
cd pyramid-talent-homepage
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the local development server

```bash
npm run dev
```

### 5. Create a production build

```bash
npm run build
```

### 6. Preview the production build locally

```bash
npm run preview
```

---

## Project Overview

The homepage is structured as a single responsive landing page with a premium dark visual direction, interactive storytelling, and enterprise-focused content hierarchy.

Key sections include:

- Navbar with section navigation
- Motion-led hero section
- Introduction and Pyramid Talent value proposition
- Animated statistics
- Employer and job seeker pathway cards
- Talent delivery / particle storytelling section
- Our Services cards
- Industries We Serve interactive tabs and mobile accordion
- Client and consultant testimonials
- Industry partnerships logo marquee
- Resources / More on Pyramid Talent
- Final CTA / Contact section
- Footer with brand family links and policy links

---

## Design Approach

The design approach focuses on:

- A **premium enterprise look** using dark UI, layered gradients, glass-style surfaces, and strong spacing
- A **clear business narrative** that explains Pyramid Talent as a global talent and workforce solutions partner
- A **modern interaction language** with scroll reveals, hover states, animated statistics, logo marquee, and WebGL-inspired storytelling
- A **clean section flow** that separates employer needs, job seeker pathways, services, industries, proof points, resources, and final action
- A **high-trust visual tone** suitable for enterprise buyers instead of a generic staffing template

The visual system avoids stock-photo dependence and uses typography, motion, cards, icons, grids, and particle visuals to create a distinct experience.

---

## Content Interpretation

The original Pyramid Talent content was used as the foundation, but the information architecture was improved for better storytelling.

Important content areas preserved or reinterpreted:

- Global talent solutions messaging
- Employer and job seeker pathways
- Enterprise proof points and animated statistics
- Service offerings
- Industries served
- Client and consultant testimonials
- Industry partnerships
- Resources and insights
- Final calls to action

Some copy was condensed or renamed to improve readability and page flow, while keeping the core business meaning intact.

---

## Responsiveness

The page is designed for desktop, tablet, and mobile.

Responsive decisions include:

- Fluid typography with `clamp()`
- Section spacing adjusted across breakpoints
- Card grids collapsing into single-column layouts
- Industries section using desktop tabs and mobile accordion behavior
- Footer and CTA sections restructured for tablet and mobile
- WebGL/particle visuals reduced and positioned more carefully on smaller screens
- Navigation converted into a mobile-friendly menu

---

## Interactivity and Motion

Interactions were used only where they support the user experience or help communicate the content.

Included interactions:

- Motion-led hero visual
- Scroll reveal animations
- Animated statistics
- Interactive service cards
- Click-based industries explorer
- Mobile accordion for industries
- Horizontal testimonial/proof interaction
- Logo marquee for partnerships
- Particle storytelling for talent delivery and global network concepts
- Micro-interactions on CTAs, cards, tabs, and navigation links


---

## Reusable Component Structure

The project uses reusable components to keep the code maintainable.

Examples:

- `CTAButton` for shared button and link styling
- `SectionHeader` for consistent section headings
- `Reveal` for reusable reveal animation behavior
- `ResourceCard` for resources
- `PathwayCard` for employer/job seeker pathways
- Data-driven services, industries, resources, stats, and CTA content through `homepageData.js`

Shared visual button styles are kept in the SCSS component layer so buttons do not need one-off styling in every section.

---

## Accessibility Considerations

Basic accessibility practices were included throughout the project:

- Semantic HTML sections
- Meaningful section IDs
- Proper heading structure
- Descriptive `aria-label` usage where needed
- Buttons used for interactions and links used for navigation
- Keyboard-friendly tabs, links, and mobile menu controls
- `aria-expanded`, `aria-controls`, and current-state handling where relevant
- Decorative visual layers marked with `aria-hidden`
- Images and logos use descriptive `alt` text
- Focus-visible styles for keyboard users
- Sufficient contrast considered across dark UI surfaces

---

## SEO Considerations

Although this project uses React/Vite and is client-rendered, the implementation is SEO-conscious.

SEO-related decisions include:

- Important content rendered as real HTML
- Clear heading hierarchy
- Static metadata in `index.html`
- Meaningful section IDs
- Descriptive page title and metadata
- `robots.txt` and `sitemap.xml` support
- Internal navigation through anchor links
- Avoiding important text inside canvas-only visuals

For a production SEO-critical website, this project could be migrated to Next.js or another SSR/SSG framework.

---

## Performance Considerations

Performance was considered because the page uses animation and WebGL-style visuals.

Performance-conscious decisions include:

- Vite production build
- Reusable components to reduce repeated logic
- SVG logos instead of heavy raster images where possible
- Lazy loading for brand and logo images where appropriate
- Decorative visuals separated from core content
- Reduced interaction complexity on tablet and mobile
- Avoiding unnecessary scroll-jacking
- Keeping key text outside canvas/WebGL
- Limiting heavy visual effects on smaller screens where needed

---

## Assumptions

- The site is a homepage concept, not a production replacement for the current Pyramid Talent website.
- Some copy was shortened for visual rhythm and readability.
- Some external logo URLs are referenced directly from Pyramid-owned pages.
- The same brand family structure from Pyramid Consulting, Pyramid Talent, Celsior, and GenSpark is represented in the footer.
- CTA links point to the closest relevant Pyramid pages available publicly.

---

## Limitations

- The project is built with React/Vite, so it does not provide full server-side rendering.
- Some animations and WebGL visuals may perform differently across low-end devices.
- Contact forms, CMS integration, analytics, and backend functionality are not included.
- The resources section uses static data rather than a live blog feed.
- Some external links and brand assets depend on availability from their public URLs.
- Lighthouse performance may vary depending on device, network, and WebGL rendering conditions.

---

## Styling Structure

The styling is organized using SCSS partials.

General structure:

```txt
src/
  components/
  data/
  styles/
    abstracts/
    base/
    components/
    sections/
```

The SCSS is separated by responsibility:

- `abstracts/` contains shared tokens and mixins
- `base/` contains global styles
- `components/` contains reusable component styles
- `sections/` contains page section styles

This keeps the project easier to maintain and avoids putting all styles into one large file.


---

## Available Scripts

```bash
npm run dev
```

Runs the project locally.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run preview
```

Previews the production build locally.

---

## Deployment

The project is deployed on Vercel.

Recommended Vercel settings:

```txt
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

## Submission Notes

This project was created to demonstrate:

- Design interpretation
- Premium frontend execution
- Responsive layout decisions
- Thoughtful interactivity
- React component structure
- SCSS organization
- Accessibility awareness
- SEO-conscious structure
- Performance-conscious implementation

The final result is intended to show how Pyramid Talent’s existing business content can be transformed into a more modern, polished, and enterprise-focused homepage experience.
