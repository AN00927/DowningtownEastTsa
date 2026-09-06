---
name: navbar-gallery-ui
description: >
  Elite UI/UX design system extracted from 500+ award-winning websites on navbar.gallery.
  Use this skill ANY TIME the user wants to build, design, or improve a website's UI — including navbars,
  hero sections, scroll animations, buttons, color schemes, typography, layout, micro-interactions,
  marquees, cards, modals, footers, or any visual/interactive element. Also trigger when user says
  things like "make it look good", "non-vibe coded", "original UI", "L99", "high-end design",
  "agency-level", "make it clean", "add animations", or references any UI component. Also trigger
  when user asks to audit, analyze, or replicate any site's UI, or mentions Navbar Gallery entries.
  This skill contains complete implementation blueprints, exact motion token values, accessibility
  contracts, performance rules, and a master output format for producing Navbar Gallery-level polish.
  Always use this skill before writing any frontend UI code.
---

# navbar.gallery UI/UX Master Skill
### Implementation blueprints + motion contracts + accessibility + output spec

This skill is a living reference for building **original, non-generic, high-craft UI** in Claude Code.
Every pattern includes: what it is, where it's seen, exact implementation, motion values, focus
management, accessibility requirements, and performance notes.

---

## HOW TO USE THIS SKILL

### When building UI from scratch:
1. **Identify site type** (SaaS, portfolio, e-commerce, restaurant, creative agency, etc.)
2. **Select nav pattern** from Section 1 — justify the choice based on content depth
3. **Emit all 10 required output sections** from Section 0 (the master output contract)
4. **Select visual patterns** from Sections 2–14 that match the vibe
5. **Apply motion token defaults** from Section 16 — exact ms values, exact easing curves
6. **Never default to generic Bootstrap/Tailwind out-of-the-box components** — always customize
7. Read `references/implementation-code.md` for React/Next.js code snippets
8. Read `references/accessibility-hooks.md` for focus trap, skip links, reduced-motion utilities

### When auditing / analyzing inspiration:
- Follow the ANALYZE MODE protocol in Section 17
- Extract visible components from screenshots
- Mark anything not derivable from screenshots as **"unspecified"**
- Never hallucinate exact hex/font/timing values

---

## SECTION 0: MASTER OUTPUT CONTRACT

**When a user asks you to build or design a complete website experience, always emit these 10 sections in order. Do not skip any.**

### 0.1 EXPERIENCE GOAL
One paragraph: what must the user **feel** and **do** on this site. Ground every design decision in this goal.

### 0.2 INFORMATION ARCHITECTURE + FLOW MAP
- Sitemap outline (pages + page hierarchy)
- Section order rationale: hero → social proof → features → details → CTA → footer
- "Handoff" logic between sections — how each section motivates the next

### 0.3 NAVIGATION BLUEPRINT
- Choose nav pattern (from Section 1) + justify based on content depth and site type
- Desktop behavior (hover intent, click, keyboard)
- Mobile behavior (hamburger, drawer, bottom nav)
- Open/close triggers
- Focus management and Escape key behavior
- Reduced-motion fallback

### 0.4 COMPONENT INVENTORY
List every component with:
- **Props** (inputs / variants)
- **States** (idle / hover / pressed / focus-visible / disabled / loading)
- **Responsiveness notes**

Required components (always include all of these unless explicitly N/A):
- Navbar variants (desktop / mobile)
- Hero + headline system
- CTAs (primary / secondary / tertiary)
- Cards (feature, blog, pricing, testimonial)
- Menus (dropdown / mega / sidebar / fullscreen as applicable)
- Search (if relevant)
- Announcement bar (if relevant)
- Forms (newsletter, contact, etc.)
- Testimonials / social proof
- Footer system (nav links + legal + newsletter)

### 0.5 DESIGN TOKENS
Return a complete token set:
```
Color palette (hex values — or "unspecified" if not known)
Typography (font family stacks; sizes; weights; line-heights)
Spacing scale (4px-based: 4/8/12/16/24/32/48/64/96/128px + key layout spacings)
Border-radius system (pick ONE: pill / 8px / sharp / mixed)
Shadows (layer 1 subtle / layer 2 card / layer 3 floating / layer 4 modal)
Blur layers (backdrop-filter values)
Z-index layers (base / sticky / dropdown / modal / cursor / tooltip)
```

### 0.6 MOTION SYSTEM SPEC
Define the full motion language with **exact values** (use Section 16 defaults if site-specific values unknown):
```
Micro tier: duration + easing (hover, focus, icon nudge)
UI tier: duration + easing (dropdown, modal, drawer open/close)
Reveal tier: duration + easing (hero, section entrances)
Scroll-linked tier: behavior description
Default stagger: ms between staggered items
Default offset: px/% for slide-in animations
Enter definition: from-state → to-state + duration + easing
Exit definition: to-state + duration + easing (close ≈ 0.85× open duration)
Reduced-motion fallback: what to do under prefers-reduced-motion
```

### 0.7 INTERACTION MAP
Complete map of every trigger → state transition:
```
Hover triggers
Click/tap triggers
Focus/keyboard triggers
Scroll triggers
Loading/async states
Error/fallback states
```

### 0.8 ACCESSIBILITY CHECKLIST
Must always include all of these — mark "unspecified" only if genuinely unknowable:
- [ ] Keyboard navigation: Tab/Shift+Tab order defined
- [ ] Arrow key navigation within menus (WAI-ARIA menu/menubar patterns)
- [ ] Focus-visible styling (not hidden, not default-only)
- [ ] Skip link: "Skip to main content" as first focusable element
- [ ] ARIA roles: `role="navigation"`, `aria-label`, `aria-expanded`, `aria-haspopup`, `aria-controls`
- [ ] Focus trap for sidebar/fullscreen menus (trap focus on open, restore on close)
- [ ] Escape key closes all menus/modals
- [ ] Backdrop/overlay is clickable to close
- [ ] Contrast: 4.5:1 for normal text, 3:1 for large text
- [ ] Tap targets: minimum 44×44px on mobile
- [ ] Reduced-motion: `prefers-reduced-motion: reduce` disables or minimizes all animation
- [ ] Announcement bar dismiss button: focusable + labeled

### 0.9 PERFORMANCE + ASSET NOTES
Always include all risk categories — mark "unspecified" if unknown:
- **LCP risks**: hero images/videos without pre-loading, fonts blocking render
- **CLS risks**: announcement bar injected after load (reserve height), images without dimensions, fonts loading without `font-display: swap`
- **JS weight**: heavy animation libraries (GSAP) — lazy-load or use native CSS/Web Animations API
- **Image best practices**: explicit `width`/`height` or `aspect-ratio` on all `<img>` and `<video>`, `loading="lazy"` below fold, `fetchpriority="high"` on hero
- **Video**: always `muted`, `autoplay`, `playsinline`, `loop` — never autoplay with audio

### 0.10 IMPLEMENTATION PACKAGE
Generate production-ready code as a file tree, then each file's full content:
```
src/
├── tokens/
│   └── motion.ts         ← motion token constants
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Button.tsx
│   └── [other components]
├── hooks/
│   ├── useFocusTrap.ts
│   ├── useReducedMotion.ts
│   └── useScrollState.ts
├── utils/
│   └── accessibility.ts
└── page.tsx              ← full page composition
```

---

## SECTION 1: NAVBAR / NAVIGATION PATTERNS

### 1.0 Nav Pattern Selection Guide

Choose the nav pattern based on content depth and site type:

| Site Type | Recommended Nav | Why |
|-----------|----------------|-----|
| Simple SaaS / portfolio (≤8 links) | Static/Sticky | Always visible, minimal interaction |
| SaaS with product areas (8–20 links) | Dropdown/Flyout | Compact, hover intent works on desktop |
| Enterprise / e-commerce (20+ links, categories) | Mega Menu | Scannable grouping, room for visuals |
| Dashboard / content hub | Sidebar | Persistent, category-organized |
| Portfolio / creative agency | Full-Screen | Immersive, strong first impression |
| Search-dominant (docs, marketplace) | Search-centric | Input first, nav secondary |
| eCommerce with promo | Static + Announcement Bar | Promotional header above nav |

---

### 1.1 Floating Island Navbar
**Seen on:** Obsidianos, Featurebase, ReflexAI, most modern SaaS
**Pattern:** Static/Sticky. Nav floats as a pill/capsule, detached from top edge, backdrop blur.

**Motion contract:**
- Scroll state transition: `transition: background 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s`
- No animation on page load — nav is immediately visible

**Focus management:** Standard tab order. No trapping needed. Escape has no special behavior.

**Accessibility:** `role="navigation"` `aria-label="Main"`. All links keyboard-accessible. Focus-visible ring on all items.

```css
nav {
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 9999px;
  padding: 0.5rem 1.5rem;
  z-index: 100;
  width: max-content;
  max-width: calc(100vw - 2rem);
  transition: background 0.4s cubic-bezier(0.22,1,0.36,1),
              box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
}
nav.scrolled {
  background: rgba(255,255,255,0.9);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
}
```
- Logo left, links center, CTA right
- Links: `letter-spacing: 0.02em; font-weight: 500`
- **Pitfalls:** Over-animating the nav itself; consuming too much vertical space; sticky CLS if height changes abruptly

---

### 1.2 Full-Bleed Transparent → Solid on Scroll
**Seen on:** Thonik, Joby Aviation, creative agencies
**Pattern:** Static/Sticky. Starts transparent over hero, becomes solid on scroll.

**Motion contract:**
- Transition: `0.4s cubic-bezier(0.22,1,0.36,1)` on background + backdrop-filter
- Logo color-inverts between states (separate SVG per state or CSS `filter: invert()`)

**Accessibility:** Same as 1.1. Ensure sufficient contrast in both transparent AND solid states.

**CLS risk:** If nav changes height on scroll state change — keep height constant, only change background/shadow.

```js
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });
```
```css
nav { transition: background 0.4s cubic-bezier(0.22,1,0.36,1), backdrop-filter 0.4s; }
nav.scrolled {
  background: rgba(0,0,0,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
```

---

### 1.3 Announcement Bar + Nav Stack
**Seen on:** Coterie, e-commerce, SaaS with promos
**Pattern:** Announcement bar sits above nav. Optional dismiss.

**Motion contract:**
- Slide-down on page load: `180–240ms ease-out` — or no animation at all
- Dismiss: `height` collapses with `overflow: hidden; transition: height 240ms ease-out`

**Focus management:** Dismiss button must be focusable and labeled (`aria-label="Dismiss announcement"`).

**CLS risk (CRITICAL):** Reserve the bar's height in CSS BEFORE JavaScript loads. Never inject after layout settles. Set explicit `height: 36px` on a containing wrapper.

**Accessibility:** Ensure 4.5:1 contrast. Dismiss is persistent (remember via localStorage).

```html
<div class="announcement-bar" role="region" aria-label="Announcement">
  <div class="ticker-inner" aria-live="polite">
    Free shipping over $75 &nbsp;&nbsp;·&nbsp;&nbsp; New collection Friday &nbsp;&nbsp;·&nbsp;&nbsp; Free shipping over $75
  </div>
  <button class="dismiss" aria-label="Dismiss announcement">×</button>
</div>
```
```css
.announcement-bar {
  background: #000; color: #fff;
  font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;
  height: 36px; display: flex; align-items: center; overflow: hidden;
  position: relative;
}
.ticker-inner {
  display: flex; white-space: nowrap;
  animation: ticker 25s linear infinite;
}
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .ticker-inner { animation: none; }
}
```

---

### 1.4 Dropdown / Flyout Menu
**Seen on:** ToDesktop, Letta, most SaaS
**Pattern:** Hover intent on desktop triggers dropdown panel below nav item. Click on mobile.

**Motion contract:**
- Open: `fade-in + translateY(−8px → 0)` — **180–260ms** — `cubic-bezier(0.22,1,0.36,1)` (ease-out)
- Close: **~150–220ms** (≈0.85× open duration) — slightly faster than open
- Hover intent delay: **100–150ms** — prevents flicker on pointer travel

**Focus management:**
- On open: move focus INTO the menu (first item)
- Tab/Shift+Tab navigate within menu items
- Arrow keys navigate between items (WAI-ARIA `role="menu"` + `role="menuitem"`)
- Escape closes menu, returns focus to trigger button
- Click outside closes menu

**ARIA:**
```html
<button aria-haspopup="menu" aria-expanded="false" aria-controls="products-menu">Products</button>
<div id="products-menu" role="menu" aria-label="Products">
  <a role="menuitem" href="/product-a">Product A</a>
  <a role="menuitem" href="/product-b">Product B</a>
</div>
```

**Pitfalls:** No hover intent delay → flicker; submenu closes on pointer travel between trigger and panel; missing Escape; no keyboard access.

```css
.dropdown-panel {
  position: absolute; top: calc(100% + 8px); left: 0;
  background: white; border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  opacity: 0; pointer-events: none;
  transform: translateY(-8px);
  transition: opacity 220ms cubic-bezier(0.22,1,0.36,1),
              transform 220ms cubic-bezier(0.22,1,0.36,1);
}
.dropdown-panel.open {
  opacity: 1; pointer-events: all; transform: translateY(0);
}
/* Sub-link hover state */
.dropdown-panel a {
  display: block; padding: 0.5rem 1rem;
  border-left: 2px solid transparent;
  transition: border-color 120ms ease-out, background 120ms ease-out;
}
.dropdown-panel a:hover, .dropdown-panel a:focus {
  border-left-color: #000; background: #f5f5f5;
}
```

---

### 1.5 Mega Menu with Image Preview
**Seen on:** Frontify, Hex Technologies, VoiceFlow, Schema
**Pattern:** Large panel drops full-width showing sub-links grouped by category + featured image/CTA column.

**Motion contract:**
- Open: `scale(0.98 → 1) + fade + shadow reveal` — **220–320ms** — `cubic-bezier(0.22,1,0.36,1)`
- Close: **~190–270ms** (≈0.85×)
- Triggered on hover OR click (always provide click fallback for accessibility)

**Focus management:**
- On open, move focus to first item in menu
- Arrow keys navigate items; left/right navigate between columns (roving tabindex pattern)
- Escape closes, returns focus to trigger
- Consider `role="menubar"` + `role="menu"` + `role="menuitem"` per WAI-ARIA menubar pattern

**CLS risk:** Featured image column — always set explicit `width`/`height` on images. Never let images shift layout on load.

**Pitfalls:** Too many links without visual grouping; labels not scannable; no visual separation between columns; images without dimensions; no keyboard nav within grid.

```css
.mega-menu {
  position: fixed; top: var(--nav-height); left: 0; width: 100vw;
  background: white; border-top: 1px solid #eee;
  box-shadow: 0 24px 48px rgba(0,0,0,0.08);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 320px; /* last col = featured */
  gap: 2rem;
  padding: 2rem max(2rem, (100vw - 1200px) / 2);
  opacity: 0; pointer-events: none;
  transform: scale(0.98) translateY(-4px);
  transform-origin: top center;
  transition: opacity 280ms cubic-bezier(0.22,1,0.36,1),
              transform 280ms cubic-bezier(0.22,1,0.36,1);
}
.mega-menu.visible { opacity: 1; pointer-events: all; transform: scale(1) translateY(0); }
.mega-col-label {
  font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em;
  color: #888; font-weight: 600; margin-bottom: 0.75rem;
}
```

---

### 1.6 Sidebar / Drawer Navigation
**Seen on:** Coterie, dashboard UIs, editorial
**Pattern:** Triggered by hamburger/button. Panel slides in from left or right. Nested submenu possible.

**Motion contract:**
- Open: `translateX(100% → 0)` — **240–360ms** — `cubic-bezier(0.25,0.46,0.45,0.94)`
- Overlay: `opacity(0 → 0.5)` — **240ms** — `ease-out`
- Close: **~200–300ms** (≈0.85×)
- Nested submenu: crossfade or slide within panel (not a second overlay)

**Focus management (CRITICAL for drawer):**
- On open: **TRAP FOCUS** inside the sidebar (WAI-ARIA dialog-like pattern)
- First focusable element receives focus on open
- Tab cycles only within sidebar
- Escape closes sidebar, restores focus to trigger
- Background scroll must be locked: `document.body.style.overflow = 'hidden'`
- Overlay is clickable to close

**ARIA:**
```html
<button aria-controls="sidebar-nav" aria-expanded="false" aria-label="Open menu">☰</button>
<nav id="sidebar-nav" role="dialog" aria-modal="true" aria-label="Site navigation">
  <!-- trap focus inside here -->
</nav>
<div class="sidebar-overlay" aria-hidden="true"></div>
```

**Pitfalls:** Background scroll not locked; focus escapes sidebar; overlay not clickable; no reduced-motion fallback; no Escape handler; nested submenu opens as separate overlay instead of in-panel.

```css
.sidebar {
  position: fixed; top: 0; right: 0;
  width: min(380px, 90vw); height: 100vh;
  background: #111; color: white;
  transform: translateX(100%);
  transition: transform 300ms cubic-bezier(0.25,0.46,0.45,0.94);
  z-index: 9999; overflow-y: auto; padding: 2rem;
}
.sidebar.open { transform: translateX(0); }
.sidebar-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  opacity: 0; pointer-events: none;
  transition: opacity 240ms ease-out; z-index: 9998;
}
.sidebar-overlay.open { opacity: 1; pointer-events: all; }
@media (prefers-reduced-motion: reduce) {
  .sidebar, .sidebar-overlay { transition: none; }
}
```

---

### 1.7 Full-Screen Overlay Menu
**Seen on:** DanceRobot, Joby Aviation, MetaMask, creative agencies, portfolios
**Pattern:** Hamburger triggers full-screen takeover. Large typography nav links. Often graphic elements.

**Motion contract:**
- Open: `clip-path: circle(0% → 150%)` from hamburger origin — **300–420ms** — `cubic-bezier(0.77,0,0.175,1)` (dramatic)
- Link stagger: `translateY(100% → 0)` per link — **0.06–0.1s** stagger — `cubic-bezier(0.16,1,0.3,1)`
- Close: **~260–360ms** (≈0.85×), links exit first then overlay collapses

**Focus management (CRITICAL — treat as dialog):**
- **TRAP FOCUS** inside overlay on open
- First nav link receives focus
- Escape closes overlay, restores focus to hamburger
- Background scroll locked

**ARIA:**
```html
<button aria-expanded="false" aria-controls="fullscreen-menu" aria-label="Open navigation">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>
<div id="fullscreen-menu" role="dialog" aria-modal="true" aria-label="Navigation">
  <nav>...</nav>
</div>
```

**Pitfalls:** Flashing overlay (use `clip-path` not `opacity` flash); excessive motion without reduced-motion support; no visible close affordance; hamburger icon doesn't animate to X.

```css
.fullscreen-menu {
  position: fixed; inset: 0;
  background: #0a0a0a; z-index: 9999;
  display: flex; flex-direction: column;
  justify-content: center; padding: 4rem;
  clip-path: circle(0% at calc(100% - 3rem) 3rem);
  transition: clip-path 420ms cubic-bezier(0.77,0,0.175,1);
  visibility: hidden;
}
.fullscreen-menu.open {
  clip-path: circle(150% at calc(100% - 3rem) 3rem);
  visibility: visible;
}
.fullscreen-menu a {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700; letter-spacing: -0.02em; line-height: 1.1;
  color: white; text-decoration: none;
  display: block; overflow: hidden;
}
.fullscreen-menu a span {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 600ms cubic-bezier(0.16,1,0.3,1);
  transition-delay: calc(var(--i) * 0.06s);
}
.fullscreen-menu.open a span { transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .fullscreen-menu { transition: none; }
  .fullscreen-menu a span { transition: none; transform: none; }
}
```

---

### 1.8 Search-Centric Nav
**Seen on:** Documentation sites, marketplaces
**Pattern:** Search input is primary. Nav links are secondary.

**Motion contract:**
- Width expand on focus: `180–260ms ease-out`
- Suggestion dropdown fade-in: `180ms ease-out`

**Focus management:** Focus is placed IN the search input on open. Escape clears + closes suggestions. Arrow keys navigate suggestion list. Results announced via `aria-live="polite"`.

**Pitfalls:** Autocomplete list not keyboard accessible; suggestions not announced to screen readers; layout shifts from injected results (reserve height).

---

## SECTION 2: NAVIGATION STATE MACHINE

**Every nav pattern must implement this state machine.** No exceptions.

```
States:    Idle → HoverIntent → Open → SubmenuOpen
           Idle → Armed (keyboard focus) → Open
           Open → Idle (Escape / click outside / route change)

Idle       → HoverIntent   : pointerover (desktop only, with intent delay 100–150ms)
Idle       → Armed         : focusin on trigger / keyboard navigation to trigger
HoverIntent → Open         : intent delay elapsed (100–150ms)
HoverIntent → Idle         : pointerout before delay elapsed (cancel timeout)
Armed      → Open          : Enter / Space / Click on trigger
Open       → SubmenuOpen   : Arrow key / hover on item with nested submenu
SubmenuOpen → Open         : Escape / ArrowLeft
Open       → Idle          : Escape / click outside / route change / focusout (with delay)
```

**JavaScript skeleton (apply to all nav patterns):**
```js
class NavController {
  constructor(trigger, panel) {
    this.trigger = trigger;
    this.panel = panel;
    this.intentTimer = null;
    this.INTENT_DELAY = 120; // ms

    // Desktop: hover intent
    trigger.addEventListener('pointerover', () => {
      this.intentTimer = setTimeout(() => this.open(), this.INTENT_DELAY);
    });
    trigger.addEventListener('pointerout', () => clearTimeout(this.intentTimer));

    // Keyboard
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggle(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); this.open(); this.focusFirst(); }
    });
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { this.close(); trigger.focus(); }
    });

    // Click outside
    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !panel.contains(e.target)) this.close();
    });
  }

  open() {
    this.trigger.setAttribute('aria-expanded', 'true');
    this.panel.classList.add('open');
  }
  close() {
    this.trigger.setAttribute('aria-expanded', 'false');
    this.panel.classList.remove('open');
  }
  toggle() { this.panel.classList.contains('open') ? this.close() : this.open(); }
  focusFirst() {
    const first = this.panel.querySelector('[role="menuitem"], a, button');
    if (first) first.focus();
  }
}
```

---

## SECTION 3: HERO SECTIONS

### 3.1 Kinetic Typography Hero
**Seen on:** Thonik, creative studios, agencies
**Motion contract:** Reveal — **600–900ms** — `cubic-bezier(0.16,1,0.3,1)` — word stagger 0.1s

```css
.hero-headline {
  font-size: clamp(3rem, 10vw, 9rem);
  font-weight: 800; letter-spacing: -0.04em; line-height: 0.9; overflow: hidden;
}
.word-mask { overflow: hidden; display: inline-block; }
.word {
  display: inline-block;
  transform: translateY(110%);
  animation: revealWord 0.8s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: calc(var(--i) * 0.1s);
}
@keyframes revealWord { to { transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .word { animation: none; transform: none; }
}
```
- Wrap each word in `<span class="word-mask"><span class="word" style="--i:N">word</span></span>`
- **LCP note:** Headline is likely LCP element. Do NOT delay it beyond 100ms. Animate reveal, not load.

---

### 3.2 Image Grid / Mosaic Hero
**Seen on:** Fourmula, fashion sites, portfolio
**Motion contract:** Reveal — staggered `opacity + scale` — **900ms** — `ease-out` — 0.12s stagger

```css
.hero-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 240px); gap: 8px;
}
.hero-grid img {
  width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.08); opacity: 0;
  animation: imageReveal 0.9s ease forwards;
  animation-delay: calc(var(--i) * 0.12s);
}
@keyframes imageReveal { to { transform: scale(1); opacity: 1; } }
.hero-grid .feature { grid-column: span 2; }
```
- **CLS:** Set explicit aspect-ratio or height on grid cells before images load
- **LCP:** Use `fetchpriority="high"` on the first/largest image

---

### 3.3 Split-Screen Hero
**Seen on:** Portfolio, agency, fashion e-commerce

```css
.hero-split {
  display: grid; grid-template-columns: 1fr 1fr; height: 100vh; overflow: hidden;
}
.hero-split__left {
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(2rem, 6vw, 6rem); background: #f5f2ee;
}
.hero-split__right {
  position: relative;
  clip-path: polygon(5% 0, 100% 0, 100% 100%, 0% 100%);
}
.hero-split__right img { width: 100%; height: 100%; object-fit: cover; }
```

---

### 3.4 Video Background Hero
**Seen on:** DanceRobot, restaurant, luxury brands, events

**Performance rules:** `muted` `autoplay` `playsinline` `loop` required. Add `preload="metadata"`. Compress to ≤5MB for mobile. Always add a poster image fallback.

```html
<section class="hero-video">
  <video autoplay muted loop playsinline preload="metadata"
         poster="hero-poster.jpg" class="hero-video__bg">
    <source src="hero.mp4" type="video/mp4">
  </video>
  <div class="hero-video__overlay"></div>
  <div class="hero-video__content">...</div>
</section>
```
```css
.hero-video { position: relative; height: 100vh; overflow: hidden; }
.hero-video__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-video__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
}
.hero-video__content { position: relative; z-index: 1; }
```

---

### 3.5 Scroll-Progress Counter Hero
**Seen on:** Fourmula ("100%"), interactive landing pages

```js
function animateCounter(target, el, duration = 2000) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + '%';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

---

## SECTION 4: SCROLL ANIMATIONS

### 4.1 Intersection Observer Fade-Up (Standard)
**The baseline for every content reveal. Use on all sections.**

```css
.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
}
```
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

### 4.2 Horizontal Scroll Section
**Seen on:** Portfolio, fashion, creative studios

```css
.h-scroll-section { height: 300vh; position: relative; }
.h-scroll-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.h-scroll-inner { display: flex; height: 100%; width: max-content; will-change: transform; }
.h-scroll-panel { width: 100vw; height: 100vh; flex-shrink: 0; }
```
```js
const section = document.querySelector('.h-scroll-section');
const inner = section.querySelector('.h-scroll-inner');
window.addEventListener('scroll', () => {
  const rect = section.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
  inner.style.transform = `translateX(-${progress * (inner.scrollWidth - window.innerWidth)}px)`;
}, { passive: true });
```

---

### 4.3 Parallax Image Layers

```js
document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });
```
- `will-change: transform` on parallax elements for GPU acceleration
- Negative values move up (depth effect)
- **Reduced motion:** disable parallax entirely: `@media (prefers-reduced-motion: reduce) { [data-parallax] { transform: none !important; } }`

---

### 4.4 Sticky Feature Rows (SaaS standard)
**Seen on:** Obsidianos, Featurebase — left side sticky, right side scrolls

```css
.sticky-section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.sticky-section__left { position: sticky; top: 6rem; height: fit-content; }
.sticky-section__right { display: flex; flex-direction: column; gap: 6rem; padding: 4rem 0; }
```

---

### 4.5 Scroll-Triggered Stat Counter

```js
const counters = document.querySelectorAll('.stat-number');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = parseInt(entry.target.dataset.target);
    let count = 0, speed = target / 80;
    const update = () => {
      count = Math.min(count + speed, target);
      entry.target.textContent = Math.floor(count).toLocaleString();
      if (count < target) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    obs.unobserve(entry.target);
  });
}, { threshold: 0.5 });
counters.forEach(c => obs.observe(c));
```

---

## SECTION 5: TYPOGRAPHY

### 5.1 Responsive Scale with clamp()
**The correct way. Use everywhere.**
```css
h1 { font-size: clamp(2.5rem, 6vw, 6rem); font-weight: 800; letter-spacing: -0.04em; line-height: 0.95; }
h2 { font-size: clamp(1.75rem, 3.5vw, 3.5rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 600; letter-spacing: -0.02em; }
p  { font-size: clamp(1rem, 1.15vw, 1.125rem); line-height: 1.7; }
.eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
```
**Hierarchy:** eyebrow → headline → subheadline → body → caption. Each distinct in SIZE + WEIGHT + COLOR.

---

### 5.2 Outlined / Stroke Text
```css
.outline-text {
  -webkit-text-stroke: 2px currentColor; color: transparent;
  font-size: clamp(4rem, 12vw, 10rem); font-weight: 900;
}
```

### 5.3 Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
```

### 5.4 Animated Text Cycling
```css
.text-cycle { position: relative; height: 1.2em; overflow: hidden; }
.text-cycle span { position: absolute; opacity: 0; transform: translateY(20px); transition: opacity 0.5s, transform 0.5s; }
.text-cycle span.active { opacity: 1; transform: translateY(0); }
```
```js
const words = document.querySelectorAll('.text-cycle span');
let cur = 0;
setInterval(() => { words[cur].classList.remove('active'); cur = (cur + 1) % words.length; words[cur].classList.add('active'); }, 2500);
```

### 5.5 Marquee / Infinite Ticker
**Seen on:** Isa de Burgh, logos, agency sites

```html
<div class="marquee-wrapper">
  <div class="marquee-track">
    <div class="marquee-content" aria-hidden="true">Logo1 &nbsp;·&nbsp; Logo2 &nbsp;·&nbsp; Logo3 &nbsp;·&nbsp;</div>
    <div class="marquee-content" aria-hidden="true">Logo1 &nbsp;·&nbsp; Logo2 &nbsp;·&nbsp; Logo3 &nbsp;·&nbsp;</div>
  </div>
</div>
```
```css
.marquee-wrapper { overflow: hidden; }
.marquee-track { display: flex; }
.marquee-content { display: flex; align-items: center; gap: 3rem; animation: marquee 25s linear infinite; white-space: nowrap; flex-shrink: 0; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
.marquee-track.reverse .marquee-content { animation-direction: reverse; }
.marquee-wrapper:hover .marquee-content { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .marquee-content { animation: none; } }
```
- Add `aria-label="Client logos"` on the wrapper; mark duplicates `aria-hidden="true"`

---

## SECTION 6: BUTTONS & CTAs

### 6.1 Magnetic Button (Cursor Tracking)
**Motion tier: Micro — 100ms on move, 500ms on leave**

```js
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
    btn.style.transition = 'transform 0.1s';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
});
```
- **Reduced motion:** `@media (prefers-reduced-motion: reduce) { .magnetic-btn { transform: none !important; } }`

---

### 6.2 Arrow Slide Button
**Seen on:** Thonik (→→), editorial, portfolio — Motion tier: Micro — 300ms

```css
.arrow-btn { display: inline-flex; align-items: center; gap: 0.5rem; overflow: hidden; position: relative; }
.arrow-btn .arrow { display: inline-block; transition: transform 0.3s ease; }
.arrow-btn:hover .arrow { transform: translateX(6px); }
```

---

### 6.3 Pill Button with Gradient Border

```css
.gradient-border-btn {
  position: relative; padding: 0.75rem 1.75rem;
  border-radius: 9999px; background: transparent; color: white;
  font-weight: 600; cursor: pointer; border: none;
}
.gradient-border-btn::before {
  content: ''; position: absolute; inset: 0; border-radius: 9999px; padding: 1.5px;
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
}
```

---

### 6.4 Shimmer / Shine CTA — Motion tier: Ambient — 3s interval

```css
.shine-btn { position: relative; overflow: hidden; background: #000; color: #fff; padding: 0.875rem 2rem; border-radius: 9999px; }
.shine-btn::after {
  content: ''; position: absolute; top: -50%; left: -60%;
  width: 40%; height: 200%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent);
  transform: skewX(-20deg); animation: shine 3s ease-in-out infinite;
}
@keyframes shine { 0% { left: -60%; } 100% { left: 130%; } }
@media (prefers-reduced-motion: reduce) { .shine-btn::after { animation: none; } }
```

---

## SECTION 7: HOVER ANIMATIONS

### 7.1 Image Reveal on Link Hover (Cursor Following)
**Seen on:** Creative agencies, portfolio — cursor follows mouse

```js
const links = document.querySelectorAll('.hover-preview-link');
const preview = document.querySelector('.cursor-preview-image');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    preview.src = link.dataset.preview;
    preview.style.opacity = '1';
    preview.style.transform = 'scale(1) rotate(-3deg)';
  });
  link.addEventListener('mousemove', (e) => {
    preview.style.left = `${e.clientX + 20}px`;
    preview.style.top = `${e.clientY - 80}px`;
  });
  link.addEventListener('mouseleave', () => {
    preview.style.opacity = '0';
    preview.style.transform = 'scale(0.9) rotate(0deg)';
  });
});
```
```css
.cursor-preview-image {
  position: fixed; pointer-events: none; width: 180px; height: 240px;
  object-fit: cover; border-radius: 8px; opacity: 0; z-index: 9999;
  transition: opacity 0.3s, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
}
```

---

### 7.2 Underline Slide Hover — Motion tier: Micro — 350ms

```css
.nav-link { position: relative; text-decoration: none; }
.nav-link::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 100%; height: 1.5px; background: currentColor;
  transform: scaleX(0); transform-origin: right;
  transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
}
.nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
```

---

### 7.3 Card Tilt (3D Perspective) — Motion tier: Micro — instant on move, 500ms on leave

```js
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    card.style.transition = 'none';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    card.style.transition = 'transform 0.5s ease';
  });
});
```
- **Reduced motion:** Disable entirely

---

## SECTION 8: CARDS & CONTENT BLOCKS

### 8.1 Bento Grid Layout
**Seen on:** SaaS features, AI product pages (Obsidianos, Featurebase)

```css
.bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.bento-item {
  border-radius: 16px; padding: 1.5rem;
  background: #f8f8f8; overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
}
.bento-item.large { grid-column: span 2; }
.bento-item.tall { grid-row: span 2; }
```
- Layout: icon → heading → body text → optional screenshot
- Never make all cards identical — vary heights/widths intentionally

---

### 8.2 Glassmorphism Card
```css
.glass-card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
}
```

---

### 8.3 Alternating Image + Text Rows
**Seen on:** Obsidianos, most SaaS

```css
.feature-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 6rem); align-items: center; padding: clamp(3rem, 8vh, 8rem) 0; }
.feature-row:nth-child(even) .feature-content { order: 2; }
.feature-row:nth-child(even) .feature-image { order: 1; }
```

---

### 8.4 News / Blog Card Grid with Hover Zoom

```css
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
.news-card { border-radius: 12px; overflow: hidden; cursor: pointer; }
.news-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
.news-card:hover img { transform: scale(1.06); }
```
- **CLS:** Always set `aspect-ratio: 16/9` on the image container, not just the image

---

## SECTION 9: COLOR SCHEMES

### 9.1 Dark Luxury (Obsidianos / Finance)
```css
:root {
  --bg: #0a0a0f; --bg-secondary: #111118; --surface: #1a1a24;
  --border: rgba(255,255,255,0.08); --text-primary: #f0f0f5;
  --text-secondary: #8888aa; --accent: #7c6ee0; --accent-glow: rgba(124,110,224,0.3);
}
```

### 9.2 Clean SaaS (Featurebase / Playground)
```css
:root {
  --bg: #ffffff; --bg-secondary: #f7f7f8; --surface: #fefefe;
  --border: #e5e5e7; --text-primary: #111111; --text-secondary: #666670;
  --accent: #3b5bdb; --accent-light: #e8edf9;
}
```

### 9.3 Warm Neutral Creative (Thonik / Portfolio)
```css
:root {
  --bg: #f5f2ee; --bg-secondary: #ede9e3; --surface: #fff;
  --border: rgba(0,0,0,0.1); --text-primary: #1a1612;
  --text-secondary: #6b6560; --accent: #c8462d;
}
```

### 9.4 Neon Nightlife (DanceRobot)
```css
:root {
  --bg: #0d0507; --surface: #1a0c10;
  --neon-pink: #ff2d7a; --neon-teal: #00e5cc; --neon-yellow: #f5e642;
  --text: #faf0e6;
}
/* Usage: box-shadow: 0 0 20px var(--neon-pink), 0 0 60px rgba(255,45,122,0.3); */
```

### 9.5 AI / Gradient Tech
```css
:root {
  --bg: #080810;
  --gradient-1: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  --gradient-2: linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1);
  --glow: 0 0 60px rgba(99,102,241,0.25);
}
```

---

## SECTION 10: LAYOUT PATTERNS

### 10.1 Full-Width with Inset Content
```css
.full-section { width: 100%; padding: 0 max(1.5rem, (100vw - 1280px) / 2); }
```

### 10.2 Asymmetric Grid
```css
.asymmetric-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 400px 300px; gap: 1rem;
}
.asymmetric-grid .hero-item { grid-row: span 2; }
```

### 10.3 Masonry Layout (CSS Only)
```css
.masonry { columns: 3; column-gap: 1rem; }
.masonry-item { break-inside: avoid; margin-bottom: 1rem; }
```

### 10.4 Scroll Progress Bar
```css
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(to right, #6366f1, #a855f7);
  z-index: 9999; transform-origin: left; transform: scaleX(0); transition: transform 0.1s;
}
```
```js
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.querySelector('.scroll-progress').style.transform = `scaleX(${progress})`;
}, { passive: true });
```

---

## SECTION 11: CUSTOM CURSOR

### 11.1 Dot + Lagged Ring with Hover Expand

```css
.cursor-dot {
  position: fixed; width: 8px; height: 8px; background: #000; border-radius: 50%;
  pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
}
.cursor-ring {
  position: fixed; width: 40px; height: 40px; border: 1.5px solid rgba(0,0,0,0.4);
  border-radius: 50%; pointer-events: none; z-index: 99998;
  transform: translate(-50%,-50%); transition: width 0.3s, height 0.3s, opacity 0.3s;
}
```
```js
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
});
(function lerp() {
  ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
  requestAnimationFrame(lerp);
})();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '64px'; ring.style.height = '64px'; ring.style.opacity = '0.6'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.opacity = '1'; });
});
```
- Hide on touch devices: `@media (hover: none) { .cursor-dot, .cursor-ring { display: none; } }`

---

## SECTION 12: MODALS & OVERLAYS

### 12.1 Clip-Path Reveal Modal
```css
.modal {
  position: fixed; inset: 0; z-index: 9999;
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.6s cubic-bezier(0.77,0,0.175,1);
  background: white; visibility: hidden;
}
.modal.open { clip-path: circle(150% at 50% 50%); visibility: visible; }
```

### 12.2 Frosted Overlay
```css
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px); z-index: 9998; opacity: 0;
  transition: opacity 0.35s; pointer-events: none;
}
.overlay.visible { opacity: 1; pointer-events: all; }
```

---

## SECTION 13: FOOTERS

### 13.1 Editorial Footer Grid
```css
.footer {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem;
  padding: 4rem max(2rem, (100vw - 1280px) / 2);
  border-top: 1px solid var(--border);
}
.footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem max(2rem, (100vw - 1280px) / 2);
  border-top: 1px solid var(--border);
  font-size: 0.8rem; color: var(--text-secondary);
}
```

---

## SECTION 14: LOADING & PAGE TRANSITIONS

### 14.1 Preloader with Count + Reveal

```css
.preloader {
  position: fixed; inset: 0; background: #000; z-index: 99999;
  display: flex; align-items: center; justify-content: center;
  transition: clip-path 1s cubic-bezier(0.77,0,0.175,1) 0.5s;
}
.preloader.done { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
```
```js
let count = 0;
const loader = document.querySelector('.preloader');
const counter = document.querySelector('.preloader-count');
const interval = setInterval(() => {
  count += Math.floor(Math.random() * 5) + 1;
  if (count >= 100) { count = 100; clearInterval(interval); setTimeout(() => loader.classList.add('done'), 500); }
  counter.textContent = count + '%';
}, 50);
```

---

## SECTION 15: FORM ELEMENTS

### 15.1 Floating Label Input

```css
.input-group { position: relative; }
.input-group input { width: 100%; padding: 1.25rem 1rem 0.5rem; border: 1.5px solid #ddd; border-radius: 8px; background: transparent; outline: none; font-size: 1rem; transition: border-color 0.2s; }
.input-group label { position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); font-size: 1rem; color: #999; pointer-events: none; transition: all 0.2s ease; }
.input-group input:focus { border-color: #000; }
.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label { top: 0.5rem; font-size: 0.7rem; color: #666; transform: none; }
```

---

## SECTION 16: MOTION SYSTEM — EXACT TOKEN DEFAULTS

**Use these exact values unless the specific site's measured values override them. These are the "best-fit defaults" grounded in Navbar Gallery-level quality.**

### Motion Tiers

| Tier | Use cases | Duration | Easing |
|------|-----------|----------|--------|
| **Micro** | hover, pressed, focus ring, icon nudge, underline slide | **120–200ms** | `cubic-bezier(0.22,1,0.36,1)` |
| **UI Transition** | dropdown open/close, modal, drawer, tooltip | **200–360ms** | `cubic-bezier(0.22,1,0.36,1)` |
| **Reveal** | hero headline, first fold, section entrance | **450–900ms** | `ease-out` or spring (sparingly) |
| **Scroll-linked** | parallax, sticky transforms, progress bar | variable | `linear` or eased mapping |
| **Ambient** | background pulse, shimmer, logo orbit | loop | `linear` or `ease-in-out` |

**Key rule:** Close duration = **~0.85× open duration**. Closing is always slightly faster than opening.

**Stagger default:** 60–80ms between items for UI lists, 100–120ms for hero reveals.

**Offsets:** 40px translateY for content reveals; 60px for hero elements; 8px for dropdown panels.

### Easing Reference
```css
/* The premium easing — use for almost everything */
--ease-out-expo:    cubic-bezier(0.22, 1, 0.36, 1);
/* Dramatic — full-screen overlays, preloaders */
--ease-dramatic:    cubic-bezier(0.77, 0, 0.175, 1);
/* Smooth UI — dropdowns, tooltips */
--ease-smooth:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
/* Hero word reveal */
--ease-hero:        cubic-bezier(0.16, 1, 0.3, 1);
/* Never use bare "ease" or "linear" for UI elements */
```

### Reduced-Motion Contract
**EVERY animation must have a `prefers-reduced-motion: reduce` fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Option A: Remove motion, keep fade */
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  /* Option B: Per-element override */
  .parallax-element { transform: none !important; }
  .marquee-content { animation: none; }
  .fullscreen-menu { transition: none; }
  .fullscreen-menu a span { transition: none; transform: none; }
}
```

---

## SECTION 17: ACCESSIBILITY — FULL CONTRACT

### Navigation ARIA Patterns (required for all nav components)

**Menu Button (Dropdown/Flyout):**
```html
<button type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-menu-products">
  Products
</button>
<ul role="menu" id="nav-menu-products" aria-label="Products">
  <li role="none"><a role="menuitem" href="/features">Features</a></li>
  <li role="none"><a role="menuitem" href="/pricing">Pricing</a></li>
</ul>
```

**Sidebar / Fullscreen Dialog:**
```html
<nav role="dialog" aria-modal="true" aria-label="Site navigation" id="main-nav-drawer">
  <!-- focus trap active when open -->
</nav>
```

**Skip Link (first element on every page):**
```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```
```css
.skip-link { position: absolute; top: -100%; left: 1rem; z-index: 99999; background: #000; color: #fff; padding: 0.5rem 1rem; border-radius: 4px; }
.skip-link:focus { top: 1rem; }
```

### Focus-Visible Styling
```css
/* Remove browser default, add custom */
*:focus { outline: none; }
*:focus-visible {
  outline: 2px solid var(--accent, #6366f1);
  outline-offset: 3px;
  border-radius: 3px;
}
/* Never hide focus-visible — it's the only indicator for keyboard users */
```

### Tap Targets
```css
/* Minimum 44×44px for all interactive elements on mobile */
button, a, [role="menuitem"] {
  min-height: 44px; min-width: 44px;
  display: inline-flex; align-items: center;
}
```

### Focus Trap Implementation (for Sidebar/Fullscreen)
```js
function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0], last = focusable[focusable.length - 1];
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}
```

---

## SECTION 18: PERFORMANCE CONTRACT

### LCP (Largest Contentful Paint) — Rules for Every Hero

```html
<!-- Hero image: explicit dimensions + fetchpriority + no lazy -->
<img src="hero.jpg" width="1920" height="1080"
     fetchpriority="high" decoding="async"
     alt="[descriptive alt]">

<!-- Hero video: poster + preload -->
<video autoplay muted loop playsinline preload="metadata" poster="hero-poster.jpg">
  <source src="hero.mp4" type="video/mp4">
</video>

<!-- Fonts: preconnect + display swap -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<style>@font-face { font-display: swap; }</style>
```

### CLS (Cumulative Layout Shift) — Prevention Rules

```css
/* All images need explicit dimensions or aspect-ratio */
img { width: 100%; height: auto; }
/* Or use aspect-ratio */
.card-image { aspect-ratio: 16/9; overflow: hidden; }
.card-image img { width: 100%; height: 100%; object-fit: cover; }

/* Announcement bar: reserve height BEFORE JS loads */
.announcement-bar-wrapper { height: 36px; } /* Set in HTML/CSS, not injected */

/* Nav: don't change height on scroll state — only change background */
```

### Per-Component Risk Matrix

| Component | LCP risk | CLS risk | Mitigation |
|-----------|----------|----------|------------|
| Hero image | HIGH | HIGH | `fetchpriority="high"`, explicit dimensions |
| Hero video | HIGH | MEDIUM | `poster`, explicit container height |
| Announcement bar | LOW | HIGH | Reserve container height in static CSS |
| Mega menu images | LOW | MEDIUM | Explicit dimensions on all images |
| Font loading | MEDIUM | MEDIUM | `font-display: swap`, preconnect |
| Lazy-loaded cards | LOW | MEDIUM | `aspect-ratio` on containers |

---

## SECTION 19: DESIGN PRINCIPLES — NON-VIBE CODED

**What separates Navbar Gallery-level UI from vibe-coded slop:**

1. **Spacing uses a strict 4px scale** — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Never random.
2. **Typography has clear hierarchy** — eyebrow → headline → subheadline → body → caption. Each distinct in SIZE + WEIGHT + COLOR. All three, not just one.
3. **Motion has hierarchy** — Primary (nav + hero) > Secondary (cards + buttons) > Ambient (backgrounds + loops). Never give ambient motion more visual weight than primary motion.
4. **Easing is intentional** — Use exact `cubic-bezier` values from Section 16. Never use bare `ease`.
5. **Colors have purpose** — Max 3 main colors + 2 neutrals. Accent used sparingly (10% rule).
6. **Border-radius is a system** — Pick ONE (all pill / all 8px / all sharp). Never mix randomly.
7. **Every interactive element has 5 states** — idle / hover / pressed / focus-visible / disabled. Design all of them.
8. **Images are never raw** — Always clipped to aspect-ratio, object-fit cover, with hover state.
9. **Sections breathe** — `padding: clamp(4rem, 10vh, 10rem) 0` minimum for major sections.
10. **Mobile is designed, not shrunken** — Separate consideration: tap targets 44px min, bottom nav option, full-width CTAs.
11. **Noise and texture add depth** — Light SVG noise overlay: `opacity: 0.03; mix-blend-mode: overlay`.
12. **Accessibility is never optional** — If it fails keyboard nav or has missing ARIA, it's not finished.
13. **Performance is a design constraint** — LCP and CLS are part of the design, not an afterthought.

---

## SECTION 20: ANALYZE MODE — SITE AUDIT PROTOCOL

**When asked to analyze, audit, or replicate a site from Navbar Gallery (or any site):**

### Required Output Format
```
SITE AUDIT: [Site Name]
Source: [URL + navbar.gallery entry link]
Website type: [from gallery or observed]
Navbar type: [from gallery or observed]

1. COMPONENTS OBSERVED
   List every visible UI component from screenshots

2. COLOR PALETTE
   hex values if observable — otherwise: "unspecified (requires computed style extraction)"

3. TYPOGRAPHY
   font families, sizes if readable — otherwise: "unspecified"

4. SPACING / GRID
   visual impression — otherwise: "unspecified"

5. ANIMATION INVENTORY
   what's clearly visible vs. inferred vs. "unspecified (requires runtime capture)"

6. INTERACTION STATES
   what's visible — everything else: "unspecified"

7. ACCESSIBILITY SIGNALS
   visible skip links, ARIA labels, focus indicators — otherwise: "unspecified"

8. PERFORMANCE SIGNALS
   observable risks — otherwise: "unspecified"

9. WHAT TO ABSTRACT (reusable patterns)
10. WHAT NOT TO COPY (brand-specific, not generalizable)
```

### Rules for Analyze Mode
- **NEVER claim exact hex/font/timing values** unless derived from computed styles or runtime capture
- **Mark ALL unobservable data as "unspecified"** — this is not a weakness, it's accuracy
- **Infer motion patterns only when clearly implied** by component type (e.g. "drawer likely uses translateX + overlay fade based on pattern type")
- Propose abstractions: what pattern can be generalized across sites vs. what is brand-specific

### Reference Site Audits (canonical examples)

**Coterie (eCommerce / Sidebar)**
- Components: Top announcement bar, sidebar drawer with nested submenus, cart drawer, hero with CTA, product sections, newsletter form
- Color: unspecified (off-white BG + cobalt/royal blue CTA accent from screenshots)
- Animation: sidebar likely `translateX + overlay fade` 240–360ms; nested submenu likely crossfade in-panel
- Accessibility signal: "Skip to header/content/footer" links visible
- Abstract: nested drawer IA clarity, large tap targets, restrained accent usage
- Don't copy: exact merchandising taxonomy, brand voice

**Joby Aviation (Travel / Full-Screen)**
- Components: Full-screen overlay menu, bold typography, brand-color immersion, minimal nav chrome
- Abstract: overlay drama, typographic scale, color-as-atmosphere

**Hex Technologies (AI / Mega Menu)**
- Components: Multi-column mega menu with product + capability grouping, enterprise-scannability layout
- Abstract: mega menu column grouping pattern, capability-vs-product IA model

**VoiceFlow (AI / Mega Menu)**
- Components: Mega menu mixing featured content card + quick links + conversion CTA inside header zone
- Abstract: CTA inside mega menu, featured content card pattern

**MetaMask (Crypto / Full-Screen)**
- Components: Full-screen overlay combining product tiles + link list, strong spatial grouping
- Abstract: product-tile + link-list combination in fullscreen

**ToDesktop (SaaS / Dropdown)**
- Components: Dark-mode dropdown with glassy overlay, product menu with descriptions
- Abstract: glass dropdown on dark nav, description-per-link pattern

---

## QUICK REFERENCE: SITE TYPE → PATTERN STACK

| Site Type | Nav Pattern | Must-Have UI Patterns |
|-----------|-------------|----------------------|
| SaaS/AI | Floating island | Bento grid, sticky feature rows, glassmorphism cards, gradient text, stat counters |
| Creative Agency | Full-screen overlay | Image hover preview, parallax, custom cursor, kinetic type, horizontal scroll |
| E-commerce | Sidebar or Mega Menu + Announcement bar | Product hover zoom, marquee logos, alternating rows, cart drawer |
| Restaurant/Nightlife | Full-screen or Transparent→Solid | Video hero, neon colors, bold type, scroll counter |
| Portfolio | Transparent→Solid or Full-screen | Split-screen hero, horizontal scroll, masonry, custom cursor, arrow buttons |
| Finance/Fintech | Floating island or Static | Dark luxury colors, stat counters, bento grid, glassmorphism |
| Docs/Marketplace | Search-centric | Sidebar nav, breadcrumbs, sticky sidebar, tabbed content |

---

See `references/implementation-code.md` for React/Next.js versions of every pattern above.
See `references/accessibility-hooks.md` for focus trap, skip links, reduced-motion hooks.
