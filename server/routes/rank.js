const express = require('express');
const router = express.Router();
const { scoresList } = require('../TestData.json');

// Calculates the student's rank based on the final score
// - If the result is an Integer number, It is returned as it is.
// - If the result is a float number, It is rounded to the nearest hundredth.
const calculateRank = (finalScore) => {
  const scoresListLength = scoresList.length;
  let counter = 0;

  for (let i = 0; i < scoresListLength; i++) {
    if (score[i] < finalScore) counter++;
  }

  const rank = (counter / scoresListLength) * 100;

  return Number.isInteger(rank) ? rank : rank.toFixed(2);
};

// POST the student's rank
router.post('/score', (req, res) => {
  const { finalScore } = req.body;
  const rank = calculateRank(finalScore);

  res.send({ rank });
});

module.exports = router;
