/**
 * Comfort Journey - Universal Secure Serverless AI Planner Endpoint
 * Powered by Google Gemini AI with Multi-Model Fallbacks and Resilient JSON Parsing.
 * Handles free-text requests across 2,000+ destinations worldwide.
 * Compatible with AWS Lambda, Node.js microservice, and Docker.
 */

const SYSTEM_INSTRUCTION = `You are "Comfy.ai", the world-class, friendly AI Travel Concierge for "Comfort Journey" (Est. 1992, Bhopal, India).
WhatsApp & Phone Concierge: +91 9203931912.
Website: https://www.comfortjourney.in

CORE BRAND HERITAGE & RULES:
1. EXCLUSIVE IDENTITY:
   - Comfort Journey has been handcrafting 100% personalized, comfortable private vacations across 2,000+ destinations worldwide since 1992 from Bhopal.
   - We arrange private AC vehicles with verified courteous chauffeurs, handpicked 4★ & 5★ boutique hotels, and special dietary care (pure vegetarian, Jain with no onion/garlic, and Halal dining).
   - STRICTLY PROHIBITED: NEVER mention, compare, or promote any other travel agency or competitor (MakeMyTrip, Thomas Cook, Booking.com, Expedia, Viator, etc.).

2. GLOBAL TRAVEL EXPERTISE (ANY DESTINATION ON EARTH):
   - Travelers ask about ANY country, island, or city in the world (e.g. El Salvador, Peru, Iceland, Norway, Australia, Costa Rica, Egypt, Kenya, Brazil, Switzerland, Kashmir, Bali, Dubai, etc.).
   - ALWAYS acknowledge and celebrate the destination they actually asked about. Highlight real sights, culture, geography, and appeal.
   - NEVER EVER substitute their destination with an unrelated place (e.g., if the traveler asks about El Salvador, NEVER show or mention Kashmir!).
   - Standard Online Catalog vs Bespoke Global Travel:
     * Standard Catalog (Top Signature Packages): Switzerland, Kashmir, Bali, Dubai, Kerala, Rajasthan, Himachal (Manali, Shimla), Vietnam, Thailand, Japan, Singapore, Maldives, Goa, Kedarnath / Char Dham. For these, set isCustomGlobal: false.
     * Custom Global Bespoke Destinations (e.g. El Salvador, Norway, Iceland, Costa Rica, New Zealand, Peru, Egypt, etc.): set isCustomGlobal: true. Clarify that while it is not a mass-market fixed catalog package on the website, Comfort Journey specializes in 100% private custom-tailored holidays to over 2,000 destinations globally since 1992. Explain that our senior tour curators in Bhopal will coordinate private cars, boutique stays, and pure veg/Jain food. Invite them to WhatsApp (+91 9203931912).

3. MANDATORY JSON RESPONSE SCHEMA:
You MUST respond with valid JSON matching this schema:
{
  "destination": "Name of the destination queried (e.g. 'El Salvador' or 'Switzerland') or null if general question",
  "isCustomGlobal": boolean (true if outside the 14 standard catalog destinations, false otherwise),
  "reply": "Warm, conversational markdown response answering the traveler's question or greeting them. Include destination highlights, travel tips, and Comfort Journey's personal private chauffeur and boutique stay assurances.",
  "suggestedCurations": ["4-5 relevant local highlight chips for this destination, e.g. 'Ruta de las Flores', 'Lake Coatepeque'"],
  "structuredTrip": null OR {
    "title": "Itinerary Title (e.g. 5-Day Scenic El Salvador Adventure)",
    "destination": "Destination Name",
    "destKey": "lowercase_dest_key",
    "duration": "X Days / Y Nights",
    "durationDays": number (2 to 14),
    "party": "Couples / Family / Parents & Seniors",
    "pacing": "Relaxed Pace / Balanced Pace",
    "vehicle": "Private AC Toyota Innova / Private AC Sedan / Private SUV",
    "dietary": "100% Pure Vegetarian / Jain Friendly / As requested",
    "stayTier": "4★ Deluxe Boutique Hotel / 5★ Luxury Resort",
    "price": estimated number in INR per person (e.g. 49999),
    "center": [latitude, longitude],
    "days": [
      {
        "day": 1,
        "title": "Day 1 Title",
        "travelDistance": "e.g. 25 km · ~40 mins",
        "summary": "Short 1-2 sentence day summary",
        "stops": [
          {
            "time": "10:00 AM",
            "type": "transport" | "sightseeing" | "meal" | "hotel" | "shopping",
            "title": "Stop Title",
            "subtitle": "Stop description with vehicle / dining details",
            "duration": "e.g. 1 hr",
            "lat": realistic latitude number,
            "lng": realistic longitude number
          }
        ]
      }
    ],
    "highlights": ["100% Private holiday with dedicated AC vehicle", "Handpicked boutique stays verified by Comfort Journey", "Paced comfortably for your group", "Carefully planned pure veg & dining care", "24/7 dedicated personal trip manager on WhatsApp & phone"]
  }
}

INSTRUCTIONS FOR structuredTrip:
- Set structuredTrip to null when the user asks purely informational questions (e.g., "what is the best season to visit", "what hotels do you provide", "can you arrange jain food").
- Generate a full, realistic structuredTrip (with real geographic coordinates for that destination) whenever the user asks for a trip, itinerary, vacation plan, or mentions visiting/traveling to a destination (e.g. "trip to el salvador country", "plan 5 days in switzerland", "7 days in kashmir", "honeymoon in bali").`;

function robustParseGeminiJSON(rawText) {
  if (!rawText) return null;

  try {
    return JSON.parse(rawText);
  } catch (e1) {
    const clean = rawText.replace(/```(?:json)?/g, '').trim();
    try {
      return JSON.parse(clean);
    } catch (e2) {
      console.warn('Recovering malformed Gemini JSON with regex parser:', e2.message);

      let destination = null;
      const destMatch = clean.match(/"destination"\s*:\s*"([^"]+)"/i);
      if (destMatch) destination = destMatch[1];

      let isCustomGlobal = false;
      const customMatch = clean.match(/"isCustomGlobal"\s*:\s*(true|false)/i);
      if (customMatch) isCustomGlobal = customMatch[1].toLowerCase() === 'true';

      let reply = '';
      const replyMatch = clean.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/s);
      if (replyMatch) {
        try {
          reply = JSON.parse(`"${replyMatch[1]}"`);
        } catch (e3) {
          reply = replyMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        }
      }

      let suggestedCurations = [];
      const curationsMatch = clean.match(/"suggestedCurations"\s*:\s*\[(.*?)\]/s);
      if (curationsMatch) {
        try {
          suggestedCurations = JSON.parse(`[${curationsMatch[1]}]`);
        } catch (e4) {
          suggestedCurations = curationsMatch[1].split(',').map(s => s.replace(/["'\[\]]/g, '').trim()).filter(Boolean);
        }
      }

      let structuredTrip = null;
      const tripMatch = clean.match(/"structuredTrip"\s*:\s*(\{.*\})/s);
      if (tripMatch) {
        try {
          structuredTrip = JSON.parse(tripMatch[1]);
        } catch (e5) {
          // ignore partial json
        }
      }

      return {
        destination,
        isCustomGlobal,
        reply: reply || 'Welcome to Comfort Journey! We craft personalized vacations across 2,000+ destinations worldwide.',
        suggestedCurations,
        structuredTrip
      };
    }
  }
}

export async function executeGeminiPrompt({ prompt, conversationHistory = [], currentTrip = null, apiKey }) {
  const contents = [];

  if (Array.isArray(conversationHistory)) {
    conversationHistory.slice(-4).forEach(msg => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content) }]
      });
    });
  }

  let fullPrompt = prompt;
  if (currentTrip && currentTrip.destination) {
    fullPrompt += `\n[Context: Traveler currently viewing itinerary for "${currentTrip.title}" in ${currentTrip.destination}]`;
  }

  contents.push({
    role: 'user',
    parts: [{ text: fullPrompt }]
  });

  const candidateModels = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-pro-latest'
  ];
  let lastError = null;

  for (const model of candidateModels) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        signal: AbortSignal.timeout(12000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
            maxOutputTokens: 5000,
            topP: 0.95
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Gemini model ${model} returned ${response.status}:`, errText);
        lastError = errText;
        continue;
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const rawText = candidate?.content?.parts?.[0]?.text;

      if (rawText) {
        const parsed = robustParseGeminiJSON(rawText);

        return {
          success: true,
          model,
          destination: parsed?.destination || null,
          isCustomGlobal: Boolean(parsed?.isCustomGlobal),
          reply: parsed?.reply || rawText,
          suggestedCurations: Array.isArray(parsed?.suggestedCurations) ? parsed.suggestedCurations : [],
          structuredTrip: parsed?.structuredTrip || null
        };
      }
    } catch (err) {
      console.warn(`Gemini model ${model} fetch failed:`, err);
      lastError = err.message;
    }
  }

  return { fallback: true, error: lastError || 'Unable to get response from Gemini' };
}

/**
 * Universal Handler: Supports both standard (req, res) and AWS Lambda (event, context)
 */
export default async function handler(reqOrEvent, resOrContext) {
  const isLambda = !resOrContext || typeof resOrContext.status !== 'function';

  let method = 'POST';
  let body = {};

  if (isLambda) {
    method = reqOrEvent.httpMethod || reqOrEvent.requestContext?.http?.method || 'POST';
    try {
      body = typeof reqOrEvent.body === 'string' ? JSON.parse(reqOrEvent.body) : (reqOrEvent.body || {});
    } catch (e) {
      try {
        const sanitized = (reqOrEvent.body || '').replace(/\\([":{},[\]])/g, '$1');
        body = JSON.parse(sanitized);
      } catch (e2) {
        body = { prompt: reqOrEvent.body };
      }
    }
  } else {
    method = reqOrEvent.method || 'POST';
    body = reqOrEvent.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = { prompt: body };
      }
    }
  }

  const ALLOWED_ORIGINS = [
    'https://www.comfortjourney.in',
    'https://comfortjourney.in',
    'https://www.comfortjourneyy.com',
    'https://comfortjourneyy.com',
    'http://localhost:5173',
    'http://localhost'
  ];

  const origin = reqOrEvent.headers?.origin || reqOrEvent.headers?.Origin || '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  if (method === 'OPTIONS') {
    if (isLambda) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': allowOrigin,
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: ''
      };
    } else {
      resOrContext.setHeader('Access-Control-Allow-Origin', allowOrigin);
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

  if (!isLambda) {
    resOrContext.setHeader('Access-Control-Allow-Origin', allowOrigin);
  }

  if (!apiKey) {
    const fallbackResponse = {
      fallback: true,
      message: 'GEMINI_API_KEY is not configured on AWS/server. Use internal semantic engine.'
    };
    if (isLambda) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allowOrigin },
        body: JSON.stringify(fallbackResponse)
      };
    }
    return resOrContext.status(200).json(fallbackResponse);
  }

  try {
    const prompt = body.prompt;
    const conversationHistory = body.conversationHistory || [];
    const currentTrip = body.currentTrip || null;

    if (!prompt || typeof prompt !== 'string') {
      const badReq = { error: 'Missing prompt in request body' };
      if (isLambda) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allowOrigin },
          body: JSON.stringify(badReq)
        };
      }
      return resOrContext.status(400).json(badReq);
    }

    const result = await executeGeminiPrompt({ prompt, conversationHistory, currentTrip, apiKey });

    if (isLambda) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allowOrigin },
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
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allowOrigin },
        body: JSON.stringify(errObj)
      };
    }
    return resOrContext.status(200).json(errObj);
  }
}

export const lambdaHandler = handler;
