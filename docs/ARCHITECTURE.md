# System Architecture & Technical Specification

> **Project:** Muhammad Nafiz Portfolio (`muhammadnafiz.dev`)  
> **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS  
> **Animation Engine:** GSAP (ScrollTrigger) + Lenis Smooth Scroll + Framer Motion  
> **Deployment Target:** Vercel / Cloudflare Pages  

---

## 1. Directory & Codebase Architecture

```
muhammad-nafiz-portfolio/
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT.md
│   ├── ANIMATION_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── TASKS.md
│   └── reference/
│       ├── 1.png .. 4.png
│       └── sabbirhossien.com site video.mp4
├── public/
│   ├── images/
│   │   ├── nafiz.png               # Hero portrait (purple studio background)
│   │   └── projects/
│   │       ├── roktofinder-logo.jpg # RoktoFinder brand icon
│   │       ├── roktofinder-1.png   # Normalized RoktoFinder screenshots
│   │       ├── roktofinder-2.png
│   │       ├── roktofinder-3.png
│   │       └── janibd-preview.png  # High-fidelity preview graphic
│   ├── logo/
│   │   ├── mark.svg                # 56x56 MN monogram mark
│   │   ├── logo-on-dark.svg        # Monogram + Muhammad Nafiz (light text)
│   │   └── logo-on-light.svg       # Monogram + Muhammad Nafiz (dark text)
│   ├── favicon.ico
│   ├── site.webmanifest
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML, fonts, Lenis provider, metadata
│   │   ├── page.tsx                # Single-page composed narrative
│   │   ├── globals.css             # Tailwind layers, CSS variables, clip-path rules
│   │   ├── sitemap.ts              # Dynamic sitemap generator
│   │   ├── robots.ts               # Robots crawling directive
│   │   └── opengraph-image.tsx     # Dynamic Edge OG card generator
│   ├── components/
│   │   ├── animation/
│   │   │   ├── SmoothScroll.tsx    # Lenis + GSAP RAF synchronization provider
│   │   │   ├── BlockGridReveal.tsx # Grayscale-to-color hero photo grid
│   │   │   ├── MaskedText.tsx      # Word-by-word staggered hero headline reveal
│   │   │   ├── ScrollRevealText.tsx# Scroll-linked scrub text (Journey & About)
│   │   │   ├── ProjectIconTile.tsx # Floating squircle icon with soft shadow & hover tilt
│   │   │   ├── Magnet.tsx          # Magnetic button physics wrapper
│   │   │   ├── TiltCard.tsx        # 3D perspective card with radial spotlight
│   │   │   └── Counter.tsx         # ScrollTrigger numeric count-up
│   │   ├── common/
│   │   │   ├── Navbar.tsx          # Adaptive dark/light sticky header & inverting pill
│   │   │   ├── Footer.tsx          # Dark footer with live time & back-to-top
│   │   │   ├── Button.tsx          # Polymorphic magnetic pill button
│   │   │   ├── Badge.tsx           # Status indicator pills (Live, In Dev, etc.)
│   │   │   ├── SectionHeader.tsx   # Overline tag with thin leading line + headline
│   │   │   └── SlantedDivider.tsx  # Diagonal clip-path section transition boundary
│   │   └── sections/
│   │       ├── Preloader.tsx       # MN Monogram intro curtain
│   │       ├── Hero.tsx            # Headline, CTA, stats, portrait
│   │       ├── Marquee.tsx         # Tech stack infinite ticker
│   │       ├── Projects.tsx        # RoktoFinder, JaniBD, DesignAngle + Icon Tiles
│   │       ├── Journey.tsx         # Pinned milestone timeline + scrubbed intro text
│   │       ├── About.tsx           # Scrubbed statement + verified fact matrix
│   │       └── Contact.tsx         # Editorial "Say hello" + social rows
│   ├── data/
│   │   └── site.ts                 # SINGLE SOURCE OF TRUTH for all content & links
│   ├── lib/
│   │   ├── gsap.ts                 # GSAP & ScrollTrigger SSR-safe registration
│   │   └── utils.ts                # Tailwind class merge (clsx + twMerge)
│   └── types/
│       └── index.ts                # TypeScript interfaces (Project, Milestone, etc.)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 2. Centralized Data Architecture (`src/data/site.ts`)

All site content, URLs, navigation paths, and verified facts are strictly managed within `src/data/site.ts`. No hardcoded external URLs or logo paths in components.

```typescript
export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  isExternal: boolean;
}

export interface ProjectIconConfig {
  type: 'image' | 'monogram';
  imageSrc?: string;
  monogramText?: string;
  bgVariant: 'off-white' | 'dark' | 'brand';
  alt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  communityContext?: string;
  status: 'live' | 'in-development' | 'agency';
  statusLabel: string;
  url?: string;
  isExternal: boolean;
  tags: string[];
  images: string[];
  icon: ProjectIconConfig; // Centralized icon configuration
}

export interface JourneyMilestone {
  phase: string;
  title: string;
  status: 'solidified' | 'active' | 'in-progress' | 'roadmap';
  statusLabel: string;
  description: string;
  technologies: string[];
}

export interface SiteConfig {
  name: string;
  nameBengali: string;
  title: string;
  tagline: string;
  location: string;
  domain: string;
  socials: SocialLink[];
  stats: Array<{ value: string; label: string; detail: string }>;
  techStack: string[];
  projects: ProjectItem[];
  journey: {
    introStatement: string;
    milestones: JourneyMilestone[];
  };
  about: {
    statement: string;
    facts: Array<{ label: string; value: string; source: string }>;
  };
}
```

---

## 3. Component Hierarchy & Rendering Strategy

| Component | Type | Responsibility | Performance Consideration |
| :--- | :--- | :--- | :--- |
| `layout.tsx` | Server | Font injection, metadata tags, global viewport wrapping. | Zero hydration penalty. |
| `SmoothScroll.tsx` | Client | Initializes Lenis and hooks into `gsap.ticker`. | Destroys instance on unmount; disables on mobile if CPU throttled. |
| `Navbar.tsx` | Client | Monitors scroll direction & theme intersection to flip colors and pill style. | Passive scroll listener throttled via GSAP ScrollTrigger. Links to `#contact`. |
| `Preloader.tsx` | Client | Fullscreen entry sequence; triggers unmount when complete. | Self-unmounts from DOM after exit to free memory. |
| `Hero.tsx` | Client | Word reveal, block-grid portrait animation, count-up stats. | Uses `priority` on Next.js `<Image>` for immediate LCP. |
| `Marquee.tsx` | Client | CSS-only infinite horizontal loop with hover pause. | Runs on compositor thread (`transform: translateX`). |
| `SlantedDivider.tsx`| Client/CSS | Renders diagonal clip-path angled cut between dark & light sections. | Pure CSS clip-path with subpixel bleed; zero reflow. |
| `ProjectIconTile.tsx`| Client | Floating squircle with ambient bob, soft shadow & hover tilt. | Keyframe CSS float + Framer Motion hover tilt; paths from `site.ts`. |
| `ScrollRevealText.tsx`| Client | Word-by-word scroll-linked scrub text for About and Journey. | Spans scrubbed via GSAP ScrollTrigger; fallback to static text. |
| `Projects.tsx` | Client | Renders interactive project cards with 3D tilt. | Tilt calculations isolated to card boundaries; disabled on touch. |
| `Journey.tsx` | Client | GSAP ScrollTrigger pinning and SVG line drawing. | Pinning automatically disabled on viewport width $< 768\text{px}$. |
| `About.tsx` | Client | High-density fact matrix table with scrubbed statement. | Lightweight semantic HTML table. |
| `Contact.tsx` | Client | Full-width interactive link rows with hover arrow translation. | CSS-only transforms on hover. |
| `Footer.tsx` | Client | Real-time Mymensingh clock and smooth back-to-top trigger. | Lightweight interval timer (updates once every 60s). |

---

## 4. GSAP & Lenis Synchronization Engine

To guarantee zero stutter between smooth scrolling and scroll-triggered animations:

```typescript
// src/lib/gsap.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

```typescript
// Synchronizing Lenis with GSAP ScrollTrigger in SmoothScroll.tsx
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(updateTicker);
    lenis.destroy();
  };
}, []);
```

---

## 5. Performance Budget & Core Web Vitals (CWV)

| Metric | Target Budget | Strategy to Achieve |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | $< 1.2\text{s}$ | Hero portrait served via Next/Image with `priority`, WebP/AVIF format, static SVG logo. |
| **First Input Delay / INP** | $< 80\text{ms}$ | Zero heavy JavaScript blocking main thread; animations run via GSAP transforms. |
| **Cumulative Layout Shift (CLS)** | $0.00$ | Google Fonts loaded via `next/font` with zero layout shift; explicit image aspect ratios. |
| **Total JavaScript Bundle** | $< 185\text{kB}$ (gzipped) | Tree-shaken GSAP plugins, modular Framer Motion imports, zero unnecessary libraries. |
| **First Contentful Paint (FCP)** | $< 0.8\text{s}$ | Inline critical CSS, server-rendered HTML skeleton. |

---

## 6. SEO, Structured Data & Social Share Architecture

### 6.1 Meta Tag Definition
- **Title:** `Muhammad Nafiz — Web Developer & Aspiring AI Engineer`
- **Description:** `Portfolio of Muhammad Nafiz, web application developer and founder based in Mymensingh, Bangladesh. Building RoktoFinder, JaniBD, and mastering Deep Learning.`
- **Canonical URL:** `https://muhammadnafiz.dev`
- **Keywords:** `Muhammad Nafiz, Web Developer Bangladesh, AI Engineer, Deep Learning, RoktoFinder, JaniBD, DesignAngle, Mymensingh Developer, Next.js Portfolio`

### 6.2 Dynamic OpenGraph Card (`src/app/opengraph-image.tsx`)
Using `@vercel/og` Edge runtime:
- Visual canvas: `#0c0a12` dark background.
- Left side: MN monogram mark in `#7600ff`, headline *"Muhammad Nafiz"*, sub-line *"Web developer today, AI engineer in the making."*
- Right side: Studio portrait of Nafiz.
- Bottom bar: `muhammadnafiz.dev // Mymensingh, Bangladesh`.
