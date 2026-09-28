import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import Button from '../Button/Button';
import { X, Download, Upload, Settings } from 'lucide-react';

export default function CycleSetupModal({ isOpen, onClose }) {
  const { cycleSetup, updateCycleSetup, exportCycleData, importCycleData } = useCycle();

  const [nickname, setNickname] = useState(cycleSetup.nickname || 'Beautiful');
  const [periodStartDate, setPeriodStartDate] = useState(
    cycleSetup.periodStartDate ? cycleSetup.periodStartDate.split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [cycleLength, setCycleLength] = useState(cycleSetup.cycleLength || 28);
  const [periodLength, setPeriodLength] = useState(cycleSetup.periodLength || 5);
  const [city, setCity] = useState(cycleSetup.city || 'Mumbai');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCycleSetup({
      nickname,
      periodStartDate: new Date(periodStartDate).toISOString(),
      cycleLength: Number(cycleLength),
      periodLength: Number(periodLength),
      city
    });
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importCycleData(event.target.result);
      if (success) {
        alert('Cycle data imported successfully!');
        onClose();
      } else {
        alert('Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
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
          maxWidth: '480px',
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
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Settings size={20} color="var(--rose)" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--rose-dark)' }}>
            Cycle Configuration
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '20px' }}>
          Set your average cycle length and recent period start date.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              Your Preferred Name / Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              First Day of Most Recent Period
            </label>
            <input
              type="date"
              value={periodStartDate}
              onChange={(e) => setPeriodStartDate(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                Average Cycle Length (Days)
              </label>
              <input
                type="number"
                min="20"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                Period Length (Days)
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              City (For Doctor Directory)
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
            />
          </div>

          {/* Backup Data Actions */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '6px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Data Backup & Privacy
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button type="button" variant="outline" onClick={exportCycleData} icon={<Download size={14} />} style={{ flex: 1, fontSize: '0.8rem', padding: '6px' }}>
                Export Data
              </Button>
              <label style={{ flex: 1, cursor: 'pointer' }}>
                <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                <div className="sakhi-btn sakhi-btn-outline" style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <Upload size={14} /> Import Data
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
