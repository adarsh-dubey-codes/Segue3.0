/**
 * Sakhi Partner Layer - Embeddable Education Widget (Module E)
 * Zero tracking, zero analytics, zero cycle data.
 * Pure HTML/JS educational module partners can embed via iframe or script tag.
 */

import React, { useState } from 'react';

export const EmbedWidgetPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('cycle-basics');
  const [lang, setLang] = useState('hi');

  const topics = {
    'cycle-basics': {
      title: { en: 'Understanding Your Menstrual Cycle', hi: 'अपनी माहवारी चक्र को समझें' },
      icon: '🌸',
      content: {
        en: `
The menstrual cycle is a natural 21 to 35 day biological rhythm governed by natural hormones.
- Day 1: First day of period bleeding.
- Follicular Phase: Body prepares an egg.
- Ovulation: Release of egg around mid-cycle.
- Luteal Phase: Preparing for the next cycle.
        `,
        hi: `
माहवारी चक्र एक स्वाभाविक 21 से 35 दिनों का जैविक चक्र है।
- पहला दिन: माहवारी की शुरुआत।
- फॉलिक्युलर चरण: शरीर अंडाणु तैयार करता है।
- ओव्यूलेशन: चक्र के बीच में अंडाणु का निकलना।
- ल्यूटियल चरण: अगले चक्र की तैयारी।
        `
      }
    },
    'hygiene-tips': {
      title: { en: 'Safe Menstrual Hygiene Practices', hi: 'सुरक्षित स्वच्छता के नियम' },
      icon: '🧼',
      content: {
        en: `
1. Change sanitary pads or clean cloth every 4 to 6 hours.
2. Always wash hands before and after changing.
3. Clean private areas using plain, warm water—avoid harsh soaps.
4. Dispose of used pads wrapped in paper in trash bins.
        `,
        hi: `
1. हर 4 से 6 घंटे में सेनेटरी पैड या साफ कपड़ा बदलें।
2. पैड बदलने से पहले और बाद में हाथ धोएं।
3. केवल साफ पानी से सफाई करें, साबुन का प्रयोग न करें।
4. पुराने पैड को कागज में लपेटकर कचरे के डिब्बे में फेंकें।
        `
      }
    },
    'nutrition-cramps': {
      title: { en: 'Managing Cramps & Diet', hi: 'दर्द और पोषण का ध्यान' },
      icon: '🥑',
      content: {
        en: `
- Eat iron-rich foods like jaggery (gud), spinach, beans, and sesame seeds.
- Stay hydrated with warm water and herbal teas.
- Use a hot water bottle on the lower abdomen to ease muscle cramps.
        `,
        hi: `
- आयरन से भरपूर भोजन जैसे गुड़, पालक, चना और तिल का सेवन करें।
- पर्याप्त मात्रा में गुनगुना पानी पिएं।
- पेट के निचले हिस्से में गर्म पानी की बोतल से सिकाई करें।
        `
      }
    }
  };

  const current = topics[selectedTopic];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 flex flex-col items-center justify-center font-sans">
      {/* Widget Container - Standard Responsive Embed Frame */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Widget Header */}
        <div className="p-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌸</span>
            <div>
              <h3 className="font-bold text-sm">Sakhi Health Education</h3>
              <span className="text-[10px] text-pink-200">Zero Tracking • Embeddable Widget</span>
            </div>
          </div>

          {/* Lang Selector */}
          <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                lang === 'hi' ? 'bg-white text-pink-700' : 'text-white'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                lang === 'en' ? 'bg-white text-pink-700' : 'text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/50">
          {Object.entries(topics).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedTopic(key)}
              className={`flex-1 py-2 text-center text-xs font-semibold border-b-2 transition-all flex items-center justify-center space-x-1 ${
                selectedTopic === key
                  ? 'border-pink-500 text-pink-400 bg-pink-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline text-[11px] truncate">{item.title[lang].split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3 flex-1">
          <h4 className="font-bold text-sm text-pink-400 flex items-center gap-2">
            <span>{current.icon}</span>
            <span>{current.title[lang]}</span>
          </h4>
          <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-line bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            {current.content[lang]}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="p-3 bg-slate-950 text-center text-[10px] text-slate-500 border-t border-slate-800/60 flex items-center justify-between">
          <span>🛡️ No cookies or tracking scripts</span>
          <a
            href="https://sakhi.org"
            target="_blank"
            rel="noreferrer"
            className="text-pink-400 hover:underline"
          >
            Powered by Sakhi
          </a>
        </div>
      </div>

      {/* Embed Code Snippet Copy Helper for NGO Partners */}
      <div className="w-full max-w-md mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
        <h5 className="font-bold text-slate-200 uppercase text-[10px] tracking-wider">
          NGO Embed HTML Code (Copy & Paste to your site)
        </h5>
        <pre className="p-3 bg-black/60 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto select-all">
          {`<iframe src="${window.location.origin}/partner/embed" width="100%" height="450" frameborder="0" style="border-radius:16px; border:none;" title="Sakhi Health Education"></iframe>`}
        </pre>
      </div>
    </div>
  );
};

export default EmbedWidgetPage;
