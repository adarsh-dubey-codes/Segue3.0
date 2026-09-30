import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, CheckCircle2, X } from 'lucide-react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function ForgotPasswordModal({ isOpen, onClose, initialEmail = '' }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState(initialEmail);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(t('errors.invalidEmail'));
      return;
    }

    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(62, 36, 43, 0.45)',
        backdropFilter: 'blur(6px)'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-modal-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 60px rgba(62, 36, 43, 0.2)',
          border: '1px solid var(--border)',
          padding: '32px',
          position: 'relative'
        }}
      >
        <button
          type="button"
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
          aria-label={t('accessibility.closeMenu')}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--pink-primary)',
                  color: 'var(--pink-vivid)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <Mail size={22} />
              </div>
              <h3
                id="forgot-modal-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  marginBottom: '6px'
                }}
              >
                {t('auth.resetPassword')}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {t('auth.resetPasswordDesc')}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                id="reset-email"
                type="email"
                label={t('auth.email')}
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                required
                autoComplete="email"
              />

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                {t('auth.sendResetLink')}
              </Button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(78, 159, 118, 0.15)',
                color: 'var(--success)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--text-primary)',
                fontWeight: '600',
                marginBottom: '8px'
              }}
            >
              {t('auth.resetSentTitle')}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
              {t('auth.resetSentDesc')}
            </p>
            <Button variant="primary" fullWidth onClick={handleReset}>
              {t('auth.backToSignIn')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
