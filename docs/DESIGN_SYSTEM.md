# Design System Specification

> **Project:** Muhammad Nafiz Portfolio (`muhammadnafiz.dev`)  
> **Creative Direction:** High-contrast editorial minimalism with alternating dark/light rhythm, angled section cuts, and tactile floating app-icon accents.  
> **Brand Identity:** Deep Charcoal / Electric Violet / Warm Violet Tint  
> **Status:** Updated for Round 1 Fixes (1280x600 viewport budget, solid backdrop blur, real section order).  

---

## 1. Color Palette & Thematic Lighting System

The website features an **alternating section architecture** (no manual theme toggle). The visual environment transitions dynamically between Dark mode (cinematic, immersive) and Light mode (crisp, editorial readability), anchored by `#7600ff` and its high-contrast tints.

### 1.1 Core Palette Tokens

| Token Name | Hex Code | Role | Description |
| :--- | :--- | :--- | :--- |
| `color-brand-primary` | `#7600ff` | Primary Accent (Light Mode) | Pure electric violet brand color. Applied on light backgrounds and brand assets. |
| `color-brand-tint` | `#a566ff` | Primary Accent (Dark Mode) | Light violet tint engineered specifically to meet WCAG AA contrast on dark surfaces. |
| `color-brand-glow` | `rgba(118, 0, 255, 0.25)` | Ambience / Halo | Soft radial lighting beneath cards, hero portrait, and cursor followers. |
| `color-dark-bg` | `#0c0a12` | Background (Dark Sections) | Very deep obsidian with a subtle cool purple undertone. |
| `color-dark-surface` | `#14101c` | Surface / Card (Dark) | Elevated surface container for dark mode components. |
| `color-dark-surface-hover` | `#1c1727` | Surface Hover (Dark) | Interactive hover state for dark containers. |
| `color-dark-border` | `rgba(244, 241, 250, 0.10)` | Stroke / Border (Dark) | Subtle boundary separation on dark surfaces. |
| `color-dark-text-primary` | `#f4f1fa` | Foreground Text (Dark) | Off-white with 95% luminance, reducing harsh glare. |
| `color-dark-text-muted` | `#9d96b0` | Secondary Text (Dark) | Balanced secondary copy for sub-headlines and captions. |
| `color-light-bg` | `#f8f7fc` | Background (Light Sections) | Warm, clean tinted white delivering comfortable reading contrast. |
| `color-light-surface` | `#ffffff` | Surface / Card (Light) | Pure white elevated cards inside light sections. |
| `color-light-surface-hover`| `#f2f0f8` | Surface Hover (Light) | Light component hover elevation. |
| `color-light-border` | `#e3def0` | Stroke / Border (Light) | Refined structural border for cards and dividers. |
| `color-light-text-primary` | `#14101c` | Foreground Text (Light) | Deep obsidian tone for high-contrast typography. |
| `color-light-text-muted` | `#585168` | Secondary Text (Light) | Medium grey-lavender for body text and descriptive lists. |

---

## 2. WCAG 2.1 Contrast Audits & Accessibility Proof

1. **Brand Primary (`#7600ff`) on Dark Background (`#0c0a12`):**
   - Contrast Ratio: **3.01:1** (Fails normal body text; passes large headings).
   - **System Rule:** Never render `#7600ff` as normal body text over dark backgrounds.
2. **Accent Tint (`#a566ff`) on Dark Background (`#0c0a12`):**
   - Contrast Ratio: **5.60:1** (**PASSES WCAG AA** for body text and links).
3. **Text Primary (`#f4f1fa`) on Dark Background (`#0c0a12`):**
   - Contrast Ratio: **17.64:1** (**PASSES WCAG AAA**).
4. **Brand Primary (`#7600ff`) on Light Background (`#f8f7fc`):**
   - Contrast Ratio: **6.17:1** (**PASSES WCAG AA**).
5. **Text Primary (`#14101c`) on Light Background (`#f8f7fc`):**
   - Contrast Ratio: **16.82:1** (**PASSES WCAG AAA**).

---

## 3. Viewport Budget & Typography Hierarchy (1280x600 Rule)

### 3.1 1280x600 Viewport Rule
At $1280 \times 600\text{px}$, the entire Hero section must fit without scrolling:
- Top padding reduced to `pt-16 sm:pt-20`.
- Headline clamped to maximum 4 lines: `text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem]` with line height `1.08`.
- Sub-headline, narrative paragraph, and dual buttons completely visible above the fold.
- Portrait container clamped to `max-w-[280px]` to `max-w-[360px]`.
- Three stats cards integrated in bottom baseline.

### 3.2 Small Mono Labels with Leading Line
- **Format:** `—  [SECTION_TAG]`
- **Styling:** `w-6 h-[1.5px] rounded-full` decorative rule preceding uppercase JetBrains Mono label.

---

## 4. Slanted Section Transitions & Nav Contrast

### 4.1 Slanted Boundaries
- Dark-to-Light: `clip-path: polygon(0 0, 100% 4vw, 100% 100%, 0 100%)`, `margin-top: -4vw`.
- Light-to-Dark: `clip-path: polygon(0 4vw, 100% 0, 100% 100%, 0 100%)`, `margin-top: -4vw`.

### 4.2 Nav Contrast Guarantee Across Slanted Seam
To prevent any text unreadability as the navbar passes over the diagonal cut:
- Navbar capsule employs a dense backdrop blur (`backdrop-blur-xl`).
- On dark: `bg-[#0c0a12]/90 border-white/10 text-[#f4f1fa]`.
- On light: `bg-white/95 border-black/10 text-[#14101c]`.
- Theme switches at `50px` from `#projects` and `#contact` tops, matching the header coordinate space. Contrast always passes WCAG AAA.

---

## 5. Navigation Bar & Active Section Highlight

### 5.1 Real Page Section Order
The navigation links match the real page order:
1. `Stack` (`#stack`)
2. `Projects` (`#projects`)
3. `Journey` (`#journey`)
4. `About` (`#about`)
*(Action pill button links directly to `#contact`)*

### 5.2 IntersectionObserver
Monitors `['hero', 'stack', 'projects', 'journey', 'about', 'contact']` with `rootMargin: '-20% 0px -55% 0px'`. Whichever section passes through the reading zone triggers the active pill highlight.

---

## 6. Project App-Icon Tile Component

- **Dimensions:** `w-20 h-20` ($80\text{px}$) to `w-24 h-24` ($96\text{px}$).
- **Curvature:** `rounded-3xl` ($24\text{px}$ radius).
- **Rest Angle:** `-5deg` rotation with soft ambient float ($\pm 5\text{px}$).
- **RoktoFinder Tile:** Off-white (`#ffffff`) or dark (`#14101c`) container with droplet mark. **Never red background.**
- **JaniBD:** Real logo tile (`/images/projects/janibd-logo.png`).
- **Global SaaS:** Monogram squircle tile with `"GS"` in brand colors.
- Paths managed centrally in `src/data/site.ts`.

---

## 7. Scroll-Linked Text Reveal

- Large statement text starts at `opacity: 0.15`.
- GSAP ScrollTrigger scrubs words to solid `opacity: 1.0`.
- **Completion threshold:** Fully solid before the paragraph crosses the vertical center ($50\%$) of the viewport.
- **Prefers-reduced-motion:** Text renders solid immediately.
