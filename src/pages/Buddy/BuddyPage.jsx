import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { useLanguage } from '../../context/LanguageContext';
import { Users, Heart, Send, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BuddyPage() {
  const { t } = useLanguage();
  const [matched, setMatched] = useState(true);
  const [buddyInfo, setBuddyInfo] = useState({
    name: 'Gentle Moon',
    avatar: '🌙',
    cycleDay: 'Day 12 (Follicular)',
    interests: ['Yoga', 'Acoustic Music', 'Teas'],
    bio: 'Hi! I love sharing gentle check-ins and supporting each other through Day 1 cramps and luteal phase mood swings.'
  });

  const [messages, setMessages] = useState([
    { id: '1', sender: 'buddy', text: 'Hey there! How is your cycle feeling today? 💕', time: '10:15 AM' },
    { id: '2', sender: 'user', text: "Having a bit of pre-period tiredness, but doing okay! How are you?", time: '10:20 AM' }
  ]);

  const [inputText, setInputText] = useState('');

  const quickCheckIns = [
    'How are you feeling today?',
    "I'm having a rough Day 1.",
    'Small win today 💕',
    'Need someone to talk to.'
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Auto buddy reply simulation
    setTimeout(() => {
      const buddyReply = {
        id: (Date.now() + 1).toString(),
        sender: 'buddy',
        text: "Sending you so much warmth! I'm right here if you want to chat more 💕",
        time: 'Just now'
      };
      setMessages((prev) => [...prev, buddyReply]);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Users size={18} color="var(--rose)" />
          <span style={{ fontSize: '0.775rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--rose)', letterSpacing: '0.08em' }}>
            {t('buddyPage.tagline')}
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
          {t('buddyPage.title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {t('buddyPage.sub')}
        </p>
      </div>

      <div className="buddy-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        <style>{`
          @media (max-width: 820px) {
            .buddy-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
        
        {/* BUDDY PROFILE CARD */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{buddyInfo.avatar}</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--rose-dark)' }}>
            {buddyInfo.name}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--rose)', fontWeight: '600', marginBottom: '16px' }}>
            {buddyInfo.cycleDay}
          </span>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
            "{buddyInfo.bio}"
          </p>

          <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              {t('buddyPage.interests')}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {buddyInfo.interests.map((int) => (
                <span key={int} className="badge-tag">{int}</span>
              ))}
            </div>
          </div>

          <a
            href="https://wa.me/?text=Hello%20Cycle%20Buddy!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#E8F5E9',
              color: '#2E7D32',
              border: '1px solid #C8E6C9',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <MessageCircle size={16} /> {t('buddyPage.optionalWhatsapp')}
          </a>
        </div>

        {/* CHAT CONTAINER */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            height: '540px',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--surface-soft)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>{buddyInfo.avatar}</span>
            <div>
              <strong style={{ color: 'var(--rose-dark)', fontSize: '1.05rem' }}>{buddyInfo.name}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'block' }}>{t('buddyPage.activeBuddy')}</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '12px 16px',
                      borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      backgroundColor: isUser ? 'var(--rose-dark)' : 'var(--surface-soft)',
                      color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}
                  >
                    {m.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{m.time}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Check-in Chips */}
          <div style={{ padding: '8px 16px', backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {quickCheckIns.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--rose-dark)',
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ padding: '12px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder={t('buddyPage.typeMessage')}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flex: 1, padding: '10px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }}
            />
            <Button type="submit" variant="primary" style={{ borderRadius: 'var(--radius-full)', padding: '10px 16px' }}>
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
