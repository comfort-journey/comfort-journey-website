import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Shield, Heart, Compass, Wallet, Clock, Users, Camera, Hotel, Car, Utensils, Ticket,
  Sparkles, Coffee, Map, Sun, Snowflake, Mountain, Waves, Plane, Briefcase, GraduationCap,
  Phone, Star, Leaf, Flame, Baby, BookOpen, Music, MessageCircle, ArrowRight, ArrowLeft,
  ChevronDown, MapPin, CheckCircle2, X, Quote, BadgeCheck
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';
import { seoHeadManager } from '../utils/seoHeadManager';
import { TOURS_DATA, GOOGLE_REVIEWS, GOOGLE_BUSINESS_PROFILE } from '../data/toursData';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';
import VibeLayer from './landing/VibeLayer';
import './landing/landing.css';

const ICONS = {
  shield: Shield, heart: Heart, compass: Compass, wallet: Wallet, clock: Clock, users: Users,
  camera: Camera, hotel: Hotel, car: Car, utensils: Utensils, ticket: Ticket, sparkles: Sparkles,
  coffee: Coffee, map: Map, sun: Sun, snowflake: Snowflake, mountain: Mountain, waves: Waves,
  plane: Plane, briefcase: Briefcase, graduation: GraduationCap, phone: Phone, star: Star,
  leaf: Leaf, flame: Flame, baby: Baby, book: BookOpen, music: Music
};

const WA_NUMBER = '919203931912';
const SITE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || 'https://www.comfortjourney.in';
const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
const asset = (src) => (!src ? '' : /^(https?:|data:)/.test(src) ? src : basePrefix + src.replace(/^\.?\//, ''));

function useReveal(dep) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const items = root.querySelectorAll('[data-reveal]:not(.is-in)');
    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
  return ref;
}

// Friendly guide bubble that "talks" to the visitor as they scroll.
function ScrollGuide({ lines, accent, waLink, pageKey }) {
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setStep(0);
    setShow(false);
    // Desktop: say hello after a moment. Phones: wait for the first scroll so the hero stays clear.
    const isPhone = window.matchMedia?.('(max-width: 760px)').matches;
    let t;
    const onFirstScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) { setShow(true); window.removeEventListener('scroll', onFirstScroll); }
    };
    if (isPhone) window.addEventListener('scroll', onFirstScroll, { passive: true });
    else t = setTimeout(() => setShow(true), 1600);
    const sections = document.querySelectorAll('[data-guide-step]');
    if (!sections.length || typeof IntersectionObserver === 'undefined') return () => { clearTimeout(t); window.removeEventListener('scroll', onFirstScroll); };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setStep(Number(e.target.getAttribute('data-guide-step')) || 0);
      });
    }, { threshold: 0.3 });
    sections.forEach((s) => io.observe(s));
    return () => { clearTimeout(t); io.disconnect(); window.removeEventListener('scroll', onFirstScroll); };
  }, [pageKey]);

  if (hidden || !lines?.length) return null;
  const idx = Math.min(step, lines.length - 1);
  return (
    <aside className={`lp2-guide ${show ? 'is-on' : ''}`} style={{ '--accent': accent }} aria-live="polite" aria-label="Trip guide">
      <img src={asset('mascot-default.png')} alt="" className="lp2-guide-face" width="52" height="46" loading="lazy" />
      <div className="lp2-guide-bubble">
        <p key={idx} className="lp2-guide-text">{lines[idx]}</p>
        {idx >= lines.length - 1 && (
          <a className="lp2-guide-cta" href={waLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        )}
      </div>
      <button type="button" className="lp2-guide-close" onClick={() => setHidden(true)} aria-label="Hide guide">
        <X size={14} />
      </button>
    </aside>
  );
}

export default function LandingPageTemplate({ pageData, onBackToHome, onSelectItinerary, onBookNow, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlistCompare();
  const [tab, setTab] = useState('india');
  const [openFaq, setOpenFaq] = useState(0);
  const rootRef = useReveal(`${pageData?.slug}-${tab}`);

  const theme = pageData?.theme || {};
  const accent = theme.accentColor || '#FF892F';

  const toursById = useMemo(() => {
    const m = {};
    (TOURS_DATA || []).forEach((t) => { m[t.id] = t; if (t.slug) m[t.slug] = t; });
    return m;
  }, []);

  const indiaTours = useMemo(() => (pageData?.packageIdsIndia || []).map((id) => toursById[id]).filter((t) => t && t.isVisible !== false), [pageData, toursById]);
  const intlTours = useMemo(() => (pageData?.packageIdsIntl || []).map((id) => toursById[id]).filter((t) => t && t.isVisible !== false), [pageData, toursById]);

  useEffect(() => {
    setTab(!indiaTours.length && intlTours.length ? 'intl' : 'india');
    setOpenFaq(0);
  }, [pageData?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const review = useMemo(() => (GOOGLE_REVIEWS || []).find((r) => r.id === pageData?.reviewId), [pageData]);
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pageData?.whatsAppMsg || 'Hi Comfort Journey, I would like help planning a trip.')}`;

  useEffect(() => {
    if (!pageData) return undefined;
    const url = `${SITE}/${pageData.slug}/`;
    const shown = [...indiaTours, ...intlTours];
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: pageData.metaTitle,
          description: pageData.metaDesc,
          inLanguage: 'en',
          about: pageData.focusKeyword,
          isPartOf: { '@id': `${SITE}/#website` },
          publisher: { '@id': `${SITE}/#organization` },
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.lp2-hero-title', '.lp2-answer-text'] }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: pageData.eyebrow, item: url }
          ]
        },
        {
          '@type': 'ItemList',
          name: pageData.packagesHeading,
          itemListElement: shown.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'TouristTrip',
              name: t.name,
              description: t.tagline,
              touristType: pageData.eyebrow,
              url: `${SITE}/tour/${t.slug || t.id}/`,
              ...(t.price ? { offers: { '@type': 'Offer', price: t.price, priceCurrency: 'INR' } } : {})
            }
          }))
        },
        {
          '@type': 'FAQPage',
          mainEntity: [pageData.quickAnswer && { q: pageData.quickAnswer.question, a: pageData.quickAnswer.answer }, ...(pageData.faqs || [])]
            .filter(Boolean)
            .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
        }
      ]
    };
    seoHeadManager.updateMetadata({
      title: pageData.metaTitle,
      description: pageData.metaDesc,
      image: /^https?:/.test(theme.heroImage || '') ? theme.heroImage : `${SITE}/${(theme.heroImage || '').replace(/^\.?\//, '')}`,
      url,
      keywords: [pageData.focusKeyword, ...(pageData.secondaryKeywords || [])].join(', '),
      schema: graph
    });
    return () => seoHeadManager.resetToDefault();
  }, [pageData, indiaTours, intlTours]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!pageData) return null;

  const tours = tab === 'india' ? indiaTours : intlTours;
  const others = Object.values(LANDING_PAGES_DATA).filter((p) => p.slug !== pageData.slug);
  const sameGroup = others.filter((p) => p.group === pageData.group);
  const more = [...sameGroup, ...others.filter((p) => !sameGroup.includes(p))].slice(0, 4);

  const savePct = (t) => {
    const orig = Number(t.originalPrice || 0);
    const p = Number(t.price || 0);
    if (!orig || !p || orig <= p || orig > p * 2.5) return 0;
    return Math.round(((orig - p) / orig) * 100);
  };

  const scrollToPackages = (e) => {
    e.preventDefault();
    document.getElementById('lp2-packages')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={rootRef} className={`lp2 lp2-vibe-${theme.vibe || 'none'}`} style={{ '--accent': accent }}>
      {/* HERO */}
      <header className="lp2-hero" data-guide-step="0">
        <picture className="lp2-hero-media">
          {theme.heroImageMobile && theme.heroImageMobile !== theme.heroImage && (
            <source media="(max-width: 760px)" srcSet={asset(theme.heroImageMobile)} />
          )}
          <img
            src={asset(theme.heroImage)}
            alt={`${pageData.eyebrow} trip planned by Comfort Journey`}
            fetchpriority="high"
            decoding="async"
            style={{ objectPosition: theme.heroFocal || 'center' }}
          />
        </picture>
        <div className="lp2-hero-shade" />
        <VibeLayer vibe={theme.vibe} accent={accent} />
        <div className="lp2-wrap lp2-hero-inner">
          <nav className="lp2-crumbs" aria-label="Breadcrumb">
            <button type="button" onClick={onBackToHome} className="lp2-back"><ArrowLeft size={14} /> Home</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{pageData.eyebrow}</span>
          </nav>
          <p className="lp2-eyebrow">{pageData.eyebrow}</p>
          <h1 className="lp2-hero-title">{pageData.heroHeadline}</h1>
          <p className="lp2-hero-sub">{pageData.heroSubline}</p>
          <div className="lp2-hero-ctas">
            <a className="lp2-btn lp2-btn-primary" href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> {pageData.ctaPrimary}
            </a>
            <a className="lp2-btn lp2-btn-ghost" href="#lp2-packages" onClick={scrollToPackages}>
              {pageData.ctaSecondary} <ArrowRight size={16} />
            </a>
          </div>
          <ul className="lp2-tags" aria-label="What to expect">
            {(pageData.vibeTags || []).map((t) => (<li key={t}><CheckCircle2 size={14} /> {t}</li>))}
          </ul>
          <div className="lp2-proof">
            <span className="lp2-proof-stars" aria-hidden="true">★★★★★</span>
            <span><strong>{GOOGLE_BUSINESS_PROFILE?.rating || 4.8}</strong> on Google from {GOOGLE_BUSINESS_PROFILE?.totalReviews || '85+'} reviews</span>
            <span className="lp2-dot" aria-hidden="true" />
            <span>Planning trips from Bhopal since 1992</span>
          </div>
        </div>
      </header>

      {/* PACKAGES, right after the hero because ad visitors came for trips */}
      <section id="lp2-packages" className="lp2-section lp2-packages" data-guide-step="1" aria-labelledby="lp2-packages-title">
        <div className="lp2-wrap">
          <div className="lp2-head" data-reveal>
            <h2 id="lp2-packages-title">{pageData.packagesHeading}</h2>
            <p>{pageData.packagesIntro}</p>
          </div>
          {indiaTours.length > 0 && intlTours.length > 0 && (
            <div className="lp2-tabs" role="tablist" aria-label="Trip region">
              <button type="button" role="tab" aria-selected={tab === 'india'} className={tab === 'india' ? 'is-active' : ''} onClick={() => setTab('india')}>
                In India <span>{indiaTours.length}</span>
              </button>
              <button type="button" role="tab" aria-selected={tab === 'intl'} className={tab === 'intl' ? 'is-active' : ''} onClick={() => setTab('intl')}>
                Abroad <span>{intlTours.length}</span>
              </button>
            </div>
          )}
          <div className="lp2-grid">
            {tours.map((t, i) => {
              const pct = savePct(t);
              const saved = isInWishlist(t.id);
              return (
                <article key={`${tab}-${t.id}`} className="lp2-card" data-reveal style={{ '--i': i }}>
                  <div className="lp2-card-media">
                    <img src={asset(t.image)} alt={`${t.name}, ${t.location}`} loading="lazy" decoding="async" />
                    <span className="lp2-card-days"><Clock size={12} /> {t.duration}</span>
                    {pct > 0 && <span className="lp2-card-save">Save {pct}%</span>}
                    <button
                      type="button"
                      className={`lp2-card-heart ${saved ? 'is-saved' : ''}`}
                      onClick={() => toggleWishlist(t.id)}
                      aria-pressed={saved}
                      aria-label={saved ? `Remove ${t.name} from saved trips` : `Save ${t.name}`}
                    >
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className="lp2-card-body">
                    <p className="lp2-card-loc"><MapPin size={13} /> {t.location}</p>
                    <h3 className="lp2-card-title">{t.name}</h3>
                    <div className="lp2-card-foot">
                      <div className="lp2-card-price">
                        <span className="lp2-card-from">From</span>
                        <strong>{formatPrice(t.price)}</strong>
                        <span className="lp2-card-pp">per person</span>
                      </div>
                      <div className="lp2-card-btns">
                        <button type="button" className="lp2-btn-sm lp2-btn-sm-ghost" onClick={() => onSelectItinerary?.(t)}>See plan</button>
                        <button type="button" className="lp2-btn-sm" onClick={() => onBookNow?.(t)}>Get a quote</button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="lp2-note" data-reveal>
            Prices change with dates, hotel choice and group size. Not seeing your place? <a href={waLink} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>, we plan custom routes too.
          </p>
        </div>
      </section>

      {/* QUICK ANSWER (AEO / GEO) */}
      {pageData.quickAnswer && (
        <section className="lp2-section lp2-answer" aria-labelledby="lp2-answer-q">
          <div className="lp2-wrap">
            <div className="lp2-answer-box" data-reveal>
              <p className="lp2-answer-label">Quick answer</p>
              <h2 id="lp2-answer-q">{pageData.quickAnswer.question}</h2>
              <p className="lp2-answer-text">{pageData.quickAnswer.answer}</p>
            </div>
          </div>
        </section>
      )}

      {/* STORY + REVIEW */}
      <section className="lp2-section lp2-story" data-guide-step="2" aria-labelledby="lp2-story-title">
        <div className="lp2-wrap lp2-story-grid">
          <div className="lp2-story-copy" data-reveal>
            <h2 id="lp2-story-title">{pageData.storyHeading}</h2>
            {(pageData.storyParagraphs || []).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {review ? (
            <figure className="lp2-review" data-reveal>
              <Quote size={26} className="lp2-review-mark" aria-hidden="true" />
              <blockquote>{review.comment}</blockquote>
              <figcaption>
                <span className="lp2-review-avatar" style={{ background: review.avatarBg }}>{review.initials}</span>
                <span>
                  <strong>{review.name}</strong>
                  <small>{review.tour} · <BadgeCheck size={12} /> Google review</small>
                </span>
              </figcaption>
            </figure>
          ) : (
            <div className="lp2-review lp2-review-alt" data-reveal>
              <p className="lp2-review-big">{GOOGLE_BUSINESS_PROFILE?.rating || 4.8}<span>/5</span></p>
              <p>Average rating from {GOOGLE_BUSINESS_PROFILE?.totalReviews || '85+'} Google reviews by people who travelled with us.</p>
            </div>
          )}
        </div>
      </section>

      {/* REASONS */}
      <section className="lp2-section lp2-reasons" aria-labelledby="lp2-reasons-title">
        <div className="lp2-wrap">
          <div className="lp2-head" data-reveal><h2 id="lp2-reasons-title">{pageData.reasonsHeading}</h2></div>
          <div className="lp2-reasons-grid">
            {(pageData.reasons || []).map((r, i) => {
              const Icon = ICONS[r.icon] || Sparkles;
              return (
                <div key={r.title} className="lp2-reason" data-reveal style={{ '--i': i }}>
                  <span className="lp2-reason-icon"><Icon size={20} /></span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="lp2-section lp2-included" aria-labelledby="lp2-included-title">
        <div className="lp2-wrap lp2-included-grid">
          <div className="lp2-head lp2-head-left" data-reveal>
            <h2 id="lp2-included-title">{pageData.includedHeading}</h2>
            <p>Every trip is planned around you, so treat this as a starting point.</p>
          </div>
          <ol className="lp2-included-list">
            {(pageData.included || []).map((it, i) => (
              <li key={it.title} data-reveal style={{ '--i': i }}>
                <span className="lp2-included-num">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{it.title}</h3><p>{it.desc}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="lp2-section lp2-faq" data-guide-step="3" aria-labelledby="lp2-faq-title">
        <div className="lp2-wrap lp2-faq-wrap">
          <div className="lp2-head" data-reveal><h2 id="lp2-faq-title">Questions people ask us</h2></div>
          <div className="lp2-faq-list">
            {(pageData.faqs || []).map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`lp2-faq-item ${open ? 'is-open' : ''}`}>
                  <h3>
                    <button type="button" aria-expanded={open} aria-controls={`lp2-faq-${i}`} id={`lp2-faq-btn-${i}`} onClick={() => setOpenFaq(open ? -1 : i)}>
                      <span>{f.q}</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`lp2-faq-${i}`} role="region" aria-labelledby={`lp2-faq-btn-${i}`} className="lp2-faq-a">
                    <div><p>{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp2-section lp2-final" aria-labelledby="lp2-final-title">
        <div className="lp2-wrap">
          <div className="lp2-final-box" data-reveal>
            <h2 id="lp2-final-title">{pageData.finalHeading}</h2>
            <p>{pageData.finalText}</p>
            <div className="lp2-hero-ctas lp2-final-ctas">
              <a className="lp2-btn lp2-btn-primary" href={waLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> {pageData.finalCta}</a>
              <button type="button" className="lp2-btn lp2-btn-ghost" onClick={() => onOpenQuote?.()}>Send a quick enquiry</button>
              <a className="lp2-btn lp2-btn-link" href="tel:+919203931912"><Phone size={16} /> +91 92039 31912</a>
            </div>
          </div>
        </div>
      </section>

      {/* MORE WAYS TO TRAVEL (internal links for users and crawlers) */}
      <section className="lp2-section lp2-more" aria-labelledby="lp2-more-title">
        <div className="lp2-wrap">
          <div className="lp2-head" data-reveal><h2 id="lp2-more-title">Planning a different kind of trip?</h2></div>
          <div className="lp2-more-grid">
            {more.map((p) => (
              <a key={p.slug} href={`#/${p.slug}`} className="lp2-more-card" data-reveal style={{ '--accent': p.theme.accentColor }}>
                <img src={asset(p.theme.heroImageMobile || p.theme.heroImage)} alt="" loading="lazy" decoding="async" />
                <span className="lp2-more-label">{p.eyebrow}</span>
                <span className="lp2-more-title">{p.heroHeadline}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ScrollGuide lines={pageData.guide} accent={accent} waLink={waLink} pageKey={pageData.slug} />
    </div>
  );
}
