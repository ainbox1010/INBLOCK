import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Make the login request
            const response = await axios.post('http://localhost:8000/api/token/', {
                email,
                password
            });
            
            // Store both tokens
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);  // Changed from 'token' to 'accessToken'
            localStorage.setItem('refreshToken', refresh);
            
            // Verify token was stored
            const storedToken = localStorage.getItem('accessToken');
            if (!storedToken) {
                throw new Error('Failed to store token');
            }

            // Navigate to chat
            navigate('/chat');
        } catch (error) {
            const errorMessage = error.response?.data?.detail || error.message;
            alert('Login failed: ' + errorMessage);
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 