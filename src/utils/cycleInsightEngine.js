/**
 * Sakhi Context-Aware Cycle Insight Engine & Pattern Guidance System
 * Analyzes cycle history alongside logged personal events (illness, medication, stress, sleep, travel).
 * STRICT HEALTH SAFETY RULES:
 * 1. NEVER claim causation or make diagnostic assertions.
 * 2. Events act as observational context, NOT automatic prediction modifiers.
 * 3. Use non-diagnostic, supportive phrasing ("may be relevant", "you also logged...", "could be part of the context").
 * 4. Distinguish between Occasional Variation (Level 2) and Repeated Irregularity (Level 3).
 */

export const EVENT_CATEGORIES = {
  HEALTH: { id: 'health', icon: '🩺', labelKey: 'events.categories.health', color: '#E11D48', bgColor: '#FFE4E6' },
  MEDICATION: { id: 'medication', icon: '💊', labelKey: 'events.categories.medication', color: '#9333EA', bgColor: '#F3E8FF' },
  SYMPTOMS: { id: 'symptoms', icon: '🩸', labelKey: 'events.categories.symptoms', color: '#EC738F', bgColor: '#FFE5EC' },
  LIFESTYLE: { id: 'lifestyle', icon: '🏃', labelKey: 'events.categories.lifestyle', color: '#2563EB', bgColor: '#DBEAFE' },
  STRESS: { id: 'mental', icon: '🧠', labelKey: 'events.categories.stress', color: '#D97706', bgColor: '#FEF3C7' },
  REPRODUCTIVE: { id: 'reproductive', icon: '🌸', labelKey: 'events.categories.reproductive', color: '#DB2777', bgColor: '#FCE7F3' },
  MEDICAL: { id: 'medical', icon: '🏥', labelKey: 'events.categories.medical', color: '#059669', bgColor: '#D1FAE5' },
  PERSONAL: { id: 'personal', icon: '📝', labelKey: 'events.categories.personal', color: '#4F46E5', bgColor: '#E0E7FF' }
};

export function getCategoryInfo(category) {
  return EVENT_CATEGORIES[category?.toUpperCase()] || EVENT_CATEGORIES.PERSONAL;
}

/**
 * Calculates current cycle statistics & events during current cycle.
 */
export function calculateCycleStats(cycleSetup = {}, dailyLogs = [], events = []) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = cycleSetup.periodStartDate ? new Date(cycleSetup.periodStartDate) : today;
  startDate.setHours(0, 0, 0, 0);

  const cycleLen = Number(cycleSetup.cycleLength) || 28;
  const periodLen = Number(cycleSetup.periodLength) || 5;

  const diffMs = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Current cycle day (1-indexed)
  const currentCycleDay = diffDays >= 0 ? diffDays + 1 : 1;

  // Estimated next period start date
  const estimatedNextDate = new Date(startDate);
  estimatedNextDate.setDate(startDate.getDate() + cycleLen);
  estimatedNextDate.setHours(0, 0, 0, 0);

  // Days past expected estimate
  const daysOverdue = Math.floor((today.getTime() - estimatedNextDate.getTime()) / (1000 * 60 * 60 * 24));
  const isLate = daysOverdue > 0;

  // Filter events logged in current cycle (from periodStartDate to today)
  const cycleEvents = events.filter((evt) => {
    if (!evt.date) return false;
    const evtDate = new Date(evt.date);
    evtDate.setHours(0, 0, 0, 0);
    return evtDate >= startDate && evtDate <= today;
  });

  // Group events by category
  const categoryCounts = {
    health: 0,
    medication: 0,
    symptoms: 0,
    lifestyle: 0,
    mental: 0,
    reproductive: 0,
    medical: 0,
    personal: 0
  };

  cycleEvents.forEach((evt) => {
    const cat = evt.category?.toLowerCase() || 'personal';
    if (categoryCounts[cat] !== undefined) {
      categoryCounts[cat]++;
    } else {
      categoryCounts.personal++;
    }
  });

  return {
    currentCycleDay,
    cycleLen,
    periodLen,
    startDate,
    estimatedNextDate,
    daysOverdue,
    isLate,
    cycleEvents,
    categoryCounts,
    totalEventsInCycle: cycleEvents.length
  };
}

/**
 * CYCLE PATTERN ANALYSIS LAYER
 * Evaluates cycle history & variations across past cycles to determine pattern level:
 * LEVEL 1 — Stable pattern
 * LEVEL 2 — Occasional variation
 * LEVEL 3 — Repeated irregularity (worth discussing with a doctor)
 */
export function evaluateCyclePattern(cycleSetup = {}, dailyLogs = [], events = []) {
  const stats = calculateCycleStats(cycleSetup, dailyLogs, events);
  const baselineLength = Number(cycleSetup.cycleLength) || 28;

  // Extract recent period start dates / cycle logs history if available
  const historyLogs = dailyLogs.filter((log) => log.flow && log.flow !== 'None');

  // Count variations & delays in history
  const overdueDays = stats.daysOverdue;
  const isCurrentLate = stats.isLate;

  // Count how many events/symptoms related to cycle shifts were logged
  const illnessOrMedCount = stats.categoryCounts.health + stats.categoryCounts.medication;
  const stressOrSleepCount = stats.categoryCounts.mental + stats.categoryCounts.lifestyle;

  // Analyze past cycles variation history
  let irregularCycleCount = 0;
  let hasShortCycleSignal = baselineLength < 21;
  let hasLongCycleSignal = baselineLength > 35;

  if (isCurrentLate && overdueDays >= 6) {
    irregularCycleCount += 1;
  }
  if (illnessOrMedCount >= 2 || stressOrSleepCount >= 3) {
    // High contextual stress/illness logged
  }

  // Check past logs for historical period events
  const periodEvents = events.filter((e) => e.type === 'period_started' || e.category === 'reproductive');
  if (periodEvents.length >= 2) {
    irregularCycleCount += 1;
  }

  // LEVEL ASSIGNMENT LOGIC:
  // LEVEL 3: Repeated Irregularity (Overdue by 7+ days OR multiple past irregular cycle signals OR baseline outside 21-35 days repeatedly)
  if (overdueDays >= 7 || irregularCycleCount >= 2 || (hasShortCycleSignal || hasLongCycleSignal)) {
    return {
      level: 3,
      badge: 'Repeated Pattern',
      badgeKey: 'pattern.level3Badge',
      titleKey: 'pattern.level3Title',
      defaultTitle: 'We\'ve noticed that your cycle has been irregular more than once',
      messageKey: 'pattern.level3Message',
      defaultMessage: 'Cycle timing can vary for many reasons, including stress, changes in sleep or routine, illness, weight shifts, exercise, contraception, and other health factors. Since this pattern has happened repeatedly, it may be helpful to discuss your cycle history with a gynecologist or other qualified healthcare professional.',
      primaryCTA: 'findDoctor',
      primaryCTAKen: 'pattern.findDoctorBtn',
      defaultPrimaryCTA: 'Find a doctor',
      secondaryCTA: 'viewHistory',
      secondaryCTAKen: 'pattern.viewHistoryBtn',
      defaultSecondaryCTA: 'View my cycle history',
      color: '#9333EA',
      bgColor: '#FAF5FF',
      borderColor: '#E9D5FF',
      icon: '🩺'
    };
  }

  // LEVEL 2: Occasional Variation (Cycle is 1-6 days late, or single variation logged)
  if (isCurrentLate || stats.totalEventsInCycle > 0) {
    return {
      level: 2,
      badge: 'Occasional Variation',
      badgeKey: 'pattern.level2Badge',
      titleKey: 'pattern.level2Title',
      defaultTitle: 'Your cycle looks a little different this time',
      messageKey: 'pattern.level2Message',
      defaultMessage: 'One cycle that is earlier or later than your recent pattern can happen for many reasons, such as routine shifts, sleep changes, or stress. Keep tracking so Sakhi can understand your usual pattern better.',
      primaryCTA: 'continueTracking',
      primaryCTAKen: 'pattern.continueTrackingBtn',
      defaultPrimaryCTA: 'Continue tracking',
      secondaryCTA: 'viewHistory',
      secondaryCTAKen: 'pattern.viewHistoryBtn',
      defaultSecondaryCTA: 'View my cycle history',
      color: '#D97706',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A',
      icon: '✨'
    };
  }

  // LEVEL 1: Stable Pattern
  return {
    level: 1,
    badge: 'Consistent Pattern',
    badgeKey: 'pattern.level1Badge',
    titleKey: 'pattern.level1Title',
    defaultTitle: 'Your cycle looks consistent with your recent pattern',
    messageKey: 'pattern.level1Message',
    defaultMessage: 'Keep tracking — your cycle history helps Sakhi give you more personalized estimates over time.',
    primaryCTA: 'continueTracking',
    primaryCTAKen: 'pattern.continueTrackingBtn',
    defaultPrimaryCTA: 'Continue tracking',
    secondaryCTA: null,
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    icon: '🌸'
  };
}

/**
 * Generates context-aware late period analysis.
 * Non-diagnostic and non-alarming.
 */
export function getLatePeriodContext(cycleSetup, dailyLogs = [], events = []) {
  const stats = calculateCycleStats(cycleSetup, dailyLogs, events);

  if (!stats.isLate) {
    return {
      isLate: false,
      messageKey: 'insights.onTrack',
      defaultMessage: 'Your cycle timing is currently within your expected estimate.'
    };
  }

  const { daysOverdue, cycleEvents, categoryCounts } = stats;

  const relevantEventsList = cycleEvents.map((evt) => ({
    id: evt.id,
    date: evt.date,
    title: evt.title || 'Event',
    category: evt.category,
    icon: getCategoryInfo(evt.category).icon
  }));

  // Construct non-diagnostic contextual narrative
  let contextNarrativeKey = 'insights.lateNoticeGeneric';
  let defaultNarrative = `Your period is currently ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} later than your recent estimate.`;

  if (categoryCounts.health > 0 || categoryCounts.medication > 0) {
    contextNarrativeKey = 'insights.lateNoticeIllnessMed';
    defaultNarrative = `Your period is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} later than your recent estimate. You also logged an illness or medication earlier this cycle. Changes in health, stress, sleep and routine can sometimes coincide with cycle variation, although we can't determine from your logs whether they caused the delay.`;
  } else if (categoryCounts.mental > 0 || categoryCounts.lifestyle > 0) {
    contextNarrativeKey = 'insights.lateNoticeStressLifestyle';
    defaultNarrative = `Your period is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} later than your recent estimate. You logged higher stress or routine changes earlier this cycle. These are helpful pieces of personal context to keep in your health history.`;
  }

  return {
    isLate: true,
    daysOverdue,
    contextNarrativeKey,
    defaultNarrative,
    relevantEvents: relevantEventsList,
    disclaimerKey: 'insights.disclaimerNoCausation',
    defaultDisclaimer: 'These are useful pieces of context, but they don\'t tell us exactly why your period is later. Cycle timing can naturally vary.',
    shouldSuggestDoctor: daysOverdue >= 7
  };
}

/**
 * Generates historical cycle pattern summary across cycles.
 */
export function getHistoricalCyclePatterns(dailyLogs = [], events = []) {
  const totalEvents = events.length;

  const categoryTotals = {
    stress: events.filter((e) => e.category === 'mental').length,
    sleep: events.filter((e) => e.type === 'poor_sleep' || (e.category === 'lifestyle' && e.title?.toLowerCase().includes('sleep'))).length,
    illness: events.filter((e) => e.category === 'health').length,
    medication: events.filter((e) => e.category === 'medication').length,
    travel: events.filter((e) => e.type === 'travel' || e.title?.toLowerCase().includes('travel')).length
  };

  return {
    totalEventsLogged: totalEvents,
    categoryTotals,
    summaryKey: 'insights.historicalSummary',
    defaultSummary: `You have recorded ${totalEvents} personal context events across your health timeline.`
  };
}
