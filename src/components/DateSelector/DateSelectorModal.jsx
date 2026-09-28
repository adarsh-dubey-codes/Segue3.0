import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import Button from '../Button/Button';
import { X, Calendar as CalendarIcon } from 'lucide-react';

export default function DateSelectorModal({ isOpen, onClose, onSaveDate, initialDate }) {
  const [tempDate, setTempDate] = useState(initialDate ? new Date(initialDate) : new Date());

  if (!isOpen) return null;

  const handleQuickSelect = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    setTempDate(d);
  };

  const handleConfirm = () => {
    onSaveDate(tempDate);
    onClose();
  };

  const formatDateDisplay = (dateObj) => {
    if (!dateObj) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj);
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
        backgroundColor: 'rgba(53, 38, 46, 0.4)',
        backdropFilter: 'blur(4px)',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
          position: 'relative',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <CalendarIcon size={20} color="var(--rose-accent)" />
          <h2 
            id="modal-title"
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.5rem', 
              color: 'var(--deep-plum)',
              fontWeight: '600' 
            }}
          >
            Mark Period Start
          </h2>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          When did your most recent period begin?
        </p>

        {/* Quick select pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleQuickSelect(0)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--soft-pink)',
              color: 'var(--deep-plum)',
              fontSize: '0.825rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect(1)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              cursor: 'pointer'
            }}
          >
            Yesterday
          </button>
          <button
            type="button"
            onClick={() => handleQuickSelect(3)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              cursor: 'pointer'
            }}
          >
            3 days ago
          </button>
        </div>

        {/* Calendar Picker */}
        <div style={{ marginBottom: '24px' }}>
          <Calendar selectedDate={tempDate} onSelectDate={(d) => setTempDate(d)} />
        </div>

        {/* Selection summary & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Selected: </span>
            <strong style={{ color: 'var(--deep-plum)' }}>{formatDateDisplay(tempDate)}</strong>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Save Date
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
