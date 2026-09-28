import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  // State for currently displayed month in calendar view
  const [currentViewDate, setCurrentViewDate] = useState(selectedDate ? new Date(selectedDate) : today);

  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month calculation
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentViewDate(new Date(year, month + 1, 1));
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    const sel = new Date(selectedDate);
    return (
      sel.getDate() === day &&
      sel.getMonth() === month &&
      sel.getFullYear() === year
    );
  };

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  // Helper to check if a day falls within typical 5-day flow period from selected date
  const isPeriodDay = (day) => {
    if (!selectedDate) return false;
    const sel = new Date(selectedDate);
    const thisDayDate = new Date(year, month, day);
    const diffTime = thisDayDate - sel;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays < 5;
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(year, month, day);
    onSelectDate(clickedDate);
  };

  // Build grid days
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const selected = isSelected(day);
    const todayDay = isToday(day);
    const periodDay = isPeriodDay(day);

    calendarCells.push(
      <button
        key={`day-${day}`}
        type="button"
        onClick={() => handleDayClick(day)}
        className={`calendar-cell day-button ${selected ? 'selected' : ''} ${periodDay ? 'period-active' : ''}`}
        aria-label={`${monthNames[month]} ${day}, ${year}${selected ? ' - Selected period start date' : ''}`}
        style={{
          aspectRatio: '1',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: '0.925rem',
          fontWeight: selected ? '700' : todayDay ? '600' : '400',
          color: selected ? '#FFFFFF' : periodDay ? 'var(--deep-plum)' : 'var(--text-primary)',
          backgroundColor: selected 
            ? 'var(--rose-accent)' 
            : periodDay 
              ? 'var(--soft-pink)' 
              : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          outline: 'none',
          boxShadow: selected ? 'var(--shadow-sm)' : 'none'
        }}
      >
        <span>{day}</span>
        {todayDay && !selected && (
          <span 
            style={{
              position: 'absolute',
              bottom: '4px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--rose-accent)'
            }}
          />
        )}
        {selected && (
          <span style={{ position: 'absolute', bottom: '2px', display: 'flex' }}>
            <Check size={10} strokeWidth={3} color="#FFF" />
          </span>
        )}
      </button>
    );
  }

  return (
    <div 
      className="sakhi-calendar"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        width: '100%',
        maxWidth: '380px',
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
        <h3 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.25rem', 
            fontWeight: '600',
            color: 'var(--deep-plum)' 
          }}
        >
          {monthNames[month]} {year}
        </h3>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
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
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
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
        {daysOfWeek.map((day) => (
          <div 
            key={day} 
            style={{ 
              fontSize: '0.775rem', 
              fontWeight: '600', 
              color: 'var(--text-muted)',
              padding: '4px 0' 
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
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--rose-accent)' }} />
          <span>Period start date</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--soft-pink)' }} />
          <span>Period days</span>
        </div>
      </div>
    </div>
  );
}
