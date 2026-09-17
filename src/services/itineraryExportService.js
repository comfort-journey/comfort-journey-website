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
export function exportItineraryToExcel(tripPlan) {
  if (!tripPlan || !tripPlan.days) return;

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
    d.stops.forEach(s => {
      const nearby = s.proximity?.landmarks ? s.proximity.landmarks.map(l => `${l.name} (${l.dist})`).join('; ') : '';
      rows.push([
        `Day ${d.day}`,
        `"${s.time || ''}"`,
        `"${s.type || ''}"`,
        `"${(s.title || '').replace(/"/g, '""')}"`,
        `"${(s.subtitle || '').replace(/"/g, '""')}"`,
        `"${s.duration || ''}"`,
        `"${s.ticketStatus || ''}"`,
        `"${tripPlan.dietary || ''}"`,
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
 * Exactly mirrors Trip.com's clean vertical social card from the user's screenshot.
 */
export function generateSocialCardDataUrl(tripPlan) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const width = 640;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background Navy & Soft Gradient
    ctx.fillStyle = '#001233';
    ctx.fillRect(0, 0, width, height);

    // Map Header Graphic Area (Top 340px)
    const mapGrad = ctx.createLinearGradient(0, 0, width, 340);
    mapGrad.addColorStop(0, '#E8F0FE');
    mapGrad.addColorStop(1, '#D2E3FC');
    ctx.fillStyle = mapGrad;
    ctx.fillRect(0, 0, width, 340);

    // Draw stylized vector map roads & blocks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(40, 20, 180, 110);
    ctx.fillRect(250, 40, 200, 90);
    ctx.fillRect(80, 170, 210, 120);
    ctx.fillRect(320, 160, 260, 140);

    // Stylized Green Park Block
    ctx.fillStyle = '#6EE7B7';
    ctx.beginPath();
    ctx.moveTo(480, 0);
    ctx.lineTo(640, 0);
    ctx.lineTo(640, 130);
    ctx.closePath();
    ctx.fill();

    // Stylized Route Polyline (Thick blue road with circles)
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(160, 140);
    ctx.lineTo(220, 210);
    ctx.lineTo(410, 110);
    ctx.lineTo(480, 180);
    ctx.stroke();

    // Start Waypoint Pin Circle
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(160, 140, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(160, 140, 7, 0, Math.PI * 2);
    ctx.fill();

    // Destination Pin Marker
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(480, 180, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(480, 180, 7, 0, Math.PI * 2);
    ctx.fill();

    // Soft blur divider into white container
    ctx.fillStyle = '#F8FAFC';
    ctx.beginPath();
    ctx.roundRect(28, 300, width - 56, height - 340, [24, 24, 24, 24]);
    ctx.fill();

    // Brand Tag & Title
    ctx.fillStyle = '#FF892F';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('COMFORT JOURNEY • EST. 1992', 56, 350);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const mainTitle = tripPlan.title || `${tripPlan.durationDays || 5}-Day Itinerary in ${tripPlan.destination || 'Vacation'}`;
    ctx.fillText(mainTitle.length > 34 ? mainTitle.slice(0, 32) + '...' : mainTitle, 56, 390);

    // Meta row: "7 days · 1 place · Private Chauffeur"
    ctx.fillStyle = '#1E3A8A';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`${tripPlan.durationDays || 5} days  |  ${tripPlan.party}  |  ${tripPlan.pacing.split(' ')[0]}`, 56, 422);

    // Divider Line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(56, 445);
    ctx.lineTo(width - 56, 445);
    ctx.stroke();

    // Day-by-Day Bulleted List
    let currentY = 485;
    const daysToShow = (tripPlan.days || []).slice(0, 6);

    daysToShow.forEach((d, i) => {
      // Bullet Dot
      ctx.fillStyle = '#0F172A';
      ctx.beginPath();
      ctx.arc(66, currentY - 5, 5, 0, Math.PI * 2);
      ctx.fill();

      // Day Title
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(`Day ${d.day}`, 86, currentY);

      // Main Stop / Title
      ctx.fillStyle = '#475569';
      ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const stopText = d.stops[0]?.title || d.title;
      ctx.fillText(stopText.length > 38 ? stopText.slice(0, 36) + '...' : stopText, 150, currentY);

      // Subtitle
      if (d.stops[1]) {
        currentY += 22;
        ctx.fillStyle = '#64748B';
        ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const subText = `+ ${d.stops[1].title} · ${d.travelDistance || ''}`;
        ctx.fillText(subText.length > 44 ? subText.slice(0, 42) + '...' : subText, 150, currentY);
      }

      currentY += 46;
    });

    // Inclusions & Vehicle Strip
    currentY = 890;
    ctx.fillStyle = '#EFF6FF';
    ctx.beginPath();
    ctx.roundRect(56, currentY, width - 112, 90, [14]);
    ctx.fill();
    ctx.strokeStyle = '#BFDBFE';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#1E40AF';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('✨ SIGNATURE INCLUSIONS:', 76, currentY + 28);

    ctx.fillStyle = '#334155';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(`• ${tripPlan.vehicle}`, 76, currentY + 52);
    ctx.fillText(`• ${tripPlan.dietary} · ${tripPlan.stayTier}`, 76, currentY + 72);

    // QR Code Box (Bottom Section)
    const qrY = 1015;
    
    // Draw QR code visual placeholder grid
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(56, qrY, 110, 110);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(62, qrY + 6, 98, 98);

    // QR Corner Squares
    const drawQRSquare = (x, y) => {
      ctx.fillStyle = '#001233';
      ctx.fillRect(x, y, 26, 26);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + 4, y + 4, 18, 18);
      ctx.fillStyle = '#001233';
      ctx.fillRect(x + 8, y + 8, 10, 10);
    };

    drawQRSquare(68, qrY + 12);
    drawQRSquare(128, qrY + 12);
    drawQRSquare(68, qrY + 72);

    // Random QR data blocks
    ctx.fillStyle = '#001233';
    ctx.fillRect(102, qrY + 22, 6, 16);
    ctx.fillRect(118, qrY + 50, 12, 6);
    ctx.fillRect(104, qrY + 68, 20, 8);
    ctx.fillRect(128, qrY + 84, 16, 16);

    // QR Description
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Scan to view or book on Comfort Journey', 185, qrY + 38);

    ctx.fillStyle = '#64748B';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Share this itinerary with family or WhatsApp us at', 185, qrY + 62);
    ctx.fillStyle = '#FF892F';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('+91 8770403315 for instant custom booking', 185, qrY + 84);

    resolve(canvas.toDataURL('image/png'));
  });
}

/**
 * 3. Print PDF Travel Brochure
 * Matches Trip.com's 6-page itinerary brochure (user's 2nd screenshot).
 */
export function printPdfBrochure(tripPlan) {
  if (!tripPlan) return;

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
