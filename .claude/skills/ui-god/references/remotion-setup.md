# Remotion Project Setup Guide

## QUICK START — New Project

```bash
# 1. Scaffold
npx create-video@latest
# Select: Hello World template
# Name your project

# 2. Enter directory & start preview
cd my-video
npm run dev
# Studio opens at http://localhost:3000
```

## FULL FILE STRUCTURE

```
my-video/
├── src/
│   ├── index.ts              ← Entry point (calls registerRoot)
│   ├── Root.tsx              ← Registers all Compositions
│   ├── Composition.tsx       ← Main video component
│   └── scenes/
│       ├── Intro.tsx
│       ├── Main.tsx
│       └── Outro.tsx
├── public/                   ← Static assets (images, audio, fonts)
│   ├── logo.png
│   └── background.mp3
├── remotion.config.ts        ← Optional config
└── package.json
```

## INDEX.TS (entry point)

```ts
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

## INSTALLING OPTIONAL PACKAGES

All @remotion/* packages MUST be exact same version. No ^ prefix.

```bash
# Get current version first
npm show remotion version

# Install matching packages (replace VERSION with actual version)
npm i --save-exact @remotion/player@VERSION
npm i --save-exact @remotion/renderer@VERSION
npm i --save-exact @remotion/motion-blur@VERSION
npm i --save-exact @remotion/noise@VERSION
npm i --save-exact @remotion/paths@VERSION
npm i --save-exact @remotion/shapes@VERSION
npm i --save-exact @remotion/google-fonts@VERSION
npm i --save-exact @remotion/media-utils@VERSION
npm i --save-exact @remotion/gif@VERSION
```

## REMOTION.CONFIG.TS (optional)

```ts
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);       // parallel render threads
Config.setPixelFormat('yuv420p'); // required for some players
```

## ADDING TO EXISTING NEXT.JS PROJECT

```bash
npm i --save-exact remotion @remotion/cli @remotion/player
```

```
project/
├── app/
│   └── page.tsx         ← Import <Player> from @remotion/player
├── remotion/
│   ├── index.ts         ← registerRoot() entry
│   ├── Root.tsx
│   └── MyAnimation.tsx
└── public/
```

```tsx
// app/page.tsx
'use client';
import { Player } from '@remotion/player';
import { MyAnimation } from '../remotion/MyAnimation';

export default function Page() {
  return (
    <Player
      component={MyAnimation}
      durationInFrames={120}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: '100%' }}
      autoPlay
      loop
    />
  );
}
```

## TYPESCRIPT CONFIG

Add to `tsconfig.json` if needed:
```json
{
  "compilerOptions": {
    "jsx": "react",
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

## COMMON TEMPLATES

| Template | Use case | Command |
|----------|---------|---------|
| Hello World | Learning, simple video | default |
| Blank | Custom from scratch | blank |
| React Three Fiber | 3D animations | `--template=@remotion/template-three` |
| TailwindCSS | Styled video | `--template=@remotion/template-tailwind` |

## ADDING TAILWIND TO REMOTION

```bash
npm i tailwindcss
```

```ts
// remotion.config.ts
import { Config } from '@remotion/cli/config';
Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...(config.module?.rules ?? []),
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
  };
});
```
