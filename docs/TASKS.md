# Implementation Tasks & Roadmap

> **Project:** Muhammad Nafiz Portfolio (`muhammadnafiz.dev`)  
> **Status:** All Core Build Stages Implemented & Production-Verified.

---

## Stage 0: Architectural Alignment & Planning
- [x] Analyze reference aesthetic (`sabbirhossien.com` screenshots & video in `/docs/reference/`).
- [x] Formulate design tokens, typography scale, and WCAG AA contrast proofs (`DESIGN_SYSTEM.md`).
- [x] Draft final un-fabricated content matrix with `[TODO]` placeholders (`CONTENT.md`).
- [x] Author technical animation and motion curves specification (`ANIMATION_SPEC.md`).
- [x] Define application directory structure, data schema, and performance budget (`ARCHITECTURE.md`).
- [x] Integrate 5 design additions (Project Icon Tiles, Slanted Dividers, Adaptive Nav, Scroll-Linked Scrubbed Text, Mono Labels with Leading Line).
- [x] Deliver task breakdown and await user approval before writing code (`TASKS.md`).

---

## Stage 1: Next.js Project Initialization & Tooling
- [x] Initialize Next.js 15+ (App Router) project with TypeScript and Tailwind CSS.
- [x] Install production dependencies:
  - `tailwind-merge`, `clsx`
  - `lenis`
  - `gsap`
  - `framer-motion`
  - `lucide-react`
- [x] Configure `next.config.mjs` (image optimization formats, strict React mode).
- [x] Verify clean local compilation without warnings.

---

## Stage 2: Design Tokens, Fonts & Asset Organization
- [x] Configure Google Fonts in `src/app/layout.tsx` via `next/font/google`:
  - `Inter_Tight` (weights: 400, 500, 600, 700, 800)
  - `Instrument_Serif` (italic: true, weight: 400)
  - `JetBrains_Mono` (weights: 400, 500)
- [x] Update `tailwind.config.ts` with custom colors:
  - Brand: `#7600ff`, Brand Tint: `#a566ff`, Glow: `rgba(118,0,255,0.25)`
  - Dark Palette: `#0c0a12`, `#14101c`, `#1c1727`, Text: `#f4f1fa`, Muted: `#9d96b0`
  - Light Palette: `#f8f7fc`, `#ffffff`, `#f2f0f8`, Text: `#14101c`, Muted: `#585168`
  - Slanted section clip-path utilities and custom border radii.
- [x] Organize and verify image assets in `/public`:
  - Portrait placed at `/public/images/nafiz.png` and `/public/images/nafiz.jpg`.
  - RoktoFinder logo placed at `/public/images/projects/roktofinder-logo.jpg`.
  - RoktoFinder screenshots normalized into `/public/images/projects/roktofinder-1..4.png`.
  - SVG logos (`mark.svg`, `logo-on-dark.svg`, `logo-on-light.svg`) integrated.

---

## Stage 3: Data Layer & Site Configuration
- [x] Create `src/types/index.ts` declaring types for Social, Project, ProjectIcon, Milestone, and Fact items.
- [x] Author `src/data/site.ts` with complete data from `CONTENT.md`:
  - Profile metadata (Name, Location, Taglines).
  - Centralized project logo configuration (RoktoFinder image path, JaniBD monogram "JB", DesignAngle monogram "DA").
  - Social accounts (GitHub, LinkedIn, Facebook, X, DesignAngle).
  - 3 Honest Stat metrics (`01`, `02`, `DL`).
  - Marquee tech stack array.
  - 3 Projects (RoktoFinder [Live], JaniBD [In Development], DesignAngle [Agency]).
  - 5 Journey milestones (Founding to AI Horizon) + scrubbed statement text.
  - About statement text + 10+ Fact table records.

---

## Stage 4: Global Layout, Smooth Scroll & Adaptive Navbar
- [x] Build `src/components/animation/SmoothScroll.tsx` integrating Lenis with GSAP's primary ticker.
- [x] Build `src/components/common/Navbar.tsx`:
  - Sticky glassmorphic shell with MN Monogram mark + name.
  - Section links (`Projects`, `Journey`, `About`, `Stack`).
  - Inverting Action Pill Button (`✦ Connect`) linking to `#contact`.
  - Directional auto-hide on scroll down, instant reveal on scroll up.
  - Dynamic contrast swap when intersecting light and dark sections (light text on dark, dark text on light).
- [x] Build `src/components/common/SectionHeader.tsx`:
  - Small mono label with thin leading line (`—  LABEL`).
  - Display headline with fluid typography.
- [x] Build `src/components/common/Footer.tsx`:
  - Dark `#0c0a12` container.
  - Live local time clock for Mymensingh, BD (UTC+6).
  - Smooth back-to-top button.

---

## Stage 5: Preloader & Hero Section
- [x] Build `src/components/sections/Preloader.tsx`:
  - SVG MN mark with drawing perimeter stroke.
  - Numerical counter ($00\% \to 100\%$).
  - Upward curtain exit transition.
- [x] Build `src/components/sections/Hero.tsx`:
  - Overline badge with thin leading line and pulsing live dot.
  - Word-by-word masked headline: *"I'm Muhammad Nafiz. Web developer today, AI engineer in the making."* (*making.* in Instrument Serif Italic `#a566ff`).
  - Sub-headline: *"I turn real problems into working products."*
  - Dual magnetic pill buttons.
  - Three count-up stats (`01`, `02`, `DL`).
  - Portrait photo container with block-grid reveal (black-and-white to color).

---

## Stage 6: Tech Stack Marquee & Slanted Divider
- [x] Build `src/components/sections/Marquee.tsx`:
  - CSS-driven dual flex strip running seamless horizontal loop.
  - Technology items separated by `#a566ff` diamond glyphs.
  - Fluid pause on hover.
- [x] Slanted section divider:
  - Diagonal clip-path slope cutting from dark marquee into light sections.
  - Anti-aliased subpixel bleed to prevent visual seam gaps.

---

## Stage 7: Selected Projects Showcase & Floating Icon Tiles
- [x] Build `src/components/animation/ProjectIconTile.tsx`:
  - App-icon style squircle tile (`rounded-3xl`, pre-rotated `-5deg`, rich soft shadow).
  - Ambient floating bob animation (`translateY(-5px)` to `+5px`).
  - Hover micro-tilt and scale ($1.06\times$).
  - RoktoFinder tile: rendered on off-white or dark tile (never red background).
  - JaniBD & DesignAngle tiles: rendered with monograms "JB" and "DA".
  - Icon source loaded dynamically from `site.ts`.
- [x] Build `src/components/animation/TiltCard.tsx` (3D perspective tilt + cursor radial glow).
- [x] Build `src/components/sections/Projects.tsx`:
  - **RoktoFinder Card:** Floating icon tile, live badge, community origin note, feature pills, live URL button, parallax screenshot gallery.
  - **JaniBD Card:** Floating monogram tile, in-development badge, tagline, module breakdown, interactive preview card.
  - **DesignAngle Card:** Floating monogram tile, agency badge, services summary, outbound link.

---

## Stage 8: Pinned Journey Timeline & Scroll-Linked Text
- [x] Build `src/components/animation/ScrollRevealText.tsx`:
  - Large statement text where words start faded (`opacity: 0.15`) and illuminate to solid (`opacity: 1.0`) via GSAP ScrollTrigger scrub.
- [x] Build `src/components/sections/Journey.tsx`:
  - Scroll-linked intro statement paragraph.
  - Left column pinned section title and narrative description using GSAP ScrollTrigger.
  - Right column scrolling milestone cards (Phases 01 to 05).
  - Dynamic vertical progress line.
  - Visual node indicators when reaching milestones.

---

## Stage 9: About Section & Verified Fact Matrix
- [x] Build `src/components/sections/About.tsx`:
  - Overline tag with thin leading line (`—  BACKGROUND & ETHOS`).
  - Scroll-linked statement paragraph (word-by-word illumination on scroll).
  - Responsive tabular specification matrix displaying verified data (Identity, Focus, Location, Tech).

---

## Stage 10: Slanted Return & Contact Section
- [x] Apply reciprocal slanted clip-path transition returning background from light to dark `#0c0a12`.
- [x] Build `src/components/sections/Contact.tsx`:
  - Display headline: *"Say hello."* (*hello.* in Instrument Serif Italic `#a566ff`).
  - Full-width interactive link rows for GitHub, LinkedIn, Facebook, X, and DesignAngle.
  - Hover micro-interactions: arrow rotation/translation and row background highlight.

---

## Stage 11: Polish, Accessibility & Motion Verification
- [x] Run complete WCAG 2.1 AA audit on text and button contrasts.
- [x] Verify `prefers-reduced-motion: reduce`:
  - Disables smooth scroll, tilt, magnetic physics, floating bobs, and pinned scrubbing.
  - Replaces all entrance animations and scrubbed text with immediate opacity fades / static solid text.
- [x] Verify responsive behavior across mobile and desktop breakpoints.

---

## Stage 12: SEO, Dynamic OG Image & Deployment Preparation
- [x] Configure `src/app/sitemap.ts` and `src/app/robots.ts`.
- [x] Build `src/app/opengraph-image.tsx` using `@vercel/og` Edge runtime.
- [x] Verify production static build (`npm run build`) passing with zero errors.
