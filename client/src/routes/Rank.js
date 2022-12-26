import { useState, useEffect } from 'react';
import rankStudent from '../api/rank';

const Rank = () => {
  const [studentRank, setStudentRank] = useState(null);

  useEffect(() => {
    const getStudentRank = async () => {
      try {
        const { status, data } = await rankStudent(90);

        if (status === 200) setStudentRank(data.rank);
      } catch (error) {
        console.error(error);
      }
    };

    getStudentRank();
  }, [studentRank]);
  return <div>{studentRank ? `Student Rank: ${studentRank}` : ''}</div>;
};

export default Rank;
