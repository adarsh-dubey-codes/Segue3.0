import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { UserCheck, Shield } from 'lucide-react';

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
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    const newErrors = { email: '', password: '' };
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
    } else if (password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters.';
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
    <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      <header style={{ marginBottom: '28px' }}>
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
          Welcome back
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem' }}>
          Continue your journey with Sakhi Cycle.
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
          <Shield size={16} color="var(--danger)" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
        <Input
          id="login-email"
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
            id="login-password"
            type="password"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            required
            autoComplete="current-password"
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => onOpenForgotPassword(email)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: '500',
                padding: '2px 0',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--rose)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Log In
        </Button>
      </form>

      {/* Switch to Signup */}
      <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--pink-vivid)',
            fontWeight: '600',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Sign up
        </button>
      </p>

      {/* Guest Mode Separator */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '28px 0 20px 0', 
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
