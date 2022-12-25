import { useState, useEffect } from 'react';
import getTenRandomWords from '../api/words';

const Practice = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentWord, setCurrentWord] = useState({});

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

  return (
    <div>
      {isFetching ? <div>Fetching...</div> : <div>{currentWord?.word}</div>}
    </div>
  );
};

export default Practice;
