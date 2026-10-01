import React, { createContext, useContext, useState, useEffect } from 'react';

const CycleContext = createContext();

const STORAGE_KEY_SETUP = 'sakhi_cycle_setup_v2';
const STORAGE_KEY_LOGS = 'sakhi_cycle_logs_v2';
const STORAGE_KEY_EVENTS = 'sakhi_cycle_events_v2';

export const CycleProvider = ({ children }) => {
  // Cycle configuration setup state
  const [cycleSetup, setCycleSetup] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETUP);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cycle setup:', e);
    }
    return {
      nickname: 'Beautiful',
      periodStartDate: new Date().toISOString(),
      cycleLength: 28,
      periodLength: 5,
      city: 'Mumbai',
      isConfigured: true
    };
  });

  // Daily logs history state
  const [dailyLogs, setDailyLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading daily logs:', e);
    }
    // Seed an initial sample log for demo purposes if empty
    const todayStr = new Date().toISOString().split('T')[0];
    return [
      {
        date: todayStr,
        mood: 'Calm',
        energy: 4,
        flow: 'Light',
        symptoms: ['Cramps', 'Fatigue'],
        sleep: 8,
        water: 7,
        notes: 'Feeling restful and relaxed today.'
      }
    ];
  });

  // Personal health events state
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EVENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading events:', e);
    }
    // Seed sample historical events if empty for immediate context demonstration
    const todayObj = new Date();
    const formatDateOffset = (offsetDays) => {
      const d = new Date(todayObj);
      d.setDate(d.getDate() + offsetDays);
      return d.toISOString().split('T')[0];
    };

    return [
      {
        id: 'evt_sample_1',
        userId: 'user_local',
        date: formatDateOffset(-5),
        category: 'health',
        type: 'fever',
        title: 'Fever & Rest',
        description: 'Had a mild fever, rested at home.',
        metadata: { medicationName: 'Paracetamol', severity: 'moderate' },
        severity: 'moderate',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'manual'
      },
      {
        id: 'evt_sample_2',
        userId: 'user_local',
        date: formatDateOffset(-5),
        category: 'medication',
        type: 'medication_taken',
        title: 'Fever Medicine',
        description: 'Took fever medication after lunch.',
        metadata: { medicationName: 'Crocin / Paracetamol' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'manual'
      },
      {
        id: 'evt_sample_3',
        userId: 'user_local',
        date: formatDateOffset(-3),
        category: 'mental',
        type: 'stressful_day',
        title: 'Work Stress',
        description: 'High workload and deadline pressure today.',
        severity: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'manual'
      },
      {
        id: 'evt_sample_4',
        userId: 'user_local',
        date: formatDateOffset(-2),
        category: 'lifestyle',
        type: 'poor_sleep',
        title: 'Poor Sleep',
        description: 'Slept 5 hours only.',
        metadata: { sleepHours: 5 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'manual'
      }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETUP, JSON.stringify(cycleSetup));
    } catch (e) {
      console.error('Error saving cycle setup:', e);
    }
  }, [cycleSetup]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(dailyLogs));
    } catch (e) {
      console.error('Error saving daily logs:', e);
    }
  }, [dailyLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Error saving events:', e);
    }
  }, [events]);

  // Update setup handler
  const updateCycleSetup = (newSetup) => {
    setCycleSetup((prev) => ({
      ...prev,
      ...newSetup,
      isConfigured: true
    }));
  };

  // Add a personal event
  const addEvent = (eventData) => {
    const newEvent = {
      id: eventData.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: eventData.userId || 'user_local',
      date: eventData.date || new Date().toISOString().split('T')[0],
      category: eventData.category || 'personal',
      type: eventData.type || 'other',
      title: eventData.title || 'Event',
      description: eventData.description || eventData.note || '',
      metadata: eventData.metadata || {},
      severity: eventData.severity || 'normal',
      createdAt: eventData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: eventData.source || 'manual'
    };

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  // Update an existing event
  const updateEvent = (eventId, updatedData) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.id === eventId
          ? { ...item, ...updatedData, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  // Delete an event
  const deleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((item) => item.id !== eventId));
  };

  // Clear all events
  const clearEvents = () => {
    setEvents([]);
  };

  // Helper to get events for a date
  const getEventsForDate = (dateStr) => {
    if (!dateStr) return [];
    return events.filter((evt) => evt.date === dateStr);
  };

  // Log today's entry & create linked symptom events if symptoms selected
  const addDailyLog = (logEntry) => {
    const dateKey = logEntry.date || new Date().toISOString().split('T')[0];
    setDailyLogs((prev) => {
      const filtered = prev.filter((item) => item.date !== dateKey);
      return [{ ...logEntry, date: dateKey }, ...filtered];
    });

    // Also link symptoms to timeline events if any symptoms were logged
    if (logEntry.symptoms && Array.isArray(logEntry.symptoms) && logEntry.symptoms.length > 0) {
      logEntry.symptoms.forEach((sym) => {
        const symClean = typeof sym === 'string' ? sym.replace(/[\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u2600-\u26FF\u2700-\u27BF]/g, '').trim() : sym;
        const existingSymptomEvent = events.find(
          (e) => e.date === dateKey && e.category === 'symptoms' && e.title.includes(symClean)
        );
        if (!existingSymptomEvent) {
          addEvent({
            date: dateKey,
            category: 'symptoms',
            type: symClean.toLowerCase().replace(/\s+/g, '_'),
            title: `Symptom: ${symClean}`,
            description: logEntry.notes || `Logged symptom: ${symClean}`,
            source: 'symptom_log'
          });
        }
      });
    }

    // Link sleep event if sleep logged < 6 hrs
    if (logEntry.sleep && Number(logEntry.sleep) < 6) {
      const existingSleepEvent = events.find((e) => e.date === dateKey && e.type === 'poor_sleep');
      if (!existingSleepEvent) {
        addEvent({
          date: dateKey,
          category: 'lifestyle',
          type: 'poor_sleep',
          title: 'Poor Sleep',
          description: `Logged ${logEntry.sleep} hours of sleep`,
          metadata: { sleepHours: Number(logEntry.sleep) },
          source: 'symptom_log'
        });
      }
    }
  };

  // Export cycle data as downloadable JSON file
  const exportCycleData = () => {
    const exportPayload = {
      setup: cycleSetup,
      logs: dailyLogs,
      events: events,
      exportedAt: new Date().toISOString(),
      version: '2.0'
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sakhi_cycle_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import cycle data from JSON payload
  const importCycleData = (jsonPayload) => {
    try {
      const parsed = typeof jsonPayload === 'string' ? JSON.parse(jsonPayload) : jsonPayload;
      if (parsed.setup) setCycleSetup(parsed.setup);
      if (parsed.logs && Array.isArray(parsed.logs)) setDailyLogs(parsed.logs);
      if (parsed.events && Array.isArray(parsed.events)) setEvents(parsed.events);
      return true;
    } catch (err) {
      console.error('Failed to import cycle data:', err);
      return false;
    }
  };

  // Calculate current cycle day safely
  const getCurrentCycleDay = () => {
    const getValidDate = (val) => {
      if (!val) return new Date();
      const d = val instanceof Date ? val : new Date(val);
      return isNaN(d.getTime()) ? new Date() : d;
    };

    const start = getValidDate(cycleSetup?.periodStartDate);
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const len = Number(cycleSetup?.cycleLength) || 28;
    if (isNaN(diffDays) || diffDays < 0) return 1;
    return (diffDays % len) + 1;
  };

  const currentCycleDay = getCurrentCycleDay();

  // Calculate cycle phase
  const getCyclePhase = () => {
    const day = currentCycleDay;
    const pLen = cycleSetup.periodLength || 5;
    if (day <= pLen) return 'menstrual';
    if (day <= 13) return 'follicular';
    if (day <= 16) return 'ovulation';
    return 'luteal';
  };

  const currentPhase = getCyclePhase();

  // Garden Gamification Progress calculation
  // 7 Living Plant Stages (Matching prompt requirements: Seed -> Sprout -> Seedling -> Growing Plant -> Leaves -> Bud -> Bloom)
  const [extraCarePoints, setExtraCarePoints] = useState(0);
  const totalLogs = dailyLogs.length + extraCarePoints;
  const streakCount = Math.max(1, dailyLogs.length);

  const getPlantStageInfo = (logsCount) => {
    if (logsCount >= 6) return { stageIndex: 7, stageName: 'Beautiful Blooming Flower', icon: '🌸', code: 'blooming_flower' };
    if (logsCount >= 5) return { stageIndex: 6, stageName: 'Budding Flower', icon: '🌷', code: 'budding_flower' };
    if (logsCount >= 4) return { stageIndex: 5, stageName: 'Plant with Leaves', icon: '🪴', code: 'plant_leaves' };
    if (logsCount >= 3) return { stageIndex: 4, stageName: 'Growing Plant', icon: '🪴', code: 'growing_plant' };
    if (logsCount >= 2) return { stageIndex: 3, stageName: 'Seedling', icon: '🌿', code: 'seedling' };
    if (logsCount >= 1) return { stageIndex: 2, stageName: 'Small Sprout', icon: '🌱', code: 'sprout' };
    return { stageIndex: 1, stageName: 'Seed', icon: '🌰', code: 'seed' };
  };

  const plantStageObj = getPlantStageInfo(totalLogs);
  const plantStage = plantStageObj.stageName;
  const plantIcon = plantStageObj.icon;

  const waterGarden = () => {
    setExtraCarePoints((prev) => prev + 1);
    window.dispatchEvent(new CustomEvent('sakhi-garden-nurtured', { detail: { newStage: getPlantStageInfo(totalLogs + 1) } }));
  };

  // Calculate average sleep & water
  const avgSleep = dailyLogs.length > 0 
    ? (dailyLogs.reduce((acc, curr) => acc + (Number(curr.sleep) || 7), 0) / dailyLogs.length).toFixed(1)
    : '8.0';

  const avgWater = dailyLogs.length > 0
    ? (dailyLogs.reduce((acc, curr) => acc + (Number(curr.water) || 6), 0) / dailyLogs.length).toFixed(1)
    : '7.0';

  return (
    <CycleContext.Provider
      value={{
        cycleSetup,
        updateCycleSetup,
        dailyLogs,
        addDailyLog,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        clearEvents,
        getEventsForDate,
        exportCycleData,
        importCycleData,
        currentCycleDay,
        currentPhase,
        plantStage,
        plantIcon,
        plantStageObj,
        waterGarden,
        streakCount,
        totalLogs,
        avgSleep,
        avgWater
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => useContext(CycleContext);

