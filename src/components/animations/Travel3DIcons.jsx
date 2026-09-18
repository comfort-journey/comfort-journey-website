import React from 'react';

/**
 * Travel3DIcons:
 * High-fidelity, multi-layered 3D vector monuments and travel elements.
 * Built with rich depth gradients, directional lighting, and ambient glow
 * for that premium Stippl / Awwwards aesthetic.
 */

// 1. Taj Mahal 3D Monument (Ivory & Gold Mughal Palace)
export const TajMahal3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tajSkyGlow" x1="150" y1="0" x2="150" y2="300" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD166" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#FF892F" stopOpacity="0.1" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <linearGradient id="tajMarble3D" x1="100" y1="50" x2="200" y2="250" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="45%" stopColor="#F5F3EB" />
        <stop offset="85%" stopColor="#E0D8C3" />
        <stop offset="100%" stopColor="#C9BFA8" />
      </linearGradient>
      <linearGradient id="tajGoldTrim" x1="150" y1="20" x2="150" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#FFB300" />
        <stop offset="100%" stopColor="#FF8F00" />
      </linearGradient>
      <linearGradient id="tajShadow" x1="150" y1="180" x2="150" y2="290" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0B051D" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#0B051D" stopOpacity="0.95" />
      </linearGradient>
      <radialGradient id="tajDomeHighlight" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#FAF7EE" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#D5CBB5" stopOpacity="0.4" />
      </radialGradient>
      <filter id="tajAura" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Background Moon/Sun Halo */}
    <circle cx="150" cy="150" r="120" fill="url(#tajSkyGlow)" />

    {/* Platform Plinth */}
    <rect x="40" y="240" width="220" height="18" rx="3" fill="url(#tajMarble3D)" stroke="url(#tajGoldTrim)" strokeWidth="1.5" />
    <rect x="55" y="232" width="190" height="10" rx="2" fill="#E8DFCE" />

    {/* Left Minaret */}
    <rect x="48" y="110" width="16" height="122" rx="2" fill="url(#tajMarble3D)" />
    <line x1="48" y1="150" x2="64" y2="150" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <line x1="48" y1="190" x2="64" y2="190" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <ellipse cx="56" cy="108" rx="10" ry="14" fill="url(#tajMarble3D)" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <path d="M56 94 L56 86" stroke="url(#tajGoldTrim)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="56" cy="84" r="2.5" fill="#FFD54F" />

    {/* Right Minaret */}
    <rect x="236" y="110" width="16" height="122" rx="2" fill="url(#tajMarble3D)" />
    <line x1="236" y1="150" x2="252" y2="150" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <line x1="236" y1="190" x2="252" y2="190" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <ellipse cx="244" cy="108" rx="10" ry="14" fill="url(#tajMarble3D)" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <path d="M244 94 L244 86" stroke="url(#tajGoldTrim)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="244" cy="84" r="2.5" fill="#FFD54F" />

    {/* Central Main Mausoleum Block */}
    <path d="M78 232 L78 152 L95 152 L95 140 L205 140 L205 152 L222 232 Z" fill="url(#tajMarble3D)" stroke="#D8CEBA" strokeWidth="1.2" />

    {/* Left Side Small Dome */}
    <path d="M96 140 Q112 105 128 140 Z" fill="url(#tajMarble3D)" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <line x1="112" y1="105" x2="112" y2="98" stroke="url(#tajGoldTrim)" strokeWidth="1.2" />

    {/* Right Side Small Dome */}
    <path d="M172 140 Q188 105 204 140 Z" fill="url(#tajMarble3D)" stroke="url(#tajGoldTrim)" strokeWidth="1" />
    <line x1="188" y1="105" x2="188" y2="98" stroke="url(#tajGoldTrim)" strokeWidth="1.2" />

    {/* Central High Onion Dome */}
    <ellipse cx="150" cy="106" rx="42" ry="52" fill="url(#tajMarble3D)" />
    <ellipse cx="150" cy="106" rx="42" ry="52" fill="url(#tajDomeHighlight)" />
    {/* Dome Finial Spear & Crescent */}
    <path d="M150 54 L150 32" stroke="url(#tajGoldTrim)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="150" cy="30" r="4.5" fill="#FFE082" filter="url(#tajAura)" />
    <path d="M148 24 Q153 21 155 26" stroke="#FFD54F" strokeWidth="1.5" fill="none" />

    {/* Grand Central Arch (Iwan) */}
    <path d="M125 232 L125 180 Q150 156 175 180 L175 232 Z" fill="url(#tajShadow)" stroke="url(#tajGoldTrim)" strokeWidth="1.8" />
    {/* Inner Jali Arch Motif */}
    <path d="M135 232 L135 192 Q150 176 165 192 L165 232 Z" fill="#06020E" stroke="#FFB300" strokeWidth="0.8" strokeDasharray="2 3" />

    {/* Flanking Side Arches */}
    <path d="M88 226 L88 198 Q98 186 108 198 L108 226 Z" fill="url(#tajShadow)" />
    <path d="M88 184 L88 160 Q98 150 108 160 L108 184 Z" fill="url(#tajShadow)" />

    <path d="M192 226 L192 198 Q202 186 212 198 L212 226 Z" fill="url(#tajShadow)" />
    <path d="M192 184 L192 160 Q202 150 212 160 L212 184 Z" fill="url(#tajShadow)" />

    {/* Reflecting Pool Shimmer Water */}
    <ellipse cx="150" cy="270" rx="90" ry="12" fill="#091E3A" opacity="0.6" />
    <path d="M100 270 Q150 266 200 270" stroke="#6FE6FC" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="8 6" />
    <path d="M120 276 Q150 273 180 276" stroke="#FFE082" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 4" />
  </svg>
);

// 2. Jaipur Hawa Mahal 3D (Pink City Terracotta Palace with Jharokhas)
export const HawaMahal3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hawaPinkStone" x1="50" y1="40" x2="250" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F98D68" />
        <stop offset="35%" stopColor="#E76F51" />
        <stop offset="75%" stopColor="#C44536" />
        <stop offset="100%" stopColor="#9B2226" />
      </linearGradient>
      <linearGradient id="hawaGoldLattice" x1="150" y1="50" x2="150" y2="260" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#F4A261" />
      </linearGradient>
      <radialGradient id="hawaWindowGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.9" />
        <stop offset="80%" stopColor="#E76F51" stopOpacity="0.3" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Background warm desert sunset halo */}
    <circle cx="150" cy="150" r="115" fill="url(#hawaGoldLattice)" opacity="0.18" />

    {/* Pyramid Base Platform */}
    <rect x="35" y="250" width="230" height="20" rx="3" fill="#9B2226" stroke="#F4A261" strokeWidth="1.2" />

    {/* Level 5 (Base storey - widest: 5 Bays) */}
    <rect x="50" y="200" width="200" height="50" rx="4" fill="url(#hawaPinkStone)" stroke="#FFD166" strokeWidth="0.8" />
    {[68, 106, 144, 182, 220].map((x, i) => (
      <g key={`l5-${i}`}>
        <path d={`M${x} 242 L${x} 214 Q${x + 8} 206 ${x + 16} 214 L${x + 16} 242 Z`} fill="#4A0510" stroke="#FFD166" strokeWidth="0.8" />
        <circle cx={x + 8} cy={224} r="5" fill="url(#hawaWindowGlow)" />
        <path d={`M${x - 2} 212 Q${x + 8} 202 ${x + 18} 212`} stroke="#FFE3A8" strokeWidth="1.2" fill="none" />
      </g>
    ))}

    {/* Level 4 (4 Bays) */}
    <rect x="68" y="155" width="164" height="46" rx="4" fill="url(#hawaPinkStone)" stroke="#FFD166" strokeWidth="0.8" />
    {[84, 122, 160, 198].map((x, i) => (
      <g key={`l4-${i}`}>
        <path d={`M${x} 193 L${x} 168 Q${x + 7} 160 ${x + 14} 168 L${x + 14} 193 Z`} fill="#4A0510" stroke="#FFD166" strokeWidth="0.8" />
        <circle cx={x + 7} cy={178} r="4.5" fill="url(#hawaWindowGlow)" />
        <path d={`M${x - 2} 166 Q${x + 7} 157 ${x + 16} 166`} stroke="#FFE3A8" strokeWidth="1.2" fill="none" />
      </g>
    ))}

    {/* Level 3 (3 Bays) */}
    <rect x="88" y="115" width="124" height="41" rx="4" fill="url(#hawaPinkStone)" stroke="#FFD166" strokeWidth="0.8" />
    {[104, 143, 182].map((x, i) => (
      <g key={`l3-${i}`}>
        <path d={`M${x} 149 L${x} 126 Q${x + 7} 118 ${x + 14} 126 L${x + 14} 149 Z`} fill="#4A0510" stroke="#FFD166" strokeWidth="0.8" />
        <circle cx={x + 7} cy={134} r="4" fill="url(#hawaWindowGlow)" />
        <path d={`M${x - 2} 124 Q${x + 7} 115 ${x + 16} 124`} stroke="#FFE3A8" strokeWidth="1.2" fill="none" />
      </g>
    ))}

    {/* Level 2 (2 Bays) */}
    <rect x="110" y="80" width="80" height="36" rx="4" fill="url(#hawaPinkStone)" stroke="#FFD166" strokeWidth="0.8" />
    {[124, 162].map((x, i) => (
      <g key={`l2-${i}`}>
        <path d={`M${x} 110 L${x} 88 Q${x + 7} 81 ${x + 14} 88 L${x + 14} 110 Z`} fill="#4A0510" stroke="#FFD166" strokeWidth="0.8" />
        <circle cx={x + 7} cy={97} r="3.5" fill="url(#hawaWindowGlow)" />
        <path d={`M${x - 2} 86 Q${x + 7} 78 ${x + 16} 86`} stroke="#FFE3A8" strokeWidth="1" fill="none" />
      </g>
    ))}

    {/* Top Crown Dome (Single pinnacle) */}
    <path d="M135 80 L135 62 Q150 42 165 62 L165 80 Z" fill="url(#hawaPinkStone)" stroke="#FFD166" strokeWidth="1" />
    <path d="M150 42 L150 26" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" />
    <circle cx="150" cy="24" r="3.5" fill="#FFE082" />
    <ellipse cx="150" cy="62" rx="14" ry="4" fill="#FFD166" opacity="0.6" />
  </svg>
);

// 3. Kerala Kettuvallam 3D Houseboat (Backwaters Luxury)
export const KeralaHouseboat3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boatHull" x1="50" y1="180" x2="250" y2="240" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4A2810" />
        <stop offset="50%" stopColor="#6F3F1E" />
        <stop offset="100%" stopColor="#301A0A" />
      </linearGradient>
      <linearGradient id="thatchRoof" x1="100" y1="100" x2="220" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E8C374" />
        <stop offset="50%" stopColor="#C6923E" />
        <stop offset="100%" stopColor="#8C5C1B" />
      </linearGradient>
      <radialGradient id="lakeWaterGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#004D40" stopOpacity="0.15" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Water backdrop */}
    <ellipse cx="150" cy="215" r="110" fill="url(#lakeWaterGlow)" />

    {/* Palm silhouette backdrop */}
    <path d="M220 180 Q240 120 270 100 Q250 115 240 135 Q260 125 280 130 Q250 145 235 155" stroke="#165B33" strokeWidth="2.5" fill="none" opacity="0.6" />

    {/* Traditional Wooden Hull */}
    <path d="M30 205 Q50 235 150 235 Q250 235 270 205 Q245 218 150 218 Q55 218 30 205 Z" fill="url(#boatHull)" stroke="#8D5B2E" strokeWidth="1.5" />
    <line x1="60" y1="216" x2="240" y2="216" stroke="#DAA520" strokeWidth="1" strokeDasharray="6 3" />

    {/* Woven Coir Thatched Curved Canopy Roof */}
    <path d="M65 210 C70 140 110 118 150 118 C190 118 230 140 235 210 Z" fill="url(#thatchRoof)" stroke="#664010" strokeWidth="1.2" />

    {/* Canopy Rib Bands (Anjili wood ribs) */}
    {[90, 115, 150, 185, 210].map((rx, idx) => (
      <path key={idx} d={`M${rx} 210 Q${150 + (rx - 150) * 0.3} 122 ${rx} 210`} stroke="#5C360C" strokeWidth="1.2" fill="none" opacity="0.7" />
    ))}

    {/* Stateroom Cabin Windows with warm interior light */}
    <rect x="110" y="172" width="30" height="22" rx="3" fill="#FFE082" opacity="0.9" />
    <rect x="155" y="172" width="30" height="22" rx="3" fill="#FFE082" opacity="0.9" />
    <line x1="125" y1="172" x2="125" y2="194" stroke="#5C360C" strokeWidth="1.2" />
    <line x1="170" y1="172" x2="170" y2="194" stroke="#5C360C" strokeWidth="1.2" />

    {/* Front Open Viewing Deck with Brass Railing */}
    <path d="M225 210 L260 206" stroke="#FFD54F" strokeWidth="2" />
    <line x1="238" y1="210" x2="238" y2="202" stroke="#FFD54F" strokeWidth="1.2" />
    <line x1="250" y1="209" x2="250" y2="203" stroke="#FFD54F" strokeWidth="1.2" />

    {/* Captain's Steering Oar at Bow */}
    <line x1="45" y1="200" x2="20" y2="235" stroke="#B87333" strokeWidth="2" strokeLinecap="round" />

    {/* Gentle Ripples */}
    <path d="M70 240 Q150 246 230 240" stroke="#6FE6FC" strokeWidth="1.5" strokeOpacity="0.7" strokeDasharray="10 8" />
    <path d="M100 248 Q150 252 200 248" stroke="#6FE6FC" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="6 6" />
  </svg>
);

// 4. Eiffel Tower 3D Landmark (Paris Romance & Luxury)
export const EiffelTower3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eiffelGold" x1="150" y1="10" x2="150" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="35%" stopColor="#FFD54F" />
        <stop offset="70%" stopColor="#FFA000" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
      <radialGradient id="eiffelLightBeam" cx="50%" cy="10%" r="90%">
        <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.75" />
        <stop offset="40%" stopColor="#FFD54F" stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Sky Searchlight Beam */}
    <path d="M150 25 L80 0 L220 0 Z" fill="url(#eiffelLightBeam)" opacity="0.6" />

    {/* Base Arch */}
    <path d="M90 260 C100 215 200 215 210 260" stroke="url(#eiffelGold)" strokeWidth="3" fill="none" />
    <line x1="75" y1="260" x2="225" y2="260" stroke="url(#eiffelGold)" strokeWidth="2.5" />

    {/* 1st Floor Platform */}
    <rect x="85" y="210" width="130" height="8" rx="2" fill="url(#eiffelGold)" />
    <line x1="75" y1="260" x2="100" y2="210" stroke="url(#eiffelGold)" strokeWidth="3" />
    <line x1="225" y1="260" x2="200" y2="210" stroke="url(#eiffelGold)" strokeWidth="3" />

    {/* 1st to 2nd Floor Lattice */}
    <line x1="102" y1="210" x2="120" y2="145" stroke="url(#eiffelGold)" strokeWidth="2.5" />
    <line x1="198" y1="210" x2="180" y2="145" stroke="url(#eiffelGold)" strokeWidth="2.5" />
    <line x1="105" y1="205" x2="195" y2="150" stroke="url(#eiffelGold)" strokeWidth="0.8" opacity="0.7" />
    <line x1="195" y1="205" x2="105" y2="150" stroke="url(#eiffelGold)" strokeWidth="0.8" opacity="0.7" />

    {/* 2nd Floor Platform */}
    <rect x="115" y="145" width="70" height="7" rx="2" fill="url(#eiffelGold)" />

    {/* Tower Spire Section */}
    <path d="M125 145 L145 40 L155 40 L175 145 Z" fill="none" stroke="url(#eiffelGold)" strokeWidth="2" />
    {/* Spire horizontal lattice bars */}
    {[125, 105, 85, 65, 50].map((y, idx) => (
      <line key={idx} x1={150 - (y - 40) * 0.22} y1={y} x2={150 + (y - 40) * 0.22} y2={y} stroke="url(#eiffelGold)" strokeWidth="1" />
    ))}

    {/* Top Dome & Lantern */}
    <ellipse cx="150" cy="36" rx="7" ry="5" fill="#FFE082" />
    <line x1="150" y1="31" x2="150" y2="16" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="150" cy="15" r="4" fill="#FFFFFF" />

    {/* Twinkling stars */}
    <circle cx="95" cy="70" r="1.5" fill="#FFF" />
    <circle cx="215" cy="95" r="2" fill="#FFE082" />
    <circle cx="80" cy="140" r="1.8" fill="#FFF" />
    <circle cx="220" cy="180" r="1.5" fill="#FFF" />
  </svg>
);

// 5. Burj Khalifa 3D Spire (Dubai Skyline & Future Luxury)
export const BurjKhalifa3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="burjGlass" x1="130" y1="20" x2="170" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E0F7FA" />
        <stop offset="30%" stopColor="#80DEEA" />
        <stop offset="70%" stopColor="#00ACC1" />
        <stop offset="100%" stopColor="#006064" />
      </linearGradient>
      <linearGradient id="burjEdge" x1="150" y1="20" x2="150" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#26C6DA" />
      </linearGradient>
    </defs>

    {/* Tier 1 - Wide Base */}
    <rect x="110" y="220" width="80" height="50" rx="3" fill="url(#burjGlass)" stroke="url(#burjEdge)" strokeWidth="1" />
    {/* Tier 2 */}
    <rect x="118" y="180" width="64" height="40" rx="2" fill="url(#burjGlass)" stroke="url(#burjEdge)" strokeWidth="1" />
    {/* Tier 3 */}
    <rect x="126" y="145" width="48" height="35" rx="2" fill="url(#burjGlass)" stroke="url(#burjEdge)" strokeWidth="1" />
    {/* Tier 4 */}
    <rect x="134" y="115" width="32" height="30" rx="1.5" fill="url(#burjGlass)" stroke="url(#burjEdge)" strokeWidth="1" />
    {/* Tier 5 */}
    <rect x="140" y="85" width="20" height="30" rx="1" fill="url(#burjGlass)" stroke="url(#burjEdge)" strokeWidth="1" />
    {/* Tier 6 (Upper stem) */}
    <rect x="144" y="55" width="12" height="30" rx="1" fill="url(#burjGlass)" stroke="url(#burjEdge)" strokeWidth="1" />

    {/* Central Spine Needle */}
    <line x1="150" y1="55" x2="150" y2="15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="150" cy="14" r="3" fill="#FFEB3B" />

    {/* Central Vertical Rib Reflective Shine */}
    <line x1="150" y1="55" x2="150" y2="270" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.65" />
    
    {/* Horizontal Floor Lines */}
    {[245, 230, 205, 190, 165, 130, 100, 70].map((y, i) => (
      <line key={i} x1="120" y1={y} x2="180" y2={y} stroke="#E0F7FA" strokeWidth="0.6" opacity="0.5" />
    ))}
  </svg>
);

// 6. Mount Fuji & Sakura 3D (Japan Zen & Alpine Serenity)
export const MountFuji3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fujiSun" x1="150" y1="50" x2="150" y2="190" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF4D4D" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FF8080" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="fujiSlope" x1="150" y1="80" x2="150" y2="250" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3949AB" />
        <stop offset="50%" stopColor="#283593" />
        <stop offset="100%" stopColor="#1A237E" />
      </linearGradient>
    </defs>

    {/* Crimson Rising Sun */}
    <circle cx="150" cy="125" r="58" fill="url(#fujiSun)" />

    {/* Symmetrical Mountain Volcano Base */}
    <path d="M40 250 Q100 240 125 110 L175 110 Q200 240 260 250 Z" fill="url(#fujiSlope)" />

    {/* Snowcap Crown with ragged serrated edge */}
    <path d="M125 110 L175 110 L188 150 L172 144 L160 156 L150 142 L140 154 L128 144 L112 150 Z" fill="#FFFFFF" />
    <path d="M130 110 L170 110 L160 128 L150 120 L140 128 Z" fill="#E8EAF6" opacity="0.7" />

    {/* Torii Gate Silhouette in Foreground */}
    <rect x="132" y="210" width="36" height="4" fill="#FF1744" rx="1" />
    <rect x="128" y="202" width="44" height="4" fill="#D50000" rx="1" />
    <rect x="136" y="214" width="4" height="36" fill="#D50000" />
    <rect x="160" y="214" width="4" height="36" fill="#D50000" />

    {/* Cherry Blossom Sakura Petals drifting */}
    {[
      { cx: 70, cy: 90, r: 3 },
      { cx: 85, cy: 115, r: 2.5 },
      { cx: 215, cy: 80, r: 3.5 },
      { cx: 235, cy: 105, r: 2.8 },
      { cx: 200, cy: 135, r: 2 }
    ].map((p, i) => (
      <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#FF80AB" opacity="0.8" />
    ))}
  </svg>
);

// 7. Campfire & Misty Pines 3D (Weekend Quick Escapes)
export const Campfire3D = ({ size = 260 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fireOuter" x1="150" y1="120" x2="150" y2="230" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="40%" stopColor="#FF8F00" />
        <stop offset="100%" stopColor="#D84315" />
      </linearGradient>
      <radialGradient id="fireGlow" cx="50%" cy="60%" r="45%">
        <stop offset="0%" stopColor="#FFA000" stopOpacity="0.4" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Ambient Glow */}
    <circle cx="150" cy="190" r="100" fill="url(#fireGlow)" />

    {/* Pine silhouettes in background */}
    <path d="M60 210 L80 160 L70 160 L85 130 L100 160 L90 160 L110 210 Z" fill="#0A2F1D" opacity="0.6" />
    <path d="M190 210 L210 150 L200 150 L220 120 L240 150 L230 150 L250 210 Z" fill="#0A2F1D" opacity="0.6" />

    {/* Crossed Campfire Logs */}
    <rect x="90" y="215" width="120" height="18" rx="7" transform="rotate(-15 150 220)" fill="#4E342E" stroke="#3E2723" strokeWidth="1.5" />
    <rect x="90" y="215" width="120" height="18" rx="7" transform="rotate(15 150 220)" fill="#5D4037" stroke="#3E2723" strokeWidth="1.5" />

    {/* Charcoal Embers Bed */}
    <ellipse cx="150" cy="225" rx="55" ry="12" fill="#BF360C" opacity="0.75" />

    {/* Main Flame Tongue (Back) */}
    <path d="M150 115 Q120 170 135 215 Q150 220 165 215 Q180 170 150 115 Z" fill="url(#fireOuter)" />
    {/* Inner White-Hot Flame Core */}
    <path d="M150 145 Q135 180 142 215 Q150 218 158 215 Q165 180 150 145 Z" fill="#FFF9C4" />

    {/* Floating Ember Sparks */}
    {[
      { cx: 130, cy: 110, r: 2.5 },
      { cx: 165, cy: 95, r: 3 },
      { cx: 145, cy: 80, r: 2 },
      { cx: 175, cy: 130, r: 2 }
    ].map((em, i) => (
      <circle key={i} cx={em.cx} cy={em.cy} r={em.r} fill="#FFD54F" />
    ))}
  </svg>
);
