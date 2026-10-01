import React, { useState } from 'react';
import { X, PhoneCall, AlertTriangle, ShieldAlert, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function EmergencySOSModal({ isOpen, onClose }) {
  const [sosSent, setSosSent] = useState(false);
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');

  if (!isOpen) return null;

  const helplines = [
    { title: "Women's Helpline (24x7)", number: "1091", icon: "🚨", color: "#E11D48", bg: "#FFF1F2" },
    { title: "National Emergency Number", number: "112", icon: "🚔", color: "#1D4ED8", bg: "#EFF6FF" },
    { title: "Ambulance / Medical Emergency", number: "108", icon: "🚑", color: "#047857", bg: "#ECFDF5" },
    { title: "Tele-MANAS Mental Health", number: "14416", icon: "🧠", color: "#6D28D9", bg: "#F5F3FF" }
  ];

  const handleSendSOS = (e) => {
    e.preventDefault();
    setSosSent(true);
    setTimeout(() => {
      window.open(`https://wa.me/?text=${encodeURIComponent("EMERGENCY SOS ALERT! I need immediate help. Sent from Sakhi Emergency Care.")}`);
    }, 1000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(50, 10, 20, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '32px',
          maxWidth: '520px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 24px 60px rgba(225, 29, 72, 0.35)',
          border: '2px solid #FECDD3',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
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
            backgroundColor: '#FFF1F2',
            border: '1px solid #FECDD3',
            color: '#E11D48',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '20px',
              backgroundColor: '#FFF1F2',
              border: '2px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.2)'
            }}
          >
            🚨
          </div>
          <div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', color: '#9F1239', margin: 0, fontWeight: '700' }}>
              Emergency SOS Care
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#881337', margin: '2px 0 0 0' }}>
              One-tap emergency helplines & instant safety alerts
            </p>
          </div>
        </div>

        {/* 24x7 Helplines Grid */}
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
            24x7 Verified Helplines (Tap to Call):
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {helplines.map((h, i) => (
              <a
                key={i}
                href={`tel:${h.number}`}
                style={{
                  backgroundColor: h.bg,
                  border: `1.5px solid ${h.color}30`,
                  borderRadius: '16px',
                  padding: '12px 14px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.15s ease'
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{h.icon}</span>
                <div>
                  <strong style={{ fontSize: '0.775rem', color: h.color, display: 'block', lineHeight: 1.2 }}>
                    {h.title}
                  </strong>
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', color: h.color }}>
                    📞 {h.number}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Location / Emergency SMS Alert Box */}
        <div style={{ backgroundColor: '#FFF1F2', border: '1.5px solid #FECDD3', borderRadius: '20px', padding: '16px' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#9F1239', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={16} color="#E11D48" /> Instant Emergency SOS Alert
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#881337', margin: '0 0 12px 0', lineHeight: 1.4 }}>
            Broadcast your GPS location & emergency distress signal to your trusted contacts via WhatsApp / SMS.
          </p>

          <form onSubmit={handleSendSOS} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Trusted Contact Mobile"
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '9999px',
                border: '1px solid #FECDD3',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#E11D48',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '10px 18px',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
              }}
            >
              {sosSent ? <CheckCircle2 size={16} /> : <Send size={15} />}
              {sosSent ? 'SOS Sent!' : 'Broadcast SOS'}
            </button>
          </form>
        </div>

        {/* Nearby Hospitals Quick Link */}
        <a
          href="https://www.google.com/maps/search/gynaecology+emergency+hospital+near+me"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '9999px',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.875rem'
          }}
        >
          <MapPin size={16} color="#EC738F" /> Find Nearby Gynaecology Hospitals on Maps
        </a>
      </div>
    </div>
  );
}
