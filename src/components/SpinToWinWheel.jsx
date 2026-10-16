import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Gift, Trophy, PartyPopper, Copy, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

/**
 * SpinToWinWheel:
 * Luxury promotional marketing campaign module for Comfort Journey.
 * Rewards visitors with tiered booking discounts and seasonal coupons.
 * Enforces one spin per calendar day per visitor.
 */

// Promotional Voucher Inventory & Rewards Distribution
const DEFAULT_PRIZES = [
  { id: 'grand-trip', label: '👑 FREE TRIP ✈️', discount: 'FREE TRIP', color: '#FFD700', textColor: '#001D51', isJackpot: true, stock: 0 },
  { id: 'tier-20',    label: '🔥 20% OFF',       discount: '20%',      color: '#FF892F', textColor: '#FFFFFF', weight: 35, stock: 100 },
  { id: 'tier-10',    label: '🎉 10% OFF',       discount: '10%',      color: '#002B7A', textColor: '#FFFFFF', weight: 40, stock: 200 },
  { id: 'tier-35',    label: '💎 35% OFF',       discount: '35%',      color: '#E66F12', textColor: '#FFFFFF', weight: 10, stock: 25 },
  { id: 'tier-15',    label: '🎊 15% OFF',       discount: '15%',      color: '#0284C7', textColor: '#FFFFFF', weight: 30, stock: 150 },
  { id: 'tier-5',     label: '⭐ 5% OFF',        discount: '5%',       color: '#10B981', textColor: '#FFFFFF', weight: 25, stock: 200 },
];

function selectEligiblePromotion(prizes) {
  // Select from currently allocated promotional voucher pool
  const available = prizes
    .map((item, index) => ({ ...item, index }))
    .filter(item => (item.stock || 0) > 0);

  const totalPool = available.reduce((sum, item) => sum + (item.weight || 10), 0);
  let randomVal = Math.random() * totalPool;
  for (const item of available) {
    randomVal -= (item.weight || 10);
    if (randomVal <= 0) return item.index;
  }
  return available[0]?.index ?? 1;
}

export default function SpinToWinWheel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [couponCopied, setCouponCopied] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);
  const canvasRef = useRef(null);
  const prizes = DEFAULT_PRIZES;

  // Check daily spin limit
  useEffect(() => {
    try {
      const lastSpin = localStorage.getItem('cj_spin_last');
      if (lastSpin) {
        const lastDate = new Date(parseInt(lastSpin, 10));
        const today = new Date();
        if (
          lastDate.getFullYear() === today.getFullYear() &&
          lastDate.getMonth() === today.getMonth() &&
          lastDate.getDate() === today.getDate()
        ) {
          setHasSpun(true);
        }
      }
    } catch {}
  }, []);

  // Draw the wheel on canvas
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 8;
    const segAngle = (2 * Math.PI) / prizes.length;
    // Align index 0 directly at 12 o'clock (under the pointer) when rotation = 0
    const startOffset = -Math.PI / 2 - segAngle / 2;

    ctx.clearRect(0, 0, size, size);

    // Draw outer metallic ring
    ctx.beginPath();
    ctx.arc(center, center, radius + 6, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FFD700';
    ctx.stroke();
    ctx.closePath();

    // Notch lights on the outer ring
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * 2 * Math.PI;
      const lx = center + (radius + 6) * Math.cos(angle);
      const ly = center + (radius + 6) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(lx, ly, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#FFD700' : '#FFFFFF';
      ctx.fill();
    }

    // Draw segments
    prizes.forEach((prize, i) => {
      const startAngle = startOffset + i * segAngle;
      const endAngle = startAngle + segAngle;
      const midAngle = startAngle + segAngle / 2;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      if (prize.isJackpot) {
        // High-luxury metallic gold radial gradient for Free Trip
        const grad = ctx.createRadialGradient(center, center, 10, center, center, radius);
        grad.addColorStop(0, '#FFF59D');
        grad.addColorStop(0.3, '#FFD700');
        grad.addColorStop(0.75, '#FFA000');
        grad.addColorStop(1, '#FF8F00');
        ctx.fillStyle = grad;
        ctx.fill();

        // High-contrast shimmering white/gold border
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
      } else {
        const grad = ctx.createRadialGradient(center, center, 0, center, center, radius);
        grad.addColorStop(0, prize.color + 'DD');
        grad.addColorStop(1, prize.color);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.stroke();
      }

      // Text label
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(midAngle);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = prize.textColor;
      if (prize.isJackpot) {
        ctx.font = `900 ${size < 300 ? '12' : '13.5'}px "Outfit", sans-serif`;
      } else {
        ctx.font = `bold ${size < 300 ? '11' : '12.5'}px "Outfit", sans-serif`;
      }
      ctx.fillText(prize.label, radius * 0.58, 0);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(center, center, 28, 0, 2 * Math.PI);
    const hubGrad = ctx.createRadialGradient(center, center, 0, center, center, 28);
    hubGrad.addColorStop(0, '#FFE082');
    hubGrad.addColorStop(0.5, '#FFB300');
    hubGrad.addColorStop(1, '#FF8F00');
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFF';
    ctx.stroke();

    ctx.fillStyle = '#001D51';
    ctx.font = `900 12px "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', center, center);
  }, [prizes]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(drawWheel, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, drawWheel]);

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    const winIndex = selectEligiblePromotion(prizes);
    const segAngle = 360 / prizes.length;

    // Calculate rotation to land dead-center on the winning segment under the top pointer
    const currentMod = rotation % 360;
    const targetMod = (360 - (winIndex * segAngle)) % 360;
    let forwardDiff = (targetMod - currentMod + 360) % 360;
    if (forwardDiff === 0) forwardDiff = 360;

    // 6 full dramatic spins (2160 deg) + exact distance to target segment
    const spinDelta = 360 * 6 + forwardDiff;

    setRotation(prev => prev + spinDelta);

    // Reveal prize once the wheel deceleration finishes
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setWonPrize(prizes[winIndex]);

      try {
        localStorage.setItem('cj_spin_last', Date.now().toString());
        const coupons = JSON.parse(localStorage.getItem('cj_spin_coupons') || '[]');
        coupons.push({
          discount: prizes[winIndex].discount,
          label: prizes[winIndex].label,
          code: `CJ${prizes[winIndex].discount.replace('%','').replace(/\s+/g,'')}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,
          wonAt: new Date().toISOString(),
          used: false
        });
        localStorage.setItem('cj_spin_coupons', JSON.stringify(coupons));
      } catch {}
    }, 4500);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleCopyCoupon = () => {
    if (!wonPrize) return;
    try {
      const coupons = JSON.parse(localStorage.getItem('cj_spin_coupons') || '[]');
      const latest = coupons[coupons.length - 1];
      if (latest?.code) {
        navigator.clipboard.writeText(latest.code);
        setCouponCopied(true);
        setTimeout(() => setCouponCopied(false), 2500);
      }
    } catch {}
  };

  const couponCode = (() => {
    try {
      const coupons = JSON.parse(localStorage.getItem('cj_spin_coupons') || '[]');
      return coupons[coupons.length - 1]?.code || '';
    } catch { return ''; }
  })();

  return (
    <>
      {/* 🎰 Compact Floating Trigger Button */}
      {showTrigger && !isOpen && (
        <button
          type="button"
          className="spin-trigger-btn"
          onClick={() => setIsOpen(true)}
          title="Spin the wheel for exclusive trip discounts"
          aria-label="Spin and Win"
        >
          <div className="spin-trigger-icon-wrap">
            <Gift size={15} className="spin-trigger-icon" />
          </div>
          <span className="spin-trigger-text">
            {hasSpun ? 'My Coupon' : 'Spin & Win'}
          </span>
          {!hasSpun && <span className="spin-trigger-pulse" />}
        </button>
      )}

      {/* 🎡 Full Wheel Modal */}
      {isOpen && (
        <>
          <div className={`spin-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
          <div className={`spin-modal ${wonPrize ? 'won-state' : ''} ${isClosing ? 'closing' : ''}`}>
            <button type="button" className="spin-close-btn" onClick={handleClose} aria-label="Close">
              <X size={18} />
            </button>

            <div className="spin-header">
              <h3 className="spin-title">
                <Trophy size={18} className="spin-title-icon" />
                Spin & Win!
              </h3>
              <p className="spin-subtitle">
                {hasSpun && wonPrize
                  ? '🎉 Congratulations! Claim your reward below:'
                  : 'Unlock exclusive tour discounts up to 35%!'}
              </p>
            </div>

            <div className={`spin-wheel-area ${wonPrize ? 'compact' : ''}`}>
              {/* Pointer / Arrow */}
              <div className="spin-pointer">▼</div>

              {/* Rotating Wheel */}
              <div
                className="spin-wheel-container"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                    : 'none'
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={240}
                  height={240}
                  className="spin-wheel-canvas"
                />
              </div>
            </div>

            {/* Spin Button or Result */}
            {wonPrize ? (
              <div className="spin-result">
                <div className="spin-result-badge">
                  <PartyPopper size={16} />
                  <span>You Won {wonPrize.label}!</span>
                </div>
                <div className="spin-coupon-card">
                  <span className="spin-coupon-label">Your Coupon Code</span>
                  <div className="spin-coupon-code-row">
                    <code className="spin-coupon-code">{couponCode}</code>
                    <button type="button" className="spin-copy-btn" onClick={handleCopyCoupon} title="Copy Code">
                      {couponCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <span className="spin-coupon-validity">Valid for 30 days • Applicable on all bookings</span>
                </div>
                <a
                  href={`https://wa.me/919203931912?text=${encodeURIComponent(`Hi Comfort Journey! I spun your lucky wheel and won ${wonPrize.label} (Coupon: ${couponCode}). I'd like to apply this discount to my holiday booking!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spin-claim-wa-btn"
                >
                  <MessageCircle size={18} />
                  <span>Claim Discount on WhatsApp</span>
                </a>
              </div>
            ) : (
              <button
                type="button"
                className={`spin-action-btn ${isSpinning ? 'spinning' : ''} ${hasSpun ? 'disabled' : ''}`}
                onClick={handleSpin}
                disabled={isSpinning || hasSpun}
              >
                {isSpinning ? '🌀 Spinning...' : hasSpun ? 'Come Back Tomorrow!' : '🎰 SPIN NOW!'}
              </button>
            )}

            {!wonPrize && (
              <p className="spin-footer-note">
                One spin per day • {prizes.length} amazing offers
              </p>
            )}
          </div>
        </>
      )}

      <style>{`
        /* ======== COMPACT TRIGGER BUTTON ======== */
        .spin-trigger-btn {
          position: fixed;
          left: 18px;
          bottom: 86px;
          z-index: 99999;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px 6px 7px;
          background: rgba(0, 20, 56, 0.93);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid #FF892F;
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.76rem;
          font-weight: 800;
          color: #FFF;
          box-shadow: 0 4px 16px rgba(0, 18, 51, 0.45), 0 0 12px rgba(255, 137, 47, 0.2);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spin-trigger-btn:hover {
          transform: translateY(-2px) scale(1.05);
          background: #001D51;
          box-shadow: 0 6px 22px rgba(255, 137, 47, 0.4);
          border-color: #FFD700;
        }

        .spin-trigger-icon-wrap {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF892F, #E66F12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
        }
        .spin-trigger-icon {
          animation: spinTriggerSpin 3s linear infinite;
        }
        @keyframes spinTriggerSpin {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
          100% { transform: rotate(0deg); }
        }

        .spin-trigger-text {
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        .spin-trigger-pulse {
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          border: 1.5px solid #FF892F;
          animation: spinPulse 2.2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes spinPulse {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.2); }
        }

        /* ======== MODAL OVERLAY ======== */
        .spin-overlay {
          position: fixed;
          inset: 0;
          z-index: 99996;
          background: rgba(0, 12, 33, 0.65);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          animation: spinFadeIn 0.25s ease;
        }
        .spin-overlay.closing { animation: spinFadeOut 0.2s ease forwards; }

        @keyframes spinFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spinFadeOut { from { opacity: 1; } to { opacity: 0; } }

        /* ======== COMPACT ZERO-SCROLL MODAL CARD ======== */
        .spin-modal {
          position: fixed;
          z-index: 99997;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 360px;
          max-width: calc(100vw - 28px);
          max-height: calc(100vh - 32px);
          overflow-y: auto;
          border-radius: 22px;
          padding: 18px 18px 16px;
          text-align: center;
          animation: spinModalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spin-modal.closing {
          animation: spinModalOut 0.2s ease forwards;
        }
        @keyframes spinModalIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes spinModalOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
        }

        [data-theme="dark"] .spin-modal {
          background: linear-gradient(170deg, #001D51, #001233 70%, #000C21);
          border: 1.5px solid rgba(255, 137, 47, 0.35);
          box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(255,137,47,0.08);
          color: #F9FBE7;
        }
        :root:not([data-theme="dark"]) .spin-modal,
        [data-theme="light"] .spin-modal {
          background: linear-gradient(170deg, #FFF, #FFF8F0 70%, #FFF5EB);
          border: 1.5px solid rgba(255,137,47,0.25);
          box-shadow: 0 24px 60px rgba(20,38,74,0.18);
          color: #0F172A;
        }

        .spin-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(125,125,125,0.12);
          border: 1px solid rgba(125,125,125,0.15);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--cj-text-muted, #94A3B8);
          transition: all 0.2s ease;
          z-index: 5;
        }
        .spin-close-btn:hover {
          background: rgba(255,137,47,0.15);
          color: #FF892F;
          transform: rotate(90deg);
        }

        .spin-header { margin-bottom: 10px; }
        .spin-title {
          font-family: var(--font-heading, 'Baumans', sans-serif);
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 0 0 3px;
        }
        .spin-title-icon { color: #FF892F; }
        .spin-subtitle {
          font-size: 0.78rem;
          opacity: 0.72;
          margin: 0;
          line-height: 1.35;
        }

        /* ======== WHEEL AREA ======== */
        .spin-wheel-area {
          position: relative;
          width: 240px;
          height: 240px;
          margin: 0 auto 12px;
          transition: all 0.35s ease;
        }
        .spin-wheel-area.compact {
          width: 155px;
          height: 155px;
          margin: 0 auto 8px;
        }

        .spin-pointer {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.9rem;
          color: #FFD700;
          z-index: 10;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,0.6));
          line-height: 1;
          transition: all 0.3s ease;
        }
        .spin-wheel-area.compact .spin-pointer {
          font-size: 1.35rem;
          top: -7px;
        }

        .spin-wheel-container {
          width: 100%;
          height: 100%;
        }

        .spin-wheel-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ======== SPIN BUTTON ======== */
        .spin-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 32px;
          background: linear-gradient(135deg, #FF892F, #E66F12);
          border: none;
          border-radius: 50px;
          color: #FFF;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.95rem;
          font-weight: 900;
          letter-spacing: 0.4px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(255,137,47,0.35);
          margin-bottom: 6px;
        }
        .spin-action-btn:hover:not(.disabled):not(.spinning) {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 24px rgba(255,137,47,0.45);
        }
        .spin-action-btn.spinning {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .spin-action-btn.disabled {
          background: linear-gradient(135deg, #94A3B8, #64748B);
          box-shadow: none;
          cursor: not-allowed;
        }

        /* ======== RESULT ======== */
        .spin-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: spinResultIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes spinResultIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .spin-result-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 50px;
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFF;
          font-weight: 800;
          font-size: 0.88rem;
        }

        .spin-coupon-card {
          width: 100%;
          padding: 8px 12px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        [data-theme="dark"] .spin-coupon-card {
          background: rgba(255,255,255,0.06);
          border: 1.5px dashed rgba(255,137,47,0.5);
        }
        :root:not([data-theme="dark"]) .spin-coupon-card,
        [data-theme="light"] .spin-coupon-card {
          background: rgba(255,137,47,0.06);
          border: 1.5px dashed #FF892F;
        }

        .spin-coupon-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #FF892F;
        }

        .spin-coupon-code-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spin-coupon-code {
          font-family: 'Outfit', monospace;
          font-size: 1.15rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #FF892F;
        }

        .spin-copy-btn {
          background: rgba(255,137,47,0.15);
          border: 1px solid rgba(255,137,47,0.3);
          border-radius: 6px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #FF892F;
          transition: all 0.15s ease;
        }
        .spin-copy-btn:hover {
          background: rgba(255,137,47,0.25);
        }

        .spin-coupon-validity {
          font-size: 0.66rem;
          opacity: 0.6;
        }

        .spin-claim-wa-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 16px;
          background: #25D366;
          color: #FFF;
          font-size: 0.84rem;
          font-weight: 800;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: all 0.2s ease;
        }
        .spin-claim-wa-btn:hover {
          background: #20BA5A;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
        }

        .spin-footer-note {
          font-size: 0.68rem;
          opacity: 0.45;
          margin: 4px 0 0;
        }

        /* 📱 Mobile */
        @media (max-width: 640px) {
          .spin-trigger-btn {
            left: 10px;
            bottom: 74px;
            padding: 5px 10px 5px 6px;
            font-size: 0.72rem;
          }
          .spin-trigger-icon-wrap {
            width: 20px;
            height: 20px;
          }
          .spin-modal {
            width: calc(100vw - 24px);
            padding: 16px 14px;
          }
          .spin-wheel-area {
            width: 210px;
            height: 210px;
          }
          .spin-wheel-area.compact {
            width: 140px;
            height: 140px;
          }
          .spin-title { font-size: 1.2rem; }
        }
      `}</style>
    </>
  );
}
