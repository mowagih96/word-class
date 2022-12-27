import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import rankStudent from '../api/rank';

const Rank = () => {
  const [studentRank, setStudentRank] = useState(null);
  const {
    state: { studentName, studentFinalScore },
  } = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // On the initial mount and 'studentFinalScore' state change:
  // - Initiate a POST request to the backend server and wait for the response with the rank.
  // - If the request succeeded update the 'studentRank' state.
  // - If the request failed log the error to the console.
  useEffect(() => {
    const getStudentRank = async () => {
      try {
        const { status, data } = await rankStudent(studentFinalScore);

        if (status === 200) setStudentRank(data.rank);
      } catch (error) {
        console.error(error);
      }
    };

    getStudentRank();
  }, [studentFinalScore]);

  return (
    <div>
      <Confetti width={width} height={height} recycle={false} />
      {studentRank
        ? `Congratulations ${studentName}! Your Rank is ${studentRank}`
        : ''}
      <Button onClick={() => navigate('/practice')}>Try again</Button>
    </div>
  );
};

export default Rank;
