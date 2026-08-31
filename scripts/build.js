import { execSync } from 'child_process';

console.log('🚀 [Build] Starting Vite production build...');
execSync('npx vite build', { stdio: 'inherit' });

console.log('🗺️ [Build] Generating dynamic sitemap.xml...');
await import('./generate-sitemap.js');

console.log('⚡ [Build] Generating SSG pre-rendered static HTML snapshots...');
await import('./generate-ssg.js');

console.log('✨ [Build] Complete production build finished successfully!');
