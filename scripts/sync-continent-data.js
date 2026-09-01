import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursDataPath = path.resolve(__dirname, '../src/data/toursData.js');
const { TOURS_DATA } = await import(`file://${toursDataPath}`);

const continentHierarchyPath = path.resolve(__dirname, '../src/data/continentHierarchyData.js');
let contContent = fs.readFileSync(continentHierarchyPath, 'utf8');

// Replace dummy tourIds with real ones
const replacementMap = {
  '"kashmir-paradise"': '"tour-wix-peace-in-the-pines"',
  '"char-dham-yatra"': '"tour-wix-ganga-to-the-hills"',
  '"rajasthan-royals"': '"tour-wix-rajasthan-royal-affair"',
  '"kerala-backwaters"': '"tour-wix-pachmarhi-madhai"',
  '"andaman-islands"': '"tour-wix-goa-weekend-vibe"',
  '"himachal-shimla-manali"': '"tour-wix-peace-in-the-pines"',
  '"ladakh-adventure"': '"tour-wix-uttarakhand-explorer"',
  '"goa-luxury-villas"': '"tour-wix-goa-weekend-vibe"',
  '"dubai-ultra-luxury"': '"tour-wix-dubai-city-sands"',
  '"bali-honeymoon-villas"': '"tour-wix-bali-tropical-escape"',
  '"phuket-krabi-escape"': '"tour-wix-phuket-paradise-getaway"',
  '"vietnam-halong-bay"': '"tour-wix-unbeatable-vietnam-premium"',
  '"japan-cherry-blossom"': '"tour-wix-sakura-moments-the-ultimate-cherry-blossom"',
  '"sri-lanka-scenic"': '"tour-wix-colombo-to-the-clouds"',
  '"singapore-futuristic"': '"tour-wix-singapore-city-gardens"',
  '"swiss-alps-glacier"': '"tour-wix-essence-of-europe"',
  '"amalfi-coast-romance"': '"tour-wix-essence-of-europe"',
  '"paris-french-riviera"': '"tour-wix-essence-of-europe"'
};

for (const [dummyId, realId] of Object.entries(replacementMap)) {
  contContent = contContent.replaceAll(dummyId, realId);
}

fs.writeFileSync(continentHierarchyPath, contContent, 'utf8');
console.log('✅ [Updated] Successfully updated continentHierarchyData.js with real tour IDs!');
