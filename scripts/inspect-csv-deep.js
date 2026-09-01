import fs from 'fs';

function parseCsv(content) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField);
      if (currentRow.some(f => f.trim() !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(f => f.trim() !== '')) rows.push(currentRow);
  }
  return rows;
}

const natCsv = fs.readFileSync('WIX CMS Old Data/National+Tour+Packages.csv', 'utf8');
const natRows = parseCsv(natCsv);
const natHeaders = natRows[0].map(h => h.replace(/^\uFEFF/, '').trim());

console.log('Total National Rows parsed:', natRows.length - 1);
console.log('Headers:', natHeaders);

for (let r = 1; r <= 8; r++) {
  const row = natRows[r];
  if (!row) continue;
  const rowObj = {};
  natHeaders.forEach((h, idx) => {
    rowObj[h] = row[idx];
  });
  console.log(`\n================ ROW ${r} ================`);
  console.log('Title:', rowObj['Title']);
  console.log('Days:', rowObj['Days']);
  console.log('City:', rowObj['City']);
  console.log('State:', rowObj['State']);
  console.log('Pricing Per Person:', rowObj['Pricing Per Person']);
  console.log('Offer Price:', rowObj['Offer Price']);
  console.log('Total Price:', rowObj['Total Price']);
  console.log('Discounted Total Price:', rowObj['Discounted Total Price']);
  console.log('Inclusions:', rowObj['Inclusions'] ? rowObj['Inclusions'].slice(0, 150) : '(empty)');
  console.log('Exclusions:', rowObj['Exclusions'] ? rowObj['Exclusions'].slice(0, 150) : '(empty)');
  console.log('Description:', rowObj['Description'] ? rowObj['Description'].slice(0, 150) : '(empty)');
  console.log('Itinerary type:', typeof rowObj['Itinerary'], 'Length:', (rowObj['Itinerary'] || '').length);
  if (rowObj['Itinerary']) {
    console.log('Itinerary raw start:', rowObj['Itinerary'].slice(0, 200));
  }
}
