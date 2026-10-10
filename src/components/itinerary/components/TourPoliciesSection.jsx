import React, { useState } from 'react';
import { 
  FileCheck2, ShieldAlert, RotateCcw, CreditCard, AlertCircle, 
  CheckCircle2, Clock, Calendar, HelpCircle, PhoneCall, ShieldCheck
} from 'lucide-react';
import './styles/TourPoliciesSection.css';

export default function TourPoliciesSection({ tour }) {
  const [activeTab, setActiveTab] = useState('confirmation');

  const policyTabs = [
    { id: 'confirmation', label: 'Confirmation Policy', icon: FileCheck2 },
    { id: 'cancellation', label: 'Cancellation Policy', icon: ShieldAlert },
    { id: 'refund', label: 'Refund Policy', icon: RotateCcw },
    { id: 'payment', label: 'Payment Terms', icon: CreditCard },
    { id: 'knowBeforeYouGo', label: 'Know Before You Go', icon: AlertCircle }
  ];

  return (
    <section id="policies" className="tour-policies-section">
      <div className="policies-header-wrap">
        <div className="policies-eyebrow">
          <ShieldCheck size={16} className="text-emerald" />
          <span>TRANSPARENCY & TRAVELER SAFEGUARDS</span>
        </div>
        <h2 className="policies-main-title">Mandatory Policies & Traveler Guidelines</h2>
        <p className="policies-sub-desc">
          Everything you need to know about your booking, payment schedules, cancellation milestones, and trip preparation for a seamless vacation with Comfort Journey.
        </p>
      </div>

      {/* Policy Category Tabs */}
      <div className="policy-tabs-nav" role="tablist">
        {policyTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`policy-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} className="tab-icon" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Policy Content Body */}
      <div className="policy-content-card">
        {/* 1. CONFIRMATION POLICY */}
        {activeTab === 'confirmation' && (
          <div className="policy-pane animate-fade-in">
            <div className="pane-header">
              <FileCheck2 size={24} className="pane-icon" />
              <div>
                <h3 className="pane-title">Booking Confirmation & Voucher Policy</h3>
                <span className="pane-subtitle">Guaranteed instant acknowledgment & 24-hour voucher dispatch</span>
              </div>
            </div>

            <div className="policy-points-grid">
              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Instant Booking Acknowledgment:</strong>
                  <p>Upon paying the initial token deposit, an immediate digital receipt and booking reference code will be dispatched to your WhatsApp and registered email.</p>
                </div>
              </div>

              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Official Travel Voucher within 24 Hours:</strong>
                  <p>Our reservations desk locks your handpicked hotel rooms and dedicated private vehicle, issuing the official Comfort Journey Booking Voucher within 24 business hours.</p>
                </div>
              </div>

              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Chauffeur & Fleet Details 48 Hours Prior:</strong>
                  <p>Vehicle registration number, dedicated private chauffeur name, and direct contact details are shared 48 hours before your arrival date for smooth meet-and-greet.</p>
                </div>
              </div>

              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Verified GST Tax Invoice:</strong>
                  <p>A full corporate GST invoice is provided upon final payment completion, suitable for corporate claims and personal tax records.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CANCELLATION POLICY */}
        {activeTab === 'cancellation' && (
          <div className="policy-pane animate-fade-in">
            <div className="pane-header">
              <ShieldAlert size={24} className="pane-icon amber" />
              <div>
                <h3 className="pane-title">Cancellation Policy & Milestones</h3>
                <span className="pane-subtitle">Fair, milestone-based timeline designed with full transparency</span>
              </div>
            </div>

            <div className="cancellation-timeline-cards">
              <div className="cancellation-card low-penalty">
                <div className="card-milestone">30+ Days Prior</div>
                <div className="card-deduction">10% Fee Only</div>
                <p className="card-desc">90% refund returned to your bank account, or receive a 100% credit note valid for any holiday within 12 months.</p>
              </div>

              <div className="cancellation-card moderate-penalty">
                <div className="card-milestone">15 to 29 Days Prior</div>
                <div className="card-deduction">25% Deduction</div>
                <p className="card-desc">75% of total tour cost refunded to original payment method within standard banking processing cycles.</p>
              </div>

              <div className="cancellation-card high-penalty">
                <div className="card-milestone">7 to 14 Days Prior</div>
                <div className="card-deduction">50% Deduction</div>
                <p className="card-desc">50% refund returned as hotel booking cutoffs and fleet reservation deposits have been initiated.</p>
              </div>

              <div className="cancellation-card full-penalty">
                <div className="card-milestone">Under 7 Days / No-Show</div>
                <div className="card-deduction">100% Non-Refundable</div>
                <p className="card-desc">No refund applicable as accommodations, private cabs, and permits are 100% prepaid and non-recoverable.</p>
              </div>
            </div>

            <div className="policy-notice-box">
              <Clock size={16} className="notice-icon" />
              <span>Cancellations must be sent in writing via email to <strong>support@comfortjourney.com</strong> or submitted through your dedicated WhatsApp concierge desk.</span>
            </div>
          </div>
        )}

        {/* 3. REFUND POLICY */}
        {activeTab === 'refund' && (
          <div className="policy-pane animate-fade-in">
            <div className="pane-header">
              <RotateCcw size={24} className="pane-icon" />
              <div>
                <h3 className="pane-title">Refund Processing Terms</h3>
                <span className="pane-subtitle">Direct reversals, fast turnaround & medical flexibility</span>
              </div>
            </div>

            <div className="policy-points-grid">
              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Original Payment Mode Credit:</strong>
                  <p>All approved refunds are credited directly back to the original bank account, debit/credit card, or UPI VPA used at the time of purchase.</p>
                </div>
              </div>

              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Processing Timeline (5 to 7 Days):</strong>
                  <p>Once cancellation is confirmed, refunds are initiated within 48 hours and typically reflect in your account within 5 to 7 business banking days.</p>
                </div>
              </div>

              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Medical & Unforeseen Flight Cancellations:</strong>
                  <p>In cases of certified medical emergencies or official airline flight cancellations, Comfort Journey will liaise with partners to reschedule your trip at zero penalty or minimal actual cost.</p>
                </div>
              </div>

              <div className="policy-point-item">
                <CheckCircle2 size={18} className="point-icon green" />
                <div>
                  <strong>Non-Refundable Third-Party Components:</strong>
                  <p>Special non-refundable items such as peak-season flight tickets, restricted wildlife safari permits, or train bookings are governed by individual carrier rules.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. PAYMENT TERMS */}
        {activeTab === 'payment' && (
          <div className="policy-pane animate-fade-in">
            <div className="pane-header">
              <CreditCard size={24} className="pane-icon" />
              <div>
                <h3 className="pane-title">Payment Schedule & Accepted Methods</h3>
                <span className="pane-subtitle">Transparent pricing with zero hidden surcharges</span>
              </div>
            </div>

            <div className="payment-structure-box">
              <div className="payment-step">
                <div className="step-badge">Stage 1: Advance Token</div>
                <div className="step-amount">20% to 30% Deposit</div>
                <p className="step-desc">Paid to confirm your vacation dates, lock hotel rooms, and assign dedicated private vehicle.</p>
              </div>

              <div className="payment-step-arrow">→</div>

              <div className="payment-step">
                <div className="step-badge">Stage 2: Balance Payment</div>
                <div className="step-amount">70% to 80% Balance</div>
                <p className="step-desc">Payable 10 days prior to your departure date or upon personal arrival meet-and-greet.</p>
              </div>
            </div>

            <div className="payment-methods-strip">
              <span className="methods-label">Accepted 100% Secure Payment Modes:</span>
              <div className="methods-badges">
                <span className="method-pill">⚡ UPI (GPay, PhonePe, Paytm)</span>
                <span className="method-pill">💳 Visa / Mastercard / RuPay</span>
                <span className="method-pill">🏦 Net Banking (All Major Banks)</span>
                <span className="method-pill">🌐 International Wire / Forex</span>
                <span className="method-pill">🛡️ Razorpay / Cashfree Protected</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. KNOW BEFORE YOU GO */}
        {activeTab === 'knowBeforeYouGo' && (
          <div className="policy-pane animate-fade-in">
            <div className="pane-header">
              <AlertCircle size={24} className="pane-icon amber" />
              <div>
                <h3 className="pane-title">Know Before You Go (Traveler Advisory)</h3>
                <span className="pane-subtitle">Essential requirements, packing tips, and local etiquette</span>
              </div>
            </div>

            <div className="guidelines-list">
              <div className="guideline-card">
                <strong>🪪 Government ID Proofs Required:</strong>
                <p>All adult travelers must carry valid government-approved original photo ID (Aadhaar Card, Passport, or Voter ID). PAN cards are not accepted for hotel check-ins or border security checkpoints.</p>
              </div>

              <div className="guideline-card">
                <strong>🧥 Climate & Layered Packing:</strong>
                <p>Mountain and hill station evenings can drop significantly in temperature even during summer months. We strongly recommend carrying a medium warm jacket, comfortable walking shoes, and sunglasses for high-altitude UV protection.</p>
              </div>

              <div className="guideline-card">
                <strong>🧳 Luggage Optimization:</strong>
                <p>To ensure maximum passenger comfort inside private sedans and SUVs, we recommend 1 medium suitcase (up to 20kg) and 1 small cabin backpack per traveler.</p>
              </div>

              <div className="guideline-card">
                <strong>🙏 Cultural Decorum & Temples:</strong>
                <p>Modest dress covering shoulders and knees is appreciated when visiting ancient shrines, monasteries, and temples. Footwear must be removed before entering sanctums.</p>
              </div>

              <div className="guideline-card">
                <strong>🚗 Chauffeur Timings & Hill Driving:</strong>
                <p>For your safety, hill driving is limited after dusk (8:00 PM). Departure timings for high-altitude passes (like Khajjiar or Rohtang) are coordinated by your chauffeur early in the morning for optimal weather and clear roads.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Support Strip */}
      <div className="policies-trust-footer">
        <div className="trust-item">
          <ShieldCheck size={18} className="trust-icon" />
          <span>Comfort Journey Standard (Est. 1992)</span>
        </div>
        <div className="trust-item">
          <FileCheck2 size={18} className="trust-icon" />
          <span>100% Tax Compliant GST Billing</span>
        </div>
        <div className="trust-item">
          <PhoneCall size={18} className="trust-icon" />
          <span>24/7 Dedicated Concierge Support: +91 8770403315</span>
        </div>
      </div>
    </section>
  );
}
