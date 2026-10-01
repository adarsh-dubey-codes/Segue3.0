import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCycle } from '../../context/CycleContext';
import { getCategoryInfo } from '../../utils/cycleInsightEngine';
import EventDetailSheet from '../cycle/EventDetailSheet';
import EventComposerModal from '../cycle/EventComposerModal';
import { ChevronLeft, ChevronRight, Check, Sun } from 'lucide-react';

const LOCALE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  or: 'or-IN',
  as: 'as-IN',
};

export default function Calendar({ selectedDate, onSelectDate, onOpenLog, onOpenComposer }) {
  const { t, language } = useLanguage();
  const { cycleSetup, getEventsForDate } = useCycle();
  const today = new Date();
  const getValidDate = (val) => {
    if (!val) return today;
    const d = val instanceof Date ? val : new Date(val);
    return isNaN(d.getTime()) ? today : d;
  };

  const [currentViewDate, setCurrentViewDate] = useState(() => getValidDate(selectedDate));
  const [activeDetailDate, setActiveDetailDate] = useState(null);
  const [composerDate, setComposerDate] = useState(null);
  const safeViewDate = getValidDate(currentViewDate);

  const year = safeViewDate.getFullYear();
  const month = safeViewDate.getMonth();

  const locale = LOCALE_MAP[language] || 'en-IN';

  // Format month name safely using Intl
  const monthName = (() => {
    try {
      return new Intl.DateTimeFormat(locale, { month: 'long' }).format(safeViewDate);
    } catch (e) {
      return safeViewDate.toLocaleString('default', { month: 'long' });
    }
  })();

  // Build localized short weekday names (Sun-Sat)
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    try {
      const d = new Date(2026, 2, 1 + i);
      return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d);
    } catch (e) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
    }
  });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cycleLen = Number(cycleSetup?.cycleLength) || 28;
  const periodLen = Number(cycleSetup?.periodLength) || 5;
  const startDate = getValidDate(cycleSetup?.periodStartDate);

  const prevMonth = () => {
    setCurrentViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentViewDate(new Date(year, month + 1, 1));
  };

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const sel = getValidDate(selectedDate);
    return (
      sel.getDate() === day &&
      sel.getMonth() === month &&
      sel.getFullYear() === year
    );
  };

  const getDayStatus = (day) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);

    const baseStart = getValidDate(startDate);
    baseStart.setHours(0, 0, 0, 0);

    const diffDays = Math.round((checkDate - baseStart) / (1000 * 60 * 60 * 24));
    
    let mod = diffDays % cycleLen;
    if (isNaN(mod)) mod = 0;
    if (mod < 0) mod += cycleLen;

    const isFlow = mod < periodLen && diffDays >= 0 && diffDays < cycleLen;
    const isPredictedNext = mod < periodLen && diffDays >= cycleLen;
    const ovulationCycleDay = Math.max(1, cycleLen - 14);
    const isOvulation = mod === (ovulationCycleDay - 1);
    const isFertile = mod >= (ovulationCycleDay - 4) && mod <= (ovulationCycleDay);

    return { isFlow, isPredictedNext, isOvulation, isFertile };
  };

  const handleDayClick = (day) => {
    const clickedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvts = getEventsForDate(clickedDateStr);

    if (onSelectDate) onSelectDate(new Date(year, month, day));

    // If day has logged events, open detail sheet
    if (dayEvts && dayEvts.length > 0) {
      setActiveDetailDate(clickedDateStr);
    } else if (onOpenLog) {
      onOpenLog();
    }
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const selected = isSelected(day);
    const todayDay = isToday(day);
    const { isFlow, isPredictedNext, isOvulation, isFertile } = getDayStatus(day);

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = getEventsForDate(dateStr);
    const eventCount = dayEvents ? dayEvents.length : 0;

    let bgColor = 'transparent';
    let textColor = 'var(--text-primary)';
    let borderStyle = 'none';

    if (selected) {
      bgColor = 'var(--rose-dark)';
      textColor = '#FFFFFF';
    } else if (isFlow) {
      bgColor = 'var(--rose-primary)';
      textColor = 'var(--rose-dark)';
    } else if (isPredictedNext) {
      bgColor = '#FFEBF0';
      borderStyle = '1px dashed var(--rose)';
      textColor = 'var(--rose-dark)';
    } else if (isOvulation) {
      bgColor = '#FFF9E6';
      textColor = '#D63031';
      borderStyle = '1px solid #FFEAA7';
    } else if (isFertile) {
      bgColor = '#F0F9F1';
      textColor = '#27AE60';
    }

    // Accessible description including events
    let ariaLabelStr = `${monthName} ${day}, ${year}`;
    if (eventCount > 0) {
      ariaLabelStr += `. ${eventCount} context event${eventCount > 1 ? 's' : ''} logged: ${dayEvents.map(e => e.title).join(', ')}`;
    }

    let animationStyle = 'none';
    if (todayDay && !selected) {
      animationStyle = 'calendarDayPulse 3.5s ease-in-out infinite';
    } else if (isFlow && !selected) {
      animationStyle = 'breatheScale 4.5s ease-in-out infinite';
    }

    calendarCells.push(
      <button
        key={`day-${day}`}
        type="button"
        onClick={() => handleDayClick(day)}
        aria-label={ariaLabelStr}
        className="btn-micro-hover"
        style={{
          aspectRatio: '1',
          border: borderStyle,
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: '0.875rem',
          fontWeight: selected || isFlow || isPredictedNext ? '700' : todayDay ? '600' : '400',
          color: textColor,
          backgroundColor: bgColor,
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          outline: 'none',
          boxShadow: selected ? '0 4px 14px rgba(236, 115, 143, 0.35)' : 'none',
          animation: animationStyle
        }}
      >
        <span>{day}</span>

        {/* Primary Ovulation / Today icons */}
        {isOvulation && !selected && (
          <Sun size={9} color="#F39C12" style={{ position: 'absolute', top: '2px' }} />
        )}

        {/* Event Indicators (Hierarchy: Period > Fertile > User Events) */}
        {eventCount > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px'
            }}
          >
            {eventCount <= 2 ? (
              dayEvents.map((evt) => {
                const catObj = getCategoryInfo(evt.category);
                return (
                  <span
                    key={evt.id}
                    title={evt.title}
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: selected ? '#FFFFFF' : catObj.color
                    }}
                  />
                );
              })
            ) : (
              <span
                style={{
                  fontSize: '0.625rem',
                  lineHeight: 1,
                  fontWeight: '700',
                  color: selected ? '#FFFFFF' : '#EC738F',
                  backgroundColor: selected ? 'rgba(255,255,255,0.25)' : '#FFE5EC',
                  padding: '1px 3px',
                  borderRadius: '4px'
                }}
              >
                +{eventCount}
              </span>
            )}
          </div>
        )}

        {todayDay && !selected && !isOvulation && eventCount === 0 && (
          <span 
            style={{
              position: 'absolute',
              bottom: '3px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--rose)'
            }}
          />
        )}
        {selected && (
          <span style={{ position: 'absolute', top: '2px', display: 'flex' }}>
            <Check size={9} strokeWidth={3} color="#FFF" />
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <div 
        className="sakhi-calendar"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto'
        }}
      >
        {/* Calendar Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <div>
            <h3 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.3rem', 
                fontWeight: '600',
                color: 'var(--rose-dark)',
                margin: 0,
                textTransform: 'capitalize'
              }}
            >
              {monthName} {year}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {t('calendar.selectDayAction')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Weekday Labels */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            marginBottom: '10px'
          }}
        >
          {daysOfWeek.map((day, idx) => (
            <div 
              key={idx} 
              style={{ 
                fontSize: '0.775rem', 
                fontWeight: '600', 
                color: 'var(--text-secondary)',
                padding: '4px 0',
                textTransform: 'capitalize'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px'
          }}
        >
          {calendarCells}
        </div>

        {/* Legend / Key */}
        <div 
          style={{
            marginTop: '20px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--rose-primary)' }} />
            <span>{t('calendar.loggedFlow')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFEBF0', border: '1px dashed var(--rose)' }} />
            <span>{t('calendar.recommendedArrival')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E11D48' }} />
            <span>{t('events.eventIndicator', { defaultValue: 'Context Events' })}</span>
          </div>
        </div>
      </div>

      {/* Event Detail Sheet for active clicked date */}
      {activeDetailDate && (
        <EventDetailSheet
          isOpen={Boolean(activeDetailDate)}
          onClose={() => setActiveDetailDate(null)}
          dateStr={activeDetailDate}
          eventsList={getEventsForDate(activeDetailDate)}
          onAddNewEvent={(d) => {
            setComposerDate(d);
          }}
        />
      )}

      {/* Quick Event Composer Modal */}
      {composerDate && (
        <EventComposerModal
          isOpen={Boolean(composerDate)}
          onClose={() => setComposerDate(null)}
          initialDate={composerDate}
        />
      )}
    </>
  );
}

