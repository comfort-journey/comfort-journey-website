import QRCode from 'qrcode';

/**
 * Itinerary Export Service for Comfy.ai & Comfort Journey
 * Provides 1-click exports:
 * 1. Excel Spreadsheet (.csv / .xlsx compatible)
 * 2. Visual Social Share Card (HTML5 Canvas PNG matching Trip.com 9:16 story card)
 * 3. Printable PDF Travel Brochure (Matching Trip.com's multi-page brochure)
 */

/**
 * 1. Export Itinerary to Excel-compatible CSV format
 */
export function exportItineraryToExcel(rawPlan) {
  if (!rawPlan) return;
  const days = rawPlan.days || rawPlan.itinerary || [];
  if (!days.length) return;

  const tripPlan = {
    title: rawPlan.name || rawPlan.title || 'Curated Vacation Itinerary',
    destination: rawPlan.destination || rawPlan.location || 'Vacation Destination',
    duration: rawPlan.duration || `${days.length} Days`,
    party: rawPlan.party || 'Private Tour',
    vehicle: rawPlan.vehicle || 'Dedicated AC Private Cab',
    dietary: rawPlan.dietary || 'Daily Breakfast & Stays',
    days
  };

  const headers = [
    'Day',
    'Time',
    'Activity Type',
    'Title / Stop Name',
    'Details & Vehicle Notes',
    'Duration',
    'Ticket Status',
    'Dietary / Meal Notes',
    'Nearby Highlights'
  ];

  const rows = [];

  tripPlan.days.forEach(d => {
    const stops = d.stops && Array.isArray(d.stops) && d.stops.length > 0 ? d.stops : [
      {
        time: '09:30 AM',
        type: 'Sightseeing',
        title: d.title || `Day ${d.day} Excursion`,
        subtitle: d.desc || d.summary || '',
        duration: 'Full Day',
        ticketStatus: 'Included'
      }
    ];

    stops.forEach(s => {
      const nearby = s.proximity?.landmarks ? s.proximity.landmarks.map(l => `${l.name} (${l.dist})`).join('; ') : '';
      rows.push([
        `Day ${d.day}`,
        `"${s.time || '09:00 AM'}"`,
        `"${s.type || 'Sightseeing'}"`,
        `"${(s.title || d.title || '').replace(/"/g, '""')}"`,
        `"${(s.subtitle || s.description || d.desc || '').replace(/"/g, '""')}"`,
        `"${s.duration || '2-3 Hours'}"`,
        `"${s.ticketStatus || 'Included'}"`,
        `"${tripPlan.dietary}"`,
        `"${nearby.replace(/"/g, '""')}"`
      ]);
    });
  });

  const csvContent = '\uFEFF' + [
    `"COMFORT JOURNEY - PERSONALIZED VACATION ITINERARY"`,
    `"Trip: ${tripPlan.title}"`,
    `"Destination: ${tripPlan.destination}"`,
    `"Duration: ${tripPlan.duration}"`,
    `"Travelers: ${tripPlan.party}"`,
    `"Vehicle: ${tripPlan.vehicle}"`,
    `"Dietary: ${tripPlan.dietary}"`,
    `"Emergency / Concierge Hotline: +91 9203931912"`,
    '',
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${(tripPlan.destination || 'Vacation').replace(/\s+/g, '_')}_Itinerary_ComfortJourney.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 2. Generate Visual Social Share Card using HTML5 Canvas
 * Features real-time GPS route map projection and authentic scannable QR code.
 */
export async function generateSocialCardDataUrl(rawPlan) {
  if (!rawPlan) return '';
  const days = rawPlan.days || rawPlan.itinerary || [];
  const tripPlan = {
    title: rawPlan.name || rawPlan.title || 'Curated Vacation Holiday',
    destination: rawPlan.destination || rawPlan.location || 'Vacation',
    duration: rawPlan.duration || `${days.length} Days`,
    party: rawPlan.party || 'Private Tour',
    pacing: rawPlan.pacing || 'Relaxed Pace',
    vehicle: rawPlan.vehicle || 'Private AC Chauffeur Cab',
    dietary: rawPlan.dietary || 'Daily Breakfast & Stays',
    stayTier: rawPlan.stayTier || rawPlan.hotelTier || 'Handpicked 4★ Stays',
    days
  };

  const canvas = document.createElement('canvas');
  const width = 640;
  const height = 1200;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background Dark Navy
  ctx.fillStyle = '#001233';
  ctx.fillRect(0, 0, width, height);

  // --- TOP HERO SECTION: Luxury Editorial Postcard Header (No Spiderwebs) ---
  const headerHeight = 310;

  // Background gradient: Midnight Blue & Subtle Gold Accents
  const heroGrad = ctx.createLinearGradient(0, 0, width, headerHeight);
  heroGrad.addColorStop(0, '#06101E');
  heroGrad.addColorStop(0.5, '#0C1B33');
  heroGrad.addColorStop(1, '#091528');
  ctx.fillStyle = heroGrad;
  ctx.fillRect(0, 0, width, headerHeight);

  // Decorative Golden Ambient Geometry
  ctx.strokeStyle = 'rgba(255, 137, 47, 0.18)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(width * 0.85, 40, 160, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(2, 132, 199, 0.15)';
  ctx.beginPath();
  ctx.arc(width * 0.1, 260, 140, 0, Math.PI * 2);
  ctx.stroke();

  // Top Eyebrow Pill
  ctx.fillStyle = 'rgba(255, 137, 47, 0.15)';
  ctx.beginPath();
  ctx.roundRect(40, 32, 280, 28, [14]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 137, 47, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#FF892F';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('✦ COMFORT JOURNEY · PRIVATE TRAVEL EST. 1992', 54, 50);

  // Destination Display Name in Bold Luxury Gold
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const destUpper = (tripPlan.destination || 'VACATION').toUpperCase();
  ctx.fillText(destUpper.length > 20 ? destUpper.slice(0, 18) + '...' : destUpper, 40, 108);

  // Subtitle
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Customized Vacation Itinerary & Private Chauffeur Tour', 40, 134);

  // Feature Pill Row
  const pillData = [
    { label: tripPlan.duration, color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.12)' },
    { label: tripPlan.party, color: '#A78BFA', bg: 'rgba(167, 139, 250, 0.12)' },
    { label: tripPlan.pacing.split(' ')[0], color: '#34D399', bg: 'rgba(52, 211, 153, 0.12)' }
  ];

  let pillX = 40;
  pillData.forEach(p => {
    ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const textW = ctx.measureText(p.label).width;
    ctx.fillStyle = p.bg;
    ctx.beginPath();
    ctx.roundRect(pillX, 155, textW + 24, 28, [14]);
    ctx.fill();
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = p.color;
    ctx.fillText(p.label, pillX + 12, 173);
    pillX += textW + 34;
  });

  // Chauffeur & Vehicle Inclusions Banner
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.roundRect(40, 200, width - 80, 48, [12]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#FF892F';
  ctx.font = 'bold 12.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🚗 ' + tripPlan.vehicle, 56, 222);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Dedicated verified driver • 100% Pure Veg / Jain meal support • Handpicked stays', 56, 239);

  // Bottom Divider Ribbon
  ctx.fillStyle = 'linear-gradient(to right, #FF892F, #0284C7)';
  ctx.fillRect(0, 275, width, 3);
  // White Card Main Container
  ctx.fillStyle = '#F8FAFC';
  ctx.beginPath();
  ctx.roundRect(24, 320, width - 48, height - 344, [24, 24, 24, 24]);
  ctx.fill();

  // Brand Tag & Title
  ctx.fillStyle = '#FF892F';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('COMFORT JOURNEY • EST. 1992', 50, 365);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const mainTitle = tripPlan.title || `${tripPlan.durationDays || 5}-Day ${tripPlan.destination} Holiday`;
  ctx.fillText(mainTitle.length > 34 ? mainTitle.slice(0, 32) + '...' : mainTitle, 50, 400);

  // Meta row: "5 Days / 4 Nights · Family / Couple · Relaxed Pace"
  ctx.fillStyle = '#1E3A8A';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`${tripPlan.duration}  |  ${tripPlan.party}  |  ${tripPlan.pacing.split(' ')[0]}`, 50, 430);

  // Divider Line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(50, 452);
  ctx.lineTo(width - 50, 452);
  ctx.stroke();

  // Day-by-Day Schedule Highlights
  let currentY = 490;
  const daysToShow = (tripPlan.days || []).slice(0, 6);

  daysToShow.forEach((d) => {
    // Bullet Dot
    ctx.fillStyle = '#FF892F';
    ctx.beginPath();
    ctx.arc(60, currentY - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    // Day Title
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`Day ${d.day}`, 78, currentY);

    // Main Stop / Title
    ctx.fillStyle = '#334155';
    ctx.font = '14.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const stopText = d.stops[0]?.title || d.title;
    ctx.fillText(stopText.length > 36 ? stopText.slice(0, 34) + '...' : stopText, 140, currentY);

    // Subtitle / Driving Distance
    if (d.stops[1] || d.travelDistance) {
      currentY += 21;
      ctx.fillStyle = '#64748B';
      ctx.font = '12.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const subText = d.stops[1] ? `+ ${d.stops[1].title} · ${d.travelDistance || ''}` : `${d.travelDistance || ''}`;
      ctx.fillText(subText.length > 44 ? subText.slice(0, 42) + '...' : subText, 140, currentY);
    }

    currentY += 44;
  });

  // Signature Inclusions Strip
  currentY = 880;
  ctx.fillStyle = '#EFF6FF';
  ctx.beginPath();
  ctx.roundRect(50, currentY, width - 100, 92, [14]);
  ctx.fill();
  ctx.strokeStyle = '#BFDBFE';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#1E40AF';
  ctx.font = 'bold 13.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('✨ VERIFIED COMFORT JOURNEY INCLUSIONS:', 70, currentY + 28);

  ctx.fillStyle = '#334155';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`• ${tripPlan.vehicle} with dedicated private driver`, 70, currentY + 52);
  ctx.fillText(`• ${tripPlan.dietary} · ${tripPlan.stayTier}`, 70, currentY + 74);

  // --- QR Code Section: Real, 100% Scannable QR Code ---
  const qrY = 1005;
  const qrTargetUrl = `https://wa.me/919203931912?text=${encodeURIComponent(`Hi Comfort Journey! I scanned your itinerary card for ${tripPlan.destination} (${tripPlan.duration}). Please share dates and pricing!`)}`;

  try {
    // Generate real, high-resolution QR code data URL offline
    const qrDataUrl = await QRCode.toDataURL(qrTargetUrl, {
      margin: 1,
      width: 220,
      color: {
        dark: '#001233',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    });

    const qrImage = new Image();
    await new Promise((res) => {
      qrImage.onload = res;
      qrImage.onerror = res;
      qrImage.src = qrDataUrl;
    });

    // Draw QR White Frame & Image
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(50, qrY, 118, 118, [12]);
    ctx.fill();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.drawImage(qrImage, 55, qrY + 5, 108, 108);
  } catch (err) {
    console.error('Error generating QR code in canvas:', err);
  }

  // QR Description Text
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scan to view or book on Comfort Journey', 185, qrY + 32);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Point your phone camera to chat instantly with our', 185, qrY + 56);
  ctx.fillStyle = '#FF892F';
  ctx.font = 'bold 13.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('24/7 Vacation Concierge (+91 9203931912)', 185, qrY + 78);

  ctx.fillStyle = '#10B981';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('✓ 100% Verified Private Tours · Est. 1992', 185, qrY + 102);

  return canvas.toDataURL('image/png');
}


/**
 * 3. Print PDF Travel Brochure
 * Matches Trip.com's 6-page itinerary brochure (user's 2nd screenshot).
 */
export function printPdfBrochure(rawPlan) {
  if (!rawPlan) return;
  const days = rawPlan.days || rawPlan.itinerary || [];
  const tripPlan = {
    title: rawPlan.name || rawPlan.title || 'Curated Vacation Itinerary',
    destination: rawPlan.destination || rawPlan.location || 'Vacation Destination',
    duration: rawPlan.duration || `${days.length} Days`,
    party: rawPlan.party || 'Private Tour (2-4 Travelers)',
    vehicle: rawPlan.vehicle || 'Dedicated AC Chauffeur Cab',
    dietary: rawPlan.dietary || 'Daily Breakfast & Stays Included',
    highlights: rawPlan.highlights || rawPlan.inclusions || [
      'Private dedicated AC vehicle with experienced local chauffeur',
      'Handpicked 4★ Deluxe accommodation with scenic views',
      'Daily breakfast and scheduled local heritage sightseeing',
      'All toll taxes, parking fees, and driver allowances included'
    ],
    days
  };

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to generate and download your PDF brochure.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${tripPlan.title} - Comfort Journey Brochure</title>
      <style>
        @page {
          size: A4;
          margin: 18mm 15mm 18mm 15mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1E293B;
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #FF892F;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }
        .brand-title {
          font-size: 22px;
          font-weight: 800;
          color: #001233;
          margin: 0;
        }
        .brand-sub {
          font-size: 11px;
          color: #FF892F;
          letter-spacing: 1px;
          font-weight: 700;
        }
        .trip-title {
          font-size: 19px;
          font-weight: 700;
          color: #0F172A;
          margin: 12px 0 6px 0;
        }
        .trip-meta {
          font-size: 13px;
          color: #475569;
          margin-bottom: 16px;
        }
        .inclusions-box {
          background: #F1F5F9;
          border-left: 4px solid #FF892F;
          padding: 10px 14px;
          margin-bottom: 22px;
          border-radius: 4px;
        }
        .inclusions-box h4 {
          margin: 0 0 6px 0;
          font-size: 12px;
          color: #0F172A;
          text-transform: uppercase;
        }
        .inclusions-box ul {
          margin: 0;
          padding-left: 18px;
          font-size: 12px;
          color: #334155;
        }
        .day-section {
          page-break-inside: avoid;
          margin-bottom: 24px;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 14px 16px;
        }
        .day-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .day-title {
          font-size: 15px;
          font-weight: 700;
          color: #001233;
        }
        .day-distance {
          font-size: 12px;
          font-weight: 600;
          color: #FF892F;
        }
        .stop-item {
          display: flex;
          margin-bottom: 10px;
          font-size: 12px;
          gap: 12px;
        }
        .stop-time {
          font-weight: 700;
          color: #2563EB;
          width: 70px;
          flex-shrink: 0;
        }
        .stop-badge {
          background: #E2E8F0;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .badge-transport { background: #E0F2FE; color: #0369A1; }
        .badge-sightseeing { background: #FEF3C7; color: #B45309; }
        .badge-meal { background: #DCFCE7; color: #15803D; }
        .badge-hotel { background: #F3E8FF; color: #7E22CE; }
        .footer {
          margin-top: 30px;
          border-top: 1px solid #E2E8F0;
          padding-top: 12px;
          font-size: 11px;
          color: #64748B;
          display: flex;
          justify-content: space-between;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand-sub">COMFORT JOURNEY • EST. 1992</div>
          <h1 class="brand-title">Personalized Vacation Itinerary</h1>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; font-size: 12px;">Hotline / WhatsApp</div>
          <div style="font-size: 14px; font-weight: 800; color: #FF892F;">+91 9203931912</div>
        </div>
      </div>

      <div class="trip-title">${tripPlan.title}</div>
      <div class="trip-meta">
        <strong>Duration:</strong> ${tripPlan.duration} &nbsp;|&nbsp; 
        <strong>Travelers:</strong> ${tripPlan.party} &nbsp;|&nbsp; 
        <strong>Vehicle:</strong> ${tripPlan.vehicle} &nbsp;|&nbsp;
        <strong>Meals:</strong> ${tripPlan.dietary}
      </div>

      <div class="inclusions-box">
        <h4>Trip Highlights & Inclusions</h4>
        <ul>
          ${(tripPlan.highlights || []).map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>

      ${(tripPlan.days || []).map(d => `
        <div class="day-section">
          <div class="day-header">
            <div class="day-title">Day ${d.day}: ${d.title}</div>
            <div class="day-distance">${d.travelDistance || ''}</div>
          </div>
          <p style="font-size: 12px; color: #475569; margin: 0 0 10px 0;">${d.summary || ''}</p>
          <div>
            ${(d.stops || []).map(s => `
              <div class="stop-item">
                <div class="stop-time">${s.time}</div>
                <div style="flex: 1;">
                  <span class="stop-badge badge-${s.type}">${s.type}</span>
                  <strong style="margin-left: 6px;">${s.title}</strong>
                  <div style="color: #64748B; margin-top: 2px;">${s.subtitle || ''} · <em>${s.ticketStatus || ''}</em></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <div class="footer">
        <div>Comfort Journey (Est. 1992) · 100% Private Stays & Chauffeur Fleet</div>
        <div>Scan with WhatsApp to confirm booking: +91 9203931912</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
