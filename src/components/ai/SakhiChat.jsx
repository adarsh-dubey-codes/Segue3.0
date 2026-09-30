import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCycle } from '../../context/CycleContext';
import { detectEventFromNaturalLanguage } from '../../utils/nlpEventDetector';
import { generateSakhiResponse, getRemainingQuota } from '../../utils/aiClient';
import SakhiAvatarSvg from '../illustrations/SakhiAvatarSvg';
import { SmallStepsBanner } from '../illustrations/FloralBannerDecorations';
import { Paperclip, Languages, Mic, Send, Info, Sparkles, Heart, Calendar, Check, X } from 'lucide-react';

export default function SakhiChat({ activePrompt, onSelectPrompt }) {
  const { t, language, setLanguage } = useLanguage();
  const { addEvent } = useCycle();

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'sakhi',
      text: t('aiPage.sub'),
      timestamp: '07:40 pm'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState(getRemainingQuota());
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickQuestions = [
    {
      id: 'cramps',
      icon: <Heart size={14} color="#EC738F" fill="#EC738F" />,
      text: t('aiPage.q1')
    },
    {
      id: 'foods',
      icon: <Heart size={14} color="#EC738F" fill="#EC738F" />,
      text: t('aiPage.q2')
    },
    {
      id: 'fluctuate',
      icon: <Calendar size={14} color="#EC738F" />,
      text: t('aiPage.q3')
    }
  ];

  // Update welcome message when language changes if only welcome message is present
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            sender: 'sakhi',
            text: t('aiPage.sub'),
            timestamp: prev[0].timestamp
          }
        ];
      }
      return prev;
    });
  }, [language, t]);

  useEffect(() => {
    if (activePrompt) {
      handleSend(activePrompt);
    }
  }, [activePrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const getCurrentTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
  };

  const handleConfirmSaveEvent = (msgId, eventData) => {
    addEvent({
      date: eventData.date || new Date().toISOString().split('T')[0],
      category: eventData.category,
      type: eventData.type,
      title: eventData.defaultTitle || eventData.title || 'Event',
      description: eventData.description,
      metadata: eventData.metadata || {},
      source: 'chat'
    });

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.pendingEvent
          ? { ...m, pendingEvent: { ...m.pendingEvent, saved: true, dismissed: false } }
          : m
      )
    );
  };

  const handleDismissEvent = (msgId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.pendingEvent
          ? { ...m, pendingEvent: { ...m.pendingEvent, dismissed: true } }
          : m
      )
    );
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || loading || remainingQuota <= 0) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: getCurrentTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const detectedEvent = detectEventFromNaturalLanguage(text);

    try {
      let sakhiText = await generateSakhiResponse(text, { language });

      if (detectedEvent) {
        sakhiText += `\n\nI noticed you mentioned something that happened in your day! Would you like me to save this to your cycle timeline? 🌸`;
      }

      const sakhiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'sakhi',
        text: sakhiText,
        timestamp: getCurrentTimeString(),
        pendingEvent: detectedEvent ? { ...detectedEvent, saved: false, dismissed: false } : null
      };

      setMessages((prev) => [...prev, sakhiMsg]);
      setRemainingQuota(getRemainingQuota());
    } catch (err) {
      console.error('AI chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please type your query.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput(`[Attached document: ${file.name}] Can you analyze this?`);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #FAD4DE',
        boxShadow: '0 10px 30px rgba(236, 115, 143, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        minHeight: '620px'
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*,.pdf,.txt"
      />

      {/* Header bar inside main Sakhi AI card */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #FAD4DE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDFE 100%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <SakhiAvatarSvg size={48} />
            <span
              style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#22C55E',
                border: '2px solid #FFFFFF'
              }}
              title="Sakhi is online"
            />
          </div>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#3E242B',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Sakhi AI <span style={{ color: '#EC738F' }}>✦</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E'
                }}
              />
              <span style={{ fontSize: '0.825rem', color: '#7D626C', fontWeight: '500' }}>
                Online • {t('common.smallSteps')}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'none', minWidth: '220px', '@media (min-width: 640px)': { display: 'block' } }}>
          <SmallStepsBanner />
        </div>
      </div>

      {/* Medical Disclaimer Alert Banner */}
      <div style={{ padding: '12px 24px 0 24px' }}>
        <div
          style={{
            backgroundColor: '#FFF8F0',
            border: '1px solid #FFE4C4',
            borderRadius: '14px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.825rem',
            color: '#8A5A00',
            lineHeight: 1.4
          }}
        >
          <Info size={16} color="#D97706" style={{ flexShrink: 0 }} />
          <span>
            {t('aiPage.disclaimer')}
          </span>
        </div>
      </div>

      {/* Chat Messages Log Area */}
      <div
        style={{
          flex: 1,
          padding: '20px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}
            >
              {!isUser && <SakhiAvatarSvg size={38} />}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '78%'
                }}
              >
                <div
                  style={{
                    backgroundColor: isUser ? '#EC738F' : '#FFF0F4',
                    color: isUser ? '#FFFFFF' : '#38232A',
                    padding: '14px 20px',
                    borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    border: isUser ? 'none' : '1px solid #FAD4DE',
                    fontSize: '0.935rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line',
                    boxShadow: isUser
                      ? '0 4px 14px rgba(236, 115, 143, 0.3)'
                      : '0 2px 8px rgba(236, 115, 143, 0.05)'
                  }}
                >
                  {msg.text}

                  {/* Interactive Pending Event Confirmation Box */}
                  {msg.pendingEvent && !msg.pendingEvent.dismissed && (
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        backgroundColor: msg.pendingEvent.saved ? '#F0F9F1' : '#FFFFFF',
                        border: `1px solid ${msg.pendingEvent.saved ? '#BBF7D0' : '#FAD4DE'}`,
                        fontSize: '0.85rem'
                      }}
                    >
                      {!msg.pendingEvent.saved ? (
                        <div>
                          <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#3E242B' }}>
                            {t('events.confirmPrompt', { defaultValue: `Would you like me to save "${msg.pendingEvent.defaultTitle}" to your cycle timeline?` })}
                          </p>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              onClick={() => handleConfirmSaveEvent(msg.id, msg.pendingEvent)}
                              style={{
                                backgroundColor: '#EC738F',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '6px 14px',
                                borderRadius: '9999px',
                                fontWeight: '600',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Check size={14} />
                              {t('events.saveToTimelineBtn', { defaultValue: 'Save to timeline' })}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDismissEvent(msg.id)}
                              style={{
                                backgroundColor: 'transparent',
                                color: '#7D626C',
                                border: '1px solid #F0D5DD',
                                padding: '6px 12px',
                                borderRadius: '9999px',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                              }}
                            >
                              {t('events.notNowBtn', { defaultValue: 'Not now' })}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803D', fontWeight: '600' }}>
                          <Check size={16} />
                          <span>{t('events.savedConfirmation', { defaultValue: '✓ Saved to your cycle timeline!' })}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <span
                  style={{
                    fontSize: '0.725rem',
                    color: '#9E828C',
                    marginTop: '6px',
                    padding: '0 4px'
                  }}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <SakhiAvatarSvg size={38} />
            <div
              style={{
                backgroundColor: '#FFF0F4',
                border: '1px solid #FAD4DE',
                borderRadius: '20px 20px 20px 4px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#EC738F',
                fontSize: '0.875rem'
              }}
            >
              <Sparkles size={16} style={{ animation: 'spin 1.5s linear infinite' }} />
              <span>{t('aiPage.thinking')}</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Questions Section */}
      <div style={{ padding: '0 24px 14px 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '10px',
            color: '#EC738F',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          <Sparkles size={14} color="#EC738F" />
          <span>{t('aiPage.suggestedQuestions')}</span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none'
          }}
        >
          {quickQuestions.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => handleSend(q.text)}
              style={{
                backgroundColor: '#FFF5F8',
                border: '1px solid #FAD4DE',
                borderRadius: '9999px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#D9486D',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFE5EC';
                e.currentTarget.style.borderColor = '#EC738F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFF5F8';
                e.currentTarget.style.borderColor = '#FAD4DE';
              }}
            >
              {q.icon}
              <span>{q.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls Bar Container */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          padding: '16px 24px 20px 24px',
          borderTop: '1px solid #FAD4DE',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FAFAFA',
            border: '1px solid #F0D5DD',
            borderRadius: '9999px',
            padding: '6px 8px 6px 16px',
            boxShadow: '0 4px 16px rgba(236, 115, 143, 0.06)',
            gap: '8px'
          }}
        >
          <button
            type="button"
            onClick={handleAttachmentClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#7D626C',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              transition: 'color 0.2s'
            }}
            title="Attach file or image"
          >
            <Paperclip size={18} />
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            style={{
              background: 'none',
              border: 'none',
              color: '#7D626C',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              transition: 'color 0.2s'
            }}
            title={`Current language: ${language.toUpperCase()}. Click to switch language.`}
          >
            <Languages size={18} />
          </button>

          <input
            type="text"
            placeholder={t('aiPage.askPlaceholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || remainingQuota <= 0}
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

          <button
            type="button"
            onClick={handleMicClick}
            style={{
              backgroundColor: isRecording ? '#EC738F' : '#F3E8FF',
              color: isRecording ? '#FFFFFF' : '#9333EA',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isRecording ? '0 0 12px rgba(236, 115, 143, 0.5)' : 'none'
            }}
            title={isRecording ? 'Listening...' : 'Click to speak'}
          >
            <Mic size={18} />
          </button>

          <button
            type="submit"
            disabled={!input.trim() || loading || remainingQuota <= 0}
            style={{
              background: input.trim()
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
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: input.trim() ? '0 4px 14px rgba(236, 115, 143, 0.35)' : 'none'
            }}
            title={t('aiPage.send')}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
