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
      {/* 🎰 Floating Trigger Button */}
      {showTrigger && !isOpen && (
        <button
          type="button"
          className="spin-trigger-btn"
          onClick={() => setIsOpen(true)}
          title="Spin & Win Exciting Offers!"
        >
          <div className="spin-trigger-icon-wrap">
            <Gift size={20} className="spin-trigger-icon" />
          </div>
          <span className="spin-trigger-text">
            {hasSpun ? '🎁 My Prize Code' : '✈️ Win Free Trip!'}
          </span>
          {!hasSpun && <span className="spin-trigger-pulse" />}
        </button>
      )}

      {/* 🎡 Full Wheel Modal */}
      {isOpen && (
        <>
          <div className={`spin-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose} />
          <div className={`spin-modal ${isClosing ? 'closing' : ''}`}>
            <button type="button" className="spin-close-btn" onClick={handleClose} aria-label="Close">
              <X size={20} />
            </button>

            <div className="spin-header">
              <div className="spin-jackpot-ribbon">
                <Sparkles size={13} className="spin-ribbon-sparkle" />
                <span>👑 GRAND PRIZE: 100% ALL-EXPENSE PAID TRIP</span>
                <Sparkles size={13} className="spin-ribbon-sparkle" />
              </div>
              <h3 className="spin-title">
                <Trophy size={22} className="spin-title-icon" />
                Spin & Win Luxury Travel!
              </h3>
              <p className="spin-subtitle">
                {hasSpun && wonPrize
                  ? '🎉 Congratulations! Here is your reward!'
                  : 'Try your luck! Spin to unlock discounts up to 35% or the Grand Free Trip.'}
              </p>
            </div>

            <div className="spin-wheel-area">
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
                  width={300}
                  height={300}
                  className="spin-wheel-canvas"
                />
              </div>
            </div>

            {/* Spin Button or Result */}
            {wonPrize ? (
              <div className="spin-result">
                <div className="spin-result-badge">
                  <PartyPopper size={20} />
                  <span>You Won {wonPrize.label}!</span>
                </div>
                <div className="spin-coupon-card">
                  <span className="spin-coupon-label">Your Coupon Code</span>
                  <div className="spin-coupon-code-row">
                    <code className="spin-coupon-code">{couponCode}</code>
                    <button type="button" className="spin-copy-btn" onClick={handleCopyCoupon}>
                      {couponCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <span className="spin-coupon-validity">Valid for 30 days • Use on any booking</span>
                </div>
                <a
                  href={`https://wa.me/919203931912?text=${encodeURIComponent(`Hi Comfort Journey! I spun your lucky wheel and won ${wonPrize.label} (Coupon: ${couponCode}). I would like to redeem this for my next trip!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spin-claim-wa-btn"
                >
                  <MessageCircle size={16} />
                  <span>Claim Discount on WhatsApp</span>
                </a>
                <p className="spin-result-note">Come back tomorrow for another spin! 🔄</p>
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

            <p className="spin-footer-note">
              One spin per day • {prizes.length} amazing prizes
            </p>
          </div>
        </>
      )}

      <style>{`
        /* ======== TRIGGER BUTTON ======== */
        .spin-trigger-btn {
          position: fixed;
          left: 18px;
          bottom: 100px;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 10px 12px;
          border: 2px solid #FF892F;
          border-radius: 50px;
          cursor: pointer;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          color: #FFF;
          background: linear-gradient(135deg, #FF892F 0%, #E66F12 100%);
          box-shadow: 0 4px 20px rgba(255, 137, 47, 0.35), 0 0 30px rgba(255, 137, 47, 0.12);
          transition: all 0.25s ease;
          animation: spinTriggerBounce 2s ease-in-out infinite;
        }
        .spin-trigger-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 32px rgba(255, 137, 47, 0.45);
          animation: none;
        }
        @keyframes spinTriggerBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .spin-trigger-icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
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

        .spin-trigger-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50px;
          border: 2px solid #FF892F;
          animation: spinPulse 2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes spinPulse {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.3); }
        }

        /* ======== MODAL OVERLAY ======== */
        .spin-overlay {
          position: fixed;
          inset: 0;
          z-index: 99996;
          background: rgba(0, 12, 33, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: spinFadeIn 0.3s ease;
        }
        .spin-overlay.closing { animation: spinFadeOut 0.25s ease forwards; }

        @keyframes spinFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spinFadeOut { from { opacity: 1; } to { opacity: 0; } }

        /* ======== MODAL CARD ======== */
        .spin-modal {
          position: fixed;
          z-index: 99997;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          max-width: calc(100vw - 32px);
          max-height: 95vh;
          overflow-y: auto;
          border-radius: 28px;
          padding: 28px 24px;
          text-align: center;
          animation: spinModalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spin-modal.closing {
          animation: spinModalOut 0.25s ease forwards;
        }
        @keyframes spinModalIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes spinModalOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -50%) scale(0.92); }
        }

        [data-theme="dark"] .spin-modal {
          background: linear-gradient(170deg, #001D51, #001233 70%, #000C21);
          border: 1.5px solid rgba(255, 137, 47, 0.3);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,137,47,0.07);
          color: #F9FBE7;
        }
        :root:not([data-theme="dark"]) .spin-modal,
        [data-theme="light"] .spin-modal {
          background: linear-gradient(170deg, #FFF, #FFF8F0 70%, #FFF5EB);
          border: 1.5px solid rgba(255,137,47,0.25);
          box-shadow: 0 32px 80px rgba(20,38,74,0.15);
          color: #0F172A;
        }

        .spin-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(125,125,125,0.12);
          border: 1px solid rgba(125,125,125,0.15);
          border-radius: 50%;
          width: 36px;
          height: 36px;
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

        .spin-header { margin-bottom: 16px; }
        .spin-jackpot-ribbon {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 14px;
          margin-bottom: 8px;
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.18) 0%, rgba(255, 137, 47, 0.18) 100%);
          border: 1px solid rgba(255, 215, 0, 0.55);
          border-radius: 999px;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.6px;
          color: #FFD700;
          box-shadow: 0 0 16px rgba(255, 215, 0, 0.2);
          animation: jackpotGlow 2s ease-in-out infinite alternate;
        }
        @keyframes jackpotGlow {
          from { box-shadow: 0 0 10px rgba(255, 215, 0, 0.2); }
          to { box-shadow: 0 0 22px rgba(255, 215, 0, 0.5); }
        }
        .spin-ribbon-sparkle {
          color: #FFD700;
        }
        .spin-title {
          font-family: var(--font-heading, 'Baumans', sans-serif);
          font-size: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 0 6px;
        }
        .spin-title-icon { color: #FF892F; }
        .spin-subtitle {
          font-size: 0.84rem;
          opacity: 0.7;
          margin: 0;
        }

        /* ======== WHEEL AREA ======== */
        .spin-wheel-area {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto 20px;
        }

        .spin-pointer {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.2rem;
          color: #FFD700;
          z-index: 10;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.6));
          line-height: 1;
        }

        .spin-wheel-container {
          width: 300px;
          height: 300px;
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
          padding: 14px 40px;
          background: linear-gradient(135deg, #FF892F, #E66F12);
          border: none;
          border-radius: 50px;
          color: #FFF;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 24px rgba(255,137,47,0.35);
          margin-bottom: 12px;
        }
        .spin-action-btn:hover:not(.disabled):not(.spinning) {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 10px 36px rgba(255,137,47,0.45);
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
          gap: 12px;
          margin-bottom: 12px;
          animation: spinResultIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes spinResultIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .spin-result-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 50px;
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFF;
          font-weight: 800;
          font-size: 1rem;
        }

        .spin-coupon-card {
          width: 100%;
          max-width: 280px;
          padding: 16px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
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
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #FF892F;
        }

        .spin-coupon-code-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spin-coupon-code {
          font-family: 'Outfit', monospace;
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 2px;
          color: #FF892F;
        }

        .spin-copy-btn {
          background: rgba(255,137,47,0.15);
          border: 1px solid rgba(255,137,47,0.3);
          border-radius: 8px;
          width: 32px;
          height: 32px;
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
          font-size: 0.72rem;
          opacity: 0.6;
        }

        .spin-claim-wa-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          padding: 10px 18px;
          background: #25D366;
          color: #FFF;
          font-size: 0.84rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: all 0.2s ease;
        }
        .spin-claim-wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
        }

        .spin-result-note {
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0.6;
          margin: 0;
        }

        .spin-footer-note {
          font-size: 0.7rem;
          opacity: 0.45;
          margin: 0;
        }

        /* 📱 Mobile */
        @media (max-width: 640px) {
          .spin-trigger-btn {
            left: 10px;
            bottom: 84px;
            padding: 8px 12px 8px 8px;
            font-size: 0.75rem;
          }
          .spin-trigger-icon-wrap {
            width: 26px;
            height: 26px;
          }
          .spin-modal {
            width: calc(100vw - 24px);
            padding: 22px 16px;
          }
          .spin-wheel-area {
            width: 260px;
            height: 260px;
          }
          .spin-wheel-container {
            width: 260px;
            height: 260px;
          }
          .spin-title { font-size: 1.3rem; }
        }
      `}</style>
    </>
  );
}
