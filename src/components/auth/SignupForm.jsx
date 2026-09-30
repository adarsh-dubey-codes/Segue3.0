import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { UserCheck, Shield, Check, AlertCircle } from 'lucide-react';

export default function SignupForm({
  onSubmit,
  onSwitchToLogin,
  onOpenGuestModal,
  isLoading,
  authError
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Password strength calculator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#E09F3E' };
    if (score === 2 || score === 3) return { score: 2, label: 'Moderate', color: '#EC738F' };
    return { score: 3, label: 'Strong', color: '#4E9F76' };
  };

  const strength = getPasswordStrength(password);

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters.';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
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
    <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '2.1rem', 
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            lineHeight: 1.2
          }}
        >
          Create your space
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Begin your private cycle companion experience.
        </p>
      </header>

      {authError && (
        <div 
          style={{ 
            backgroundColor: '#FFF0F3', 
            color: 'var(--danger)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            marginBottom: '20px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          role="alert"
        >
          <AlertCircle size={16} color="var(--danger)" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} noValidate>
        <Input
          id="signup-name"
          type="text"
          label="Preferred Name / Nickname"
          placeholder="How should Sakhi address you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <Input
          id="signup-email"
          type="email"
          label="Email"
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          error={errors.email}
          required
          autoComplete="email"
        />

        <div>
          <Input
            id="signup-password"
            type="password"
            label="Password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            required
            autoComplete="new-password"
          />

          {/* Live Password Strength Feedback */}
          {password && (
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Password strength:</span>
                <span style={{ fontWeight: '600', color: strength.color }}>{strength.label}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', height: '4px', width: '100%', borderRadius: '2px', overflow: 'hidden', backgroundColor: 'var(--border)' }}>
                <div style={{ flex: 1, backgroundColor: strength.score >= 1 ? strength.color : 'transparent', transition: 'background-color 0.2s' }} />
                <div style={{ flex: 1, backgroundColor: strength.score >= 2 ? strength.color : 'transparent', transition: 'background-color 0.2s' }} />
                <div style={{ flex: 1, backgroundColor: strength.score >= 3 ? strength.color : 'transparent', transition: 'background-color 0.2s' }} />
              </div>
            </div>
          )}
        </div>

        <Input
          id="signup-confirm-password"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
          }}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          style={{ marginTop: '6px' }}
        >
          Create account
        </Button>
      </form>

      {/* Switch to Login */}
      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--pink-vivid)',
            fontWeight: '600',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Log in
        </button>
      </p>

      {/* Guest Mode Separator */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '24px 0 18px 0', 
          color: 'var(--text-muted)',
          fontSize: '0.825rem'
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
        <span style={{ padding: '0 12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>OR</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        disabled={isLoading}
        onClick={onOpenGuestModal}
        icon={<UserCheck size={17} color="var(--rose)" />}
      >
        Continue as Guest
      </Button>
    </div>
  );
}
