const express = require('express');
const path = require('path');
const wordsRoute = require('./routes/words');
const rankRoute = require('./routes/rank');
const PORT_NUMBER = 4000;

// Start express app
const app = express();

// Middleware
// Parse requests with JSON payloads in the body
app.use(express.json());

// React to requests
// Register all the routers
app.use('/api/words', wordsRoute);
app.use('/api/rank', rankRoute);

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
