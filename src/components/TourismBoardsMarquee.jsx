import React from 'react';
import './styles/TourismBoardsMarquee.css';

// Curated list of verified Global & Indian State Tourism Boards with authentic vector brandings
const TOURISM_BOARDS = [
  {
    id: 'jordan',
    name: 'Jordan Tourism Board',
    tagline: 'The Kingdom of Time',
    renderLogo: () => (
      <svg viewBox="0 0 160 50" className="tb-svg-logo" aria-label="Jordan Tourism Board">
        <text x="5" y="28" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="22" letterSpacing="3" fill="currentColor">
          JORDAN
        </text>
        <text x="6" y="42" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.5" fill="#FF892F">
          THE KINGDOM OF TIME
        </text>
      </svg>
    ),
  },
  {
    id: 'oman',
    name: 'Experience Oman',
    tagline: 'Beauty has an address',
    renderLogo: () => (
      <svg viewBox="0 0 170 50" className="tb-svg-logo" aria-label="Experience Oman">
        {/* Flower pomegranate dot cluster */}
        <g transform="translate(115, 6)">
          <circle cx="15" cy="8" r="3.2" fill="#E11D48" />
          <circle cx="23" cy="12" r="3" fill="#9333EA" />
          <circle cx="26" cy="20" r="3.2" fill="#E11D48" />
          <circle cx="20" cy="28" r="3" fill="#BE185D" />
          <circle cx="11" cy="30" r="3.2" fill="#9333EA" />
          <circle cx="5" cy="22" r="3" fill="#E11D48" />
          <circle cx="7" cy="13" r="3.2" fill="#BE185D" />
          <circle cx="16" cy="19" r="3.6" fill="#7C3AED" />
        </g>
        <text x="6" y="24" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.5" fill="#9333EA">
          Experience
        </text>
        <text x="6" y="42" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="20" letterSpacing="1" fill="#4A044E">
          OMAN
        </text>
        <text x="68" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" fill="#9333EA">
          عُمان
        </text>
      </svg>
    ),
  },
  {
    id: 'georgia',
    name: 'Georgia National Tourism',
    tagline: 'Feel the Soul',
    renderLogo: () => (
      <svg viewBox="0 0 150 50" className="tb-svg-logo" aria-label="Georgia Tourism">
        {/* Red Asterisk / Flower icon */}
        <g transform="translate(10, 10)">
          <line x1="14" y1="2" x2="14" y2="26" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="2" y1="14" x2="26" y2="14" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="5.5" y1="5.5" x2="22.5" y2="22.5" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="5.5" y1="22.5" x2="22.5" y2="5.5" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
        </g>
        <text x="48" y="32" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="22" letterSpacing="0.5" fill="currentColor">
          Georgia
        </text>
      </svg>
    ),
  },
  {
    id: 'sweden',
    name: 'Visit Sweden',
    tagline: 'When in Sweden',
    renderLogo: () => (
      <svg viewBox="0 0 150 50" className="tb-svg-logo" aria-label="Visit Sweden">
        <text x="5" y="23" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="14" fill="currentColor">
          Visit
        </text>
        <text x="5" y="42" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="19" fill="currentColor">
          Sweden
        </text>
        {/* Swedish Flag box */}
        <g transform="translate(85, 12)">
          <rect width="32" height="22" rx="3" fill="#0284C7" />
          <rect x="9" y="0" width="5" height="22" fill="#FACC15" />
          <rect x="0" y="8.5" width="32" height="5" fill="#FACC15" />
        </g>
      </svg>
    ),
  },
  {
    id: 'maldives',
    name: 'Maldives Tourism',
    tagline: '...the sunny side of life',
    renderLogo: () => (
      <svg viewBox="0 0 170 50" className="tb-svg-logo" aria-label="Maldives Sunny Side of Life">
        {/* Sun & Palm wave */}
        <g transform="translate(6, 4)">
          <circle cx="16" cy="18" r="10" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M 6 28 Q 16 20 28 26" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
          <path d="M 12 12 Q 18 5 24 10 Q 20 16 12 12" fill="#10B981" opacity="0.85" />
        </g>
        <text x="38" y="27" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="21" fill="#0284C7">
          Maldives
        </text>
        <text x="38" y="42" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="600" fontSize="9.5" fill="#F59E0B">
          ...the sunny side of life
        </text>
      </svg>
    ),
  },
  {
    id: 'dubai',
    name: 'Dubai Economy & Tourism',
    tagline: 'Department of Economy and Tourism',
    renderLogo: () => (
      <svg viewBox="0 0 165 50" className="tb-svg-logo" aria-label="Dubai Economy and Tourism">
        {/* Stylized DUBAI Flag Letters */}
        <text x="5" y="28" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="24" letterSpacing="1">
          <tspan fill="#EF4444">D</tspan>
          <tspan fill="#22C55E">U</tspan>
          <tspan fill="currentColor">B</tspan>
          <tspan fill="#EF4444">A</tspan>
          <tspan fill="#22C55E">I</tspan>
        </text>
        <text x="6" y="42" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="8" letterSpacing="0.8" fill="currentColor" opacity="0.8">
          ECONOMY & TOURISM
        </text>
        <text x="110" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12" fill="currentColor" opacity="0.75">
          دبي
        </text>
      </svg>
    ),
  },
  {
    id: 'abudhabi',
    name: 'DCT Abu Dhabi',
    tagline: 'Department of Culture and Tourism',
    renderLogo: () => (
      <svg viewBox="0 0 185 50" className="tb-svg-logo" aria-label="Abu Dhabi DCT">
        {/* Falcon / Crest */}
        <g transform="translate(142, 6)">
          <circle cx="16" cy="18" r="14" fill="#991B1B" />
          <path d="M 16 9 L 21 16 L 16 27 L 11 16 Z" fill="#FCD34D" />
          <circle cx="16" cy="18" r="3" fill="#991B1B" />
        </g>
        <text x="5" y="20" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="currentColor">
          دائرة الثقافة والسياحة
        </text>
        <text x="5" y="34" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="9" letterSpacing="0.5" fill="currentColor">
          DEPARTMENT OF CULTURE
        </text>
        <text x="5" y="44" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="9" letterSpacing="0.5" fill="currentColor">
          AND TOURISM
        </text>
      </svg>
    ),
  },
  {
    id: 'singapore',
    name: 'Singapore Tourism Board',
    tagline: 'Passion Made Possible',
    renderLogo: () => (
      <svg viewBox="0 0 160 50" className="tb-svg-logo" aria-label="Singapore Tourism Board">
        {/* Rounded Teal STB Badge */}
        <g transform="translate(5, 6)">
          <rect width="36" height="36" rx="9" fill="#0D9488" />
          <text x="18" y="16" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="7.5" fill="#FFFFFF" textAnchor="middle">
            SINGAPORE
          </text>
          <text x="18" y="25" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="6.5" fill="#F0FDFA" textAnchor="middle">
            TOURISM
          </text>
          <text x="18" y="33" fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="6.5" fill="#F0FDFA" textAnchor="middle">
            BOARD
          </text>
        </g>
        <text x="48" y="24" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="15" letterSpacing="0.5" fill="currentColor">
          Singapore
        </text>
        <text x="48" y="38" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="600" fontSize="9" fill="#0D9488">
          Passion Made Possible
        </text>
      </svg>
    ),
  },
  {
    id: 'incredibleindia',
    name: 'Incredible India',
    tagline: 'Ministry of Tourism, Govt of India',
    renderLogo: () => (
      <svg viewBox="0 0 175 50" className="tb-svg-logo" aria-label="Incredible India">
        {/* Iconic Incredible India Exclamation Mark */}
        <g transform="translate(10, 5)">
          <text x="0" y="28" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="21" fill="currentColor">
            Incredible
          </text>
          {/* Exclamation point with curved peacock feather */}
          <path d="M 98 12 Q 101 6 104 12 L 102 24 L 99 24 Z" fill="#FF892F" />
          <circle cx="100.5" cy="27.5" r="1.8" fill="#FF892F" />
          <text x="105" y="28" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="21" fill="currentColor">
            ndia
          </text>
          <text x="1" y="39" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="7.5" letterSpacing="1.2" fill="#FF892F">
            MINISTRY OF TOURISM • GOVT OF INDIA
          </text>
        </g>
      </svg>
    ),
  },
  {
    id: 'kerala',
    name: 'Kerala Tourism',
    tagline: "God's Own Country",
    renderLogo: () => (
      <svg viewBox="0 0 165 50" className="tb-svg-logo" aria-label="Kerala Tourism">
        {/* Coconut Tree & Houseboat Crest */}
        <g transform="translate(8, 7)">
          <circle cx="16" cy="18" r="14" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="1.5" />
          <path d="M 16 11 Q 22 7 24 12 Q 19 15 16 14" fill="#059669" />
          <path d="M 16 11 Q 10 7 8 12 Q 13 15 16 14" fill="#059669" />
          <line x1="16" y1="14" x2="16" y2="25" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
          <path d="M 11 25 Q 16 27 21 25" stroke="#0284C7" strokeWidth="1.8" fill="none" />
        </g>
        <text x="44" y="23" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="17" fill="#059669">
          kerala
        </text>
        <text x="44" y="38" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="700" fontSize="9" fill="#D97706">
          God's Own Country
        </text>
      </svg>
    ),
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Tourism',
    tagline: 'Padharo Mhare Desh',
    renderLogo: () => (
      <svg viewBox="0 0 170 50" className="tb-svg-logo" aria-label="Rajasthan Tourism">
        {/* Royal Fort & Camel arch */}
        <g transform="translate(6, 8)">
          <path d="M 5 28 L 5 16 L 10 16 L 10 12 L 14 12 L 14 16 L 18 16 L 18 12 L 22 12 L 22 16 L 27 16 L 27 28 Z" fill="#B45309" opacity="0.85" />
          <circle cx="16" cy="7" r="4.5" fill="#DC2626" />
        </g>
        <text x="40" y="24" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.5" fill="#B45309">
          RAJASTHAN
        </text>
        <text x="40" y="38" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="700" fontSize="9" fill="#DC2626">
          Padharo Mhare Desh
        </text>
      </svg>
    ),
  },
  {
    id: 'himachal',
    name: 'Himachal Tourism',
    tagline: 'Unforgettable Himachal',
    renderLogo: () => (
      <svg viewBox="0 0 170 50" className="tb-svg-logo" aria-label="Himachal Tourism">
        {/* Himalayan Snow Peak */}
        <g transform="translate(6, 6)">
          <polygon points="16,6 4,28 28,28" fill="#0284C7" />
          <polygon points="16,6 11,15 21,15" fill="#FFFFFF" />
          <polygon points="26,12 18,28 34,28" fill="#0369A1" opacity="0.75" />
        </g>
        <text x="42" y="24" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="16" fill="#0284C7">
          HIMACHAL
        </text>
        <text x="42" y="38" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="700" fontSize="9" fill="currentColor" opacity="0.8">
          Unforgettable Himachal
        </text>
      </svg>
    ),
  },
  {
    id: 'kashmir',
    name: 'Jammu & Kashmir Tourism',
    tagline: 'Chalo Kashmir • Paradise on Earth',
    renderLogo: () => (
      <svg viewBox="0 0 175 50" className="tb-svg-logo" aria-label="Kashmir Tourism">
        {/* Chinar Leaf Motif */}
        <g transform="translate(6, 6)">
          <circle cx="16" cy="18" r="14" fill="rgba(239, 68, 68, 0.12)" stroke="#EF4444" strokeWidth="1.2" />
          <path d="M 16 8 Q 18 14 24 13 Q 20 18 23 23 Q 17 21 16 27 Q 15 21 9 23 Q 12 18 8 13 Q 14 14 16 8 Z" fill="#DC2626" />
        </g>
        <text x="42" y="23" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="15" fill="#DC2626">
          J&amp;K TOURISM
        </text>
        <text x="42" y="38" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="700" fontSize="9" fill="currentColor" opacity="0.8">
          Chalo Kashmir • Paradise on Earth
        </text>
      </svg>
    ),
  },
  {
    id: 'switzerland',
    name: 'Switzerland Tourism',
    tagline: 'Get Natural',
    renderLogo: () => (
      <svg viewBox="0 0 160 50" className="tb-svg-logo" aria-label="Switzerland Tourism">
        <text x="5" y="32" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="18" fill="currentColor">
          Switzerland.
        </text>
        {/* Red Swiss Cross box */}
        <g transform="translate(118, 14)">
          <rect width="20" height="20" rx="4" fill="#DC2626" />
          <rect x="8" y="4" width="4" height="12" fill="#FFFFFF" />
          <rect x="4" y="8" width="12" height="4" fill="#FFFFFF" />
        </g>
      </svg>
    ),
  },
  {
    id: 'thailand',
    name: 'Amazing Thailand',
    tagline: 'It begins with the people',
    renderLogo: () => (
      <svg viewBox="0 0 165 50" className="tb-svg-logo" aria-label="Amazing Thailand">
        <text x="5" y="20" fontFamily="'Outfit', sans-serif" fontStyle="italic" fontWeight="700" fontSize="11" fill="#EC4899">
          amazing
        </text>
        <text x="5" y="38" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="19" letterSpacing="0.5" fill="#9333EA">
          THAILAND
        </text>
        {/* Colorful ribbon smile */}
        <path d="M 115 18 Q 130 10 145 22 Q 130 34 118 26" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        <path d="M 125 15 Q 138 12 148 24" fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'japan',
    name: 'Japan Tourism (JNTO)',
    tagline: 'Endless Discovery',
    renderLogo: () => (
      <svg viewBox="0 0 160 50" className="tb-svg-logo" aria-label="Japan Tourism">
        <circle cx="22" cy="24" r="14" fill="#DC2626" />
        <text x="44" y="25" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="19" letterSpacing="1" fill="currentColor">
          Japan.
        </text>
        <text x="44" y="39" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="0.8" fill="currentColor" opacity="0.75">
          Endless Discovery
        </text>
      </svg>
    ),
  },
];

export default function TourismBoardsMarquee() {
  return (
    <section className="tourism-boards-section" aria-label="Accredited Tourism Boards">
      <div className="tb-container">
        {/* Section Header with Refined Editorial Small-Caps */}
        <div className="tb-header-row">
          <div className="tb-header-line" />
          <div className="tb-badge-center">
            <span className="tb-label-kicker">ACCREDITED & COMPLIANT</span>
            <h3 className="tb-title">TOURISM BOARDS</h3>
            <span className="tb-subtitle">
              Adhering to Official Guidelines of Global &amp; Indian National Tourism Authorities
            </span>
          </div>
          <div className="tb-header-line" />
        </div>

        {/* Continuous Marquee Scrolling Strip */}
        <div className="tb-marquee-viewport">
          <div className="tb-marquee-track">
            {/* Set 1 */}
            {TOURISM_BOARDS.map((board) => (
              <div 
                key={`tb-1-${board.id}`} 
                className="tb-logo-card"
                title={`${board.name} • ${board.tagline}`}
              >
                {board.renderLogo()}
              </div>
            ))}

            {/* Set 2 (for seamless loop) */}
            {TOURISM_BOARDS.map((board) => (
              <div 
                key={`tb-2-${board.id}`} 
                className="tb-logo-card"
                title={`${board.name} • ${board.tagline}`}
                aria-hidden="true"
              >
                {board.renderLogo()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
