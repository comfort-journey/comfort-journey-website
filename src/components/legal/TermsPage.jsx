import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, FileCheck, CheckCircle2, Clock, MapPin, Phone, Mail, Award, AlertCircle } from 'lucide-react';
import { seoHeadManager } from '../../utils/seoHeadManager';

export default function TermsPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    seoHeadManager.updateMetadata({
      title: "Terms & Conditions of VIP Booking | Comfort Journey",
      description: "Read Comfort Journey's official Terms and Conditions covering handcrafted itineraries, transparent cancellation rules, payment milestones, and VIP chauffeur standards.",
      url: "/terms-and-conditions/",
      type: "website"
    });
  }, []);

  return (
    <div className="legal-page-root">
      {/* Hero Header */}
      <div className="legal-page-hero">
        <div className="container">
          <nav className="legal-breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={onNavigateHome} className="legal-crumb-link">
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <span className="legal-crumb-sep">/</span>
            <span className="legal-crumb-current">Terms & Conditions</span>
          </nav>

          <div className="legal-badge-pill">
            <FileCheck size={14} className="text-cyan" />
            <span>Comfort Journey VIP Travel Standard · Established 1992</span>
          </div>

          <h1 className="legal-hero-title">Terms & Conditions of Service</h1>
          <p className="legal-hero-subtitle">
            Every journey with Comfort Journey is backed by three decades of travel excellence, transparent pricing, and 24/7 dedicated concierge care.
          </p>
          <div className="legal-meta-row">
            <span>Last Updated: October 2026</span>
            <span className="meta-dot">•</span>
            <span>Version 4.1</span>
            <span className="meta-dot">•</span>
            <span>Applicable to all India & International Bookings</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="legal-content-container container">
        <aside className="legal-toc-sidebar">
          <div className="legal-toc-card">
            <h4>Table of Contents</h4>
            <ul>
              <li><a href="#terms-1">1. Booking Contract & Formation</a></li>
              <li><a href="#terms-2">2. Scope of Travel Services</a></li>
              <li><a href="#terms-3">3. Quotations, Pricing & Inclusions</a></li>
              <li><a href="#terms-4">4. Payment Milestones</a></li>
              <li><a href="#terms-5">5. Cancellation & 100% Refund Policy</a></li>
              <li><a href="#terms-6">6. Flight & Helicopter Transfers</a></li>
              <li><a href="#terms-7">7. Chauffeur & Vehicle Standards</a></li>
              <li><a href="#terms-8">8. Force Majeure & Weather Delays</a></li>
              <li><a href="#terms-9">9. Governing Law & Jurisdiction</a></li>
            </ul>
          </div>
        </aside>

        <main className="legal-body-article">
          {/* Section 1 */}
          <section id="terms-1" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">01</span>
              <h2>Booking Contract & Acceptance</h2>
            </div>
            <p>
              By submitting an inquiry, paying an initial booking token deposit, or using the <code>comfortjourney.in</code> website, you enter into a legally binding contract with <strong>Comfort Journey Tours & Travels</strong> (Bhopal, Madhya Pradesh, India).
            </p>
            <p>
              These Terms & Conditions apply to all private holiday packages, honeymoon circuits, fixed departures, and corporate offsite retreats operated or coordinated by Comfort Journey.
            </p>
          </section>

          {/* Section 2 */}
          <section id="terms-2" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">02</span>
              <h2>Scope of Handcrafted Travel Services</h2>
            </div>
            <p>
              Comfort Journey acts as your premier destination management partner and private concierge. Our services include:
            </p>
            <ul className="legal-bullet-list">
              <li>
                <strong>Curated Stays:</strong> Booking pre-verified luxury hotels, heritage havelis, and boutique resorts in requested categories (Standard Deluxe, 4-Star Premium, or 5-Star VIP).
              </li>
              <li>
                <strong>Dedicated Chauffeur Transportation:</strong> Private sanitized air-conditioned vehicles (e.g. Toyota Innova Crysta, Ertiga, or Luxury Urbania) with experienced commercial mountain/highway drivers.
              </li>
              <li>
                <strong>24/7 Holiday Concierge:</strong> A dedicated tour coordinator assigned via direct WhatsApp and telephone call from arrival to safe return.
              </li>
              <li>
                <strong>Sightseeing & Experience Planning:</strong> Personalized day-by-day itineraries, sunrise timing passes, and local cultural guidance.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="terms-3" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">03</span>
              <h2>Quotations, Pricing & Transparent Inclusions</h2>
            </div>
            <p>
              All prices quoted on our website or shared by our travel designers are presented in Indian Rupees (INR) or selected foreign currencies (USD, EUR, GBP, AED) inclusive of:
            </p>
            <div className="terms-inclusions-grid">
              <div className="inc-pill">✓ All driver allowances & night charges</div>
              <div className="inc-pill">✓ State border taxes & toll permits</div>
              <div className="inc-pill">✓ Parking fees at monuments & airports</div>
              <div className="inc-pill">✓ Fuel & comprehensive vehicle insurance</div>
              <div className="inc-pill">✓ Hotel taxes & GST as specified</div>
              <div className="inc-pill">✓ Daily breakfast as per meal plan</div>
            </div>
            <p className="mt-3 text-sm text-muted">
              <em>Exclusions:</em> Personal expenses (laundry, room service, telephone calls), adventure sports fees (e.g. paragliding, skiing, ATV rentals), monument entrance fees unless explicitly itemized as VIP passes, and guide tips.
            </p>
          </section>

          {/* Section 4 */}
          <section id="terms-4" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">04</span>
              <h2>Booking Confirmation & Payment Milestones</h2>
            </div>
            <p>
              To give travelers flexibility without financial strain, Comfort Journey operates transparent milestone schedules:
            </p>
            <div className="milestone-steps-card">
              <div className="milestone-step">
                <span className="milestone-badge">Step 1 · 20% to 30%</span>
                <h4>Token Advance at Booking</h4>
                <p>Secures your requested hotel inventory, dates, and dedicated vehicle allocation.</p>
              </div>
              <div className="milestone-step">
                <span className="milestone-badge">Step 2 · 70% to 80%</span>
                <h4>Pre-Departure Clearance</h4>
                <p>Payable 10 days prior to departure, or upon arrival meeting with your tour manager.</p>
              </div>
            </div>
            <p className="mt-3">
              Accepted payment methods include UPI (Google Pay, PhonePe, Paytm), Net Banking (NEFT/RTGS/IMPS), Credit/Debit Cards, and Bank Wire Transfer. Instant official digital receipts with GST invoice details are dispatched to your registered email and WhatsApp upon clearance.
            </p>
          </section>

          {/* Section 5 */}
          <section id="terms-5" className="legal-section highlight-box">
            <div className="section-header-tag">
              <Clock size={22} className="text-amber" />
              <h2>Transparent Cancellation & 100% Refund Policy</h2>
            </div>
            <p>
              We understand schedules change. Our cancellation terms provide maximum flexibility with zero arbitrary deduction fees:
            </p>
            <div className="cancellation-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Time Prior to Departure</th>
                    <th>Refund / Credit Policy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>30+ Days Prior</strong></td>
                    <td><strong className="text-emerald">100% Full Refund</strong> of tour package amount (excluding non-refundable airline cancellation charges).</td>
                  </tr>
                  <tr>
                    <td><strong>15 to 29 Days Prior</strong></td>
                    <td><strong className="text-cyan">75% Refund</strong> or <strong>100% Credit Voucher</strong> valid for any trip within 12 months.</td>
                  </tr>
                  <tr>
                    <td><strong>7 to 14 Days Prior</strong></td>
                    <td><strong>50% Refund</strong> or flexible rescheduling based on hotel partner availability.</td>
                  </tr>
                  <tr>
                    <td><strong>Less than 7 Days</strong></td>
                    <td>Maximum refund recovery from hotel and transport partners with <strong>zero admin surcharge</strong> from Comfort Journey.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section id="terms-6" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">06</span>
              <h2>Airlines, Helicopters & Third-Party Carriers</h2>
            </div>
            <p>
              Air tickets, railway tickets, and helicopter shuttle transfers (such as Kedarnath / Amarnath or Swiss cable cars) are booked directly through authorized carriers.
            </p>
            <p>
              In the event of airline schedule revisions or DGCA helicopter weather cancellations, carrier refunds are passed directly to the client in full with zero retention or handling fees by Comfort Journey.
            </p>
          </section>

          {/* Section 7 */}
          <section id="terms-7" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">07</span>
              <h2>Vehicle Standards & Safe Chauffeur Guidelines</h2>
            </div>
            <p>
              All vehicles dispatched by Comfort Journey undergo rigorous mechanical inspection, AC calibration, and sanitization before every tour.
            </p>
            <ul className="legal-bullet-list">
              <li>Drivers hold commercial passenger transport permits and extensive hill terrain experience.</li>
              <li>Vehicles operate on pre-agreed point-to-point and sightseeing circuits as detailed in your itinerary.</li>
              <li>Night driving in high Himalayan passes (after 8:00 PM) is restricted for passenger safety in accordance with state tourism board directives.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="terms-8" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">08</span>
              <h2>Force Majeure & Unforeseen Events</h2>
            </div>
            <p>
              Comfort Journey shall not be held liable for itinerary modifications or delays arising from events beyond reasonable human control, including but not limited to severe weather conditions, snowfall road closures, landslides, civil unrest, or government regulatory border restrictions.
            </p>
            <p>
              In any such event, our 24/7 concierge desk will coordinate immediate alternative scenic routes or safe shelter with priority safety focus.
            </p>
          </section>

          {/* Section 9 */}
          <section id="terms-9" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">09</span>
              <h2>Governing Law & Legal Jurisdiction</h2>
            </div>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India.
            </p>
            <p>
              Any disputes, controversies, or claims arising out of or in connection with tour contracts or services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bhopal, Madhya Pradesh, India</strong>.
            </p>
            <div className="contact-help-strip">
              <p>
                Have questions regarding your upcoming itinerary or VIP contract terms? Connect directly with our Senior Travel Desk:
              </p>
              <div className="contact-help-btns">
                <a href="tel:+919203931912" className="btn-secondary">
                  <Phone size={15} />
                  <span>+91 92039 31912</span>
                </a>
                <a href="mailto:care@comfortjourney.in" className="btn-secondary">
                  <Mail size={15} />
                  <span>care@comfortjourney.in</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .legal-page-root {
          min-height: 100vh;
          background: var(--color-bg, #001233);
          color: var(--color-text, #F8FAFC);
          padding-bottom: 5rem;
        }

        .legal-page-hero {
          background: linear-gradient(180deg, rgba(30, 58, 138, 0.15) 0%, rgba(0, 18, 51, 0) 100%),
                      radial-gradient(ellipse at 50% 0%, rgba(255, 137, 47, 0.15) 0%, transparent 70%);
          padding: 3.5rem 0 2.5rem 0;
          border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
        }

        .legal-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.7));
          margin-bottom: 1.25rem;
        }

        .legal-crumb-link {
          background: none;
          border: none;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.7));
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          font-size: inherit;
          padding: 0;
          transition: color 0.2s;
        }

        .legal-crumb-link:hover {
          color: #FF892F;
        }

        .legal-crumb-sep {
          opacity: 0.4;
        }

        .legal-crumb-current {
          color: #FF892F;
          font-weight: 600;
        }

        .legal-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: #06B6D4;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin-bottom: 1rem;
        }

        .legal-hero-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 1rem 0;
          color: #FFFFFF;
        }

        .legal-hero-subtitle {
          font-size: 1.05rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.8));
          max-width: 760px;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
        }

        .legal-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.6rem;
          font-size: 0.8rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.6));
        }

        .meta-dot {
          opacity: 0.4;
        }

        /* Layout */
        .legal-content-container {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 3rem;
          margin-top: 3rem;
          align-items: start;
        }

        .legal-toc-sidebar {
          position: sticky;
          top: 6rem;
        }

        .legal-toc-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .legal-toc-card h4 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #FF892F;
          margin: 0 0 1rem 0;
        }

        .legal-toc-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .legal-toc-card a {
          color: var(--color-text-muted, rgba(255, 255, 255, 0.75));
          text-decoration: none;
          font-size: 0.85rem;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .legal-toc-card a:hover {
          color: #FF892F;
        }

        /* Article Body */
        .legal-body-article {
          display: flex;
          flex-direction: column;
          gap: 2.75rem;
        }

        .legal-section {
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .section-header-tag {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .section-num {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 800;
          color: #FF892F;
          background: rgba(255, 137, 47, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        .legal-section h2 {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: #FFFFFF;
        }

        .legal-section p {
          font-size: 0.96rem;
          line-height: 1.7;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.85));
          margin: 0 0 1rem 0;
        }

        .legal-bullet-list {
          list-style: disc;
          padding-left: 1.4rem;
          margin: 0.5rem 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.85));
        }

        .terms-inclusions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .inc-pill {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #10B981;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          font-size: 0.86rem;
          font-weight: 600;
        }

        .milestone-steps-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 1rem;
        }

        .milestone-step {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .milestone-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #FF892F;
          background: rgba(255, 137, 47, 0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          margin-bottom: 0.6rem;
        }

        .milestone-step h4 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #FFFFFF;
        }

        .milestone-step p {
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.75));
        }

        .highlight-box {
          background: rgba(255, 137, 47, 0.05);
          border: 1px solid rgba(255, 137, 47, 0.25);
          border-radius: 16px;
          padding: 1.75rem;
        }

        .cancellation-table-wrap {
          overflow-x: auto;
          margin-top: 1rem;
        }

        .legal-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
          text-align: left;
        }

        .legal-table th,
        .legal-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .legal-table th {
          background: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          font-weight: 700;
        }

        .contact-help-strip {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .contact-help-btns {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 860px) {
          .legal-content-container {
            grid-template-columns: 1fr;
          }
          .legal-toc-sidebar {
            display: none;
          }
          .terms-inclusions-grid,
          .milestone-steps-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

