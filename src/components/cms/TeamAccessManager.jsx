import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, UserPlus, UserCheck, UserX, Trash2, Key, 
  Mail, CheckCircle2, AlertTriangle, Lock, RefreshCw, Eye, EyeOff,
  Sliders, CheckSquare, Square, Edit3, X, Cloud
} from 'lucide-react';
import { teamAccessStorageService } from '../../services/teamAccessStorageService';

const STORAGE_KEY_USERS = 'cj_authorized_users';

// All configurable sections within Comfort Journey CMS
export const CMS_SECTIONS = [
  { id: 'manage-tours', label: 'Tour Packages', icon: '🗺️', desc: 'Create, edit & manage tour itineraries, departures & pricing' },
  { id: 'leads-inquiries', label: 'Leads & Inquiries CRM', icon: '💼', desc: 'Customer inquiries, calls & sales database (Sales team only)' },
  { id: 'manage-blogs', label: 'Blog & Magazine', icon: '✍️', desc: 'Write, publish and edit travel blogs & articles' },
  { id: 'site-customizer', label: 'Site & SEO Customizer', icon: '🎨', desc: 'Edit homepage copy, banners, popups & meta tags' },
  { id: 'analytics', label: 'Growth Hub Analytics', icon: '📈', desc: 'Website traffic, analytics & conversion metrics' },
  { id: 'data-hub', label: 'Data Hub (Import & Export)', icon: '📊', desc: 'CSV migration, Wix package imports & live backups' }
];

export const ROLE_PRESETS = {
  SUPER_ADMIN: {
    label: '👑 Super Admin (Full Access to All 9 Sections)',
    description: 'Full access to all sections, Team Access, Global Deployment & Cloud Config',
    sections: ['*']
  },
  SALES_CRM: {
    label: '💼 Sales Team (CRM & Tour Packages)',
    description: 'Access to customer inquiries CRM and tour packages for pricing/quoting',
    sections: ['leads-inquiries', 'manage-tours']
  },
  BLOG_WRITER: {
    label: '✍️ Blog & Content Writer (Blogs Only)',
    description: 'Only Blog & Magazine access. CRM and customer leads are strictly blocked.',
    sections: ['manage-blogs']
  },
  TOUR_MANAGER: {
    label: '🗺️ Tour Package Manager (Tours Only)',
    description: 'Only Tour Packages access. CRM and customer leads are strictly blocked.',
    sections: ['manage-tours']
  },
  CUSTOM: {
    label: '⚙️ Custom Multi-Section Access',
    description: 'Select specific sections below using the checkboxes',
    sections: []
  }
};

export const DEFAULT_AUTHORIZED_USERS = [
  {
    id: 'user-admin-marcom',
    email: 'comfortjourneymarcom@gmail.com',
    name: 'Comfort Journey Marcom',
    role: 'SUPER_ADMIN',
    allowedSections: ['*'],
    status: 'ACTIVE',
    password: 'Admin@CJ2026#',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-admin-1',
    email: 'rishabhmishra@comfortjourneyy.onmicrosoft.com',
    name: 'Rishabh Mishra',
    role: 'SUPER_ADMIN',
    allowedSections: ['*'],
    status: 'ACTIVE',
    password: 'Admin@CJ2026#',
    createdAt: '2026-01-01'
  }
];

const UNWANTED_SYNTHETIC_EMAILS = new Set([
  'rishabhpandey7299@gmail.com',
  'admin@comfortjourney.in',
  'comfortjourney1992@gmail.com',
  'operations@comfortjourney.in',
  'social@comfortjourneyy.onmicrosoft.com'
]);

export function getAuthorizedUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    let parsedUsers = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) parsedUsers = parsed;
      } catch {}
    }

    const usersMap = new Map();
    // 1. Seed default Super Admins
    DEFAULT_AUTHORIZED_USERS.forEach(u => usersMap.set(u.email.toLowerCase().trim(), { ...u }));

    // 2. Merge stored users
    parsedUsers.forEach(u => {
      const email = (u.email || '').toLowerCase().trim();
      if (email && !UNWANTED_SYNTHETIC_EMAILS.has(email)) {
        const existing = usersMap.get(email);
        usersMap.set(email, {
          ...(existing || {}),
          ...u,
          allowedSections: u.allowedSections || (u.role === 'SUPER_ADMIN' ? ['*'] : (existing?.allowedSections || ['manage-blogs']))
        });
      }
    });

    const sanitized = Array.from(usersMap.values());
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(sanitized));
    return sanitized;
  } catch (err) {
    console.error('Failed to load authorized users:', err);
    return DEFAULT_AUTHORIZED_USERS;
  }
}

export function saveAuthorizedUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save authorized users:', err);
  }
}

export default function TeamAccessManager({ currentUser, showToast }) {
  const [users, setUsers] = useState(() => getAuthorizedUsers());
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});

  // New User Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('BLOG_WRITER');
  const [newSections, setNewSections] = useState(['manage-blogs']);

  // Edit Permissions State
  const [editingUserId, setEditingUserId] = useState(null);
  const [editRole, setEditRole] = useState('CUSTOM');
  const [editSections, setEditSections] = useState([]);
  const [editPassword, setEditPassword] = useState('');

  // Initial Cloud Load from AWS Directus
  const syncWithCloudDirectus = async (silent = false) => {
    setIsSyncingCloud(true);
    try {
      const cloudUsers = await teamAccessStorageService.fetchTeamUsersFromDirectus();
      if (cloudUsers && cloudUsers.length > 0) {
        setUsers(cloudUsers);
        saveAuthorizedUsers(cloudUsers);
        if (!silent) showToast('☁️ Live staff permissions synced from AWS Directus Cloud.');
      }
    } catch (err) {
      console.warn('[TeamAccessManager] Cloud sync error:', err);
      if (!silent) showToast('⚠️ Could not connect to AWS Directus. Using local cached directory.');
    } finally {
      setIsSyncingCloud(false);
    }
  };

  useEffect(() => {
    syncWithCloudDirectus(true);
  }, []);

  useEffect(() => {
    saveAuthorizedUsers(users);
  }, [users]);

  // Handle role preset selection for new employee
  const handleRolePresetChange = (roleKey) => {
    setNewRole(roleKey);
    if (ROLE_PRESETS[roleKey]) {
      setNewSections([...ROLE_PRESETS[roleKey].sections]);
    }
  };

  // Toggle individual section checkbox for new employee
  const handleToggleNewSection = (sectionId) => {
    if (newRole === 'SUPER_ADMIN') {
      setNewRole('CUSTOM');
    }
    setNewSections(prev => {
      const current = prev.includes('*') ? CMS_SECTIONS.map(s => s.id) : [...prev];
      if (current.includes(sectionId)) {
        const next = current.filter(id => id !== sectionId);
        return next;
      } else {
        return [...current, sectionId];
      }
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const cleanEmail = newEmail.trim().toLowerCase();
    const cleanName = newName.trim();
    const cleanPass = newPassword.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('❌ Please provide a valid employee email address.');
      return;
    }
    if (!cleanPass || cleanPass.length < 6) {
      showToast('❌ Password must be at least 6 characters.');
      return;
    }

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      showToast(`⚠️ An employee with email "${cleanEmail}" already exists.`);
      return;
    }

    const assignedSections = newRole === 'SUPER_ADMIN' ? ['*'] : (newSections.length > 0 ? newSections : ['manage-blogs']);

    const newUser = {
      id: `user-${Date.now()}`,
      name: cleanName || cleanEmail.split('@')[0],
      email: cleanEmail,
      role: newRole,
      allowedSections: assignedSections,
      status: 'ACTIVE',
      password: cleanPass,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    saveAuthorizedUsers(updated);

    // Save to AWS Directus in real-time
    teamAccessStorageService.saveTeamUserToDirectus(newUser)
      .then(() => showToast(`☁️ ${cleanEmail} saved directly to AWS Cloud!`))
      .catch(err => console.warn('Cloud save error:', err));

    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('BLOG_WRITER');
    setNewSections(['manage-blogs']);
    setShowAddForm(false);
    showToast(`✅ Access granted to ${cleanEmail}! Assigned: ${assignedSections.includes('*') ? 'All Sections' : assignedSections.join(', ')}`);
  };

  // Open Edit Permissions drawer
  const handleStartEdit = (user) => {
    setEditingUserId(user.id);
    setEditRole(user.role || 'CUSTOM');
    setEditSections(user.allowedSections ? [...user.allowedSections] : (user.role === 'SUPER_ADMIN' ? ['*'] : ['manage-blogs']));
    setEditPassword(user.password || '');
  };

  const handleSaveEdit = async (userId) => {
    const assignedSections = editRole === 'SUPER_ADMIN' ? ['*'] : (editSections.length > 0 ? editSections : ['manage-blogs']);
    let targetObj = null;
    const updated = users.map(u => {
      if (u.id === userId) {
        targetObj = {
          ...u,
          role: editRole,
          allowedSections: assignedSections,
          password: editPassword.trim() || u.password
        };
        return targetObj;
      }
      return u;
    });

    setUsers(updated);
    saveAuthorizedUsers(updated);
    setEditingUserId(null);

    if (targetObj) {
      teamAccessStorageService.saveTeamUserToDirectus(targetObj)
        .then(() => showToast(`☁️ Permissions updated live in AWS Cloud.`))
        .catch(console.warn);
    }

    showToast(`✅ Permissions updated for team member.`);
  };

  const handleToggleEditSection = (sectionId) => {
    if (editRole === 'SUPER_ADMIN') {
      setEditRole('CUSTOM');
    }
    setEditSections(prev => {
      const current = prev.includes('*') ? CMS_SECTIONS.map(s => s.id) : [...prev];
      if (current.includes(sectionId)) {
        return current.filter(id => id !== sectionId);
      } else {
        return [...current, sectionId];
      }
    });
  };

  const handleToggleStatus = (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) return;

    // Safety: Prevent revoking the last active Super Admin
    if (target.role === 'SUPER_ADMIN' && target.status === 'ACTIVE') {
      const activeAdmins = users.filter(u => u.role === 'SUPER_ADMIN' && u.status === 'ACTIVE');
      if (activeAdmins.length <= 1) {
        alert('Cannot revoke the only active Super Admin account.');
        return;
      }
    }

    const nextStatus = target.status === 'ACTIVE' ? 'REVOKED' : 'ACTIVE';
    const updated = users.map(u => u.id === userId ? { ...u, status: nextStatus } : u);
    setUsers(updated);
    saveAuthorizedUsers(updated);

    // Sync status to AWS Directus immediately
    teamAccessStorageService.revokeTeamUserInDirectus(target.id, target.email)
      .then(() => showToast(`☁️ Revocation synced live to AWS Directus cloud.`))
      .catch(console.warn);

    if (nextStatus === 'REVOKED') {
      showToast(`⛔ Access REVOKED for ${target.email}. Login is now blocked immediately on all devices.`);
    } else {
      showToast(`✅ Access RESTORED for ${target.email}.`);
    }
  };

  const handleDeleteUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) return;

    if (target.role === 'SUPER_ADMIN') {
      const activeAdmins = users.filter(u => u.role === 'SUPER_ADMIN');
      if (activeAdmins.length <= 1) {
        alert('Cannot delete the only Super Admin account.');
        return;
      }
    }

    if (window.confirm(`Permanently remove ${target.email} from company access list and AWS database?`)) {
      const updated = users.filter(u => u.id !== userId);
      setUsers(updated);
      saveAuthorizedUsers(updated);

      teamAccessStorageService.deleteTeamUserFromDirectus(target.id)
        .then(() => showToast(`☁️ Deleted from AWS Cloud.`))
        .catch(console.warn);

      showToast(`🗑️ Removed ${target.email}.`);
    }
  };

  const toggleShowPassword = (id) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="team-access-manager-pane">
      {/* Overview Banner */}
      <div className="team-access-hero-card">
        <div className="hero-text-col">
          <div className="hero-badge">
            <Shield size={14} className="text-amber" />
            <span>AWS CLOUD REAL-TIME ACCESS CONTROL & GRANULAR PERMISSIONS</span>
          </div>
          <h3>Employee Email Access & Granular Permissions</h3>
          <p>
            Control which CMS sections each employee can see. Additions and revocations take effect <strong>instantly in AWS Cloud</strong> without rebuilding the website. CRM database is strictly reserved for Sales and Super Admins.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => syncWithCloudDirectus(false)}
            disabled={isSyncingCloud}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
            title="Refresh directory from AWS Directus Cloud"
          >
            <RefreshCw size={14} className={isSyncingCloud ? 'animate-spin' : ''} />
            <span>{isSyncingCloud ? 'Syncing...' : 'Sync AWS Cloud'}</span>
          </button>
          <button 
            type="button" 
            className="btn-primary add-employee-trigger"
            onClick={() => setShowAddForm(prev => !prev)}
          >
            <UserPlus size={16} />
            <span>{showAddForm ? 'Close Form' : 'Add New Employee'}</span>
          </button>
        </div>
      </div>

      {/* Add Employee Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleAddUser} className="team-add-form-card animate-fade-in">
          <h4>Grant New Employee CMS Access</h4>
          <p className="form-helper">
            Provide the employee's work email and check exactly which sections they are allowed to access.
          </p>

          <div className="form-fields-grid">
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Employee Email Address (Google / Work Email)</label>
              <input
                type="email"
                placeholder="e.g. rahul@comfortjourney.in or user@gmail.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Initial Password / Access Key</label>
              <input
                type="text"
                placeholder="e.g. CJ@Rahul2026#"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Assigned Permission Role</label>
              <select value={newRole} onChange={(e) => handleRolePresetChange(e.target.value)}>
                {Object.entries(ROLE_PRESETS).map(([key, preset]) => (
                  <option key={key} value={key}>{preset.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Granular Section Checkboxes */}
          <div className="sections-selection-box" style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', color: '#F9FBE7', marginBottom: '0.4rem' }}>
              Accessible CMS Sections (Check one or multiple sections):
            </label>
            <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.78rem', color: '#94A3B8' }}>
              Employees can ONLY view the sections checked below. Unchecked sections will be completely hidden from their dashboard.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {CMS_SECTIONS.map(section => {
                const isChecked = newRole === 'SUPER_ADMIN' || newSections.includes('*') || newSections.includes(section.id);
                return (
                  <div
                    key={section.id}
                    onClick={() => handleToggleNewSection(section.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '8px',
                      background: isChecked ? 'rgba(255, 137, 47, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1.5px solid ${isChecked ? '#FF892F' : 'rgba(255, 255, 255, 0.12)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ marginTop: '2px', color: isChecked ? '#FF892F' : '#94A3B8' }}>
                      {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.84rem', color: isChecked ? '#FFF' : '#E2E8F0' }}>
                        {section.icon} {section.label}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.3 }}>
                        {section.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-actions-row" style={{ marginTop: '1.25rem' }}>
            <button type="submit" className="btn-primary">
              <UserCheck size={16} />
              <span>Grant Access & Save Credentials</span>
            </button>
            <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <div className="team-users-table-card">
        <div className="table-header-row">
          <div className="table-title">
            <Users size={18} className="text-cyan" />
            <span>Authorized Team Directory ({users.length} Users)</span>
          </div>
          <span className="table-hint">
            💡 Revoke any employee with 1 click when they leave the company.
          </span>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Employee / Account</th>
                <th>Assigned Role</th>
                <th>Status</th>
                <th>Access Password</th>
                <th>Accessible Sections</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isSuperAdmin = u.role === 'SUPER_ADMIN';
                const isActive = u.status === 'ACTIVE';
                const isCurrent = currentUser?.email?.toLowerCase() === u.email.toLowerCase();

                return (
                  <React.Fragment key={u.id}>
                    <tr className={`user-row ${!isActive ? 'row-revoked' : ''}`}>
                    <td>
                      <div className="user-meta-cell">
                        <div className={`user-avatar-disc ${isSuperAdmin ? 'admin-disc' : 'editor-disc'}`}>
                          {u.name?.charAt(0)?.toUpperCase() || u.email?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="user-text-meta">
                          <span className="user-display-name">
                            {u.name} {isCurrent && <span className="you-pill">(You)</span>}
                          </span>
                          <span className="user-email-addr">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`role-badge ${isSuperAdmin ? 'badge-super-admin' : 'badge-editor'}`}>
                        {isSuperAdmin ? <Shield size={12} /> : <Users size={12} />}
                        <span>
                          {isSuperAdmin ? 'Super Admin' : (
                            u.role === 'SALES_CRM' ? 'Sales CRM' :
                            u.role === 'BLOG_WRITER' ? 'Blog Writer' :
                            u.role === 'TOUR_MANAGER' ? 'Tour Manager' :
                            'Custom Access'
                          )}
                        </span>
                      </span>
                    </td>

                    <td>
                      <span className={`status-badge ${isActive ? 'badge-active' : 'badge-revoked'}`}>
                        {isActive ? <CheckCircle2 size={12} /> : <UserX size={12} />}
                        <span>{isActive ? 'Active' : 'Revoked'}</span>
                      </span>
                    </td>

                    <td>
                      <div className="password-peek-cell">
                        <span className="password-text">
                          {showPasswords[u.id] ? u.password : '••••••••••••'}
                        </span>
                        <button
                          type="button"
                          className="btn-peek-pass"
                          onClick={() => toggleShowPassword(u.id)}
                          title={showPasswords[u.id] ? 'Hide' : 'Reveal'}
                        >
                          {showPasswords[u.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className="permissions-summary" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {isSuperAdmin || (u.allowedSections && u.allowedSections.includes('*')) ? (
                          <span className="perm-tag perm-full">
                            👑 Full System (All 9 Sections)
                          </span>
                        ) : u.allowedSections && u.allowedSections.length > 0 ? (
                          u.allowedSections.map(secId => {
                            const sec = CMS_SECTIONS.find(s => s.id === secId);
                            return (
                              <span
                                key={secId}
                                className="perm-tag"
                                style={{
                                  fontSize: '0.72rem',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '6px',
                                  background: secId === 'leads-inquiries' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 137, 47, 0.15)',
                                  border: `1px solid ${secId === 'leads-inquiries' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 137, 47, 0.4)'}`,
                                  color: secId === 'leads-inquiries' ? '#93C5FD' : '#FDBA74',
                                  fontWeight: 700
                                }}
                              >
                                {sec ? `${sec.icon} ${sec.label}` : secId}
                              </span>
                            );
                          })
                        ) : (
                          <span className="perm-tag perm-limited" style={{ color: '#F87171' }}>
                            ⚠️ No Sections Assigned
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="table-actions-cell" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {/* Edit Permissions Button */}
                        <button
                          type="button"
                          className="btn-action-edit"
                          onClick={() => handleStartEdit(u)}
                          title="Edit employee permissions & sections"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.35rem 0.6rem',
                            borderRadius: '6px',
                            background: 'rgba(111, 230, 252, 0.12)',
                            border: '1px solid rgba(111, 230, 252, 0.35)',
                            color: '#6FE6FC',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <Edit3 size={13} />
                          <span>Permissions</span>
                        </button>

                        <button
                          type="button"
                          className={`btn-action-revoke ${isActive ? 'btn-revoke' : 'btn-restore'}`}
                          onClick={() => handleToggleStatus(u.id)}
                          title={isActive ? 'Revoke employee login access' : 'Restore employee login access'}
                        >
                          {isActive ? (
                            <>
                              <UserX size={13} />
                              <span>Revoke</span>
                            </>
                          ) : (
                            <>
                              <UserCheck size={13} />
                              <span>Restore</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          className="btn-action-delete"
                          onClick={() => handleDeleteUser(u.id)}
                          title="Permanently remove user"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline Edit Drawer */}
                  {editingUserId === u.id && (
                    <tr className="edit-user-drawer-row">
                      <td colSpan="6" style={{ background: 'rgba(0, 18, 51, 0.95)', padding: '1.25rem', border: '1.5px solid #FF892F', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h4 style={{ margin: 0, color: '#FF892F', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                            <Sliders size={16} /> Edit Permissions for {u.name} ({u.email})
                          </h4>
                          <button
                            type="button"
                            onClick={() => setEditingUserId(null)}
                            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#F9FBE7', marginBottom: '0.35rem' }}>
                              Assign Role Preset
                            </label>
                            <select
                              value={editRole}
                              onChange={(e) => {
                                const newR = e.target.value;
                                setEditRole(newR);
                                if (ROLE_PRESETS[newR]) {
                                  setEditSections([...ROLE_PRESETS[newR].sections]);
                                }
                              }}
                              style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                            >
                              {Object.entries(ROLE_PRESETS).map(([key, preset]) => (
                                <option key={key} value={key}>{preset.label}</option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#F9FBE7', marginBottom: '0.35rem' }}>
                              Update Password / Access Key
                            </label>
                            <input
                              type="text"
                              value={editPassword}
                              onChange={(e) => setEditPassword(e.target.value)}
                              placeholder="Leave blank to keep existing password"
                              style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                            />
                          </div>
                        </div>

                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#F9FBE7', marginBottom: '0.5rem' }}>
                          Check Allowed CMS Sections:
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                          {CMS_SECTIONS.map(section => {
                            const isChecked = editRole === 'SUPER_ADMIN' || editSections.includes('*') || editSections.includes(section.id);
                            return (
                              <div
                                key={section.id}
                                onClick={() => handleToggleEditSection(section.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.6rem',
                                  padding: '0.55rem 0.75rem',
                                  borderRadius: '8px',
                                  background: isChecked ? 'rgba(255, 137, 47, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                  border: `1.5px solid ${isChecked ? '#FF892F' : 'rgba(255, 255, 255, 0.12)'}`,
                                  cursor: 'pointer'
                                }}
                              >
                                <div style={{ color: isChecked ? '#FF892F' : '#94A3B8' }}>
                                  {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                                </div>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isChecked ? '#FFF' : '#CBD5E1' }}>
                                  {section.icon} {section.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setEditingUserId(null)}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn-primary"
                            onClick={() => handleSaveEdit(u.id)}
                            style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}
                          >
                            Save Permissions
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .team-access-manager-pane {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 0.5rem;
        }

        .team-access-hero-card {
          background: linear-gradient(135deg, rgba(0, 29, 81, 0.45) 0%, rgba(11, 17, 32, 0.7) 100%);
          border: 1px solid rgba(111, 230, 252, 0.25);
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--cj-gold, #FF892F);
          margin-bottom: 0.4rem;
        }

        .hero-text-col h3 {
          margin: 0 0 0.35rem 0;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--cj-text-heading, #F9FBE7);
        }

        .hero-text-col p {
          margin: 0;
          font-size: 0.88rem;
          color: var(--cj-text-muted, #94A3B8);
          line-height: 1.45;
          max-width: 780px;
        }

        .add-employee-trigger {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .team-add-form-card {
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(255, 137, 47, 0.35);
          border-radius: 14px;
          padding: 1.5rem;
        }

        .team-add-form-card h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #F9FBE7;
        }

        .form-helper {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0 0 1.25rem 0;
        }

        .form-fields-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #CBD5E1;
          margin-bottom: 0.35rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(0, 0, 0, 0.35);
          color: #FFFFFF;
          font-size: 0.88rem;
        }

        .form-actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .team-users-table-card {
          background: rgba(0, 18, 51, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          overflow: hidden;
        }

        .table-header-row {
          padding: 1.1rem 1.4rem;
          background: rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .table-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          color: #F9FBE7;
          font-size: 0.95rem;
        }

        .table-hint {
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .users-table-wrapper {
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }

        .users-table th {
          padding: 0.85rem 1.25rem;
          background: rgba(0, 0, 0, 0.2);
          color: #94A3B8;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .users-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #E2E8F0;
        }

        .user-row:hover td {
          background: rgba(111, 230, 252, 0.03);
        }

        .user-row.row-revoked td {
          opacity: 0.65;
          background: rgba(239, 68, 68, 0.04);
        }

        .user-meta-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar-disc {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .admin-disc {
          background: linear-gradient(135deg, #FF892F, #DAF561);
          color: #000B1E;
        }

        .editor-disc {
          background: linear-gradient(135deg, #0284C7, #6FE6FC);
          color: #000B1E;
        }

        .user-text-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .user-display-name {
          font-weight: 700;
          color: #FFFFFF;
        }

        .you-pill {
          font-size: 0.68rem;
          color: #DAF561;
          font-weight: 700;
          margin-left: 0.35rem;
        }

        .user-email-addr {
          font-size: 0.76rem;
          color: #94A3B8;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.74rem;
          font-weight: 700;
        }

        .badge-super-admin {
          background: rgba(255, 137, 47, 0.18);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FF892F;
        }

        .badge-editor {
          background: rgba(111, 230, 252, 0.15);
          border: 1px solid rgba(111, 230, 252, 0.35);
          color: #6FE6FC;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .badge-active {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #10B981;
        }

        .badge-revoked {
          background: rgba(239, 68, 68, 0.18);
          border: 1px solid rgba(239, 68, 68, 0.45);
          color: #EF4444;
        }

        .password-peek-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: monospace;
          font-size: 0.85rem;
        }

        .btn-peek-pass {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
        }

        .btn-peek-pass:hover {
          color: #FFFFFF;
        }

        .perm-tag {
          font-size: 0.76rem;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          display: inline-block;
        }

        .perm-full {
          background: rgba(218, 245, 97, 0.1);
          color: #DAF561;
        }

        .perm-limited {
          background: rgba(148, 163, 184, 0.1);
          color: #CBD5E1;
        }

        .table-actions-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-action-revoke {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .btn-revoke {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.35);
          color: #EF4444;
        }

        .btn-revoke:hover {
          background: #EF4444;
          color: #FFFFFF;
        }

        .btn-restore {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.35);
          color: #10B981;
        }

        .btn-restore:hover {
          background: #10B981;
          color: #FFFFFF;
        }

        .btn-action-delete {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #94A3B8;
          padding: 0.35rem 0.45rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn-action-delete:hover {
          color: #EF4444;
          border-color: #EF4444;
        }

        /* ══════════════════════════════════════════════════════
           LIGHT STUDIO OVERRIDES (High Contrast for Employees & Admin)
           ══════════════════════════════════════════════════════ */
        .cms-theme-light .team-access-hero-card,
        [data-cms-theme="light"] .team-access-hero-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%) !important;
          border: 1.5px solid #CBD5E1 !important;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05) !important;
        }

        .cms-theme-light .hero-text-col h3,
        [data-cms-theme="light"] .hero-text-col h3 {
          color: #0F172A !important;
        }

        .cms-theme-light .hero-text-col p,
        [data-cms-theme="light"] .hero-text-col p {
          color: #334155 !important;
          font-weight: 500 !important;
        }

        .cms-theme-light .team-users-table-card,
        [data-cms-theme="light"] .team-users-table-card {
          background: #FFFFFF !important;
          border: 1.5px solid #CBD5E1 !important;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05) !important;
        }

        .cms-theme-light .table-header-row,
        [data-cms-theme="light"] .table-header-row {
          background: #F8FAFC !important;
          border-bottom: 1.5px solid #CBD5E1 !important;
        }

        .cms-theme-light .table-title,
        [data-cms-theme="light"] .table-title {
          color: #0F172A !important;
          font-weight: 800 !important;
        }

        .cms-theme-light .table-hint,
        [data-cms-theme="light"] .table-hint {
          color: #475569 !important;
          font-weight: 600 !important;
        }

        .cms-theme-light .users-table th,
        [data-cms-theme="light"] .users-table th {
          background: #F1F5F9 !important;
          color: #0F172A !important;
          font-weight: 800 !important;
          border-bottom: 2px solid #CBD5E1 !important;
        }

        .cms-theme-light .users-table td,
        [data-cms-theme="light"] .users-table td {
          background: #FFFFFF !important;
          color: #0F172A !important;
          font-weight: 500 !important;
          border-bottom: 1px solid #E2E8F0 !important;
        }

        .cms-theme-light .user-row:hover td,
        [data-cms-theme="light"] .user-row:hover td {
          background: #F8FAFC !important;
        }

        .cms-theme-light .user-display-name,
        [data-cms-theme="light"] .user-display-name {
          color: #0F172A !important;
          font-weight: 800 !important;
        }

        .cms-theme-light .user-email-addr,
        [data-cms-theme="light"] .user-email-addr {
          color: #475569 !important;
          font-weight: 600 !important;
        }

        .cms-theme-light .password-text,
        [data-cms-theme="light"] .password-text {
          color: #0F172A !important;
          font-weight: 700 !important;
        }

        .cms-theme-light .btn-peek-pass,
        [data-cms-theme="light"] .btn-peek-pass {
          color: #475569 !important;
        }

        .cms-theme-light .btn-peek-pass:hover,
        [data-cms-theme="light"] .btn-peek-pass:hover {
          color: #0F172A !important;
        }

        .cms-theme-light .perm-full,
        [data-cms-theme="light"] .perm-full {
          background: #FEF3C7 !important;
          border: 1px solid #FCD34D !important;
          color: #92400E !important;
          font-weight: 700 !important;
        }

        .cms-theme-light .perm-limited,
        [data-cms-theme="light"] .perm-limited {
          background: #F1F5F9 !important;
          border: 1px solid #CBD5E1 !important;
          color: #334155 !important;
          font-weight: 700 !important;
        }

        .cms-theme-light .team-add-form-card,
        [data-cms-theme="light"] .team-add-form-card {
          background: #FFFFFF !important;
          border: 1.5px solid #CBD5E1 !important;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05) !important;
        }

        .cms-theme-light .team-add-form-card h4,
        [data-cms-theme="light"] .team-add-form-card h4 {
          color: #0F172A !important;
        }

        .cms-theme-light .form-helper,
        [data-cms-theme="light"] .form-helper {
          color: #475569 !important;
        }

        .cms-theme-light .form-group label,
        [data-cms-theme="light"] .form-group label {
          color: #0F172A !important;
          font-weight: 700 !important;
        }

        .cms-theme-light .form-group input,
        .cms-theme-light .form-group select,
        [data-cms-theme="light"] .form-group input,
        [data-cms-theme="light"] .form-group select {
          background: #FFFFFF !important;
          border: 1.5px solid #CBD5E1 !important;
          color: #0F172A !important;
        }

        .cms-theme-light .btn-action-delete,
        [data-cms-theme="light"] .btn-action-delete {
          border-color: #CBD5E1 !important;
          color: #64748B !important;
        }
      `}</style>
    </div>
  );
}
