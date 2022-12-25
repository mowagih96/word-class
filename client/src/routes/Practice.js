import { useState, useEffect } from 'react';
import getTenRandomWords from '../api/words';

const Practice = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});

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
    setCurrentQuestion(wordList[counter]);
    setIsFetching(false);
  }, [wordList, counter]);

  return (
    <div>
      {isFetching ? <div>Fetching...</div> : <div>{currentQuestion?.word}</div>}
    </div>
  );
};

export default Practice;
