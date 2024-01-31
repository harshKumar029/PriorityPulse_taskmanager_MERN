// Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './L&s.css'
import { login } from '../../utility/apiService'; // Adjust the path as per your project structure
import Navbar from '../../components/Navbar';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Call the login function from the API service
            const response = await login({ email: username, password: password });
            console.log("resposnse data ", response)

            // Check if the login was successful
            if (response.success) {
                localStorage.setItem("name", response.name);
                localStorage.setItem("Token", response.token);
                localStorage.setItem("email",response.email);
                navigate("/");
                if (!response.success) {
                    alert("Enter valid credentials")
                }

            } else {
                // Handle unsuccessful login
                console.log('Login unsuccessful:', response.message);
            }
        } catch (error) {
            console.error('Error while login:', error);
        }
    };

    return (
        <div className='loginsignup'>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <div className="formcontainer">
                    <h2>Access Your Account</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your email" required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password" required
                        />
                    </div>
                    <div className='accbutton'>
                        <button type="submit">Log In</button>
                        <Link to='/createuser' className="login" >i'm a new user.</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
