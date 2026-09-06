# React Bits — Complete Install Reference

## Installation Pattern
```bash
# TypeScript + Tailwind (always prefer this):
npx shadcn@latest add @react-bits/<ComponentName>-TS-TW

# Via jsrepo:
npx jsrepo add https://reactbits.dev/ts-tailwind/<Category>/<ComponentName>
```

## FULL COMPONENT CATALOG

### TEXT ANIMATIONS (Category: TextAnimations)
| Component | Install | Use case | Deps |
|-----------|---------|---------|------|
| BlurText | `@react-bits/BlurText-TS-TW` | Hero headlines, blur-to-focus | framer-motion |
| SplitText | `@react-bits/SplitText-TS-TW` | Dramatic per-char reveal | gsap |
| GradientText | `@react-bits/GradientText-TS-TW` | Animated color sweep | none |
| ShinyText | `@react-bits/ShinyText-TS-TW` | Metallic shine label | none |
| TypingAnimation | `@react-bits/TypingAnimation-TS-TW` | Typewriter effect | none |
| CountUp | `@react-bits/CountUp-TS-TW` | Animated stats numbers | framer-motion |
| ScrollReveal | `@react-bits/ScrollReveal-TS-TW` | Scroll-triggered text reveal | framer-motion |
| CircularText | `@react-bits/CircularText-TS-TW` | Text on a rotating circle | none |
| GlitchText | `@react-bits/GlitchText-TS-TW` | RGB split glitch | none |
| RotatingText | `@react-bits/RotatingText-TS-TW` | Cycling word swap | framer-motion |
| DecryptedText | `@react-bits/DecryptedText-TS-TW` | Characters scramble-resolve | none |
| TrueFocus | `@react-bits/TrueFocus-TS-TW` | Words sharpen sequentially | framer-motion |
| ASCIIText | `@react-bits/ASCIIText-TS-TW` | ASCII art text render | none |
| TextPressure | `@react-bits/TextPressure-TS-TW` | Mouse-driven variable weight | none |
| FuzzyText | `@react-bits/FuzzyText-TS-TW` | Fuzzy noise text on hover | none |
| NarrativeText | `@react-bits/NarrativeText-TS-TW` | Story-style sequential reveal | framer-motion |
| WordPullUp | `@react-bits/WordPullUp-TS-TW` | Words pull up from bottom | framer-motion |
| WaveText | `@react-bits/WaveText-TS-TW` | Characters wave on hover | none |
| HighlightText | `@react-bits/HighlightText-TS-TW` | Marker highlight on scroll | none |
| NumberFlow | `@react-bits/NumberFlow-TS-TW` | Smooth animated number transitions | none |

### BACKGROUNDS (Category: Backgrounds)
| Component | Install | Use case | Deps |
|-----------|---------|---------|------|
| Aurora | `@react-bits/Aurora-TS-TW` | Flowing gradient waves | none |
| Particles | `@react-bits/Particles-TS-TW` | Physics dot field | none |
| Beams | `@react-bits/Beams-TS-TW` | Light beam streaks | none |
| DotPattern | `@react-bits/DotPattern-TS-TW` | Animated dot grid | none |
| GridDistortion | `@react-bits/GridDistortion-TS-TW` | Image grid warps on hover | none |
| Hyperspeed | `@react-bits/Hyperspeed-TS-TW` | Warp speed starfield | three |
| Iridescent | `@react-bits/Iridescent-TS-TW` | Color-shifting surface | three |
| Noise | `@react-bits/Noise-TS-TW` | Film grain texture | none |
| LetterGlitch | `@react-bits/LetterGlitch-TS-TW` | Streaming glitch chars | none |
| OrbEffect | `@react-bits/OrbEffect-TS-TW` | Glowing blob orbs | none |
| ShaderGradient | `@react-bits/ShaderGradient-TS-TW` | WebGL animated gradient | three |
| Squares | `@react-bits/Squares-TS-TW` | Animated square grid | none |
| MeshGradient | `@react-bits/MeshGradient-TS-TW` | Smooth mesh gradient | none |
| WavyBackground | `@react-bits/WavyBackground-TS-TW` | Wave animation bg | framer-motion |
| FlickeringGrid | `@react-bits/FlickeringGrid-TS-TW` | Random cell flicker grid | none |
| AnimatedBeams | `@react-bits/AnimatedBeams-TS-TW` | Beam lines connecting elements | framer-motion |
| HeroParticles | `@react-bits/HeroParticles-TS-TW` | Dense particle hero | none |
| RetroGrid | `@react-bits/RetroGrid-TS-TW` | Perspective grid floor | none |
| CloudAnimation | `@react-bits/CloudAnimation-TS-TW` | Drifting cloud shapes | none |

### ANIMATIONS / INTERACTIONS (Category: Animations)
| Component | Install | Use case | Deps |
|-----------|---------|---------|------|
| Magnet | `@react-bits/Magnet-TS-TW` | Magnetic cursor attraction | none |
| BlobCursor | `@react-bits/BlobCursor-TS-TW` | Fluid blob cursor | none |
| SplashCursor | `@react-bits/SplashCursor-TS-TW` | WebGL fluid cursor sim | none |
| AnimatedContent | `@react-bits/AnimatedContent-TS-TW` | Scroll-triggered reveal wrapper | gsap |
| TiltedCard | `@react-bits/TiltedCard-TS-TW` | 3D perspective card tilt | framer-motion |
| FallingText | `@react-bits/FallingText-TS-TW` | Physics gravity text | matter-js |
| PixelTransition | `@react-bits/PixelTransition-TS-TW` | Pixel dissolve transition | none |
| InfiniteScroll | `@react-bits/InfiniteScroll-TS-TW` | Auto-scroll carousel | framer-motion |
| ImageTrail | `@react-bits/ImageTrail-TS-TW` | Images trail the cursor | gsap |
| Crosshair | `@react-bits/Crosshair-TS-TW` | Cursor crosshair | none |
| Dock | `@react-bits/Dock-TS-TW` | macOS magnifying dock | framer-motion |
| Ballpit | `@react-bits/Ballpit-TS-TW` | 3D ball physics | three, @react-three/fiber |
| Globe | `@react-bits/Globe-TS-TW` | Interactive 3D globe | three, cobe |
| StackedCards | `@react-bits/StackedCards-TS-TW` | Fan-stack on hover | framer-motion |
| SpotlightCard | `@react-bits/SpotlightCard-TS-TW` | Cursor glow spotlight | none |
| ScrollStack | `@react-bits/ScrollStack-TS-TW` | Sticky scroll card stack | framer-motion |
| DragCards | `@react-bits/DragCards-TS-TW` | Draggable floating cards | framer-motion |
| MouseImageTrail | `@react-bits/MouseImageTrail-TS-TW` | Images follow mouse path | none |
| Ribbon | `@react-bits/Ribbon-TS-TW` | Animated 3D ribbon | three |
| FlipCard | `@react-bits/FlipCard-TS-TW` | 3D flip on hover | framer-motion |
| ElasticSlider | `@react-bits/ElasticSlider-TS-TW` | Spring-physics slider | framer-motion |
| MorphingCard | `@react-bits/MorphingCard-TS-TW` | Shape morphing on hover | framer-motion |
| CountdownTimer | `@react-bits/CountdownTimer-TS-TW` | Animated countdown | framer-motion |
| AnimatedList | `@react-bits/AnimatedList-TS-TW` | Items animate in sequentially | framer-motion |
| Carousel | `@react-bits/Carousel-TS-TW` | Smooth scroll carousel | framer-motion |
| ProgressBar | `@react-bits/ProgressBar-TS-TW` | Animated skill/stat bars | framer-motion |
| StarRating | `@react-bits/StarRating-TS-TW` | Interactive animated stars | framer-motion |

## USAGE PATTERNS

### Hero with Aurora + BlurText (most popular combo)
```tsx
import Aurora from '@/components/ui/Aurora';
import BlurText from '@/components/ui/BlurText';

export function Hero({ accentColor = '#6366f1' }) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Aurora
        colorStops={['#1a0a2e', accentColor, '#0d0d1a']}
        blend={0.4} amplitude={0.8} speed={0.4}
      />
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <BlurText
          text="The Future is Here"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-6xl lg:text-8xl font-black text-white tracking-tight"
        />
        <BlurText
          text="Build faster with our platform"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-xl text-white/60 mt-6"
        />
      </div>
    </div>
  );
}
```

### Feature grid with SpotlightCard
```tsx
import SpotlightCard from '@/components/ui/SpotlightCard';
import AnimatedContent from '@/components/ui/AnimatedContent';

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: '10x faster with our engine' },
  { icon: '🔒', title: 'Secure', desc: 'SOC2 certified, end-to-end encrypted' },
  { icon: '📊', title: 'Analytics', desc: 'Real-time insights, zero latency' },
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
      {features.map((f, i) => (
        <AnimatedContent key={i} distance={40} direction="vertical" delay={i * 100}>
          <SpotlightCard
            className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full"
            spotlightColor="rgba(99,102,241,0.15)"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="text-lg font-semibold text-white mt-3">{f.title}</h3>
            <p className="text-sm text-white/50 mt-1">{f.desc}</p>
          </SpotlightCard>
        </AnimatedContent>
      ))}
    </div>
  );
}
```

### Stats section with CountUp
```tsx
import CountUp from '@/components/ui/CountUp';
import AnimatedContent from '@/components/ui/AnimatedContent';

const stats = [
  { value: 50000, suffix: '+', label: 'Users' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 200, suffix: 'ms', label: 'Avg Response' },
];

export function Stats() {
  return (
    <div className="flex gap-16 justify-center flex-wrap">
      {stats.map((s, i) => (
        <AnimatedContent key={i} delay={i * 100}>
          <div className="text-center">
            <div className="text-5xl font-black text-white">
              <CountUp from={0} to={s.value} suffix={s.suffix} duration={2.5} />
            </div>
            <div className="text-sm text-white/40 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        </AnimatedContent>
      ))}
    </div>
  );
}
```

### Logo marquee with InfiniteScroll
```tsx
import InfiniteScroll from '@/components/ui/InfiniteScroll';

const logos = [
  { content: <img src="/logos/acme.svg" className="h-8 opacity-40 hover:opacity-80 transition-opacity" /> },
  { content: <img src="/logos/globex.svg" className="h-8 opacity-40 hover:opacity-80 transition-opacity" /> },
];

export function LogoMarquee() {
  return (
    <div className="py-12">
      <p className="text-center text-sm text-white/30 uppercase tracking-widest mb-8">
        Trusted by leading companies
      </p>
      <InfiniteScroll items={logos} autoplay autoplaySpeed={0.05} pauseOnHover />
    </div>
  );
}
```
