import axios from 'axios';

const getTenRandomWords = async () => {
  try {
    const { status, data } = await axios.get('/words/ten-random-words');

    return { status, data };
  } catch (error) {
    throw error;
  }
};

export default getTenRandomWords;
