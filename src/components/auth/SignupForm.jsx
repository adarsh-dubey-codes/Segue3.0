import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function SignupForm({
  onSubmit,
  onSwitchToLogin,
  onOpenGuestModal,
  isLoading,
  authError
}) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = t('errors.invalidEmail');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('errors.invalidEmail');
      isValid = false;
    }

    if (!password) {
      newErrors.password = t('errors.required');
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = t('errors.shortPassword');
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t('errors.required');
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('errors.passwordMismatch');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, email, password });
  };

  return (
    <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
      <h2 
        style={{ 
          fontFamily: "'Playfair Display', Georgia, serif", 
          fontSize: '1.6rem', 
          fontWeight: '600',
          color: '#38232A',
          marginBottom: '20px',
          textAlign: 'left'
        }}
      >
        {t('auth.createAccount')}
      </h2>

      {authError && (
        <div 
          style={{ 
            backgroundColor: '#FFF0F3', 
            color: '#D32F2F',
            padding: '12px 16px',
            borderRadius: '16px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            border: '1px solid #FAD4DE',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          role="alert"
        >
          <AlertCircle size={16} color="#D32F2F" style={{ flexShrink: 0 }} />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} noValidate>
        {/* Name Input */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#FAF0F2',
            border: '1px solid #F0D5DD',
            borderRadius: '20px',
            padding: '0 18px',
            height: '52px'
          }}
        >
          <User size={18} color="#8C3558" style={{ flexShrink: 0 }} />
          <input
            id="signup-name"
            type="text"
            placeholder={t('auth.preferredNamePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.95rem',
              color: '#38232A',
              fontFamily: 'var(--font-ui)'
            }}
          />
        </div>

        {/* Email Input */}
        <div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FAF0F2',
              border: errors.email ? '1px solid #D32F2F' : '1px solid #F0D5DD',
              borderRadius: '20px',
              padding: '0 18px',
              height: '52px'
            }}
          >
            <Mail size={18} color="#8C3558" style={{ flexShrink: 0 }} />
            <input
              id="signup-email"
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.95rem',
                color: '#38232A',
                fontFamily: 'var(--font-ui)'
              }}
              required
            />
          </div>
          {errors.email && (
            <p style={{ color: '#D32F2F', fontSize: '0.775rem', marginTop: '4px', paddingLeft: '12px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FAF0F2',
              border: errors.password ? '1px solid #D32F2F' : '1px solid #F0D5DD',
              borderRadius: '20px',
              padding: '0 18px',
              height: '52px'
            }}
          >
            <Lock size={18} color="#8C3558" style={{ flexShrink: 0 }} />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.95rem',
                color: '#38232A',
                fontFamily: 'var(--font-ui)'
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8C3558' }}
              aria-label={showPassword ? t('accessibility.hidePassword') : t('accessibility.showPassword')}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: '#D32F2F', fontSize: '0.775rem', marginTop: '4px', paddingLeft: '12px' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FAF0F2',
              border: errors.confirmPassword ? '1px solid #D32F2F' : '1px solid #F0D5DD',
              borderRadius: '20px',
              padding: '0 18px',
              height: '52px'
            }}
          >
            <Lock size={18} color="#8C3558" style={{ flexShrink: 0 }} />
            <input
              id="signup-confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.95rem',
                color: '#38232A',
                fontFamily: 'var(--font-ui)'
              }}
              required
            />
          </div>
          {errors.confirmPassword && (
            <p style={{ color: '#D32F2F', fontSize: '0.775rem', marginTop: '4px', paddingLeft: '12px' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '9999px',
            backgroundColor: '#6E2C4B',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isLoading ? 'wait' : 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 6px 18px rgba(110, 44, 75, 0.25)',
            marginTop: '6px'
          }}
          className="sakhi-primary-btn"
        >
          {isLoading ? (
            <span>{t('auth.creatingAccount')}</span>
          ) : (
            <>
              <span>{t('auth.signUp')}</span>
              <ArrowRight size={18} color="#FFFFFF" />
            </>
          )}
        </button>
      </form>

      {/* OR Separator */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '20px 0 16px 0', 
          color: '#A0828D',
          fontSize: '0.75rem'
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: '#F0D5DD' }} />
        <span style={{ padding: '0 14px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '500' }}>{t('common.or')}</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#F0D5DD' }} />
      </div>

      {/* Guest Mode Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={onOpenGuestModal}
        style={{
          width: '100%',
          height: '52px',
          borderRadius: '9999px',
          backgroundColor: '#FFFFFF',
          color: '#6E2C4B',
          border: '1px solid #E59BB0',
          fontSize: '0.95rem',
          fontWeight: '600',
          fontFamily: 'var(--font-ui)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 2px 8px rgba(236, 115, 143, 0.08)'
        }}
        className="sakhi-guest-btn"
      >
        <User size={18} color="#8C3558" />
        <span>{t('auth.continueAsGuest')}</span>
        <ArrowRight size={18} color="#8C3558" />
      </button>

      {/* Switch to Login */}
      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.875rem', color: '#7D626C' }}>
        {t('auth.alreadyHaveAccount')}{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#EC738F',
            fontWeight: '600',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {t('auth.signIn')}
        </button>
      </p>
    </div>
  );
}
