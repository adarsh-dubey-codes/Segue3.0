/**
 * Sakhi Partner Layer - Field Worker Training Service (Module D)
 * Handles offline training lessons, quiz validation, progress tracking, and certificate generation.
 */

const TRAINING_PROGRESS_KEY = 'sakhi_field_worker_training_progress';
const CERTIFICATE_KEY = 'sakhi_field_worker_certificates';

export const TRAINING_LESSONS = [
  {
    id: 'lesson-1',
    title: {
      en: '1. Introduction to Menstrual Health & Hygiene',
      hi: '1. माहवारी स्वास्थ्य और स्वच्छता का परिचय'
    },
    durationMinutes: 5,
    icon: '🌸',
    summary: {
      en: 'Understanding biological cycle basics, breaking taboos, and promoting dignity in rural communities.',
      hi: 'जैविक चक्र की बुनियादी बातें, सामाजिक रूढ़ियों को तोड़ना और ग्रामीण समुदायों में गरिमा को बढ़ावा देना।'
    },
    content: {
      en: `
### Key Principles
* **Biological Reality**: Menstruation is a natural, biological process experienced by millions of young girls.
* **Hygiene Practices**: Use clean, dry cotton pads or reusable cloths washed in clean water and dried under sunlight.
* **Dignity & Normalization**: No girl should miss school or feel ashamed during her cycle.

### Field Worker Checklist
1. Speak in a gentle, non-judgmental tone.
2. Address myths (e.g., touching pickles or entering kitchens) with science and empathy.
3. Ensure access to safe disposal methods or washing techniques.
      `,
      hi: `
### मुख्य सिद्धांत
* **जैविक वास्तविकता**: माहवारी एक प्राकृतिक और सामान्य शारीरिक प्रक्रिया है।
* **स्वच्छता आदतें**: साफ, सूखे कॉटन पैड या साफ पानी में धोकर धूप में सुखाए गए कपड़ों का उपयोग करें।
* **गरिमा और स्वाभिमान**: माहवारी के दौरान किसी भी लड़की को स्कूल छोड़ने या शर्मिंदा महसूस नहीं करना चाहिए।

### क्षेत्र कार्यकर्ता (Field Worker) की सूची
1. विनम्र और संवेदनशील भाषा का प्रयोग करें।
2. वैज्ञानिक तथ्यों के साथ भ्रांतियों और अंधविश्वासों को दूर करें।
3. सुरक्षित निपटान या धोने के तरीकों की जानकारी दें।
      `
    },
    audioPrompt: {
      en: 'Menstruation is a natural biological process. Speak with empathy and promote clean hygiene practices.',
      hi: 'माहवारी एक प्राकृतिक प्रक्रिया है। संवेदनशीलता से बात करें और स्वच्छता के तरीकों को समझाएं।'
    }
  },
  {
    id: 'lesson-2',
    title: {
      en: '2. Explaining Dual Consent (Teen + Parent)',
      hi: '2. दोहरा सहमति तंत्र (किशोर और अभिभावक)'
    },
    durationMinutes: 7,
    icon: '🤝',
    summary: {
      en: 'How to clearly explain program opt-in, parent/guardian approval, and voluntary exit rights.',
      hi: 'कार्यक्रम में शामिल होने, अभिभावक की अनुमति और अपनी इच्छा से बाहर निकलने के अधिकारों को स्पष्ट करना।'
    },
    content: {
      en: `
### Dual Consent Framework
* **Teen Opt-In**: The adolescent girl must voluntarily choose to join the partner program.
* **Parent/Guardian Consent**: A parent or guardian must be informed and explicitly approve participation.
* **Right to Withdraw**: The teen or parent can leave the program at ANY time with zero questions asked.

### How to Communicate in Field Meetings
1. **Explain the Purpose**: The program provides free health awareness and pad distribution tracking.
2. **Emphasize Choice**: Joining is 100% voluntary. No school or SHG benefit depends on joining.
3. **Show how withdrawal works**: Single tap in app profile under "Partner Program" to leave.
      `,
      hi: `
### दोहरा सहमति तंत्र
* **किशोरी की सहमति**: किशोरी अपनी मर्जी से कार्यक्रम में शामिल होने का विकल्प चुनती है।
* **अभिभावक की सहमति**: माता-पिता या अभिभावक को पूरी जानकारी दी जाती है और उनकी लिखित/डिजिटल अनुमति ली जाती है।
* **बाहर निकलने का अधिकार**: किशोरी या अभिभावक किसी भी समय बिना किसी रोक-टोक के कार्यक्रम छोड़ सकते हैं।

### फील्ड बैठकों में बातचीत का तरीका
1. **उद्देश्य समझाएं**: कार्यक्रम का उद्देश्य स्वास्थ्य जागरूकता और सहायता प्रदान करना है।
2. **इच्छा पर जोर दें**: शामिल होना 100% स्वैच्छिक है।
3. **बाहर निकलने की प्रक्रिया दिखाएं**: ऐप के प्रोफाइल सेक्शन से एक क्लिक में बाहर निकला जा सकता है।
      `
    },
    audioPrompt: {
      en: 'Both teen and parent must consent. Anyone can leave at any time without penalty.',
      hi: 'किशोरी और अभिभावक दोनों की सहमति जरूरी है। कोई भी कभी भी कार्यक्रम छोड़ सकता है।'
    }
  },
  {
    id: 'lesson-3',
    title: {
      en: '3. Data Privacy & App Safety Architecture',
      hi: '3. डेटा गोपनीयता और ऐप सुरक्षा ढांचा'
    },
    durationMinutes: 6,
    icon: '🛡️',
    summary: {
      en: 'What Sakhi collects, what is NEVER shared, and how the 20+ group aggregate suppression works.',
      hi: 'सखी क्या डेटा एकत्र करता है, क्या कभी साझा नहीं किया जाता, और 20+ समूह एकत्रीकरण नियम कैसे काम करता है।'
    },
    content: {
      en: `
### Non-Negotiable Privacy Directives
* **Zero Cycle Data Leakage**: Partners (NGOs, SHGs, Government) NEVER see individual cycle dates, flow severity, or symptoms.
* **No Personal Names**: Partner dashboards only show aggregated statistics (e.g., active users, completed education modules).
* **Minimum Group Size = 20**: If a village or school group has fewer than 20 enrolled members, stats are SUPPRESSED (hidden) to protect privacy.
* **Zero Commercial Data Sharing**: No cycle data is EVER provided to commercial or e-commerce entities.

### Answering Parent Questions
* *"Will anyone know when my daughter has her period?"* -> **No.** Cycle data stays strictly on her phone.
* *"What does the NGO see?"* -> **Only overall counts** (e.g., "45 girls completed the hygiene lesson in Village X").
      `,
      hi: `
### डेटा गोपनीयता के सख्त नियम
* **कोई व्यक्तिगत साइकिल डेटा नहीं**: संस्थाओं (NGO/SHG) को कभी भी किसी लड़की की पीरियड तारीखें या व्यक्तिगत जानकारी नहीं दिखती।
* **कोई नाम नहीं**: डैशबोर्ड पर केवल कुल आंकड़े दिखाई देते हैं।
* **न्यूनतम 20 सदस्यों का नियम**: यदि किसी गांव या समूह में 20 से कम लड़कियां हैं, तो गोपनीयता बनाए रखने के लिए आंकड़े छिपा दिए जाते हैं।
* **कोई व्यावसायिक शेयरिंग नहीं**: व्यापारिक या वाणिज्यिक कंपनियों को डेटा कभी नहीं भेजा जाता।
      `
    },
    audioPrompt: {
      en: 'Individual cycle dates are never shared with anyone. Minimum group size of 20 protects anonymity.',
      hi: 'व्यक्तिगत साइकिल की जानकारी किसी के साथ शेयर नहीं की जाती। 20 सदस्यों से छोटे समूहों का डेटा गुप्त रहता है।'
    }
  }
];

export const TRAINING_QUIZ = [
  {
    id: 'q1',
    question: {
      en: 'Can a field worker or NGO admin see an individual girl’s period dates?',
      hi: 'क्या कोई फील्ड कार्यकर्ता या एनजीओ एडमिन किसी लड़की की पीरियड की तारीखें देख सकता है?'
    },
    options: [
      { id: 'a', text: { en: 'Yes, if she joined the program', hi: 'हां, अगर वह कार्यक्रम में शामिल हुई है' } },
      { id: 'b', text: { en: 'No, individual cycle data is NEVER shared with partners', hi: 'नहीं, व्यक्तिगत चक्र डेटा कभी भी पार्टनर के साथ साझा नहीं किया जाता' }, correct: true },
      { id: 'c', text: { en: 'Only with parent permission', hi: 'केवल माता-पिता की अनुमति से' } }
    ]
  },
  {
    id: 'q2',
    question: {
      en: 'What happens if a program group in a village has only 12 active users?',
      hi: 'यदि किसी गांव में कार्यक्रम समूह में केवल 12 सक्रिय उपयोगकर्ता हैं तो क्या होगा?'
    },
    options: [
      { id: 'a', text: { en: 'Stats are shown normally', hi: 'आंकड़े सामान्य रूप से दिखाए जाते हैं' } },
      { id: 'b', text: { en: 'Stats are SUPPRESSED because group size is less than 20', hi: 'आंकड़े रोक दिए (SUPPRESSED) जाते हैं क्योंकि समूह 20 से कम है' }, correct: true },
      { id: 'c', text: { en: 'Names are displayed instead', hi: 'इसके बजाय नाम प्रदर्शित किए जाते हैं' } }
    ]
  },
  {
    id: 'q3',
    question: {
      en: 'Who must consent before a adolescent girl joins a partner program?',
      hi: 'किसी किशोरी के पार्टनर कार्यक्रम में शामिल होने से पहले किसकी सहमति आवश्यक है?'
    },
    options: [
      { id: 'a', text: { en: 'Teenager only', hi: 'केवल किशोरी' } },
      { id: 'b', text: { en: 'Parent only', hi: 'केवल माता-पिता' } },
      { id: 'c', text: { en: 'Both Teen Opt-In AND Parent Consent', hi: 'किशोरी और माता-पिता दोनों की सहमति' }, correct: true }
    ]
  }
];

class FieldWorkerTrainingService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    if (!localStorage.getItem(TRAINING_PROGRESS_KEY)) {
      localStorage.setItem(TRAINING_PROGRESS_KEY, JSON.stringify({
        completedLessons: [],
        quizScore: 0,
        completedAt: null
      }));
    }
    if (!localStorage.getItem(CERTIFICATE_KEY)) {
      localStorage.setItem(CERTIFICATE_KEY, JSON.stringify([]));
    }
  }

  getProgress() {
    try {
      return JSON.parse(localStorage.getItem(TRAINING_PROGRESS_KEY)) || {
        completedLessons: [],
        quizScore: 0,
        completedAt: null
      };
    } catch {
      return { completedLessons: [], quizScore: 0, completedAt: null };
    }
  }

  markLessonComplete(lessonId) {
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      localStorage.setItem(TRAINING_PROGRESS_KEY, JSON.stringify(progress));
    }
    return progress;
  }

  submitQuiz(answers, workerDetails = { name: 'Field Worker', org: 'Sakhi Partner NGO' }) {
    let score = 0;
    TRAINING_QUIZ.forEach(q => {
      const correctOpt = q.options.find(o => o.correct)?.id;
      if (answers[q.id] === correctOpt) {
        score += 1;
      }
    });

    const isPassed = score === TRAINING_QUIZ.length;
    const progress = this.getProgress();

    if (isPassed) {
      progress.quizScore = score;
      progress.completedAt = new Date().toISOString();
      localStorage.setItem(TRAINING_PROGRESS_KEY, JSON.stringify(progress));

      // Issue Certificate
      const certificate = this.issueCertificate(workerDetails);
      return { success: true, score, certificate, message: 'Passed training!' };
    }

    return {
      success: false,
      score,
      total: TRAINING_QUIZ.length,
      message: 'Score 100% required to obtain Field Worker Privacy Certification.'
    };
  }

  issueCertificate(workerDetails) {
    const certs = JSON.parse(localStorage.getItem(CERTIFICATE_KEY)) || [];
    const certId = `SAKHI-CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const newCert = {
      certificateId: certId,
      workerName: workerDetails.name || 'Certified Field Champion',
      organization: workerDetails.org || 'Rural Health Initiative',
      issuedAt: new Date().toISOString(),
      modulesCovered: ['Menstrual Health Basics', 'Dual Consent Verification', '20+ Privacy Suppression'],
      verificationUrl: `https://sakhi.org/verify-cert/${certId}`
    };

    certs.push(newCert);
    localStorage.setItem(CERTIFICATE_KEY, JSON.stringify(certs));
    return newCert;
  }

  getCertificates() {
    try {
      return JSON.parse(localStorage.getItem(CERTIFICATE_KEY)) || [];
    } catch {
      return [];
    }
  }
}

export const fieldWorkerTrainingService = new FieldWorkerTrainingService();
export default fieldWorkerTrainingService;
