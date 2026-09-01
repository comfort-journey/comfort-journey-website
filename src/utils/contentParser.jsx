// =========================================================================
// COMFORT JOURNEY - RICH CONTENT PARSER & CONTEXTUAL INTERNAL LINKING ENGINE
// Accurately renders Directus WYSIWYG / Markdown with contextual SEO backlinks
// =========================================================================

import React from 'react';

// Internal backlink dictionary for high-value destinations, travel categories & packages
const INTERNAL_KEYWORD_LINKS = [
  { keyword: 'Kashmir', href: '#/tour/kashmir-paradise', title: 'View Kashmir Paradise Tour Package' },
  { keyword: 'Dal Lake', href: '#/tour/kashmir-paradise', title: '5-Star Dal Lake Houseboat Stays' },
  { keyword: 'Gulmarg', href: '#/mountain-escapes', title: 'Gulmarg Gondola & Alpine Escapes' },
  { keyword: 'Pahalgam', href: '#/tour/kashmir-paradise', title: 'Pahalgam Pine Valley Stays' },
  { keyword: 'Bali', href: '#/tour/bali-bliss', title: 'View Exotic Bali & Nusa Penida Package' },
  { keyword: 'Ubud', href: '#/tour/bali-bliss', title: 'Ubud Private Pool Villas' },
  { keyword: 'Nusa Penida', href: '#/tour/bali-bliss', title: 'Nusa Penida Speedboat Cruise' },
  { keyword: 'Honeymoon', href: '#/couple-honeymoon', title: 'Explore Honeymoon & Couple Travel Packages' },
  { keyword: 'Solo Travel', href: '#/solo-travel', title: 'Explore Safe Solo Traveler Packages' },
  { keyword: 'Corporate Offsite', href: '#/corporate-travel', title: 'View Corporate Retreats & MICE Packages' },
  { keyword: 'Corporate Offsites', href: '#/corporate-travel', title: 'View Corporate Retreats & MICE Packages' },
  { keyword: 'Dubai', href: '#/tour/dubai-extravaganza', title: 'View Dubai Luxury Skyline & Safari Package' },
  { keyword: 'Swiss Alps', href: '#/tour/swiss-alps-titlis', title: 'View Swiss Alps & Glacier Express Package' },
  { keyword: 'Iceland', href: '#/tour/iceland-aurora', title: 'View Iceland Aurora & Ice Caves Package' },
  { keyword: 'Weekend Getaway', href: '#/weekend-getaways', title: 'Explore 48-Hour Weekend Escapes' },
  { keyword: 'Weekend Getaways', href: '#/weekend-getaways', title: 'Explore 48-Hour Weekend Escapes' }
];

/**
 * Contextual Internal Backlinker:
 * Replaces the first occurrence of key travel destinations with an internal contextual backlink
 */
export function injectContextualBacklinks(text, linkedSet = new Set()) {
  if (!text || typeof text !== 'string') return text;

  // Split into tokens based on matching keywords
  let parts = [text];

  for (const { keyword, href, title } of INTERNAL_KEYWORD_LINKS) {
    if (linkedSet.has(keyword)) continue; // Link each keyword at most once per article

    const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
    const newParts = [];
    let matched = false;

    for (const part of parts) {
      if (typeof part === 'string' && !matched && regex.test(part)) {
        const match = part.match(regex);
        if (match) {
          const index = match.index;
          const matchedWord = match[0];
          const before = part.slice(0, index);
          const after = part.slice(index + matchedWord.length);

          if (before) newParts.push(before);
          newParts.push(
            <a
              key={`link-${keyword}-${index}`}
              href={href}
              className="contextual-internal-backlink"
              title={title}
            >
              {matchedWord}
            </a>
          );
          if (after) newParts.push(after);

          linkedSet.add(keyword);
          matched = true;
          continue;
        }
      }
      newParts.push(part);
    }
    parts = newParts;
  }

  return parts;
}

/**
 * Rich Content Parser Component:
 * Accurately parses Markdown / HTML blocks with typography, media alt-text mapping, and SEO linking
 */
export function RenderRichArticleContent({ content, imageAlt = "Comfort Journey Luxury Travel" }) {
  if (!content) return null;

  // If content is already HTML (from WYSIWYG RichTextEditor or Directus)
  const isHtml = /<[a-z][\s\S]*>/i.test(content);
  if (isHtml) {
    return (
      <div className="rich-article-body rich-article-html">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <style>{`
          .rich-article-html {
            color: #CBD5E1;
            font-size: 1.05rem;
            line-height: 1.85;
          }
          .rich-article-html h1, .rich-article-html h2, .rich-article-html h3, .rich-article-html h4 {
            color: #FFFFFF;
            font-family: var(--font-serif, 'Playfair Display', serif);
            margin: 1.75rem 0 0.75rem 0;
            line-height: 1.35;
          }
          .rich-article-html h1 { font-size: 2rem; color: #FFFFFF; }
          .rich-article-html h2 { font-size: 1.6rem; color: #6FE6FC; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.5rem; }
          .rich-article-html h3 { font-size: 1.3rem; color: #FF892F; }
          .rich-article-html h4 { font-size: 1.15rem; color: #F59E0B; }
          .rich-article-html p { margin-bottom: 1.25rem; }
          .rich-article-html a { color: #6FE6FC; text-decoration: underline; text-underline-offset: 3px; }
          .rich-article-html a:hover { color: #FF892F; }
          .rich-article-html strong, .rich-article-html b { color: #FFFFFF; font-weight: 700; }
          .rich-article-html ul, .rich-article-html ol { margin: 1rem 0 1.5rem 1.5rem; }
          .rich-article-html li { margin-bottom: 0.5rem; }
          .rich-article-html blockquote {
            border-left: 4px solid #FF892F;
            background: rgba(255, 137, 47, 0.08);
            border-radius: 0 8px 8px 0;
            padding: 1rem 1.25rem;
            margin: 1.5rem 0;
            color: #E2E8F0;
            font-style: italic;
          }
          .rich-article-html table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 8px;
            overflow: hidden;
          }
          .rich-article-html th {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 0.75rem 1rem;
            text-align: left;
            color: #6FE6FC;
            font-weight: 700;
          }
          .rich-article-html td {
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1rem;
          }
          .rich-article-html img {
            max-width: 100%;
            border-radius: 12px;
            margin: 1rem 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .rich-article-html figure {
            margin: 1.5rem 0;
            text-align: center;
          }
          .rich-article-html figcaption {
            font-size: 0.8rem;
            color: #94A3B8;
            margin-top: 0.4rem;
            font-style: italic;
          }
          .rich-article-html hr {
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
            margin: 2rem 0;
          }
        `}</style>
      </div>
    );
  }

  const linkedKeywords = new Set();
  const sections = content.split('\n\n');

  return (
    <div className="rich-article-body">
      {sections.map((sec, idx) => {
        const trimmed = sec.trim();

        // 1. Heading 2 (##)
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="reader-h2 font-editorial">
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        // 2. Heading 3 (###)
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="reader-h3 font-editorial">
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // 3. Blockquotes (>)
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="reader-blockquote">
              <p>{injectContextualBacklinks(trimmed.replace('> ', ''), linkedKeywords)}</p>
            </blockquote>
          );
        }

        // 4. Bullet Lists (- )
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').map(item => item.replace(/^- /, ''));
          return (
            <ul key={idx} className="reader-list">
              {items.map((it, iIdx) => (
                <li key={iIdx}>
                  <span className="list-dot">•</span>
                  <span>{injectContextualBacklinks(it, linkedKeywords)}</span>
                </li>
              ))}
            </ul>
          );
        }

        // 5. Ordered Lists (1. )
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n');
          return (
            <ol key={idx} className="reader-ordered-list">
              {items.map((it, iIdx) => (
                <li key={iIdx}>
                  {injectContextualBacklinks(it.replace(/^\d+\.\s*/, ''), linkedKeywords)}
                </li>
              ))}
            </ol>
          );
        }

        // 6. Horizontal Rule (---)
        if (trimmed === '---') {
          return <hr key={idx} className="reader-divider" />;
        }

        // 7. Markdown Images ![alt](url)
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const alt = imgMatch[1] || imageAlt;
          const src = imgMatch[2];
          return (
            <figure key={idx} className="reader-figure">
              <img src={src} alt={alt} loading="lazy" className="reader-content-img" />
              {alt && <figcaption className="reader-figcaption">{alt}</figcaption>}
            </figure>
          );
        }

        // 8. Standard Paragraph with contextual backlink injection
        return (
          <p key={idx} className="reader-paragraph">
            {injectContextualBacklinks(trimmed, linkedKeywords)}
          </p>
        );
      })}

      <style>{`
        .contextual-internal-backlink {
          color: #FF892F;
          font-weight: 700;
          text-decoration: underline;
          text-decoration-color: rgba(255, 137, 47, 0.4);
          text-underline-offset: 3px;
          transition: all 0.2s ease;
        }
        .contextual-internal-backlink:hover {
          color: #6FE6FC;
          text-decoration-color: #6FE6FC;
        }
        .reader-figure {
          margin: 2rem 0;
          text-align: center;
        }
        .reader-content-img {
          width: 100%;
          max-height: 480px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .reader-figcaption {
          font-size: 0.8rem;
          color: #94A3B8;
          margin-top: 0.5rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
