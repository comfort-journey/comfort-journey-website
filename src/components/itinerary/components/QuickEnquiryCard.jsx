import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, CheckCircle2, User, Phone, Calendar, Users, FileText, Sparkles, RotateCcw } from 'lucide-react';
import { getTravelerProfile, saveLeadToCMS } from '../../../services/leadStorageService';
import { COUNTRY_CODES } from '../../../utils/countryCodes';
import { useUserAuth } from '../../../context/UserAuthContext';
import './styles/QuickEnquiryCard.css';

export default function QuickEnquiryCard({ tour, onClose }) {
  const profile = getTravelerProfile();
  const { user, isAuthenticated } = useUserAuth();
  const dateInputRef = useRef(null);
  const [countryCode, setCountryCode] = useState('+91');
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    guests: '2 Persons (Couple)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill from SSO/auth user first, then fallback to traveler profile
  useEffect(() => {
    const ssoName = isAuthenticated && user?.name ? user.name : '';
    const ssoEmail = isAuthenticated && user?.email ? user.email : '';
    const ssoPhone = isAuthenticated && user?.phone ? user.phone.replace(/^\+\d+\s*/, '') : '';

    setFormData(prev => ({
      ...prev,
      name: ssoName || profile.name || prev.name,
      phone: ssoPhone || (profile.phone || '').replace(/^\+\d+\s*/, '') || prev.phone,
      guests: profile.guests || prev.guests
    }));
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (consentError) setConsentError(false);
  };

  const handleOpenCalendar = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker?.();
      } catch (err) {
        dateInputRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    if (!consentChecked) {
      setConsentError(true);
      setError('Please agree to the Privacy Policy before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    const fullPhoneNumber = `${countryCode} ${formData.phone.trim()}`;

    const leadData = {
      tourId: tour?.id || tour?.slug,
      tourName: tour?.name,
      destination: tour?.destination || tour?.location,
      duration: tour?.duration,
      ...formData,
      phone: fullPhoneNumber,
      source: 'Quick Enquiry Card'
    };

    // Dual-Action: Save to CMS first (async), then redirect to WhatsApp
    const { lead } = await saveLeadToCMS(leadData);

    // Dispatch custom event for global listeners
    window.dispatchEvent(new CustomEvent('tour-enquiry-submitted', { detail: lead || leadData }));

    // Format WhatsApp message
    const waText = encodeURIComponent(
      `Hi Comfort Journey! I'm requesting an instant custom quote:\n` +
      `📍 Tour: ${tour?.name || 'Curated Tour'}\n` +
      `⏱️ Duration: ${tour?.duration || 'Flexible'}\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${fullPhoneNumber}\n` +
      `🗓️ Date: ${formData.travelDate || 'Flexible'}\n` +
      `👥 Guests: ${formData.guests}\n` +
      (formData.notes ? `📝 Note: ${formData.notes}\n` : '') +
      `Please share availability and customized quotation!`
    );

    const waLink = `https://wa.me/919203931912?text=${waText}`;
    setLastWaUrl(waLink);

    setLoading(false);
    setSubmitted(true);
    // Redirect to WhatsApp after CMS save completes
    window.open(waLink, '_blank');
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="quick-enquiry-card submitted">
        <div className="enquiry-success-box">
          <div className="success-icon-ring">
            <CheckCircle2 size={36} className="text-emerald" />
          </div>
          <h4>Enquiry Saved & Prepared!</h4>
          <p>
            Thank you, <strong>{formData.name}</strong>. Your customized request for <strong>{tour?.name}</strong> has been saved with our VIP desk.
          </p>

          <div className="enquiry-whatsapp-prompt">
            <p className="wa-help-note">
              WhatsApp opened in a new tab. If you came back without sending, tap below to launch your chat anytime:
            </p>
            <a
              href={lastWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reopen-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Send / Reopen on WhatsApp</span>
            </a>
          </div>

          <div className="enquiry-secondary-actions">
            <button
              type="button"
              className="btn-enquiry-edit"
              onClick={() => setSubmitted(false)}
            >
              ✏️ Edit Enquiry Details
            </button>
            <button
              type="button"
              className="btn-enquiry-reset"
              onClick={() => {
                setFormData({
                  name: '',
                  phone: '',
                  travelDate: '',
                  guests: '2 Persons (Couple)',
                  notes: ''
                });
                setConsentChecked(false);
                setSubmitted(false);
              }}
            >
              <RotateCcw size={13} />
              <span>Submit Another Request</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quick-enquiry-card" role="region" aria-label="Quick Tour Enquiry Form">
      <div className="enquiry-card-header">
        <div className="header-badge">
          <Sparkles size={13} className="text-amber" />
          <span>Instant Quote</span>
        </div>
        <h4 className="enquiry-card-title">Customize This Itinerary</h4>
        <p className="enquiry-card-subtitle">
          Get a personalized quote for <strong>{tour?.name || 'this tour'}</strong> with your exact dates & hotel preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
        {error && <div className="enquiry-error-msg">{error}</div>}

        <div className="form-field">
          <label htmlFor="enquiry-name">Your Name *</label>
          <div className="input-with-icon">
            <User size={15} className="field-icon" />
            <input
              id="enquiry-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="enquiry-phone">Phone / WhatsApp Number *</label>
          <div className="phone-country-input-row">
            <select
              className="country-code-select"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              aria-label="Select Country Calling Code"
              autoComplete="tel-country-code"
            >
              {COUNTRY_CODES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))}
            </select>
            <div className="input-with-icon phone-number-field">
              <Phone size={15} className="field-icon" />
              <input
                id="enquiry-phone"
                type="tel"
                name="phone"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-field">
            <label htmlFor="enquiry-date">Travel Date</label>
            <div 
              className="input-with-icon date-input-wrapper"
              onClick={handleOpenCalendar}
            >
              <Calendar size={15} className="field-icon calendar-clickable-icon" />
              <input
                ref={dateInputRef}
                id="enquiry-date"
                type="date"
                name="travelDate"
                min={todayStr}
                value={formData.travelDate}
                onChange={handleChange}
                onClick={(e) => {
                  try { e.target.showPicker?.(); } catch (err) {}
                }}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-guests">Guests</label>
            <div className="input-with-icon select-with-icon-wrapper">
              <Users size={15} className="field-icon select-front-icon" />
              <select
                id="enquiry-guests"
                name="guests"
                className="enquiry-guests-select"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1 Person (Solo)">1 Person (Solo)</option>
                <option value="2 Persons (Couple)">2 Persons (Couple)</option>
                <option value="3-4 Persons (Family)">3-4 Persons (Family)</option>
                <option value="5+ Persons (Group)">5+ Persons (Group)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="enquiry-notes">Special Preferences (Optional)</label>
          <div className="input-with-icon">
            <FileText size={15} className="field-icon top-align" />
            <textarea
              id="enquiry-notes"
              name="notes"
              rows={2}
              placeholder="e.g. 5-star hotel upgrade, honeymoon cake, vegetarian meals..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Legal Consent Checkbox */}
        <div className={`consent-checkbox-row ${consentError ? 'consent-error' : ''}`}>
          <label className="consent-label">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => {
                setConsentChecked(e.target.checked);
                if (e.target.checked) setConsentError(false);
              }}
            />
            <span className="consent-text">
              I agree to the{' '}
              <a
                href="#/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-policy-modal', { detail: 'privacy' }));
                  }
                }}
                className="consent-link"
              >
                Privacy Policy
              </a>{' '}
              and consent to being contacted via WhatsApp and Email with itineraries and offers.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="btn-submit-enquiry"
          disabled={loading}
        >
          {loading ? (
            <span>Saving & Redirecting...</span>
          ) : (
            <>
              <Send size={16} />
              <span>Request Free Custom Quote</span>
            </>
          )}
        </button>

        <p className="enquiry-privacy-note">
          🔒 Zero spam guarantee. We connect via WhatsApp/Phone within 15 mins.
        </p>
      </form>
    </div>
  );
}
