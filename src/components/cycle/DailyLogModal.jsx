import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../Button/Button';
import VisualMoodSelector from './VisualMoodSelector';
import VisualFlowSelector from './VisualFlowSelector';
import VisualEnergySelector from './VisualEnergySelector';
import { X, Check } from 'lucide-react';

export default function DailyLogModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { addDailyLog } = useCycle();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('happy');
  const [energy, setEnergy] = useState('normal');
  const [flow, setFlow] = useState('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Cramps']);
  const [sleep, setSleep] = useState(8);
  const [water, setWater] = useState(6);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const symptomList = [
    'Cramps 🩸', 'Headache 🤕', 'Bloating 🎈', 'Fatigue 😴', 'Acne ✨',
    'Tender breasts 🌸', 'Back pain 🧘', 'Cravings 🍎', 'Nausea 🍵'
  ];

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    addDailyLog({
      date,
      mood,
      energy,
      flow,
      symptoms: selectedSymptoms,
      sleep: Number(sleep),
      water: Number(water),
      notes
    });
    onClose();
  };

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
          borderRadius: '24px',
          width: '100%',
          maxWidth: '540px',
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
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px'
          }}
          aria-label={t('accessibility.closeMenu')}
        >
          <X size={22} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--rose-dark)', marginBottom: '4px' }}>
            {t('cyclePage.logModalTitle')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t('onboarding.feelSub')}
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Date Picker */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              {t('doctorsPage.selectDate')}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Visual Mood Selector */}
          <VisualMoodSelector value={mood} onChange={setMood} />

          {/* Visual Flow Selector */}
          <VisualFlowSelector value={flow} onChange={setFlow} />

          {/* Visual Energy Selector */}
          <VisualEnergySelector value={energy} onChange={setEnergy} />

          {/* Symptoms */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              {t('feature.mood.title')}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {symptomList.map((sym) => {
                const active = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid ${active ? 'var(--rose)' : 'var(--border)'}`,
                      backgroundColor: active ? 'var(--pink-primary)' : 'var(--surface-soft)',
                      color: active ? 'var(--rose-dark)' : 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: active ? '600' : '400',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {active && <Check size={14} />}
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sleep & Water inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                😴 {t('lifestylePage.sleepTitle')}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                💧 {t('feature.water.title')}
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              {t('forumPage.postContent')}
            </label>
            <textarea
              rows="3"
              placeholder={t('forumPage.contentPlaceholder')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <Button variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('cyclePage.saveLog')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
