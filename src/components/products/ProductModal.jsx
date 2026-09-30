import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { X, ExternalLink, Check, AlertCircle, PlayCircle, ShieldCheck } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  const { t } = useTranslation();
  if (!product) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53, 38, 46, 0.45)',
        backdropFilter: 'blur(4px)',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          aria-label={t('common.close', 'Close')}
        >
          <X size={20} />
        </button>

        {/* Product Image & Title */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', alignItems: 'center' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border)' }}
          />
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              <span className="badge-tag">{t(`productsPage.${product.type.toLowerCase()}`, product.type)}</span>
              <span className="badge-tag" style={{ backgroundColor: 'var(--surface-soft)' }}>{t(`productsPage.${product.category.toLowerCase()}`, product.category)}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', color: 'var(--rose-dark)' }}>
              {product.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Info Pill Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ padding: '10px', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{t('productsPage.costRange', 'Cost Range')}</span>
            <strong style={{ fontSize: '0.85rem', color: 'var(--rose-dark)' }}>{product.costInfo}</strong>
          </div>
          <div style={{ padding: '10px', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{t('productsPage.beginnerFriendly', 'Beginner Friendly')}</span>
            <strong style={{ fontSize: '0.85rem', color: 'var(--rose-dark)' }}>{product.beginnerFriendly}</strong>
          </div>
          <div style={{ padding: '10px', backgroundColor: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <span style={{ display: 'block', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{t('productsPage.ecoImpact', 'Eco Impact')}</span>
            <strong style={{ fontSize: '0.85rem', color: 'var(--rose-dark)' }}>{product.ecoRating}</strong>
          </div>
        </div>

        <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
          {product.description}
        </p>

        {/* Benefits & Things to know */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--rose-dark)', marginBottom: '10px' }}>
              {t('productsPage.keyBenefits', 'Key Benefits')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
              {product.benefits.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <Check size={16} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--rose-dark)', marginBottom: '10px' }}>
              {t('productsPage.thingsToKnow', 'Things to Know')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
              {product.thingsToKnow.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <AlertCircle size={16} color="var(--warning)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to Use Step-by-Step */}
        <div style={{ marginBottom: '24px', backgroundColor: 'var(--surface-soft)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--rose-dark)', marginBottom: '12px' }}>
            {t('productsPage.howToUse', 'How to Use')}
          </h4>
          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {product.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Tutorials */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--rose-dark)', marginBottom: '12px' }}>
            {t('productsPage.tutorialsHeader', 'Video Tutorials & Guides')}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {product.tutorials.map((tut, idx) => (
              <a
                key={idx}
                href={tut.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: 'var(--rose-dark)',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PlayCircle size={18} color="var(--rose)" />
                  <span>{tut.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>{tut.duration}</span>
                  <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
