# Charrie Castillo — Portfolio (Complete edition)

The fifth iteration. Builds on the **Refined** version with three substantial additions:

1. A consistent, predictable horizontal-padding system (48 / 32 / 24 px)
2. Accessibility hardening across every page
3. A header **"Get in touch"** CTA, and a full work section with **8 distinct case study pages**

Pure HTML / CSS / vanilla JS — no build step, no dependencies, no bundler.

---

## File structure

```
portfolio-complete/
├── index.html             Home
├── work.html              Work index (8 cards)
├── about.html             About + experience + recognition + toolkit
├── contact.html           Contact (CTA marked aria-current here)
├── styles.css             ~50 KB — all styles
├── script.js              ~5 KB — theme, mobile menu, reveals
├── charrie.jpg            Portrait
├── README.md              This file
└── work/                  ← 8 case study pages
    ├── amadeus-marketing.html
    ├── gpm-website.html
    ├── amadeus-api-portal.html
    ├── amadeus-design-system.html
    ├── dnv-monitoring.html
    ├── bhs-iot-dashboards.html
    ├── bhs-mobile-flows.html
    └── fujifilm-brand.html
```

---

## 1. Consistent horizontal padding (the gutter system)

Every page and every section uses the same `.shell` wrapper — and `.shell`'s horizontal padding is driven by a single `--gutter` token. The token is set explicitly with media queries (not `clamp()`), so the values are predictable at any breakpoint:

| Breakpoint            | Gutter      | Section vertical padding |
| --------------------- | ----------- | ------------------------ |
| Desktop (≥ 1024 px)   | **48 px**   | 8 rem                    |
| Tablet (640–1023 px)  | **32 px**   | 6 rem                    |
| Mobile (< 640 px)     | **24 px**   | 4 rem                    |

```css
:root { --gutter: 1.5rem; }                /* 24 px */
@media (min-width: 640px)  { :root { --gutter: 2rem; } }  /* 32 px */
@media (min-width: 1024px) { :root { --gutter: 3rem; } }  /* 48 px */

.shell { padding: 0 var(--gutter); max-width: 1340px; margin: 0 auto; }
```

The nav uses the same `--gutter` for its outer margin, so the floating pill aligns flush with section content at every breakpoint.

---

## 2. Accessibility hardening

Every page now ships with:

- **Skip link** at the top of `<body>` (`.skip-link`) — hidden off-screen until keyboard-focused, then slides into view as a pill near the top-left. Lands on `#main`.
- **Semantic landmarks**: `<header role="banner">`, `<main id="main">`, `<nav aria-label="Primary">`, `<footer role="contentinfo">`, `<article>` for experience entries, `<section aria-labelledby="…">` throughout.
- **`aria-current="page"`** on the active nav link (set by JS for the 3 page links, hardcoded as `class="active"` on case-study pages so the Work link stays active inside `/work/`). Also applied to the **Get in touch** CTA when on `contact.html`.
- **`:focus-visible` outlines** on all interactive elements — 3 px solid `--c-ocean` (light theme), 3 px solid `--c-sky-soft` (dark theme), with 3 px offset and rounded corners.
- **44 × 44 px touch targets** (`--touch-min`) applied to every interactive element: nav links, theme toggle, hamburger, brand link, back link, contact CTA. Matches WCAG 2.5.5 Level AAA.
- **Bumped colour contrast** for muted greys: `--ink-muted` (#4F5A63) and `--ink-faint` (#6F7A82) in light theme, lightened equivalents in dark — both now pass WCAG AA on body backgrounds.
- **`aria-expanded` + `aria-controls`** on the hamburger button (controls the `#primary-nav` list); label switches between "Open menu" and "Close menu" via JS.
- **`aria-label`** on every icon-only button (theme toggle, hamburger, contact-card arrows).
- **`aria-hidden="true"`** on decorative ambient blobs, brand mark, chip dots, marquee, and preview compositions — keeping screen readers focused on actual content.
- **`role="img"` + `aria-label`** on the case study hero and before/after frames (they are visually present and meaningful, so they get a name rather than being hidden).
- **`.sr-only`** utility for screen-reader-only text where needed.
- **`prefers-reduced-motion`** honoured — all animations including the ambient blobs, marquee, hero word-rise, and reveals stop or skip when the user has reduced motion on.
- **Heading hierarchy**: one `<h1>` per page, `<h2>` for case-study section titles, etc. No skipped levels.
- **Keyboard mobile menu**: Escape closes it and returns focus to the hamburger button. Clicking outside also closes it.

---

## 3. Header "Get in touch" CTA

Sits on the right side of the header at all breakpoints, with adaptive placement:

- **Desktop / tablet (≥ 881 px)** — gradient pill inside `.nav__actions`, to the left of the hamburger and theme toggle. Subtle gradient-shift animation, magnetic hover lift, soft outer shadow.
- **Mobile (≤ 880 px)** — hidden in the header pill (which is space-constrained) and instead shown at the bottom of the hamburger dropdown menu as a full-width gradient pill. The hamburger dropdown closes when this CTA is tapped.

The previous "Contact" page-link is **removed from the nav** — the CTA replaces it. The CTA is highlighted with `aria-current="page"` when the visitor is already on `contact.html`, providing a non-visual cue.

---

## 4. Eight case study pages

The work index now shows 8 cards. Each card is a real link to a real case study page in `/work/`. Each case study follows the same 6-section format:

```
01 · Brief intro          Role · Duration · Team — plus a short framing paragraph
02 · Context & problem    What was being solved, and why it mattered
03 · Design process       Key decision moments and iterations (3 anchored bullets)
04 · Before & after       Visual comparison frame
05 · Collaboration        How I worked with PMs, engineers, researchers
06 · Impact               4-metric grid with the headline outcomes
```

Plus a "Next case study" link at the bottom (cycles 1 → 2 → … → 8 → 1), a CTA to contact, and the footer.

| # | Case study                                       | Slug                      |
|---|--------------------------------------------------|---------------------------|
| 1 | Amadeus Global Digital Marketing Hub              | `amadeus-marketing`       |
| 2 | GreenPowerMonitor Website Redesign                | `gpm-website`             |
| 3 | Amadeus Global Travel API Portal Revamp           | `amadeus-api-portal`      |
| 4 | New Amadeus Design System                         | `amadeus-design-system`   |
| 5 | DNV Renewable Energy Monitoring &amp; Asset Mgmt  | `dnv-monitoring`          |
| 6 | BHS Industrial IoT Operator Dashboards            | `bhs-iot-dashboards`      |
| 7 | BHS Mobile Maintenance &amp; Field Flows          | `bhs-mobile-flows`        |
| 8 | Fujifilm Brand &amp; Marketing Campaigns          | `fujifilm-brand`          |

### Case study layout

The case section is a **two-column grid with a sticky head**: the section number + title sit on the left, and the body content (paragraphs, bullets, meta grid, before/after, metrics) flow on the right. The head sticks at `top: 6rem` so it stays visible as the reader scrolls through the body. Below 880 px the grid collapses to single-column and the sticky behaviour falls back to natural flow.

Hero image and before/after panels use the same CSS-generated `pv-*` preview compositions as the work cards — blown up to 16:9 (hero) and 4:3 (before/after). A muted `.pv-before` variant gives the "before" panel an older, lower-saturation feel. The mobile case study uses a `.pv-before--mobile` variant with a phone-shaped before mockup.

---

## What carried over from previous versions

- Typography (Bricolage Grotesque + Plus Jakarta Sans + JetBrains Mono)
- Coastal + earth-tone palette (deep sea, ocean, sea-green, sage, clay, sand)
- Glass surfaces, ambient blobs, marquee, scroll reveals
- Theme toggle (light / dark) — system preference respected, persisted to localStorage as `cc-theme-c`
- Editorial responsive type scale (`clamp()` on `.display-xl/-l/-m`)
- Portrait composition with conic-gradient ring
- 14:9-ish hero image dimensions across pages

---

## Browser support

Modern evergreen browsers. Uses `:focus-visible`, `aspect-ratio`, `backdrop-filter`, CSS variables, IntersectionObserver, `text-wrap: balance`, `prefers-reduced-motion`, `prefers-color-scheme`. No IE 11 fallbacks.

---

## How to view

Open `index.html` in any modern browser. For accurate mobile rendering, use Chrome / Safari / Firefox responsive mode at 380 px, 768 px (tablet), and ≥ 1024 px (desktop). The `clamp()` and `text-wrap: balance` features are not faithfully rendered by older preview tools — the live browser is the source of truth.
