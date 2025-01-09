import { motion, useAnimationControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import DemoChatWindow from '../../components/DemoChatWindow';
import WaveTerrain from '../../components/backgrounds/WaveTerrain';
import { useTheme } from '../../contexts/ThemeContext';
import { useEffect } from 'react';

export default function LandingPageModern() {
    const theme = useTheme();
    const controls1 = useAnimationControls();
    const controls2 = useAnimationControls();
    const controls3 = useAnimationControls();
    const controls4 = useAnimationControls();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        
        const sequence = async () => {
            while (true) {  // Infinite loop
                // First bullet
                await controls1.start({ opacity: 1 });
                await new Promise(resolve => setTimeout(resolve, 2000));
                await controls1.start({ opacity: 0.5 });
                
                // Second bullet
                await controls2.start({ opacity: 1 });
                await new Promise(resolve => setTimeout(resolve, 2000));
                await controls2.start({ opacity: 0.5 });
                
                // Third bullet
                await controls3.start({ opacity: 1 });
                await new Promise(resolve => setTimeout(resolve, 2000));
                await controls3.start({ opacity: 0.5 });
                
                // Fourth bullet
                await controls4.start({ opacity: 1 });
                await new Promise(resolve => setTimeout(resolve, 2000));
                await controls4.start({ opacity: 0.5 });
            }
        };

        sequence();
    }, []);

    return (
        <>
            {/* Background Layer - Fixed position behind everything */}
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            {/* Content Layer - Scrollable content */}
            <div className="relative z-10">
                {/* Top Announcement Bar */}
                <motion.div 
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border-b border-accent-purple/20"
                >
                    <div className="max-w-7xl mx-auto py-1 px-4">
                        <div className="marquee-container">
                            <div className="marquee-content">
                                {/* Just two copies for seamless loop */}
                                <span className="text-sm text-gray-300 mx-4">
                                    InBlock AI Presale is NOW OPEN! 🚀 Secure your discounted tokens and gain exclusive early access to cutting-edge AI-blockchain technology. 🌐 Don't miss out—be a part of the future of innovation today!
                                </span>
                                <span className="text-sm text-gray-300 mx-4">
                                    InBlock AI Presale is NOW OPEN! 🚀 Secure your discounted tokens and gain exclusive early access to cutting-edge AI-blockchain technology. 🌐 Don't miss out—be a part of the future of innovation today!
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Left Column */}
                        <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                                        InBlock
                                    </span>
                                    <br />
                                    <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                                        Your AI Agent Swarm for Crypto
                                    </span>
                                </h1>

                                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink mb-4">
                                    Start Your Journey:
                                </h2>

                                <ul className="mt-6 space-y-4 text-lg text-gray-300 max-w-2xl">
                                    <motion.li 
                                        animate={controls1}
                                        initial={{ opacity: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-start"
                                    >
                                        <span className="text-gray-300 mr-2">•</span>
                                        <span>
                                            <strong className="text-gray-300">
                                                Learn the Basics:
                                            </strong>
                                            {' '}
                                            Understand crypto trading fundamentals with patient, beginner-friendly Agent guidance.
                                        </span>
                                    </motion.li>
                                    <motion.li 
                                        animate={controls2}
                                        initial={{ opacity: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-start"
                                    >
                                        <span className="text-gray-300 mr-2">•</span>
                                        <span>
                                            <strong className="text-gray-300">
                                                Get Expert Advice:
                                            </strong>
                                            {' '}
                                            Receive AI-driven insights on the best narratives and tokens to invest in.
                                        </span>
                                    </motion.li>
                                    <motion.li 
                                        animate={controls3}
                                        initial={{ opacity: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-start"
                                    >
                                        <span className="text-gray-300 mr-2">•</span>
                                        <span>
                                            <strong className="text-gray-300">
                                                Automate Your Trades:
                                            </strong>
                                            {' '}
                                            When you're ready, let our advanced trading Agents execute complex, on-chain transactions seamlessly on your behalf.
                                        </span>
                                    </motion.li>
                                    <motion.li 
                                        animate={controls4}
                                        initial={{ opacity: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-start"
                                    >
                                        <span className="text-gray-300 mr-2">•</span>
                                        <span>
                                            <strong className="text-gray-300">
                                                Start building your own AI Agents:
                                            </strong>
                                            {' '}
                                            Create and customize your own sentient AI-powered trading partner, with agent templates focused on each crypto sub-vertical, and-out-of the box X.com and Telegram integrations.
                                        </span>
                                    </motion.li>
                                </ul>

                                <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
                                    <Link 
                                        to="/register"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25"
                                    >
                                        JOIN PRESALE
                                    </Link>
                                    <Link 
                                        to="/features"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-primary-800 text-white hover:bg-primary-700 transition-all duration-200 border border-accent-purple/20"
                                    >
                                        FEATURES
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Right Column - Chat Window */}
                        <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-pink rounded-2xl blur-2xl opacity-20" />
                                <div className="relative">
                                    <DemoChatWindow />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 