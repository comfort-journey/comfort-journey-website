import { execSync } from 'child_process';
import { syncLiveContentToDataFiles } from './sync-live-to-data.js';
import { extractInlineMedia } from './extract-inline-media.js';

console.log('🖼️  [Build] Moving inline CMS images out of the published content snapshot...');
await extractInlineMedia();

console.log('🔄 [Build] Syncing public/live-content.json into src/data/...');
syncLiveContentToDataFiles();

// Run again so data files written by the sync step never carry base64 images.
await extractInlineMedia();

console.log('🚀 [Build] Starting Vite production build...');
execSync('npx vite build', { stdio: 'inherit' });

console.log('🗺️ [Build] Generating dynamic sitemap.xml...');
await import('./generate-sitemap.js');
// The sitemap is written to public/ after Vite copied public/ into dist/, so copy it again.
const fs = await import('fs');
fs.copyFileSync('public/sitemap.xml', 'dist/sitemap.xml');

console.log('⚡ [Build] Generating SSG pre-rendered static HTML snapshots...');
await import('./generate-ssg.js');

console.log('✨ [Build] Complete production build finished successfully!');
