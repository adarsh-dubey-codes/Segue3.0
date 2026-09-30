/**
 * Sakhi AI API Route / Edge Function (/api/sakhi-ai)
 * Handles Gemini AI intent routing for text & floating 'Bolo Sakhi' voice interactions.
 */

export const SAKHI_SYSTEM_PROMPT = `
You are Sakhi AI, a warm, empathetic, sisterly health and cycle companion for women in India.

RULES FOR VOICE INTERACTION (When is_voice_widget: true OR is_voice_input: true):
1. Request Source: Treat the query as an active spoken voice conversation.
2. Language Matching: Respond in the exact language mix spoken by the user.
   - If user asks in Hinglish (e.g. "Mujhe bahut cramp ho raha hai"), respond in warm Hinglish.
   - If user asks in Hindi script (e.g. "दर्द में क्या करें?"), respond in warm Hindi.
   - If user asks in English, respond in simple warm English.
3. Voice-Optimized Output Structure:
   - Keep responses extremely concise (maximum 3 short sentences, under 40 words total).
   - NEVER use markdown formatting (no bullet points, no bold asterisks **, no hash headers #, no tables). Markdown syntax breaks Text-to-Speech (TTS) pronunciation.
   - Use warm, sisterly conversational punctuation (commas and periods for natural speech pauses).
   - Start with a caring address like "Haan behen", "Suno behen", "Haan sakhi".

EXAMPLE VOICE OUTPUT:
"Haan behen, dard ke liye ek garam paani ki botal se sek karein aur gunguna paani piyo. Aaram karne se relief milega."
`;

export default async function handler(req: any, res: any) {
  // Support both Edge runtime (Request/Response) and Node (req/res)
  try {
    const body = req.method === 'POST' ? (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) : {};
    const { prompt, userPrompt, is_voice_widget, is_voice_input } = body;
    const query = prompt || userPrompt || '';

    const isVoice = Boolean(is_voice_widget || is_voice_input);

    if (!query) {
      if (res && res.status) {
        return res.status(400).json({ error: 'Prompt is required' });
      }
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = process.env.VITE_SAKHI_AI_API_KEY || process.env.GEMINI_API_KEY;

    let responseText = '';

    if (apiKey) {
      // Call Google Gemini API endpoint
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: SAKHI_SYSTEM_PROMPT },
              { text: `[Context: is_voice_widget=${isVoice}] User query: ${query}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: isVoice ? 80 : 300
        }
      };

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const geminiData = await geminiRes.json();
      responseText =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    // Fallback voice response generator if API key is not configured or for offline/local dev
    if (!responseText) {
      responseText = generateVoiceOptimizedFallback(query, isVoice);
    }

    // Ensure voice cleanup: strip any stray markdown symbols
    if (isVoice) {
      responseText = cleanMarkdownForVoice(responseText);
    }

    const jsonOutput = {
      response: responseText,
      is_voice_widget: isVoice,
      timestamp: new Date().toISOString()
    };

    if (res && res.status) {
      return res.status(200).json(jsonOutput);
    }

    return new Response(JSON.stringify(jsonOutput), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Sakhi AI API Error:', err);
    const errOutput = { error: 'Failed to process Sakhi AI request' };
    if (res && res.status) {
      return res.status(500).json(errOutput);
    }
    return new Response(JSON.stringify(errOutput), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Clean markdown syntax for TTS pronunciation compatibility
export function cleanMarkdownForVoice(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#/g, '')
    .replace(/`/g, '')
    .replace(/^[-•*]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
}

function generateVoiceOptimizedFallback(prompt: string, isVoice: boolean): string {
  const p = prompt.toLowerCase();

  if (isVoice) {
    if (p.includes('cramp') || p.includes('dard') || p.includes('pain') || p.includes('पेट')) {
      return 'Haan behen, dard ke liye ek garam paani ki botal se sek karein aur gunguna paani piyo. Aaram karne se relief milega.';
    }
    if (p.includes('date') || p.includes('तारीख') || p.includes('period') || p.includes('कब')) {
      return 'Suno behen, aapki agli period ki date lagbhag chauda october hai. Aapka cycle bilkul normal chal raha hai.';
    }
    if (p.includes('doctor') || p.includes('बात') || p.includes('डाक्टर')) {
      return 'Haan sakhi, humari doctor abhi available hain. Kya aap unse audio call par baat karna chahti ho?';
    }
    return 'Haan behen, main sun rahi hoon. Apni sehat ya period cycle se juda koi bhi sawaal bejhijhak pucho.';
  }

  return 'Thank you for sharing that with me. Your body signals are valid and worth listening to.';
}
