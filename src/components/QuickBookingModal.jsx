import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle2, ArrowRight, ArrowLeft, Calendar, Users, Hotel, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';
import { getTravelerProfile, saveLeadToCMS } from '../services/leadStorageService';
import { COUNTRY_CODES } from '../utils/countryCodes';
import { useUserAuth } from '../context/UserAuthContext';

export default function QuickBookingModal({ selectedTour, onClose }) {
  const profile = getTravelerProfile();
  const { user, isAuthenticated } = useUserAuth();
  const [step, setStep] = useState(1);
  const [countryCode, setCountryCode] = useState('+91');
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    destination: selectedTour ? (selectedTour.name || selectedTour.title) : (TOURS_DATA[0]?.name || 'Peace In The Pines'),
    travelMonth: 'Next 30 Days (Immediate)',
    exactDate: '',
    duration: '5–7 Days',
    travelers: profile.guests || '2 Persons (Couple)',
    pace: 'Moderate & Scenic',
    hotelTier: '4-Star Premium Deluxe',
    transportType: 'Private SUV (Toyota Innova Crysta)',
    name: (isAuthenticated && user?.name) || profile.name || '',
    phone: (isAuthenticated && user?.phone ? user.phone.replace(/^\+\d+\s*/, '') : '') || (profile.phone || '').replace(/^\+\d+\s*/, '') || '',
    email: (isAuthenticated && user?.email) || profile.email || '',
    specialNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  // Sync profile and SSO user if filled or logged in
  useEffect(() => {
    const fresh = getTravelerProfile();
    const ssoName = isAuthenticated && user?.name ? user.name : '';
    const ssoPhone = isAuthenticated && user?.phone ? user.phone.replace(/^\+\d+\s*/, '') : '';
    const ssoEmail = isAuthenticated && user?.email ? user.email : '';

    setFormData(prev => ({
      ...prev,
      name: ssoName || prev.name || fresh.name || '',
      phone: ssoPhone || prev.phone || (fresh.phone || '').replace(/^\+\d+\s*/, '') || '',
      email: ssoEmail || prev.email || fresh.email || '',
      travelers: fresh.guests || prev.travelers
    }));
  }, [isAuthenticated, user]);

  const updateField = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.destination) return;
    if (step < 5) {
      setStep(prev => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    if (!consentChecked) {
      setConsentError(true);
      return;
    }

    setConsentError(false);
    setIsSubmitting(true);

    const fullPhoneNumber = `${countryCode} ${formData.phone.trim()}`;

    const leadData = {
      destination: formData.destination,
      tourName: formData.destination,
      travelDate: `${formData.travelMonth} ${formData.exactDate ? `(${formData.exactDate})` : ''}`,
      duration: formData.duration,
      travelers: formData.travelers,
      guests: formData.travelers,
      pace: formData.pace,
      hotelTier: formData.hotelTier,
      transportType: formData.transportType,
      name: formData.name,
      phone: fullPhoneNumber,
      email: formData.email,
      specialNotes: formData.specialNotes,
      source: '5-Step Bespoke Enquiry Modal'
    };

    // Dual-Action: Save lead centrally in Directus CMS + local CRM storage first
    await saveLeadToCMS(leadData);

    const message = `Hi Comfort Journey! I would like to request a bespoke tour proposal:
📍 *Destination:* ${formData.destination}
🗓️ *Travel Timeline:* ${formData.travelMonth} ${formData.exactDate ? `(${formData.exactDate})` : ''}
⏱️ *Duration:* ${formData.duration}
👥 *Travelers & Pace:* ${formData.travelers} • ${formData.pace}
🏨 *Hotel Standard:* ${formData.hotelTier}
🚗 *Transport:* ${formData.transportType}
👤 *Primary Guest:* ${formData.name}
📞 *Contact:* ${fullPhoneNumber}
${formData.specialNotes ? `📝 *Notes:* ${formData.specialNotes}` : ''}

Please share a detailed day-wise itinerary & quote!`;

    setSubmittedMessage(message);
    setIsSubmitting(false);
    setSubmitted(true);
    // WhatsApp redirect
    window.open(`https://wa.me/919203931912?text=${encodeURIComponent(message)}`, '_blank');
  };

  const quickDestinations = (TOURS_DATA && TOURS_DATA.length > 0)
    ? TOURS_DATA.slice(0, 8).map(t => t.name)
    : ['Peace In The Pines', 'Karnataka Heritage & Hills', 'Goa Weekend Vibe', 'Phuket Paradise Getaway', 'Bali Tropical Escape', 'Dubai City & Sands'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal-5step luxury-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-5step">
          <div className="step-indicator-lockup">
            <span className="badge badge-amber">5-Step Bespoke Enquiry</span>
            <span className="step-count-text">Step {step} of 5</span>
          </div>
          <button className="close-btn-round" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Top Progress Bar */}
        <div className="enquiry-progress-track">
          <div className="enquiry-progress-fill" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        <div className="booking-modal-body-pad">
          {submitted ? (
            <div className="submitted-view text-center">
              <div className="submitted-icon-circle">
                <CheckCircle2 size={54} color="#DAF561" />
              </div>
              <h3 className="font-editorial submitted-title">Thank You, {formData.name}!</h3>
              <p className="submitted-sub">
                Your bespoke trip itinerary request has been compiled and is opening directly in WhatsApp. Our senior trip designers in Bhopal will share your day-by-day plan within 15 minutes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '380px', margin: '20px auto 0' }}>
                <a
                  href={`https://wa.me/919203931912?text=${encodeURIComponent(submittedMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ textDecoration: 'none', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '10px', background: '#25D366', color: '#000', fontWeight: 'bold' }}
                >
                  <MessageCircle size={18} />
                  <span>Send / Reopen on WhatsApp</span>
                </a>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setSubmitted(false)}
                    style={{ fontSize: '0.88rem', padding: '10px 16px' }}
                  >
                    ✏️ Edit Enquiry Details
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={onClose}
                    style={{ fontSize: '0.88rem', padding: '10px 16px' }}
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: DESTINATION */}
              {step === 1 && (
                <div className="step-pane">
                  <div className="step-title-row">
                    <MapPin size={22} className="text-amber" />
                    <div>
                      <h3 className="step-heading font-editorial">Where is your heart set on traveling?</h3>
                      <p className="step-desc">Select or type your dream destination.</p>
                    </div>
                  </div>

                  <div className="quick-dest-buttons">
                    {quickDestinations.map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`dest-select-btn ${formData.destination === d ? 'active' : ''}`}
                        onClick={() => updateField('destination', d)}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  <div className="form-group mt-3">
                    <label>Or type any custom destination worldwide:</label>
                    <input
                      type="text"
                      placeholder="e.g. Iceland Aurora, Amalfi Coast, Vietnam..."
                      value={formData.destination}
                      onChange={(e) => updateField('destination', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: DATES & SEASON */}
              {step === 2 && (
                <div className="step-pane">
                  <div className="step-title-row">
                    <Calendar size={22} className="text-aqua" />
                    <div>
                      <h3 className="step-heading font-editorial">When would you like to travel?</h3>
                      <p className="step-desc">Choose your tentative travel window.</p>
                    </div>
                  </div>

                  <div className="options-grid-2col">
                    {['Next 30 Days (Immediate)', 'In 1 to 3 Months', 'Upcoming Summer Vacation', 'Upcoming Autumn / Festive', 'Winter Snow Season', 'Dates Flexible'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`grid-select-btn ${formData.travelMonth === m ? 'active' : ''}`}
                        onClick={() => updateField('travelMonth', m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="form-row mt-3">
                    <div className="form-group flex-1">
                      <label>Approximate Trip Duration</label>
                      <select value={formData.duration} onChange={(e) => updateField('duration', e.target.value)}>
                        <option value="3–4 Days (Weekend Getaway)">3–4 Days (Quick Getaway)</option>
                        <option value="5–7 Days (Standard Vacation)">5–7 Days (Most Popular)</option>
                        <option value="8–10 Days (Comprehensive Tour)">8–10 Days (Comprehensive)</option>
                        <option value="11–15 Days (Grand International)">11–15 Days (Grand International)</option>
                      </select>
                    </div>
                    <div className="form-group flex-1">
                      <label>Exact Departure Date (Optional)</label>
                      <input
                        type="date"
                        value={formData.exactDate}
                        onChange={(e) => updateField('exactDate', e.target.value)}
                        onClick={(e) => {
                          try {
                            e.target.showPicker();
                          } catch (_) {}
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: TRAVELLERS & PACE */}
              {step === 3 && (
                <div className="step-pane">
                  <div className="step-title-row">
                    <Users size={22} className="text-lime" />
                    <div>
                      <h3 className="step-heading font-editorial">Who is traveling & preferred pace?</h3>
                      <p className="step-desc">Helps us curate appropriate rooms, vehicles, and pace.</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Group Dynamics</label>
                    <div className="options-grid-2col">
                      {['2 Persons (Couple / Honeymoon)', 'Family with Children & Elders', 'Friends Squad (3 to 6)', 'Large Group / Corporate MICE (6+)', 'Solo Explorer'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`grid-select-btn ${formData.travelers === t ? 'active' : ''}`}
                          onClick={() => updateField('travelers', t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>Preferred Travel Pace</label>
                    <div className="options-grid-3col">
                      {['Relaxed & Leisurely', 'Moderate & Scenic', 'Fast-Paced & Packed'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={`grid-select-btn ${formData.pace === p ? 'active' : ''}`}
                          onClick={() => updateField('pace', p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: HOTEL & TRANSPORT TIER */}
              {step === 4 && (
                <div className="step-pane">
                  <div className="step-title-row">
                    <Hotel size={22} className="text-amber" />
                    <div>
                      <h3 className="step-heading font-editorial">Choose your comfort standards</h3>
                      <p className="step-desc">All tiers include verified 100% sanitized vehicles & verified properties.</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Accommodation Preference</label>
                    <div className="options-grid-3col">
                      {[
                        { id: '3-Star Standard', label: '3-Star Comfort', sub: 'Clean, safe boutique stays' },
                        { id: '4-Star Premium Deluxe', label: '4-Star Premium', sub: 'Deluxe view rooms & buffet' },
                        { id: '5-Star Palace / Villa', label: '5-Star Royal Palace', sub: 'Heritage palaces & luxury villas' }
                      ].map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          className={`tier-choice-btn ${formData.hotelTier === h.id ? 'active' : ''}`}
                          onClick={() => updateField('hotelTier', h.id)}
                        >
                          <strong>{h.label}</strong>
                          <small>{h.sub}</small>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>Private Vehicle Preference</label>
                    <div className="options-grid-3col">
                      {[
                        { id: 'Private AC Sedan (Dzire / Etios)', label: 'Private AC Sedan' },
                        { id: 'Private SUV (Toyota Innova Crysta)', label: 'SUV Innova Crysta' },
                        { id: 'VIP Luxury Sprinter / Coach', label: 'VIP Coach / Tempo' }
                      ].map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          className={`grid-select-btn ${formData.transportType === v.id ? 'active' : ''}`}
                          onClick={() => updateField('transportType', v.id)}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: CONTACT DETAILS */}
              {step === 5 && (
                <div className="step-pane">
                  <div className="step-title-row">
                    <Sparkles size={22} className="text-gold" />
                    <div>
                      <h3 className="step-heading font-editorial">Where should we send your quote?</h3>
                      <p className="step-desc">Zero spam guarantee. Directly connected to our Bhopal VIP Desk.</p>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group flex-1">
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="e.g. Rishabh Sharma"
                        required
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label>Phone / WhatsApp Number *</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                          className="modal-country-code-select"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          aria-label="Country Calling Code"
                          autoComplete="tel-country-code"
                          style={{
                            width: '125px',
                            flexShrink: 0,
                            padding: '10px 8px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255,255,255,0.18)',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'inherit',
                            fontSize: '0.85rem'
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={`${c.code}-${c.dial}`} value={c.dial} style={{ background: '#0a192f', color: '#fff' }}>
                              {c.code} ({c.dial})
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel-national"
                          style={{ flex: 1 }}
                          placeholder="e.g. 98765 43210"
                          required
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-2">
                    <label>Special Requests or Flight Requirements (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need flight tickets from Bhopal / Indore, veg Jain food, celebrating anniversary..."
                      value={formData.specialNotes}
                      onChange={(e) => updateField('specialNotes', e.target.value)}
                    />
                  </div>

                  <div className="summary-recap-box">
                    <strong>Trip Summary:</strong>
                    <span>{formData.destination} • {formData.travelMonth} • {formData.travelers} • {formData.hotelTier}</span>
                  </div>

                  {/* Mandatory Legal Consent Checkbox */}
                  <div className={`modal-consent-row ${consentError ? 'consent-error' : ''}`}>
                    <label className="modal-consent-label">
                      <input
                        type="checkbox"
                        checked={consentChecked}
                        onChange={(e) => {
                          setConsentChecked(e.target.checked);
                          if (e.target.checked) setConsentError(false);
                        }}
                      />
                      <span className="modal-consent-text">
                        I agree to the{' '}
                        <a
                          href="#/privacy-policy"
                          onClick={(e) => {
                            e.preventDefault();
                            if (typeof window !== 'undefined') {
                              window.dispatchEvent(new CustomEvent('open-policy-modal', { detail: 'privacy' }));
                            }
                          }}
                          className="modal-consent-link"
                        >
                          Privacy Policy
                        </a>{' '}
                        and consent to being contacted via WhatsApp and Email with itineraries and offers.
                      </span>
                    </label>
                    {consentError && (
                      <p className="modal-consent-err-msg">
                        Please agree to the Privacy Policy to proceed.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="step-nav-footer">
                {step > 1 && (
                  <button type="button" className="btn-secondary" onClick={() => setStep(prev => prev - 1)}>
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                )}

                {step < 5 ? (
                  <button type="button" className="btn-primary ml-auto" onClick={handleNext}>
                    <span>Next: Step {step + 1}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className="btn-whatsapp ml-auto" 
                    onClick={handleFinalSubmit}
                    disabled={!formData.name || !formData.phone || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Saving & Redirecting...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle size={18} />
                        <span>Get Instant Itinerary on WhatsApp</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <style>{`
          .booking-modal-5step {
            max-width: 680px;
            background: #001233;
            border: 1.5px solid rgba(111, 230, 252, 0.3);
            border-radius: 26px;
            overflow: hidden;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8);
          }

          .modal-header-5step {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.75rem;
            background: #000E26;
            border-bottom: 1px solid rgba(111, 230, 252, 0.15);
          }

          .step-indicator-lockup {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }

          .step-count-text {
            font-size: 0.84rem;
            color: var(--cj-text-muted);
            font-weight: 700;
          }

          .close-btn-round {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: var(--cj-text-heading);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .close-btn-round:hover {
            background: #FF892F;
            color: var(--cj-text-heading);
            transform: rotate(90deg);
          }

          .enquiry-progress-track {
            height: 4px;
            background: rgba(0, 29, 81, 0.9);
            width: 100%;
          }

          .enquiry-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #6FE6FC, #FF892F, #DAF561);
            transition: width 0.3s ease;
          }

          .booking-modal-body-pad {
            padding: 1.75rem;
          }

          .step-title-row {
            display: flex;
            align-items: flex-start;
            gap: 0.85rem;
            margin-bottom: 1.25rem;
          }

          .step-heading {
            font-size: 1.35rem;
            color: var(--cj-text-heading);
            margin-bottom: 0.2rem;
          }

          .step-desc {
            font-size: 0.84rem;
            color: var(--cj-text-muted);
          }

          .quick-dest-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .dest-select-btn {
            background: rgba(0, 29, 81, 0.6);
            border: 1px solid rgba(111, 230, 252, 0.2);
            color: var(--cj-text-heading);
            padding: 0.45rem 0.85rem;
            border-radius: var(--radius-full);
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .dest-select-btn:hover, .dest-select-btn.active {
            background: rgba(255, 137, 47, 0.2);
            border-color: #FF892F;
            color: #FF892F;
          }

          .options-grid-2col {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          @media (min-width: 500px) {
            .options-grid-2col {
              grid-template-columns: 1fr 1fr;
            }
          }

          .options-grid-3col {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          @media (min-width: 500px) {
            .options-grid-3col {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .grid-select-btn {
            background: rgba(0, 29, 81, 0.6);
            border: 1.5px solid rgba(111, 230, 252, 0.2);
            color: var(--cj-text-heading);
            padding: 0.75rem;
            border-radius: 14px;
            font-size: 0.84rem;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s ease;
          }

          .grid-select-btn:hover {
            border-color: #6FE6FC;
            background: rgba(5, 38, 105, 0.8);
          }

          .grid-select-btn.active {
            background: rgba(255, 137, 47, 0.15);
            border-color: #FF892F;
            color: #FF892F;
            box-shadow: 0 0 15px rgba(255, 137, 47, 0.2);
          }

          .tier-choice-btn {
            background: rgba(0, 29, 81, 0.6);
            border: 1.5px solid rgba(111, 230, 252, 0.2);
            color: var(--cj-text-heading);
            padding: 0.85rem;
            border-radius: 16px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            text-align: left;
            transition: all 0.2s ease;
          }

          .tier-choice-btn:hover {
            border-color: #6FE6FC;
          }

          .tier-choice-btn.active {
            border-color: #FF892F;
            background: rgba(255, 137, 47, 0.15);
          }

          .tier-choice-btn strong {
            font-size: 0.88rem;
            color: var(--cj-text-heading);
          }

          .tier-choice-btn small {
            font-size: 0.74rem;
            color: var(--cj-text-muted);
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }

          .form-group label {
            font-size: 0.82rem;
            color: var(--cj-text-muted);
            font-weight: 700;
          }

          .form-group input, .form-group select, .form-group textarea {
            background: rgba(0, 18, 51, 0.8);
            border: 1px solid rgba(111, 230, 252, 0.25);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            color: var(--cj-text-heading);
            font-family: var(--font-ui);
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.2s ease;
          }

          .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            border-color: #FF892F;
            box-shadow: 0 0 12px rgba(255, 137, 47, 0.25);
          }

          .form-row {
            display: flex;
            gap: 1rem;
          }

          .flex-1 {
            flex: 1;
          }

          .mt-2 { margin-top: 0.75rem; }
          .mt-3 { margin-top: 1rem; }
          .ml-auto { margin-left: auto; }

          .summary-recap-box {
            background: rgba(0, 18, 51, 0.8);
            border: 1px solid rgba(218, 245, 97, 0.3);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            font-size: 0.8rem;
            color: var(--cj-text-muted);
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }

          .summary-recap-box strong {
            color: #DAF561;
          }

          .step-nav-footer {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1.5rem;
            padding-top: 1.25rem;
            border-top: 1px solid rgba(111, 230, 252, 0.15);
          }

          .submitted-view {
            padding: 2rem 1rem;
          }

          .submitted-icon-circle {
            margin-bottom: 1rem;
          }

          .submitted-title {
            font-size: 1.8rem;
            color: var(--cj-text-heading);
            margin-bottom: 0.5rem;
          }

          .submitted-sub {
            font-size: 0.9rem;
            color: var(--cj-text-muted);
            max-width: 480px;
            margin: 0 auto 1.5rem auto;
            line-height: 1.5;
          }

          /* ══════════════════════════════════════════════════
             DUAL THEME — Light & Dark theme support
             ══════════════════════════════════════════════════ */
          :root:not([data-theme="dark"]) .booking-modal-5step,
          [data-theme="light"] .booking-modal-5step {
            background: #FFFFFF !important;
            border: 1px solid var(--cj-line, #E2E8F0) !important;
            box-shadow: 0 25px 70px rgba(20, 38, 74, 0.18), 0 0 1px rgba(20, 38, 74, 0.1) !important;
          }

          :root:not([data-theme="dark"]) .modal-header-5step,
          [data-theme="light"] .modal-header-5step {
            background: #F8FAFC !important;
            border-bottom: 1px solid #E2E8F0 !important;
          }

          :root:not([data-theme="dark"]) .close-btn-round,
          [data-theme="light"] .close-btn-round {
            background: #E2E8F0 !important;
            color: #475569 !important;
          }
          :root:not([data-theme="dark"]) .close-btn-round:hover,
          [data-theme="light"] .close-btn-round:hover {
            background: #FF892F !important;
            color: #FFFFFF !important;
          }

          :root:not([data-theme="dark"]) .step-count-text,
          [data-theme="light"] .step-count-text {
            color: #64748B !important;
          }

          :root:not([data-theme="dark"]) .step-heading,
          [data-theme="light"] .step-heading {
            color: #0F172A !important;
          }

          :root:not([data-theme="dark"]) .step-desc,
          [data-theme="light"] .step-desc {
            color: #64748B !important;
          }

          :root:not([data-theme="dark"]) .dest-select-btn,
          [data-theme="light"] .dest-select-btn {
            background: #F8FAFC !important;
            border: 1.5px solid #CBD5E1 !important;
            color: #1E293B !important;
            font-weight: 700 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
          }
          :root:not([data-theme="dark"]) .dest-select-btn:hover,
          [data-theme="light"] .dest-select-btn:hover {
            background: #FFF7ED !important;
            border-color: #FF892F !important;
            color: #EA580C !important;
            transform: translateY(-1px);
          }
          :root:not([data-theme="dark"]) .dest-select-btn.active,
          [data-theme="light"] .dest-select-btn.active {
            background: linear-gradient(135deg, #FF892F, #FF6B00) !important;
            border-color: #FF892F !important;
            color: #FFFFFF !important;
            box-shadow: 0 4px 14px rgba(255, 107, 0, 0.35) !important;
          }

          :root:not([data-theme="dark"]) .grid-select-btn,
          [data-theme="light"] .grid-select-btn {
            background: #F8FAFC !important;
            border: 1.5px solid #CBD5E1 !important;
            color: #1E293B !important;
            font-weight: 700 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
          }
          :root:not([data-theme="dark"]) .grid-select-btn:hover,
          [data-theme="light"] .grid-select-btn:hover {
            background: #FFF7ED !important;
            border-color: #FF892F !important;
            color: #EA580C !important;
          }
          :root:not([data-theme="dark"]) .grid-select-btn.active,
          [data-theme="light"] .grid-select-btn.active {
            background: #FFF7ED !important;
            border-color: #EA580C !important;
            color: #EA580C !important;
            box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.25) !important;
            font-weight: 800 !important;
          }

          :root:not([data-theme="dark"]) .tier-choice-btn,
          [data-theme="light"] .tier-choice-btn {
            background: #F8FAFC !important;
            border: 1.5px solid #CBD5E1 !important;
            color: #1E293B !important;
          }
          :root:not([data-theme="dark"]) .tier-choice-btn:hover,
          [data-theme="light"] .tier-choice-btn:hover {
            border-color: #FF892F !important;
            background: #FFF7ED !important;
          }
          :root:not([data-theme="dark"]) .tier-choice-btn.active,
          [data-theme="light"] .tier-choice-btn.active {
            border-color: #EA580C !important;
            background: #FFF7ED !important;
            box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.25) !important;
          }
          :root:not([data-theme="dark"]) .tier-choice-btn strong,
          [data-theme="light"] .tier-choice-btn strong {
            color: #0F172A !important;
          }
          :root:not([data-theme="dark"]) .tier-choice-btn small,
          [data-theme="light"] .tier-choice-btn small {
            color: #64748B !important;
          }

          :root:not([data-theme="dark"]) .form-group label,
          [data-theme="light"] .form-group label {
            color: #334155 !important;
            font-weight: 700 !important;
          }

          :root:not([data-theme="dark"]) .form-group input,
          :root:not([data-theme="dark"]) .form-group select,
          :root:not([data-theme="dark"]) .form-group textarea,
          [data-theme="light"] .form-group input,
          [data-theme="light"] .form-group select,
          [data-theme="light"] .form-group textarea {
            background: #FFFFFF !important;
            border: 1.5px solid #CBD5E1 !important;
            color: #0F172A !important;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04) !important;
          }
          :root:not([data-theme="dark"]) .form-group input:focus,
          :root:not([data-theme="dark"]) .form-group select:focus,
          :root:not([data-theme="dark"]) .form-group textarea:focus,
          [data-theme="light"] .form-group input:focus,
          [data-theme="light"] .form-group select:focus,
          [data-theme="light"] .form-group textarea:focus {
            border-color: #FF892F !important;
            box-shadow: 0 0 0 3px rgba(255, 137, 47, 0.2) !important;
          }
          :root:not([data-theme="dark"]) .form-group input::placeholder,
          :root:not([data-theme="dark"]) .form-group textarea::placeholder,
          [data-theme="light"] .form-group input::placeholder,
          [data-theme="light"] .form-group textarea::placeholder {
            color: #94A3B8 !important;
          }

          :root:not([data-theme="dark"]) .summary-recap-box,
          [data-theme="light"] .summary-recap-box {
            background: #F1F5F9 !important;
            border: 1px solid #CBD5E1 !important;
            color: #334155 !important;
          }
          :root:not([data-theme="dark"]) .summary-recap-box strong,
          [data-theme="light"] .summary-recap-box strong {
            color: #D97706 !important;
          }

          :root:not([data-theme="dark"]) .step-nav-footer,
          [data-theme="light"] .step-nav-footer {
            border-top: 1px solid #E2E8F0 !important;
          }

          :root:not([data-theme="dark"]) .btn-secondary,
          [data-theme="light"] .btn-secondary {
            background: #F1F5F9 !important;
            border: 1.5px solid #CBD5E1 !important;
            color: #1E293B !important;
            font-weight: 700 !important;
          }

          :root:not([data-theme="dark"]) .btn-primary,
          [data-theme="light"] .btn-primary {
            background: linear-gradient(135deg, #FF892F, #FF6B00) !important;
            color: #FFFFFF !important;
            font-weight: 800 !important;
            border: none !important;
            box-shadow: 0 4px 14px rgba(255, 107, 0, 0.35) !important;
          }

          :root:not([data-theme="dark"]) .btn-whatsapp,
          [data-theme="light"] .btn-whatsapp {
            background: linear-gradient(135deg, #25D366, #128C7E) !important;
            color: #FFFFFF !important;
            font-weight: 800 !important;
            box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35) !important;
          }

          :root:not([data-theme="dark"]) .submitted-title,
          [data-theme="light"] .submitted-title {
            color: #0F172A !important;
          }

          :root:not([data-theme="dark"]) .submitted-sub,
          [data-theme="light"] .submitted-sub {
            color: #475569 !important;
          }

          /* DARK THEME CONTRAST ASSURANCE */
          [data-theme="dark"] .step-heading {
            color: #FFFFFF !important;
          }
          [data-theme="dark"] .form-group input,
          [data-theme="dark"] .form-group textarea {
            color: #FFFFFF !important;
          }

          /* Consent Checkbox Row */
          .modal-consent-row {
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            background: rgba(111, 230, 252, 0.05);
            border: 1px solid rgba(111, 230, 252, 0.2);
            transition: all 0.25s ease;
          }

          .modal-consent-row.consent-error {
            background: rgba(239, 68, 68, 0.1);
            border-color: #EF4444;
          }

          .modal-consent-label {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            cursor: pointer;
            margin: 0;
          }

          .modal-consent-label input[type="checkbox"] {
            margin-top: 3px;
            width: 17px;
            height: 17px;
            accent-color: #FF892F;
            cursor: pointer;
            flex-shrink: 0;
          }

          .modal-consent-text {
            font-size: 0.82rem;
            line-height: 1.45;
            color: #CBD5E1;
          }

          [data-theme="light"] .modal-consent-text {
            color: #334155 !important;
          }

          .modal-consent-link {
            color: #6FE6FC;
            text-decoration: underline;
            font-weight: 600;
          }

          [data-theme="light"] .modal-consent-link {
            color: #0284C7 !important;
          }

          .modal-consent-err-msg {
            margin: 6px 0 0 27px;
            color: #EF4444;
            font-size: 0.78rem;
            font-weight: 600;
          }
        `}</style>
      </div>
    </div>
  );
}


