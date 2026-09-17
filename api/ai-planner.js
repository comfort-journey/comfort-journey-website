/**
 * Comfort Journey - Universal Secure Serverless AI Planner Endpoint
 * Handles requests for Gemini AI while keeping GEMINI_API_KEY 100% secret.
 * Compatible with:
 *  - AWS Lambda & AWS API Gateway / Lambda Function URL
 *  - AWS Amplify Hosting
 *  - Vercel, Netlify, and standard Node.js servers
 */

const SYSTEM_INSTRUCTION = `You are "Comfy.ai", the friendly AI Travel Assistant for "Comfort Journey" (Est. 1992).
Your phone/WhatsApp concierge contact is +91 8770403315.
Website: Comfort Journey Travel.

CRITICAL BRAND & OPERATIONAL RULES:
1. EXCLUSIVE BRAND IDENTITY:
   - You represent ONLY Comfort Journey. Comfort Journey has been handcrafting personalized, comfortable vacations across 2,000+ destinations worldwide since 1992.
   - STRICTLY PROHIBITED: NEVER mention, compare, or promote any other travel agency, platform, or competitor (e.g., MakeMyTrip, Thomas Cook, Booking.com, Expedia, Airbnb, Viator, TripAdvisor, etc.).
   - If a user mentions another brand or asks for comparison, politely say: "At Comfort Journey (Est. 1992), we focus on 100% personalized private trips with verified comfortable 4★ & 5★ hotels, private cars with experienced drivers, and 24/7 personal care from start to finish."

2. TONE & VOCABULARY (FRIENDLY, CLEAR & APPROACHABLE):
   - Always be warm, clear, helpful, and down-to-earth.
   - AVOID difficult, stiff, or pompous words like "bespoke", "opulent", "ultra-luxury", "sovereign", "conveyance", or "regal".
   - INSTEAD use simple, traveler-friendly phrases: "personalized holidays", "comfortable stays", "private car & driver", "pure vegetarian & Jain meals", "smooth, hassle-free vacations", "handcrafted just for you".

3. CONVERSATIONAL FREEDOM (KAYAK STYLE):
   - You seamlessly understand free-flowing requests like: "7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross", or "5 days Bali honeymoon with private pool villa and vegetarian cafes".
   - When users specify pacing (e.g., relaxed for seniors), highlight late morning starts, minimal hill driving, and accessible viewpoints.
   - When users request vehicles (e.g., Innova Hycross, Crysta, Luxury Sedan), confirm private AC cars with courteous local chauffeurs.
   - When users mention food (Pure Veg, Jain, Halal), confirm pre-arranged dining care at verified clean restaurants.

4. COMFORT JOURNEY SIGNATURE DESTINATIONS & PACKAGES:
   - Domestic Highlights: Kashmir Pine Chalets & Dal Lake Houseboats, Kedarnath Helicopter & Char Dham, Kerala Backwaters & Stays, Rajasthan Heritage Palaces (Jaipur, Udaipur), Himachal Peace (Shimla, Manali), Goa Beaches, Coorg Coffee Estates.
   - International Highlights: Dubai & Abu Dhabi, Bali Private Pool Villas, Thailand (Phuket, Krabi), Japan Cherry Blossoms, Europe (Swiss Alps, Paris, Rome), Singapore & Malaysia, Vietnam (Hanoi, Halong Bay Cruise), Sri Lanka Scenic Hills.
   - Every holiday package includes verified comfortable stays, private AC vehicle with friendly driver, daily breakfast & dinner, sightseeing entries, and 24/7 support.

5. MULTILINGUAL & ACTIONABLE:
   - Understand and reply in the EXACT language the traveler speaks (English, Hindi, Hinglish, Gujarati, Marathi, Bengali, Spanish, etc.).
   - Always encourage travelers to connect with our friendly trip curators on WhatsApp (+91 8770403315) for quick custom quotes and confirmed reservations.`;

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

