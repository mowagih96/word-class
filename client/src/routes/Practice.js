import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Button, Progress } from '@mantine/core';
import getTenRandomWords from '../api/words';

const Practice = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [wordList, setWordList] = useState([]);
  const [answeredQuestionsCounter, setAnsweredQuestionsCounter] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [cantClick, setCantClick] = useState(false);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { state: studentName } = useLocation();

  // On the initial mount and on 'studentName' state change:
  // - If the 'studentName' state is populated:
  //  - Fetch the words data from the backend server.
  //  - If the request succeeded update the 'wordList' state.
  //  - If the request failed log the error.
  useEffect(() => {
    const getWordList = async () => {
      try {
        const { status, data } = await getTenRandomWords();

        if (status === 200) setWordList(data.wordList);
      } catch (error) {
        console.error(error);
      }
    };

    if (studentName) getWordList();
  }, [studentName]);

  // On the initial mount and 'wordList' & 'answeredQuestionsCounter' states change:
  // - Update the 'currentWord' state to the right word based on 'answeredQuestionsCounter' state.
  // - Disable the fetching message.
  useEffect(() => {
    setCurrentWord(wordList[answeredQuestionsCounter]);
    setIsFetching(false);
  }, [wordList, answeredQuestionsCounter]);

  // Calculate the student's final score using the following formula:
  // - (number of correct answers / total number of questions) * 100
  const calculateStudentFinalScore = () =>
    (correctAnswersCount / wordList.length) * 100;

  // Check the student's answer by doing the following:
  // - Prevent the student from clicking on any other choices buttons while showing feedback.
  // - Shows the student a positive or negative feedback depending on their answer.
  // - If the student chose the correct answer increment the 'correctAnswersCount' state.
  // - After half a second, Reset the feedback and let the student click the choices buttons again and
  // - If the  'answeredQuestionsCounter' state doesn't equal to 9 increment it to move to the next question
  // - Otherwise automatically navigate the student to the 'rank' route.
  const checkAnswer = (answer) => {
    setCantClick(true);

    if (currentWord.pos === answer) {
      setFeedback('Correct! :)');
      setCorrectAnswersCount(
        (prevCorrectAnswersCount) => prevCorrectAnswersCount + 1
      );
    } else setFeedback('Wrong! :(');

    setTimeout(() => {
      setFeedback('');
      setCantClick(false);

      if (answeredQuestionsCounter === 9)
        navigate('/rank', {
          state: {
            studentName,
            studentFinalScore: calculateStudentFinalScore(),
          },
        });
      else setAnsweredQuestionsCounter((prevCounter) => prevCounter + 1);
    }, 500);
  };

  // Redirect to the Home route if the student tried to access the Practice route
  // from the address bar by typing /practice without entering a name to bypass the form.
  if (!studentName) return <Navigate to='/' />;

  return (
    <div className='layout2'>
      {isFetching ? (
        <div>Fetching...</div>
      ) : (
        <>
          <div className='current-word'>{currentWord?.word}</div>
          <div className='choices-button-group'>
            <Button
              variant='gradient'
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
              disabled={cantClick}
              onClick={() => checkAnswer('noun')}
            >
              noun
            </Button>
            <Button
              variant='gradient'
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              disabled={cantClick}
              onClick={() => checkAnswer('adverb')}
            >
              adverb
            </Button>
            <Button
              variant='gradient'
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              disabled={cantClick}
              onClick={() => checkAnswer('adjective')}
            >
              adjective
            </Button>
            <Button
              variant='gradient'
              gradient={{ from: 'orange', to: 'red' }}
              disabled={cantClick}
              onClick={() => checkAnswer('verb')}
            >
              verb
            </Button>
          </div>
          {feedback && <div>{feedback}</div>}
          <Progress
            className='progress-bar'
            label={`${answeredQuestionsCounter} / ${wordList.length}`}
            size='xl'
            value={(answeredQuestionsCounter / wordList.length) * 100}
          />
        </>
      )}
    </div>
  );
};

export default Practice;
