import React, { useState } from 'react';
import { X, Send, MessageCircle, PhoneCall, CheckCircle } from 'lucide-react';

export default function QuickBookingModal({ selectedTour, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState(selectedTour ? selectedTour.title : '');
  const [travelers, setTravelers] = useState('2');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const message = `Hi Comfort Journey!%0A*New Booking Inquiry*%0A- *Name:* ${encodeURIComponent(name)}%0A- *Phone:* ${encodeURIComponent(phone)}%0A- *Destination:* ${encodeURIComponent(destination || 'General Inquiry')}%0A- *Travelers:* ${encodeURIComponent(travelers)}%0A- *Travel Date:* ${encodeURIComponent(date || 'Flexible')}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/918770403315?text=${message}`, '_blank');
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal-body" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="badge badge-accent">Quick Inquiry</span>
            <h3 className="modal-title">
              {selectedTour ? `Book ${selectedTour.title}` : 'Request Custom Tour Quote'}
            </h3>
            <p className="modal-subtitle">
              Get an instant customized itinerary & price quote from our travel experts.
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <div className="submitted-view">
            <CheckCircle size={60} className="success-icon" />
            <h4>Thank You, {name}!</h4>
            <p>Your inquiry is opening in WhatsApp. Our Bhopal travel desk will connect with you within 15 minutes.</p>
            <button className="btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Your Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Ramesh Kumar" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone / WhatsApp Number *</label>
              <input 
                type="tel" 
                placeholder="e.g. +91 9876543210" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Destination / Package</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kashmir, Bali, Dubai" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Number of Travelers</label>
                <select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons (Couple)</option>
                  <option value="3-5">3 - 5 Persons (Family)</option>
                  <option value="6+">6+ Persons (Group)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tentative Travel Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-whatsapp submit-btn">
                <MessageCircle size={18} />
                Send Inquiry via WhatsApp
              </button>
            </div>

            <p className="direct-call-hint">
              Prefer calling? Talk directly to our travel expert at <a href="tel:+918770403315">+91 8770403315</a>
            </p>
          </form>
        )}
      </div>

      <style>{`
        .booking-modal-body {
          padding: 2rem;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-secondary);
        }

        .form-group input, .form-group select {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus, .form-group select:focus {
          border-color: var(--color-primary);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 0.9rem;
        }

        .direct-call-hint {
          text-align: center;
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .direct-call-hint a {
          color: var(--color-primary);
          font-weight: 700;
        }

        .submitted-view {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .success-icon {
          color: var(--color-accent);
        }

        @media (max-width: 600px) {
          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .booking-modal-body {
            border-radius: 20px 20px 0 0;
            max-height: 90vh;
            padding: 1.25rem;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
