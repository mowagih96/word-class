const express = require('express');
const router = express.Router();
const { wordList } = require('../TestData.json');
const wordListLength = wordList.length;
const OBJECTS_NUMBER = 10;

// Generate random number within a range (from 0 to max number)
const generateRandomNumber = (max) => Math.floor(Math.random() * max);

// Generate 10 random Object words from the 'wordList' data based on the following critieria:
// - The Array should include at least 1 Adjective, 1 Adverb, 1 Noun and 1 Verb.
// - If the generated Array didn't meet the critieria, The function re-runs again until the criteria is met.
const generateRandomWordsList = () => {
  const arr = [];
  const criteria = {
    adjective: 0,
    adverb: 0,
    noun: 0,
    verb: 0,
  };

  for (let i = 0; i < OBJECTS_NUMBER; i++) {
    let currWord = wordList[generateRandomNumber(wordListLength)];

    if (arr.find((item) => item.id === currWord.id)) i--;
    else {
      criteria[currWord.pos] += 1;
      arr.push(currWord);
    }
  }

  if (!Object.values(criteria).every((value) => value > 0))
    return generateRandomWordsList();

  return arr;
};

// GET 10 random Object words Array
router.get('/ten-random-words', (req, res) =>
  res.send({ wordList: generateRandomWordsList() })
);

module.exports = router;
