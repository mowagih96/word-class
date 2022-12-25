import { useState, useEffect } from 'react';
import { Button, Progress } from '@mantine/core';
import getTenRandomWords from '../api/words';

const Practice = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const getWordList = async () => {
      try {
        const { status, data } = await getTenRandomWords();

        if (status === 200) setWordList(data.wordList);
      } catch (error) {
        console.error(error);
      }
    };

    getWordList();
  }, []);

  useEffect(() => {
    setCurrentWord(wordList[counter]);
    setIsFetching(false);
  }, [wordList, counter]);

  const checkAnswer = (answer) => {
    if (currentWord.pos === answer) setFeedback('Correct! :)');
    else setFeedback('Wrong! :(');

    setTimeout(() => {
      setFeedback('');
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
  };

  return (
    <div>
      {isFetching ? (
        <div>Fetching...</div>
      ) : (
        <>
          <div>{currentWord?.word}</div>
          <div>
            <Button
              variant='gradient'
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
              onClick={() => checkAnswer('noun')}
            >
              noun
            </Button>
            <Button
              variant='gradient'
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              onClick={() => checkAnswer('adverb')}
            >
              adverb
            </Button>
            <Button
              variant='gradient'
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              onClick={() => checkAnswer('adjective')}
            >
              adjective
            </Button>
            <Button
              variant='gradient'
              gradient={{ from: 'orange', to: 'red' }}
              onClick={() => checkAnswer('verb')}
            >
              verb
            </Button>
          </div>
          {feedback && <div>{feedback}</div>}
          <div>
            <Progress size='xl' value={(counter / wordList.length) * 100} />
            {`${counter} / ${wordList.length}`}
          </div>
        </>
      )}
    </div>
  );
};

export default Practice;
