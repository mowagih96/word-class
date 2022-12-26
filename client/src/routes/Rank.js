import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import rankStudent from '../api/rank';

const Rank = () => {
  const [studentRank, setStudentRank] = useState(null);
  const { state: studentScore } = useLocation();
  const navigate = useNavigate();

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
      {studentRank ? `Student Rank: ${studentRank}` : ''}
      <Button onClick={() => navigate('/practice')}>Try again</Button>
    </div>
  );
};

export default Rank;
