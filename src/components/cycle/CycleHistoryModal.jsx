import React from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryInfo } from '../../utils/cycleInsightEngine';
import { X, Calendar, Clock, History, ChevronRight, Activity } from 'lucide-react';
import Button from '../Button/Button';

export default function CycleHistoryModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { cycleSetup, dailyLogs, events } = useCycle();

  if (!isOpen) return null;

  const cycleLen = Number(cycleSetup?.cycleLength) || 28;
  const periodLen = Number(cycleSetup?.periodLength) || 5;

  const totalLogsCount = dailyLogs.length;
  const totalEventsCount = events.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
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
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.14)',
          border: '1px solid #FAD4DE',
          position: 'relative'
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

        {/* Header */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFEBF0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EC738F'
            }}
          >
            <History size={22} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#3E242B', margin: 0, fontWeight: '700' }}>
              {t('pattern.historyTitle', { defaultValue: 'Your Cycle History & Pattern' })}
            </h2>
            <p style={{ color: '#7D626C', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
              {t('pattern.historySub', { defaultValue: 'Summary of established baseline and logged cycle variations' })}
            </p>
          </div>
        </div>

        {/* Established Baseline Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#FFF0F4', borderRadius: '16px', padding: '14px', border: '1px solid #FAD4DE' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#7D626C', textTransform: 'uppercase' }}>
              {t('pattern.avgLength', { defaultValue: 'Average Cycle' })}
            </span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '800', color: '#EC738F', margin: '4px 0 0 0' }}>
              {cycleLen} {t('common.days', { defaultValue: 'days' })}
            </p>
          </div>

          <div style={{ backgroundColor: '#FFF0F4', borderRadius: '16px', padding: '14px', border: '1px solid #FAD4DE' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#7D626C', textTransform: 'uppercase' }}>
              {t('pattern.periodLength', { defaultValue: 'Period Duration' })}
            </span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '800', color: '#D9486D', margin: '4px 0 0 0' }}>
              {periodLen} {t('common.days', { defaultValue: 'days' })}
            </p>
          </div>

          <div style={{ backgroundColor: '#FFF0F4', borderRadius: '16px', padding: '14px', border: '1px solid #FAD4DE' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#7D626C', textTransform: 'uppercase' }}>
              {t('pattern.eventsLogged', { defaultValue: 'Context Events' })}
            </span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '800', color: '#9333EA', margin: '4px 0 0 0' }}>
              {totalEventsCount}
            </p>
          </div>
        </div>

        {/* Historical Context Stream */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#3E242B', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {t('pattern.recentLoggedContext', { defaultValue: 'Logged Context History:' })}
          </h4>

          {events.length === 0 ? (
            <div style={{ padding: '16px', backgroundColor: '#FAFAFA', borderRadius: '12px', fontSize: '0.85rem', color: '#7D626C', textStyle: 'italic' }}>
              {t('pattern.noHistoryEvents', { defaultValue: 'No context events logged yet.' })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {events.slice(0, 6).map((evt) => {
                const catObj = getCategoryInfo(evt.category);
                return (
                  <div
                    key={evt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#FFF5F8',
                      border: '1px solid #FAD4DE',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>{catObj.icon}</span>
                      <div>
                        <span style={{ fontWeight: '700', color: '#38232A' }}>{evt.title}</span>
                        {evt.description && (
                          <p style={{ fontSize: '0.775rem', color: '#7D626C', margin: '2px 0 0 0' }}>
                            {evt.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#9E828C', fontWeight: '500' }}>{evt.date}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Disclaimer */}
        <div style={{ backgroundColor: '#FFF8F0', border: '1px solid #FFE4C4', borderRadius: '14px', padding: '12px 16px', fontSize: '0.825rem', color: '#8A5A00', lineHeight: 1.45, marginBottom: '20px' }}>
          💡 {t('pattern.historyDisclaimer', { defaultValue: 'Tracking your cycle history helps Sakhi observe your usual range. Occasional variation is common, while repeated pattern changes are good to share with your gynaecologist.' })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={onClose} style={{ borderRadius: '9999px', padding: '8px 20px' }}>
            {t('common.close', { defaultValue: 'Close' })}
          </Button>
        </div>
      </div>
    </div>
  );
}
