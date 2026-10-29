import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2, Mail, Phone, Globe, Eye, Server, RefreshCw } from 'lucide-react';
import { seoHeadManager } from '../../utils/seoHeadManager';

export default function PrivacyPolicyPage({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    seoHeadManager.updateMetadata({
      title: "Privacy Policy & Data Protection (DPDP Act) | Comfort Journey",
      description: "Read Comfort Journey's official Privacy Policy complying with the India Digital Personal Data Protection Act (DPDP Act 2023), Meta Ads, Google Analytics, and international data standards.",
      url: "/privacy-policy/",
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
            <span className="legal-crumb-current">Privacy Policy</span>
          </nav>

          <div className="legal-badge-pill">
            <ShieldCheck size={14} className="text-emerald" />
            <span>India DPDP Act 2023 & Global Privacy Standards</span>
          </div>

          <h1 className="legal-hero-title">Privacy Policy & Data Protection</h1>
          <p className="legal-hero-subtitle">
            At Comfort Journey (Est. 1992), we treat your personal data with the same uncompromising care and discretion as your travel itineraries. Learn how we safeguard your information across every interaction.
          </p>
          <div className="legal-meta-row">
            <span>Effective Date: October 2026</span>
            <span className="meta-dot">•</span>
            <span>Version 3.2</span>
            <span className="meta-dot">•</span>
            <span>Jurisdiction: India & International Tourism Standards</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="legal-content-container container">
        <aside className="legal-toc-sidebar">
          <div className="legal-toc-card">
            <h4>Quick Navigation</h4>
            <ul>
              <li><a href="#section-1">1. Scope & Commitment</a></li>
              <li><a href="#section-2">2. Personal Data We Collect</a></li>
              <li><a href="#section-3">3. How We Use Your Data</a></li>
              <li><a href="#section-4">4. Strict Non-Sale Guarantee</a></li>
              <li><a href="#section-5">5. Analytics, Pixels & Cookies</a></li>
              <li><a href="#section-6">6. Your Rights (DPDP Act 2023)</a></li>
              <li><a href="#section-7">7. Data Security & Retention</a></li>
              <li><a href="#section-8">8. Grievance Officer & Contact</a></li>
            </ul>
          </div>
        </aside>

        <main className="legal-body-article">
          {/* Section 1 */}
          <section id="section-1" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">01</span>
              <h2>Scope & Our Commitment</h2>
            </div>
            <p>
              Comfort Journey Tours & Travels (referred to as <strong>"Comfort Journey"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>, operating website <code>https://www.comfortjourney.in</code>) has curated handcrafted travel experiences since 1992. 
            </p>
            <p>
              This Privacy Policy explains how we collect, store, process, and protect your personal information in strict compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act India)</strong>, the <strong>Information Technology Act, 2000</strong>, the <strong>IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and recognized international privacy benchmarks (including GDPR principles for our international travelers).
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">02</span>
              <h2>Personal Data We Collect</h2>
            </div>
            <p>
              We adhere strictly to the principle of <em>Data Minimization</em>: we only collect the minimum personal data required to plan your travel, provide on-trip VIP assistance, and satisfy legal obligations.
            </p>
            <div className="legal-grid-cards">
              <div className="legal-card-item">
                <FileText size={20} className="text-amber" />
                <h4>Direct Information Provided by You</h4>
                <ul>
                  <li><strong>Full Name & Contact Details:</strong> Email address, mobile telephone number, and WhatsApp number.</li>
                  <li><strong>Travel Preferences:</strong> Destination choices, duration, party size (solo, couples, family, group), departure dates, hotel tier standards (e.g. 4-Star Premium or 5-Star Luxury), and vehicle selections.</li>
                  <li><strong>Booking Verification Data:</strong> Government ID details (e.g. Aadhaar, Passport) strictly when required by civil aviation or luxury hotels for mandatory check-in and wildlife/permit verifications.</li>
                </ul>
              </div>

              <div className="legal-card-item">
                <Server size={20} className="text-cyan" />
                <h4>Technical & Automated Telemetry</h4>
                <ul>
                  <li><strong>Device Information:</strong> Browser type, operating system version, and general geographic location (country and city derived from IP address).</li>
                  <li><strong>Website Interactions:</strong> Visited itinerary pages, search queries within Comfy.ai travel planner, and interaction timestamps to ensure seamless page navigation.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">03</span>
              <h2>How We Use Your Personal Data</h2>
            </div>
            <p>
              We process personal data solely for clear, lawful, and specific purposes communicated to you:
            </p>
            <ul className="legal-bullet-list">
              <li>
                <strong>Bespoke Itinerary & Quotation Delivery:</strong> To generate custom day-by-day travel plans, cost breakdowns, and share tailored packages matching your schedule.
              </li>
              <li>
                <strong>On-Trip VIP Concierge & Chauffeur Coordination:</strong> To connect you with your assigned dedicated holiday manager and private chauffeur transfers upon arrival.
              </li>
              <li>
                <strong>Security, Verification & Fraud Prevention:</strong> To authenticate account access via Google SSO or 6-digit email verification codes, preventing unauthorized reservations.
              </li>
              <li>
                <strong>Curated Travel Updates & Offers:</strong> Where you have granted explicit consent, to share seasonal honeymoon guides, festival discounts, and newly launched itineraries from Comfort Journey. You can opt out at any time with a single click.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="legal-section highlight-box">
            <div className="section-header-tag">
              <Lock size={22} className="text-amber" />
              <h2>Our Strict Non-Sale Guarantee</h2>
            </div>
            <p className="lead-text">
              <strong>Comfort Journey NEVER sells, rents, licenses, or monetizes your personal data to any third-party data broker, advertising network, or lead reseller.</strong>
            </p>
            <p>
              Your contact information is only shared with verified service delivery partners (specifically, the pre-booked hotel where you will stay, the authorized cab operator, or government permit offices for restricted areas like Ladakh or Sikkim) strictly to fulfill your travel booking.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">05</span>
              <h2>Analytics, Pixels & Cookies Disclosure</h2>
            </div>
            <p>
              To ensure our website delivers an ultra-fast, seamless experience across devices, we employ industry-standard privacy-focused measurement tools:
            </p>
            <div className="table-responsive">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Service Provider</th>
                    <th>Purpose</th>
                    <th>Privacy & Control Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Google Analytics 4 & GTM</strong></td>
                    <td>Measures aggregate traffic, bounce rates, and popular travel routes without storing raw IP addresses.</td>
                    <td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></td>
                  </tr>
                  <tr>
                    <td><strong>Meta Pixel</strong></td>
                    <td>Measures marketing performance for visitors arriving via Facebook and Instagram luxury travel showcases.</td>
                    <td><a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">Meta Data Policy</a></td>
                  </tr>
                  <tr>
                    <td><strong>Microsoft Clarity</strong></td>
                    <td>Provides anonymous behavioral heatmaps and error detection to resolve layout issues on mobile devices.</td>
                    <td><a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted text-sm mt-3">
              You can control or clear cookies at any time via your browser settings. Blocking cookies will not prevent you from browsing our itineraries or requesting travel quotes.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">06</span>
              <h2>Your Rights Under the India DPDP Act 2023</h2>
            </div>
            <p>
              Under the Digital Personal Data Protection Act, 2023, you hold comprehensive rights as a <em>Data Principal</em>:
            </p>
            <div className="dpdp-rights-grid">
              <div className="dpdp-right-box">
                <CheckCircle2 size={18} className="text-emerald" />
                <div>
                  <strong>Right to Access Summary:</strong> Request an itemized overview of your personal data processed by us and identities of any service partners shared with.
                </div>
              </div>
              <div className="dpdp-right-box">
                <CheckCircle2 size={18} className="text-emerald" />
                <div>
                  <strong>Right to Correction & Erasure:</strong> Request the update of inaccurate contact details, or request full deletion ("Right to be Forgotten") of your record.
                </div>
              </div>
              <div className="dpdp-right-box">
                <CheckCircle2 size={18} className="text-emerald" />
                <div>
                  <strong>Right to Withdraw Consent:</strong> Revoke consent for promotional travel updates at any point without affecting ongoing confirmed reservations.
                </div>
              </div>
              <div className="dpdp-right-box">
                <CheckCircle2 size={18} className="text-emerald" />
                <div>
                  <strong>Right to Grievance Redressal:</strong> Direct access to our designated Grievance Officer with guaranteed resolution within legal statutory limits.
                </div>
              </div>
            </div>
            <p className="mt-3">
              To exercise any of these rights, simply email us at <a href="mailto:care@comfortjourney.in" className="text-amber">care@comfortjourney.in</a> with the subject line <em>"DPDP Data Request"</em>. Requests are fulfilled free of charge within 7 business days.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="legal-section">
            <div className="section-header-tag">
              <span className="section-num">07</span>
              <h2>Data Security & Retention Standards</h2>
            </div>
            <p>
              All traffic between your browser and <code>comfortjourney.in</code> is protected by <strong>256-bit TLS/SSL encryption</strong> and hosted on enterprise-grade AWS and Cloudflare infrastructure with automated Web Application Firewall (WAF) defense against unauthorized intrusion.
            </p>
            <p>
              We retain personal data only for as long as necessary to fulfill your booked tour, provide warranty/concierge follow-up, and meet mandatory accounting and tax record-keeping requirements under the laws of India.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="legal-section grievance-box">
            <div className="section-header-tag">
              <Mail size={22} className="text-amber" />
              <h2>Designated Grievance Redressal Officer</h2>
            </div>
            <p>
              In compliance with Section 13(1) of the Digital Personal Data Protection Act, 2023 and the Information Technology Rules, the details of our Grievance Officer are set forth below:
            </p>
            <div className="grievance-details-card">
              <div className="grievance-row">
                <span className="g-label">Officer Name:</span>
                <span className="g-val">Rishabh Mishra / Sharad Mishra</span>
              </div>
              <div className="grievance-row">
                <span className="g-label">Designation:</span>
                <span className="g-val">Data Protection & Grievance Redressal Officer</span>
              </div>
              <div className="grievance-row">
                <span className="g-label">Organization:</span>
                <span className="g-val">Comfort Journey (Est. 1992)</span>
              </div>
              <div className="grievance-row">
                <span className="g-label">Official Email:</span>
                <span className="g-val"><a href="mailto:care@comfortjourney.in">care@comfortjourney.in</a> / <a href="mailto:support@comfortjourney.com">support@comfortjourney.com</a></span>
              </div>
              <div className="grievance-row">
                <span className="g-label">Dedicated Phone:</span>
                <span className="g-val"><a href="tel:+919203931912">+91 92039 31912</a></span>
              </div>
              <div className="grievance-row">
                <span className="g-label">Office Address:</span>
                <span className="g-val">Comfort Journey Headquarters, Bhopal, Madhya Pradesh 462001, India</span>
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
          background: linear-gradient(180deg, rgba(255, 137, 47, 0.08) 0%, rgba(0, 18, 51, 0) 100%),
                      radial-gradient(ellipse at 50% 0%, rgba(30, 58, 138, 0.3) 0%, transparent 70%);
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
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10B981;
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

        .legal-section p:last-child {
          margin-bottom: 0;
        }

        .legal-grid-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 1.25rem;
        }

        .legal-card-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .legal-card-item h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0.6rem 0 0.75rem 0;
        }

        .legal-card-item ul {
          list-style: disc;
          padding-left: 1.2rem;
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.75));
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

        .highlight-box {
          background: rgba(255, 137, 47, 0.05);
          border: 1px solid rgba(255, 137, 47, 0.25);
          border-radius: 16px;
          padding: 1.75rem;
        }

        .lead-text {
          font-size: 1.05rem;
          color: #FFFFFF;
          line-height: 1.6;
        }

        /* Table */
        .table-responsive {
          overflow-x: auto;
          margin: 1rem 0;
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

        .legal-table td a {
          color: #FF892F;
          text-decoration: underline;
        }

        /* DPDP Rights Grid */
        .dpdp-rights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        .dpdp-right-box {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          font-size: 0.86rem;
          line-height: 1.5;
        }

        .grievance-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.3);
          border-radius: 16px;
          padding: 1.75rem;
        }

        .grievance-details-card {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.9rem;
        }

        .grievance-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 0.5rem;
        }

        .g-label {
          color: var(--color-text-muted, rgba(255, 255, 255, 0.65));
          font-weight: 600;
        }

        .g-val {
          color: #FFFFFF;
        }

        .g-val a {
          color: #FF892F;
          text-decoration: underline;
        }

        @media (max-width: 860px) {
          .legal-content-container {
            grid-template-columns: 1fr;
          }
          .legal-toc-sidebar {
            display: none;
          }
          .legal-grid-cards,
          .dpdp-rights-grid {
            grid-template-columns: 1fr;
          }
          .grievance-row {
            grid-template-columns: 1fr;
            gap: 0.2rem;
          }
        }
      `}</style>
    </div>
  );
}

