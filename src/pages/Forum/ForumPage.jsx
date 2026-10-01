import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { initialForumPosts } from '../../data/forumSeedData';
import CreatePostModal from '../../components/forum/CreatePostModal';
import { 
  GirlHoldingTeaIllustration, 
  ChamomileHotWaterBottleIllustration, 
  MenstrualCupIllustration, 
  LutealPhaseAnxietyIllustration 
} from '../../components/illustrations/ForumIllustrations';
import { 
  Shield, Sparkles, Heart, MessageSquare, Plus, 
  MoreHorizontal, Droplet, Brain, Leaf, Stethoscope, MessageCircle, Tag, Check 
} from 'lucide-react';

export default function ForumPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState(initialForumPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const categories = [
    { id: 'All', label: 'All', icon: Sparkles },
    { id: 'Period Pain', label: 'Period Pain', icon: Droplet },
    { id: 'Mood & Mental Health', label: 'Mood & Mental Health', icon: Brain },
    { id: 'Products & Tips', label: 'Products & Tips', icon: Leaf },
    { id: 'Doctor Advice', label: 'Doctor Advice', icon: Stethoscope },
    { id: 'General', label: 'General', icon: MessageCircle }
  ];

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p))
    );
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
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
    <div
      style={{
        backgroundColor: '#FDF3F5',
        backgroundImage: 'radial-gradient(ellipse at 10% 0%, #FFEBF0 0%, #FDF3F5 60%, #FAF0F4 100%)',
        minHeight: 'calc(100vh - 80px)',
        padding: '32px 24px 80px 24px'
      }}
    >
      <div style={{ maxWidth: '100%', padding: '0 clamp(12px, 2vw, 32px)', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* TOP HEADER SECTION */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            position: 'relative'
          }}
          className="forum-header"
        >
          <style>{`
            @media (max-width: 840px) {
              .forum-header {
                flex-direction: column !important;
                align-items: flex-start !important;
              }
              .forum-illustration {
                align-self: center !important;
              }
            }
          `}</style>

          <div>
            {/* Small uppercase tag text */}
            <span
              style={{
                fontSize: '0.775rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                color: '#EC738F',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px'
              }}
            >
              {t('forumPage.safeSpaceTag', 'SAFE SPACE • REAL PEOPLE • NO JUDGEMENT')}
            </span>

            {/* Main Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.2rem',
                lineHeight: 1.1,
                fontWeight: '700',
                color: '#38232A',
                margin: '0 0 8px 0'
              }}
            >
              {t('forumPage.title', 'Anonymous Community Forum')}
            </h1>

            {/* Subtitle with Cursive Script */}
            <p
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                fontSize: '1.6rem',
                fontWeight: '600',
                color: '#EC738F',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {t('forumPage.subtitleCursive', 'Share. Support. Heal. Grow. ♡')}
            </p>
          </div>

          {/* Right Side Illustration & Cursive Text */}
          <div
            className="forum-illustration"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            <GirlHoldingTeaIllustration />

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
              {t('forumPage.voiceMatters', 'Your voice matters ♡')}
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER BAR & CREATE POST ACTION */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #FAD4DE',
            padding: '12px 20px',
            boxShadow: '0 4px 16px rgba(236, 115, 143, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px'
            }}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '9999px',
                    border: isSelected ? 'none' : '1px solid #FAD4DE',
                    backgroundColor: isSelected ? '#3E242B' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#38232A',
                    fontWeight: isSelected ? '700' : '500',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(62, 36, 43, 0.25)' : 'none'
                  }}
                >
                  <Icon size={15} color={isSelected ? '#FFE5EC' : '#EC738F'} />
                  <span>{cat.id === 'All' ? t('common.all', 'All') : t(`forumPage.categories.${cat.id.toLowerCase().replace(/[^a-z]/g, '')}`, cat.label)}</span>
                </button>
              );
            })}
          </div>

          {/* Create Anonymous Post Button */}
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #EC738F 0%, #D9486D 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '11px 22px',
              fontSize: '0.9rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(236, 115, 143, 0.35)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Plus size={18} strokeWidth={3} />
            <span>{t('forumPage.createPost', 'Create Anonymous Post')}</span>
          </button>
        </div>

        {/* COMMUNITY POSTS FEED */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredPosts.map((post, idx) => {
            const isCommentsOpen = Boolean(openComments[post.id]);

            return (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #FAD4DE',
                  padding: '24px 28px',
                  boxShadow: '0 8px 24px rgba(236, 115, 143, 0.06)',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start'
                }}
                className="forum-post-card"
              >
                <style>{`
                  @media (max-width: 680px) {
                    .forum-post-card {
                      flex-direction: column !important;
                    }
                  }
                `}</style>

                {/* Left Illustration Container */}
                {idx === 0 && <ChamomileHotWaterBottleIllustration />}
                {idx === 1 && <MenstrualCupIllustration />}
                {idx === 2 && <LutealPhaseAnxietyIllustration />}
                {idx > 2 && <ChamomileHotWaterBottleIllustration />}

                {/* Main Post Content */}
                <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                  
                  {/* Top Header Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {/* Author Avatar Badge */}
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#FFE5EC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          border: '1px solid #FAD4DE'
                        }}
                      >
                        {post.authorAvatar}
                      </div>

                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#38232A', fontWeight: '700' }}>
                          {post.authorName}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: '#9E828C', marginLeft: '8px' }}>
                          {post.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Category Tag & Options */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          backgroundColor: '#FFF0F4',
                          color: '#D9486D',
                          border: '1px solid #FAD4DE',
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.775rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Droplet size={12} color="#EC738F" fill="#EC738F" />
                        <span>{t(`forumPage.categories.${post.category.toLowerCase().replace(/[^a-z]/g, '')}`, post.category)}</span>
                      </span>

                      <span
                        style={{
                          backgroundColor: '#FAFAFA',
                          color: '#7D626C',
                          border: '1px solid #F0D5DD',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Tag size={11} /> + tag
                      </span>

                      <button
                        type="button"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#9E828C',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Options"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: '700',
                      color: '#38232A',
                      lineHeight: 1.3,
                      margin: '0 0 10px 0'
                    }}
                  >
                    {t(`forumData.${post.id}.title`, post.title)}
                  </h3>

                  {/* Post Body */}
                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: '#5C434B',
                      lineHeight: 1.6,
                      margin: '0 0 18px 0'
                    }}
                  >
                    {t(`forumData.${post.id}.content`, post.content)}
                  </p>

                  {/* Footer Row: Support, Comments, Reply */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #FAD4DE',
                      paddingTop: '14px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      {/* Like / Support Button */}
                      <button
                        type="button"
                        onClick={() => handleLike(post.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#EC738F',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Heart size={18} fill="#EC738F" color="#EC738F" />
                        <span>{post.likesCount} {t('forumPage.support', 'Support')}</span>
                      </button>

                      {/* Comments Count Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleComments(post.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#7D626C',
                          fontWeight: '500',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        <MessageSquare size={16} />
                        <span>{t('forumPage.commentsCount', { count: post.comments.length })}</span>
                      </button>
                    </div>

                    {/* Reply Action Button */}
                    <button
                      type="button"
                      onClick={() => toggleComments(post.id)}
                      style={{
                        backgroundColor: '#FFF0F4',
                        color: '#D9486D',
                        border: '1px solid #FAD4DE',
                        borderRadius: '9999px',
                        padding: '6px 18px',
                        fontSize: '0.825rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <MessageSquare size={14} />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Inline Comments Drawer */}
                  {isCommentsOpen && (
                    <div
                      style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px stroke #FAD4DE',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      {post.comments.length > 0 && (
                        <div
                          style={{
                            backgroundColor: '#FFF8FA',
                            border: '1px solid #FAD4DE',
                            borderRadius: '16px',
                            padding: '14px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          {post.comments.map((c) => (
                            <div key={c.id} style={{ fontSize: '0.85rem' }}>
                              <strong style={{ color: '#38232A' }}>{c.authorName}: </strong>
                              <span style={{ color: '#5C434B' }}>{c.content}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddComment(post.id);
                        }}
                        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                      >
                        <input
                          type="text"
                          placeholder="Write a warm, anonymous reply..."
                          value={commentText[post.id] || ''}
                          onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                          style={{
                            flex: 1,
                            padding: '10px 16px',
                            borderRadius: '9999px',
                            border: '1px solid #FAD4DE',
                            fontSize: '0.85rem',
                            outline: 'none'
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            backgroundColor: '#EC738F',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '9999px',
                            padding: '10px 18px',
                            fontSize: '0.825rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Post Reply
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM PAGE DECORATION */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '12px' }}>
          <p
            style={{
              fontFamily: "'Caveat', 'Dancing Script', cursive",
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#EC738F',
              margin: 0,
              transform: 'rotate(-4deg)'
            }}
          >
            Better days are coming ♡
          </p>
        </div>

      </div>

      {/* CREATE POST MODAL */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreatePost={(newP) => setPosts([newP, ...posts])}
      />
    </div>
  );
}
