# 21st.dev — Complete Category Reference + Survey Mapping

## What 21st.dev Is
Community-built shadcn/ui compatible registry. "The npm for design engineers."
Every component: TypeScript + Tailwind + Radix UI primitives. Production-ready.
Install any component with a single `npx shadcn` command.

## Installation

```bash
# Method 1: Direct URL install
npx shadcn@latest add "https://21st.dev/r/[author]/[component-slug]"

# Method 2: 21st.dev Magic MCP (AI-powered, most powerful)
# Add to Claude Code MCP config:
# npx -y @21st-dev/magic@latest API_KEY="your-api-key"
# Then just describe what you want in natural language

# Method 3: Browse + copy code from 21st.dev UI
# Navigate to https://21st.dev/s/[category]
# Click component → Copy code → Paste into your project
```

## SURVEY ANSWER → 21ST.DEV COMPONENT MAPPING

### By Animation Level

**Level 0-1 (minimal):** Form components, base UI, subtle inputs
→ Browse: /s/input, /s/form, /s/button, /s/card

**Level 2 (moderate):** Animated text, fade heroes, scroll areas
→ Browse: /s/hero, /s/text, /s/scroll-area

**Level 3 (rich):** Shader backgrounds, animated feature sections
→ Browse: /s/shader, /s/background, /s/features, /s/hero

**Level 4 (maximum):** Full animated pages, WebGL backgrounds, 3D
→ Browse: /s/shader + reactbits WebGL components + Remotion

---

### By Site Type

**SaaS / Startup:**
- Hero: /s/hero → pick animated gradient or beam lights
- Features: /s/features → bento or alternating rows
- Pricing: /s/pricing-section → toggle + comparison
- Testimonials: /s/testimonials → marquee scroll
- CTA: /s/call-to-action → gradient + announcement

**Creative Portfolio / Agency:**
- Hero: /s/hero → full-bleed image/video
- Scroll effects: /s/scroll-area → horizontal scroll
- Image showcase: /s/image → grid gallery
- Navigation: /s/navbar-navigation → minimal floating

**E-Commerce:**
- Navigation: /s/navbar-navigation → mega menu style
- Products: /s/card → product cards with hover
- Announcements: /s/announcement
- Footer: /s/footer → full editorial

**Docs / SaaS Dashboard:**
- Navigation: /s/sidebar (10 variants)
- Content: /s/tabs (38 variants)
- Data: /s/table (30 variants)
- Feedback: /s/alert (23 variants)

---

## FULL CATEGORY CATALOG

### MARKETING / LANDING PAGE COMPONENTS

**Heroes (73)** — https://21st.dev/s/hero
- Animated gradient background hero
- Split text reveal hero
- Video background hero
- Particle field hero
- Bento grid hero
- Globe/3D element hero
- Fullscreen image hero with overlay
- Product screenshot hero
- Terminal/code hero (developer tools)
- Social proof above-fold hero

Key features to look for:
- Headline animation (look for "animated text")
- CTA button variants
- Social proof elements (avatars, star ratings)
- Background effects

**Announcements (10)** — https://21st.dev/s/announcement
- Top banner bars
- New feature badges
- Countdown timers
- Beta/waitlist banners

**Backgrounds (33)** — https://21st.dev/s/background
- Gradient mesh
- SVG noise patterns
- Blob shapes
- Wave animations
- Dot/grid patterns
- Aurora/glow effects

**Calls to Action (34)** — https://21st.dev/s/call-to-action
- Centered CTA with gradient
- Email capture CTA
- Two-button CTA (primary + secondary)
- Dark CTA with social proof
- Bottom-of-page CTA band

**Clients / Logo Wall (16)** — https://21st.dev/s/clients
- Infinite scrolling logo marquee
- Static 2-row logo grid
- Fading edges marquee
- Grayscale → color on hover

**Comparisons (6)** — https://21st.dev/s/comparison
- Before/after slider
- Feature comparison table
- Competitor comparison cards
- Plan comparison matrix

**Docks (6)** — https://21st.dev/s/dock
- macOS-style magnifying dock
- App switcher dock
- Floating action dock
- Bottom navigation dock

**Features (36)** — https://21st.dev/s/features
- Bento grid (3-col, 2-col variants)
- Icon + text card grid
- Alternating image/text rows
- Animated feature reveal
- Interactive product demo
- Code highlight feature
- Metric dashboard preview

**Footers (14)** — https://21st.dev/s/footer
- 4-column editorial grid
- Minimal 2-row footer
- Dark newsletter + links
- Full-width gradient footer
- Social links footer

**Heroes (73) — same as above**

**Hooks (31)** — https://21st.dev/s/hook
Custom React hooks:
- useScrollProgress
- useMousePosition
- useIntersectionObserver
- useMediaQuery
- useLocalStorage
- useDebounce
- useClickOutside
- usePrefersReducedMotion

**Images (26)** — https://21st.dev/s/image
- Parallax image containers
- Image comparison sliders
- Masonry photo grid
- Hover zoom galleries
- Lightbox components
- Skeleton image loaders

**Maps (2)** — https://21st.dev/s/map
- Interactive map with markers
- Static SVG world map

**Navigation Menus (11)** — https://21st.dev/s/navbar-navigation
- Floating pill navbar
- Mega menu with categories
- Command menu (⌘K)
- Animated dropdown nav
- Tab-style navigation
- Breadcrumb navigation

**Pricing Sections (17)** — https://21st.dev/s/pricing-section
- 3-tier pricing cards
- Monthly/yearly toggle
- Feature comparison matrix
- Dark mode pricing
- Enterprise callout section
- One-time payment tier

**Scroll Areas (24)** — https://21st.dev/s/scroll-area
- Horizontal scroll section
- Scroll-revealed text blocks
- Parallax scroll containers
- Scroll progress indicators
- Sticky scroll with changing content
- Infinite scroll lists

**Shaders (15)** — https://21st.dev/s/shader
- Fluid simulation background
- Noise shader
- Wave shader
- Gradient shader animation
- Caustic light shader
- Holographic material shader

**Testimonials (15)** — https://21st.dev/s/testimonials
- Marquee testimonial carousel
- Grid of quote cards
- Tweet-style testimonials
- Video testimonial grid
- Star rating + review cards
- Avatar + name + quote list

**Texts (58)** — https://21st.dev/s/text
- Animated reveal text
- Gradient sweep text
- Typewriter text
- Highlighted text spans
- Staggered word reveal
- Rotating headline words
- Number animators
- Letter spacing animations

**Videos (9)** — https://21st.dev/s/video
- Autoplay hero video
- Video player with controls
- Background video loop
- Video thumbnail with play
- Multi-video grid

---

### UI COMPONENTS

**Accordions (40)** — https://21st.dev/s/accordion
Variants: animated chevron, FAQ style, nested, borderless, icon accordions

**AI Chats (30)** — https://21st.dev/s/ai-chat
Chat bubble variants, streaming text, typing indicators, agent UI, prompt inputs

**Alerts (23)** — https://21st.dev/s/alert
Toast-style, banner, inline, destructive, success variants

**Avatars (17)** — https://21st.dev/s/avatar
Stacked group, with badge, with tooltip, skeleton, animated

**Badges (25)** — https://21st.dev/s/badge
New/beta/pro tags, colored variants, animated pulse badges

**Buttons (130)** — https://21st.dev/s/button — THE RICHEST CATEGORY
Categories within:
- Primary / secondary / ghost / destructive
- Gradient border buttons
- Shimmer/shine effect buttons
- Arrow animated buttons
- Icon swap buttons
- Loading state buttons
- 3D depth/shadow buttons
- Neon glow buttons
- Pill buttons
- Pill with icon
- Icon-only (round)
- Full-width CTA
- Button group / segmented control
- Split button
- Floating action button (FAB)

**Cards (79)** — https://21st.dev/s/card
- Feature cards
- Pricing cards
- Blog/article cards
- Product cards
- Stats cards
- Profile cards
- Comparison cards
- Testimonial cards
- Glass morphism cards
- Gradient border cards
- Spotlight (cursor glow) cards
- 3D tilt cards
- Flip cards
- Hover reveal cards

**Carousels (16)** — https://21st.dev/s/carousel
Auto-play, drag, snap, thumbnail nav, vertical, card carousels

**Checkboxes (19)** — https://21st.dev/s/checkbox
Custom styled, animated check, with description, indeterminate

**Date Pickers (12)** — https://21st.dev/s/date-picker
Calendar picker, range picker, time picker, datetime

**Dialogs / Modals (37)** — https://21st.dev/s/modal-dialog
Standard, drawer, alert, confirm, fullscreen, command palette

**Dropdowns (25)** — https://21st.dev/s/dropdown
Select dropdown, nested, with icons, search dropdown, multi-select

**Forms (23)** — https://21st.dev/s/form
Login, signup, contact, settings, multi-step, with validation

**Inputs (102)** — https://21st.dev/s/input — HUGE CATEGORY
- Text input (floating label, icon prefix/suffix, animated border)
- Search input (expanding, with results)
- Password input (show/hide toggle)
- OTP input
- Phone input
- Tags/chip input
- File upload input
- Voice input
- AI prompt input (expanding textarea)
- Currency input
- URL input
- Color picker input
- Rich text editor

**Menus (18)** — https://21st.dev/s/menu
Context menu, dropdown menu, command palette, mega menu

**Notifications (5)** — https://21st.dev/s/notification
Toast stack, notification bell, in-app notification drawer

**Numbers (18)** — https://21st.dev/s/number
Count-up, odometer, animated currency, percentage rings

**Paginations (20)** — https://21st.dev/s/pagination
Standard, simplified, infinite scroll, numbered, with arrows

**Popovers (23)** — https://21st.dev/s/popover
Tooltip-style, card popover, feedback popover, command popover

**Radio Groups (22)** — https://21st.dev/s/radio-group
Card-style radio, icon radio, horizontal group, button radio

**Selects (62)** — https://21st.dev/s/select — VERY RICH
Simple, searchable, multi-select, grouped, with avatars, combobox

**Sidebars (10)** — https://21st.dev/s/sidebar
Collapsible, mini icon, full sidebar, with sections, floating

**Sign In (4)** — https://21st.dev/s/sign-in
Simple, social auth, OTP, enterprise SSO

**Sliders (45)** — https://21st.dev/s/slider
Range, multi-handle, with labels, volume, gradient track

**Spinner/Loaders (21)** — https://21st.dev/s/spinner-loader
Animated ring, dot pulse, skeleton, progress bar, page loader

**Tables (30)** — https://21st.dev/s/table
Data table, sortable, filterable, with pagination, expandable rows

**Tabs (38)** — https://21st.dev/s/tabs
Underline, pill, card, animated indicator, vertical, icon tabs

**Toggles (12)** — https://21st.dev/s/toggle
Standard, with icons, label, animated, size variants

**Tooltips (28)** — https://21st.dev/s/tooltip
Arrow, rich content, animated, delay, colored variants

---

## COMBINED USAGE: 21st.dev + reactbits

The best sites combine BOTH:
- **21st.dev**: Structure (nav, cards, forms, layout sections)
- **reactbits**: Effects (backgrounds, text animations, cursor, interactions)

### Example: SaaS landing page (level 3)
```
From 21st.dev:
- Hero layout + CTA button (with shimmer)
- Feature bento grid (structure)
- Testimonials (marquee layout)
- Pricing section (toggle + cards)
- Footer (editorial grid)

From reactbits:
- Aurora background behind hero
- BlurText on hero headline
- AnimatedContent wrapping every section
- SpotlightCard on feature cards
- CountUp on stats
- InfiniteScroll for logo wall
```

### Example: Creative portfolio (level 4)
```
From 21st.dev:
- Navigation menu (minimal floating)
- Image gallery (hover zoom)
- Contact form

From reactbits:
- SplashCursor (WebGL fluid)
- SplitText (GSAP per-char reveals)
- TiltedCard on project cards
- ImageTrail on project section hover
- GridDistortion on hero image
- PixelTransition between project views
```
