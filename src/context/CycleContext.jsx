import React, { createContext, useContext, useState, useEffect } from 'react';

const CycleContext = createContext();

const STORAGE_KEY_SETUP = 'sakhi_cycle_setup_v2';
const STORAGE_KEY_LOGS = 'sakhi_cycle_logs_v2';

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

  // Update setup handler
  const updateCycleSetup = (newSetup) => {
    setCycleSetup((prev) => ({
      ...prev,
      ...newSetup,
      isConfigured: true
    }));
  };

  // Log today's entry
  const addDailyLog = (logEntry) => {
    const dateKey = logEntry.date || new Date().toISOString().split('T')[0];
    setDailyLogs((prev) => {
      const filtered = prev.filter((item) => item.date !== dateKey);
      return [{ ...logEntry, date: dateKey }, ...filtered];
    });
  };

  // Export cycle data as downloadable JSON file
  const exportCycleData = () => {
    const exportPayload = {
      setup: cycleSetup,
      logs: dailyLogs,
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
  const totalLogs = dailyLogs.length;
  const streakCount = totalLogs; // Simple streak counter
  let plantStage = 'Seedling';
  let plantIcon = '🌱';
  if (totalLogs >= 10) {
    plantStage = 'Garden Bloom';
    plantIcon = '🌸';
  } else if (totalLogs >= 5) {
    plantStage = 'Blooming Flower';
    plantIcon = '🌷';
  } else if (totalLogs >= 2) {
    plantStage = 'Sprout';
    plantIcon = '🌿';
  }

  // Calculate average sleep & water
  const avgSleep = totalLogs > 0 
    ? (dailyLogs.reduce((acc, curr) => acc + (Number(curr.sleep) || 7), 0) / totalLogs).toFixed(1)
    : '8.0';

  const avgWater = totalLogs > 0
    ? (dailyLogs.reduce((acc, curr) => acc + (Number(curr.water) || 6), 0) / totalLogs).toFixed(1)
    : '7.0';

  return (
    <CycleContext.Provider
      value={{
        cycleSetup,
        updateCycleSetup,
        dailyLogs,
        addDailyLog,
        exportCycleData,
        importCycleData,
        currentCycleDay,
        currentPhase,
        plantStage,
        plantIcon,
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
