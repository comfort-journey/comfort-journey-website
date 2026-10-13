import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';

export default function VisitorAuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithApple,
    signInWithIdentifier
  } = useUserAuth();

  const [identifier, setIdentifier] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otpCode, setOtpCode] = useState('');
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSSO = async (provider, method) => {
    setLoadingProvider(provider);
    setErrorMsg('');
    try {
      // Simulate instant single-click SSO login
      setTimeout(async () => {
        await method();
        setLoadingProvider(null);
      }, 400);
    } catch (err) {
      setErrorMsg('Authentication error. Please try another option.');
      setLoadingProvider(null);
    }
  };

  const handleIdentifierSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const clean = identifier.trim();
    if (!clean) {
      setErrorMsg('Please enter your mobile phone number or email address.');
      return;
    }

    if (clean.includes('@')) {
      if (!clean.includes('.') || clean.length < 5) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
    } else {
      const digits = clean.replace(/\D/g, '');
      if (digits.length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    // Step 2: Instant 1-click OTP verification
    setStep('otp');
    setOtpCode('4829'); // Instant pre-filled sample or prompt for 1-click verify
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMsg('Please enter the 4-digit verification code.');
      return;
    }
    signInWithIdentifier(identifier, nameInput);
  };

  return (
    <div className="visitor-auth-overlay" onClick={closeAuthModal}>
      <div 
        className="visitor-auth-modal liquid-glass-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Optical Glass Layers */}
        <div className="liquidGlass-effect" aria-hidden="true" />
        <div className="liquidGlass-tint" aria-hidden="true" />
        <div className="liquidGlass-shine" aria-hidden="true" />

        {/* Close Button */}
        <button 
          type="button" 
          className="visitor-auth-close-btn" 
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="visitor-auth-header">
          <div className="auth-brand-badge">
            <span className="auth-badge-dot">✦</span>
            <span>Comfort Journey Member Access</span>
          </div>
          <h3 id="auth-modal-title" className="visitor-auth-title">
            Sign In or Create Account
          </h3>
          <p className="visitor-auth-sub">
            Save custom tour itineraries, track quotes, and sync your dreamboard across all your devices.
          </p>
        </div>

        {/* Social SSO Options (Single Click Google, Microsoft, Apple) */}
        <div className="visitor-auth-sso-grid">
          {/* Google SSO */}
          <button
            type="button"
            className="btn-sso-provider btn-sso-google"
            onClick={() => handleSSO('google', signInWithGoogle)}
            disabled={Boolean(loadingProvider)}
          >
            <svg className="sso-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{loadingProvider === 'google' ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          {/* Microsoft SSO */}
          <button
            type="button"
            className="btn-sso-provider btn-sso-ms"
            onClick={() => handleSSO('microsoft', signInWithMicrosoft)}
            disabled={Boolean(loadingProvider)}
          >
            <svg className="sso-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#F25022" d="M1 1h10v10H1z"/>
              <path fill="#00A4EF" d="M1 13h10v10H1z"/>
              <path fill="#7FBA00" d="M13 1h10v10H13z"/>
              <path fill="#FFB900" d="M13 13h10v10H13z"/>
            </svg>
            <span>{loadingProvider === 'microsoft' ? 'Connecting to Microsoft...' : 'Continue with Microsoft'}</span>
          </button>

          {/* Apple ID SSO */}
          <button
            type="button"
            className="btn-sso-provider btn-sso-apple"
            onClick={() => handleSSO('apple', signInWithApple)}
            disabled={Boolean(loadingProvider)}
          >
            <svg className="sso-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.65-.8 1.09-1.91.97-3.02-.94.04-2.09.63-2.76 1.41-.59.68-1.11 1.79-.97 2.87 1.05.08 2.11-.47 2.76-1.26"/>
            </svg>
            <span>{loadingProvider === 'apple' ? 'Connecting to Apple...' : 'Continue with Apple'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="visitor-auth-divider">
          <span>or continue with email / mobile</span>
        </div>

        {/* Step 1: Identifier Input Form */}
        {step === 'input' && (
          <form onSubmit={handleIdentifierSubmit} className="visitor-auth-form">
            <div className="auth-field-group">
              <label htmlFor="auth-identifier">Email Address or 10-Digit Mobile Number</label>
              <div className="auth-input-wrapper">
                <input
                  id="auth-identifier"
                  type="text"
                  placeholder="e.g. rahul@gmail.com or 9876543210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label htmlFor="auth-name">Your Full Name (Optional)</label>
              <div className="auth-input-wrapper">
                <input
                  id="auth-name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
              </div>
            </div>

            {errorMsg && <p className="auth-error-text">{errorMsg}</p>}

            <button type="submit" className="btn-primary btn-auth-submit">
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Step 2: Instant OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="visitor-auth-form">
            <div className="auth-field-group">
              <label htmlFor="auth-otp">Enter 4-Digit Verification Code sent to {identifier}</label>
              <div className="auth-input-wrapper">
                <input
                  id="auth-otp"
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="4829"
                  autoFocus
                  required
                  style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.25rem', fontWeight: 800 }}
                />
              </div>
              <span className="auth-hint">Demo mode: 4-digit auto-code is verified instantly.</span>
            </div>

            {errorMsg && <p className="auth-error-text">{errorMsg}</p>}

            <button type="submit" className="btn-primary btn-auth-submit">
              <CheckCircle2 size={16} />
              <span>Verify & Complete Sign In</span>
            </button>

            <button 
              type="button" 
              className="btn-auth-back" 
              onClick={() => { setStep('input'); setErrorMsg(''); }}
            >
              ← Change email or mobile number
            </button>
          </form>
        )}

        {/* Value Perks Footer */}
        <div className="visitor-auth-perks">
          <div className="perk-item">
            <CheckCircle2 size={14} className="text-emerald" />
            <span>Synced Dreamboard</span>
          </div>
          <div className="perk-item">
            <CheckCircle2 size={14} className="text-emerald" />
            <span>Auto-fill Fast Booking</span>
          </div>
          <div className="perk-item">
            <CheckCircle2 size={14} className="text-emerald" />
            <span>24/7 WhatsApp Trip Concierge</span>
          </div>
        </div>
      </div>

      <style>{`
        .visitor-auth-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeInOverlay 0.25s ease-out;
        }

        .visitor-auth-modal {
          position: relative;
          width: 100%;
          max-width: 460px;
          border-radius: 24px;
          padding: 2.25rem 2rem;
          background: var(--color-surface, #0A1120);
          color: var(--color-text, #FFFFFF);
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.15));
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 137, 47, 0.15);
          overflow: hidden;
          animation: scaleUpModal 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .visitor-auth-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.15));
          background: rgba(125, 125, 125, 0.1);
          color: var(--color-text, #FFFFFF);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }

        .visitor-auth-close-btn:hover {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        .visitor-auth-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .auth-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #FF892F;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.3);
          border-radius: 9999px;
          padding: 0.2rem 0.7rem;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visitor-auth-title {
          font-family: var(--font-heading, inherit);
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 0.4rem 0;
          color: var(--color-text, #FFFFFF);
          line-height: 1.2;
        }

        .visitor-auth-sub {
          font-size: 0.85rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.7));
          margin: 0 auto;
          line-height: 1.45;
          max-width: 380px;
        }

        /* SSO Grid */
        .visitor-auth-sso-grid {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }

        .btn-sso-provider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(125, 125, 125, 0.25);
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-text, #FFFFFF);
        }

        [data-theme="light"] .btn-sso-provider {
          background: #FFFFFF;
          color: #1E293B;
          border-color: #E2E8F0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .btn-sso-provider:hover {
          transform: translateY(-2px);
          border-color: #FF892F;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .btn-sso-google:hover {
          border-color: #4285F4;
        }

        .btn-sso-ms:hover {
          border-color: #00A4EF;
        }

        .btn-sso-apple:hover {
          border-color: #A2AAAD;
        }

        .sso-icon {
          flex-shrink: 0;
        }

        /* Divider */
        .visitor-auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.25rem 0;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.5));
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visitor-auth-divider::before,
        .visitor-auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.12));
        }

        .visitor-auth-divider span {
          padding: 0 0.75rem;
        }

        /* Form */
        .visitor-auth-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .auth-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          text-align: left;
        }

        .auth-field-group label {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.8));
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .auth-input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.18));
          background: rgba(255, 255, 255, 0.06);
          color: var(--color-text, #FFFFFF);
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s;
        }

        [data-theme="light"] .auth-input-wrapper input {
          background: #F8FAFC;
          color: #0F172A;
          border-color: #CBD5E1;
        }

        .auth-input-wrapper input:focus {
          border-color: #FF892F;
          box-shadow: 0 0 0 3px rgba(255, 137, 47, 0.2);
        }

        .auth-error-text {
          font-size: 0.8rem;
          color: #EF4444;
          margin: 0;
          text-align: left;
          font-weight: 600;
        }

        .auth-hint {
          font-size: 0.72rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.6));
          margin-top: 0.25rem;
        }

        .btn-auth-submit {
          width: 100%;
          padding: 0.85rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .btn-auth-back {
          background: none;
          border: none;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.7));
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.4rem;
          text-decoration: underline;
          margin-top: 0.25rem;
        }

        .btn-auth-back:hover {
          color: #FF892F;
        }

        /* Perks */
        .visitor-auth-perks {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.76rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.75));
          font-weight: 600;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUpModal {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 480px) {
          .visitor-auth-modal {
            padding: 1.75rem 1.25rem;
          }
          .visitor-auth-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}
