// Assemble the browser app into public/ so Vercel serves index.html and the
// MediaPipe files the page loads from /node_modules (that folder is not deployed as-is).
import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const vision = join(root, 'node_modules', '@mediapipe', 'tasks-vision');
const visionOut = join(out, 'node_modules', '@mediapipe', 'tasks-vision');

await rm(out, { recursive: true, force: true });
await mkdir(join(visionOut, 'wasm'), { recursive: true });

await cp(join(root, 'index.html'), join(out, 'index.html'));
await cp(join(root, 'styles.css'), join(out, 'styles.css'));
await cp(join(root, 'src'), join(out, 'src'), { recursive: true });
await cp(join(root, 'models'), join(out, 'models'), { recursive: true });
await cp(join(vision, 'vision_bundle.mjs'), join(visionOut, 'vision_bundle.mjs'));
await cp(join(vision, 'wasm'), join(visionOut, 'wasm'), { recursive: true });

console.log('Static site written to public/');
