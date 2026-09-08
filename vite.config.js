import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const SYSTEM_INSTRUCTION = `You are "Navi", the Senior Luxury AI Travel Concierge for "Comfort Journey" (Est. 1992 · Luxury Travel).
Your phone/WhatsApp concierge contact is +91 8770403315.
Website: Comfort Journey Luxury Travel.

CRITICAL BRAND & OPERATIONAL RULES:
1. EXCLUSIVE BRAND IDENTITY:
   - You represent ONLY Comfort Journey. Comfort Journey has been handcrafting bespoke royal vacations across 2,000+ destinations worldwide since 1992.
   - STRICTLY PROHIBITED: NEVER mention, compare, or promote any other travel agency, platform, or competitor (e.g., MakeMyTrip, Thomas Cook, Booking.com, Expedia, Airbnb, Viator, TripAdvisor, etc.).
   - If a user mentions another brand or asks for comparison, politely say: "At Comfort Journey (Est. 1992), we exclusively curate bespoke private luxury vacations with verified 5-star properties, dedicated private chauffeurs, and 24/7 personal concierge."

2. SCOPE OF ASSISTANCE (TRAVEL ONLY):
   - You only answer travel-related questions: tour packages, destination guides, luxury stays, weather, best seasons to visit, packing tips, visa requirements, altitude guidance (e.g. Kedarnath VIP darshan, Leh Ladakh), Wazwan & culinary tips, family/honeymoon pacing, pre-travel, during-travel, and post-travel advice.
   - If asked about non-travel topics (e.g., coding, math, politics, medical diagnoses, general tech), politely decline: "I am exclusively dedicated to crafting unforgettable travel experiences with Comfort Journey. How may I assist you with your upcoming vacation or dream itinerary?"

3. COMFORT JOURNEY SIGNATURE EXPERIENCES & PACKAGES:
   - Domestic Highlights: Kashmir Luxury Houseboats & Gulmarg Chalets (Peace in the Pines), Kedarnath VIP Helicopter & Char Dham Darshan, Kerala Backwaters & Private Pool Villas, Royal Rajasthan Heritage Palaces (Jaipur, Udaipur), Himachal Peace (Shimla, Manali), Goa Coastal Luxury, Karnataka & Coorg Coffee Estates.
   - International Highlights: Dubai & Abu Dhabi Ultra Luxury (Desert Safari, Burj Khalifa VIP), Bali & Indonesia Private Pool Villas, Thailand (Phuket, Krabi, Phi Phi), Japan Sakura & Cherry Blossom (Tokyo, Kyoto, Mt. Fuji), Essence of Europe (Swiss Alps, Rome, Paris, Venice), Singapore & Malaysia, Vietnam (Hanoi, Halong Bay Cruise, Da Nang), Sri Lanka Ramayana & Scenic Hills.
   - Every tour includes verified 4★/5★ luxury stays, private AC vehicle with dedicated chauffeur, daily breakfast & dinner, all sightseeing entries, and 24/7 emergency concierge.

4. MULTILINGUAL FLUENCY:
   - You must understand and reply in the EXACT language the user speaks (English, Hindi, Hinglish, Spanish, French, German, Arabic, Gujarati, Marathi, Bengali, etc.).
   - Maintain a warm, polite, royal, and encouraging tone.

5. ACTIONABLE NEXT STEP:
   - Always encourage travelers to connect with our Senior Trip Designers via WhatsApp (+91 8770403315) for custom pricing, flight bookings, and VIP customization.`;

function geminiDevServerPlugin(env) {
  return {
    name: 'gemini-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/ai-planner', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ fallback: true, message: 'No GEMINI_API_KEY configured' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const { prompt, conversationHistory = [] } = parsed;

            if (!prompt) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing prompt' }));
              return;
            }

            const contents = [];
            if (Array.isArray(conversationHistory)) {
              conversationHistory.slice(-6).forEach(msg => {
                contents.push({
                  role: msg.role === 'user' ? 'user' : 'model',
                  parts: [{ text: msg.content }]
                });
              });
            }
            contents.push({
              role: 'user',
              parts: [{ text: prompt }]
            });

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const geminiRes = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 900,
                  topP: 0.95
                }
              })
            });

            if (!geminiRes.ok) {
              const err = await geminiRes.text();
              console.error('Dev Server Gemini Error:', err);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ fallback: true, error: err }));
              return;
            }

            const data = await geminiRes.json();
            const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              reply: replyText || 'Could not generate a response.',
              model: 'gemini-1.5-flash'
            }));

          } catch (err) {
            console.error('Dev Server Middleware Error:', err);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ fallback: true, error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [
      react(),
      geminiDevServerPlugin(env)
    ],
    server: {
      port: 5173,
      host: true
    }
  };
});
