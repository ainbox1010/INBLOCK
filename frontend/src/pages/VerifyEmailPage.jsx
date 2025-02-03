import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import WaveTerrain from '../components/backgrounds/WaveTerrain';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    
    // If token in URL, verify automatically
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            verifyEmail({ token });
        }
    }, []);  // Only run once when component mounts
    
    const verifyEmail = async ({ token, code }) => {
        setIsLoading(true);
        setError('');  // Clear any previous errors
        
        try {
            const response = await axios.post('http://localhost:8000/api/auth/verify-email/', {
                token,
                code
            });

            // Store tokens and user info
            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Navigate to chat instead of login
            navigate('/chat');
        } catch (error) {
            setError(error.response?.data?.error || 'Verification failed');
            // If token verification fails, allow manual code entry
            if (token) {
                setCode('');  // Clear code field for manual entry
            }
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
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                            Verify Your Email
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            {email 
                                ? `We sent a verification code to ${email}`
                                : 'Please enter your verification code'
                            }
                        </p>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        verifyEmail({ code });
                    }} className="mt-8 space-y-6">
                        <div className="rounded-lg backdrop-blur-sm bg-primary-800/50 p-4 border border-accent-purple/20">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                                placeholder="Enter verification code"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-accent-purple to-accent-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple transition-all duration-200"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
} 