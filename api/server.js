import http from 'http';
import handler from './ai-planner.js';

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });
    return res.end();
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', async () => {
    try {
      const rawBody = Buffer.concat(chunks).toString('utf8');
      console.log(`[AI Planner] ${req.method} request received. Body: ${rawBody}`);
      
      const response = await handler({
        httpMethod: req.method,
        headers: req.headers,
        body: rawBody
      }, null);

      res.writeHead(response.statusCode || 200, response.headers || { 'Content-Type': 'application/json' });
      res.end(response.body || '');
    } catch (err) {
      console.error('AI Server error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fallback: true, error: err.message }));
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Comfort Journey AI Planner microservice listening on port ${PORT}`);
});
