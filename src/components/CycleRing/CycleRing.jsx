import React from 'react';

export default function CycleRing({ 
  dayNumber = null, 
  totalDays = 28, 
  size = 200, 
  label = 'Cycle Day',
  isLoginVisual = false 
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate arc progress for cycle day (if dayNumber provided)
  const currentDay = dayNumber ? Math.min(Math.max(dayNumber, 1), totalDays) : 14;
  const progressPercent = dayNumber ? (currentDay / totalDays) : 0.5;
  const dashoffset = circumference * (1 - progressPercent);

  return (
    <div 
      className="cycle-ring-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        margin: '0 auto'
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Background Subtle Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Soft Pink Glow Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--soft-pink)"
          strokeWidth={strokeWidth + 4}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          style={{ opacity: 0.7, transition: 'stroke-dashoffset 0.8s ease-out' }}
        />

        {/* Primary Active Rose Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--rose-accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />

        {/* Cycle indicator dot at the end of progress */}
        {dayNumber && (
          <circle
            cx={size / 2 + radius * Math.cos(2 * Math.PI * progressPercent - Math.PI / 2)}
            cy={size / 2 + radius * Math.sin(2 * Math.PI * progressPercent - Math.PI / 2)}
            r={strokeWidth}
            fill="var(--deep-plum)"
            stroke="var(--bg-primary)"
            strokeWidth={3}
            style={{ transition: 'all 0.8s ease-out' }}
          />
        )}
      </svg>

      {/* Center Label and Number */}
      <div 
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          inset: 0
        }}
      >
        {isLoginVisual ? (
          <>
            <span 
              style={{ 
                fontSize: '0.75rem', 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase', 
                color: 'var(--text-muted)',
                marginBottom: '2px',
                fontWeight: '500'
              }}
            >
              Cycle
            </span>
            <span 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '2.5rem', 
                fontWeight: '600', 
                color: 'var(--deep-plum)',
                lineHeight: 1
              }}
            >
              14
            </span>
            <span 
              style={{ 
                fontSize: '0.75rem', 
                color: 'var(--rose-accent)', 
                marginTop: '4px',
                fontWeight: '500'
              }}
            >
              ovulation phase
            </span>
          </>
        ) : (
          <>
            <span 
              style={{ 
                fontSize: '0.725rem', 
                letterSpacing: '0.1em', 
                textTransform: 'uppercase', 
                color: 'var(--text-muted)',
                marginBottom: '2px',
                fontWeight: '600'
              }}
            >
              Cycle
            </span>
            <span 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: dayNumber ? '2.75rem' : '1.75rem', 
                fontWeight: '600', 
                color: 'var(--deep-plum)',
                lineHeight: 1
              }}
            >
              {dayNumber !== null ? dayNumber : '—'}
            </span>
            <span 
              style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-muted)', 
                marginTop: '4px',
                fontWeight: '500'
              }}
            >
              {dayNumber !== null ? label : 'No date selected'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
