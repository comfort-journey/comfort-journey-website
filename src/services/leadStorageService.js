// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — LEAD STORAGE & CRM SERVICE
// Handles:
// 1. Traveler Profile Persistence (Auto-fills returning user info)
// 2. Local & Cloud Lead Logging
// 3. Admin CRM Dashboard Operations (View, Filter, Status Update)
// 4. One-Click Excel / CSV Export
// ═══════════════════════════════════════════════════════════════════

const STORAGE_KEY_TRAVELER_PROFILE = 'cj_traveler_profile';
const STORAGE_KEY_LEADS_STORE = 'cj_leads_store';
const STORAGE_KEY_LEGACY_ENQUIRIES = 'cj_enquiries';

// Helper to safely access localStorage
function safeGetItem(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (err) {
    console.warn(`[leadStorageService] Failed to read ${key}:`, err);
  }
  return null;
}

function safeSetItem(key, val) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, val);
    }
  } catch (err) {
    console.warn(`[leadStorageService] Failed to write ${key}:`, err);
  }
}

/**
 * Get traveler profile for instant form pre-fill on returning visits
 */
export function getTravelerProfile() {
  try {
    const raw = safeGetItem(STORAGE_KEY_TRAVELER_PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[leadStorageService] Could not parse traveler profile:', err);
  }
  return {
    name: '',
    phone: '',
    email: '',
    guests: '2 Persons (Couple)'
  };
}

/**
 * Save / update traveler profile
 */
export function saveTravelerProfile(profile) {
  if (!profile) return;
  const existing = getTravelerProfile();
  const updated = {
    ...existing,
    ...profile,
    lastUpdated: new Date().toISOString()
  };
  safeSetItem(STORAGE_KEY_TRAVELER_PROFILE, JSON.stringify(updated));
  return updated;
}

/**
 * Retrieve all leads, merging legacy records if present
 */
export function getAllLeads() {
  try {
    let leads = [];
    const raw = safeGetItem(STORAGE_KEY_LEADS_STORE);
    if (raw) {
      leads = JSON.parse(raw);
    }

    // Migrate any legacy 'cj_enquiries' records if not already imported
    const legacyRaw = safeGetItem(STORAGE_KEY_LEGACY_ENQUIRIES);
    if (legacyRaw) {
      try {
        const legacy = JSON.parse(legacyRaw);
        if (Array.isArray(legacy) && legacy.length > 0) {
          const existingIds = new Set(leads.map(l => l.id || `${l.phone}_${l.timestamp}`));
          legacy.forEach(item => {
            const tempId = item.id || `legacy_${item.timestamp || Date.now()}`;
            if (!existingIds.has(tempId)) {
              leads.push({
                id: tempId,
                name: item.name || 'Valued Guest',
                phone: item.phone || '',
                email: item.email || '',
                tourName: item.tourName || item.destination || 'Custom Tour',
                destination: item.destination || '',
                travelDate: item.travelDate || '',
                guests: item.guests || '2 Persons',
                notes: item.notes || '',
                status: 'New',
                source: 'Quick Enquiry',
                createdAt: item.timestamp || new Date().toISOString()
              });
            }
          });
        }
      } catch (e) {
        // ignore legacy parse error
      }
    }

    return Array.isArray(leads) ? leads : [];
  } catch (err) {
    console.warn('[leadStorageService] Error loading leads:', err);
    return [];
  }
}

/**
 * Record a new lead from any enquiry/booking form
 */
export function saveLead(data) {
  if (!data) return null;

  const leadId = `LEAD_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  const newLead = {
    id: leadId,
    name: (data.name || '').trim(),
    phone: (data.phone || '').trim(),
    email: (data.email || '').trim(),
    tourName: data.tourName || data.destination || 'Custom Tour Proposal',
    destination: data.destination || '',
    duration: data.duration || '',
    travelDate: data.travelDate || data.exactDate || data.travelMonth || 'Flexible',
    guests: data.guests || data.travelers || '2 Persons',
    pace: data.pace || '',
    hotelTier: data.hotelTier || '',
    transportType: data.transportType || '',
    notes: (data.notes || data.specialNotes || '').trim(),
    source: data.source || 'Website Enquiry',
    status: 'New', // 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Closed'
    createdAt: now
  };

  // 1. Auto-save customer profile for future visits
  saveTravelerProfile({
    name: newLead.name,
    phone: newLead.phone,
    email: newLead.email,
    guests: newLead.guests
  });

  // 2. Persist into leads store
  try {
    const existing = getAllLeads();
    const updated = [newLead, ...existing.filter(l => l.id !== leadId)].slice(0, 500); // keep up to 500 recent leads
    safeSetItem(STORAGE_KEY_LEADS_STORE, JSON.stringify(updated));
  } catch (err) {
    console.warn('[leadStorageService] Error saving lead to store:', err);
  }

  // 3. Dispatch global event for live admin dashboard update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cj-lead-saved', { detail: newLead }));
  }

  return newLead;
}

/**
 * Update lead status (e.g. 'Contacted', 'Quoted', 'Converted')
 */
export function updateLeadStatus(leadId, newStatus) {
  const leads = getAllLeads();
  const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus, statusUpdatedAt: new Date().toISOString() } : l);
  safeSetItem(STORAGE_KEY_LEADS_STORE, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cj-lead-saved', { detail: { id: leadId, status: newStatus } }));
  }
  return updated;
}

/**
 * Delete a single lead
 */
export function deleteLead(leadId) {
  const leads = getAllLeads();
  const updated = leads.filter(l => l.id !== leadId);
  safeSetItem(STORAGE_KEY_LEADS_STORE, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cj-lead-saved', { detail: { id: leadId, deleted: true } }));
  }
  return updated;
}

/**
 * Clear all leads
 */
export function clearAllLeads() {
  safeSetItem(STORAGE_KEY_LEADS_STORE, JSON.stringify([]));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cj-lead-saved', { detail: { cleared: true } }));
  }
}

/**
 * Export all leads to CSV file compatible with Excel, Google Sheets, & Numbers
 */
export function exportLeadsToCSV(leadsList) {
  const leads = leadsList || getAllLeads();
  if (!leads.length) {
    alert('No inquiries or leads recorded yet to export.');
    return false;
  }

  const headers = [
    'Lead ID',
    'Date Submitted',
    'Customer Name',
    'Phone Number',
    'Email Address',
    'Tour / Package',
    'Destination',
    'Travel Date / Month',
    'Number of Guests',
    'Hotel Preference',
    'Vehicle Preference',
    'Customer Notes',
    'Status',
    'Lead Source'
  ];

  const escapeCSV = (val) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map(l => [
    escapeCSV(l.id),
    escapeCSV(l.createdAt ? new Date(l.createdAt).toLocaleString() : ''),
    escapeCSV(l.name),
    escapeCSV(l.phone),
    escapeCSV(l.email),
    escapeCSV(l.tourName),
    escapeCSV(l.destination),
    escapeCSV(l.travelDate),
    escapeCSV(l.guests),
    escapeCSV(l.hotelTier),
    escapeCSV(l.transportType),
    escapeCSV(l.notes),
    escapeCSV(l.status),
    escapeCSV(l.source)
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `comfort-journey-leads-${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
