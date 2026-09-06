# Remotion Animation Patterns — Full Code Reference

## PATTERN 1: Explainer Video (Portrait, 30s)

### Root.tsx
```tsx
import { Composition } from 'remotion';
import { ExplainerVideo } from './ExplainerVideo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Explainer"
    component={ExplainerVideo}
    durationInFrames={900}  // 30s at 30fps
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{ topic: 'How AI Works', accentColor: '#6366f1' }}
  />
);
```

### ExplainerVideo.tsx (5-scene structure)
```tsx
import { AbsoluteFill, Series } from 'remotion';

export const ExplainerVideo: React.FC<{ topic: string; accentColor: string }> = ({ topic, accentColor }) => (
  <AbsoluteFill style={{ backgroundColor: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
    <Series>
      <Series.Sequence durationInFrames={90}> {/* 3s hook */}
        <HookScene topic={topic} accent={accentColor} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}> {/* 5s problem */}
        <ProblemScene accent={accentColor} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}> {/* 7s solution */}
        <SolutionScene accent={accentColor} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}> {/* 10s features */}
        <FeaturesScene accent={accentColor} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}> {/* 5s CTA */}
        <CTAScene accent={accentColor} />
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);
```

---

## PATTERN 2: SVG Diagram Draw Animation

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { evolvePath } from '@remotion/paths';

const paths = [
  'M 100 200 L 400 200',                      // horizontal arrow
  'M 400 200 C 500 200 500 350 400 350',       // curve
  'M 400 350 L 100 350',                       // return
];

export const DiagramDraw: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <svg width={600} height={500} viewBox="0 0 600 500">
        {paths.map((d, i) => {
          const startFrame = i * 20;
          const localFrame = Math.max(0, frame - startFrame);
          const progress = Math.min(localFrame / 30, 1);
          const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);
          return (
            <path
              key={i}
              d={d}
              stroke="#6366f1"
              strokeWidth={4}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
```

---

## PATTERN 3: Terminal Typing Animation

```tsx
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { interpolate } from 'remotion';

const LINES = [
  '$ npx create-video@latest',
  '✓ Project created successfully',
  '$ cd my-video && npm run dev',
  '✓ Remotion Studio running at localhost:3000',
];

export const TerminalScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center', padding: '0 80px',
    }}>
      <div style={{
        background: '#111',
        borderRadius: 12,
        padding: '32px 40px',
        width: '100%',
        fontFamily: 'monospace',
        fontSize: 32,
        border: '1px solid #333',
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {LINES.map((line, i) => {
          const lineStart = i * 30;     // each line starts 1s apart
          const lineEnd = lineStart + 25;
          const chars = Math.floor(interpolate(frame, [lineStart, lineEnd], [0, line.length], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          }));
          const visible = frame >= lineStart;

          return visible ? (
            <div key={i} style={{
              color: line.startsWith('✓') ? '#27c93f' : '#e8e8e8',
              marginBottom: 12,
            }}>
              {line.slice(0, chars)}
              {/* Blinking cursor on last active line */}
              {i === LINES.filter((_, j) => frame >= j * 30).length - 1 && chars < line.length && (
                <span style={{ opacity: Math.round(frame / 8) % 2 }}>▌</span>
              )}
            </div>
          ) : null;
        })}
      </div>
    </AbsoluteFill>
  );
};
```

---

## PATTERN 4: Bar Chart Race Animation

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

const DATA = [
  { label: 'React', value: 89, color: '#61dafb' },
  { label: 'Vue', value: 72, color: '#4fc08d' },
  { label: 'Angular', value: 65, color: '#dd0031' },
  { label: 'Svelte', value: 58, color: '#ff3e00' },
];
const MAX = 100;

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%' }}>
        {DATA.map((item, i) => {
          const startFrame = i * 10;
          const width = interpolate(frame, [startFrame, startFrame + 45], [0, (item.value / MAX) * 100], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], { extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{ opacity }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'white', fontSize: 32, fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: '#888', fontSize: 32 }}>{Math.round(width)}%</span>
              </div>
              <div style={{ background: '#222', borderRadius: 8, height: 48, overflow: 'hidden' }}>
                <div style={{
                  width: `${width}%`, height: '100%',
                  background: item.color, borderRadius: 8,
                  transition: 'none',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

---

## PATTERN 5: Floating Organic Noise Background

```tsx
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';
import { interpolate } from 'remotion';

const BLOBS = Array.from({ length: 5 }, (_, i) => ({
  seed: `blob-${i}`,
  baseX: (i * 20) + 10,
  baseY: (i * 15) + 10,
  size: 300 + i * 80,
  color: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#06b6d4'][i],
}));

export const NoiseBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {BLOBS.map((blob) => {
        const x = blob.baseX + noise2D(blob.seed + 'x', frame / 80, 0) * 20;
        const y = blob.baseY + noise2D(blob.seed + 'y', 0, frame / 80) * 20;
        const scale = 1 + noise2D(blob.seed + 's', frame / 120, 0) * 0.3;

        return (
          <div key={blob.seed} style={{
            position: 'absolute',
            left: `${x}%`, top: `${y}%`,
            width: blob.size, height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            opacity: 0.15,
            filter: 'blur(80px)',
            transform: `translate(-50%, -50%) scale(${scale})`,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};
```

---

## PATTERN 6: Product Feature Showcase

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';

const FEATURES = [
  { icon: '⚡', title: 'Lightning Fast', desc: '10x faster rendering with GPU acceleration' },
  { icon: '🔒', title: 'Secure by Default', desc: 'End-to-end encryption on every request' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'Live dashboards with zero latency' },
];

export const FeatureShowcase: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 80px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%' }}>
        {FEATURES.map((f, i) => {
          const delay = i * 20;
          const localFrame = Math.max(0, frame - delay);
          const progress = spring({ frame: localFrame, fps, config: { damping: 200 } });
          const x = interpolate(progress, [0, 1], [-80, 0]);
          const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 32,
              opacity, transform: `translateX(${x}px)`,
            }}>
              <div style={{
                fontSize: 64, width: 100, height: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${accent}22`, borderRadius: 20,
                border: `1px solid ${accent}44`,
              }}>
                {f.icon}
              </div>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: 'white', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 30, color: '#888' }}>{f.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

---

## PATTERN 7: Animated Gradient Background

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const AnimatedGradientBg: React.FC = () => {
  const frame = useCurrentFrame();

  // Slowly rotating gradient
  const angle = interpolate(frame, [0, 300], [135, 225]);
  const hue1 = interpolate(frame, [0, 150, 300], [240, 280, 240]);  // purple → violet → purple
  const hue2 = interpolate(frame, [0, 150, 300], [320, 200, 320]);  // pink → teal → pink

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${angle}deg, hsl(${hue1}, 70%, 20%), hsl(${hue2}, 80%, 15%))`,
    }} />
  );
};
```

---

## PATTERN 8: Slide Transition Between Scenes

```tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

// Usage: wrap in a Sequence at the scene boundary
export const SlideTransition: React.FC<{
  outgoing: React.ReactNode;
  incoming: React.ReactNode;
  durationInFrames?: number;
}> = ({ outgoing, incoming, durationInFrames = 20 }) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / durationInFrames, 1);
  const outX = interpolate(progress, [0, 1], [0, -100]);  // % units via transform
  const inX = interpolate(progress, [0, 1], [100, 0]);

  return (
    <>
      <AbsoluteFill style={{ transform: `translateX(${outX}%)` }}>{outgoing}</AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${inX}%)` }}>{incoming}</AbsoluteFill>
    </>
  );
};
```

---

## PATTERN 9: Glitch Effect Text

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { noise2D } from '@remotion/noise';

export const GlitchText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  // Glitch triggers at specific frames
  const isGlitching = frame % 30 < 4 || frame % 47 < 3;

  const glitchX = isGlitching ? noise2D('gx', frame, 0) * 20 : 0;
  const glitchY = isGlitching ? noise2D('gy', 0, frame) * 8 : 0;
  const redShift = isGlitching ? noise2D('rx', frame * 2, 0) * 15 : 0;
  const blueShift = isGlitching ? noise2D('bx', frame * 3, 0) * 12 : 0;

  const textStyle = {
    fontSize: 120, fontWeight: 900, letterSpacing: '-0.04em',
    position: 'absolute' as const, inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <AbsoluteFill>
      {/* Red channel */}
      <div style={{ ...textStyle, color: '#ff0044', transform: `translate(${redShift}px, ${glitchY}px)`, opacity: 0.7, mixBlendMode: 'screen' }}>{text}</div>
      {/* Blue channel */}
      <div style={{ ...textStyle, color: '#00ffff', transform: `translate(${-blueShift}px, ${-glitchY}px)`, opacity: 0.7, mixBlendMode: 'screen' }}>{text}</div>
      {/* Main */}
      <div style={{ ...textStyle, color: 'white', transform: `translate(${glitchX}px, 0)` }}>{text}</div>
    </AbsoluteFill>
  );
};
```

---

## PATTERN 10: Motion Trail (spring chain)

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const TRAIL_LENGTH = 6;

export const MotionTrail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Leader position
  const leaderX = interpolate(
    spring({ frame, fps, config: { damping: 12 } }),
    [0, 1], [0, 800]
  );

  return (
    <AbsoluteFill style={{ alignItems: 'center' }}>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        const delay = i * 3;
        const x = interpolate(
          spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12 } }),
          [0, 1], [0, 800]
        );
        const scale = 1 - (i / TRAIL_LENGTH) * 0.6;
        const opacity = 1 - (i / TRAIL_LENGTH) * 0.8;

        return (
          <div key={i} style={{
            position: 'absolute',
            left: x, top: '50%',
            width: 60, height: 60,
            borderRadius: '50%',
            background: '#6366f1',
            transform: `translate(0, -50%) scale(${scale})`,
            opacity,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};
```
