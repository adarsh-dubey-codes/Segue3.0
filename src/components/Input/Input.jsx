import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  required = false,
  autoComplete,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }} className={className}>
      {label && (
        <label 
          htmlFor={id} 
          style={{ 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            color: 'var(--text-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{label} {required && <span style={{ color: 'var(--rose-accent)' }}>*</span>}</span>
        </label>
      )}
      
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: isPassword ? '44px' : '16px',
            backgroundColor: '#FFFFFF',
            border: `1px solid ${error ? 'var(--error-color)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-md)',
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            outline: 'none'
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = 'var(--border-focus)';
            e.target.style.boxShadow = '0 0 0 3px rgba(217, 130, 155, 0.15)';
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = 'var(--border-color)';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <span 
          style={{ 
            fontSize: '0.8rem', 
            color: 'var(--error-color)',
            marginTop: '2px',
            fontWeight: '500'
          }}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}
