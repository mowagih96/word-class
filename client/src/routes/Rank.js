import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import rankStudent from '../api/rank';

const Rank = () => {
  const [studentRank, setStudentRank] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // On the initial mount and 'studentFinalScore' state change:
  // - Initiate a POST request to the backend server and wait for the response with the rank.
  // - If the request succeeded update the 'studentRank' state.
  // - If the request failed log the error to the console.
  useEffect(() => {
    const getStudentRank = async () => {
      try {
        const { status, data } = await rankStudent(state.studentFinalScore);

        if (status === 200) setStudentRank(data.rank);
      } catch (error) {
        console.error(error);
      }
    };

    if (state?.studentFinalScore) getStudentRank();
  }, [state?.studentFinalScore]);

  // Redirect to the Home route if the student tried to access the Rank route
  // from the address bar by typing /rank without entering a name in the form or answering the questions.
  if (!state) return <Navigate to='/' />;

  return (
    <div className='rank-layout'>
      <Confetti width={width - 10} height={height - 10} recycle />
      {studentRank && (
        <>
          <div className='congratulations-message'>{`Congratulations ${state.studentName}! 🎉🎉🎉`}</div>
          <div className='congratulations-message'>{` Your Rank is ${studentRank}`}</div>
          <Button
            className='try-again-button'
            size='lg'
            onClick={() => navigate('/practice', { state: state.studentName })}
          >
            Try again
          </Button>
        </>
      )}
    </div>
  );
};

export default Rank;
