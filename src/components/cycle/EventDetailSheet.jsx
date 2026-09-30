import React, { useState } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryInfo } from '../../utils/cycleInsightEngine';
import EventComposerModal from './EventComposerModal';
import Button from '../Button/Button';
import { X, Edit2, Trash2, Plus, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function EventDetailSheet({ isOpen, onClose, dateStr, eventsList = [], onAddNewEvent }) {
  const { t } = useLanguage();
  const { deleteEvent } = useCycle();

  const [editingEvent, setEditingEvent] = useState(null);

  if (!isOpen) return null;

  const formattedDate = dateStr
    ? new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  const handleDelete = (eventId) => {
    if (window.confirm(t('events.deleteConfirm', { defaultValue: 'Are you sure you want to delete this event from your cycle timeline?' }))) {
      deleteEvent(eventId);
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(40, 24, 32, 0.45)',
          backdropFilter: 'blur(4px)',
          padding: '16px',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            border: '1px solid #FAD4DE',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#7D626C',
              cursor: 'pointer',
              padding: '4px'
            }}
            aria-label={t('common.close', { defaultValue: 'Close' })}
          >
            <X size={20} />
          </button>

          {/* Date Header */}
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFE5EC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EC738F'
              }}
            >
              <Calendar size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#3E242B', margin: 0, fontWeight: '700' }}>
                {formattedDate}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#7D626C', margin: '2px 0 0 0' }}>
                {eventsList.length === 1
                  ? t('events.oneEventLogged', { defaultValue: '1 event logged' })
                  : t('events.countEventsLogged', { defaultValue: `${eventsList.length} events logged`, count: eventsList.length })}
              </p>
            </div>
          </div>

          {/* List of Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {eventsList.length === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: '#FFF5F8',
                  borderRadius: '16px',
                  border: '1px dashed #FAD4DE',
                  color: '#7D626C',
                  fontSize: '0.9rem'
                }}
              >
                <p>{t('events.noEventsDate', { defaultValue: 'No context events recorded on this date.' })}</p>
              </div>
            ) : (
              eventsList.map((evt) => {
                const catObj = getCategoryInfo(evt.category);
                return (
                  <div
                    key={evt.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: `1px solid ${catObj.color}30`,
                      padding: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            fontSize: '1.25rem',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            backgroundColor: catObj.bgColor
                          }}
                        >
                          {catObj.icon}
                        </span>
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#38232A', margin: 0 }}>
                            {evt.title}
                          </h4>
                          <span
                            style={{
                              fontSize: '0.725rem',
                              fontWeight: '600',
                              color: catObj.color,
                              backgroundColor: catObj.bgColor,
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              display: 'inline-block',
                              marginTop: '3px'
                            }}
                          >
                            {t(catObj.labelKey, { defaultValue: catObj.id })}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', items: 'center', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => setEditingEvent(evt)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '6px',
                            borderRadius: '50%',
                            color: '#7D626C',
                            cursor: 'pointer'
                          }}
                          title={t('common.edit', { defaultValue: 'Edit' })}
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(evt.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '6px',
                            borderRadius: '50%',
                            color: '#E11D48',
                            cursor: 'pointer'
                          }}
                          title={t('common.delete', { defaultValue: 'Delete' })}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Event Description / Note */}
                    {evt.description && (
                      <div
                        style={{
                          backgroundColor: '#FAFAFA',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          fontSize: '0.85rem',
                          color: '#5C434B',
                          lineHeight: '1.5'
                        }}
                      >
                        {evt.description}
                      </div>
                    )}

                    {/* Metadata chips */}
                    {evt.metadata && (evt.metadata.medicationName || evt.metadata.sleepHours) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.75rem' }}>
                        {evt.metadata.medicationName && (
                          <span style={{ backgroundColor: '#F3E8FF', color: '#9333EA', padding: '3px 8px', borderRadius: '6px', fontWeight: '500' }}>
                            💊 {evt.metadata.medicationName}
                          </span>
                        )}
                        {evt.metadata.sleepHours && (
                          <span style={{ backgroundColor: '#DBEAFE', color: '#2563EB', padding: '3px 8px', borderRadius: '6px', fontWeight: '500' }}>
                            😴 {evt.metadata.sleepHours} hrs sleep
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Add Another Event Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outline"
              onClick={() => {
                onClose();
                if (onAddNewEvent) onAddNewEvent(dateStr);
              }}
              icon={<Plus size={16} />}
              style={{ width: '100%', justifyContent: 'center', borderRadius: '9999px', padding: '10px 20px' }}
            >
              {t('events.addAnotherToDate', { defaultValue: '+ Add event to this day' })}
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <EventComposerModal
          isOpen={Boolean(editingEvent)}
          onClose={() => setEditingEvent(null)}
          initialDate={editingEvent.date}
          initialData={editingEvent}
        />
      )}
    </>
  );
}
