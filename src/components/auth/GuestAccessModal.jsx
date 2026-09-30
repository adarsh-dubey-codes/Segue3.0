import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Laptop, HelpCircle, X, ArrowRight } from 'lucide-react';
import Button from '../Button/Button';

export default function GuestAccessModal({ isOpen, onClose, onConfirm, isLoading }) {
  const { t } = useLanguage();
  if (!isOpen) return null;

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
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.2s ease'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-modal-title"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: '480px',
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
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label={t('accessibility.closeMenu')}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-primary)',
              color: 'var(--pink-vivid)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3
              id="guest-modal-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--text-primary)',
                fontWeight: '600',
                lineHeight: 1.2
              }}
            >
              {t('auth.guestModalTitle')}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>
              {t('auth.guestModalSub')}
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '20px' }}>
          {t('auth.guestModalDesc')}
        </p>

        <div
          style={{
            backgroundColor: 'var(--surface-soft)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid var(--border)',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Laptop size={18} color="var(--rose)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {t('auth.guestStoredLocally')}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <HelpCircle size={18} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {t('auth.guestNoSync')}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t('common.back')}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            loading={isLoading}
            icon={<ArrowRight size={16} />}
          >
            {t('auth.enterGuestMode')}
          </Button>
        </div>
      </div>
    </div>
  );
}
