import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { getDestinationClimate } from '../../../data/destinationClimates';
import './styles/TourFaqSection.css';

/**
 * Generates package-specific FAQs if none are entered in CMS
 */
export function generateTourFaqs(tour = {}) {
  const dest = tour.destination || tour.location || 'this destination';
  const name = tour.name || `${dest} Holiday`;
  const climate = getDestinationClimate(tour);
  const bestTime = climate?.bestTimeHeadline || 'throughout the spring and autumn months';
  const stayTier = tour.hotelTier || tour.stayTier || '4★ Deluxe Accommodation';

  return [
    {
      question: `Is the "${name}" a private tour or a shared group tour?`,
      answer: `This is a 100% private vacation crafted exclusively for your traveling party. You will enjoy a dedicated private AC vehicle (Sedan or SUV) with an experienced, courteous chauffeur for all transfers and daily sightseeing. There is no sharing with strangers and no rushed group schedules—you explore at your own comfortable pace.`
    },
    {
      question: `Can we customize the day-by-day itinerary or upgrade hotels in ${dest}?`,
      answer: `Yes, absolutely! Comfort Journey specializes in tailor-made travel. You can add extra nights in ${dest}, upgrade to 5-star luxury heritage resorts, include romantic candlelight dinners, or swap sightseeing stops. Simply click 'Customize Trip' or message our destination specialist on WhatsApp to adjust the plan.`
    },
    {
      question: `What meals, stay categories, and vehicle permits are included?`,
      answer: `The package includes handpicked ${stayTier} with scenic mountain/valley views, daily breakfast, and a private AC chauffeur fleet. All fuel, parking fees, interstate toll taxes, driver night allowances, and 24/7 on-trip concierge assistance are 100% covered. There are zero hidden surcharges on your trip.`
    },
    {
      question: `What is the best time of year to visit ${dest}?`,
      answer: `The most pleasant season for ${dest} is ${bestTime}. During this window, you will enjoy clear sunny skies, comfortable daytime temperatures, and excellent horizon visibility for outdoor exploration and photography.`
    },
    {
      question: `How does airport / railway station pick-up and drop work?`,
      answer: `Your dedicated private chauffeur will arrive at the arrival terminal or station exit holding a Comfort Journey welcome board displaying your name. They assist with all luggage, escort you to the sanitized vehicle, and provide a seamless private transfer directly to your hotel.`
    },
    {
      question: `How do I secure my booking, and what are the payment terms?`,
      answer: `You can secure your tour dates with an initial 20% to 30% advance token deposit. The remaining balance is payable 10 days before departure or upon arrival. We accept UPI (GPay/PhonePe), Credit/Debit Cards, and Net Banking, issuing instant confirmation receipts and GST tax invoices.`
    }
  ];
}

export default function TourFaqSection({ tour }) {
  // Use CMS FAQs if available; otherwise auto-generate tailored FAQs
  const cmsFaqs = tour?.faqs && Array.isArray(tour.faqs) && tour.faqs.length > 0 ? tour.faqs : null;
  const faqs = cmsFaqs || generateTourFaqs(tour);

  const [openIdx, setOpenIdx] = useState(0); // open first item by default

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const dest = tour?.destination || tour?.location || 'Your Destination';

  return (
    <section id="faqs" className="tour-faqs-section">
      <div className="faqs-header-wrap">
        <div className="faqs-eyebrow">
          <HelpCircle size={16} className="text-amber" />
          <span>EVERYTHING YOU NEED TO KNOW</span>
        </div>
        <h2 className="faqs-main-title">Frequently Asked Questions</h2>
        <p className="faqs-sub-desc">
          Common questions about traveling to {dest}, private vehicle logistics, customized stays, and booking guarantees.
        </p>
      </div>

      <div className="faqs-accordion-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const qText = faq.question || faq.q;
          const aText = faq.answer || faq.a;

          return (
            <div 
              key={idx} 
              className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">{qText}</span>
                <span className="faq-chevron-icon">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer-panel animate-fade-in">
                  <p>{aText}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct WhatsApp Specialist Help Card */}
      <div className="faq-support-card">
        <div className="support-card-left">
          <MessageCircle size={24} className="support-wa-icon" />
          <div>
            <strong>Have a custom request or specific question?</strong>
            <p>Our dedicated travel planners are available 24/7 on WhatsApp to tailor your itinerary.</p>
          </div>
        </div>

        <button
          type="button"
          className="faq-ask-specialist-btn"
          onClick={() => {
            const msg = encodeURIComponent(
              `Hi Comfort Journey! I'm reviewing the "${tour?.name || 'tour package'}" and have a few questions before booking.`
            );
            window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
          }}
        >
          Chat with Specialist →
        </button>
      </div>
    </section>
  );
}
