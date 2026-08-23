/**
 * COMFORT JOURNEY — OFFICIAL BRAND COLOR PALETTE MEMORY
 * Est. 1992 · "YOUR JOURNEY • YOUR COMFORT"
 */

export const BRAND_COLORS = {
  // 1. Vivid Tangerine (Primary Action, Warm Sunset Glow, CTAs, Highlights)
  vividTangerine: {
    hex: '#FF892F',
    rgb: '255, 137, 47',
    name: 'Vivid Tangerine',
    role: 'Primary Brand Action, Booking CTAs, Price Highlights, Active Badges',
    shades: {
      light: '#FFA459',
      main: '#FF892F',
      dark: '#E66F12',
    }
  },

  // 2. Beige / Warm Cream (Primary Light Shade, Editorial Headings, Body Text, Soft Badges)
  beige: {
    hex: '#F9FBE7',
    rgb: '249, 251, 231',
    name: 'Beige Cream',
    role: 'Primary Light Shade (replaces harsh #FFFFFF for luxury warmth), Headings, Body Copy',
    shades: {
      light: '#FFFFFF',
      main: '#F9FBE7',
      muted: '#EDF3D2',
      dim: '#DEE9B8',
    }
  },

  // 3. Electric Aqua (Sky, Tropical Ocean, Weather, Tech/AI Accents, Secondary Glow)
  electricAqua: {
    hex: '#6FE6FC',
    rgb: '111, 230, 252',
    name: 'Electric Aqua',
    role: 'Secondary Accent, Tropical & Island Tags, Weather Ticker, AI Glow, Interactive Links',
    shades: {
      light: '#93EEFD',
      main: '#6FE6FC',
      dark: '#3DD7F3',
    }
  },

  // 4. Lime Cream (High-Energy Travel Accent, Verified Badges, Special Offers, Adventure)
  limeCream: {
    hex: '#DAF561',
    rgb: '218, 245, 97',
    name: 'Lime Cream',
    role: 'Verified Traveler Badges, 5-Star Accents, Best Seller Chips, Adventure Vibe',
    shades: {
      light: '#E5F886',
      main: '#DAF561',
      dark: '#BFE032',
    }
  },

  // 5. Deep Navy (Primary Dark Base, Midnight Elegance, Glass Cards, replaces harsh pure black)
  deepNavy: {
    hex: '#001D51',
    rgb: '0, 29, 81',
    name: 'Deep Navy',
    role: 'Primary Dark Base (replaces flat pure black for deep royal navy luxury), Panels, Card Surfaces',
    shades: {
      deepest: '#001233',
      main: '#001D51',
      card: '#052669',
      surface: '#0A3282',
      border: 'rgba(111, 230, 252, 0.2)',
    }
  }
};

export default BRAND_COLORS;
