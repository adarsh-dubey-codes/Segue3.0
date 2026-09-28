import React, { useState } from 'react';
import { doctorsDirectoryData } from '../../data/doctorsData';
import AppointmentModal from '../../components/doctors/AppointmentModal';
import Button from '../../components/Button/Button';
import { Search, Stethoscope, Star, Phone, MessageCircle, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const cities = ['All', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune'];

  const filteredDoctors = doctorsDirectoryData.filter((doc) => {
    const matchesCity = selectedCity === 'All' || doc.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesOnline = !onlineOnly || doc.onlineConsultation;
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.languages.some((l) => l.toLowerCase().includes(search.toLowerCase()));

    return matchesCity && matchesOnline && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
          24/7 Gynaecologist Directory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Find trusted, non-judgmental gynaecologists and reproductive specialists.
        </p>
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCity(c)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${selectedCity === c ? 'var(--rose)' : 'var(--border)'}`,
                backgroundColor: selectedCity === c ? 'var(--rose-dark)' : '#FFFFFF',
                color: selectedCity === c ? '#FFFFFF' : 'var(--text-primary)',
                fontWeight: selectedCity === c ? '700' : '500',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {c}
            </button>
          ))}

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', marginLeft: '12px' }}>
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
              style={{ accentColor: 'var(--rose)' }}
            />
            <span>Online Consult Available</span>
          </label>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* DOCTORS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              flexWrap: 'wrap'
            }}
          >
            <img 
              src={doc.image} 
              alt={doc.name} 
              style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--rose)' }}
            />

            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--rose-dark)' }}>
                    {doc.name}
                  </h3>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--rose)' }}>
                    {doc.specialty} • {doc.experience}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFF9E6', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid #FFEAA7' }}>
                  <Star size={14} fill="#FDCB6E" color="#FDCB6E" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#D63031' }}>{doc.rating}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({doc.reviewsCount})</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '8px 0', lineHeight: '1.5' }}>
                {doc.qualifications} — {doc.hospital}, {doc.city}
              </p>

              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                {doc.bio}
              </p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                <span>Languages: <strong>{doc.languages.join(', ')}</strong></span>
                <span>Fee: <strong>{doc.price}</strong></span>
                {doc.onlineConsultation && (
                  <span style={{ color: 'var(--success)', fontWeight: '600' }}>✓ Online Consult Ready</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
              <Button variant="primary" onClick={() => setSelectedDoctor(doc)} icon={<Calendar size={16} />}>
                Book Appointment
              </Button>
              <a
                href={`https://wa.me/${doc.whatsapp}?text=Hello%20${encodeURIComponent(doc.name)},%20I%20found%20your%20profile%20on%20Sakhi%20Cycle.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#E8F5E9',
                  color: '#2E7D32',
                  border: '1px solid #C8E6C9',
                  textDecoration: 'none',
                  fontSize: '0.825rem',
                  fontWeight: '600'
                }}
              >
                <MessageCircle size={16} /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        ))}
      </div>

      <AppointmentModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </div>
  );
}
