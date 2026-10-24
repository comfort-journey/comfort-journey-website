import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';
import './audience-picker.css';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
const asset = (src) => (!src ? '' : /^(https?:|data:)/.test(src) ? src : basePrefix + src.replace(/^\.?\//, ''));
const thumb = (src) => asset(src).replace(/([?&])w=\d+/, '$1w=640').replace('-1920.webp', '-960.webp');

// The six "who is travelling" pages get big photo tiles; every other page is a quick chip.
const PEOPLE = [
  { slug: 'family-travel', label: 'Family', line: 'Kids, parents, maybe grandparents', reply: 'Family trip? Lovely. We plan easy days, roomy cars and meal stops before anyone gets hungry.' },
  { slug: 'couple-honeymoon', label: 'Couple', line: 'Honeymoon, anniversary, just because', reply: 'Hello, you two. Beach or mountains? Argue a little, then let us plan the rest.' },
  { slug: 'group-travel', label: 'Friends', line: 'The group chat finally agreed', reply: 'The group chat agreed on something? Quick, book it before someone changes their mind.' },
  { slug: 'solo-travel', label: 'Just me', line: 'First solo trip or tenth', reply: 'Going solo? Great call. You set the pace, we stay one message away the whole time.' },
  { slug: 'corporate-travel', label: 'My team', line: 'Offsites and incentive trips', reply: 'Planning an offsite? We handle rooms, buses and timings, so you get the credit.' },
  { slug: 'school-college-trips', label: 'A class', line: 'School and college groups', reply: 'Hello teachers. Safe stays, set timings and a plan parents will happily sign.' }
];
const MORE = [
  { slug: 'weekend-getaways', label: 'Only have a weekend' },
  { slug: 'summer-packages', label: 'Escaping the summer heat' },
  { slug: 'monsoon-getaways', label: 'Love the rain' },
  { slug: 'winter-packages', label: 'Want snow or winter sun' },
  { slug: 'beach-vacations', label: 'Need a beach' },
  { slug: 'mountain-escapes', label: 'Need the hills' },
  { slug: 'adventure-tours', label: 'Want some thrill' },
  { slug: 'spiritual-journeys', label: 'Planning a yatra' },
  { slug: 'fixed-departures', label: 'Want set dates' },
  { slug: 'india-packages', label: 'Exploring India' },
  { slug: 'international-packages', label: 'Going abroad' }
];

const goTo = (slug) => {
  window.location.hash = `#/${slug}`;
  window.scrollTo({ top: 0 });
};

export default function AudiencePicker() {
  const [picked, setPicked] = useState(null);
  const [typed, setTyped] = useState('');
  const sectionRef = useRef(null);
  const replyRef = useRef(null);
  const pick = (slug) => {
    setPicked(slug);
    // On phones the reply sits below the tiles, so bring it into view.
    if (window.matchMedia?.('(max-width: 760px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() => replyRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }));
    }
  };
  const page = picked ? LANDING_PAGES_DATA[picked] : null;
  const reply = PEOPLE.find((p) => p.slug === picked)?.reply || page?.guide?.[0] || '';

  // Type the reply out, quickly. Reduced-motion users get the full line at once.
  useEffect(() => {
    if (!reply) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setTyped(reply); return undefined; }
    setTyped('');
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(reply.slice(0, i));
      if (i >= reply.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [reply]);

  // One-time reveal when the section enters the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { el?.classList.add('is-in'); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const waText = page
    ? encodeURIComponent(page.whatsAppMsg || `Hi Comfort Journey, I am planning a ${page.eyebrow.toLowerCase()} trip.`)
    : encodeURIComponent('Hi Comfort Journey, I am planning a trip and would like some help.');

  return (
    <section ref={sectionRef} className="ap-root" aria-labelledby="ap-title">
      <div className="ap-wrap">
        <div className="ap-head">
          <span className="ap-kicker">Quick question</span>
          <h2 id="ap-title" className="ap-title">Who is coming along?</h2>
          <p className="ap-sub">Tap one. We will show you trips that suit your crowd, with a plan and a price that make sense for them.</p>
        </div>

        <div className="ap-grid" role="group" aria-label="Choose who is travelling">
          {PEOPLE.map((p, i) => {
            const data = LANDING_PAGES_DATA[p.slug];
            if (!data) return null;
            const active = picked === p.slug;
            return (
              <button
                key={p.slug}
                type="button"
                className={`ap-tile ${active ? 'is-active' : ''}`}
                style={{ '--i': i, '--accent': data.theme?.accentColor || '#FF892F' }}
                aria-pressed={active}
                onClick={() => pick(p.slug)}
              >
                <img src={thumb(data.theme?.heroImageMobile || data.theme?.heroImage)} alt="" loading="lazy" decoding="async" width="320" height="400" style={{ objectPosition: data.theme?.heroFocal || 'center' }} />
                <span className="ap-tile-shade" aria-hidden="true" />
                <span className="ap-tile-text">
                  <span className="ap-tile-label">{p.label}</span>
                  <span className="ap-tile-line">{p.line}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div ref={replyRef} className={`ap-reply ${page ? 'is-on' : ''}`} aria-live="polite" style={{ '--accent': page?.theme?.accentColor || '#FF892F' }}>
          <img className="ap-reply-face" src={asset('mascot-default.png')} alt="" width="56" height="50" loading="lazy" />
          <div className="ap-reply-bubble">
            {page ? (
              <>
                <p className="ap-reply-text">{typed}<span className="ap-caret" aria-hidden="true" /></p>
                <div className="ap-reply-actions">
                  <a className="ap-btn ap-btn-main" href={`#/${page.slug}`} onClick={(e) => { e.preventDefault(); goTo(page.slug); }}>
                    <span>{page.ctaSecondary || `See ${page.eyebrow.toLowerCase()} trips`}</span>
                    <ArrowRight size={16} />
                  </a>
                  <a className="ap-btn ap-btn-wa" href={`https://wa.me/919203931912?text=${waText}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </>
            ) : (
              <p className="ap-reply-text ap-reply-idle">Pick one above and I will point you to the right trips.</p>
            )}
          </div>
        </div>

        <div className="ap-more">
          <span className="ap-more-label">Or start with a mood:</span>
          <ul className="ap-chips">
            {MORE.filter((m) => LANDING_PAGES_DATA[m.slug]).map((m) => (
              <li key={m.slug}>
                <a href={`#/${m.slug}`} className="ap-chip" onClick={(e) => { e.preventDefault(); goTo(m.slug); }}>{m.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
