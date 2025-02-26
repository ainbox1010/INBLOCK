import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../services/api';
import { motion } from 'framer-motion';
import WaveTerrain from '../components/backgrounds/WaveTerrain';
import { validateEmail } from '../utils/validation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate email before submission
        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            // Add debug log
            console.log('Sending registration data:', {
                email,
                password,
                password_confirm: passwordConfirm
            });

            const response = await axios.post('/api/auth/register/', {
                email,
                password,
                password_confirm: passwordConfirm,
                username: email.split('@')[0]  // Add username
            });

            console.log('Registration response:', response.data);

            if (response.data.requires_verification) {
                navigate('/verify-email', { 
                    state: { email: email }
                });
            }
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            setError(error.response?.data?.error?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            {/* Content */}
            <div className="max-w-md w-full space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Join InBlock AI today
                        </p>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-lg backdrop-blur-sm bg-primary-800/50 p-4 border border-accent-purple/20">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`appearance-none relative block w-full px-3 py-2 border ${
                                            emailError ? 'border-red-500' : 'border-gray-700'
                                        } bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent`}
                                        placeholder="Email address"
                                    />
                                    {emailError && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {emailError}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                                        placeholder="Password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password-confirm" className="sr-only">Confirm password</label>
                                    <input
                                        id="password-confirm"
                                        type="password"
                                        required
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-accent-purple to-accent-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-200"
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>

                        <div className="text-center">
                            <span className="text-gray-400">Already have an account? </span>
                            <Link 
                                to="/login" 
                                className="font-medium text-accent-purple hover:text-accent-pink transition-colors"
                            >
                                Sign in
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
} 