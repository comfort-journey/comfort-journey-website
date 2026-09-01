import React, { useState, useRef } from 'react';
import {
  UploadCloud, Download, FileSpreadsheet, FileText, CheckCircle2,
  AlertCircle, RefreshCw, Sparkles, HelpCircle, Eye, Trash2, ArrowRight,
  Database, Table, FileCheck, Info
} from 'lucide-react';
import { TOURS_DATA } from '../../data/toursData';
import { slugify } from '../../services/directusClient';
import { resolveDestinationImage } from '../../utils/destinationImageResolver';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — DATA HUB (BULK IMPORT & EXPORT STUDIO)
// 1. Downloadable Clean CSV/Excel Template
// 2. Export Live Packages as CSV & JSON
// 3. Smart CSV/JSON Importer with Auto-Sanitization & Validation
// 4. Detailed Field Mapping & Cleanup Guide
// ═══════════════════════════════════════════════════════════════════

// Standard CSV Sample Data Template
const SAMPLE_CSV_CONTENT = `Title,Location,State,Country,Continent,Category,Duration,Offer_Price_INR,Original_Price_INR,Tagline,Inclusions,Exclusions,Day1_Title,Day1_Desc,Day2_Title,Day2_Desc,Day3_Title,Day3_Desc,Hero_Image_URL
"Kashmir Valley Royalty & Houseboat Stay","Srinagar & Gulmarg","Jammu and Kashmir","India","Asia","National Tours","4 Nights & 5 Days",42999,54999,"Experience 5-star carved cedarwood houseboats on Dal Lake and pine-scented heated chalets in Gulmarg.","5-Star Houseboat Stay; Private AC Transfers; Daily Breakfast & Dinner; Gondola Phase 1 Ticket; 24/7 VIP Concierge","Airfare; Personal expenses; Monument entry tickets","Day 1: Arrival in Srinagar & Dal Lake Shikara Cruise","VIP airport greeting and transfer to royal houseboat. Evening private sunset Shikara ride with hot Kahwa.","Day 2: Gulmarg Alpine Ski Resort & Gondola Ride","Drive through Tangmarg pine forests to Gulmarg. VIP gondola ride to Phase 1 with snow activities.","Day 3: Pahalgam Valley of Shepherds & Lidder Riverbank","Full day excursion to Pahalgam, visit Betaab Valley and Aru Valley with private chauffeur.","https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85"
"Bali Tropical Pool Villa Escape","Ubud & Seminyak","Bali","Indonesia","Asia","International Tours","5 Nights & 6 Days",64999,82000,"Private jungle pool villas in Ubud, clifftop sunset seafood dinners, and sacred water temple blessing.","Private Jungle Pool Villa; Private Chauffeur; Daily Breakfast; Nusa Penida Speedboat; Clifftop Dinner","Visa fees; Personal shopping; Travel insurance","Day 1: Arrival in Denpasar & Ubud Jungle Check-In","VIP airport pickup with flower garland and transfer to private pool villa in Ubud.","Day 2: Ubud Art Villages, Rice Terraces & Jungle Swing","Visit Tegallalang rice terraces, Sacred Monkey Forest, and experience the iconic giant jungle swing.","Day 3: Nusa Penida Island Speedboat Day Tour","Fast boat to Nusa Penida. Visit Kelingking T-Rex cliff, Broken Beach, and Angel's Billabong.","https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"`;

// Robust CSV Parser handling multi-line quotes
function parseCsvToRows(csvText) {
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
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentVal.trim());
      if (currentRow.some(f => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some(f => f.length > 0)) rows.push(currentRow);
  }
  return rows;
}

// Clean text and truncate for tagline / cards
function cleanShortText(str, maxLen = 160) {
  if (!str) return '';
  let clean = String(str)
    .replace(/<[^>]*>?/gm, '')
    .replace(/[\[\]"'{}]/g, '')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length > maxLen) {
    clean = clean.slice(0, maxLen).replace(/[,.;\s]+$/, '') + '...';
  }
  return clean;
}

// Deep node text extractor from Wix AST
function extractTextFromWixNode(node) {
  let texts = [];
  if (!node) return texts;
  if (node.textData?.text) {
    texts.push(node.textData.text);
  }
  if (Array.isArray(node.nodes)) {
    for (const child of node.nodes) {
      texts.push(...extractTextFromWixNode(child));
    }
  }
  return texts;
}

// Parse Itinerary field (supports Wix JSON AST, multiline text, and individual Day columns)
function extractItineraryDays(rowObj, location) {
  const days = [];
  const rawItinerary = rowObj.Itinerary || rowObj.itinerary || '';

  // 1. Wix JSON AST
  if (typeof rawItinerary === 'string' && rawItinerary.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(rawItinerary);
      const topNodes = parsed.nodes || [];
      let currentDay = null;

      for (const node of topNodes) {
        const text = extractTextFromWixNode(node).join(' ').trim();
        if (!text) continue;

        const dayMatch = text.match(/^(?:DAY|Day)\s*(\d+)[\s:–-]*(.*)$/i);
        if (dayMatch) {
          if (currentDay) days.push(currentDay);
          const dayNum = parseInt(dayMatch[1], 10) || (days.length + 1);
          const dayTitle = cleanShortText(dayMatch[2]?.trim() || `Sightseeing & Highlights`, 100);
          currentDay = {
            day: dayNum,
            title: `Day ${dayNum}: ${dayTitle}`.replace(/^Day \d+:\s*Day \d+[:\s]*/i, `Day ${dayNum}: `),
            desc: '',
            stayTier: '4-Star / 5-Star Luxury Stay',
            transport: 'Dedicated Private AC Cab & Chauffeur',
            meals: 'Daily Breakfast & Dinner'
          };
        } else if (currentDay) {
          if (!currentDay.desc) {
            currentDay.desc = cleanShortText(text, 350);
          } else if (currentDay.desc.length < 350) {
            currentDay.desc = cleanShortText(currentDay.desc + ' ' + text, 350);
          }
        }
      }

      if (currentDay) days.push(currentDay);
      if (days.length > 0) return days;
    } catch {}
  }

  // 2. Multiline text with "Day 1:", "Day 2:"
  if (typeof rawItinerary === 'string' && rawItinerary.trim()) {
    const lines = rawItinerary.split('\n').map(l => l.trim()).filter(Boolean);
    let currentDay = null;
    for (const line of lines) {
      const dayMatch = line.match(/^(?:DAY|Day)\s*(\d+)[\s:–-]*(.*)$/i);
      if (dayMatch) {
        if (currentDay) days.push(currentDay);
        const dayNum = parseInt(dayMatch[1], 10) || (days.length + 1);
        currentDay = {
          day: dayNum,
          title: `Day ${dayNum}: ${cleanShortText(dayMatch[2]?.trim() || 'Sightseeing & Excursions', 100)}`,
          desc: '',
          stayTier: '4-Star / 5-Star Luxury Stay',
          transport: 'Dedicated Private AC Cab & Chauffeur',
          meals: 'Daily Breakfast & Dinner'
        };
      } else if (currentDay) {
        currentDay.desc = cleanShortText(currentDay.desc ? currentDay.desc + ' ' + line : line, 350);
      }
    }
    if (currentDay) days.push(currentDay);
    if (days.length > 0) return days;
  }

  // 3. Individual Day1_Title, Day2_Title columns
  for (let d = 1; d <= 12; d++) {
    const dayTitle = rowObj[`Day${d}_Title`] || rowObj[`Day_${d}_Title`] || rowObj[`Day${d}`];
    const dayDesc = rowObj[`Day${d}_Desc`] || rowObj[`Day_${d}_Desc`] || rowObj[`Day${d}_Description`];
    if (dayTitle || dayDesc) {
      days.push({
        day: d,
        title: cleanShortText(dayTitle || `Day ${d}: Sightseeing & Exploration`, 100),
        desc: cleanShortText(dayDesc || 'Curated sightseeing with personal chauffeur assistance.', 300),
        stayTier: '4-Star / 5-Star Luxury Stay',
        transport: 'Private Dedicated AC Cab',
        meals: 'Daily Breakfast & Dinner'
      });
    }
  }

  // 4. Fallback if empty
  if (days.length === 0) {
    days.push(
      { day: 1, title: 'Day 1: Arrival & VIP Welcome', desc: `VIP airport greeting and chauffeur transfer to luxury hotel in ${location}.`, stayTier: '4-Star / 5-Star Stay', transport: 'Private Cab', meals: 'Dinner' },
      { day: 2, title: 'Day 2: Signature Sightseeing & Highlights', desc: `Guided full-day excursion covering major viewpoints and attractions.`, stayTier: '4-Star / 5-Star Stay', transport: 'Private Cab', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Day 3: Leisure & Departure', desc: `Morning breakfast, souvenir shopping, and chauffeur transfer to airport.`, stayTier: '4-Star / 5-Star Stay', transport: 'Private Cab', meals: 'Breakfast' }
    );
  }

  return days;
}

// Parse Inclusions or Exclusions list (supports Wix AST and separated strings)
function extractCleanList(rawField, defaultList = []) {
  if (!rawField) return defaultList;
  if (Array.isArray(rawField)) return rawField.map(s => cleanShortText(s, 60)).filter(Boolean);

  if (typeof rawField === 'string' && rawField.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(rawField);
      const items = [];
      const walk = (node) => {
        if (!node) return;
        const text = extractTextFromWixNode(node).join(' ').trim();
        if (text && !text.toLowerCase().startsWith('day ') && !text.toLowerCase().startsWith('note:') && text.length < 80) {
          items.push(text);
        }
        if (Array.isArray(node.nodes)) {
          for (const child of node.nodes) walk(child);
        }
      };
      walk(parsed);

      // Filter out concatenated long strings if smaller items exist
      const deduped = [...new Set(items.map(s => s.replace(/^[•\-\*\s]+/, '').trim()))].filter(Boolean);
      if (deduped.length > 0) return deduped.slice(0, 10);
    } catch {}
  }

  if (typeof rawField === 'string') {
    const list = rawField.split(/[;\n|]/).map(s => cleanShortText(s.replace(/^[•\-\*\s]+/, ''), 60)).filter(Boolean);
    if (list.length > 0) return list.slice(0, 10);
  }

  return defaultList;
}

// Clean and sanitize an imported tour row
function sanitizeImportedTour(rowObj, idx) {
  const title = cleanShortText(rowObj.Title || rowObj.Name || rowObj.PackageTitle || rowObj.title || `Tour Package #${idx + 1}`, 100);
  const slug = slugify(title);
  const location = cleanShortText(rowObj.Location || rowObj.Destination || rowObj.City || rowObj.location || 'India', 80);
  const state = cleanShortText(rowObj.State || rowObj.state || '', 60);
  const country = cleanShortText(rowObj.Country || rowObj.country || (location.toLowerCase().includes('bali') ? 'Indonesia' : 'India'), 60);
  const continent = cleanShortText(rowObj.Continent || rowObj.continent || (location.toLowerCase().includes('switz') || location.toLowerCase().includes('europe') ? 'Europe' : 'Asia'), 40);
  const category = cleanShortText(rowObj.Category || rowObj['Package Category'] || rowObj.category || (country === 'India' ? 'National Tours' : 'International Tours'), 50);
  const duration = cleanShortText(rowObj.Duration || rowObj.Days || rowObj.duration || '4 Nights & 5 Days', 50);

  // Price parsing
  const rawOffer = String(rowObj.Offer_Price_INR || rowObj.Price || rowObj.DiscountedPrice || rowObj['Discounted Total Price'] || rowObj['Offer Price'] || rowObj.price || '24999');
  const price = parseInt(rawOffer.replace(/[^0-9]/g, ''), 10) || 24999;

  const rawOrig = String(rowObj.Original_Price_INR || rowObj.ComparePrice || rowObj.OriginalPrice || rowObj['Total Price'] || rowObj.origPrice || '');
  const origPrice = rawOrig ? (parseInt(rawOrig.replace(/[^0-9]/g, ''), 10) || Math.round(price * 1.25)) : Math.round(price * 1.25);

  // Tagline: strictly concise (max 160 chars) so cards don't have massive text blocks
  const rawTagline = rowObj.Tagline || rowObj.Description || rowObj.Overview || rowObj.tagline || `Curated ${duration} tour to ${location} by Comfort Journey.`;
  const tagline = cleanShortText(rawTagline, 160);

  // Inclusions & Exclusions
  const inclusions = extractCleanList(rowObj.Inclusions || rowObj.inclusions, [
    'Verified 4-Star/5-Star Stay', 'Private AC Vehicle & Chauffeur', 'Daily Breakfast & Dinner', 'Curated Sightseeing Tours'
  ]);

  const exclusions = extractCleanList(rowObj.Exclusions || rowObj.exclusions, [
    'Personal Expenses', 'Monument Entry Tickets', 'Anything not mentioned in Inclusions'
  ]);

  // Itinerary
  const itinerary = extractItineraryDays(rowObj, location);

  // Image resolution
  const rawImg = rowObj.Hero_Image_URL || rowObj.Image || rowObj.CoverImage || rowObj.image || '';
  const image = resolveDestinationImage(location, title, category, rawImg);

  return {
    id: `tour-custom-${slug}`,
    name: title,
    slug,
    location,
    city: location,
    state,
    country,
    continent,
    category,
    categories: [category, country, 'Luxury Signature'],
    duration,
    price,
    origPrice,
    originalPrice: origPrice,
    tagline,
    description: tagline,
    image,
    badge: 'Curated Signature',
    rating: 4.95,
    reviews: 88,
    reviewsCount: 88,
    inclusions,
    exclusions,
    itinerary,
    status: 'published',
    isVisible: true
  };
}

export default function DataHubManager() {
  const [inputText, setInputText] = useState('');
  const [parsedTours, setParsedTours] = useState([]);
  const [parseError, setParseError] = useState('');
  const [importMode, setImportMode] = useState('merge'); // 'merge' | 'replace'
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // ─── 1. Download Sample CSV Template ───
  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'comfort_journey_tour_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Downloaded sample CSV template.');
  };

  // ─── 2. Export Live Catalog to CSV ───
  const handleExportLiveCatalogCsv = () => {
    const currentList = (() => {
      try {
        const saved = localStorage.getItem('cj_custom_tours_dataset');
        if (saved) return JSON.parse(saved);
      } catch {}
      return TOURS_DATA;
    })();

    const headers = [
      'Title', 'Location', 'State', 'Country', 'Continent', 'Category',
      'Duration', 'Offer_Price_INR', 'Original_Price_INR', 'Tagline',
      'Inclusions', 'Exclusions',
      'Day1_Title', 'Day1_Desc', 'Day2_Title', 'Day2_Desc', 'Day3_Title', 'Day3_Desc',
      'Hero_Image_URL'
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvRows = [headers.join(',')];

    currentList.forEach(t => {
      const incStr = (t.inclusions || []).join('; ');
      const excStr = (t.exclusions || []).join('; ');
      const d1 = t.itinerary?.[0] || {};
      const d2 = t.itinerary?.[1] || {};
      const d3 = t.itinerary?.[2] || {};

      const row = [
        escapeCsv(t.name),
        escapeCsv(t.location || t.city),
        escapeCsv(t.state || ''),
        escapeCsv(t.country || 'India'),
        escapeCsv(t.continent || 'Asia'),
        escapeCsv(t.category || 'National Tours'),
        escapeCsv(t.duration || '4 Nights & 5 Days'),
        t.price || 24999,
        t.origPrice || t.originalPrice || 32999,
        escapeCsv(t.tagline || t.description),
        escapeCsv(incStr),
        escapeCsv(excStr),
        escapeCsv(d1.title || ''),
        escapeCsv(d1.desc || ''),
        escapeCsv(d2.title || ''),
        escapeCsv(d2.desc || ''),
        escapeCsv(d3.title || ''),
        escapeCsv(d3.desc || ''),
        escapeCsv(t.image || '')
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `comfort_journey_catalog_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`📤 Exported ${currentList.length} packages to CSV.`);
  };

  // ─── 3. Parse File / Text ───
  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setInputText(content);
      parseContent(content);
    };
    reader.readAsText(file);
  };

  const parseContent = (content) => {
    setParseError('');
    setParsedTours([]);
    if (!content.trim()) return;

    try {
      // 1. Try JSON Parse first
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const json = JSON.parse(content);
        const arr = Array.isArray(json) ? json : (json.data || json.packages || [json]);
        const cleaned = arr.map((item, idx) => sanitizeImportedTour(item, idx));
        setParsedTours(cleaned);
        showToast(`✅ Successfully parsed ${cleaned.length} packages from JSON!`);
        return;
      }

      // 2. Parse CSV
      const rows = parseCsvToRows(content);
      if (rows.length < 2) {
        setParseError('CSV must have a header row and at least 1 data row.');
        return;
      }

      const headers = rows[0].map(h => h.replace(/^\uFEFF/, '').trim());
      const dataRows = rows.slice(1);

      const parsedList = [];
      dataRows.forEach((row, idx) => {
        if (row.length === 0 || (row.length === 1 && !row[0])) return;
        const rowObj = {};
        headers.forEach((h, hIdx) => {
          rowObj[h] = row[hIdx] || '';
        });
        parsedList.push(sanitizeImportedTour(rowObj, idx));
      });

      if (parsedList.length === 0) {
        setParseError('No valid tour packages found in CSV.');
        return;
      }

      setParsedTours(parsedList);
      showToast(`✅ Successfully parsed ${parsedList.length} packages from CSV!`);
    } catch (err) {
      setParseError(`Parse error: ${err.message}`);
    }
  };

  // ─── 4. Commit to Live Catalog ───
  const handleCommitImport = () => {
    if (parsedTours.length === 0) return;
    setIsProcessing(true);

    try {
      let finalDataset = [];

      if (importMode === 'replace') {
        finalDataset = parsedTours;
      } else {
        // Merge mode: deduplicate by slug / ID
        const existing = (() => {
          try {
            const saved = localStorage.getItem('cj_custom_tours_dataset');
            if (saved) return JSON.parse(saved);
          } catch {}
          return TOURS_DATA;
        })();

        const existingSlugs = new Set(existing.map(t => t.slug || slugify(t.name)));
        const newUnique = parsedTours.filter(p => !existingSlugs.has(p.slug));
        finalDataset = [...newUnique, ...existing];
      }

      // Persist
      localStorage.setItem('cj_custom_tours_dataset', JSON.stringify(finalDataset));
      TOURS_DATA.length = 0;
      TOURS_DATA.push(...finalDataset);

      showToast(`🎉 Successfully saved ${finalDataset.length} tour packages to the live catalog!`);
      setParsedTours([]);
      setInputText('');
    } catch (err) {
      showToast(`❌ Error saving catalog: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="data-hub-container">
      {/* Toast */}
      {toastMessage && (
        <div className="admin-toast-banner animate-fade-in"><span>{toastMessage}</span></div>
      )}

      {/* Header Banner */}
      <div className="data-hub-header">
        <div className="hub-title-box">
          <div className="hub-icon-circle">
            <FileSpreadsheet size={24} className="text-amber" />
          </div>
          <div>
            <h3 className="hub-heading">Data Hub — Bulk Import & Export</h3>
            <p className="hub-subheading">
              Import tour packages in bulk from Excel/CSV sheets with automatic data cleaning, or export your live catalog.
            </p>
          </div>
        </div>

        <div className="hub-quick-actions">
          <button type="button" className="btn-secondary" onClick={handleDownloadSampleCsv}>
            <Download size={14} /> Download Sample CSV Template
          </button>
          <button type="button" className="btn-secondary" onClick={handleExportLiveCatalogCsv}>
            <Download size={14} /> Export Live Catalog ({TOURS_DATA.length} Tours)
          </button>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="hub-guide-card">
        <div className="guide-header">
          <Info size={16} className="text-sky" />
          <strong>How Clean Bulk Import Works:</strong>
        </div>
        <ul className="guide-points">
          <li>
            <strong>No Long Plastered Text:</strong> Taglines and overviews are automatically formatted into clean 1–2 sentences for card displays.
          </li>
          <li>
            <strong>Organized Inclusions & Itineraries:</strong> Inclusions are cleanly separated (e.g. <code>Stay; Transfers; Meals</code>) and day-by-day itineraries are structured into Days 1 to 10 without clutter.
          </li>
          <li>
            <strong>Automatic Image Fixing:</strong> If image links are broken or missing, high-resolution destination photography is automatically linked.
          </li>
        </ul>
      </div>

      {/* Import Workspace */}
      <div className="hub-workspace-grid">
        {/* Upload & Paste Card */}
        <div className="hub-card">
          <h4 className="card-title">📥 Step 1: Upload or Paste Your CSV / Excel Data</h4>

          <div
            className="hub-dropzone"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv, .tsv, .json, .txt"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
            />
            <UploadCloud size={32} className="text-amber" style={{ margin: '0 auto 0.5rem auto' }} />
            <p className="drop-title">Click to upload .CSV or .JSON spreadsheet</p>
            <span className="drop-hint">UTF-8 CSV from Excel, Google Sheets, or CRM export</span>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label className="input-label">Or Paste CSV / JSON Text Directly</label>
            <textarea
              rows={6}
              className="cms-textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Title,Location,Duration,Offer_Price_INR,Tagline,Inclusions..."
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => parseContent(inputText)}
                disabled={!inputText.trim()}
              >
                <Sparkles size={14} /> Parse & Validate Data
              </button>
              {inputText && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setInputText('');
                    setParsedTours([]);
                    setParseError('');
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {parseError && (
            <div className="parse-error-box">
              <AlertCircle size={16} />
              <span>{parseError}</span>
            </div>
          )}
        </div>

        {/* Clean Sample Preview Card */}
        <div className="hub-card">
          <h4 className="card-title">📋 Standard CSV Column Structure</h4>
          <p className="card-desc">
            Your Excel / CSV file should contain the following column headers for flawless auto-import:
          </p>

          <div className="columns-reference-list">
            <div className="column-ref-item">
              <code>Title</code> <span>Package headline name</span>
            </div>
            <div className="column-ref-item">
              <code>Location</code> <span>City, Destination, or State</span>
            </div>
            <div className="column-ref-item">
              <code>Duration</code> <span>e.g. 5 Nights & 6 Days</span>
            </div>
            <div className="column-ref-item">
              <code>Offer_Price_INR</code> <span>Discounted booking price (numbers only)</span>
            </div>
            <div className="column-ref-item">
              <code>Tagline</code> <span>Concise summary shown on cards</span>
            </div>
            <div className="column-ref-item">
              <code>Inclusions</code> <span>Semicolon-separated list of features</span>
            </div>
            <div className="column-ref-item">
              <code>Day1_Title, Day1_Desc</code> <span>Itinerary day 1 highlights</span>
            </div>
            <div className="column-ref-item">
              <code>Hero_Image_URL</code> <span>High-res photo link</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={handleDownloadSampleCsv}
            style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
          >
            <Download size={14} /> Download Ready-to-Use Template (.CSV)
          </button>
        </div>
      </div>

      {/* Parsed Results Preview */}
      {parsedTours.length > 0 && (
        <div className="hub-preview-card">
          <div className="preview-header-bar">
            <div>
              <h4 className="preview-title">
                ✅ Step 2: Review {parsedTours.length} Cleaned Packages
              </h4>
              <p className="preview-subtitle">
                Data has been validated, tags organized, and descriptions polished for live website display.
              </p>
            </div>

            <div className="import-controls-row">
              <div className="mode-selector">
                <label className={`mode-pill ${importMode === 'merge' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="importMode"
                    value="merge"
                    checked={importMode === 'merge'}
                    onChange={() => setImportMode('merge')}
                  />
                  <span>Merge with Existing</span>
                </label>
                <label className={`mode-pill ${importMode === 'replace' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                  />
                  <span>Replace Catalog</span>
                </label>
              </div>

              <button
                type="button"
                className="btn-primary btn-commit-import"
                onClick={handleCommitImport}
                disabled={isProcessing}
              >
                <CheckCircle2 size={16} />
                {isProcessing ? 'Saving Catalog...' : `Import ${parsedTours.length} Packages to Website`}
              </button>
            </div>
          </div>

          <div className="parsed-table-scroll">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title & Location</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Inclusions</th>
                  <th>Itinerary</th>
                </tr>
              </thead>
              <tbody>
                {parsedTours.map((pkg, i) => (
                  <tr key={i}>
                    <td style={{ width: '60px' }}>
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        style={{ width: '50px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <strong style={{ color: '#E2E8F0', display: 'block' }}>{pkg.name}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#FF892F' }}>📍 {pkg.location}</span>
                    </td>
                    <td><span className="category-badge">{pkg.category}</span></td>
                    <td><span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{pkg.duration}</span></td>
                    <td>
                      <strong style={{ color: '#10B981' }}>₹{Number(pkg.price).toLocaleString('en-IN')}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                        ✓ {pkg.inclusions.length} items
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#6FE6FC' }}>
                        📅 {pkg.itinerary.length} Days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style>{`
        .data-hub-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .data-hub-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          flex-wrap: wrap;
        }

        .hub-title-box {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .hub-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(255, 137, 47, 0.15);
          border: 1px solid rgba(255, 137, 47, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hub-heading {
          font-family: var(--font-ui);
          font-size: 1.25rem;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
        }

        .hub-subheading {
          font-size: 0.85rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
          max-width: 600px;
        }

        .hub-quick-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .hub-guide-card {
          padding: 1rem 1.25rem;
          border-radius: 10px;
          background: rgba(111, 230, 252, 0.05);
          border: 1px solid rgba(111, 230, 252, 0.2);
        }

        .guide-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #6FE6FC;
          margin-bottom: 0.5rem;
        }

        .guide-points {
          margin: 0;
          padding-left: 1.25rem;
          font-size: 0.82rem;
          color: #CBD5E1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .hub-workspace-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 1.25rem;
        }

        .hub-card {
          padding: 1.25rem;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          color: #FFFFFF;
          margin: 0 0 0.75rem 0;
          font-weight: 700;
        }

        .card-desc {
          font-size: 0.82rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0 0 0.85rem 0;
        }

        .hub-dropzone {
          border: 2px dashed rgba(255, 137, 47, 0.35);
          border-radius: 8px;
          background: rgba(255, 137, 47, 0.04);
          padding: 1.5rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .hub-dropzone:hover {
          border-color: #FF892F;
          background: rgba(255, 137, 47, 0.08);
        }

        .drop-title {
          font-size: 0.88rem;
          color: #E2E8F0;
          font-weight: 700;
          margin: 0 0 0.2rem 0;
        }

        .drop-hint {
          font-size: 0.72rem;
          color: #64748B;
        }

        .input-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #94A3B8;
          display: block;
          margin-bottom: 0.3rem;
          text-transform: uppercase;
        }

        .columns-reference-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.78rem;
        }

        .column-ref-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.25rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .column-ref-item code {
          color: #6FE6FC;
          font-family: monospace;
          background: rgba(111, 230, 252, 0.1);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .column-ref-item span {
          color: #94A3B8;
          font-size: 0.72rem;
        }

        .parse-error-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #EF4444;
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          margin-top: 0.75rem;
          font-size: 0.8rem;
        }

        .hub-preview-card {
          padding: 1.25rem;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .preview-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .preview-title {
          font-family: var(--font-ui);
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 0 0 0.2rem 0;
        }

        .preview-subtitle {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0;
        }

        .import-controls-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .mode-selector {
          display: flex;
          gap: 0.25rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem;
          border-radius: 6px;
        }

        .mode-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.7rem;
          border-radius: 4px;
          font-size: 0.78rem;
          color: #94A3B8;
          cursor: pointer;
        }

        .mode-pill.active {
          background: rgba(255, 137, 47, 0.2);
          color: #FF892F;
          font-weight: 700;
        }

        .mode-pill input {
          display: none;
        }

        .btn-commit-import {
          font-size: 0.88rem;
          padding: 0.65rem 1.25rem;
        }

        .parsed-table-scroll {
          max-height: 280px;
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
        }

        @media (max-width: 860px) {
          .hub-workspace-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
