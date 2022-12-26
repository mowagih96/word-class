import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import rankStudent from '../api/rank';

const Rank = () => {
  const [studentRank, setStudentRank] = useState(null);
  const { state: studentScore } = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const getStudentRank = async () => {
      try {
        const { status, data } = await rankStudent(studentScore);

        if (status === 200) setStudentRank(data.rank);
      } catch (error) {
        console.error(error);
      }
    };

    getStudentRank();
  }, [studentScore]);
  return (
    <div>
      <Confetti width={width} height={height} recycle={false} />
      {studentRank ? `Student Rank: ${studentRank}` : ''}
      <Button onClick={() => navigate('/practice')}>Try again</Button>
    </div>
  );
};

export default Rank;
