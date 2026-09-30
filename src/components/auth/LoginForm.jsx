import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginForm({ 
  onSubmit, 
  onSwitchToSignup, 
  onOpenGuestModal, 
  onOpenForgotPassword,
  isLoading,
  authError 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ email, password });
  };

  return (
    <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
      {/* Section Title matching screenshot */}
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
        Sign In
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
        {/* Email Field Container */}
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
              height: '52px',
              transition: 'all 0.2s ease',
              boxShadow: 'inset 0 1px 3px rgba(140, 53, 88, 0.03)'
            }}
            className="sakhi-input-box"
          >
            <Mail size={18} color="#8C3558" style={{ flexShrink: 0 }} />
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
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
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
              required
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p style={{ color: '#D32F2F', fontSize: '0.775rem', marginTop: '6px', paddingLeft: '12px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field Container */}
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
              height: '52px',
              transition: 'all 0.2s ease',
              boxShadow: 'inset 0 1px 3px rgba(140, 53, 88, 0.03)'
            }}
            className="sakhi-input-box"
          >
            <Lock size={18} color="#8C3558" style={{ flexShrink: 0 }} />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                color: '#8C3558',
                opacity: 0.85
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: '#D32F2F', fontSize: '0.775rem', marginTop: '6px', paddingLeft: '12px' }}>
              {errors.password}
            </p>
          )}

          {/* Forgot Password Link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => onOpenForgotPassword(email)}
              style={{
                background: 'none',
                border: 'none',
                color: '#EC738F',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '500',
                padding: '2px 0',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#D9486D')}
              onMouseLeave={(e) => (e.target.style.color = '#EC738F')}
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Primary Action Button: "Sign In →" */}
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isLoading ? 'wait' : 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 6px 18px rgba(110, 44, 75, 0.25)',
            marginTop: '8px'
          }}
          className="sakhi-primary-btn"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In</span>
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
          margin: '24px 0 20px 0', 
          color: '#A0828D',
          fontSize: '0.75rem'
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: '#F0D5DD' }} />
        <span style={{ padding: '0 14px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '500' }}>OR</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#F0D5DD' }} />
      </div>

      {/* Guest Mode Button: "Continue as Guest →" */}
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
          fontFamily: "'Plus Jakarta Sans', sans-serif",
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
        <span>Continue as Guest</span>
        <ArrowRight size={18} color="#8C3558" />
      </button>

      {/* Switch to Signup */}
      <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#7D626C' }}>
        New to Sakhi?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          style={{
            background: 'none',
            border: 'none',
            color: '#EC738F',
            fontWeight: '600',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => (e.target.style.color = '#D9486D')}
          onMouseLeave={(e) => (e.target.style.color = '#EC738F')}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
