require('dotenv').config();
const express = require('express');

// Start express app
const app = express();

// React to requests
// Route handling
app.get('/', (req, res) => {
  res.send('<p>Hello World!</p>');
});

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
