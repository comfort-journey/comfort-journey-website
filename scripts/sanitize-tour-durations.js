import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseTourDays } from '../src/utils/durationParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Sanitize public/live-content.json
const liveContentPath = path.resolve(__dirname, '../public/live-content.json');
if (fs.existsSync(liveContentPath)) {
  const liveData = JSON.parse(fs.readFileSync(liveContentPath, 'utf8'));
  if (Array.isArray(liveData.tours)) {
    let changed = 0;
    liveData.tours.forEach((t) => {
      const parsed = parseTourDays(t);
      if (t.durationDays !== parsed) {
        console.log(`[live-content.json] ${t.name}: durationDays ${t.durationDays} -> ${parsed}`);
        t.durationDays = parsed;
        changed++;
      }
    });
    liveData.lastUpdated = new Date().toISOString();
    fs.writeFileSync(liveContentPath, JSON.stringify(liveData, null, 2), 'utf8');
    console.log(`✅ [live-content.json] Successfully sanitized ${changed} tours.`);
  }
}

// 2. Sanitize src/data/toursData.js
const toursDataPath = path.resolve(__dirname, '../src/data/toursData.js');
if (fs.existsSync(toursDataPath)) {
  let content = fs.readFileSync(toursDataPath, 'utf8');
  
  // Find all occurrences of "duration": "...", \s* "durationDays": ...
  const regex = /("duration":\s*"([^"]+)",\s*"durationDays":\s*)(\d+)/g;
  let matches = 0;
  content = content.replace(regex, (full, prefix, durationStr, oldDays) => {
    const parsed = parseTourDays({ duration: durationStr, durationDays: Number(oldDays) });
    matches++;
    return `${prefix}${parsed}`;
  });

  fs.writeFileSync(toursDataPath, content, 'utf8');
  console.log(`✅ [toursData.js] Successfully sanitized ${matches} tour durationDays entries.`);
}

console.log('🎉 Tour durations successfully sanitized across all datasets!');
