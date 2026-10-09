import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle2, User, Phone, Calendar, Users, FileText, Sparkles } from 'lucide-react';
import './styles/QuickEnquiryCard.css';

export default function QuickEnquiryCard({ tour, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    guests: '2 Persons (Couple)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    const leadData = {
      tourId: tour?.id || tour?.slug,
      tourName: tour?.name,
      destination: tour?.destination || tour?.location,
      duration: tour?.duration,
      ...formData,
      timestamp: new Date().toISOString()
    };

    // Save lead to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('cj_enquiries') || '[]');
      existing.unshift(leadData);
      localStorage.setItem('cj_enquiries', JSON.stringify(existing.slice(0, 50)));
    } catch (err) {
      console.warn('Failed to save enquiry locally:', err);
    }

    // Dispatch custom event for CMS or global listeners
    window.dispatchEvent(new CustomEvent('tour-enquiry-submitted', { detail: leadData }));

    // Format WhatsApp message
    const waText = encodeURIComponent(
      `Hi Comfort Journey! I'm requesting an instant custom quote:\n` +
      `📍 Tour: ${tour?.name || 'Curated Tour'}\n` +
      `⏱️ Duration: ${tour?.duration || 'Flexible'}\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `🗓️ Date: ${formData.travelDate || 'Flexible'}\n` +
      `👥 Guests: ${formData.guests}\n` +
      (formData.notes ? `📝 Note: ${formData.notes}\n` : '') +
      `Please share availability and customized quotation!`
    );

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Auto-prompt WhatsApp
      window.open(`https://wa.me/918770403315?text=${waText}`, '_blank');
    }, 400);
  };

  if (submitted) {
    return (
      <div className="quick-enquiry-card submitted">
        <div className="enquiry-success-box">
          <div className="success-icon-ring">
            <CheckCircle2 size={36} className="text-emerald" />
          </div>
          <h4>Enquiry Received!</h4>
          <p>
            Thank you, <strong>{formData.name}</strong>. Our dedicated destination expert has received your request for <strong>{tour?.name}</strong> and will connect within 15 minutes.
          </p>
          <button
            type="button"
            className="btn-enquiry-reset"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Request
          </button>
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

      <form onSubmit={handleSubmit} className="enquiry-form">
        {error && <div className="enquiry-error-msg">{error}</div>}

        <div className="form-field">
          <label htmlFor="enquiry-name">Your Name *</label>
          <div className="input-with-icon">
            <User size={15} className="field-icon" />
            <input
              id="enquiry-name"
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="enquiry-phone">Phone / WhatsApp Number *</label>
          <div className="input-with-icon">
            <Phone size={15} className="field-icon" />
            <input
              id="enquiry-phone"
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-field">
            <label htmlFor="enquiry-date">Travel Date</label>
            <div className="input-with-icon">
              <Calendar size={15} className="field-icon" />
              <input
                id="enquiry-date"
                type="text"
                name="travelDate"
                placeholder="e.g. Nov 2026"
                value={formData.travelDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="enquiry-guests">Guests</label>
            <div className="input-with-icon">
              <Users size={15} className="field-icon" />
              <select
                id="enquiry-guests"
                name="guests"
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

        <button
          type="submit"
          className="btn-submit-enquiry"
          disabled={loading}
        >
          {loading ? (
            <span>Sending Request...</span>
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
