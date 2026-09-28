import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import Button from '../Button/Button';
import { X, Heart, Droplets, Zap, Moon, Coffee, Sparkles, Check } from 'lucide-react';

export default function DailyLogModal({ isOpen, onClose }) {
  const { addDailyLog } = useCycle();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('Calm');
  const [energy, setEnergy] = useState(4);
  const [flow, setFlow] = useState('Medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Cramps']);
  const [sleep, setSleep] = useState(8);
  const [water, setWater] = useState(6);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const moodOptions = ['Happy', 'Calm', 'Sad', 'Anxious', 'Irritable', 'Energetic'];
  const flowOptions = ['Spotting', 'Light', 'Medium', 'Heavy'];
  const symptomList = [
    'Cramps', 'Headache', 'Bloating', 'Fatigue', 'Acne',
    'Tender breasts', 'Back pain', 'Cravings', 'Nausea', 'Dizziness', 'Insomnia'
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
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
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
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', color: 'var(--rose-dark)' }}>
            Log Today's Care
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Record how your body and mind are feeling today.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Date Picker */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Mood Selection */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Mood
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {moodOptions.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${mood === m ? 'var(--rose)' : 'var(--border)'}`,
                    backgroundColor: mood === m ? 'var(--pink-soft)' : 'var(--surface-soft)',
                    color: mood === m ? 'var(--rose-dark)' : 'var(--text-secondary)',
                    fontWeight: mood === m ? '600' : '400',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Flow Intensity */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Period Flow
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {flowOptions.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFlow(f)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${flow === f ? 'var(--rose)' : 'var(--border)'}`,
                    backgroundColor: flow === f ? 'var(--pink-primary)' : '#FFFFFF',
                    color: flow === f ? 'var(--rose-dark)' : 'var(--text-secondary)',
                    fontWeight: flow === f ? '600' : '400',
                    fontSize: '0.825rem',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Scale 1-5 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Energy Level
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--rose)' }}>{energy} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--rose)' }}
            />
          </div>

          {/* Symptoms Checkboxes */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Symptoms
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {symptomList.map((sym) => {
                const active = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid ${active ? 'var(--rose)' : 'var(--border)'}`,
                      backgroundColor: active ? 'var(--pink-primary)' : 'var(--surface-soft)',
                      color: active ? 'var(--rose-dark)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {active && <Check size={12} />}
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sleep & Water inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                Sleep (Hours)
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                Water (Cups)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              Personal Notes
            </label>
            <textarea
              rows="3"
              placeholder="How did you feel today? Any special thoughts..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Log Entry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
