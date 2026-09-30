import React, { useState } from 'react';
import SakhiChat from '../../components/ai/SakhiChat';
import SakhiCompanionIllustration from '../../components/illustrations/SakhiCompanionIllustration';
import { HealthierYouBanner } from '../../components/illustrations/FloralBannerDecorations';
import { useLanguage } from '../../context/LanguageContext';
import { 
  MessageCircle, Heart, Smile, BarChart2, Sparkles, 
  Leaf, Shield, ChevronRight, Droplet, Utensils, Calendar, Flower2 
} from 'lucide-react';

export default function AIPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('chat');
  const [activePrompt, setActivePrompt] = useState(null);

  const companionNavItems = [
    { id: 'chat', label: t('aiPage.chatNav'), icon: MessageCircle, prompt: null },
    { id: 'health', label: t('aiPage.healthNav'), icon: Heart, prompt: t('aiPage.healthGuidancePrompt', { defaultValue: 'Give me personal health guidance for my current period phase.' }) },
    { id: 'mood', label: t('aiPage.moodNav'), icon: Smile, prompt: t('aiPage.moodSupportPrompt', { defaultValue: 'How can I manage mood swings and emotional shifts during my cycle?' }) },
    { id: 'insights', label: t('aiPage.insightsNav'), icon: BarChart2, prompt: t('aiPage.cycleInsightsPrompt', { defaultValue: 'What are key insights I should track during my cycle?' }) },
    { id: 'ask', label: t('aiPage.askNav'), icon: Sparkles, prompt: t('aiPage.askAnythingPrompt', { defaultValue: 'What are common symptoms women experience during ovulation?' }) }
  ];

  const supportCards = [
    {
      id: 'personalized',
      title: t('aiPage.personalizedTitle'),
      sub: t('aiPage.personalizedSub'),
      icon: Heart,
      iconBg: '#FFE5EC',
      iconColor: '#EC738F',
      prompt: 'How does Sakhi personalize health guidance based on cycle phases?'
    },
    {
      id: 'lifestyle',
      title: t('aiPage.lifestyleTitle'),
      sub: t('aiPage.lifestyleSub'),
      icon: Leaf,
      iconBg: '#E6F4EA',
      iconColor: '#34A853',
      prompt: 'What are gentle workouts and self-care foods for period days?'
    },
    {
      id: 'emotional',
      title: t('aiPage.emotionalTitle'),
      sub: t('aiPage.emotionalSub'),
      icon: Smile,
      iconBg: '#FEF7E0',
      iconColor: '#FB8C00',
      prompt: 'I feel anxious and exhausted today. What emotional self-care tips do you have?'
    },
    {
      id: 'privacy',
      title: t('aiPage.privacyTitle'),
      sub: t('aiPage.privacySub'),
      icon: Shield,
      iconBg: '#EEF2FF',
      iconColor: '#6366F1',
      prompt: 'How is my health and cycle data kept private in Sakhi?'
    }
  ];

  const popularTopics = [
    {
      id: 'pain',
      title: t('aiPage.painTopic'),
      sub: t('aiPage.painTopicSub'),
      icon: Droplet,
      bgColor: '#FFF0F4',
      borderColor: '#FAD4DE',
      iconBg: '#FFE5EC',
      iconColor: '#EC738F',
      prompt: 'How can I relieve period cramps naturally at home?'
    },
    {
      id: 'food',
      title: t('aiPage.foodTopic'),
      sub: t('aiPage.foodTopicSub'),
      icon: Utensils,
      bgColor: '#FFF8F0',
      borderColor: '#FFE4C4',
      iconBg: '#FFEBD6',
      iconColor: '#F97316',
      prompt: 'What nutritious foods should I eat to reduce fatigue during periods?'
    },
    {
      id: 'mood_topic',
      title: t('aiPage.moodTopic'),
      sub: t('aiPage.moodTopicSub'),
      icon: Smile,
      bgColor: '#FAF5FF',
      borderColor: '#E9D5FF',
      iconBg: '#F3E8FF',
      iconColor: '#A855F7',
      prompt: 'Why do energy levels drop before periods and how to boost energy?'
    },
    {
      id: 'cycle_q',
      title: t('aiPage.cycleTopic'),
      sub: t('aiPage.cycleTopicSub'),
      icon: Calendar,
      bgColor: '#F0FDF4',
      borderColor: '#BBF7D0',
      iconBg: '#DCFCE7',
      iconColor: '#22C55E',
      prompt: 'Is it normal if my period length varies by 3 to 4 days?'
    },
    {
      id: 'mental',
      title: t('aiPage.mentalTopic'),
      sub: t('aiPage.mentalTopicSub'),
      icon: Flower2,
      bgColor: '#F0F9FF',
      borderColor: '#BAE6FD',
      iconBg: '#E0F2FE',
      iconColor: '#0EA5E9',
      prompt: 'What mindfulness or breathing exercises help PMS anxiety?'
    }
  ];

  const handleNavClick = (item) => {
    setActiveTab(item.id);
    if (item.prompt) {
      setActivePrompt(item.prompt);
    }
  };

  const handleSupportClick = (card) => {
    setActivePrompt(card.prompt);
  };

  const handleTopicClick = (topic) => {
    setActivePrompt(topic.prompt);
  };

  return (
    <div
      style={{
        backgroundColor: '#FDF3F5',
        backgroundImage: 'radial-gradient(ellipse at 10% 0%, #FFEBF0 0%, #FDF3F5 60%, #FAF0F4 100%)',
        minHeight: 'calc(100vh - 80px)',
        padding: '24px 24px 60px 24px'
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Main 3-Column Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px minmax(0, 1fr) 280px',
            gap: '24px',
            alignItems: 'stretch'
          }}
          className="sakhi-ai-grid"
        >
          <style>{`
            @media (max-width: 1120px) {
              .sakhi-ai-grid {
                grid-template-columns: 240px minmax(0, 1fr) !important;
              }
              .sakhi-support-sidebar {
                grid-column: span 2;
              }
            }
            @media (max-width: 840px) {
              .sakhi-ai-grid {
                grid-template-columns: 1fr !important;
              }
              .sakhi-support-sidebar {
                grid-column: span 1;
              }
            }
          `}</style>

          {/* LEFT SIDEBAR: "Sakhi Companion" */}
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #FAD4DE',
              boxShadow: '0 8px 24px rgba(236, 115, 143, 0.06)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px'
            }}
          >
            <div>
              {/* Header Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Sparkles size={18} color="#EC738F" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    color: '#3E242B',
                    margin: 0
                  }}
                >
                  {t('aiPage.companionTitle')}
                </h3>
              </div>

              {/* Navigation List */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {companionNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '9999px',
                        border: isActive ? '1px solid #FAD4DE' : '1px solid transparent',
                        backgroundColor: isActive ? '#FFEBF0' : 'transparent',
                        color: isActive ? '#D9486D' : '#5C434B',
                        fontWeight: isActive ? '600' : '500',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = '#FFF5F8';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon size={18} color={isActive ? '#EC738F' : '#7D626C'} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Cursive Text & Artwork Illustration */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
              <p
                style={{
                  fontFamily: "'Caveat', 'Dancing Script', cursive",
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  color: '#EC738F',
                  margin: 0,
                  transform: 'rotate(-3deg)',
                  lineHeight: 1.2
                }}
              >
                {t('aiPage.notAloneText')}
              </p>

              {/* Girl holding heart illustration */}
              <div style={{ marginTop: '8px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SakhiCompanionIllustration width={210} height={200} />
              </div>
            </div>
          </aside>

          {/* MIDDLE COLUMN: Main Sakhi AI Chat Box */}
          <main style={{ minWidth: 0 }}>
            <SakhiChat activePrompt={activePrompt} onSelectPrompt={setActivePrompt} />
          </main>

          {/* RIGHT SIDEBAR: "Sakhi's Support" */}
          <aside
            className="sakhi-support-sidebar"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {/* Sakhi's Support Cards Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid #FAD4DE',
                boxShadow: '0 8px 24px rgba(236, 115, 143, 0.06)',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Header Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Sparkles size={18} color="#EC738F" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    color: '#3E242B',
                    margin: 0
                  }}
                >
                  {t('aiPage.supportTitle')}
                </h3>
              </div>

              {/* 4 Feature Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {supportCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSupportClick(card)}
                      style={{
                        width: '100%',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #FAD4DE',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = '#EC738F';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(236, 115, 143, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = '#FAD4DE';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            backgroundColor: card.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Icon size={18} color={card.iconColor} />
                        </div>
                        <div>
                          <h4
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: '#38232A',
                              margin: 0
                            }}
                          >
                            {card.title}
                          </h4>
                          <p
                            style={{
                              fontSize: '0.75rem',
                              color: '#7D626C',
                              margin: '2px 0 0 0'
                            }}
                          >
                            {card.sub}
                          </p>
                        </div>
                      </div>

                      <ChevronRight size={16} color="#9E828C" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Promo Banner Card */}
            <HealthierYouBanner />
          </aside>
        </div>

        {/* BOTTOM SECTION: "Popular Topics" */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #FAD4DE',
            boxShadow: '0 8px 24px rgba(236, 115, 143, 0.06)',
            padding: '24px 28px'
          }}
        >
          {/* Section Header */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#EC738F' }}>✦</span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#3E242B',
                  margin: 0
                }}
              >
                {t('aiPage.popularTopicsTitle')} <span style={{ color: '#EC738F' }}>✦</span>
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#7D626C', margin: '4px 0 0 0' }}>
              {t('aiPage.popularTopicsSub')}
            </p>
          </div>

          {/* 5 Topic Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px'
            }}
          >
            {popularTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleTopicClick(topic)}
                  style={{
                    backgroundColor: topic.bgColor,
                    border: `1px solid ${topic.borderColor}`,
                    borderRadius: '20px',
                    padding: '16px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: topic.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Icon size={20} color={topic.iconColor} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          color: '#38232A',
                          margin: 0
                        }}
                      >
                        {topic.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: '#7D626C',
                          margin: '2px 0 0 0'
                        }}
                      >
                        {topic.sub}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={18} color="#9E828C" />
                </button>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
