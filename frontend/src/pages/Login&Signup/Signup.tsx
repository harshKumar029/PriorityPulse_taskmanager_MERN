import React, { useState } from 'react';
import { signup } from '../../utility/apiService'; // Import your signup function
import Navbar from '../../components/Navbar';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Call the signup function from the API service
      const response = await signup({ name: name, email: email, password: password });

      // Check if the signup was successful
      if (response.success) {
        console.log('Signup successful');
        // Redirect the user to the dashboard or other authenticated page
      } else {
        // Handle unsuccessful signup
        console.log('Signup unsuccessful:', response.message);
      }
    } catch (error) {
      console.error('Error while signup:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Signup</button>
    </form>
    </>
  );
};

export default Signup;
