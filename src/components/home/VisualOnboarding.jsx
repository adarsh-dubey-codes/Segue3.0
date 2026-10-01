import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../Button/Button';
import { X, ArrowRight, CheckCircle2, Sparkles, Heart, MessageCircle, ShieldCheck, Sun, Moon, Droplet, Sprout } from 'lucide-react';

export default function VisualOnboarding({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const slides = [
    {
      id: 'welcome',
      title: t('onboarding.welcome', 'Welcome to Sakhi Cycle'),
      desc: t('onboarding.welcomeSub', 'A gentle, intelligent space to understand your body, track your rhythm, and thrive every day.'),
      accentColor: '#EC738F',
      renderVisual: () => (
        <div 
          style={{
            width: '100%',
            backgroundColor: '#FFF0F4',
            backgroundImage: 'linear-gradient(135deg, #FFF0F4 0%, #FFE4EC 100%)',
            borderRadius: '24px',
            padding: '24px 20px',
            border: '1.5px solid #FAD4DE',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 8px 20px rgba(236, 115, 143, 0.08)'
          }}
        >
          {/* Main Avatar Icon */}
          <div 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              boxShadow: '0 8px 20px rgba(236, 115, 143, 0.2)',
              border: '2px solid #FFE4EC'
            }}
          >
            🌸
          </div>

          {/* Feature Badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '9999px', fontSize: '0.775rem', fontWeight: '700', color: '#B9345D', border: '1px solid #FAD4DE', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} color="#B9345D" /> Smart AI
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '9999px', fontSize: '0.775rem', fontWeight: '700', color: '#B9345D', border: '1px solid #FAD4DE', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} color="#B9345D" /> 100% Private
            </span>
            <span style={{ backgroundColor: '#FFFFFF', padding: '5px 12px', borderRadius: '9999px', fontSize: '0.775rem', fontWeight: '700', color: '#B9345D', border: '1px solid #FAD4DE', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Heart size={12} color="#B9345D" /> Cycle Care
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'phases',
      title: t('onboarding.phaseTitle', 'Your Cycle Changes in 4 Phases'),
      desc: t('onboarding.phaseSub', 'Understand how your energy, mood, and nutrition shift through each phase.'),
      accentColor: '#4E9F76',
      renderVisual: () => (
        <div 
          style={{
            width: '100%',
            backgroundColor: '#F4FAF6',
            borderRadius: '24px',
            padding: '20px 16px',
            border: '1.5px solid #D1FAE5',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* Horizontal 4-Phase Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            <div style={{ backgroundColor: '#FFF0F3', border: '1.5px solid #FAD4DE', borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '2px' }}>🩸</span>
              <strong style={{ fontSize: '0.725rem', color: '#BE123C', display: 'block' }}>Period</strong>
            </div>

            <div style={{ backgroundColor: '#EFFFF6', border: '1.5px solid #A7F3D0', borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '2px' }}>🌱</span>
              <strong style={{ fontSize: '0.725rem', color: '#047857', display: 'block' }}>Growth</strong>
            </div>

            <div style={{ backgroundColor: '#FEF9EF', border: '1.5px solid #FDE68A', borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '2px' }}>☀️</span>
              <strong style={{ fontSize: '0.725rem', color: '#B45309', display: 'block' }}>Ovulation</strong>
            </div>

            <div style={{ backgroundColor: '#F3F0FF', border: '1.5px solid #DDD6FE', borderRadius: '16px', padding: '10px 4px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '2px' }}>🌙</span>
              <strong style={{ fontSize: '0.725rem', color: '#6D28D9', display: 'block' }}>Rest</strong>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '8px 12px', fontSize: '0.775rem', color: '#047857', fontWeight: '600', textAlign: 'center', border: '1px solid #A7F3D0' }}>
            ✨ Tailored daily tips for workout, food & self-care
          </div>
        </div>
      )
    },
    {
      id: 'feelings',
      title: t('onboarding.feelTitle', 'Tell Sakhi How You Feel'),
      desc: t('onboarding.feelSub', 'Log your symptoms, flow, and energy levels with simple, intuitive icons.'),
      accentColor: '#E09F3E',
      renderVisual: () => (
        <div 
          style={{
            width: '100%',
            backgroundColor: '#FFFBEB',
            borderRadius: '24px',
            padding: '20px 16px',
            border: '1.5px solid #FDE68A',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {/* 4 Mood & Symptom Tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '10px 12px', border: '1px solid #FEF08A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>😊</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.775rem', color: '#92400E', display: 'block' }}>Radiant Mood</strong>
                <span style={{ fontSize: '0.7rem', color: '#B45309' }}>Feeling great</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '10px 12px', border: '1px solid #FFE4E6', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>💧</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.775rem', color: '#BE123C', display: 'block' }}>Flow Tracking</strong>
                <span style={{ fontSize: '0.7rem', color: '#E11D48' }}>Medium flow</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '10px 12px', border: '1px solid #DDD6FE', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>😴</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.775rem', color: '#5B21B6', display: 'block' }}>Low Energy</strong>
                <span style={{ fontSize: '0.7rem', color: '#6D28D9' }}>Needs cozy rest</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '10px 12px', border: '1px solid #BAE6FD', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>🍵</span>
              <div style={{ textAlign: 'left' }}>
                <strong style={{ fontSize: '0.775rem', color: '#0369A1', display: 'block' }}>Hydration Care</strong>
                <span style={{ fontSize: '0.7rem', color: '#0284C7' }}>Warm herbal tea</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai',
      title: t('onboarding.askTitle', 'Ask Bolo Sakhi Anything'),
      desc: t('onboarding.askSub', 'Your compassionate 24/7 AI health assistant is always here for private advice.'),
      accentColor: '#6C5CE7',
      renderVisual: () => (
        <div 
          style={{
            width: '100%',
            backgroundColor: '#F5F3FF',
            borderRadius: '24px',
            padding: '20px 16px',
            border: '1.5px solid #DDD6FE',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {/* Chat Preview Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '10px 14px', alignSelf: 'flex-end', maxWidth: '85%', boxShadow: '0 2px 8px rgba(108, 92, 231, 0.08)', border: '1px solid #E0E7FF' }}>
            <p style={{ margin: 0, fontSize: '0.775rem', color: '#374151', textAlign: 'right' }}>
              "How can I soothe period cramps naturally?" 🌸
            </p>
          </div>

          <div style={{ backgroundColor: '#EEF2FF', borderRadius: '14px', padding: '10px 14px', alignSelf: 'flex-start', maxWidth: '90%', border: '1px solid #C7D2FE' }}>
            <p style={{ margin: 0, fontSize: '0.775rem', color: '#3730A3', fontWeight: '500', textAlign: 'left', lineHeight: 1.4 }}>
              <strong>🤖 Bolo Sakhi:</strong> Try warm chamomile tea, pelvic stretches, and a heating pad 🍵✨
            </p>
          </div>
        </div>
      )
    }
  ];

  const current = slides[step];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(38, 20, 28, 0.65)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Visual Guide Onboarding"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#FFFFFF',
          borderRadius: '32px',
          boxShadow: '0 24px 60px rgba(62, 36, 43, 0.3), 0 0 0 1px rgba(250, 212, 222, 0.6)',
          padding: '32px 28px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFF0F4',
            border: '1px solid #FAD4DE',
            color: '#7D626C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          aria-label="Close onboarding guide"
        >
          <X size={18} />
        </button>

        {/* Visual Graphic Banner */}
        <div style={{ width: '100%', marginBottom: '20px' }}>
          {current.renderVisual()}
        </div>

        {/* Slide Title */}
        <h3
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '1.5rem',
            color: '#271724',
            fontWeight: '700',
            marginBottom: '8px',
            lineHeight: 1.25
          }}
        >
          {current.title}
        </h3>

        {/* Slide Description */}
        <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '24px', maxWidth: '380px' }}>
          {current.desc}
        </p>

        {/* Step Indicator Progress Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === step ? '28px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: idx === step ? current.accentColor : '#E5E7EB',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '9999px',
              backgroundColor: '#FFF0F4',
              color: '#B9345D',
              border: '1px solid #FAD4DE',
              fontWeight: '700',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
          >
            {t('onboarding.skip', 'Skip Guide')}
          </button>

          <button
            type="button"
            onClick={handleNext}
            style={{
              flex: 1.2,
              padding: '12px 20px',
              borderRadius: '9999px',
              backgroundColor: current.accentColor,
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: `0 4px 14px ${current.accentColor}40`,
              transition: 'transform 0.15s ease'
            }}
          >
            {step === slides.length - 1 ? (
              <>
                {t('onboarding.start', 'Start Exploring')} <CheckCircle2 size={16} />
              </>
            ) : (
              <>
                Next <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
