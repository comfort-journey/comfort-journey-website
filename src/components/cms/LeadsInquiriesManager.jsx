import React, { useState, useEffect } from 'react';
import {
  Users, Search, Download, MessageCircle, PhoneCall, Trash2,
  CheckCircle2, Clock, Calendar, MapPin, RefreshCw, Filter,
  FileSpreadsheet, ShieldAlert, Sparkles, ExternalLink, Cloud, Loader2
} from 'lucide-react';
import {
  getAllLeads, updateLeadStatus, deleteLead, clearAllLeads, exportLeadsToCSV, fetchLeadsFromCMS
} from '../../services/leadStorageService';

export default function LeadsInquiriesManager({ showToast = () => {} }) {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [lastCloudSync, setLastCloudSync] = useState(null);

  const loadLeads = () => {
    setLeads(getAllLeads());
  };

  const handleSyncCloudLeads = async (silent = false) => {
    setIsSyncingCloud(true);
    try {
      const res = await fetchLeadsFromCMS();
      if (res.success) {
        setLeads(res.leads);
        setLastCloudSync(new Date().toLocaleTimeString());
        if (!silent) {
          showToast(`✅ Synced ${res.count} leads from Cloud Database!`);
        }
      } else {
        loadLeads();
      }
    } catch (err) {
      console.warn('Directus cloud sync error:', err);
      loadLeads();
    } finally {
      setIsSyncingCloud(false);
    }
  };

  useEffect(() => {
    // Initial sync from Directus cloud database so ALL devices see all leads
    handleSyncCloudLeads(true);

    const handleLeadEvent = () => loadLeads();
    window.addEventListener('cj-lead-saved', handleLeadEvent);
    return () => window.removeEventListener('cj-lead-saved', handleLeadEvent);
  }, []);

  const handleStatusChange = (leadId, newStatus) => {
    updateLeadStatus(leadId, newStatus);
    loadLeads();
    showToast(`Updated status to ${newStatus}`);
  };

  const handleDelete = (leadId, clientName) => {
    if (window.confirm(`Delete lead record for "${clientName || 'Guest'}"?`)) {
      deleteLead(leadId);
      loadLeads();
      showToast('Lead deleted.');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all lead records? Make sure you have exported to Excel first!')) {
      clearAllLeads();
      loadLeads();
      showToast('All leads cleared.');
    }
  };

  const handleExportCSV = () => {
    const success = exportLeadsToCSV(filteredLeads);
    if (success) {
      showToast('📥 Excel CSV downloaded successfully!');
    }
  };

  const cleanPhoneForWhatsApp = (rawPhone) => {
    if (!rawPhone) return '';
    let digits = rawPhone.replace(/\D/g, '');
    if (digits.length === 10) digits = `91${digits}`;
    return digits;
  };

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = !searchQuery.trim() || (
      (l.name && l.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.phone && l.phone.includes(searchQuery)) ||
      (l.tourName && l.tourName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.destination && l.destination.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = leads.length;
  const newCount = leads.filter(l => l.status === 'New').length;
  const contactedCount = leads.filter(l => l.status === 'Contacted').length;
  const convertedCount = leads.filter(l => l.status === 'Converted').length;

  return (
    <div className="leads-manager-root">
      {/* ─── Top Stats & Action Bar ─── */}
      <div className="leads-stats-row">
        <div className="leads-stat-card">
          <span className="stat-label">Total Inquiries</span>
          <span className="stat-number">{totalCount}</span>
        </div>
        <div className="leads-stat-card new">
          <span className="stat-label">New / Pending</span>
          <span className="stat-number text-amber">{newCount}</span>
        </div>
        <div className="leads-stat-card contacted">
          <span className="stat-label">Followed Up</span>
          <span className="stat-number text-blue">{contactedCount}</span>
        </div>
        <div className="leads-stat-card converted">
          <span className="stat-label">Converted Trips</span>
          <span className="stat-number text-emerald">{convertedCount}</span>
        </div>
      </div>

      {/* ─── Search & Controls ─── */}
      <div className="leads-controls-bar">
        <div className="leads-search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="leads-search-input"
            placeholder="Search by client name, phone number, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="leads-actions-cluster">
          <select
            className="leads-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses ({totalCount})</option>
            <option value="New">New / Pending ({newCount})</option>
            <option value="Contacted">Contacted</option>
            <option value="Quoted">Quoted</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            type="button"
            className="btn-leads-export"
            onClick={handleExportCSV}
            title="Export filtered leads to Microsoft Excel / CSV"
          >
            <FileSpreadsheet size={15} />
            <span>Export to Excel (CSV)</span>
          </button>

          <button
            type="button"
            className="btn-leads-refresh"
            onClick={() => handleSyncCloudLeads(false)}
            disabled={isSyncingCloud}
            title="Pull latest inquiries from Directus Cloud Database across all devices"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.85rem' }}
          >
            {isSyncingCloud ? <Loader2 size={15} className="animate-spin text-amber" /> : <Cloud size={15} className="text-cyan" />}
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              {isSyncingCloud ? 'Syncing Cloud...' : 'Refresh Cloud Leads'}
            </span>
          </button>
        </div>
      </div>

      {/* Cloud Parity Status Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.85rem', marginBottom: '1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.25)', fontSize: '0.78rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 600 }}>
          <CheckCircle2 size={14} />
          <span>Live Central Database: Synchronized with Directus Cloud (All devices see all leads)</span>
        </div>
        {lastCloudSync && (
          <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>
            Last Cloud Sync: {lastCloudSync}
          </span>
        )}
      </div>

      {/* ─── Table / Cards ─── */}
      {filteredLeads.length === 0 ? (
        <div className="leads-empty-state">
          <Users size={36} className="empty-icon" />
          <h4>No Inquiries Found</h4>
          <p>
            {searchQuery || statusFilter !== 'ALL'
              ? 'No leads matched your search or status filter.'
              : 'Website inquiries submitted by visitors via Quick Enquiry or 5-Step Booking will appear here automatically.'}
          </p>
        </div>
      ) : (
        <div className="leads-table-container">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Tour & Destination</th>
                <th>Timeline & Guests</th>
                <th>Client Notes</th>
                <th>Status</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const waPhone = cleanPhoneForWhatsApp(lead.phone);
                const waText = encodeURIComponent(
                  `Hi ${lead.name || 'there'}! This is Comfort Journey following up on your tour inquiry for "${lead.tourName || 'your trip'}". How may we assist you today?`
                );

                return (
                  <tr key={lead.id} className={`lead-row status-${lead.status.toLowerCase()}`}>
                    <td>
                      <div className="lead-customer-cell">
                        <strong className="customer-name">{lead.name || 'Anonymous Guest'}</strong>
                        <span className="customer-phone">{lead.phone || 'No phone'}</span>
                        {lead.email && <span className="customer-email">{lead.email}</span>}
                        <span className="lead-date">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          }) : ''}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="lead-tour-cell">
                        <span className="tour-badge">{lead.tourName || lead.destination}</span>
                        {lead.duration && <span className="tour-duration">{lead.duration}</span>}
                        <span className="lead-source-tag">{lead.source}</span>
                      </div>
                    </td>

                    <td>
                      <div className="lead-details-cell">
                        <div className="detail-item">
                          <Calendar size={13} />
                          <span>{lead.travelDate || 'Flexible'}</span>
                        </div>
                        <div className="detail-item">
                          <Users size={13} />
                          <span>{lead.guests || '2 Persons'}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="lead-notes-cell">
                        {lead.notes ? (
                          <p className="lead-notes-text">{lead.notes}</p>
                        ) : (
                          <span className="no-notes">None</span>
                        )}
                      </div>
                    </td>

                    <td>
                      <select
                        className={`lead-status-badge status-${(lead.status || 'new').toLowerCase()}`}
                        value={lead.status || 'New'}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      >
                        <option value="New">🟢 New</option>
                        <option value="Contacted">🟡 Contacted</option>
                        <option value="Quoted">🔵 Quoted</option>
                        <option value="Converted">🎉 Converted</option>
                        <option value="Closed">⚪ Closed</option>
                      </select>
                    </td>

                    <td>
                      <div className="lead-actions-cell">
                        {lead.phone && (
                          <>
                            <a
                              href={`https://wa.me/${waPhone}?text=${waText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="lead-action-btn wa"
                              title="Chat with client on WhatsApp"
                            >
                              <MessageCircle size={15} />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={`tel:${lead.phone}`}
                              className="lead-action-btn call"
                              title="Call client directly"
                            >
                              <PhoneCall size={14} />
                            </a>
                          </>
                        )}

                        <button
                          type="button"
                          className="lead-action-btn delete"
                          onClick={() => handleDelete(lead.id, lead.name)}
                          title="Delete inquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Footer Controls ─── */}
      <div className="leads-footer-bar">
        <span className="leads-footer-hint">
          💡 Client details are saved locally and auto-fill returning visitors. Export to Excel at any time for offline storage or CRM import.
        </span>
        {leads.length > 0 && (
          <button
            type="button"
            className="btn-leads-danger"
            onClick={handleClearAll}
          >
            Clear All Leads
          </button>
        )}
      </div>

      <style>{`
        .leads-manager-root {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          color: #0F172A;
        }

        .leads-stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .leads-stat-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .stat-label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #64748B;
        }

        .stat-number {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.1;
        }

        .text-amber { color: #EA580C !important; }
        .text-blue { color: #2563EB !important; }
        .text-emerald { color: #059669 !important; }

        .leads-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .leads-search-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 0.55rem 0.85rem;
          flex: 1;
          min-width: 260px;
        }

        .search-icon {
          color: #94A3B8;
        }

        .leads-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.88rem;
          color: #0F172A;
        }

        .leads-actions-cluster {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .leads-status-filter {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 0.55rem 0.85rem;
          font-size: 0.84rem;
          font-weight: 600;
          color: #0F172A;
          cursor: pointer;
        }

        .btn-leads-export {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #10B981, #059669);
          border: none;
          border-radius: 10px;
          padding: 0.55rem 1rem;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-leads-export:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .btn-leads-refresh {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 0.55rem 0.75rem;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-leads-refresh:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .leads-table-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow-x: auto;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.86rem;
        }

        .leads-table th {
          background: #F8FAFC;
          color: #475569;
          font-weight: 700;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #E2E8F0;
          white-space: nowrap;
        }

        .leads-table td {
          padding: 0.95rem 1rem;
          border-bottom: 1px solid #F1F5F9;
          vertical-align: middle;
        }

        .lead-row:hover td {
          background: #FAF8F5;
        }

        .lead-customer-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .customer-name {
          font-size: 0.92rem;
          color: #0F172A;
        }

        .customer-phone {
          font-size: 0.82rem;
          color: #EA580C;
          font-weight: 600;
        }

        .customer-email {
          font-size: 0.76rem;
          color: #64748B;
        }

        .lead-date {
          font-size: 0.72rem;
          color: #94A3B8;
          margin-top: 2px;
        }

        .lead-tour-cell {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .tour-badge {
          font-weight: 700;
          color: #0F172A;
        }

        .tour-duration {
          font-size: 0.76rem;
          color: #64748B;
        }

        .lead-source-tag {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 600;
          background: #F1F5F9;
          color: #475569;
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
        }

        .lead-details-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8rem;
          color: #475569;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .lead-notes-cell {
          max-width: 220px;
        }

        .lead-notes-text {
          margin: 0;
          font-size: 0.8rem;
          color: #334155;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .no-notes {
          font-size: 0.76rem;
          color: #94A3B8;
          font-style: italic;
        }

        .lead-status-badge {
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid #CBD5E1;
          cursor: pointer;
          background: #FFFFFF;
        }

        .lead-actions-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lead-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 0.76rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .lead-action-btn.wa {
          background: #25D366;
          color: #FFFFFF;
        }

        .lead-action-btn.wa:hover {
          background: #128C7E;
          transform: translateY(-1px);
        }

        .lead-action-btn.call {
          background: #F1F5F9;
          color: #0F172A;
          border-color: #CBD5E1;
        }

        .lead-action-btn.call:hover {
          background: #E2E8F0;
        }

        .lead-action-btn.delete {
          background: #FFF1F2;
          color: #E11D48;
          border-color: #FECDD3;
        }

        .lead-action-btn.delete:hover {
          background: #FFE4E6;
        }

        .leads-empty-state {
          background: #FFFFFF;
          border: 1px dashed #CBD5E1;
          border-radius: 14px;
          padding: 3rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .empty-icon {
          color: #94A3B8;
        }

        .leads-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #64748B;
          padding: 0.5rem 0.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .btn-leads-danger {
          background: transparent;
          border: none;
          color: #E11D48;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
