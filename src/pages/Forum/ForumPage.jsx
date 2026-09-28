import React, { useState } from 'react';
import { initialForumPosts } from '../../data/forumSeedData';
import CreatePostModal from '../../components/forum/CreatePostModal';
import Button from '../../components/Button/Button';
import { Heart, MessageSquare, Shield, Plus, Flag } from 'lucide-react';

export default function ForumPage() {
  const [posts, setPosts] = useState(initialForumPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [commentText, setCommentText] = useState({});

  const categories = ['All', 'Period Pain', 'Mood & Mental Health', 'Products & Tips', 'Doctor Advice', 'General'];

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p))
    );
  };

  const handleAddComment = (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `c-${Date.now()}`,
                authorName: 'Sakhi Friend',
                content: text,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return p;
      })
    );

    setCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Shield size={18} color="var(--rose)" />
            <span style={{ fontSize: '0.775rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--rose)', letterSpacing: '0.08em' }}>
              Safe Room • No Names • No Judgment
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
            Anonymous Community Forum
          </h1>
        </div>

        <Button variant="primary" onClick={() => setIsCreateOpen(true)} icon={<Plus size={16} />}>
          Create Anonymous Post
        </Button>
      </div>

      {/* Categories Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${selectedCategory === cat ? 'var(--rose)' : 'var(--border)'}`,
              backgroundColor: selectedCategory === cat ? 'var(--rose-dark)' : '#FFFFFF',
              color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-primary)',
              fontWeight: selectedCategory === cat ? '700' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FEED POSTS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{post.authorAvatar}</span>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--rose-dark)' }}>{post.authorName}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>{post.timestamp}</span>
                </div>
              </div>

              <span className="badge-tag">{post.category}</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--rose-dark)', marginBottom: '8px' }}>
              {post.title}
            </h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
              {post.content}
            </p>

            {/* Reactions & Actions */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => handleLike(post.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--rose)',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                <Heart size={18} fill="var(--rose)" color="var(--rose)" />
                <span>{post.likesCount} Support</span>
              </button>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} /> {post.comments.length} Comments
              </span>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div style={{ backgroundColor: 'var(--surface-soft)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {post.comments.map((c) => (
                  <div key={c.id} style={{ fontSize: '0.875rem' }}>
                    <strong style={{ color: 'var(--rose-dark)' }}>{c.authorName}: </strong>
                    <span style={{ color: 'var(--text-primary)' }}>{c.content}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Input */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Write a supportive anonymous comment..."
                value={commentText[post.id] || ''}
                onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                style={{ flex: 1, padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', fontSize: '0.85rem' }}
              />
              <Button variant="secondary" onClick={() => handleAddComment(post.id)} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                Reply
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreatePost={(newP) => setPosts([newP, ...posts])} />
    </div>
  );
}
