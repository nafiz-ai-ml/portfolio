# Animation & Motion Language Specification

> **Project:** Muhammad Nafiz Portfolio (`muhammadnafiz.dev`)  
> **Motion Philosophy:** High-precision creative engineering. Kinetic, silky, and editorial, built strictly using hardware-accelerated transforms and opacity.  
> **Accessibility Mandate:** Full WCAG 2.2 compliance via `prefers-reduced-motion: reduce`. Graceful mobile touch degradation.  
> **Status:** Updated for Round 1 Fixes (1.5s sessionStorage loader, center-viewport scroll scrub, observer-driven nav).  

---

## 1. Global Motion Architecture

1. **Hardware-Accelerated Properties Only:** All dynamic transforms are strictly restricted to `transform` (`translate3d`, `scale`, `rotate`) and `opacity`. Zero layout-thrashing animations.
2. **Smooth Scroll Engine:** Powered by `lenis`. Synchronized with GSAP's internal ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`) to eliminate scroll stutter and micro-jitters.
3. **Motion Curves (Easings):**
   - *Smooth Kinetic Out:* `cubic-bezier(0.16, 1, 0.3, 1)` (GSAP `expo.out`)
   - *Subtle Snappy:* `cubic-bezier(0.25, 1, 0.5, 1)` (GSAP `power2.out`)
   - *Gentle Float Loop:* `cubic-bezier(0.45, 0.05, 0.55, 0.95)` (`easeInOutSine`)
   - *Linear (Continuous):* `linear` (for Marquee ticker)
4. **Reduced Motion System:** When `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is active:
   - Disable all parallax, floating bobbing, magnetic cursor pull, 3D card tilt, smooth scrolling, and pinned scrubbing.
   - Preloader is skipped entirely.
   - Scroll-reveal paragraphs render solid text (`opacity: 1`) immediately.

---

## 2. Master Animation Catalog & Technical Specifications

---

### Animation 01: Preloader MN Mark & Quick Progress Counter

| Dimension | Specification |
| :--- | :--- |
| **Description** | Fullscreen curtain containing the MN monogram mark (`mark.svg`), horizontal progress bar, and counting percentage ($00\% \to 100\%$). Finishes in approximately $1.35\text{s}$, followed by a $0.25\text{s}$ pause and a $0.55\text{s}$ upward slide (`translateY: '-100%'`). Total time: $\approx 1.6\text{s}$. |
| **Trigger** | Window mount / first session load. |
| **Session Control** | Stored in `sessionStorage` (`mn_portfolio_loader_seen`). **Shows only once per browser session.** |
| **Library** | Framer Motion + standard interval timer. |
| **Duration** | Total duration $\approx 1.6\text{s}$. |
| **Easing** | Slide exit: `cubic-bezier(0.87, 0, 0.13, 1)`. |
| **Reduced-Motion Fallback** | Skipped immediately on mount; content displays without delay. |

---

### Animation 02: Block-Grid Hero Photo Reveal (Grayscale to Color)

| Dimension | Specification |
| :--- | :--- |
| **Description** | The portrait (`nafiz.png`) is segmented visually into a $4 \times 4$ grid of masked block tiles. On entrance, tiles reveal in a radial wave from center outwards while transitioning from black-and-white (`filter: grayscale(100%)`) into full color (`filter: grayscale(0%)`). |
| **Trigger** | Preloader completion callback or immediate on second visit. |
| **Library** | Framer Motion radial wave stagger. |
| **Duration** | Total sequence $1.2\text{s}$ (each block $0.65\text{s}$). |
| **Easing** | `power3.out` (`cubic-bezier(0.215, 0.61, 0.355, 1)`). |
| **Screen Budget** | Sized responsibly (`max-w-[280px]` to `max-w-[360px]`) to ensure full fit on 1280x600 viewports. |
| **Reduced-Motion Fallback** | Static portrait rendered at $100\%$ full color without grid tiles. |

---

### Animation 03: Word-by-Word Masked Headline Reveal

| Dimension | Specification |
| :--- | :--- |
| **Description** | Each word in the headline *"I'm Muhammad Nafiz. Web developer today, AI engineer in the making."* is wrapped in an `overflow-hidden` inline-block span, animating up from `translateY(110%)` with a subtle rotational skew. The italic accent word *"making."* glides in with accent tint `#a566ff`. |
| **Trigger** | Preloader completion callback. |
| **Library** | Framer Motion (`staggerChildren: 0.045`). |
| **Duration** | $0.8\text{s}$ per word. |
| **Easing** | `cubic-bezier(0.16, 1, 0.3, 1)`. |
| **Responsive Rule** | Clamped at `text-3xl` to `lg:text-[2.85rem]` with max 4 lines to ensure both buttons and paragraph stay above the fold at 1280x600. |
| **Reduced-Motion Fallback** | Immediate visibility at `opacity: 1`, `translateY(0%)`. |

---

### Animation 04: Numeric Stat Count-Up

| Dimension | Specification |
| :--- | :--- |
| **Description** | In the Hero stats bar, the numeric values (`01`, `01`, `DL`) animate upward into view, while the numeric count-up utility increments from `0` to the target value. |
| **Trigger** | In-view threshold ($10\%$). |
| **Library** | Custom Framer Motion + interval ticker. |
| **Duration** | $1.2\text{s}$. |
| **Easing** | `power2.out`. |
| **Content Precision** | Formatted as `01 Live platform: RoktoFinder`, `01 In development: JaniBD`, `DL Learning: Deep Learning`. |
| **Reduced-Motion Fallback** | Target strings render statically on initial paint. |

---

### Animation 05: Infinite Tech Marquee Ticker

| Dimension | Specification |
| :--- | :--- |
| **Description** | Seamless continuous horizontal loop of tech stack badges (`Built with...`). When hovered, the ticker decelerates and pauses (`animation-play-state: paused`). |
| **Trigger** | Continuous auto-run on mount. |
| **Library** | Pure CSS `@keyframes marquee` with two duplicate sibling flex containers. |
| **Duration** | $35\text{s}$ linear. |
| **Reduced-Motion Fallback** | Marquee animation halted; horizontally scrollable with native touch bar. |

---

### Animation 06: Slanted Section Transition & Adaptive Nav Contrast

| Dimension | Specification |
| :--- | :--- |
| **Description** | Sections transition across an angled diagonal boundary using `clip-path: polygon(0 0, 100% 4vw, 100% 100%, 0 100%)`. The sticky navbar switches its theme threshold at $50\text{px}$ from section top and applies a solid `backdrop-blur-xl` (`bg-[#ffffff]/95` on light, `bg-[#0c0a12]/90` on dark) to ensure contrast never fails. |
| **Trigger** | Continuous scroll position checking of `#projects` and `#contact`. |
| **Library** | React state + CSS variables. |
| **Reduced-Motion Fallback** | Static clip-path divider; instant color switch. |

---

### Animation 07: Active-Section Nav Tracking

| Dimension | Specification |
| :--- | :--- |
| **Description** | An `IntersectionObserver` monitors real section IDs in real page order: `hero` $\to$ `stack` $\to$ `projects` $\to$ `journey` $\to$ `about` $\to$ `contact`. The matching nav capsule item lights up with an active pill background. Clicking any item smoothly scrolls via Lenis. |
| **Observer Margin** | `rootMargin: '-20% 0px -55% 0px'`, `threshold: 0.1`. |
| **Nav Links Order** | 1. `Stack` (`#stack`)  
2. `Projects` (`#projects`)  
3. `Journey` (`#journey`)  
4. `About` (`#about`)  
*(Contact pill links to `#contact`)* |
| **Reduced-Motion Fallback** | Native instant anchor jump without smooth animation. |

---

### Animation 08: Scroll-Linked Text Reveal (Fully Solid Before Viewport Center)

| Dimension | Specification |
| :--- | :--- |
| **Description** | Editorial statement paragraphs in About and Journey start in a faded unread state (`opacity: 0.15`). As the user scrolls, each word progressively illuminates. **Critical Rule: Every word must be $100\%$ solid before the paragraph crosses the vertical center ($50\%$) of the viewport.** |
| **Trigger** | GSAP ScrollTrigger (`start: 'top 85%'`, `end: 'center 50%'`, `scrub: 0.4`). |
| **Library** | GSAP ScrollTrigger staggering word opacity. |
| **Reduced-Motion Fallback** | Words render statically at $100\%$ solid opacity (`opacity: 1`) on initial mount with zero delay. |

---

### Animation 09: Floating Project App-Icon Tiles

| Dimension | Specification |
| :--- | :--- |
| **Description** | Each project card features a floating app-icon tile (`rounded-3xl`, pre-rotated `-5deg`, soft shadow).
- Idle: Ambient continuous floating bob ($\pm 5\text{px}$).
- Hover: Straightens towards `rotate(-1deg)`, scales $1.06\times$.
- RoktoFinder: Off-white tile with red droplet logo (never red background).
- JaniBD: Real logo tile (`/images/projects/janibd-logo.png`).
- Global SaaS: Monogram tile `"GS"`. |
| **Library** | CSS `@keyframes float` + Framer Motion hover. |
| **Reduced-Motion Fallback** | Static squircle tile at `rotate(-5deg)` without float animation. |

---

### Animation 10: 3D Project Cards (Tilt, Cursor Glow, Parallax)

| Dimension | Specification |
| :--- | :--- |
| **Description** | Project cards feature 3D perspective tilt (maximum $\pm 4^\circ$), cursor-following radial spotlight, and parallax screenshot scaling. Disabled on touchscreens. |
| **Library** | Framer Motion `useMotionValue` + `useSpring`. |
| **Reduced-Motion Fallback** | Static cards with standard drop shadow. |
