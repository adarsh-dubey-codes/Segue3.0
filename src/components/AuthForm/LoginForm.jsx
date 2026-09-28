import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validate = () => {
    const newErrors = { email: '', password: '', form: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Please enter your password';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({ email: '', password: '', form: '' });

    // Simulate authentication API call
    setTimeout(() => {
      setIsLoading(false);
      // Demo validation: any valid email works, or optional test fail if needed
      onLoginSuccess({ email });
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onLoginSuccess({ email: 'user@google.com', name: 'Google User' });
    }, 1000);
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <h2 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '2rem', 
            fontWeight: '600',
            color: 'var(--deep-plum)',
            marginBottom: '8px'
          }}
        >
          Welcome back.
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem' }}>
          Continue your journey with Sakhi Cycle.
        </p>
      </header>

      {errors.form && (
        <div 
          style={{ 
            backgroundColor: 'var(--error-bg)', 
            color: 'var(--error-color)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            marginBottom: '20px',
            border: '1px solid #F87171'
          }}
          role="alert"
        >
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
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
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            required
            autoComplete="current-password"
          />
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => alert('Password reset link will be sent to your email.')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.825rem',
                cursor: 'pointer',
                fontWeight: '500',
                padding: '2px 0'
              }}
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
          disabled={isLoading || isGoogleLoading}
        >
          Log in
        </Button>
      </form>

      {/* Divider */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '28px 0', 
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
        <span style={{ padding: '0 12px' }}>or</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
      </div>

      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        fullWidth
        loading={isGoogleLoading}
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleLogin}
        icon={
          !isGoogleLoading && (
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )
        }
      >
        Continue with Google
      </Button>

      {/* Footer link */}
      <p style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => alert('Account creation will be available in the next release.')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--rose-accent)',
            fontWeight: '600',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Create one
        </button>
      </p>
    </div>
  );
}
