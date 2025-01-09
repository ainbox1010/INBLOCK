import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Starting registration...');
        setError('');
        setIsLoading(true);

        try {
            console.log('Sending registration request...');
            const response = await axios.post('http://localhost:8000/api/auth/register/', {
                email,
                password,
                password_confirm: passwordConfirm
            });
            console.log('Registration response:', response.data);

            // Auto-login after registration
            console.log('Attempting auto-login...');
            const loginResponse = await axios.post('http://localhost:8000/api/auth/login/', {
                email,
                password
            });
            console.log('Login response:', loginResponse.data);

            // Store tokens
            localStorage.setItem('accessToken', loginResponse.data.tokens.access);
            localStorage.setItem('refreshToken', loginResponse.data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

            // Redirect to chat
            navigate('/chat');
        } catch (error) {
            console.error('Error details:', error);
            console.error('Response data:', error.response?.data);
            
            // Handle the nested error object
            let errorMessage = 'Registration failed';
            if (error.response?.data?.error?.email) {
                errorMessage = error.response?.data?.error?.email[0];
            } else if (error.response?.data?.error) {
                errorMessage = typeof error.response.data.error === 'string' 
                    ? error.response.data.error 
                    : 'Registration failed';
            }
            
            console.log('Setting error message:', errorMessage);
            setError(errorMessage);
        } finally {
            console.log('Setting loading to false');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Join InBlock AI and start your crypto journey
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-gray-400">Already have an account? </span>
                        <Link 
                            to="/login" 
                            className="text-white hover:text-gray-300 font-medium"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
} 