import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DemoChatWindow from '../../components/DemoChatWindow';
import WaveTerrain from '../../components/backgrounds/WaveTerrain';

export default function LandingPageModern() {
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
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="w-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border-b border-accent-purple/20"
                >
                    <div className="max-w-7xl mx-auto py-2 px-4">
                        <p className="text-sm text-center text-gray-300">
                            🚀 InBlock AI Presale is NOW LIVE! Be part of the future—claim your discounted tokens and exclusive access to revolutionary AI-blockchain technology. ⚡️ Don't wait, join the innovation!
                        </p>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    {/* Rest of the content stays the same */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Left Column */}
                        <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Stage Indicator */}
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-800/50 border border-accent-purple/20 mb-8">
                                    <span className="text-accent-purple font-semibold">Stage 8 - Buy INBLOCK Now</span>
                                </div>

                                <h1 className="text-6xl font-bold tracking-tight text-white mb-6">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                                        InBlock AI
                                    </span>
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                                        Protocol
                                    </span>
                                </h1>
                                
                                <p className="mt-6 text-lg text-gray-300 max-w-2xl">
                                    Revolutionizing crypto trading with AI-powered insights and automated strategies.
                                </p>

                                {/* Price Display */}
                                <div className="mt-8 p-4 rounded-lg bg-primary-800/50 border border-accent-purple/20 inline-block">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-gray-400">Current Price</div>
                                            <div className="text-accent-purple font-bold">$0.00375</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400">Next Stage</div>
                                            <div className="text-accent-pink font-bold">$0.00425</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
                                    <Link 
                                        to="/register"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25"
                                    >
                                        CONNECT WALLET
                                    </Link>
                                    <Link 
                                        to="/whitepaper"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-primary-800 text-white hover:bg-primary-700 transition-all duration-200 border border-accent-purple/20"
                                    >
                                        READ WHITEPAPER
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