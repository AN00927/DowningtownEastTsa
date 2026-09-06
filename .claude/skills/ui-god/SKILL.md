---
name: ui-god
description: >
  The most comprehensive UI/UX + animation skill ever assembled for Claude Code. Combines
  navbar.gallery design patterns, reactbits.dev animated components, 21st.dev community
  registry, Remotion video/animation, and a deep preference survey system so Claude knows
  EXACTLY what the user wants before writing a single line of code. Trigger this skill for
  ANY request involving: websites, landing pages, UI components, animations, motion graphics,
  design systems, component selection, "make it look good", "non-vibe coded", "L99 UI",
  "what animations should I use", "show me options", building React/Next.js UI, video
  animations for websites, hero sections, interactive effects, or any frontend visual work.
  This skill runs a survey to understand preferences, maps answers to specific components
  from three curated sources, then generates production-ready code. Always use this skill.
---

# UI GOD — The Ultimate Claude Code UI/UX Skill
### navbar.gallery × reactbits.dev × 21st.dev × Remotion — Combined + Survey System

---

## HOW THIS SKILL WORKS

1. **Survey first** — Run Section 1 (the discovery questionnaire) before touching any code
2. **Map answers** — Use Section 2 to map survey answers to specific components and patterns
3. **Select sources** — Pull from the right library (Section 3 = reactbits, Section 4 = 21st.dev, Section 5 = navbar.gallery, Section 6 = Remotion)
4. **Generate** — Use Section 7 for the master output contract and Section 8 for the combined implementation workflow

**Read `references/reactbits-catalog.md`** for every reactbits component with install commands
**Read `references/21stdev-catalog.md`** for every 21st.dev component category + install commands
**Read `references/navbar-patterns.md`** for full navbar.gallery implementation patterns
**Read `references/remotion-patterns.md`** for Remotion video/animation patterns
**Read `references/accessibility.md`** for focus traps, ARIA, reduced-motion hooks

---

## SECTION 1: THE DISCOVERY SURVEY

**ALWAYS run this survey before writing code. Never assume. Ask every question.**
**Ask in a conversational way — not as a form dump. Group related questions together.**

### Survey Block A — The Foundation (ask first)

```
"Before I build anything, I want to make sure it's exactly right. Let me ask you a few quick questions:"

Q1. SITE TYPE
What kind of site is this?
→ SaaS product / startup landing page
→ Creative portfolio / agency
→ E-commerce store
→ Restaurant / hospitality
→ Personal portfolio / developer site
→ Documentation / content site
→ Mobile app landing page
→ Other: ___

Q2. VIBE (pick up to 3)
Which of these words describe what you want it to feel like?
→ Clean / minimal
→ Bold / aggressive
→ Dark / moody
→ Bright / colorful
→ Elegant / luxury
→ Playful / fun
→ Technical / developer
→ Editorial / magazine
→ Cyberpunk / futuristic
→ Warm / human
→ Corporate / professional

Q3. REFERENCE SITES
Can you name any websites you love the look of? (Or describe one you've seen)
→ [User input — analyze if they name a navbar.gallery site]
```

### Survey Block B — Visual Preferences

```
Q4. DARK OR LIGHT MODE
→ Dark mode (black/near-black background)
→ Light mode (white/cream background)
→ Both (system preference)
→ Custom: ___

Q5. COLOR DIRECTION
→ I have exact brand colors: [hex values]
→ I want monochrome (black/white/grays)
→ I want a single accent color on dark/white base
→ Suggest a palette based on my site type

Q6. TYPOGRAPHY FEEL
→ Sharp/geometric sans (Inter, Geist, Space Grotesk)
→ Humanist sans (Plus Jakarta, DM Sans, Nunito)
→ Display/editorial (Playfair, Fraunces, Cormorant)
→ Mono/code (Jetbrains, Fira Code, IBM Plex Mono)
→ Mix: big display headline + clean body

Q7. BORDER RADIUS SYSTEM
→ Sharp (0px — brutalist, editorial)
→ Subtle (6–8px — modern SaaS)
→ Rounded (12–16px — friendly, product)
→ Pill (9999px — playful, startup)
```

### Survey Block C — Animation Preferences

```
Q8. ANIMATION INTENSITY
On a scale:
0 = No animation at all (pure static)
1 = Subtle only (hover states, tiny transitions)
2 = Moderate (section reveals, nav animations)
3 = Rich (parallax, scroll-linked, stagger effects)
4 = Maximum (full GSAP-level, particles, 3D, video backgrounds)

Q9. SPECIFIC EFFECTS (check all that interest you)
Text effects:
→ Words revealing upward on load (kinetic type)
→ Letters splitting/staggering in
→ Blur-to-focus text entrance (BlurText)
→ Typewriter / character-by-character typing
→ Gradient sweep across text
→ Number count-up animation
→ Scramble/glitch text effect

Background effects:
→ Aurora / flowing gradient background
→ Particle field (dots floating around)
→ Animated mesh gradient
→ Noise/grain texture overlay
→ Geometric shapes morphing
→ WebGL / shader effects (advanced)
→ Simple solid color (no background anim)

Interaction effects:
→ Magnetic buttons (cursor attraction)
→ Custom cursor with ring/trail
→ Image preview following cursor on hover
→ Cards that tilt in 3D on hover
→ Hover: underline slides in from left
→ Hover: image zoom inside container
→ Hover: color shift / background change

Scroll effects:
→ Elements fade up as they enter viewport
→ Parallax (different scroll speeds)
→ Horizontal scroll section
→ Sticky section with changing content
→ Scroll-triggered counters/stats

Navigation effects:
→ Full-screen overlay menu
→ Sidebar/drawer menu
→ Floating island navbar
→ Mega menu with categories
→ Nav that changes on scroll (transparent → solid)

Q10. VIDEO / REMOTION
Do you want any animated video components?
→ No
→ Yes — hero background video (looping)
→ Yes — animated explainer section (Remotion Player embedded)
→ Yes — render an MP4 export (Remotion render pipeline)
→ Yes — animated logo/intro
```

### Survey Block D — Technical Preferences

```
Q11. TECH STACK
→ Next.js (App Router)
→ Next.js (Pages Router)
→ React + Vite
→ Remix
→ Astro
→ Other: ___

Q12. STYLING APPROACH
→ Tailwind CSS (preferred)
→ CSS Modules
→ Styled Components / Emotion
→ Plain CSS
→ shadcn/ui already set up (add to it)

Q13. ANIMATION LIBRARIES (if any are already installed)
→ None (use CSS only / React state)
→ Framer Motion / Motion
→ GSAP (already licensed)
→ React Spring
→ Any of the above — you pick what's best

Q14. EXISTING COMPONENTS
→ Starting from scratch
→ I have shadcn/ui set up — add on top
→ I have an existing design system: ___

Q15. COMPLEXITY + SCOPE
→ Single component or section
→ Full landing page
→ Multi-page website
→ Design system / component library
```

### Survey Block E — Content & Copy

```
Q16. CONTENT SECTIONS NEEDED (check all)
→ Hero section
→ Feature grid / bento
→ Social proof / testimonials
→ Pricing section
→ FAQ accordion
→ Team section
→ Blog / articles grid
→ Stats / numbers
→ CTA section
→ Contact form
→ Footer

Q17. LOGO / BRAND ASSETS
→ I'll provide a logo SVG/PNG
→ Text-based logo (just the name)
→ Generate a placeholder for now

Q18. ANYTHING ELSE?
Any specific components, effects, or constraints I should know about?
```

---

## SECTION 2: SURVEY → COMPONENT MAPPING

After the survey, use this mapping to select exactly the right tools:

### Animation Intensity Mapping

| Level | What to use | What NOT to use |
|-------|-------------|-----------------|
| 0 — Static | CSS hover only, no JS animations | Everything else |
| 1 — Subtle | CSS transitions 120–200ms, Framer Motion variants | Particles, parallax, custom cursor |
| 2 — Moderate | reactbits BlurText + AnimatedContent, navbar animations, scroll reveals | WebGL, heavy particles, video bg |
| 3 — Rich | reactbits full suite + GSAP, parallax, stagger, scroll-linked | N/A — go wild |
| 4 — Maximum | Everything: WebGL shaders, Aurora, particles, Remotion Player embeds, custom cursor, 3D tilt | Nothing |

### Vibe → Color Scheme Mapping

| Vibe | bg | text | accent | surface |
|------|----|------|--------|---------|
| Clean/minimal | #ffffff | #111111 | #000000 | #f7f7f7 |
| Bold/aggressive | #0a0a0a | #ffffff | #ff3b30 | #111 |
| Dark/moody | #0a0a0f | #f0f0f5 | #7c6ee0 | #1a1a24 |
| Bright/colorful | #fffef0 | #1a1a1a | #f59e0b | #fff8e1 |
| Elegant/luxury | #f5f2ee | #1a1612 | #c8462d | #fff |
| Playful/fun | #fafafa | #111 | #6366f1 | #f3f4ff |
| Technical/dev | #0d1117 | #e6edf3 | #58a6ff | #161b22 |
| Cyberpunk | #0d0507 | #faf0e6 | #ff2d7a | #1a0c10 |

### Vibe → reactbits Component Recommendation

| Vibe | Background | Text Effect | Interaction |
|------|-----------|-------------|-------------|
| Clean/minimal | None or subtle noise | BlurText, FadeContent | Underline hover, subtle tilt |
| Bold/aggressive | DotGrid or Beams | GlitchText, SplitText | Magnetic buttons, custom cursor |
| Dark/moody | Aurora, Particles | BlurText, GradientText | Tilt cards, cursor trail |
| Technical/dev | Beams, DotPattern | TypingText, ShinyText | BlobCursor, magnet |
| Cyberpunk | Hyperspeed, Waves | GlitchText, Ascii | SplashCursor, glitch overlays |
| Elegant/luxury | Noise texture | FadeText, SlideText | Hover preview, parallax |
| Playful/fun | Ballpit, Particles | BounceText, ColorText | TiltedCard, Dock |

### Site Type → Nav Pattern

| Site Type | Nav Pattern | Key Components |
|-----------|-------------|----------------|
| SaaS | Floating island | Dropdown, glass card, bento features |
| Creative agency | Full-screen overlay | Image hover preview, custom cursor |
| E-commerce | Announcement + sidebar | Mega menu, cart drawer |
| Restaurant | Transparent→solid | Video hero, full-screen menu |
| Portfolio | Transparent→solid or fullscreen | Horizontal scroll, masonry, custom cursor |
| Docs | Sidebar sticky | Breadcrumbs, search, tabs |

---

## SECTION 3: REACTBITS.DEV — COMPLETE COMPONENT ARSENAL

### What is reactbits.dev
Open-source library of 110+ animated, interactive React components. Copy-paste or CLI install. 4 variants per component: JS/CSS, JS/Tailwind, TS/CSS, TS/Tailwind. MIT + Commons Clause license.

### Installation (for ANY component)

```bash
# Via shadcn (recommended — TypeScript + Tailwind)
npx shadcn@latest add @react-bits/BlurText-TS-TW

# Via jsrepo
npx jsrepo add https://reactbits.dev/default/TextAnimations/BlurText
# Tailwind version:
npx jsrepo add https://reactbits.dev/tailwind/TailwindTextAnimations/BlurText
# TypeScript + Tailwind:
npx jsrepo add https://reactbits.dev/ts-tailwind/TextAnimations/BlurText

# Pattern for any component:
npx jsrepo add https://reactbits.dev/<VARIANT>/<Category>/<ComponentName>
# VARIANT options: default | tailwind | ts/default | ts/tailwind
```

### TEXT ANIMATIONS (Section: TextAnimations)

**BlurText** — Blur-to-focus entrance, word or char level. Framer Motion.
```tsx
import BlurText from '@/components/ui/BlurText';
<BlurText text="Welcome to the future" delay={150} animateBy="words" direction="top" className="text-6xl font-bold" />
// Props: text, delay, animateBy("words"|"chars"), direction("top"|"bottom"|"left"|"right"), onAnimationComplete
```
Best for: Hero headlines, section titles. Use on: dark moody, clean minimal, elegant sites.

**SplitText** — Character/word/line split with GSAP + ScrollTrigger. Per-char stagger.
```tsx
import SplitText from '@/components/ui/SplitText';
<SplitText text="Building the next generation" splitType="chars" delay={50} duration={0.6} ease="power3.out" />
// Props: text, splitType("chars"|"words"|"lines"), delay, duration, ease, scrollTrigger(bool)
```
Best for: Bold agency headlines. Requires: `npm i gsap`.

**GradientText** — Animated gradient sweep across text.
```tsx
import GradientText from '@/components/ui/GradientText';
<GradientText colors={["#6366f1", "#a855f7", "#ec4899"]} animationSpeed={4} className="text-5xl font-black">
  Ship faster
</GradientText>
// Props: colors(array), animationSpeed(seconds), showBorder(bool)
```
Best for: AI/tech SaaS CTAs. Works on: dark backgrounds.

**ShinyText** — Metallic shine sweep. Zero deps. CSS only.
```tsx
import ShinyText from '@/components/ui/ShinyText';
<ShinyText text="Premium quality" speed={3} disabled={false} className="text-2xl font-semibold text-white/70" />
// Props: text, speed, disabled, className
```
Best for: Subtle "Pro" or "Premium" labels.

**TypewriterText / TypingAnimation** — Classic typewriter with cursor.
```tsx
import TypingAnimation from '@/components/ui/TypingAnimation';
<TypingAnimation className="text-4xl font-bold" duration={80} delay={500} startOnView>
  We build things.
</TypingAnimation>
```

**CountUp** — Animated number increment on scroll enter.
```tsx
import CountUp from '@/components/ui/CountUp';
<CountUp from={0} to={100} duration={2.5} separator="," className="text-6xl font-black" suffix="+" />
// Props: from, to, duration, separator, prefix, suffix, onStart, onEnd
```

**ScrollReveal** — Text reveals on scroll with configurable direction/delay.
```tsx
import ScrollReveal from '@/components/ui/ScrollReveal';
<ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={3} blurStrength={10}>
  This text reveals as you scroll down the page.
</ScrollReveal>
```

**CircularText** — Text arranged in a circle, rotating animation.
```tsx
import CircularText from '@/components/ui/CircularText';
<CircularText text="SCROLL DOWN · EXPLORE · DISCOVER ·" radius={80} spinDuration={20} />
```

**GlitchText** — RGB channel split glitch effect.
```tsx
import GlitchText from '@/components/ui/GlitchText';
<GlitchText speed={1} enableShadows={true} enableOnHover={true} className="text-5xl font-black">
  SYSTEM ERROR
</GlitchText>
```

**RotatingText** — Words cycle with animated transition.
```tsx
import RotatingText from '@/components/ui/RotatingText';
<RotatingText texts={["fast", "reliable", "beautiful"]} transition={{ type: "spring", damping: 25 }} interval={2000} />
```

**DecryptedText** — Characters scramble then resolve to final text.
```tsx
import DecryptedText from '@/components/ui/DecryptedText';
<DecryptedText text="ACCESS GRANTED" speed={50} animateOn="view" revealDirection="start" />
```

**TrueFocus** — Each word sharpens into focus sequentially.
```tsx
import TrueFocus from '@/components/ui/TrueFocus';
<TrueFocus sentence="True focus matters" blurAmount={5} borderColor="#6366f1" glowColor="rgba(99,102,241,0.4)" />
```

**ASCIIText** — Renders text as ASCII art with animation.
```tsx
import ASCIIText from '@/components/ui/ASCIIText';
<ASCIIText text="HELLO" enableWaves={true} />
```

**TextPressure** — Text responds to mouse position with variable weight.
```tsx
import TextPressure from '@/components/ui/TextPressure';
<TextPressure text="FEEL IT" width flex alpha stroke />
```

---

### BACKGROUND COMPONENTS (Section: Backgrounds)

**Aurora** — Flowing color gradient waves. CSS only, zero deps. (Quality: 9.8/10)
```tsx
import Aurora from '@/components/ui/Aurora';
<Aurora colorStops={["#3A1C71", "#D76D77", "#FFAF7B"]} blend={0.5} amplitude={1.0} speed={0.5} />
// Props: colorStops(hex array), blend(0-1), amplitude(scale), speed(float)
// Use as absolute positioned bg behind content
```

**Particles** — Physics-based floating particle field. (Quality: 9.8/10)
```tsx
import Particles from '@/components/ui/Particles';
<Particles quantity={100} color="#ffffff" ease={80} size={0.5} staticity={30} refresh />
// Props: quantity, color, ease, size, staticity, vx, vy
// Responds to cursor hover — particles repel from mouse
```

**Beams / BackgroundBeams** — Animated light beams. WebGL-based.
```tsx
import Beams from '@/components/ui/Beams';
<Beams beamWidth={2} beamOpacity={0.15} beamCount={12} speed={2} />
```

**DotPattern / DotGrid** — Animated dot grid background.
```tsx
import DotPattern from '@/components/ui/DotPattern';
<DotPattern width={24} height={24} cx={1} cy={1} cr={1} className="opacity-30" />
```

**GridDistortion** — Interactive CSS grid that distorts on hover.
```tsx
import GridDistortion from '@/components/ui/GridDistortion';
<GridDistortion imageSrc="/hero-bg.jpg" grid={10} mouse={0.1} strength={0.15} relaxation={0.9} />
```

**Hyperspeed** — Warp speed star field effect. Three.js.
```tsx
import Hyperspeed from '@/components/ui/Hyperspeed';
<Hyperspeed effectOptions={{ onSpeedUp: () => {}, onSlowDown: () => {} }} />
```

**Iridescent** — Color-shifting iridescent surface animation.
```tsx
import Iridescent from '@/components/ui/Iridescent';
<Iridescent color={[1, 1, 1]} speed={1.0} amplitude={0.1} mouseReactive />
```

**Noise** — Film grain/noise texture overlay for depth.
```tsx
import Noise from '@/components/ui/Noise';
<Noise patternSize={200} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
```

**LetterGlitch** — Glitch background with streaming characters.
```tsx
import LetterGlitch from '@/components/ui/LetterGlitch';
<LetterGlitch glitchColors={["#2b4539", "#61dca3", "#61b3dc"]} glitchSpeed={50} smooth />
```

**OrbEffect** — Floating glowing orbs background.
```tsx
import OrbEffect from '@/components/ui/OrbEffect';
<OrbEffect hue={270} hueRange={60} numOrbs={4} size={0.5} />
```

**ShaderGradient** — WebGL shader-powered animated gradient.
```tsx
import ShaderGradient from '@/components/ui/ShaderGradient';
<ShaderGradient type="waterPlane" animate="on" uSpeed={0.3} color1="#6366f1" color2="#a855f7" color3="#0d0d0d" />
```

---

### INTERACTIVE ANIMATIONS (Section: Animations)

**Magnet** — Element magnetically attracts to cursor.
```tsx
import Magnet from '@/components/ui/Magnet';
<Magnet padding={50} disabled={false} magnetStrength={2}>
  <button>Hover me</button>
</Magnet>
// Props: padding(attraction zone), disabled, magnetStrength
```

**BlobCursor** — Fluid blob follows cursor with spring physics.
```tsx
import BlobCursor from '@/components/ui/BlobCursor';
<BlobCursor blobType="circle" fillColor="#6366f1" />
```

**SplashCursor** — Fluid simulation WebGL cursor. (Quality: 9.5/10)
```tsx
import SplashCursor from '@/components/ui/SplashCursor';
<SplashCursor SPLAT_RADIUS={0.2} COLOR_UPDATE_SPEED={10} />
```

**AnimatedContent** — Scroll-triggered animation wrapper. Framer Motion.
```tsx
import AnimatedContent from '@/components/ui/AnimatedContent';
<AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.5} ease="power3.out" initialOpacity={0} animateOpacity>
  <div>Animates in on scroll</div>
</AnimatedContent>
// Props: distance, direction("vertical"|"horizontal"), reverse, duration, ease, initialOpacity, animateOpacity, threshold, delay
```

**TiltedCard** — 3D perspective tilt on hover. Framer Motion.
```tsx
import TiltedCard from '@/components/ui/TiltedCard';
<TiltedCard imageSrc="/card.jpg" captionText="Card Title" containerHeight="300px" containerWidth="250px" imageHeight="300px" imageWidth="250px" rotateAmplitude={12} scaleOnHover={1.05} displayOverlayContent>
  <p>Overlay content</p>
</TiltedCard>
```

**FallingText** — Text falls with physics-based gravity.
```tsx
import FallingText from '@/components/ui/FallingText';
<FallingText text="Watch me fall" highlight="fall" trigger="auto" />
```

**PixelTransition** — Pixel dissolve transition effect between states.
```tsx
import PixelTransition from '@/components/ui/PixelTransition';
<PixelTransition firstContent={<img src="/a.jpg" />} secondContent={<img src="/b.jpg" />} gridSize={12} pixelColor="#6366f1" animationStepDuration={0.04} />
```

**InfiniteScroll** — Infinite horizontally scrolling items.
```tsx
import InfiniteScroll from '@/components/ui/InfiniteScroll';
const items = [{ content: <div>Item 1</div> }, { content: <div>Item 2</div> }];
<InfiniteScroll items={items} isTilted={false} tiltDirection="left" autoplay={true} autoplaySpeed={0.1} pauseOnHover={true} />
```

**ImageTrail** — Images trail behind mouse cursor.
```tsx
import ImageTrail from '@/components/ui/ImageTrail';
<ImageTrail items={["/img1.jpg", "/img2.jpg", "/img3.jpg"]} variant={1} />
```

**Crosshair** — Animated crosshair that follows the cursor.
```tsx
import Crosshair from '@/components/ui/Crosshair';
<Crosshair color="#6366f1" lineWidth={1} />
```

**Dock** — macOS-style magnifying dock nav.
```tsx
import Dock from '@/components/ui/Dock';
import { Home, Settings, User } from 'lucide-react';
const items = [
  { icon: <Home />, label: 'Home', onClick: () => {} },
  { icon: <Settings />, label: 'Settings', onClick: () => {} },
];
<Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
```

**Ballpit** — Interactive 3D ball physics. Three.js.
```tsx
import Ballpit from '@/components/ui/Ballpit';
<Ballpit count={200} gravity={0.7} friction={0.8} wallBounce={0.95} followCursor />
```

**Globe** — Interactive 3D globe. Three.js.
```tsx
import Globe from '@/components/ui/Globe';
<Globe globeConfig={{ pointSize: 4, globeColor: "#062056", atmosphereColor: "#6366f1" }} data={arcData} />
```

**StackedCards** — Cards stack and fan on hover.
```tsx
import StackedCards from '@/components/ui/StackedCards';
<StackedCards items={[{ id:1, img:"/a.jpg" }, { id:2, img:"/b.jpg" }]} />
```

**SpotlightCard** — Card with cursor-following spotlight glow.
```tsx
import SpotlightCard from '@/components/ui/SpotlightCard';
<SpotlightCard className="p-6 rounded-2xl" spotlightColor="rgba(99,102,241,0.15)">
  <h3>Feature title</h3>
</SpotlightCard>
```

**ScrollStack** — Cards stack as you scroll (sticky scroll reveal).
```tsx
import ScrollStack from '@/components/ui/ScrollStack';
<ScrollStack>
  <ScrollStack.Item><CardOne /></ScrollStack.Item>
  <ScrollStack.Item><CardTwo /></ScrollStack.Item>
</ScrollStack>
```

---

## SECTION 4: 21ST.DEV — COMMUNITY REGISTRY COMPONENTS

### What is 21st.dev
"The npm for design engineers" — community-built shadcn/ui-compatible components. Tailwind + Radix UI primitives. Install single components via `npx shadcn`. Growing weekly. Everything is TypeScript.

### Installation

```bash
# First install the specific component (find URL on 21st.dev)
npx shadcn@latest add "https://21st.dev/r/[author]/[component-name]"

# Example:
npx shadcn@latest add "https://21st.dev/r/aceternity/hero-with-beams"

# 21st.dev Magic MCP (install components via natural language in Claude Code):
npx -y @21st-dev/magic@latest API_KEY="your-api-key"
# Then in Claude Code: "add a hero section from 21st.dev with animated beams"
```

### Complete 21st.dev Category Reference

**HEROES (73 components)** — Full landing page hero sections
- Animated headline + gradient background
- Split-screen hero with video
- Glowing orb behind text
- Particle background hero
- Gradient mesh hero
- Beam lights hero (Aceternity-style)
- Typewriter headline hero
- 3D rotating product hero
```bash
# Browse: https://21st.dev/s/hero
# Install any hero:
npx shadcn@latest add "https://21st.dev/r/[author]/[hero-name]"
```

**BACKGROUNDS (33 components)** — Standalone background effects
- Animated gradient mesh
- SVG noise texture
- Grid pattern overlays
- Blob morphing
- Wave animations
- Aurora gradients
```bash
# Browse: https://21st.dev/s/background
```

**BUTTONS (130 components)** — Every button variant imaginable
- Gradient border buttons
- Shimmer/shine CTAs
- Arrow-animated buttons
- Icon swap on hover
- Ripple effect
- Loading state buttons
- 3D depth buttons
- Neon glow buttons
```bash
# Browse: https://21st.dev/s/button
npx shadcn@latest add "https://21st.dev/r/[author]/[button-name]"
```

**CARDS (79 components)** — Feature, product, testimonial cards
- Spotlight card (cursor glow)
- Glass card
- Bento grid cells
- Flip cards
- 3D tilt cards
- Gradient border cards
- Hover reveal cards
- Stats cards
```bash
# Browse: https://21st.dev/s/card
```

**NAVIGATION MENUS (11 components)** — Nav patterns
- Floating pill navbar
- Mega menu
- Command menu (⌘K)
- Animated dropdown
- Tab navigation
```bash
# Browse: https://21st.dev/s/navbar-navigation
```

**TEXTS (58 components)** — Typography components
- Animated headlines
- Gradient text
- Typewriter
- Highlighted text
- Number counters
- Letter spacing animations
```bash
# Browse: https://21st.dev/s/text
```

**FEATURES (36 components)** — Feature section layouts
- Bento grid features
- Icon + text alternating rows
- Feature comparison table
- Animated feature cards
- Interactive feature showcase
```bash
# Browse: https://21st.dev/s/features
```

**TESTIMONIALS (15 components)** — Social proof sections
- Marquee testimonial scroll
- Avatar stack
- Star rating displays
- Quote cards
- Video testimonials
```bash
# Browse: https://21st.dev/s/testimonials
```

**PRICING SECTIONS (17 components)** — Pricing tables
- Animated toggle (monthly/yearly)
- Feature comparison table
- Highlighted popular plan
- Dark mode pricing
```bash
# Browse: https://21st.dev/s/pricing-section
```

**SCROLL AREAS (24 components)** — Scroll-linked effects
- Horizontal scroll
- Scroll-revealed text
- Parallax containers
- Scroll progress indicators
```bash
# Browse: https://21st.dev/s/scroll-area
```

**SHADERS (15 components)** — WebGL visual effects
- Fluid simulation
- Noise shader backgrounds
- Wave shaders
- Gradient shaders
```bash
# Browse: https://21st.dev/s/shader
```

**DOCKS (6 components)** — macOS-style dock navigation
```bash
# Browse: https://21st.dev/s/dock
```

**FOOTERS (14 components)** — Footer layouts
- Editorial grid footer
- Minimal footer
- Dark footer with social links
- Newsletter + links
```bash
# Browse: https://21st.dev/s/footer
```

**FULL UI COMPONENT LIBRARY (from 21st.dev)**

| Category | Count | Browse URL |
|----------|-------|-----------|
| Accordions | 40 | /s/accordion |
| AI Chats | 30 | /s/ai-chat |
| Alerts | 23 | /s/alert |
| Avatars | 17 | /s/avatar |
| Badges | 25 | /s/badge |
| Buttons | 130 | /s/button |
| Calendars | 34 | /s/calendar |
| Cards | 79 | /s/card |
| Carousels | 16 | /s/carousel |
| Checkboxes | 19 | /s/checkbox |
| Dialogs/Modals | 37 | /s/modal-dialog |
| Dropdowns | 25 | /s/dropdown |
| Forms | 23 | /s/form |
| Inputs | 102 | /s/input |
| Menus | 18 | /s/menu |
| Sidebars | 10 | /s/sidebar |
| Sliders | 45 | /s/slider |
| Spinner/Loaders | 21 | /s/spinner-loader |
| Tables | 30 | /s/table |
| Tabs | 38 | /s/tabs |
| Tooltips | 28 | /s/tooltip |

### Using 21st.dev Magic MCP (most powerful mode)

Once `@21st-dev/magic` is installed as MCP in Claude Code:
```
"Use 21st.dev magic to add a hero section with glowing beams and a gradient headline"
"Find me a bento grid feature section from 21st.dev and install it"
"Add a testimonials marquee from 21st.dev"
```
Magic Agent generates or finds the component, writes the files, and integrates with your codebase.

---

## SECTION 5: NAVBAR.GALLERY — IMPLEMENTATION PATTERNS

See `references/navbar-patterns.md` for the complete implementation-level reference.

### Quick Nav Pattern Selector

Based on survey answers:
- Full-screen overlay → Section 1.7 in navbar-patterns.md + `clip-path: circle()` animation
- Floating island → Section 1.1 + `backdrop-filter: blur()` pill
- Sidebar drawer → Section 1.6 + focus trap + body scroll lock
- Mega menu → Section 1.5 + grid layout + image column
- Announcement bar → Section 1.3 + CSS ticker + CLS prevention

### Motion Token Quick Reference

```
Micro (hover, icon):  120–200ms  cubic-bezier(0.22,1,0.36,1)
UI (dropdown, modal): 200–360ms  cubic-bezier(0.22,1,0.36,1)
Reveal (hero, scroll): 450–900ms ease-out or cubic-bezier(0.16,1,0.3,1)
Close = 0.85× open duration always
Stagger: 60–80ms UI items, 100–120ms hero words
```

---

## SECTION 6: REMOTION — EMBEDDED VIDEO ANIMATIONS

Use Remotion when survey answers include ANY of: video bg, Remotion Player, animated explainer, MP4 export, logo animation.

See `references/remotion-patterns.md` for full patterns.

### Quick Setup

```bash
npx create-video@latest  # for new project
# or for embedding in existing React site:
npm i --save-exact remotion @remotion/player
```

### Embedding in Website (no video file needed)

```tsx
import { Player } from '@remotion/player';
import { HeroAnimation } from './remotion/HeroAnimation';

// In your hero section:
<Player
  component={HeroAnimation}
  inputProps={{ accentColor: '#6366f1' }}
  durationInFrames={180}
  fps={60}
  compositionWidth={1920}
  compositionHeight={1080}
  style={{ width: '100%', borderRadius: 16 }}
  autoPlay loop controls={false}
/>
```

### Combining with reactbits

Survey asks about Remotion Player embed + Aurora background → combine:
```tsx
// Aurora as Remotion composition background
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const AuroraHero = () => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, 300], [135, 225]);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${angle}deg, #3A1C71, #D76D77)` }}>
      {/* text reveals with interpolate() */}
    </AbsoluteFill>
  );
};
```

---

## SECTION 7: MASTER OUTPUT CONTRACT

**After completing the survey, always emit these sections in order:**

### Required Output Structure

```
1. SURVEY SUMMARY
   "Based on your answers: [site type], [vibe], [animation level]
   Here's what I'll build: [1-paragraph plan]"

2. SELECTED COMPONENTS (before any code)
   List every component chosen with source:
   - Hero: Aurora (reactbits) + BlurText (reactbits) + custom nav
   - Features: SpotlightCard × 3 (reactbits)
   - Testimonials: Marquee pattern (21st.dev)
   - Navigation: Floating island (navbar.gallery pattern)
   - Animation: AnimatedContent wrappers (reactbits)

3. INSTALL COMMANDS
   All CLI commands needed, grouped:
   # reactbits
   npx shadcn@latest add @react-bits/Aurora-TS-TW
   npx shadcn@latest add @react-bits/BlurText-TS-TW
   # 21st.dev (browse and pick specific URL)
   npx shadcn@latest add "https://21st.dev/r/[chosen component]"

4. DESIGN TOKENS FILE
   Complete tokens/design-system.ts

5. COMPONENT CODE
   Full implementation, one component at a time

6. PAGE COMPOSITION
   The final page.tsx putting it all together

7. ACCESSIBILITY CHECKLIST
   Verify every interactive element is covered
```

---

## SECTION 8: COMBINED IMPLEMENTATION WORKFLOW

### Step 1: Run Survey (never skip)
Ask all questions from Section 1. Record answers.

### Step 2: Map to Components (Section 2)
Animation level → which effects
Vibe → color tokens + reactbits background + text effect
Site type → nav pattern

### Step 3: Scaffold

```bash
# New Next.js project with shadcn:
npx create-next-app@latest my-site --typescript --tailwind --app
cd my-site
npx shadcn@latest init

# Install all selected reactbits components:
npx shadcn@latest add @react-bits/[Component]-TS-TW

# Install Remotion Player if needed:
npm i --save-exact remotion @remotion/player
```

### Step 4: Create Design Tokens First

```ts
// tokens/design-system.ts
export const tokens = {
  colors: { /* from survey Q5 + Q4 */ },
  typography: { /* from survey Q6 */ },
  radii: { /* from survey Q7 */ },
  motion: {
    micro:  { duration: 150, ease: 'cubic-bezier(0.22,1,0.36,1)' },
    ui:     { duration: 260, ease: 'cubic-bezier(0.22,1,0.36,1)' },
    reveal: { duration: 700, ease: 'cubic-bezier(0.16,1,0.3,1)' },
    stagger: { ui: 60, hero: 100 },
  },
} as const;
```

### Step 5: Build — Exact Order
1. `components/Nav.tsx` — Nav pattern from survey + navbar.gallery implementation
2. `components/Hero.tsx` — Background (reactbits) + text effect (reactbits) + CTA
3. `components/[Feature].tsx` — From 21st.dev or reactbits cards
4. `components/Social.tsx` — Testimonials, logos marquee
5. `components/CTA.tsx` — Button + section
6. `components/Footer.tsx`
7. `app/page.tsx` — Assembly

### Step 6: Animation Pass
After all components exist:
- Wrap ALL section-level entries in `<AnimatedContent>` (reactbits)
- Apply stagger to any list/grid of items
- Add scroll progress bar if animation level ≥ 3
- Add custom cursor if animation level ≥ 3 and vibe = agency/portfolio/cyberpunk

### Step 7: Accessibility Pass
- Add SkipLink as first element
- Verify nav has focus trap (sidebar/fullscreen)
- Check all buttons have `aria-label` if icon-only
- Test keyboard: Tab through everything
- Add `prefers-reduced-motion` overrides

---

## SECTION 9: LIVE COMPONENT SHOWCASE — PICK YOUR STACK

**Show this when user asks "what animations are available" or "show me options":**

### HERO BACKGROUNDS — pick one
```
1. Aurora (reactbits) — Flowing gradient color waves. Best: dark moody, AI, tech
2. Particles (reactbits) — Physics dot field, cursor-reactive. Best: dark, minimal
3. Beams (reactbits) — Light beam streaks. Best: SaaS, dark tech
4. ShaderGradient (reactbits) — WebGL animated gradient. Best: luxury, premium
5. Hyperspeed (reactbits) — Warp speed starfield. Best: sci-fi, gaming
6. GridDistortion (reactbits) — Image grid warps on hover. Best: portfolio, agency
7. OrbEffect (reactbits) — Glowing orb blobs. Best: SaaS, friendly
8. Solid color + noise texture — Zero perf cost. Best: minimal, editorial
9. Video (HTML5) — Full bleed autoplay loop. Best: restaurant, luxury, events
```

### TEXT HERO EFFECTS — pick one
```
1. BlurText — blur-to-focus word by word. Best: ANY site
2. SplitText (GSAP) — per-char dramatic reveal. Best: agency, portfolio
3. GradientText — rainbow sweep. Best: AI, SaaS
4. TypingAnimation — typewriter effect. Best: dev tools, terminal
5. TrueFocus — each word sharpens. Best: product, storytelling
6. GlitchText — RGB split glitch. Best: cyberpunk, gaming, art
7. RotatingText — cycling word swap. Best: multi-product SaaS
8. DecryptedText — characters resolve. Best: crypto, security, tech
```

### INTERACTIVE EFFECTS — pick any combination
```
CURSOR:
- BlobCursor — fluid blob (subtle)
- SplashCursor — WebGL fluid sim (dramatic)
- Crosshair — crosshair follows cursor
- Custom dot + ring (CSS, zero deps) — portfolio standard

BUTTONS:
- Magnet — attraction effect
- SpotlightCard — glow follows cursor inside card
- TiltedCard — 3D perspective on hover

SCROLL:
- AnimatedContent — fade/slide in on scroll (use on EVERYTHING)
- ScrollStack — cards stack as you scroll
- InfiniteScroll — horizontal auto-scroll logos/items

SPECIAL:
- Ballpit — physics ball pool (hero decoration)
- Globe — 3D interactive globe (location/reach sections)
- PixelTransition — pixel dissolve between images
- ImageTrail — images follow cursor trail
```

---

## SECTION 10: DESIGN PRINCIPLES

1. **Survey before code** — Never assume vibe/stack/preferences
2. **Source-match components** — reactbits for effects, 21st.dev for structure, navbar.gallery for nav
3. **Animation level discipline** — Level 0–1: CSS only. Level 2: reactbits text + AnimatedContent. Level 3+: backgrounds, cursor, parallax. Level 4: everything including Remotion/WebGL
4. **Performance hierarchy** — Text effects: free. CSS backgrounds: cheap. Framer Motion: moderate. WebGL/Three.js: expensive, use sparingly or lazy-load
5. **Every interactive element: 5 states** — idle, hover, pressed, focus-visible, disabled
6. **Accessibility is not optional** — skip link, focus trap, reduced-motion, ARIA always
7. **One background effect max** — Never stack Aurora + Particles + Beams. Pick one.
8. **Typography scale** — `clamp()` always. eyebrow → headline → subheadline → body → caption
9. **Spacing is a system** — 4/8/12/16/24/32/48/64/96/128px only
10. **Close = 0.85× open** — Every animation pair follows this rule
