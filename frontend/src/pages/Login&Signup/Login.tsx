// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utility/apiService'; // Adjust the path as per your project structure
import Navbar from '../../components/Navbar';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate=useNavigate();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Call the login function from the API service
            const response = await login({ email: username, password: password });
            console.log("resposnse data ",response)

            // Check if the login was successful
            if (response.success) {
                localStorage.setItem("name",response.name);
                localStorage.setItem("Token", response.token);
                console.log(localStorage.getItem("Token"));
                navigate("/");
                // console.log(localStorage.getItem("name"));
                // Redirect the user to the dashboard or other authenticated page
            } else {
                // Handle unsuccessful login
                console.log('Login unsuccessful:', response.message);
            }
        } catch (error) {
            console.error('Error while login:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
