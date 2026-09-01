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

function extractTextListFromWixJson(rawStr) {
  if (!rawStr) return [];
  if (typeof rawStr !== 'string') return [];
  const trimmed = rawStr.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return trimmed.split(/\r?\n|;/).map(s => s.replace(/^[•\-\*\s]+/, '').trim()).filter(Boolean);
  }
  try {
    const json = JSON.parse(trimmed);
    const items = [];
    function walk(node) {
      if (!node) return;
      if (node.textData && node.textData.text) {
        const t = node.textData.text.replace(/^[•\-\*\s]+/, '').trim();
        if (t && t.length > 2 && !t.includes('font_8') && !t.startsWith('<') && !t.startsWith('{')) {
          items.push(t);
        }
      }
      if (Array.isArray(node.nodes)) {
        node.nodes.forEach(walk);
      }
    }
    walk(json);
    return items;
  } catch (e) {
    return [trimmed.replace(/^[•\-\*\s]+/, '').trim()];
  }
}

function extractItineraryFromWixJson(rawStr) {
  if (!rawStr) return [];
  const list = extractTextListFromWixJson(rawStr);
  if (list.length === 0) return [];

  // Group by Day markers
  const days = [];
  let currentDay = null;

  for (const text of list) {
    const dayMatch = text.match(/^(?:Day\s*(\d+)[:\s\-–—]*|(\d+)(?:st|nd|rd|th)\s*Day[:\s\-–—]*)(.*)/i);
    if (dayMatch) {
      const dayNum = parseInt(dayMatch[1] || dayMatch[2], 10);
      const dayTitle = (dayMatch[3] || '').trim();
      currentDay = {
        day: dayNum || (days.length + 1),
        title: dayTitle ? `Day ${dayNum || (days.length + 1)}: ${dayTitle}` : `Day ${dayNum || (days.length + 1)}: Exploration & Sightseeing`,
        desc: ''
      };
      days.push(currentDay);
    } else if (currentDay) {
      if (currentDay.desc) {
        currentDay.desc += ' ' + text;
      } else {
        currentDay.desc = text;
      }
    } else {
      // First item before explicit Day 1
      currentDay = {
        day: 1,
        title: `Day 1: ${text}`,
        desc: text
      };
      days.push(currentDay);
    }
  }

  return days;
}

const natCsv = fs.readFileSync('WIX CMS Old Data/National+Tour+Packages.csv', 'utf8');
const rows = parseCsv(natCsv);
const headers = rows[0].map(h => h.replace(/^\uFEFF/, '').trim());

console.log(`\nTesting Full Wix Row Extraction Quality for first 4 rows:`);

for (let r = 1; r <= 4; r++) {
  const row = rows[r];
  const obj = {};
  headers.forEach((h, idx) => { obj[h] = row[idx]; });

  console.log(`\n------------------ [ROW ${r}: ${obj.Title}] ------------------`);
  console.log('Title:', obj.Title);
  console.log('Days / Duration:', obj.Days);
  console.log('City:', obj.City);
  console.log('State:', obj.State);
  console.log('Total Price:', obj['Total Price']);
  console.log('Discounted Total Price:', obj['Discounted Total Price']);
  
  const inc = extractTextListFromWixJson(obj.Inclusions);
  console.log('Extracted Inclusions (' + inc.length + ' items):', inc);

  const exc = extractTextListFromWixJson(obj.Exclusions);
  console.log('Extracted Exclusions (' + exc.length + ' items):', exc);

  const itin = extractItineraryFromWixJson(obj.Itinerary);
  console.log('Extracted Itinerary (' + itin.length + ' days):');
  itin.forEach(d => {
    console.log(`   Day ${d.day}: ${d.title}`);
    console.log(`      Desc: ${d.desc.slice(0, 100)}...`);
  });
}
