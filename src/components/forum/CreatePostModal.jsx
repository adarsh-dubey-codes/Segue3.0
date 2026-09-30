import React, { useState } from 'react';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { X, Shield, Sparkles } from 'lucide-react';

export default function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  if (!isOpen) return null;

  const categories = ['General', 'Period Pain', 'Mood & Mental Health', 'Products & Tips', 'Doctor Advice'];

  // Random pseudonymous generator
  const pseudonyms = ['Gentle Petal', 'Quiet Starlight', 'Moonlight Sakhi', 'Calm Bloom', 'Sunny Vibe'];
  const avatars = ['🌸', '🌿', '✨', '🌷', '🌙'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const randomIndex = Math.floor(Math.random() * pseudonyms.length);

    onCreatePost({
      id: `post-${Date.now()}`,
      authorName: pseudonyms[randomIndex],
      authorAvatar: avatars[randomIndex],
      category,
      title,
      content,
      timestamp: 'Just now',
      likesCount: 1,
      comments: []
    });

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53, 38, 46, 0.45)',
        backdropFilter: 'blur(4px)',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '520px',
          padding: '28px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Shield size={18} color="var(--rose)" />
          <span style={{ fontSize: '0.775rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--rose)' }}>
            {t('forumPage.anonymousPosting')}
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--rose-dark)', marginBottom: '16px' }}>
          {t('forumPage.createPost')}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
              {t('forumPage.selectCategory')}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${category === cat ? 'var(--rose)' : 'var(--border)'}`,
                    backgroundColor: category === cat ? 'var(--pink-soft)' : 'var(--surface-soft)',
                    color: category === cat ? 'var(--rose-dark)' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: category === cat ? '700' : '400',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              {t('forumPage.postTitle')}
            </label>
            <input
              type="text"
              placeholder={t('forumPage.titlePlaceholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
              {t('forumPage.postContent')}
            </label>
            <textarea
              rows="4"
              placeholder={t('forumPage.contentPlaceholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <Button variant="outline" type="button" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('forumPage.postAnonymously')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
