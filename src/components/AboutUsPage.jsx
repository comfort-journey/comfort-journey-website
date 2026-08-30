import React, { useState } from 'react';
import { 
  Sparkles, Heart, ShieldCheck, Award, MapPin, Phone, Mail, MessageCircle, 
  CheckCircle2, Users, Compass, ChevronDown, ChevronUp, ExternalLink, Globe,
  Calendar, Star, Send, Clock, Building2, Plane, Headphones, UserCheck, ThumbsUp
} from 'lucide-react';
import Tilt3DCard from './animations/Tilt3DCard';
import AnimatedCounter from './animations/AnimatedCounter';
import { useWishlistCompare } from '../context/WishlistCompareContext';
import sharadImg from '../assets/team/sharad_mishra.jpg';
import rishabhImg from '../assets/team/rishabh_mishra.jpg';

export default function AboutUsPage({ onOpenQuote, onOpenAIPlanner, onNavigateHome }) {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    travelers: 'Couple',
    budget: '₹50k-1L',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Construct WhatsApp message
    const msg = `Hi Comfort Journey! I'm ${formData.name}. I want to plan a trip to ${formData.destination || 'a dream destination'} around ${formData.travelDate || 'soon'}. Travelers: ${formData.travelers}, Budget: ${formData.budget}. Notes: ${formData.notes}`;
    const url = `https://wa.me/918770403315?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const services = [
    {
      icon: '✈️',
      title: 'International Trips (Outbound)',
      desc: 'Indians traveling the world. Thailand, Japan, Sri Lanka, Europe, Maldives, Bali, Dubai, and beyond. We handle flights, hotels, visas, transport, activities. Everything.'
    },
    {
      icon: '🏔️',
      title: 'India Tours (Domestic)',
      desc: 'From Kashmir to Kanyakumari. Char Dham to Coorg. Ladakh to Lakshadweep. Weekend getaways to month-long explorations.'
    },
    {
      icon: '🏛️',
      title: 'Inbound Tourism',
      desc: 'International travelers experiencing India. We show them the real India. Not just tourist spots, but culture, food, people, stories.'
    },
    {
      icon: '🏢',
      title: 'Corporate Trips',
      desc: 'Team outings, conferences, employee wellness retreats, incentive trips. We handle groups of 10 to 500+.'
    },
    {
      icon: '🎓',
      title: 'School & College Tours',
      desc: 'Educational trips, adventure camps, cultural excursions. Safe, organized, fun.'
    },
    {
      icon: '🌿',
      title: 'Weekend Getaways',
      desc: 'Short escapes from the daily grind. 2-3 day trips that recharge your soul.'
    },
    {
      icon: '🗓️',
      title: 'Fixed Departures',
      desc: 'Pre-planned group trips on fixed dates. Great for solo travelers who want company, or friends who want a hassle-free experience.'
    },
    {
      icon: '🎨',
      title: 'Customized Itineraries',
      desc: "This is our specialty. Tell us your dream, your budget, your dates. We'll create something perfect. Not a template. Not a copy-paste package. YOUR trip."
    }
  ];

  const trustGrid = [
    { offer: '30+ Years Experience', meaning: "We've seen it all. We know what works and what doesn't. No rookie mistakes with your trip.", icon: '🌟' },
    { offer: '10,000+ Happy Travelers', meaning: "Real people, real trips, real memories. We don't just sell packages, we create experiences.", icon: '💖' },
    { offer: '2,000+ Destinations', meaning: "From your neighborhood hill station to the other side of the world. We know them all.", icon: '🌍' },
    { offer: 'Transparent Pricing', meaning: "No hidden costs. No surprise charges. What we quote is what you pay. Period.", icon: '💎' },
    { offer: 'Customized Itineraries', meaning: "Your trip, your way. We don't force you into cookie-cutter packages.", icon: '🎯' },
    { offer: '24/7 Support', meaning: "Midnight flight delay? Hotel issue? We're one call away. Always.", icon: '📞' },
    { offer: 'Expert Guides', meaning: "Local experts who know every shortcut, every hidden gem, every best restaurant.", icon: '🧭' },
    { offer: 'Premium Experience', meaning: "We don't compromise on quality. 4-star & 5-star hotels, comfortable transport, best experiences.", icon: '🏨' }
  ];

  const philosophyPillars = [
    {
      title: '1. Listen First',
      desc: "Before we suggest anything, we listen. What do you want? What's your budget? What are your fears? What excites you? We need to understand YOU before we can plan for you."
    },
    {
      title: '2. Customize Everything',
      desc: "No two travelers are the same. So why should their trips be? We customize every itinerary based on your preferences, budget, and travel style."
    },
    {
      title: '3. Be Honest',
      desc: "If a destination isn't worth the hype, we'll tell you. If a hotel has issues, we'll warn you. If your budget doesn't match your expectations, we'll find a middle ground. No false promises. Ever."
    },
    {
      title: '4. Over-Deliver',
      desc: "We don't just meet expectations. We exceed them. A surprise upgrade here. A hidden gem recommendation there. A personal touch that makes you feel special."
    },
    {
      title: '5. Stay Available',
      desc: "Your trip doesn't end when you board the flight. We're available 24/7 throughout your journey. Any problem, any question, any change. We're one call away."
    }
  ];

  const faqs = [
    {
      q: "How do I book a trip with you?",
      a: "Simple. WhatsApp us at +91 8770403315 or fill the form on this page. Tell us where you want to go, when, and your budget. We'll create a customized itinerary within 24 hours."
    },
    {
      q: "Do you only operate from Bhopal?",
      a: "Our main office is in Bhopal (Aakriti Eco City), but we organize trips for travelers across India and globally! Doesn't matter where you're from. We handle everything remotely via Video calls, WhatsApp, and phone."
    },
    {
      q: "How are your prices compared to online platforms?",
      a: "Often better. Because we have direct relationships built over 30+ years with hotels, airlines, and local operators. No middlemen, no platform fees. Plus, we customize everything so you only pay for what you actually want."
    },
    {
      q: "Can I customize my itinerary?",
      a: "Absolutely. That's our specialty. Tell us what you want, and we'll make it happen. Add activities, remove things you don't like, change hotels, extend days. It's YOUR trip."
    },
    {
      q: "What if something goes wrong during my trip?",
      a: "Call us. 24/7. We'll fix it immediately. Hotel not good? We'll change it. Flight cancelled? We'll rebook. Lost your way? We'll guide you. That's what 24/7 VIP support means."
    },
    {
      q: "Do you handle visas?",
      a: "Yes! We provide complete visa assistance for all international destinations including documentation, application, appointment booking, and follow-up."
    },
    {
      q: "Is there a minimum budget?",
      a: "No. We work with all budgets. From ₹15,000 weekend getaways to ₹5,00,000+ luxury international trips. Tell us your budget, and we'll create something amazing within it."
    },
    {
      q: "Can I pay in installments?",
      a: "Yes, we offer flexible payment options. Pay a booking amount to confirm your trip, and the rest before departure. We'll work out a plan that suits you."
    }
  ];

  return (
    <div className="who-we-are-page-root">
      {/* 1. HERO SECTION */}
      <section className="about-hero-section">
        <div className="ambient-hero-glow" />
        <div className="container relative z-10 text-center">
          <div className="badge badge-amber mb-4 inline-flex">
            <Sparkles size={14} />
            <span>WHO WE ARE</span>
          </div>

          <h1 className="about-hero-heading font-editorial illuminate-text">
            Who We Are
          </h1>

          <p className="about-hero-subheading">
            "30+ years of turning travel dreams into real memories. No scripts. No shortcuts. Just honest, premium travel since 1992."
          </p>

          <div className="hero-cta-group">
            <a 
              href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20talk%20about%20a%20customized%20trip."
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              <MessageCircle size={18} />
              <span>Talk to Senior Trip Curator</span>
            </a>
            <button 
              type="button" 
              className="btn-secondary-glass"
              onClick={onNavigateHome}
            >
              <span>Explore All 22+ Packages</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY (The Heart of the Page) */}
      <section className="about-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text-col">
              <div className="badge badge-emerald mb-3 inline-flex">
                <span>📖 OUR STORY</span>
              </div>
              <h2 className="section-heading font-editorial">
                It Started with <span className="gradient-text-gold">One Simple Belief</span>
              </h2>

              <p className="story-lead">
                Back in 1992, when <strong>Sharad Kumar Mishra</strong> started Comfort Journey from Bhopal, the travel industry looked very different. There were no apps, no online bookings, no instant confirmations. Just a man with a phone, a passion for travel, and one simple belief:
              </p>

              <blockquote className="quote-box-gold">
                "Every traveler deserves honesty, comfort, and a trip they'll remember forever."
              </blockquote>

              <p className="story-body">
                That belief hasn't changed. Not in 30+ years. Not after <strong>10,000+ happy travelers</strong>. Not after <strong>2,000+ destinations</strong>.
              </p>

              <p className="story-body">
                What started as a small travel agency in Shivaji Nagar, Bhopal has grown into something we're genuinely proud of. We've sent families to their dream vacations. We've helped solo travelers explore the world with confidence. We've organized corporate retreats that teams still talk about. We've created honeymoon memories that couples cherish.
              </p>

              <div className="glass-card-highlight care-box">
                <div className="care-icon">
                  <Heart size={28} className="text-amber" />
                </div>
                <div>
                  <h4 className="care-title">We Actually Care</h4>
                  <p className="care-desc">
                    Not in a corporate, marketing-speak kind of way. In a real, <em>pick-up-your-call-at-midnight</em>, <em>change-your-hotel-if-you-don't-like-it</em>, <em>make-sure-you're-safe-and-happy</em> kind of way. That's Comfort Journey. That's who we are.
                  </p>
                </div>
              </div>
            </div>

            <div className="story-media-col">
              <Tilt3DCard maxTilt={5} scale={1.02} glare={true}>
                <div className="story-image-card glass-card">
                  <img 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" 
                    alt="Comfort Journey Story" 
                    className="story-img"
                  />
                  <div className="story-card-overlay">
                    <span className="overlay-tag">EST. 1992 • BHOPAL HQ</span>
                    <h3 className="overlay-head font-editorial">30+ Years of Crafting Memories</h3>
                    <p className="overlay-sub">From local hill stations to international overwater villas.</p>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO (Services Overview) */}
      <section className="about-services-section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-purple mb-3 inline-flex">
              <span>✈️ WHAT WE DO</span>
            </div>
            <h2 className="section-heading font-editorial">
              What We Do <span className="gradient-text-gold">(And We Do It Really Well)</span>
            </h2>
            <p className="section-subtext">
              We're not a one-trick company. Over 30+ years, we've built deep domain expertise across every type of travel you can think of:
            </p>
          </div>

          <div className="services-grid-cards">
            {services.map((item, idx) => (
              <div key={idx} className="service-card-item glass-card">
                <div className="s-icon">{item.icon}</div>
                <h3 className="s-title">{item.title}</h3>
                <p className="s-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (Trust Builders) */}
      <section className="about-trust-section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-amber mb-3 inline-flex">
              <ShieldCheck size={14} />
              <span>TRUST BUILDERS</span>
            </div>
            <h2 className="section-heading font-editorial">
              Why <span className="gradient-text-gold">10,000+ Travelers</span> Trust Us
            </h2>
          </div>

          <div className="trust-cards-grid">
            {trustGrid.map((item, idx) => (
              <div key={idx} className="trust-card-box glass-card">
                <div className="t-icon-badge">{item.icon}</div>
                <div className="t-content">
                  <h4 className="t-offer">{item.offer}</h4>
                  <p className="t-meaning">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE NUMBERS SPEAK (Stats Section) */}
      <section className="about-stats-section">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="section-heading font-editorial illuminate-text">
              The Numbers Speak
            </h2>
          </div>

          <div className="stats-counters-grid">
            <div className="stat-counter-card glass-card">
              <div className="counter-val gradient-text-gold font-editorial">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <span className="counter-label">Years in Business</span>
              <span className="counter-context">Since 1992, Bhopal</span>
            </div>

            <div className="stat-counter-card glass-card">
              <div className="counter-val gradient-text-emerald font-editorial">
                <AnimatedCounter value={10000} suffix="+" />
              </div>
              <span className="counter-label">Happy Travelers</span>
              <span className="counter-context">And counting every day</span>
            </div>

            <div className="stat-counter-card glass-card">
              <div className="counter-val gradient-text-blue font-editorial">
                <AnimatedCounter value={2000} suffix="+" />
              </div>
              <span className="counter-label">Destinations Covered</span>
              <span className="counter-context">Across 50+ countries</span>
            </div>

            <div className="stat-counter-card glass-card">
              <div className="counter-val text-amber font-editorial">
                4.9 / 5
              </div>
              <span className="counter-label">Google Rating</span>
              <span className="counter-context">Real reviews from real travelers</span>
            </div>

            <div className="stat-counter-card glass-card">
              <div className="counter-val text-purple font-editorial">
                <AnimatedCounter value={60} suffix="%+" />
              </div>
              <span className="counter-label">Repeat Customers</span>
              <span className="counter-context">They come back because we deliver</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEET THE TEAM (Leadership & Personal Contact) */}
      <section id="team" className="about-team-section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge badge-amber mb-3 inline-flex">
              <Users size={14} />
              <span>MEET THE TEAM</span>
            </div>
            <h2 className="section-heading font-editorial">
              The People <span className="gradient-text-gold">Behind Your Trips</span>
            </h2>
            <p className="section-subtext">
              Real human beings dedicated to taking care of your family's travel comfort.
            </p>
          </div>

          <div className="team-profiles-grid">
            {/* Sharad Kumar Mishra (Founder) */}
            <Tilt3DCard maxTilt={4} scale={1.015}>
              <div className="team-card-profile glass-card">
                <div className="profile-img-box">
                  <img 
                    src={sharadImg} 
                    alt="Sharad Kumar Mishra - Founder of Comfort Journey" 
                    className="profile-photo"
                  />
                  <span className="role-tag-badge">Founder & CEO</span>
                </div>
                <div className="profile-details">
                  <h3 className="member-name font-editorial">Sharad Kumar Mishra</h3>
                  <span className="member-title">Founder, Comfort Journey (Est. 1992)</span>

                  <p className="member-bio">
                    "The man who started it all. In 1992, when most people in Bhopal hadn't traveled beyond their state, Sharad ji had a vision: make premium travel accessible to everyone. Not just the rich. Not just the well-connected. Everyone."
                  </p>
                  <p className="member-bio">
                    "30+ years later, that vision is still alive. Sharad ji's philosophy is simple: treat every traveler like family. Know their needs before they tell you. Solve their problems before they become problems. And always, always deliver more than you promise."
                  </p>
                  <p className="member-bio">
                    "His relationships with airlines, hotels, and tourism boards across the world are what give Comfort Journey its edge. When we say we can get you the best deals, it's because Sharad ji has spent decades building those connections."
                  </p>

                  <div className="member-contact-chips">
                    <a href="tel:07554914950" className="contact-chip">
                      <Phone size={13} />
                      <span>0755-4914950</span>
                    </a>
                    <a href="https://wa.me/918770403315" target="_blank" rel="noopener noreferrer" className="contact-chip whatsapp">
                      <MessageCircle size={13} />
                      <span>+91 8770403315</span>
                    </a>
                    <a href="https://instagram.com/sksharad.km" target="_blank" rel="noopener noreferrer" className="contact-chip insta">
                      <Globe size={13} />
                      <span>@sksharad.km</span>
                    </a>
                  </div>
                </div>
              </div>
            </Tilt3DCard>

            {/* Rishabh Dev Mishra (Director) */}
            <Tilt3DCard maxTilt={4} scale={1.015}>
              <div className="team-card-profile glass-card">
                <div className="profile-img-box">
                  <img 
                    src={rishabhImg} 
                    alt="Rishabh Dev Mishra - Director of Comfort Journey" 
                    className="profile-photo"
                  />
                  <span className="role-tag-badge director">Director & Digital Lead</span>
                </div>
                <div className="profile-details">
                  <h3 className="member-name font-editorial">Rishabh Dev Mishra</h3>
                  <span className="member-title">Director, Comfort Journey</span>

                  <p className="member-bio">
                    "The next generation. Rishabh brings fresh energy, digital expertise, and a deep understanding of what today's travelers want. He grew up watching his father build Comfort Journey from scratch, and now he's taking it to the next level."
                  </p>
                  <p className="member-bio">
                    "Under Rishabh's leadership, Comfort Journey has expanded into international destinations, digital marketing, social media engagement, and personalized travel experiences. He's the one who makes sure your Instagram-worthy trip is actually Instagram-worthy."
                  </p>
                  <p className="member-bio">
                    "His approach? Listen first. Understand what you actually want. Then create something that exceeds your expectations. No corporate BS. No pushy sales. Just genuine help from someone who loves travel as much as you do."
                  </p>

                  <div className="member-contact-chips">
                    <a href="tel:+918770403315" className="contact-chip">
                      <Phone size={13} />
                      <span>+91 8770403315</span>
                    </a>
                    <a href="mailto:rishabhmishra@comfortjourneyy.onmicrosoft.com" className="contact-chip">
                      <Mail size={13} />
                      <span>Email Rishabh</span>
                    </a>
                    <a href="https://wa.me/918770403315" target="_blank" rel="noopener noreferrer" className="contact-chip whatsapp">
                      <MessageCircle size={13} />
                      <span>WhatsApp Direct</span>
                    </a>
                    <a href="https://instagram.com/the._.rishabhmishra" target="_blank" rel="noopener noreferrer" className="contact-chip insta">
                      <Globe size={13} />
                      <span>@the._.rishabhmishra</span>
                    </a>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* 7. AWARDS & PARTNERSHIPS */}
      <section className="about-partners-section">
        <div className="container text-center">
          <div className="badge badge-emerald mb-3 inline-flex">
            <Award size={14} />
            <span>AWARDS & PARTNERSHIPS</span>
          </div>
          <h2 className="section-heading font-editorial">
            Recognized by <span className="gradient-text-gold">the Best</span>
          </h2>
          <p className="section-subtext max-w-xl mx-auto mb-10">
            "We don't chase awards. But when the industry's biggest names recognize your work, it feels good. Over 30+ years, Comfort Journey has been recognized and partnered with:"
          </p>

          <div className="partners-logo-pills">
            <div className="partner-pill">
              <span className="p-dot 🎯" />
              <strong>IndiGo Airlines</strong>
              <span className="p-sub">Official Partner</span>
            </div>
            <div className="partner-pill">
              <span className="p-dot ✈️" />
              <strong>Air India</strong>
              <span className="p-sub">Preferred Agent</span>
            </div>
            <div className="partner-pill">
              <span className="p-dot 🇱🇰" />
              <strong>Sri Lankan Airlines</strong>
              <span className="p-sub">International Partner</span>
            </div>
            <div className="partner-pill highlight">
              <span className="p-dot 🏛️" />
              <strong>Madhya Pradesh Tourism</strong>
              <span className="p-sub">Official Tourism Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OUR PHILOSOPHY */}
      <section className="about-philosophy-section">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge badge-amber mb-3 inline-flex">
              <Compass size={14} />
              <span>OUR PHILOSOPHY</span>
            </div>
            <h2 className="section-heading font-editorial">
              How We Think <span className="gradient-text-gold">About Travel</span>
            </h2>
            <p className="section-subtext">
              "Travel isn't a transaction. It's not about booking a flight and a hotel and calling it done. Travel is about experiences. Memories. Stories you'll tell your grandchildren. Here's how we approach every trip we plan:"
            </p>
          </div>

          <div className="philosophy-stack">
            {philosophyPillars.map((p, idx) => (
              <div key={idx} className="philosophy-card glass-card">
                <h3 className="p-heading">{p.title}</h3>
                <p className="p-text">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT US & DREAM TRIP FORM */}
      <section id="contact-form" className="about-contact-section">
        <div className="container">
          <div className="contact-grid-main">
            {/* Left: Contact Info & Address */}
            <div className="contact-info-panel glass-card">
              <div className="badge badge-emerald mb-3 inline-flex">
                <Phone size={14} />
                <span>LET'S TALK</span>
              </div>
              <h2 className="contact-head font-editorial">Let's Plan Your Next Adventure</h2>
              <p className="contact-sub">
                Whether you have a destination in mind or just want to explore options, we're here. No pressure. No sales pitch. Just a friendly conversation about your next trip.
              </p>

              <div className="contact-methods-list">
                <a href="https://wa.me/918770403315" target="_blank" rel="noopener noreferrer" className="c-method-item">
                  <MessageCircle size={22} className="text-emerald" />
                  <div>
                    <strong>WhatsApp (Fastest)</strong>
                    <span>+91 8770403315</span>
                  </div>
                </a>

                <a href="tel:+918770403315" className="c-method-item">
                  <Phone size={22} className="text-amber" />
                  <div>
                    <strong>Direct Phone Line</strong>
                    <span>+91 8770403315 / 0755-4914950</span>
                  </div>
                </a>

                <a href="mailto:comfortjourney.rishabh@gmail.com" className="c-method-item">
                  <Mail size={22} className="text-purple" />
                  <div>
                    <strong>Official Email</strong>
                    <span>comfortjourney.rishabh@gmail.com</span>
                  </div>
                </a>
              </div>

              <div className="office-address-block">
                <div className="address-head">
                  <MapPin size={20} className="text-amber" />
                  <h4>Office Address</h4>
                </div>
                <p className="address-text">
                  <strong>Comfort Journey</strong><br />
                  Unit No. 406-A(16), Fourth Floor Aakriti Business Centre Aakriti Eco City, Bhopal Madhya Pradesh, India
                </p>
                <span className="timing-note">
                  ⏰ <strong>Timing:</strong> Monday to Saturday, 10 AM - 7 PM <em>(WhatsApp available anytime 24/7)</em>
                </span>
              </div>
            </div>

            {/* Right: Interactive Dream Trip Form */}
            <div className="contact-form-panel glass-card">
              <h3 className="form-title font-editorial">Tell Us About Your Dream Trip</h3>
              <p className="form-sub">Fill out your details below and our senior curator will create a custom itinerary within 2 hours.</p>

              {formSubmitted ? (
                <div className="form-success-box">
                  <CheckCircle2 size={48} className="text-emerald mx-auto mb-3" />
                  <h4>Thanks! We've Received Your Details</h4>
                  <p>Our curator will get back to you within 2 hours. If it's urgent, feel free to ping us directly on WhatsApp!</p>
                  <button className="btn-primary mt-4" onClick={() => setFormSubmitted(false)}>Submit Another Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="dream-trip-form">
                  <div className="form-row-2">
                    <div className="f-group">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        className="cms-input"
                        placeholder="e.g. Sharad Mishra" 
                        required
                        value={formData.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="f-group">
                      <label>Phone / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        className="cms-input"
                        placeholder="+91 9876543210" 
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="f-group">
                      <label>Email Address (Optional)</label>
                      <input 
                        type="email" 
                        name="email"
                        className="cms-input"
                        placeholder="yourname@gmail.com" 
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="f-group">
                      <label>Where do you want to go?</label>
                      <input 
                        type="text" 
                        name="destination"
                        className="cms-input"
                        placeholder="e.g. Kashmir, Bali, Switzerland" 
                        value={formData.destination}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-row-3">
                    <div className="f-group">
                      <label>Approx Travel Date</label>
                      <input 
                        type="text" 
                        name="travelDate"
                        className="cms-input"
                        placeholder="e.g. Next Month / Oct 2026" 
                        value={formData.travelDate}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="f-group">
                      <label>Travelers</label>
                      <select name="travelers" className="cms-select" value={formData.travelers} onChange={handleFormChange}>
                        <option value="Solo">Solo Traveler</option>
                        <option value="Couple">Couple / Honeymoon</option>
                        <option value="Family">Family</option>
                        <option value="Group">Group / Corporate</option>
                      </select>
                    </div>
                    <div className="f-group">
                      <label>Estimated Budget</label>
                      <select name="budget" className="cms-select" value={formData.budget} onChange={handleFormChange}>
                        <option value="Under ₹50k">Under ₹50,000</option>
                        <option value="₹50k-1L">₹50,000 – ₹1,00,000</option>
                        <option value="₹1L-2L">₹1,00,000 – ₹2,00,000</option>
                        <option value="₹2L+">₹2,00,000+ Luxury</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div className="f-group">
                    <label>Anything else you'd like to tell us?</label>
                    <textarea 
                      name="notes"
                      rows={3} 
                      className="cms-textarea"
                      placeholder="Special requirements, hotel preferences, dietary choices, etc."
                      value={formData.notes}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full text-center">
                    <Send size={16} />
                    <span>Let's Talk! 🚀 (Instant WhatsApp Response)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. MAP & DIRECTIONS */}
      <section className="about-map-section">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="section-heading font-editorial">Visit Our Office</h2>
            <p className="section-subtext">
              "Want to meet us in person? You're always welcome. Walk in, have chai, and let's talk about your next trip."
            </p>
          </div>

          <div className="map-frame-wrapper glass-card">
            <iframe
              title="Comfort Journey Office Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.837835154743!2d77.4326!3d23.2123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c42738b5847bf%3A0x28ec9686036f016!2sAakriti%20Business%20Centre%2C%20Aakriti%20Eco%20City%2C%20Bhopal%2C%20Madhya%20Pradesh%20462026!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-footer-bar">
              <span>📍 Unit No. 406-A(16), 4th Floor Aakriti Business Centre, Bhopal</span>
              <a 
                href="https://maps.google.com/?q=Aakriti+Business+Centre+Bhopal" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-directions-pill"
              >
                <MapPin size={14} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="about-faq-section">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="section-heading font-editorial">Questions People Usually Ask</h2>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item-card glass-card ${openFaqIdx === idx ? 'open' : ''}`}
                onClick={() => setOpenFaqIdx(openFaqIdx === idx ? -1 : idx)}
              >
                <div className="faq-question-header">
                  <h4>{faq.q}</h4>
                  <button type="button" className="faq-toggle-icon">
                    {openFaqIdx === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
                {openFaqIdx === idx && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="about-final-cta-section text-center">
        <div className="container">
          <div className="final-cta-card glass-card">
            <h2 className="cta-head font-editorial illuminate-text">
              Your Next Memory is One Message Away
            </h2>
            <p className="cta-body max-w-xl mx-auto">
              "You've read about us. You know our story. You know what we do. Now here's the question: Where do you want to go next? Don't overthink it. Just tell us."
            </p>
            <div className="cta-btn-row">
              <a 
                href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20Let's%20plan%20my%20next%20trip." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp (+91 8770403315)</span>
              </a>
              <button 
                type="button" 
                className="btn-ai-glow"
                onClick={onOpenAIPlanner}
              >
                <Sparkles size={18} />
                <span>Plan with AI Designer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STYLES FOR DEDICATED ABOUT US PAGE */}
      <style>{`
        .who-we-are-page-root {
          padding-top: 100px;
          padding-bottom: 80px;
          color: #E2E8F0;
        }

        .about-hero-section {
          position: relative;
          padding: 4rem 0 3.5rem 0;
        }

        .about-hero-heading {
          font-size: 3.5rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .about-hero-subheading {
          font-size: 1.25rem;
          color: #94A3B8;
          max-width: 720px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.6;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .about-story-section {
          padding: 4rem 0;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3.5rem;
          align-items: center;
        }

        .quote-box-gold {
          border-left: 4px solid #FF892F;
          background: rgba(255, 137, 47, 0.08);
          padding: 1.25rem 1.5rem;
          border-radius: 0 16px 16px 0;
          font-family: var(--font-editorial, 'Fraunces', Georgia, serif);
          font-size: 1.25rem;
          color: #F9FBE7;
          margin: 1.5rem 0;
          line-height: 1.5;
        }

        .story-lead {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #CBD5E1;
        }

        .story-body {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #94A3B8;
          margin-bottom: 1rem;
        }

        .care-box {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem;
          border-radius: 16px;
          margin-top: 1.75rem;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.3);
        }

        .care-title {
          font-size: 1.1rem;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .care-desc {
          font-size: 0.88rem;
          color: #CBD5E1;
          line-height: 1.5;
          margin: 0;
        }

        .story-image-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 480px;
        }

        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 1.5rem 1.5rem 1.5rem;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 18, 51, 0.95) 100%);
        }

        .overlay-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: #FF892F;
          letter-spacing: 0.1em;
        }

        .overlay-head {
          font-size: 1.4rem;
          color: #FFFFFF;
          margin: 0.2rem 0;
        }

        .overlay-sub {
          font-size: 0.85rem;
          color: #94A3B8;
          margin: 0;
        }

        /* Services Grid */
        .about-services-section {
          padding: 4rem 0;
        }

        .services-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .service-card-item {
          padding: 1.75rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .service-card-item:hover {
          transform: translateY(-4px);
          border-color: rgba(111, 230, 252, 0.4);
        }

        .s-icon {
          font-size: 2.2rem;
          margin-bottom: 0.75rem;
        }

        .s-title {
          font-size: 1.1rem;
          color: #FFFFFF;
          margin-bottom: 0.5rem;
        }

        .s-desc {
          font-size: 0.85rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        /* Trust Grid */
        .about-trust-section {
          padding: 4rem 0;
        }

        .trust-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .trust-card-box {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 18px;
        }

        .t-icon-badge {
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .t-offer {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin-bottom: 0.3rem;
        }

        .t-meaning {
          font-size: 0.84rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
        }

        /* Stats */
        .about-stats-section {
          padding: 4rem 0;
        }

        .stats-counters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.25rem;
        }

        .stat-counter-card {
          padding: 2rem 1.25rem;
          text-align: center;
          border-radius: 20px;
        }

        .counter-val {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .counter-label {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .counter-context {
          display: block;
          font-size: 0.76rem;
          color: #64748B;
          margin-top: 0.2rem;
        }

        /* Team Section */
        .about-team-section {
          padding: 5rem 0;
        }

        .team-profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
        }

        .team-card-profile {
          padding: 2rem;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
        }

        .profile-img-box {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 18px;
          overflow: hidden;
        }

        .profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        .role-tag-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255, 137, 47, 0.9);
          backdrop-filter: blur(10px);
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .role-tag-badge.director {
          background: rgba(111, 230, 252, 0.9);
          color: #001233;
        }

        .member-name {
          font-size: 1.75rem;
          color: #FFFFFF;
          margin-bottom: 0.2rem;
        }

        .member-title {
          font-size: 0.88rem;
          color: #FF892F;
          font-weight: 700;
          display: block;
          margin-bottom: 1rem;
        }

        .member-bio {
          font-size: 0.9rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .member-contact-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }

        .contact-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .contact-chip:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .contact-chip.whatsapp:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10B981;
          color: #10B981;
        }

        .contact-chip.insta:hover {
          background: rgba(225, 48, 108, 0.2);
          border-color: #E1306C;
          color: #E1306C;
        }

        /* Partners */
        .about-partners-section {
          padding: 4rem 0;
        }

        .partners-logo-pills {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .partner-pill {
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.92rem;
          color: #FFFFFF;
        }

        .partner-pill.highlight {
          background: rgba(255, 137, 47, 0.15);
          border-color: #FF892F;
        }

        .p-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        /* Philosophy */
        .about-philosophy-section {
          padding: 4rem 0;
        }

        .philosophy-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .philosophy-card {
          padding: 1.5rem;
          border-radius: 18px;
        }

        .p-heading {
          font-size: 1.15rem;
          color: #FF892F;
          margin-bottom: 0.4rem;
        }

        .p-text {
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0;
        }

        /* Contact & Form */
        .about-contact-section {
          padding: 5rem 0;
        }

        .contact-grid-main {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
        }

        .contact-info-panel, .contact-form-panel {
          padding: 2.25rem;
          border-radius: 24px;
        }

        .contact-head {
          font-size: 2rem;
          color: #FFFFFF;
          margin-bottom: 0.5rem;
        }

        .contact-sub {
          font-size: 0.92rem;
          color: #94A3B8;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .contact-methods-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .c-method-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .c-method-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 137, 47, 0.3);
        }

        .c-method-item strong {
          display: block;
          font-size: 0.92rem;
          color: #FFFFFF;
        }

        .c-method-item span {
          font-size: 0.82rem;
          color: #94A3B8;
        }

        .office-address-block {
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.2);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .address-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .address-head h4 {
          font-size: 1rem;
          color: #FFFFFF;
          margin: 0;
        }

        .address-text {
          font-size: 0.85rem;
          color: #CBD5E1;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .timing-note {
          display: block;
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .form-title {
          font-size: 1.75rem;
          color: #FFFFFF;
          margin-bottom: 0.3rem;
        }

        .form-sub {
          font-size: 0.88rem;
          color: #94A3B8;
          margin-bottom: 1.5rem;
        }

        .dream-trip-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }

        .f-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #CBD5E1;
          margin-bottom: 0.35rem;
        }

        .form-success-box {
          text-align: center;
          padding: 3rem 1.5rem;
        }

        .form-success-box h4 {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin-bottom: 0.5rem;
        }

        .form-success-box p {
          font-size: 0.9rem;
          color: #94A3B8;
        }

        /* Map */
        .about-map-section {
          padding: 4rem 0;
        }

        .map-frame-wrapper {
          padding: 0.75rem;
          border-radius: 20px;
        }

        .map-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem 0.25rem 1rem;
          font-size: 0.85rem;
          color: #CBD5E1;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .btn-directions-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          background: #FF892F;
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 800;
          text-decoration: none;
        }

        /* FAQ */
        .about-faq-section {
          padding: 4rem 0;
        }

        .faq-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .faq-item-card {
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item-card.open {
          border-color: rgba(255, 137, 47, 0.4);
          background: rgba(0, 29, 81, 0.7);
        }

        .faq-question-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-question-header h4 {
          font-size: 1rem;
          color: #FFFFFF;
          margin: 0;
        }

        .faq-toggle-icon {
          background: transparent;
          border: none;
          color: #FF892F;
        }

        .faq-answer-body {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.88rem;
          color: #CBD5E1;
          line-height: 1.6;
        }

        /* Final CTA */
        .about-final-cta-section {
          padding: 4rem 0 2rem 0;
        }

        .final-cta-card {
          padding: 3.5rem 2rem;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(0, 29, 81, 0.9), rgba(0, 18, 51, 0.95));
          border: 1px solid rgba(255, 137, 47, 0.4);
        }

        .cta-head {
          font-size: 2.4rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }

        .cta-body {
          font-size: 1.05rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .cta-btn-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 960px) {
          .story-grid, .contact-grid-main {
            grid-template-columns: 1fr;
          }
          .team-profiles-grid {
            grid-template-columns: 1fr;
          }
          .about-hero-heading {
            font-size: 2.5rem;
          }
          .form-row-2, .form-row-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
