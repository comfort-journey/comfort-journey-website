import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Mail, Loader2, RotateCcw } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';
import { emailOtpService } from '../services/emailOtpService';

export default function VisitorAuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signInWithGoogle,
    signInWithIdentifier
  } = useUserAuth();

  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otpCode, setOtpCode] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer = null;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  if (!isAuthModalOpen) return null;

  const handleOpenTerms = (e) => {
    e.preventDefault();
    closeAuthModal();
    if (typeof window !== 'undefined') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/terms-and-conditions/');
      }
      window.dispatchEvent(new CustomEvent('open-policy-modal', { detail: 'terms' }));
    }
  };

  const handleOpenPrivacy = (e) => {
    e.preventDefault();
    closeAuthModal();
    if (typeof window !== 'undefined') {
      if (window.history?.pushState) {
        window.history.pushState(null, '', '/privacy-policy/');
      }
      window.dispatchEvent(new CustomEvent('open-policy-modal', { detail: 'privacy' }));
    }
  };

  const handleSSO = async (provider, method) => {
    if (!consentChecked) {
      setConsentError(true);
      setErrorMsg('Please review and check the agreement box before continuing.');
      return;
    }

    setLoadingProvider(provider);
    setErrorMsg('');
    try {
      const cleanEmail = emailInput.trim();
      const cleanName = nameInput.trim();

      let profile = null;
      if (cleanEmail && cleanEmail.includes('@')) {
        profile = {
          name: cleanName || cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: cleanEmail.toLowerCase(),
          phone: ''
        };
      }

      await method(profile);
      setLoadingProvider(null);
    } catch (err) {
      console.warn(`[SSO Error] ${provider}:`, err);
      const msg = err?.message || '';
      if (msg.includes('closed') || msg.includes('cancel') || msg.includes('POPUP_CLOSED')) {
        setErrorMsg('Google sign-in was closed or cancelled. Please try again or use email verification below.');
      } else if (msg.includes('origin') || msg.includes('mismatch')) {
        setErrorMsg('Domain origin error in Google Cloud Console. Please use email verification below.');
      } else if (msg.includes('MISSING_CLIENT_ID')) {
        setErrorMsg('Google Client ID is missing. Please use email verification below.');
      } else {
        setErrorMsg(msg || 'Authentication could not be completed. Please try with email below.');
      }
      setLoadingProvider(null);
    }
  };

  const handleSendEmailOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!consentChecked) {
      setConsentError(true);
      setErrorMsg('Please agree to the Terms & Conditions and Privacy Policy to proceed.');
      return;
    }

    const clean = emailInput.trim().toLowerCase();
    if (!clean) {
      setErrorMsg('Please enter your email address to receive your verification code.');
      return;
    }

    // If user entered phone number instead of email, guide them politely
    if (!clean.includes('@')) {
      setErrorMsg('To receive your free 6-digit verification code, please enter your email address (or sign in with Google).');
      return;
    }

    if (!clean.includes('.') || clean.length < 5) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSendingOtp(true);
    try {
      await emailOtpService.sendEmailOtp({
        email: clean,
        name: nameInput.trim()
      });

      setStep('otp');
      setOtpCode('');
      setResendCooldown(60);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to send verification code. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanCode = otpCode.trim().replace(/\D/g, '');
    if (!cleanCode || cleanCode.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code sent to your email.');
      return;
    }

    setIsVerifying(true);
    try {
      const result = emailOtpService.verifyOtp({
        email: emailInput.trim().toLowerCase(),
        code: cleanCode
      });

      if (!result.success) {
        setErrorMsg(result.error || 'Verification failed. Please check the code in your email.');
        setIsVerifying(false);
        return;
      }

      await signInWithIdentifier(emailInput.trim().toLowerCase(), nameInput.trim());
    } catch (err) {
      setErrorMsg(err.message || 'Could not verify code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
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

        {/* Prominent 1-Click Google SSO */}
        <div className="visitor-auth-sso-grid">
          <button
            type="button"
            className="btn-sso-provider btn-sso-google"
            onClick={() => handleSSO('google', signInWithGoogle)}
            disabled={Boolean(loadingProvider) || isSendingOtp}
          >
            <svg className="sso-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{loadingProvider === 'google' ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="visitor-auth-divider">
          <span>or continue with email verification</span>
        </div>

        {/* Step 1: Real Email OTP Request Form */}
        {step === 'input' && (
          <form onSubmit={handleSendEmailOtp} className="visitor-auth-form">
            <div className="auth-field-group">
              <label htmlFor="auth-email">Your Email Address *</label>
              <div className="auth-input-wrapper">
                <input
                  id="auth-email"
                  type="email"
                  placeholder="e.g. yourname@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
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

            {/* Reassuring DPDP Act Legal Consent Checkbox */}
            <div className={`auth-consent-row ${consentError ? 'consent-has-error' : ''}`}>
              <label className="auth-consent-label">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => {
                    setConsentChecked(e.target.checked);
                    if (e.target.checked) setConsentError(false);
                  }}
                  required
                />
                <span className="auth-consent-text">
                  I agree to the{' '}
                  <a href="/terms-and-conditions/" onClick={handleOpenTerms} className="auth-consent-link">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy/" onClick={handleOpenPrivacy} className="auth-consent-link">
                    Privacy Policy
                  </a>
                  , and consent to receive curated travel updates and offers from Comfort Journey. Your data is kept strictly private and never shared.
                </span>
              </label>
            </div>

            {errorMsg && <p className="auth-error-text">{errorMsg}</p>}

            <button 
              type="submit" 
              className="btn-primary btn-auth-submit"
              disabled={isSendingOtp}
            >
              {isSendingOtp ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <Mail size={16} />
                  <span>Send 6-Digit Email Code</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: 6-Digit Verification Code Form */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="visitor-auth-form">
            <div className="auth-field-group">
              <label htmlFor="auth-otp">
                Enter 6-Digit Verification Code sent to <strong style={{ color: '#FF892F' }}>{emailInput}</strong>
              </label>
              <div className="auth-input-wrapper">
                <input
                  id="auth-otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="······"
                  autoFocus
                  required
                  style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.4rem', fontWeight: 800 }}
                />
              </div>
              <span className="auth-hint">
                Please check your inbox (and spam/promotions folder). Code is valid for 10 minutes.
              </span>
            </div>

            {errorMsg && <p className="auth-error-text">{errorMsg}</p>}

            <button 
              type="submit" 
              className="btn-primary btn-auth-submit"
              disabled={isVerifying || otpCode.length < 6}
            >
              {isVerifying ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>Verify & Complete Sign In</span>
                </>
              )}
            </button>

            <div className="auth-otp-actions-row">
              <button 
                type="button" 
                className="btn-auth-back" 
                onClick={() => { setStep('input'); setErrorMsg(''); }}
              >
                ← Change email address
              </button>

              <button
                type="button"
                className="btn-auth-resend"
                disabled={resendCooldown > 0 || isSendingOtp}
                onClick={handleSendEmailOtp}
              >
                <RotateCcw size={12} />
                <span>
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .visitor-auth-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: rgba(0, 0, 0, 0.78);
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
          max-width: 470px;
          border-radius: 24px;
          padding: 2.25rem 2rem 2rem 2rem;
          background: var(--color-surface, #0A1120);
          color: var(--color-text, #FFFFFF);
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.15));
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 0 40px rgba(255, 137, 47, 0.15);
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
          margin-bottom: 1.4rem;
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
          padding: 0.2rem 0.75rem;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .visitor-auth-title {
          font-family: var(--font-heading, inherit);
          font-size: 1.45rem;
          font-weight: 800;
          margin: 0 0 0.4rem 0;
          color: var(--color-text, #FFFFFF);
          line-height: 1.2;
        }

        .visitor-auth-sub {
          font-size: 0.84rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.7));
          margin: 0 auto;
          line-height: 1.45;
          max-width: 390px;
        }

        /* SSO Grid */
        .visitor-auth-sso-grid {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.15rem;
        }

        .btn-sso-provider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          font-size: 0.92rem;
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

        .btn-sso-provider:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: #FF892F;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .btn-sso-google {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-sso-google:hover:not(:disabled) {
          border-color: #4285F4;
          background: rgba(66, 133, 244, 0.08);
        }

        .sso-icon {
          flex-shrink: 0;
        }

        /* Divider */
        .visitor-auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.15rem 0;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.5));
          font-size: 0.72rem;
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
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.85));
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

        /* Reassuring Consent Checkbox Row */
        .auth-consent-row {
          margin: 0.25rem 0 0.25rem 0;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: border-color 0.2s;
        }

        .auth-consent-row.consent-has-error {
          border-color: #EF4444;
          background: rgba(239, 68, 68, 0.06);
        }

        .auth-consent-label {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          cursor: pointer;
          user-select: none;
          text-align: left;
        }

        .auth-consent-label input[type="checkbox"] {
          margin-top: 0.15rem;
          accent-color: #FF892F;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .auth-consent-text {
          font-size: 0.73rem;
          line-height: 1.45;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.75));
        }

        [data-theme="light"] .auth-consent-text {
          color: #475569;
        }

        .auth-consent-link {
          color: #FF892F;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 600;
        }

        .auth-consent-link:hover {
          color: #FFA45A;
        }

        .auth-error-text {
          font-size: 0.78rem;
          color: #EF4444;
          margin: 0;
          text-align: left;
          font-weight: 600;
          line-height: 1.4;
        }

        .auth-hint {
          font-size: 0.72rem;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.6));
          margin-top: 0.25rem;
          line-height: 1.4;
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
          margin-top: 0.25rem;
        }

        .auth-otp-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.4rem;
        }

        .btn-auth-back,
        .btn-auth-resend {
          background: none;
          border: none;
          color: var(--color-text-muted, rgba(255, 255, 255, 0.7));
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.3rem 0;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.2s;
        }

        .btn-auth-back {
          text-decoration: underline;
        }

        .btn-auth-back:hover,
        .btn-auth-resend:hover:not(:disabled) {
          color: #FF892F;
        }

        .btn-auth-resend:disabled {
          opacity: 0.4;
          cursor: not-allowed;
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
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
