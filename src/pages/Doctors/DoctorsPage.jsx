import React, { useState } from 'react';
import { doctorsDirectoryData } from '../../data/doctorsData';
import AppointmentModal from '../../components/doctors/AppointmentModal';
import { useTranslation } from 'react-i18next';
import { 
  Search, Filter, Star, Phone, Navigation, Calendar, Video, 
  Building2, MapPin, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function DoctorsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('in_clinic'); // 'all', 'nearby', 'top_rated', 'female', 'online', 'in_clinic'
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filtersList = [
    { id: 'all', label: 'All Doctors', icon: null },
    { id: 'nearby', label: '📍 Nearby (≤3km)', icon: null },
    { id: 'top_rated', label: '⭐ Top Rated (4.9+)', icon: null },
    { id: 'female', label: '👩‍⚕️ Female Doctors', icon: null },
    { id: 'online', label: '💻 Online Consult', icon: null },
    { id: 'in_clinic', label: '🏥 In-Clinic', icon: null },
  ];

  const filteredDoctors = doctorsDirectoryData.filter((doc) => {
    // Filter matching
    if (activeFilter === 'nearby') {
      const distNum = parseFloat(doc.distance);
      if (isNaN(distNum) || distNum > 3.0) return false;
    }
    if (activeFilter === 'top_rated' && doc.rating < 4.9) return false;
    if (activeFilter === 'female' && doc.gender !== 'female') return false;
    if (activeFilter === 'online' && !doc.onlineConsultation) return false;
    if (activeFilter === 'in_clinic' && !doc.inClinic) return false;

    // Search query matching
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpecialty = doc.specialty.toLowerCase().includes(q);
      const matchHospital = doc.hospital.toLowerCase().includes(q);
      const matchTags = doc.tags?.some(tag => tag.toLowerCase().includes(q));
      if (!matchName && !matchSpecialty && !matchHospital && !matchTags) {
        return false;
      }
    }

    return true;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 20px 80px 20px', fontFamily: 'var(--font-sans)' }}>
      
      {/* TOP SEARCH AND FILTER CARD */}
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1.5px solid #FDE8ED',
          padding: '24px 28px',
          boxShadow: '0 4px 25px rgba(244, 63, 94, 0.04)',
          marginBottom: '32px'
        }}
      >
        {/* Search Bar Input */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
          <Search size={20} color="#9CA3AF" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by doctor name, specialty, clinic, or symptom (e.g. PCOS, cramps)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 52px',
              borderRadius: '9999px',
              border: '1.5px solid #FDE8ED',
              backgroundColor: '#FFFFFF',
              fontSize: '0.925rem',
              color: '#374151',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
            }}
          />
        </div>

        {/* Filters Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
            <Filter size={15} color="#9CA3AF" />
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9CA3AF', letterSpacing: '0.05em' }}>
              FILTERS:
            </span>
          </div>

          {filtersList.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: isActive ? '1.5px solid #E11D48' : '1.5px solid #E5E7EB',
                  backgroundColor: isActive ? '#E11D48' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#374151',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  boxShadow: isActive ? '0 4px 12px rgba(225, 29, 72, 0.3)' : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* DOCTORS GRID */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))',
          gap: '24px'
        }}
      >
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid #FDE8ED',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(244, 63, 94, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative'
            }}
          >
            {/* Row 1: Avatar, Name, Rating & Info */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {/* Doctor Avatar with Active Pink Indicator */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  style={{ 
                    width: '84px', 
                    height: '84px', 
                    borderRadius: '22px', 
                    objectFit: 'cover', 
                    border: '2px solid #FFE4E6' 
                  }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '14px',
                    height: '14px',
                    backgroundColor: '#E11D48',
                    borderRadius: '50%',
                    border: '2.5px solid #FFFFFF'
                  }}
                />
              </div>

              {/* Doctor Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <h3 
                    style={{ 
                      fontFamily: 'Georgia, "Times New Roman", serif', 
                      fontSize: '1.4rem', 
                      fontWeight: '700', 
                      color: '#271724', 
                      margin: 0,
                      lineHeight: '1.25'
                    }}
                  >
                    {doc.name}
                  </h3>

                  {/* Rating Badge */}
                  <div 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      backgroundColor: '#FEF9C3', 
                      padding: '4px 10px', 
                      borderRadius: '9999px', 
                      border: '1px solid #FEF08A',
                      flexShrink: 0
                    }}
                  >
                    <Star size={13} fill="#CA8A04" color="#CA8A04" />
                    <span style={{ fontSize: '0.825rem', fontWeight: '800', color: '#854D0E' }}>{doc.rating}</span>
                    <span style={{ fontSize: '0.75rem', color: '#A16207' }}>({doc.reviewsCount})</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.875rem', fontWeight: '700', color: '#E11D48', margin: '4px 0 6px 0' }}>
                  {doc.specialty}
                </p>

                <p style={{ fontSize: '0.825rem', color: '#6B7280', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={14} color="#9CA3AF" />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {doc.hospital}
                  </span>
                </p>

                <p style={{ fontSize: '0.825rem', color: '#6B7280', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#E11D48" />
                  <span>
                    <strong>{doc.distance}</strong> &nbsp;·&nbsp; Fee: <strong style={{ color: '#1F2937' }}>{doc.price}</strong>
                  </span>
                </p>
              </div>
            </div>

            {/* Row 2: Availability Banner Box */}
            <div 
              style={{
                backgroundColor: '#FFF5F7',
                border: '1px solid #FFE4E6',
                borderRadius: '16px',
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Video size={16} color="#701A75" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#701A75' }}>
                  {doc.consultationType || 'Online & Clinic'}
                </span>
              </div>

              <div 
                style={{
                  backgroundColor: '#DCFCE7',
                  color: '#15803D',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '0.775rem',
                  fontWeight: '700'
                }}
              >
                Next: {doc.nextSlot || 'Today, 4:30 PM'}
              </div>
            </div>

            {/* Row 3: Specialty Tag Badges */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {doc.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#FFF1F2',
                    border: '1px solid #FFE4E6',
                    color: '#BE123C',
                    borderRadius: '9999px',
                    padding: '4px 14px',
                    fontSize: '0.775rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '10px' }}>🌸</span> {tag}
                </span>
              ))}
            </div>

            {/* Row 4: Action Buttons (Call, Directions, Book) */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1.2fr',
                gap: '10px',
                marginTop: '4px'
              }}
            >
              <a
                href={`tel:${doc.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFF1F2',
                  color: '#BE123C',
                  border: '1px solid #FFE4E6',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '700'
                }}
              >
                <Phone size={15} /> Call
              </a>

              <a
                href={doc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFF1F2',
                  color: '#BE123C',
                  border: '1px solid #FFE4E6',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '700'
                }}
              >
                <Navigation size={15} /> Directions
              </a>

              <button
                type="button"
                onClick={() => setSelectedDoctor(doc)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  backgroundColor: '#E11D48',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.35)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <Calendar size={15} /> Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #FDE8ED' }}>
          <p style={{ color: '#6B7280', fontSize: '1.1rem', marginBottom: '16px' }}>
            No gynecologists match your filter or search query.
          </p>
          <button
            type="button"
            onClick={() => { setActiveFilter('all'); setSearch(''); }}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Appointment Modal */}
      <AppointmentModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </div>
  );
}
