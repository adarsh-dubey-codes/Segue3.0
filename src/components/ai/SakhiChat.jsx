import React, { useState, useEffect, useRef } from 'react';
import { generateSakhiResponse, getRemainingQuota } from '../../utils/aiClient';
import Button from '../Button/Button';
import { Bot, Send, RotateCcw, Trash2, ShieldAlert, Sparkles } from 'lucide-react';

export default function SakhiChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'sakhi',
      text: "Hi, I'm Sakhi. Ask me anything about your cycle, body, or how you're feeling.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState(getRemainingQuota());
  const chatEndRef = useRef(null);

  const suggestedPrompts = [
    'How do I soothe severe Day 1 cramps naturally?',
    'What foods are best during the luteal phase?',
    'How do I choose between a cup and period underwear?',
    'Why is my energy low right before my period?',
    'What are early signs of PCOS?',
    'How to track irregular cycles?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || loading || remainingQuota <= 0) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const sakhiText = await generateSakhiResponse(text);
      const sakhiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'sakhi',
        text: sakhiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, sakhiMsg]);
      setRemainingQuota(getRemainingQuota());
    } catch (err) {
      console.error('AI chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'sakhi',
        text: "Hi, I'm Sakhi. Ask me anything about your cycle, body, or how you're feeling.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 160px)',
        maxHeight: '760px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden'
      }}
    >
      {/* AI Chat Header */}
      <div 
        style={{
          padding: '16px 24px',
          backgroundColor: 'var(--surface-soft)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--rose)'
            }}
          >
            <Bot size={22} color="var(--rose-dark)" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--rose-dark)', lineHeight: 1.1 }}>
              Sakhi AI
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Your gentle AI companion • {remainingQuota} messages remaining today
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          title="Clear conversation"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '6px'
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div 
        style={{
          padding: '10px 20px',
          backgroundColor: '#FFF8F0',
          borderBottom: '1px solid #FFE4C4',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.775rem',
          color: '#8A5A00'
        }}
      >
        <ShieldAlert size={16} style={{ flexShrink: 0 }} />
        <span>
          Sakhi is an AI companion, not a doctor. For serious symptoms, please consult a healthcare professional.
        </span>
      </div>

      {/* Chat Messages Body */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '14px 18px',
                  borderRadius: isUser ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  backgroundColor: isUser ? 'var(--rose-dark)' : 'var(--surface-soft)',
                  color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '0.925rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-line',
                  boxShadow: 'var(--shadow-sm)',
                  border: isUser ? 'none' : '1px solid var(--border)'
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', padding: '0 4px' }}>
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Sparkles size={16} color="var(--rose)" style={{ animation: 'spin 1.5s linear infinite' }} />
            <span>Sakhi is thinking...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div 
        style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--background)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              backgroundColor: '#FFFFFF',
              color: 'var(--rose-dark)',
              fontSize: '0.775rem',
              fontWeight: '500',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Ask Sakhi about your cycle, body, or feelings..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading || remainingQuota <= 0}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)',
            fontSize: '0.925rem',
            outline: 'none'
          }}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={!input.trim() || loading || remainingQuota <= 0}
          style={{ borderRadius: 'var(--radius-full)', padding: '12px 18px' }}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
