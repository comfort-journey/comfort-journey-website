/**
 * Safely parses the realistic vacation duration in days for a tour package.
 * Fixes historical concatenation bugs (e.g. "4 Nights & 5 Days" becoming 45 days).
 * 
 * @param {Object|string} tourOrDuration - Tour object or duration string
 * @returns {number} Duration in days (typically 3 to 14 days)
 */
export function parseTourDays(tourOrDuration) {
  if (!tourOrDuration) return 5;

  let durationStr = '';
  let rawDays = 0;

  if (typeof tourOrDuration === 'string') {
    durationStr = tourOrDuration;
  } else if (typeof tourOrDuration === 'object') {
    durationStr = String(tourOrDuration.duration || '');
    rawDays = Number(tourOrDuration.durationDays) || 0;
  }

  // 1. Primary priority: parse explicitly from duration text (e.g., "4 Nights & 5 Days", "5N/6D", "3 Days")
  if (durationStr) {
    // Check for "X Days" or "X Day"
    const daysMatch = durationStr.match(/(\d+)\s*Days?/i);
    if (daysMatch) {
      const d = parseInt(daysMatch[1], 10);
      if (d > 0 && d <= 30) return d;
    }

    // Check for "X Nights & Y Days" or "XN/YD"
    const slashDMatch = durationStr.match(/(?:\/|\s|^)(\d+)D\b/i);
    if (slashDMatch) {
      const d = parseInt(slashDMatch[1], 10);
      if (d > 0 && d <= 30) return d;
    }

    // Check for "X Nights" -> Days = Nights + 1
    const nightsMatch = durationStr.match(/(\d+)\s*Nights?/i) || durationStr.match(/^(\d+)N\b/i);
    if (nightsMatch) {
      const n = parseInt(nightsMatch[1], 10);
      if (n > 0 && n <= 30) return n + 1;
    }
  }

  // 2. Secondary priority: clean up raw durationDays if present
  if (rawDays > 0) {
    // If it's a realistic day count <= 21 and not a 2-digit concatenation artifact like 45, 56, 34, 23
    if (rawDays <= 21 && !String(rawDays).match(/^[2-9][0-9]$/)) {
      return rawDays;
    }
    // Handle concatenated digits from historical Wix import (e.g. 45 -> 5, 56 -> 6, 23 -> 3, 78 -> 8, 76 -> 6)
    if (rawDays >= 20 && rawDays <= 99) {
      const lastDigit = rawDays % 10;
      if (lastDigit >= 2 && lastDigit <= 9) {
        return lastDigit;
      }
    }
  }

  // 3. Sensible luxury vacation default (5 days)
  return 5;
}

/**
 * Returns formatted duration display string like "5 Days / 4 Nights"
 */
export function formatTourDuration(tourOrDuration) {
  const days = parseTourDays(tourOrDuration);
  const nights = Math.max(1, days - 1);
  return `${days} Days / ${nights} Nights`;
}
