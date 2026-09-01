import fs from 'fs';
import path from 'path';

function parseFullCsv(csvText) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n in CRLF
      }
      currentRow.push(currentVal);
      currentVal = '';
      if (currentRow.some(c => c.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal);
    if (currentRow.some(c => c.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];
  const headers = rows[0].map(h => h.trim());
  const parsedObjects = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] !== undefined ? row[idx] : '';
    });
    parsedObjects.push(obj);
  }

  return parsedObjects;
}

const natCsv = fs.readFileSync('WIX CMS Old Data/National+Tour+Packages.csv', 'utf8');
const intlCsv = fs.readFileSync('WIX CMS Old Data/International+Tour+Packages.csv', 'utf8');

const natObjs = parseFullCsv(natCsv);
const intlObjs = parseFullCsv(intlCsv);

console.log('✅ Real National Packages Count:', natObjs.length);
console.log('✅ Real International Packages Count:', intlObjs.length);
console.log('Total real packages:', natObjs.length + intlObjs.length);

console.log('\n--- National Sample (First 10) ---');
natObjs.slice(0, 10).forEach((o, i) => console.log(`${i+1}. [${o.Title || o.Name}] - Location: ${o.City || o.State || o.Destination} - Price: ${o['Discounted Total Price'] || o.Price}`));

console.log('\n--- International Sample (First 10) ---');
intlObjs.slice(0, 10).forEach((o, i) => console.log(`${i+1}. [${o.Title || o.Name}] - Location: ${o.City || o.State || o.Destination} - Price: ${o['Discounted Total Price'] || o['Offer Price'] || o.Price}`));
