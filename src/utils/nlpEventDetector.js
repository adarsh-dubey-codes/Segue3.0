/**
 * Sakhi Natural Language Processing Event Detector
 * Parses user chat/voice messages to detect potential personal cycle events
 * and suggests structured events with user confirmation.
 */

export const CATEGORIES = {
  HEALTH: 'health',
  MEDICATION: 'medication',
  SYMPTOMS: 'symptoms',
  LIFESTYLE: 'lifestyle',
  STRESS: 'mental',
  REPRODUCTIVE: 'reproductive',
  MEDICAL: 'medical',
  PERSONAL: 'personal'
};

const EVENT_PATTERNS = [
  // Health / Illness
  {
    category: CATEGORIES.HEALTH,
    type: 'fever',
    titleKey: 'events.types.fever',
    defaultTitle: 'Fever',
    keywords: ['fever', 'feverish', 'high temp', 'temperature', 'bukhar', 'बुखार', 'तापमान', 'bukhar hai']
  },
  {
    category: CATEGORIES.HEALTH,
    type: 'cold_flu',
    titleKey: 'events.types.coldFlu',
    defaultTitle: 'Cold / Flu',
    keywords: ['cold', 'flu', 'sneeze', 'runny nose', 'sardi', 'जुकाम', 'सर्दी', 'खांसी', 'cough']
  },
  {
    category: CATEGORIES.HEALTH,
    type: 'infection',
    titleKey: 'events.types.infection',
    defaultTitle: 'Infection / Illness',
    keywords: ['infection', 'stomach bug', 'sick', 'unwell', 'bimar', 'बीमार', 'संक्रमण', 'stomach upset']
  },

  // Medication
  {
    category: CATEGORIES.MEDICATION,
    type: 'medication_taken',
    titleKey: 'events.types.medicationTaken',
    defaultTitle: 'Medication Taken',
    keywords: ['medicine', 'medication', 'pill', 'antibiotic', 'paracetamol', 'crocin', 'dawa', 'dawai', 'दवा', 'दवाई', 'took medicine', 'started medicine', 'new medicine']
  },
  {
    category: CATEGORIES.MEDICATION,
    type: 'supplement',
    titleKey: 'events.types.supplement',
    defaultTitle: 'Supplement / Vitamin',
    keywords: ['vitamin', 'supplement', 'iron tablet', 'folic acid', 'multivitamin']
  },

  // Lifestyle / Sleep / Stress
  {
    category: CATEGORIES.LIFESTYLE,
    type: 'poor_sleep',
    titleKey: 'events.types.poorSleep',
    defaultTitle: 'Poor Sleep',
    keywords: ['barely slept', 'poor sleep', 'insomnia', 'couldn\'t sleep', 'less sleep', 'sleepless', 'neend nahi aayi', 'कम नींद', 'नींद', 'tired today']
  },
  {
    category: CATEGORIES.STRESS,
    type: 'stressful_day',
    titleKey: 'events.types.stressfulDay',
    defaultTitle: 'Stressful Day',
    keywords: ['stress', 'stressful', 'anxiety', 'anxious', 'work pressure', 'exam stress', 'tanav', 'तनाव', 'चिंता', 'overwhelmed']
  },
  {
    category: CATEGORIES.LIFESTYLE,
    type: 'travel',
    titleKey: 'events.types.travel',
    defaultTitle: 'Travel / Trip',
    keywords: ['travel', 'travelled', 'travelling', 'flight', 'trip', 'journey', 'yatra', 'यात्रा', 'jet lag', 'jetlag']
  },
  {
    category: CATEGORIES.LIFESTYLE,
    type: 'exercise',
    titleKey: 'events.types.exercise',
    defaultTitle: 'Major Exercise',
    keywords: ['workout', 'heavy workout', 'gym', 'ran a marathon', 'intense exercise', 'kasrat', 'कसरत']
  },

  // Symptoms
  {
    category: CATEGORIES.SYMPTOMS,
    type: 'cramps',
    titleKey: 'events.types.cramps',
    defaultTitle: 'Cramps / Pain',
    keywords: ['cramps', 'cramping', 'period pain', 'stomach pain', 'dard', 'पेट दर्द', 'दर्द', 'pain in stomach']
  },
  {
    category: CATEGORIES.SYMPTOMS,
    type: 'headache',
    titleKey: 'events.types.headache',
    defaultTitle: 'Headache',
    keywords: ['headache', 'migraine', 'head pain', 'sir dard', 'सिरदर्द', 'सिर में दर्द']
  },

  // Medical Care
  {
    category: CATEGORIES.MEDICAL,
    type: 'doctor_visit',
    titleKey: 'events.types.doctorVisit',
    defaultTitle: 'Doctor Visit',
    keywords: ['doctor visit', 'visited doctor', 'gynaecologist', 'clinic', 'hospital', 'doctor appointment', 'डॉक्टर', 'अस्पताल']
  }
];

/**
 * Detects potential health event in user message.
 * Returns suggested event object or null if none detected.
 */
export function detectEventFromNaturalLanguage(userText) {
  if (!userText || typeof userText !== 'string') return null;

  const textLower = userText.toLowerCase();

  for (const pattern of EVENT_PATTERNS) {
    const matchedKeyword = pattern.keywords.find((kw) => textLower.includes(kw.toLowerCase()));
    if (matchedKeyword) {
      // Extract optional hours if sleep
      let metadata = {};
      if (pattern.type === 'poor_sleep') {
        const hoursMatch = userText.match(/(\d+)\s*(hours|hrs|घंटे)/i);
        if (hoursMatch) {
          metadata.sleepHours = parseInt(hoursMatch[1], 10);
        }
      }

      // Extract optional medication name
      if (pattern.category === CATEGORIES.MEDICATION) {
        const medMatch = userText.match(/(took|started|on)\s+([A-Za-z0-9\s]+)/i);
        if (medMatch) {
          metadata.medicationName = medMatch[2].trim().substring(0, 30);
        }
      }

      const todayStr = new Date().toISOString().split('T')[0];

      return {
        category: pattern.category,
        type: pattern.type,
        titleKey: pattern.titleKey,
        defaultTitle: pattern.defaultTitle,
        date: todayStr,
        description: userText,
        metadata,
        matchedKeyword,
        source: 'chat'
      };
    }
  }

  return null;
}
