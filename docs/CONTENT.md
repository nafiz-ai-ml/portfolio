# Site Content Specification

> **Project:** Muhammad Nafiz Portfolio (`muhammadnafiz.dev`)  
> **Strict Factual Guardrail:** Grounded first-person voice. Contains only verified facts provided by the owner. No fabricated stats, awards, client names, or quotes.  
> **Status:** Updated for Round 1 Fixes (Grounded tone, accurate section order, quick facts table).  

---

## 1. Global Navigation Bar (Adaptive Dark / Light)

- **Brand Monogram / Text:**  
  - Icon: SVG MN Monogram Mark (`/public/logo/mark.svg`)
  - Label: `MUHAMMAD NAFIZ` (adaptive text color: `#f4f1fa` on dark sections, `#14101c` on light sections)
- **Mobile View:** No dropdown or hamburger menu. Displays only the brand logo and the Connect button.
- **Scroll Behavior:** Fixed at top at all times. On scroll down, applies a subtle translucent background with backdrop blur (`backdrop-blur-md`).
- **Navigation Links (Desktop, In Real Page Order):**
  - `Stack` → Anchors to `#stack`
  - `Projects` → Anchors to `#projects`
  - `Journey` → Anchors to `#journey`
  - `About` → Anchors to `#about`
- **Call-to-Action Pill Button (Adaptive & Inverted):**
  - **On Dark Sections:** Background `#a566ff`, Text `#0c0a12`, Label `✦ Connect`
  - **On Light Sections:** Inverted background `#14101c` (deep obsidian), Text `#ffffff`, Label `✦ Connect`
  - **Action Target:** Smooth scrolls directly to `#contact` (social links section).

---

## 2. Preloader Sequence

- **Visual Element:** Monogram Mark (`mark.svg`) with an animated glowing perimeter stroke.
- **Percentage Ticker:** Dynamic numeric counter `00%` → `100%` in `JetBrains Mono`.
- **Duration:** Shortened to approximately $1.5 - 1.8\text{s}$.
- **Session Rule:** Displays only on first visit per session using `sessionStorage` (`mn_portfolio_loader_seen`). Skipped entirely when `prefers-reduced-motion` is active.

---

## 3. Hero Section (Dark Surface `#0c0a12`)

- **Top Overline Tag (with thin leading line):**  
  `—  WEB APPLICATION DEVELOPER & FOUNDER — MYMENSINGH, BANGLADESH`  
  *(The green indicator dot `●` pulses subtly to denote active availability).*

- **Primary Headline (Large Display, Clamped to Max 4 Lines at 1280x600):**  
  > "I'm Muhammad Nafiz. Web developer today, AI engineer in the *making*."  
  *(Note: The word "making." is set in Instrument Serif Italic, rendered in `#a566ff` accent tint).*

- **Sub-headline (Directly beneath main headline):**  
  > "I turn real problems into working products."

- **Short Narrative Intro:**  
  > "I build community web platforms and practical digital tools from Mymensingh, Bangladesh. With Python and Machine Learning foundations complete, I am learning Deep Learning to build intelligent software."

- **Call-to-Action Buttons (Visible above the fold at 1280x600):**
  - **Button 1 (Primary Pill):** `Explore Projects ↓` (Smooth scroll to `#projects`)
  - **Button 2 (Secondary Ghost Pill):** `Get in Touch ↗` (Smooth scroll to `#contact`)

- **Hero Portrait:**
  - Image Path: `/public/images/nafiz.png` (Purple studio backdrop portrait).
  - Reveal Effect: Block-grid tile transition, starting black-and-white, resolving into full vibrant color.

- **Three Honest Stat-Style Facts:**  
  1. `01` `Live platform:` **RoktoFinder**
  2. `02` `In development:` **JaniBD & Global SaaS**
  3. `DL` `Learning:` **Deep Learning**

---

## 4. Marquee Section: Tech Stack ("Built With")

- **Section Identifier Tag (with thin leading line):**  
  `—  BUILT WITH // PRODUCTION STACK`
- **Marquee Continuous Ticker Copy:**  
  `TypeScript ◆ Next.js ◆ React ◆ Tailwind CSS ◆ Python ◆ PyTorch ◆ Scikit-Learn ◆ Node.js ◆ PostgreSQL ◆ GSAP ◆ Framer Motion ◆ Git ◆ REST APIs ◆ Deep Learning ◆`  
  *(Ticker loops infinitely at moderate velocity and pauses seamlessly on hover).*

---

## 5. Slanted Transition into Light Sections

- **Diagonal Divider:** Diagonal clip-path slope cutting from dark marquee into light content sections.
- **Nav Contrast:** Navbar switches theme threshold at the section boundary and maintains solid `backdrop-blur-xl` ensuring text contrast always passes.

---

## 6. Projects Section (Light Surface `#f8f7fc`)

- **Section Header:**
  - Tag (with thin leading line): `—  SELECTED WORK`
  - Headline: "Platforms built for real utility."
  - Description: "Every project addresses a real need—from emergency blood donation in Mymensingh to everyday SaaS tools and agency client delivery."

### Project 1: RoktoFinder
- **Status Badge:** `● Live`
- **Live URL:** `https://roktofinder.com`
- **Title:** `RoktoFinder`
- **Subtitle / Category:** `Bangla-first blood donor platform // Mymensingh`
- **App-Icon Floating Tile:**
  - Icon Asset: `/public/images/projects/roktofinder-logo.jpg`
  - Tile Styling: Rounded squircle tile on an off-white (`#ffffff`) or dark obsidian container with subtle border. **Never placed on red background.**
- **Core Narrative:**  
  > "A Bangla-first blood donor platform for Mymensingh. Find donors by blood group and area, connect in one click via phone call or WhatsApp, post emergency blood requests, and browse the donor directory."
- **Community Context:**  
  > "Started as a community initiative with Al Fatih Islamic Pathagar."
- **Tech Stack Badges:** `Next.js`, `TypeScript`, `Tailwind CSS`, `Full-Stack`, `Bangla-First`
- **Visual Assets:** `/public/images/projects/roktofinder-1..4.png`
- **Primary CTA:** `Visit Platform ↗` (`https://roktofinder.com`)

---

### Project 2: JaniBD
- **Status Badge:** `◐ In development` (Explicitly displayed as NOT live)
- **Tagline:** *"Your everyday digital companion."*
- **Title:** `JaniBD`
- **Subtitle / Category:** `Bangla-first everyday SaaS & learning platform`
- **App-Icon Floating Tile:**
  - Temporary Monogram Tile featuring bold **"JB"** in brand color (`#7600ff`).
- **Core Narrative (Bangladesh First):**  
  > "A Bangla-first web platform built for everyday digital needs in Bangladesh. Combines utility tools, quizzes and games, a learning library, and a Tech Skill Map with shareable progress cards and public profiles."
- **Preview Card Description:**
  > "Interactive SaaS suite for Bangladesh: utility tools, learning library, quizzes, and Tech Skill Map."
- **Tech Stack Badges:** `SaaS Architecture`, `Next.js`, `Interactive Web`, `Bangla-First`
- **Primary CTA:** In Active Development watermark.

---

### Project 3: Global SaaS Product
- **Status Badge:** `✦ In development`
- **Title:** `Global SaaS Product`
- **Subtitle / Category:** `In-development international SaaS platform`
- **App-Icon Floating Tile:**
  - Monogram Tile featuring bold **"GS"** in brand colors.
- **Core Narrative:**  
  > "An international SaaS platform currently in active development. Built with modern full-stack architecture, focusing on high reliability, clean workflows, and global scalability. Official name and details to be announced."
- **Tech Stack Badges:** `SaaS Architecture`, `Full-Stack`, `Global Platform`, `In Active Development`
- **Status Indicator:** `Active Build Running — Official Launch Forthcoming`

---

## 7. Journey Section: The Engineering Pathway (Light Surface `#f8f7fc`)

- **Section Header:**
  - Tag (with thin leading line): `—  THE PROGRESSION`
  - Headline: "From web applications to intelligent agents."

- **Scroll-Linked Statement Paragraph:**  
  *(Words start faded at 15% opacity and sequentially become solid before passing the vertical center of the viewport)*  
  > "I started with frontend and full-stack web applications for real community problems. Today, with Python and Machine Learning fundamentals completed, I am learning Deep Learning to build intelligent software."

### Timeline Milestones (Grounded, First-Person):

1. **Phase 01: Web Application Development & Founding**
   - Status: `Solidified`
   - Details: Building full-stack web applications, component systems, and community tools. Founded RoktoFinder and JaniBD.

2. **Phase 02: SaaS Engineering & System Architecture**
   - Status: `Active build`
   - Details: Engineering scalable SaaS architectures and full-stack web platforms, currently building an international SaaS product alongside community tools.

3. **Phase 03: Python & Machine Learning Fundamentals**
   - Status: `Complete`
   - Details: Thorough grounding in Python, NumPy, Pandas, Scikit-Learn, data analysis, and classical machine learning algorithms.

4. **Phase 04: Deep Learning Specialization**
   - Status: `Current focus`
   - Details: Currently learning neural network architectures, backpropagation, CNNs for computer vision, RNNs, and modeling in PyTorch.

5. **Phase 05: AI Engineering Roadmap**
   - Status: `Roadmap`
   - Details: Next focus areas: Natural Language Processing (NLP), Computer Vision, Generative AI, Transformers, and AI agent development.

---

## 8. About Section & Quick Facts (Light Surface `#f8f7fc`)

- **Section Header:**
  - Tag (with thin leading line): `—  BACKGROUND & ETHOS`
  - Headline: "Building with practical intent and curiosity."

- **Scroll-Linked Statement Paragraph:**  
  > "I turn real problems into working products. Whether that means building a blood donor network for my hometown or learning neural networks, my approach is steady execution from first principles."

- **First-Person Grounded Bio:**
  > "I am a web application developer and founder based in Mymensingh, Bangladesh. I build tools for real community needs like RoktoFinder and JaniBD. My goal is to become an AI engineer, progressing from machine learning foundations into deep learning, transformers, and autonomous AI agents."

### Quick facts (Plain Status Labels):

| Parameter | Detail | Status |
| :--- | :--- | :--- |
| **Name** | Muhammad Nafiz (মুহাম্মদ নাফিজ) | Official |
| **Location** | Mymensingh, Bangladesh | Location |
| **Current Role** | Web Application Developer & Founder | Active |
| **Main Goal** | AI Engineer | Focus |
| **Completed** | Python & Machine Learning Fundamentals | Done |
| **Currently Learning** | Deep Learning (Neural Networks & PyTorch) | In progress |
| **Roadmap** | NLP, Computer Vision, GenAI, Transformers, AI Agents | Planned |
| **Live Platform** | RoktoFinder (roktofinder.com) | Live |
| **In Development** | JaniBD (Bangla-first SaaS companion) | In dev |
| **Upcoming SaaS** | Global SaaS (in development) | In dev |
| **Domain** | muhammadnafiz.dev | Official |
| **Language** | English only (Portfolio) | Standard |

---

## 9. Contact Section (Dark Surface `#0c0a12`)

- **Section Header Tag (with thin leading line):**  
  `—  LET'S CONNECT`
- **Display Headline:**  
  > "Say *hello.*"  
  *(Note: The word "hello." is set in Instrument Serif Italic in `#a566ff` accent tint).*

- **Invitation Copy:**  
  > "Always open to discussing web application architecture, deep learning discoveries, collaboration opportunities, or community initiatives."

- **Social & Contact Links (Strictly no contact form):**  
  1. **GitHub:** `https://github.com/nafiz-ai-ml` (`github.com/nafiz-ai-ml`)
  2. **LinkedIn:** `https://www.linkedin.com/in/nafiz-ai/` (`linkedin.com/in/nafiz-ai`)
  3. **Email:** `mailto:me@muhammadnafiz.dev` (`me@muhammadnafiz.dev`)
  4. **X (Twitter):** `https://x.com/MUHAMMADNA70418` (`x.com/MUHAMMADNA70418`)

---

## 10. Footer Section (Dark Surface `#0c0a12`)

- **Brand Monogram:** Small SVG mark (`public/logo/mark.svg`)
- **Copyright Statement:** `© 2026 Muhammad Nafiz. Built with purpose.`
- **Technical Credit:** `Built with Next.js, TypeScript, Tailwind CSS, Lenis & GSAP.`
- **Regional Status Indicator:** `Mymensingh, BD (UTC+6)`
- **Back to Top Control:** `Back to top ↑`
