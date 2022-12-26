import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import rankStudent from '../api/rank';

const Rank = () => {
  const [studentRank, setStudentRank] = useState(null);
  const { state: studentScore } = useLocation();

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
  return <div>{studentRank ? `Student Rank: ${studentRank}` : ''}</div>;
};

export default Rank;
