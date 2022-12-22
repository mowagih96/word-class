require('dotenv').config();
const express = require('express');
const path = require('path');

// Start express app
const app = express();

// Serve React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// React to requests
// Route handling
app.get('/words', (req, res) => {
  res.send({ msg: 'hello' });
});

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
