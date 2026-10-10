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
    `"Emergency / Concierge Hotline: +91 8770403315"`,
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

  // --- TOP MAP SECTION: Real-time route from GPS coordinates ---
  const mapAreaHeight = 350;

  // Collect all GPS coordinates from the trip
  const allCoords = [];
  (tripPlan.days || []).forEach(d => {
    (d.stops || []).forEach(s => {
      if (s.lat && s.lng) {
        allCoords.push({
          lat: s.lat,
          lng: s.lng,
          type: s.type || 'sightseeing',
          title: s.title || '',
          day: d.day
        });
      }
    });
  });

  // Map Background: Deep midnight nautical gradient
  const mapGrad = ctx.createLinearGradient(0, 0, width, mapAreaHeight);
  mapGrad.addColorStop(0, '#06132B');
  mapGrad.addColorStop(0.5, '#0B1D42');
  mapGrad.addColorStop(1, '#081736');
  ctx.fillStyle = mapGrad;
  ctx.fillRect(0, 0, width, mapAreaHeight);

  // Subtle geographic grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 45) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, mapAreaHeight);
    ctx.stroke();
  }
  for (let j = 0; j < mapAreaHeight; j += 45) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(width, j);
    ctx.stroke();
  }

  // Draw Compass Rose on Top Right
  const compassX = width - 42;
  const compassY = 36;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.arc(compassX, compassY, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // North pointer
  ctx.fillStyle = '#FF892F';
  ctx.beginPath();
  ctx.moveTo(compassX, compassY - 14);
  ctx.lineTo(compassX - 4, compassY);
  ctx.lineTo(compassX + 4, compassY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('N', compassX, compassY - 16);
  ctx.textAlign = 'start';

  if (allCoords.length > 0) {
    // Calculate bounds with adaptive padding
    const lats = allCoords.map(c => c.lat);
    const lngs = allCoords.map(c => c.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latPad = Math.max((maxLat - minLat) * 0.35, 0.03);
    const lngPad = Math.max((maxLng - minLng) * 0.35, 0.03);
    const padMinLat = minLat - latPad;
    const padMaxLat = maxLat + latPad;
    const padMinLng = minLng - lngPad;
    const padMaxLng = maxLng + lngPad;

    // Convert GPS coordinates to Canvas pixel points
    const mapPadX = 60;
    const mapPadY = 55;
    const mapW = width - mapPadX * 2;
    const mapH = mapAreaHeight - mapPadY * 2 - 25;

    const toCanvasX = (lng) => mapPadX + ((lng - padMinLng) / (padMaxLng - padMinLng)) * mapW;
    const toCanvasY = (lat) => mapPadY + (1 - (lat - padMinLat) / (padMaxLat - padMinLat)) * mapH;

    // Draw route lines connecting all waypoints
    if (allCoords.length > 1) {
      // Wide subtle route corridor glow
      ctx.strokeStyle = 'rgba(255, 137, 47, 0.22)';
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(toCanvasX(allCoords[0].lng), toCanvasY(allCoords[0].lat));
      for (let i = 1; i < allCoords.length; i++) {
        ctx.lineTo(toCanvasX(allCoords[i].lng), toCanvasY(allCoords[i].lat));
      }
      ctx.stroke();

      // Sharp golden-orange core dashed route
      ctx.strokeStyle = '#FF892F';
      ctx.lineWidth = 3.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(toCanvasX(allCoords[0].lng), toCanvasY(allCoords[0].lat));
      for (let i = 1; i < allCoords.length; i++) {
        ctx.lineTo(toCanvasX(allCoords[i].lng), toCanvasY(allCoords[i].lat));
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Type colors for waypoints
    const typeColors = {
      transport: '#0284C7',
      sightseeing: '#F59E0B',
      meal: '#10B981',
      hotel: '#8B5CF6',
      shopping: '#F43F5E'
    };

    // Draw waypoints
    allCoords.forEach((c, i) => {
      const cx = toCanvasX(c.lng);
      const cy = toCanvasY(c.lat);
      const isStart = i === 0;
      const isEnd = i === allCoords.length - 1;
      const color = isStart ? '#10B981' : isEnd ? '#FF892F' : (typeColors[c.type] || '#38BDF8');
      const radius = isStart || isEnd ? 13 : 9;

      // Outer glow ring
      ctx.fillStyle = isStart ? 'rgba(16, 185, 129, 0.25)' : isEnd ? 'rgba(255, 137, 47, 0.25)' : 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
      ctx.fill();

      // Main pin circle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Crisp white outline
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Center sequence number or indicator
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${i + 1}`, cx, cy);

      // Stop label pill for first, middle and last stop
      if (isStart || isEnd || (i === 1 && allCoords.length > 2)) {
        const labelText = isStart ? 'Start: ' + c.title.slice(0, 18) : isEnd ? 'Finish: ' + c.title.slice(0, 18) : c.title.slice(0, 16);
        ctx.font = 'bold 10px sans-serif';
        const textWidth = ctx.measureText(labelText).width;
        const pillX = Math.max(15, Math.min(width - textWidth - 25, cx - textWidth / 2 - 8));
        const pillY = isStart ? cy - 28 : cy + 16;

        ctx.fillStyle = 'rgba(0, 18, 51, 0.88)';
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, textWidth + 16, 20, [10]);
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(labelText, pillX + 8, pillY + 14);
      }
    });
  }

  // Floating Route HUD Banner (Top Left)
  ctx.fillStyle = 'rgba(0, 18, 51, 0.88)';
  ctx.beginPath();
  ctx.roundRect(18, 16, 260, 32, [16]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 137, 47, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#FF892F';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`📍 ${tripPlan.destination || 'Vacation'} · GPS Route`, 32, 36);

  // Bottom Route Info Pill
  ctx.fillStyle = 'rgba(0, 18, 51, 0.85)';
  ctx.beginPath();
  ctx.roundRect(18, mapAreaHeight - 44, width - 36, 32, [10]);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '600 11.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`🗺️ Real-time GPS Route • ${allCoords.length} Connected Waypoints • Curated by Comfy.ai`, 32, mapAreaHeight - 24);

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
  const qrTargetUrl = `https://wa.me/918770403315?text=${encodeURIComponent(`Hi Comfort Journey! I scanned your itinerary card for ${tripPlan.destination} (${tripPlan.duration}). Please share dates and pricing!`)}`;

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
  ctx.fillText('24/7 Vacation Concierge (+91 8770403315)', 185, qrY + 78);

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
          <div style="font-size: 14px; font-weight: 800; color: #FF892F;">+91 8770403315</div>
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
        <div>Scan with WhatsApp to confirm booking: +91 8770403315</div>
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
