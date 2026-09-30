import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  GirlBuddyHeaderIllustration, 
  NightSkyBannerIllustration, 
  MoonAvatarBadge 
} from '../../components/illustrations/BuddyIllustrations';
import { 
  Users, Heart, Send, MessageCircle, Sparkles, CheckCheck, 
  Paperclip, Smile, ChevronLeft, ChevronRight, Lock, MoreHorizontal, Shield 
} from 'lucide-react';

export default function BuddyPage() {
  const { t } = useTranslation();
  const [buddyInfo] = useState({
    name: 'Gentle Moon',
    cycleDay: 'Day 12 (Follicular)',
    interests: [
      { name: 'Yoga', icon: '🧘', bg: '#FFE5EC', color: '#EC738F' },
      { name: 'Acoustic Music', icon: '🎵', bg: '#F3E8FF', color: '#9333EA' },
      { name: 'Teas', icon: '☕', bg: '#FEF3C7', color: '#D97706' }
    ],
    bio: 'Hi! I love sharing gentle check-ins and supporting each other through Day 1 cramps and luteal phase mood swings.'
  });

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'buddy',
      text: 'Hey there! How is your cycle feeling today? 💕',
      time: '10:15 AM'
    },
    {
      id: '2',
      sender: 'user',
      text: 'Having a bit of pre-period tiredness, but doing okay! How are you?',
      time: '10:20 AM'
    }
  ]);

  const [inputText, setInputText] = useState('');

  const quickCheckIns = [
    { text: 'How are you feeling today?', icon: '💖', bg: '#FFF0F4', border: '#FAD4DE', color: '#D9486D' },
    { text: "I'm having a rough Day 1.", icon: '☀️', bg: '#FAF5FF', border: '#E9D5FF', color: '#9333EA' },
    { text: 'Small win today 💕', icon: '🌿', bg: '#F0FDF4', border: '#BBF7D0', color: '#16A34A' },
    { text: 'Need someone to talk?', icon: '⭐', bg: '#FFFBEB', border: '#FDE68A', color: '#D97706' }
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: currentTime
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Auto buddy reply simulation
    setTimeout(() => {
      const buddyReply = {
        id: (Date.now() + 1).toString(),
        sender: 'buddy',
        text: "Sending you so much warmth! I'm right here if you want to chat more 💕",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, buddyReply]);
    }, 1200);
  };

  return (
    <div
      style={{
        backgroundColor: '#FDF3F5',
        backgroundImage: 'radial-gradient(ellipse at 10% 0%, #FFEBF0 0%, #FDF3F5 60%, #FAF0F4 100%)',
        minHeight: 'calc(100vh - 80px)',
        padding: '32px 24px 80px 24px'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* TOP HEADER SECTION */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            position: 'relative'
          }}
          className="buddy-header"
        >
          <style>{`
            @media (max-width: 840px) {
              .buddy-header {
                flex-direction: column !important;
                align-items: flex-start !important;
              }
              .buddy-header-art {
                align-self: center !important;
              }
            }
          `}</style>

          <div>
            {/* Top Cursive Caption */}
            <p
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#EC738F',
                margin: '0 0 4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Your Cycle Partner Always ♡
            </p>

            {/* Main Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.2rem',
                lineHeight: 1.1,
                fontWeight: '700',
                color: '#38232A',
                margin: '0 0 10px 0'
              }}
            >
              Cycle Buddy System <span style={{ color: '#EC738F' }}>♡</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: '#7D626C',
                fontSize: '1.05rem',
                maxWidth: '680px',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Connect with a supportive cycle partner to check in, share wins, and vent without exposing your real identity.
            </p>
          </div>

          {/* Right Side Illustration & Cursive Text */}
          <div
            className="buddy-header-art"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            <GirlBuddyHeaderIllustration />

            <div
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#C23B68',
                lineHeight: 1.2,
                transform: 'rotate(-4deg)'
              }}
            >
              Real <br />
              Conversations <br />
              <span style={{ fontSize: '1.6rem', color: '#EC738F' }}>Real Support ♡</span>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID (Profile Card & Active Chat Area) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px minmax(0, 1fr)',
            gap: '24px',
            alignItems: 'stretch'
          }}
          className="buddy-main-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .buddy-main-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          {/* LEFT COLUMN: BUDDY PROFILE CARD */}
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #FAD4DE',
              boxShadow: '0 8px 24px rgba(236, 115, 143, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Night Sky Header Banner */}
              <NightSkyBannerIllustration />

              {/* Avatar Badge & Profile Information */}
              <div
                style={{
                  padding: '0 24px 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: '-30px'
                }}
              >
                {/* Avatar Badge */}
                <div style={{ marginBottom: '10px' }}>
                  <MoonAvatarBadge size={64} />
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: '#3E242B',
                    margin: '0 0 6px 0'
                  }}
                >
                  {buddyInfo.name}
                </h3>

                {/* Cycle Day Sub-badge */}
                <span
                  style={{
                    backgroundColor: '#FFF0F4',
                    color: '#D9486D',
                    border: '1px solid #FAD4DE',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    marginBottom: '16px'
                  }}
                >
                  {buddyInfo.cycleDay}
                </span>

                {/* Bio Quote */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#7D626C',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    margin: '0 0 20px 0'
                  }}
                >
                  "{buddyInfo.bio}"
                </p>

                {/* Interests Section */}
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid #FAD4DE',
                    paddingTop: '16px',
                    marginBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      color: '#EC738F',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '10px'
                    }}
                  >
                    <Sparkles size={12} color="#EC738F" />
                    <span>INTERESTS</span>
                    <Sparkles size={12} color="#EC738F" />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {buddyInfo.interests.map((int) => (
                      <span
                        key={int.name}
                        style={{
                          backgroundColor: int.bg,
                          color: int.color,
                          border: '1px solid #FAD4DE',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{int.icon}</span>
                        <span>{int.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional WhatsApp Action Button */}
                <a
                  href="https://wa.me/?text=Hello%20Cycle%20Buddy!"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Optional WhatsApp Chat</span>
                  <ChevronRight size={16} />
                </a>

                {/* Privacy Guarantee Caption */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: '#9E828C',
                    marginTop: '12px'
                  }}
                >
                  <Lock size={12} />
                  <span>Your privacy is our priority</span>
                </div>

              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: ACTIVE CHAT CONTAINER */}
          <main
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #FAD4DE',
              boxShadow: '0 8px 24px rgba(236, 115, 143, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              minHeight: '620px'
            }}
          >
            {/* Active Chat Header */}
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #FAD4DE',
                backgroundColor: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDFE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {/* Left: Avatar & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MoonAvatarBadge size={44} />
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: '700',
                      color: '#3E242B',
                      margin: 0
                    }}
                  >
                    {buddyInfo.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#22C55E'
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', color: '#22C55E', fontWeight: '600' }}>
                      Active Buddy
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Support Tag & Options */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    backgroundColor: '#FFF0F4',
                    color: '#D9486D',
                    border: '1px solid #FAD4DE',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.775rem',
                    fontWeight: '600'
                  }}
                >
                  👥 Support • Share • Grow
                </span>

                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9E828C',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Chat settings"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages Body Log */}
            <div
              style={{
                flex: 1,
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexDirection: isUser ? 'row-reverse' : 'row',
                      alignItems: 'flex-start'
                    }}
                  >
                    {!isUser ? (
                      <MoonAvatarBadge size={36} />
                    ) : (
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: '#FFE5EC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          border: '1px solid #FAD4DE'
                        }}
                      >
                        🌸
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '75%'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: isUser ? '#3E242B' : '#FFF0F4',
                          color: isUser ? '#FFFFFF' : '#38232A',
                          padding: '14px 20px',
                          borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                          border: isUser ? 'none' : '1px solid #FAD4DE',
                          fontSize: '0.925rem',
                          lineHeight: '1.6',
                          boxShadow: isUser
                            ? '0 4px 14px rgba(62, 36, 43, 0.25)'
                            : '0 2px 8px rgba(236, 115, 143, 0.05)'
                        }}
                      >
                        {m.text}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.725rem',
                          color: '#9E828C',
                          marginTop: '6px',
                          padding: '0 4px'
                        }}
                      >
                        <span>{m.time}</span>
                        {isUser && <CheckCheck size={14} color="#EC738F" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Check-in Prompts Bar */}
            <div
              style={{
                padding: '12px 20px',
                backgroundColor: '#FFFBFD',
                borderTop: '1px solid #FAD4DE',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9E828C',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title="Previous prompts"
              >
                <ChevronLeft size={18} />
              </button>

              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  scrollbarWidth: 'none'
                }}
              >
                {quickCheckIns.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(q.text)}
                    style={{
                      backgroundColor: q.bg,
                      border: `1px solid ${q.border}`,
                      color: q.color,
                      borderRadius: '9999px',
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <span>{q.icon}</span>
                    <span>{q.text}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9E828C',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title="Next prompts"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #FAD4DE',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F0D5DD',
                  borderRadius: '9999px',
                  padding: '6px 8px 6px 20px',
                  boxShadow: '0 4px 16px rgba(236, 115, 143, 0.08)',
                  gap: '10px'
                }}
              >
                {/* Emoji smile button */}
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#7D626C',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Emoji"
                >
                  <Smile size={18} />
                </button>

                {/* Text input */}
                <input
                  type="text"
                  placeholder="Type a message to your buddy..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '0.925rem',
                    color: '#38232A',
                    padding: '8px 4px'
                  }}
                />

                {/* Attachment Icon */}
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#7D626C',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Attach file"
                >
                  <Paperclip size={18} />
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  style={{
                    background: inputText.trim()
                      ? 'linear-gradient(135deg, #EC738F 0%, #D9486D 100%)'
                      : '#FAD4DE',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: inputText.trim() ? '0 4px 14px rgba(236, 115, 143, 0.35)' : 'none'
                  }}
                  title="Send Message"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </main>
        </div>

        {/* BOTTOM FEATURES BANNER ROW */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #FAD4DE',
            padding: '16px 28px',
            boxShadow: '0 4px 16px rgba(236, 115, 143, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3E242B', fontWeight: '600', fontSize: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🌸</span>
            <span>Better Conversations</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3E242B', fontWeight: '600', fontSize: '0.875rem' }}>
            <Heart size={18} color="#EC738F" fill="#EC738F" />
            <span>Stronger Together</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3E242B', fontWeight: '600', fontSize: '0.875rem' }}>
            <Sparkles size={18} color="#EC738F" />
            <span>Happier Cycles</span>
          </div>
        </div>

      </div>
    </div>
  );
}
