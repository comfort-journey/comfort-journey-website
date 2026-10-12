// =========================================================================
// COMFORT JOURNEY — INLINE MEDIA EXTRACTOR (build step)
// CMS image uploads are stored as base64 data URIs inside live-content.json.
// A single blog cover was 2.4 MB of base64 text inside the JS bundle, which
// slowed down every page. This step writes each data URI to a real file in
// public/cms-media/ and swaps the data URI for a relative URL, so images are
// cached, lazy-loaded and kept out of the JavaScript bundle.
// =========================================================================
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MEDIA_DIR = path.join(ROOT, 'public', 'cms-media');
const DATA_URI_RE = /data:image\/(png|jpe?g|webp|gif|avif|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;

const EXT = { png: 'png', jpg: 'jpg', jpeg: 'jpg', webp: 'webp', gif: 'gif', avif: 'avif', 'svg+xml': 'svg' };

async function toOptimisedFile(type, b64) {
  const buf = Buffer.from(b64, 'base64');
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 12);
  let ext = EXT[type] || 'bin';
  let out = buf;
  // Re-encode large raster images as WebP (max 1800px wide) to cut weight.
  if (['png', 'jpg', 'jpeg'].includes(type) && buf.length > 150 * 1024) {
    try {
      const sharp = (await import('sharp')).default;
      out = await sharp(buf).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
      ext = 'webp';
    } catch (e) {
      console.warn('   [media] sharp unavailable, keeping original', e.message);
    }
  }
  const name = `${hash}.${ext}`;
  const file = path.join(MEDIA_DIR, name);
  if (!fs.existsSync(file)) fs.writeFileSync(file, out);
  return { rel: `cms-media/${name}`, before: buf.length, after: out.length };
}

async function processFile(filePath, prefix) {
  if (!fs.existsSync(filePath)) return 0;
  const src = fs.readFileSync(filePath, 'utf8');
  const matches = [...src.matchAll(DATA_URI_RE)];
  if (!matches.length) return 0;
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
  let result = src;
  let saved = 0;
  for (const m of matches) {
    const { rel, before, after } = await toOptimisedFile(m[1], m[2]);
    result = result.split(m[0]).join(prefix + rel);
    saved += m[0].length - (prefix + rel).length;
    console.log(`   [media] ${path.basename(filePath)} → ${rel} (${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB)`);
  }
  fs.writeFileSync(filePath, result);
  return saved;
}

export async function extractInlineMedia() {
  // Paths are written relative to the site root ("./" base), which works on
  // GitHub Pages sub-paths and on a custom domain.
  const targets = [
    path.join(ROOT, 'public', 'live-content.json'),
    path.join(ROOT, 'src', 'data', 'blogsData.js'),
    path.join(ROOT, 'src', 'data', 'toursData.js')
  ];
  let total = 0;
  for (const t of targets) total += await processFile(t, './');
  console.log(`🖼️  [Build] Inline media extracted, ${Math.round(total / 1024)} KB removed from data payloads.`);
}

if (process.argv[1] && process.argv[1].endsWith('extract-inline-media.js')) {
  extractInlineMedia();
}
