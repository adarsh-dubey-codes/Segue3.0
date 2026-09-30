import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Play, Video, Sparkles, Filter, Globe, Heart, ShieldCheck, 
  Clock, X, CheckCircle2, Tv, ExternalLink, HelpCircle
} from 'lucide-react';

export default function SakhiVideosPage() {
  const { t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState('all'); // 'all', 'en', 'hi'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'products', 'pain', 'hygiene'
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const videoTutorials = [
    {
      id: 'v1',
      title: 'How to Use a Menstrual Cup: In-Depth Step-by-Step Beginners Guide',
      titleHindi: 'मेंस्ट्रुअल कप का इस्तेमाल कैसे करें? संपूर्ण गाइड',
      desc: 'Comprehensive visual guide on folding, inserting, removing, and sanitizing a menstrual cup safely without leakage.',
      youtubeId: 'sM1jqxzv1WI',
      language: 'en',
      langLabel: 'English 🇬🇧',
      category: 'products',
      categoryLabel: 'Product Tutorial',
      duration: '5:24 min',
      expert: 'AllMatters Health Team',
      thumbnail: 'https://img.youtube.com/vi/sM1jqxzv1WI/hqdefault.jpg',
      tag: 'Beginners Guide'
    },
    {
      id: 'v2',
      title: 'पीरियड कप कैसे यूज़ करें? (Step-by-Step Tutorial in Hindi)',
      titleHindi: 'मेंस्ट्रुअल कप का सही तरीका और साफ़ सफाई',
      desc: 'हिंदी में समझें मेंस्ट्रुअल कप को फोल्ड करने, डालने और साफ़ रखने का सही और सुरक्षित तरीका।',
      youtubeId: '0kF5_c5Zz_M',
      language: 'hi',
      langLabel: 'Hindi (हिंदी) 🇮🇳',
      category: 'products',
      categoryLabel: 'Product Tutorial',
      duration: '8:15 min',
      expert: 'Dr. Sneha (Gynecologist)',
      thumbnail: 'https://img.youtube.com/vi/0kF5_c5Zz_M/hqdefault.jpg',
      tag: 'Hindi Tutorial'
    },
    {
      id: 'v3',
      title: 'Yoga For Women: Period Cramp & Lower Back Pain Relief',
      titleHindi: 'पीरियड के दर्द से तुरंत राहत के लिए योग',
      desc: 'Gentle, restorative yoga postures to relax pelvic tension, ease uterine cramping, and soothe lower back stiffness.',
      youtubeId: 'aLkszgdFGro',
      language: 'en',
      langLabel: 'English 🇬🇧',
      category: 'pain',
      categoryLabel: 'Cramp & Pain Relief',
      duration: '15:20 min',
      expert: 'Yoga With Adriene',
      thumbnail: 'https://img.youtube.com/vi/aLkszgdFGro/hqdefault.jpg',
      tag: 'Instant Cramp Relief'
    },
    {
      id: 'v4',
      title: 'मेंस्ट्रुअल कप को साफ और स्टरलाइज़ कैसे करें? (Hindi Sterilization)',
      titleHindi: 'पीरियड कप की सफाई और हाइजीन गाइड',
      desc: 'मेंस्ट्रुअल कप को इस्तेमाल से पहले और बाद में उबलते पानी में स्टरलाइज़ करने का सही तरीका।',
      youtubeId: 'r0fN-O-uXhE',
      language: 'hi',
      langLabel: 'Hindi (हिंदी) 🇮🇳',
      category: 'hygiene',
      categoryLabel: 'Hygiene & Sterilization',
      duration: '6:40 min',
      expert: 'Sakhi Hygiene Experts',
      thumbnail: 'https://img.youtube.com/vi/r0fN-O-uXhE/hqdefault.jpg',
      tag: 'Sterilization Ritual'
    },
    {
      id: 'v5',
      title: 'The Right Way to Use and Dispose of a Sanitary Pad',
      titleHindi: 'सैनिटरी पैड का सही उपयोग और डिस्पोज़ल गाइड',
      desc: 'Step-by-step guidance on unwrapping, placing, securing wings, and hygienic disposal of sanitary napkins.',
      youtubeId: 'kYJzXv-K_Z8',
      language: 'en',
      langLabel: 'English 🇬🇧',
      category: 'products',
      categoryLabel: 'Product Tutorial',
      duration: '4:15 min',
      expert: 'Carmesi Women Care',
      thumbnail: 'https://img.youtube.com/vi/kYJzXv-K_Z8/hqdefault.jpg',
      tag: 'Pad Usage & Disposal'
    },
    {
      id: 'v6',
      title: 'सैनिटरी पैड्स और डिस्पोजेबल हाइजीन सही तरीका (Period Hygiene in Hindi)',
      titleHindi: 'पीरियड हाइजीन और संक्रमण से बचाव की जानकारी',
      desc: 'पैड कितने घंटे बाद बदलें? दाने और रैशेज से बचने के लिए जरुरी हाइजीन टिप्स।',
      youtubeId: '5rY7H7t1Z-o',
      language: 'hi',
      langLabel: 'Hindi (हिंदी) 🇮🇳',
      category: 'hygiene',
      categoryLabel: 'Hygiene & Safety',
      duration: '5:45 min',
      expert: 'Clovia Gal Pal Health',
      thumbnail: 'https://img.youtube.com/vi/5rY7H7t1Z-o/hqdefault.jpg',
      tag: 'Hygiene Essential'
    },
    {
      id: 'v7',
      title: 'मेंस्ट्रूअल कप क्या है और इसे कैसे पहनें? (Complete Hindi Guide)',
      titleHindi: 'मेंस्ट्रुअल कप की विस्तृत जानकारी हिंदी में',
      desc: 'मेंस्ट्रुअल कप का साइज कैसे चुनें, पहली बार इस्तेमाल में दर्द न हो इसके लिए जरूरी बातें।',
      youtubeId: 'N6Yl_kXf12c',
      language: 'hi',
      langLabel: 'Hindi (हिंदी) 🇮🇳',
      category: 'products',
      categoryLabel: 'Product Tutorial',
      duration: '7:50 min',
      expert: 'Dr. Rhythm Agarwal (Gynac Care)',
      thumbnail: 'https://img.youtube.com/vi/N6Yl_kXf12c/hqdefault.jpg',
      tag: 'Full Hindi Guide'
    }
  ];

  // Filtered video list
  const filteredVideos = videoTutorials.filter((v) => {
    const matchLang = selectedLang === 'all' || v.language === selectedLang;
    const matchCat = selectedCategory === 'all' || v.category === selectedCategory;
    return matchLang && matchCat;
  });

  return (
    <div style={{ backgroundColor: '#FFF7F9', minHeight: '100vh', padding: '32px 20px 80px' }}>
      <style>{`
        .sakhi-videos-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .video-card {
          background-color: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(250, 212, 222, 0.7);
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(185, 52, 93, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(185, 52, 93, 0.14);
        }

        .filter-pill-btn {
          background: #FFFFFF;
          border: 1.5px solid #FAD4DE;
          color: #7D626C;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .filter-pill-btn:hover {
          border-color: #B9345D;
          color: #B9345D;
          background-color: #FFF0F4;
        }

        .filter-pill-btn.active {
          background-color: #B9345D;
          color: #FFFFFF !important;
          border-color: #B9345D;
          box-shadow: 0 4px 14px rgba(185, 52, 93, 0.3);
        }

        /* Modal Overlay */
        .video-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background-color: rgba(40, 24, 30, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease-out;
        }

        .video-modal-content {
          width: 100%;
          max-width: 860px;
          background-color: #FFFFFF;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          position: relative;
        }

        .iframe-container {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          height: 0;
          overflow: hidden;
          background-color: #000;
        }

        .iframe-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>

      <div className="sakhi-videos-container">
        
        {/* Banner Section */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '40px',
            border: '1.5px solid rgba(250, 212, 222, 0.8)',
            boxShadow: '0 10px 30px rgba(185, 52, 93, 0.06)',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '50px', backgroundColor: '#FFEBF0', color: '#B9345D', fontSize: '0.85rem', fontWeight: '700', marginBottom: '12px' }}>
              <Tv size={16} />
              <span>SAKHI DOCTOR VIDEO TUTORIALS</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#3E242B', fontWeight: '700', marginBottom: '8px' }}>
              Product Tutorials & Pain Relief Videos
            </h1>
            <p style={{ color: '#7D626C', fontSize: '1.05rem', maxWidth: '680px', lineHeight: 1.6, margin: 0 }}>
              Doctor-backed video guides on menstrual cup usage, pad hygiene, pain relief yoga, and acupressure rituals — available in both **Hindi (हिंदी)** and **English**.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFF0F4', padding: '16px 24px', borderRadius: '20px', textAlign: 'center', border: '1px solid #FAD4DE' }}>
              <div style={{ fontSize: '0.8rem', color: '#7D626C', fontWeight: '600' }}>Bilingual Guidance</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#B9345D' }}>Hindi & English 🇮🇳🇬🇧</div>
            </div>
          </div>
        </div>

        {/* Filter Controls (Language & Category) */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px 24px', borderRadius: '20px', border: '1px solid rgba(250, 212, 222, 0.7)', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Language Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '700', color: '#3E242B', minWidth: '130px' }}>
              <Globe size={18} color="#B9345D" />
              <span>Language:</span>
            </div>
            <button 
              className={`filter-pill-btn ${selectedLang === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLang('all')}
            >
              All Languages
            </button>
            <button 
              className={`filter-pill-btn ${selectedLang === 'hi' ? 'active' : ''}`}
              onClick={() => setSelectedLang('hi')}
            >
              Hindi (हिंदी) 🇮🇳
            </button>
            <button 
              className={`filter-pill-btn ${selectedLang === 'en' ? 'active' : ''}`}
              onClick={() => setSelectedLang('en')}
            >
              English 🇬🇧
            </button>
          </div>

          <div style={{ height: '1px', backgroundColor: '#FAD4DE', opacity: 0.6 }} />

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '700', color: '#3E242B', minWidth: '130px' }}>
              <Filter size={18} color="#B9345D" />
              <span>Topic:</span>
            </div>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Topics
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'products' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('products')}
            >
              Product Tutorials 🛍️
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'pain' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('pain')}
            >
              Cramp & Pain Relief 🧘‍♀️
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'hygiene' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('hygiene')}
            >
              Hygiene & Safety 🌸
            </button>
          </div>

        </div>

        {/* Video Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-card">
              
              {/* Thumbnail Container with Play Overlay */}
              <div 
                style={{ position: 'relative', height: '200px', cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => setActiveVideoModal(video)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(62, 36, 43, 0.35)', transition: 'background-color 0.2s ease' }} />
                
                {/* Play Button Icon */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#B9345D',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(185, 52, 93, 0.5)',
                    paddingLeft: '4px'
                  }}
                >
                  <Play size={24} fill="#FFFFFF" color="#FFFFFF" />
                </div>

                {/* Duration Badge */}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.75)', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>{video.duration}</span>
                </div>

                {/* Language Tag */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: video.language === 'hi' ? '#B9345D' : '#1E40AF', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '50px' }}>
                  {video.langLabel}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#B9345D', backgroundColor: '#FFEBF0', padding: '3px 10px', borderRadius: '50px' }}>
                      {video.categoryLabel}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#7D626C', fontWeight: '600' }}>
                      • {video.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#3E242B', lineHeight: 1.4, marginBottom: '8px' }}>
                    {video.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#7D626C', lineHeight: 1.5, marginBottom: '16px' }}>
                    {video.desc}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #FAD4DE', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#2E7D32', fontWeight: '600' }}>
                    <ShieldCheck size={16} />
                    <span>{video.expert}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(video)}
                    style={{
                      backgroundColor: '#B9345D',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Watch Now</span>
                    <Play size={12} fill="#FFFFFF" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ padding: '16px 24px', backgroundColor: '#3E242B', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#FFD1DC', fontWeight: '700', textTransform: 'uppercase' }}>
                  {activeVideoModal.langLabel} • {activeVideoModal.categoryLabel}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '2px 0 0', color: '#FFFFFF' }}>
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '4px' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Responsive YouTube Iframe */}
            <div className="iframe-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer info */}
            <div style={{ padding: '20px 24px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#2E7D32', fontWeight: '700' }}>
                <CheckCircle2 size={18} />
                <span>Verified Expert: {activeVideoModal.expert}</span>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#B9345D', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Open in YouTube</span>
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
