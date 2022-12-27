import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button } from '@mantine/core';

const Home = () => {
  const [studentName, setStudentName] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  // Handle text input:
  // - Check if the 'isEmpty' state is true to reset the error message
  // - Update the 'studentName' state to the student's entered name
  const handleChange = (e) => {
    if (isEmpty) setIsEmpty(false);

    setStudentName(e.target.value);
  };

  // Handle form submission:
  // - Stop the page from refereshing after the student clicks the submit button.
  // - Remove all the whitespaces from both ends of the entered name.
  // - Check if the trimmed name is empty (i.e the student entered whitespaces only) to display an error message
  // - Otherwise update the 'isEmpty' state to false and
  // - Automatically navigate the user to the Practice route and pass the student's name.
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedStudentName = studentName.trim();

    if (trimmedStudentName === '') setIsEmpty(true);
    else {
      setIsEmpty(false);
      navigate('/practice', { state: trimmedStudentName });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder='Please enter your name'
          label='Full name'
          withAsterisk
          value={studentName}
          onChange={handleChange}
          error={isEmpty && 'Invalid name'}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
};

export default Home;
