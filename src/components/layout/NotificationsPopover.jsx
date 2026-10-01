import React from 'react';
import { useRewards } from '../../context/RewardsContext';
import { Bell, CheckCheck, X } from 'lucide-react';

export default function NotificationsPopover({ isOpen, onClose }) {
  const { notifications, markAllNotificationsAsRead } = useRewards();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        right: '0',
        width: '360px',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid rgba(250, 212, 222, 0.8)',
        boxShadow: '0 20px 50px rgba(62, 36, 43, 0.18)',
        padding: '16px',
        zIndex: 1000,
        animation: 'slideDownFade 0.25s ease-out'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #FAD4DE', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} color="#B9345D" />
          <strong style={{ fontSize: '0.9rem', color: '#3E242B' }}>Notifications</strong>
        </div>

        <button
          type="button"
          onClick={markAllNotificationsAsRead}
          style={{
            background: 'none',
            border: 'none',
            color: '#B9345D',
            fontSize: '0.75rem',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <CheckCheck size={14} /> Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: '10px 12px',
              borderRadius: '16px',
              backgroundColor: n.read ? '#FFFFFF' : '#FFF0F4',
              border: '1px solid #FAD4DE',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start'
            }}
          >
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{n.icon}</span>
            <div>
              <strong style={{ fontSize: '0.825rem', color: '#271724', display: 'block' }}>{n.title}</strong>
              <p style={{ fontSize: '0.775rem', color: '#7D626C', margin: '2px 0', lineHeight: 1.4 }}>{n.desc}</p>
              <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
