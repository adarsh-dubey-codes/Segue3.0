import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../Button/Button';
import { X, Heart, Sparkles, Moon, Sun, ShieldCheck } from 'lucide-react';

export default function PhaseDetailModal({ isOpen, onClose }) {
  const { currentPhase, currentCycleDay, cycleSetup } = useCycle();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const totalDays = Number(cycleSetup?.cycleLength) || 28;

  const phaseData = {
    menstrual: {
      title: 'Menstrual Phase 🩸',
      duration: 'Days 1 - 5',
      summary: 'Your body is shedding the uterine lining. Hormone levels (estrogen & progesterone) are low.',
      tips: [
        'Prioritize rest, warm tea, and gentle lower-back stretches.',
        'Eat iron-rich foods (spinach, lentils, dark chocolate) & stay hydrated.',
        'Use heating pads for lower belly cramp relief.'
      ]
    },
    period: {
      title: 'Menstrual Phase 🩸',
      duration: 'Days 1 - 5',
      summary: 'Your body is shedding the uterine lining. Hormone levels (estrogen & progesterone) are low.',
      tips: [
        'Prioritize rest, warm tea, and gentle lower-back stretches.',
        'Eat iron-rich foods (spinach, lentils, dark chocolate) & stay hydrated.',
        'Use heating pads for lower belly cramp relief.'
      ]
    },
    follicular: {
      title: 'Follicular Phase 🌱',
      duration: 'Days 6 - 13',
      summary: 'Estrogen is rising! Follicle-stimulating hormone (FSH) prompts ovaries to prepare a mature egg.',
      tips: [
        'Energy & mental clarity increase — great time for new goals.',
        'Incorporate vibrant fresh vegetables, fermented foods & lean protein.',
        'Engage in cardio workouts and creative planning.'
      ]
    },
    ovulation: {
      title: 'Ovulation Phase ☀️',
      duration: 'Days 14 - 16',
      summary: 'Peak fertility window! Luteinizing hormone (LH) triggers egg release.',
      tips: [
        'Highest energy, confidence & social communication.',
        'Hydrate well & eat anti-inflammatory foods (berries, seeds).',
        'Ideal time for high-intensity training or heavy work projects.'
      ]
    },
    luteal: {
      title: 'Luteal Phase 🌙',
      duration: 'Days 17 - 28',
      summary: 'Progesterone rises to prepare womb lining. If unfertilized, hormone levels drop near Day 28.',
      tips: [
        'Slow down, prioritize 8 hours of sleep.',
        'Eat complex carbohydrates (sweet potatoes, oats) to combat cravings.',
        'Practice guided breathwork & gentle yoga for mood stability.'
      ]
    }
  };

  const current = phaseData[currentPhase?.toLowerCase()] || phaseData.menstrual;

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
          borderRadius: '28px',
          width: '100%',
          maxWidth: '520px',
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
        >
          <X size={22} />
        </button>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: '#FFE5EC', color: '#EC738F', fontSize: '0.775rem', fontWeight: '700', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Cycle Day {currentCycleDay} of {totalDays}</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'var(--rose-dark)', margin: '0 0 4px 0' }}>
          {current.title}
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '16px' }}>
          {current.duration}
        </span>

        <p style={{ color: 'var(--text-primary)', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '24px', backgroundColor: 'var(--surface-soft)', padding: '16px', borderRadius: '16px' }}>
          {current.summary}
        </p>

        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--rose-dark)', marginBottom: '12px' }}>
          Recommended Self-Care Tips:
        </h4>
        <ul style={{ paddingLeft: '20px', margin: '0 0 24px 0', color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: '1.7' }}>
          {current.tips.map((tip, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>{tip}</li>
          ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={onClose} style={{ borderRadius: 'var(--radius-full)' }}>
            Got It ♡
          </Button>
        </div>
      </div>
    </div>
  );
}
