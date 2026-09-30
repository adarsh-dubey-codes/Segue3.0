import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY_LANG = 'sakhi_cycle_lang_v1';

export const LANGUAGES = {
  en: { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  hi: { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  mr: { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' }
};

export const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cycle': 'My Cycle',
    'nav.chat': 'Talk to Sakhi',
    'nav.lifestyle': 'Eat & Move',
    'nav.products': 'Products',
    'nav.doctors': 'Find Doctor',
    'nav.forum': 'Forum',
    'nav.buddy': 'Cycle Buddy',
    'nav.vibes': 'Good Vibes',

    // Hero & Features
    'hero.title': 'Your cycle. Your body. Your Sakhi.',
    'hero.sub': 'Track your period, understand your feelings, and care for yourself in your language.',
    'hero.setup': 'Set Up My Cycle',
    'hero.chat': 'Talk to Sakhi',
    'hero.visualGuide': 'Visual Guide',

    // Feature Cards (Visual-First Labels)
    'feature.cycle.title': 'My Cycle',
    'feature.cycle.desc': 'Track period, dates & phases',
    'feature.mood.title': 'How I Feel',
    'feature.mood.desc': 'Log mood, cramps & feelings',
    'feature.chat.title': 'Talk to Sakhi',
    'feature.chat.desc': 'Ask anything about your body',
    'feature.eat.title': 'Eat Well',
    'feature.eat.desc': 'Healthy food for your phase',
    'feature.move.title': 'Move & Rest',
    'feature.move.desc': 'Gentle stretch, sleep & care',
    'feature.doctor.title': 'Find a Doctor',
    'feature.doctor.desc': 'Consult female specialists',
    'feature.buddy.title': 'Cycle Buddy',
    'feature.buddy.desc': 'Talk to a supportive sister',
    'feature.vibes.title': 'Good Vibes',
    'feature.vibes.desc': 'Calm music & relaxation',
    'feature.water.title': 'Drink Water',
    'feature.water.desc': 'Stay hydrated daily',

    // Cycle Phases
    'phase.period': 'Period Phase',
    'phase.period.sub': 'Rest & replenish blood',
    'phase.follicular': 'Follicular Phase',
    'phase.follicular.sub': 'Energy rising & new growth',
    'phase.ovulation': 'Ovulation Phase',
    'phase.ovulation.sub': 'Peak strength & confidence',
    'phase.luteal': 'Luteal Phase',
    'phase.luteal.sub': 'Slow down & gentle self-care',

    // Moods
    'mood.happy': 'Happy',
    'mood.okay': 'Okay',
    'mood.neutral': 'Neutral',
    'mood.low': 'Low / Sad',
    'mood.crampy': 'Cramps / Pain',

    // Flow
    'flow.light': 'Light Flow',
    'flow.medium': 'Medium Flow',
    'flow.heavy': 'Heavy Flow',

    // Energy
    'energy.high': 'High Energy',
    'energy.normal': 'Normal Energy',
    'energy.low': 'Low Energy / Rest',

    // Onboarding
    'onboarding.welcome': 'Welcome to Sakhi Cycle',
    'onboarding.welcomeSub': 'A gentle space to understand your cycle without complex text.',
    'onboarding.phaseTitle': 'Your cycle changes in 4 phases',
    'onboarding.phaseSub': 'Period → Growth → Ovulation → Rest.',
    'onboarding.feelTitle': 'Tell Sakhi how you feel',
    'onboarding.feelSub': 'Tap simple faces & icons to record mood and flow.',
    'onboarding.askTitle': 'Ask Sakhi anything',
    'onboarding.askSub': 'Your friendly digital companion is always here to listen.',
    'onboarding.start': 'Start Exploring',
    'onboarding.skip': 'Skip Guide'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.cycle': 'मेरा चक्र',
    'nav.chat': 'सखी से बात करें',
    'nav.lifestyle': 'खान-पान और व्यायाम',
    'nav.products': 'उत्पाद',
    'nav.doctors': 'डॉक्टर',
    'nav.forum': 'फोरम',
    'nav.buddy': 'सखी मित्र',
    'nav.vibes': 'सुकून',

    // Hero & Features
    'hero.title': 'आपका चक्र। आपका शरीर। आपकी सखी।',
    'hero.sub': 'अपनी माहवारी, मनोदशा और सेहत को सरल चित्र भाषा में समझें।',
    'hero.setup': 'चक्र शुरू करें',
    'hero.chat': 'सखी से बात करें',
    'hero.visualGuide': 'चित्र गाइड देखें',

    // Feature Cards
    'feature.cycle.title': 'मेरा चक्र',
    'feature.cycle.desc': 'माहवारी और तारीखें ट्रैक करें',
    'feature.mood.title': 'मैं कैसा महसूस कर रही हूँ',
    'feature.mood.desc': 'मूड, दर्द और भावनाएँ चुनें',
    'feature.chat.title': 'सखी से बात करें',
    'feature.chat.desc': 'शरीर से जुड़ा कोई भी सवाल पूछें',
    'feature.eat.title': 'पौष्टिक आहार',
    'feature.eat.desc': 'साइकिल के अनुसार सही भोजन',
    'feature.move.title': 'व्यायाम और आराम',
    'feature.move.desc': 'हल्का योग और अच्छी नींद',
    'feature.doctor.title': 'डॉक्टर खोजें',
    'feature.doctor.desc': 'महिला विशेषज्ञों से परामर्श लें',
    'feature.buddy.title': 'सखी मित्र',
    'feature.buddy.desc': 'एक सहयोगात्मक बहन से जुड़ें',
    'feature.vibes.title': 'सुकून और संगीत',
    'feature.vibes.desc': 'शांतिदायक संगीत और सांस ध्यान',
    'feature.water.title': 'पानी पिएं',
    'feature.water.desc': 'शरीर में पानी की कमी न होने दें',

    // Cycle Phases
    'phase.period': 'माहवारी चरण',
    'phase.period.sub': 'आराम करें और गरम तरल लें',
    'phase.follicular': 'विकास चरण',
    'phase.follicular.sub': 'ऊर्जा में वृद्धि और ताजगी',
    'phase.ovulation': 'अंडाशय चरण',
    'phase.ovulation.sub': 'उच्चतम ऊर्जा और आत्मविश्वास',
    'phase.luteal': 'विश्राम चरण',
    'phase.luteal.sub': 'धीमी गति और स्वयं की देखभाल',

    // Moods
    'mood.happy': 'खुश',
    'mood.okay': 'ठीक',
    'mood.neutral': 'सामान्य',
    'mood.low': 'उदास',
    'mood.crampy': 'पेट दर्द',

    // Flow
    'flow.light': 'हल्का स्राव',
    'flow.medium': 'मध्यम स्राव',
    'flow.heavy': 'भारी स्राव',

    // Energy
    'energy.high': 'भरपूर ऊर्जा',
    'energy.normal': 'सामान्य ऊर्जा',
    'energy.low': 'थकान / आराम',

    // Onboarding
    'onboarding.welcome': 'सखी साइकिल में आपका स्वागत है',
    'onboarding.welcomeSub': 'बिना कठिन शब्दों के अपने शरीर को आसानी से समझें।',
    'onboarding.phaseTitle': 'माहवारी चक्र 4 चरणों में बदलता है',
    'onboarding.phaseSub': 'माहवारी → विकास → अंडाशय → विश्राम।',
    'onboarding.feelTitle': 'सखी को बताएं आप कैसा महसूस कर रही हैं',
    'onboarding.feelSub': 'सरल चेहरों और चिन्हों पर टैप करके लॉग करें।',
    'onboarding.askTitle': 'सखी से कुछ भी पूछें',
    'onboarding.askSub': 'आपकी डिजिटल दोस्त हमेशा आपकी बात सुनने के लिए तैयार है।',
    'onboarding.start': 'आगे बढ़ें',
    'onboarding.skip': 'छोड़ें'
  },
  mr: {
    // Navigation
    'nav.home': 'मुख्य पृष्ठ',
    'nav.cycle': 'माझं चक्र',
    'nav.chat': 'सखीशी बोला',
    'nav.lifestyle': 'आहार आणि व्यायाम',
    'nav.products': 'उत्पादने',
    'nav.doctors': 'डॉक्टर शोधा',
    'nav.forum': 'चर्चा',
    'nav.buddy': 'सायकल बडी',
    'nav.vibes': 'विश्रांती',

    // Hero & Features
    'hero.title': 'तुमचं चक्र। तुमचं शरीर। तुमची सखी।',
    'hero.sub': 'मासिक पाळी आणि आरोग्याची माहिती सोप्या चित्रांद्वारे समजावून घ्या.',
    'hero.setup': 'सायकल सुरू करा',
    'hero.chat': 'सखीशी बोला',
    'hero.visualGuide': 'चित्र मार्गदर्शक',

    // Feature Cards
    'feature.cycle.title': 'माझं चक्र',
    'feature.cycle.desc': 'पाळीच्या तारखा आणि टप्पे नोंदी',
    'feature.mood.title': 'मला कसं वाटतंय',
    'feature.mood.desc': 'मूड आणि वेदना निवडा',
    'feature.chat.title': 'सखीशी बोला',
    'feature.chat.desc': 'शरीराबद्दल प्रश्न विचारा',
    'feature.eat.title': 'पोषक आहार',
    'feature.eat.desc': 'टप्प्यानुसार योग्य अन्न',
    'feature.move.title': 'व्यायाम व विश्रांती',
    'feature.move.desc': 'हलका व्यायाम आणि शांत झोप',
    'feature.doctor.title': 'डॉक्टर शोधा',
    'feature.doctor.desc': 'स्त्री रोग तज्ज्ञांशी बोला',
    'feature.buddy.title': 'सायकल बडी',
    'feature.buddy.desc': 'मैत्रिणीसोबत संवाद साधा',
    'feature.vibes.title': 'विश्रांती व संगीत',
    'feature.vibes.desc': 'शांत संगीत आणि श्वास ध्यान',
    'feature.water.title': 'पाणी प्या',
    'feature.water.desc': 'रोज पुरेसे पाणी घ्या',

    // Cycle Phases
    'phase.period': 'मासिक पाळीचा टप्पा',
    'phase.period.sub': 'विश्रांती घ्या आणि काळजी घ्या',
    'phase.follicular': 'विकास टप्पा',
    'phase.follicular.sub': 'ऊर्जा वाढ आणि ताजेतवाने वाटणे',
    'phase.ovulation': 'अंडोत्सर्ग टप्पा',
    'phase.ovulation.sub': 'उत्तम ऊर्जा आणि उत्साह',
    'phase.luteal': 'विश्रांती टप्पा',
    'phase.luteal.sub': 'हळूवार काळजी आणि शांतता',

    // Moods
    'mood.happy': 'आनंदी',
    'mood.okay': 'ठीक',
    'mood.neutral': 'सामान्य',
    'mood.low': 'उदास',
    'mood.crampy': 'पोटदुखी',

    // Flow
    'flow.light': 'कमी रक्तस्त्राव',
    'flow.medium': 'मध्यम रक्तस्त्राव',
    'flow.heavy': 'जास्त रक्तस्त्राव',

    // Energy
    'energy.high': 'भरपूर ऊर्जा',
    'energy.normal': 'सामान्य ऊर्जा',
    'energy.low': 'थकवा / विश्रांती',

    // Onboarding
    'onboarding.welcome': 'सखी सायकलमध्ये तुमचे स्वागत आहे',
    'onboarding.welcomeSub': 'सोप्या चित्रांच्या मदतीने स्वतःचे आरोग्य समजावून घ्या.',
    'onboarding.phaseTitle': 'मासिक पाळीचे ४ टप्पे असतात',
    'onboarding.phaseSub': 'पाळी → विकास → अंडोत्सर्ग → विश्रांती.',
    'onboarding.feelTitle': 'तुम्हाला कसं वाटतंय सखीला सांगा',
    'onboarding.feelSub': 'सोप्या चेहऱ्यांवर टॅप करून नोंदवा.',
    'onboarding.askTitle': 'सखीला काहीही विचारा',
    'onboarding.askSub': 'तुमची डिजिटल मैत्रीण नेहमी मदतीसाठी तयार आहे.',
    'onboarding.start': 'सुरू करा',
    'onboarding.skip': 'वगळा'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved && LANGUAGES[saved]) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  const t = (key) => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
