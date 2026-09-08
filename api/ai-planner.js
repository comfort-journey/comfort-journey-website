/**
 * Comfort Journey - Universal Secure Serverless AI Planner Endpoint
 * Handles requests for Gemini AI while keeping GEMINI_API_KEY 100% secret.
 * Compatible with:
 *  - AWS Lambda & AWS API Gateway / Lambda Function URL
 *  - AWS Amplify Hosting
 *  - Vercel, Netlify, and standard Node.js servers
 */

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

async function executeGeminiPrompt({ prompt, conversationHistory = [], apiKey }) {
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

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 900,
        topP: 0.95
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini API Error:', errText);
    return { fallback: true, error: errText };
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const replyText = candidate?.content?.parts?.[0]?.text;

  if (!replyText) {
    return { fallback: true, message: 'Empty response from Gemini' };
  }

  return {
    success: true,
    reply: replyText,
    model: 'gemini-1.5-flash'
  };
}

/**
 * Universal Handler: Supports both standard (req, res) and AWS Lambda (event, context)
 */
export default async function handler(reqOrEvent, resOrContext) {
  const isLambda = !resOrContext || typeof resOrContext.status !== 'function';

  // Extract HTTP method and body based on environment
  let method = 'POST';
  let body = {};

  if (isLambda) {
    method = reqOrEvent.httpMethod || reqOrEvent.requestContext?.http?.method || 'POST';
    try {
      body = typeof reqOrEvent.body === 'string' ? JSON.parse(reqOrEvent.body) : (reqOrEvent.body || {});
    } catch {
      body = {};
    }
  } else {
    method = reqOrEvent.method || 'POST';
    body = reqOrEvent.body || {};
  }

  // Handle CORS / OPTIONS pre-flight for AWS
  if (method === 'OPTIONS') {
    if (isLambda) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: ''
      };
    } else {
      resOrContext.setHeader('Access-Control-Allow-Origin', '*');
      resOrContext.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
      return resOrContext.status(200).end();
    }
  }

  if (method !== 'POST') {
    if (isLambda) {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
    return resOrContext.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallbackResponse = {
      fallback: true,
      message: 'GEMINI_API_KEY is not configured on AWS/server. Use internal semantic engine.'
    };
    if (isLambda) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(fallbackResponse)
      };
    }
    return resOrContext.status(200).json(fallbackResponse);
  }

  try {
    const { prompt, conversationHistory = [] } = body;

    if (!prompt || typeof prompt !== 'string') {
      const badReq = { error: 'Missing prompt in request body' };
      if (isLambda) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify(badReq)
        };
      }
      return resOrContext.status(400).json(badReq);
    }

    const result = await executeGeminiPrompt({ prompt, conversationHistory, apiKey });

    if (isLambda) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(result)
      };
    }

    return resOrContext.status(200).json(result);

  } catch (error) {
    console.error('Server error in ai-planner handler:', error);
    const errObj = { fallback: true, error: error.message };
    if (isLambda) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(errObj)
      };
    }
    return resOrContext.status(200).json(errObj);
  }
}

// Export named lambdaHandler for AWS Lambda Function configurations
export const lambdaHandler = handler;

