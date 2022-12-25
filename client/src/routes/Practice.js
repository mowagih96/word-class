import { useEffect } from 'react';
import getTenRandomWords from '../api/words';

const Practice = () => {
  useEffect(() => {
    const getWordList = async () => {
      try {
        const { status, data } = await getTenRandomWords();

        if (status === 200) console.log(data.wordList);
      } catch (error) {
        console.error(error);
      }
    };

    getWordList();
  }, []);

  return <div>Practice</div>;
};

export default Practice;
