import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import WaveTerrain from '../components/backgrounds/WaveTerrain';

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
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
    
    // Check verification status
    useEffect(() => {
        const checkVerification = async () => {
            try {
                const response = await axios.get('/api/auth/verification-status/');
                setIsAlreadyVerified(response.data.is_verified);
            } catch (err) {
                console.error('Error checking verification status:', err);
            }
        };
        checkVerification();
    }, []);
    
    const verifyEmail = async ({ token, code }) => {
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:8000/api/auth/verify-email/', {
                token,
                code
            });

            if (response.data.message === 'already_verified') {
                setIsAlreadyVerified(true);
                return;
            }

            // Store tokens and user info
            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Navigate to chat
            navigate('/chat');
        } catch (error) {
            setError(error.response?.data?.error || 'Verification failed');
            if (token) {
                setCode('');  // Clear code field for manual entry
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-primary-900 relative">
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            <div className="relative z-10 container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto bg-primary-800/50 backdrop-blur-sm rounded-xl p-8 border border-accent-purple/20"
                >
                    {isAlreadyVerified ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Email Already Verified
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Your email has been successfully verified. You can now access InBlock AI.
                            </p>
                            <Link 
                                to="/chat"
                                className="inline-block px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90"
                            >
                                Continue to InBlock AI
                            </Link>
                        </div>
                    ) : (
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
                    )}

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