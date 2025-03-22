// Node.js is a JS runtime that let's you run JS outside the browser  helps run JS on a server - and Express is
// Express is a web framework for NodeJS that make it easier to build an app on the server - like websites, API endpoints etc.

const express = require('express');         
const { createClient } = require('redis');
const cors = require('cors');

const app = express();
app.use(cors());  // this helps me resolve the classic modern web dev CORS issue - front end runs in port 4000 and backend runs in port 3000 so we need to tell the browser that it's alright

const redisClient = createClient({ url: 'redis://redis:6379' });

redisClient.connect();

app.get('/visits', async (req, res) => {
  let count = await redisClient.get('visits');
  count = count ? parseInt(count) + 1 : 1;
  await redisClient.set('visits', count);
  res.send(`Page visits: ${count}`);
});

app.listen(4000, () => {
  console.log('Node API running on http://localhost:4000');
});
