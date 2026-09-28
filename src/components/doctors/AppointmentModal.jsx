import React, { useState } from 'react';
import Button from '../Button/Button';
import { X, Calendar, Clock, CheckCircle2, User, Phone } from 'lucide-react';

export default function AppointmentModal({ doctor, onClose }) {
  const [step, setStep] = useState(1); // 1: Date & Time, 2: Patient Info, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('Sakhi User');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');

  if (!doctor) return null;

  const times = ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  const handleConfirm = (e) => {
    e.preventDefault();
    setStep(3);
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

        {step === 3 ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={56} color="var(--success)" style={{ margin: '0 auto 16px auto' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--rose-dark)', marginBottom: '8px' }}>
              Appointment Requested!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '20px', lineHeight: '1.6' }}>
              Your appointment request with <strong>{doctor.name}</strong> for <strong>{selectedDate} at {selectedTime}</strong> has been logged.
            </p>
            <div style={{ backgroundColor: 'var(--surface-soft)', padding: '14px', borderRadius: 'var(--radius-md)', fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              *Demo record created. In production, SMS/WhatsApp confirmation will be sent directly from {doctor.hospital}.
            </div>
            <Button variant="primary" onClick={onClose} fullWidth>
              Done
            </Button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px' }}>
              <img src={doctor.image} alt={doctor.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--rose-dark)' }}>
                  {doctor.name}
                </h3>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  {doctor.specialty} • {doctor.price}
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                  Select Available Time Slot
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${selectedTime === t ? 'var(--rose)' : 'var(--border)'}`,
                        backgroundColor: selectedTime === t ? 'var(--pink-primary)' : 'var(--surface-soft)',
                        color: selectedTime === t ? 'var(--rose-dark)' : 'var(--text-secondary)',
                        fontWeight: selectedTime === t ? '700' : '400',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  Patient Full Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Confirm Appointment
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
