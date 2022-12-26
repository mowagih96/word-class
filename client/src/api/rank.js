import axios from 'axios';

const rankStudent = async (finalScore) => {
  try {
    const { status, data } = await axios.post('/rank/', { finalScore });

    return { status, data };
  } catch (error) {
    throw error;
  }
};

export default rankStudent;
