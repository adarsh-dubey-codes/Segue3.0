import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext();

export function RewardsProvider({ children }) {
  const [streak, setStreak] = useState(7);
  const [coins, setCoins] = useState(1250);
  const [lastLoginDate, setLastLoginDate] = useState('');
  const [showStreakToast, setShowStreakToast] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Daily Streak Reward Active! 🔥',
      desc: 'You earned +1 Sakhi Coin for checking in today! Current streak: 7 days.',
      time: 'Just now',
      read: false,
      icon: '🔥'
    },
    {
      id: 'n2',
      title: 'Cycle Phase Reminder 🌸',
      desc: 'You are in your Luteal Phase (Day 22). Prioritize gentle rest and warm herbal tea.',
      time: '2 hours ago',
      read: false,
      icon: '🩸'
    },
    {
      id: 'n3',
      title: 'Doctor Available 🩺',
      desc: 'Dr. Manisha Singh has open slots for online consultation today at 4:30 PM.',
      time: '1 day ago',
      read: false,
      icon: '🩺'
    }
  ]);

  // Daily Streak Engine check on mount
  useEffect(() => {
    try {
      const storedStreak = localStorage.getItem('sakhi_streak');
      const storedCoins = localStorage.getItem('sakhi_coins');
      const storedLastLogin = localStorage.getItem('sakhi_last_login');

      const todayStr = new Date().toISOString().split('T')[0];

      let currentStreakVal = storedStreak ? parseInt(storedStreak, 10) : 7;
      let currentCoinsVal = storedCoins ? parseInt(storedCoins, 10) : 1250;

      if (storedLastLogin !== todayStr) {
        if (storedLastLogin) {
          const lastDate = new Date(storedLastLogin);
          const todayDate = new Date(todayStr);
          const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            currentStreakVal += 1;
          } else if (diffDays > 1) {
            currentStreakVal = 1;
          }
        } else {
          currentStreakVal = 1;
        }

        // Award 1 Sakhi Coin per day streak
        currentCoinsVal += 1;

        // Save to local storage
        localStorage.setItem('sakhi_streak', currentStreakVal.toString());
        localStorage.setItem('sakhi_coins', currentCoinsVal.toString());
        localStorage.setItem('sakhi_last_login', todayStr);

        setShowStreakToast(true);
        setTimeout(() => setShowStreakToast(false), 5000);
      }

      setStreak(currentStreakVal);
      setCoins(currentCoinsVal);
      setLastLoginDate(todayStr);
    } catch (e) {
      console.error('Error initializing daily streak engine:', e);
    }
  }, []);

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addCoins = (amount) => {
    const newCoins = coins + amount;
    setCoins(newCoins);
    localStorage.setItem('sakhi_coins', newCoins.toString());
  };

  return (
    <RewardsContext.Provider
      value={{
        streak,
        coins,
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        showStreakToast,
        markAllNotificationsAsRead,
        addCoins
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    return {
      streak: 7,
      coins: 1250,
      notifications: [],
      unreadCount: 3,
      showStreakToast: false,
      markAllNotificationsAsRead: () => {},
      addCoins: () => {}
    };
  }
  return context;
}
