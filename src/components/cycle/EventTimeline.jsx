import React, { useState, useMemo } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { EVENT_CATEGORIES, getCategoryInfo } from '../../utils/cycleInsightEngine';
import EventComposerModal from './EventComposerModal';
import Button from '../Button/Button';
import { Plus, Search, Filter, Calendar, Edit2, Trash2, Clock, Sparkles } from 'lucide-react';

export default function EventTimeline({ onOpenComposer }) {
  const { t } = useLanguage();
  const { events, deleteEvent } = useCycle();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Category filter
      if (activeCategory !== 'all' && evt.category !== activeCategory) {
        return false;
      }
      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const titleMatch = evt.title?.toLowerCase().includes(query);
        const descMatch = evt.description?.toLowerCase().includes(query);
        const medMatch = evt.metadata?.medicationName?.toLowerCase().includes(query);
        return titleMatch || descMatch || medMatch;
      }
      return true;
    });
  }, [events, activeCategory, searchTerm]);

  // Group filtered events by date (sorted descending)
  const groupedEvents = useMemo(() => {
    const groups = {};
    const sorted = [...filteredEvents].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach((evt) => {
      if (!groups[evt.date]) groups[evt.date] = [];
      groups[evt.date].push(evt);
    });

    return groups;
  }, [filteredEvents]);

  const dateKeys = Object.keys(groupedEvents);

  const filterTabs = [
    { id: 'all', labelKey: 'common.all', defaultLabel: 'All Events', icon: '✦' },
    { id: 'health', labelKey: 'events.categories.health', defaultLabel: 'Health', icon: '🩺' },
    { id: 'medication', labelKey: 'events.categories.medication', defaultLabel: 'Medication', icon: '💊' },
    { id: 'symptoms', labelKey: 'events.categories.symptoms', defaultLabel: 'Symptoms', icon: '🩸' },
    { id: 'lifestyle', labelKey: 'events.categories.lifestyle', defaultLabel: 'Lifestyle', icon: '🏃' },
    { id: 'mental', labelKey: 'events.categories.stress', defaultLabel: 'Stress', icon: '🧠' },
    { id: 'reproductive', labelKey: 'events.categories.reproductive', defaultLabel: 'Cycle', icon: '🌸' },
    { id: 'personal', labelKey: 'events.categories.personal', defaultLabel: 'Personal', icon: '📝' }
  ];

  const handleDelete = (eventId) => {
    if (window.confirm(t('events.deleteConfirm', { defaultValue: 'Are you sure you want to delete this event from your cycle timeline?' }))) {
      deleteEvent(eventId);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #FAD4DE',
        boxShadow: '0 8px 24px rgba(236, 115, 143, 0.06)',
        padding: '24px 28px'
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: '700',
              color: '#3E242B',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{t('events.timelineTitle', { defaultValue: 'Personal Cycle Timeline' })}</span>
            <span style={{ fontSize: '0.8rem', backgroundColor: '#FFEBF0', color: '#EC738F', padding: '2px 10px', borderRadius: '9999px', fontWeight: '600' }}>
              {events.length} {t('events.loggedCount', { defaultValue: 'logged' })}
            </span>
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#7D626C', margin: '4px 0 0 0' }}>
            {t('events.timelineSub', { defaultValue: 'Chronological timeline of events throughout your cycle' })}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => onOpenComposer && onOpenComposer()}
          icon={<Plus size={16} />}
          style={{ backgroundColor: '#EC738F', borderRadius: '9999px', padding: '10px 20px', fontSize: '0.875rem', boxShadow: '0 4px 14px rgba(236, 115, 143, 0.3)' }}
        >
          {t('events.addEventBtn', { defaultValue: '+ Add to my day' })}
        </Button>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FAFAFA',
            border: '1px solid #F0D5DD',
            borderRadius: '9999px',
            padding: '8px 16px',
            maxWidth: '360px'
          }}
        >
          <Search size={16} color="#7D626C" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder={t('events.searchPlaceholder', { defaultValue: 'Search timeline (e.g. fever, stress)...' })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.875rem',
              color: '#38232A',
              width: '100%'
            }}
          />
        </div>

        {/* Category Filter Chips */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none'
          }}
        >
          {filterTabs.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  backgroundColor: active ? '#EC738F' : '#FFF5F8',
                  color: active ? '#FFFFFF' : '#7D626C',
                  border: active ? '1px solid #EC738F' : '1px solid #FAD4DE',
                  borderRadius: '9999px',
                  padding: '7px 14px',
                  fontSize: '0.8rem',
                  fontWeight: active ? '600' : '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                <span>{tab.icon}</span>
                <span>{t(tab.labelKey, { defaultValue: tab.defaultLabel })}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Stream */}
      {dateKeys.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: '#FFF8F0',
            borderRadius: '20px',
            border: '1px dashed #FFE4C4'
          }}
        >
          <Sparkles size={28} color="#EC738F" style={{ marginBottom: '10px' }} />
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#3E242B', margin: '0 0 6px 0' }}>
            {t('events.emptyTitle', { defaultValue: 'No events logged in this view' })}
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#7D626C', maxWidth: '360px', margin: '0 auto 16px auto' }}>
            {t('events.emptySub', { defaultValue: 'Keep track of illness, sleep, stress, or medications throughout your cycle to build context.' })}
          </p>
          <Button
            variant="outline"
            onClick={() => onOpenComposer && onOpenComposer()}
            icon={<Plus size={16} />}
            style={{ borderRadius: '9999px' }}
          >
            {t('events.addEventBtn', { defaultValue: '+ Add to my day' })}
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
          {/* Vertical Timeline Guide Line */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              bottom: '12px',
              left: '19px',
              width: '2px',
              backgroundColor: '#FAD4DE',
              zIndex: 0
            }}
          />

          {dateKeys.map((dateStr) => {
            const dateObj = new Date(dateStr + 'T00:00:00');
            const formattedDate = dateObj.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            });
            const dayEvents = groupedEvents[dateStr];

            return (
              <div key={dateStr} style={{ position: 'relative', zIndex: 1, paddingLeft: '44px' }}>
                {/* Date Badge Indicator on Timeline Node */}
                <div
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#EC738F',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 2px 6px rgba(236, 115, 143, 0.4)'
                  }}
                />

                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: '700', color: '#3E242B' }}>
                    {formattedDate}
                  </span>
                </div>

                {/* Events list on this date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {dayEvents.map((evt) => {
                    const catObj = getCategoryInfo(evt.category);
                    return (
                      <div
                        key={evt.id}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: `1px solid ${catObj.color}25`,
                          borderRadius: '16px',
                          padding: '14px 18px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span
                              style={{
                                fontSize: '1.2rem',
                                padding: '6px 10px',
                                borderRadius: '12px',
                                backgroundColor: catObj.bgColor
                              }}
                            >
                              {catObj.icon}
                            </span>
                            <div>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38232A', margin: 0 }}>
                                {evt.title}
                              </h4>
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  fontWeight: '600',
                                  color: catObj.color,
                                  backgroundColor: catObj.bgColor,
                                  padding: '2px 8px',
                                  borderRadius: '9999px',
                                  display: 'inline-block',
                                  marginTop: '2px'
                                }}
                              >
                                {t(catObj.labelKey, { defaultValue: catObj.id })}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => setEditingEvent(evt)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '6px',
                                color: '#7D626C',
                                cursor: 'pointer',
                                borderRadius: '50%'
                              }}
                              title={t('common.edit', { defaultValue: 'Edit' })}
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(evt.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '6px',
                                color: '#E11D48',
                                cursor: 'pointer',
                                borderRadius: '50%'
                              }}
                              title={t('common.delete', { defaultValue: 'Delete' })}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {evt.description && (
                          <p style={{ fontSize: '0.85rem', color: '#5C434B', margin: 0, lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                            {evt.description}
                          </p>
                        )}

                        {evt.metadata && (evt.metadata.medicationName || evt.metadata.sleepHours) && (
                          <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', marginTop: '2px' }}>
                            {evt.metadata.medicationName && (
                              <span style={{ backgroundColor: '#F3E8FF', color: '#9333EA', padding: '2px 8px', borderRadius: '6px', fontWeight: '500' }}>
                                💊 Medication: {evt.metadata.medicationName}
                              </span>
                            )}
                            {evt.metadata.sleepHours && (
                              <span style={{ backgroundColor: '#DBEAFE', color: '#2563EB', padding: '2px 8px', borderRadius: '6px', fontWeight: '500' }}>
                                😴 Sleep: {evt.metadata.sleepHours} hrs
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <EventComposerModal
          isOpen={Boolean(editingEvent)}
          onClose={() => setEditingEvent(null)}
          initialDate={editingEvent.date}
          initialData={editingEvent}
        />
      )}
    </div>
  );
}
