import React, { useState } from 'react';
import { signup } from '../../utility/apiService'; // Import your signup function
import './L&s.css'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

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
        if (!response.success) {
          alert("Enter valid credentials")
        }
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
      <Navbar />
      <div className='loginsignup'>
      <form onSubmit={handleSubmit}>
      <div className="formcontainer">
        <h2>Create your Account</h2>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className='accbutton'>
            <button type="submit">Sign Up</button>
            <Link to='/login'>Already a user</Link>
        </div>
        </div>
      </form>
      </div>
    </>
  );
};

export default Signup;
