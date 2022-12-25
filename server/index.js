require('dotenv').config();
const express = require('express');
const path = require('path');
const wordsRoute = require('./routes/words');

// Start express app
const app = express();

// Serve React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// React to requests
// Register all the routers
app.use('/api/words', wordsRoute);

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
