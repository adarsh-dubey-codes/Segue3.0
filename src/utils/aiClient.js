/**
 * Sakhi AI Service Provider Abstraction
 * Handles empathetic, non-diagnostic responses & quota management.
 */

const QUOTA_KEY = 'sakhi_ai_quota_count';
const MAX_DAILY_QUOTA = 20;

export const getRemainingQuota = () => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(QUOTA_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === todayStr) {
        return Math.max(0, MAX_DAILY_QUOTA - parsed.count);
      }
    }
  } catch (e) {
    console.error('Error checking quota:', e);
  }
  return MAX_DAILY_QUOTA;
};

export const incrementQuota = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem(QUOTA_KEY);
  let count = 0;
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.date === todayStr) count = parsed.count;
  }
  count += 1;
  localStorage.setItem(QUOTA_KEY, JSON.stringify({ date: todayStr, count }));
};

export const generateSakhiResponse = async (userPrompt, userContext = {}) => {
  // Simulate natural response latency
  await new Promise((resolve) => setTimeout(resolve, 1000));
  incrementQuota();

  const promptLower = userPrompt.toLowerCase();

  if (promptLower.includes('cramp') || promptLower.includes('pain')) {
    return `I hear you, and dealing with period cramps can be so draining 💕. 

Gentle things you might consider trying:
- Placing a warm hot water bottle or heating pad on your lower belly.
- Sipping warm chamomile or ginger tea to relax pelvic muscles.
- Trying child's pose or gentle pelvic tilts.

*Note: If cramps are severe, sudden, or interfere with your daily activity, please consider consulting a healthcare professional for guidance.*`;
  }

  if (promptLower.includes('cup') || promptLower.includes('insert')) {
    return `Menstrual cups are wonderful eco-friendly options once you get the hang of them! 🌸

Here are three quick tips for comfortable insertion:
1. **Try the Punch-Down Fold**: Press one side of the rim down into the center—this creates a much smaller tip.
2. **Relax Your Shoulders**: Take a slow exhale before inserting; tense pelvic muscles make insertion tricky.
3. **Check the Seal**: Gently run your finger around the cup base after inserting to ensure it has popped open fully.`;
  }

  if (promptLower.includes('food') || promptLower.includes('eat') || promptLower.includes('diet') || promptLower.includes('pms')) {
    return `Nutrition needs shift naturally with your cycle phases! 🥑

- **During Menstrual Phase**: Warm iron-rich soups, lentils, dark leafy greens, and dark chocolate.
- **During Follicular Phase**: Fresh berries, fermented foods (yogurt, kefir), and light proteins.
- **During Luteal Phase**: Complex carbs (sweet potato, oats) to stabilize blood sugar and B6 foods for mood support.`;
  }

  if (promptLower.includes('pcos') || promptLower.includes('irregular') || promptLower.includes('missed')) {
    return `It's completely normal to feel curious or anxious when your cycle is irregular. 

Cycle variations can happen due to stress, hormonal shifts, sleep changes, or conditions like PCOS (Polycystic Ovary Syndrome). 

Because cycle regularity involves complex hormonal pathways, tracking your symptoms over 2–3 months and sharing your Sakhi log with a gynaecologist is the best step for clarity 💕.`;
  }

  return `Thank you for sharing that with me. Your body's signals are always valid and worth listening to. 🌸

I am here to offer warm, evidence-aware support throughout your cycle. Is there a specific symptom, cycle phase, or comfort routine you'd like to explore together today?`;
};
