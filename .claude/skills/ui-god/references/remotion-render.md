# Remotion Render Guide

## CLI RENDERING

### Basic render
```bash
npx remotion render src/index.ts MyVideo out/video.mp4
```

### Portrait (TikTok/Reels/Shorts)
```bash
npx remotion render src/index.ts MyVideo out/portrait.mp4 --width=1080 --height=1920
```

### With dynamic props (data-driven video)
```bash
npx remotion render src/index.ts MyVideo out/video.mp4 \
  --props='{"title":"Hello World","accent":"#6366f1","userName":"Tanush"}'
```

### Frame range (partial render for testing)
```bash
npx remotion render src/index.ts MyVideo out/video.mp4 --frames=0-90
```

### Still / thumbnail
```bash
npx remotion still src/index.ts MyVideo out/thumb.png --frame=30
npx remotion still src/index.ts MyVideo out/thumb.jpg --frame=0  # JPEG
```

### GIF
```bash
npx remotion render src/index.ts MyVideo out/animation.gif --codec=gif
```

### Transparent WebM (for web overlay)
```bash
npx remotion render src/index.ts MyVideo out/transparent.webm --codec=vp8
# OR vp9 for smaller file size
npx remotion render src/index.ts MyVideo out/transparent.webm --codec=vp9
```

### High quality 4K
```bash
npx remotion render src/index.ts MyVideo out/video-4k.mp4 \
  --width=3840 --height=2160 --crf=16
```

### CRF quality control
- `--crf=0` = lossless (huge file)
- `--crf=18` = visually lossless
- `--crf=23` = default, good quality
- `--crf=28` = smaller file, some quality loss

### Concurrency (speed up render)
```bash
npx remotion render src/index.ts MyVideo out/video.mp4 --concurrency=8
```

---

## PROGRAMMATIC RENDER (Node.js)

```ts
import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import path from 'path';

async function render() {
  // Step 1: Bundle the project
  const bundleLocation = await bundle({
    entryPoint: path.resolve('./src/index.ts'),
    // Pass webpack override from remotion.config.ts if needed
  });

  // Step 2: Select composition (validates props + gets metadata)
  const inputProps = {
    title: 'Hello',
    accentColor: '#6366f1',
  };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'MyVideo',
    inputProps,
  });

  // Step 3: Render
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: 'out/video.mp4',
    inputProps,
    onProgress: ({ progress }) => {
      console.log(`Rendering: ${Math.round(progress * 100)}%`);
    },
  });

  console.log('Render complete!');
}

render();
```

## BATCH RENDER (1000 personalized videos)

```ts
import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';

const users = [
  { name: 'Alice', accentColor: '#6366f1' },
  { name: 'Bob', accentColor: '#ec4899' },
  // ... thousands more
];

async function batchRender() {
  const bundleLocation = await bundle({ entryPoint: './src/index.ts' });

  // Render in parallel batches of 4
  const batchSize = 4;
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    await Promise.all(batch.map(async (user) => {
      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: 'PersonalizedVideo',
        inputProps: user,
      });
      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation: `out/${user.name}.mp4`,
        inputProps: user,
      });
      console.log(`✓ Rendered ${user.name}`);
    }));
  }
}
```

## CODEC REFERENCE

| Codec | Extension | Use case |
|-------|-----------|---------|
| `h264` | `.mp4` | Universal — YouTube, social media, email |
| `h265` | `.mp4` | Better compression, not all browsers |
| `vp8` | `.webm` | Web with alpha/transparency |
| `vp9` | `.webm` | Better compression + transparency |
| `gif` | `.gif` | Loops, social media, small |
| `prores` | `.mov` | Professional editing, large file |
| `mp3` | `.mp3` | Audio only |
| `pcm-16` | `.wav` | Uncompressed audio |

## RENDER ON GITHUB ACTIONS

```yaml
name: Render video
on:
  workflow_dispatch:
    inputs:
      title:
        description: 'Video title'
        required: true

jobs:
  render:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: actions/setup-node@main
        with:
          node-version: 20
      - run: npm install
      - run: |
          npx remotion render src/index.ts MyVideo out/video.mp4 \
            --props='{"title":"${{ inputs.title }}"}'
      - uses: actions/upload-artifact@v4
        with:
          name: video
          path: out/video.mp4
```

## LAMBDA RENDER (Fastest — Cloud)

```bash
# Setup
npm i --save-exact @remotion/lambda@VERSION

# Deploy function (one-time)
npx remotion lambda functions deploy --memory=2048 --disk=10240 --timeout=240

# Render
npx remotion lambda render \
  --function-name=remotion-render-4-0-200-mem2048mb-disk10240mb-240sec \
  --region=us-east-1 \
  src/index.ts MyVideo s3://your-bucket/output/video.mp4
```

## RENDER API (Express.js endpoint)

```ts
import express from 'express';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';

const app = express();
app.use(express.json());

let bundleCache: string | null = null;

app.post('/render', async (req, res) => {
  try {
    // Cache bundle across requests
    if (!bundleCache) {
      bundleCache = await bundle({ entryPoint: './src/index.ts' });
    }

    const { compositionId = 'MyVideo', props = {}, outputPath = 'out/video.mp4' } = req.body;

    const composition = await selectComposition({
      serveUrl: bundleCache,
      id: compositionId,
      inputProps: props,
    });

    await renderMedia({
      composition,
      serveUrl: bundleCache,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: props,
    });

    res.json({ success: true, outputPath });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.listen(4000, () => console.log('Render server on :4000'));
```
