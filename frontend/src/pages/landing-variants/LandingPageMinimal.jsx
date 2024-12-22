import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DemoChatWindow from '../../components/DemoChatWindow'
import MeshGradient from '../../components/backgrounds/MeshGradient'

export default function LandingPageMinimal() {
    return (
        <div className="relative min-h-screen bg-primary-900 overflow-hidden">
            {/* Animated Background */}
            <MeshGradient />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-accent-purple/20 via-transparent to-transparent" />

            {/* Floating Elements */}
            <motion.div 
                className="absolute top-20 left-1/4 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl"
                animate={{
                    y: [0, 50, 0],
                    opacity: [0.5, 0.3, 0.5]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl"
                animate={{
                    y: [0, -50, 0],
                    opacity: [0.5, 0.3, 0.5]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Announcement Banner */}
                    <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-primary-800/50 border border-accent-purple/20 animate-glow">
                        <span className="text-accent-purple text-sm">
                            🚀 InBlock AI Presale is NOW LIVE!
                        </span>
                    </div>

                    <h1 className="text-6xl font-bold tracking-tight text-white mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                            Bridging AI
                        </span>
                        {" "}with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                            Blockchain
                        </span>
                    </h1>
                    
                    <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                        Revolutionizing intelligence through decentralized innovation.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <Link 
                            to="/register"
                            className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25"
                        >
                            JOIN NOW
                        </Link>
                        <Link 
                            to="/whitepaper"
                            className="px-8 py-3 text-base font-semibold rounded-lg bg-primary-800 text-white hover:bg-primary-700 transition-all duration-200 border border-accent-purple/20"
                        >
                            READ WHITEPAPER
                        </Link>
                    </div>
                </motion.div>

                {/* Chat Window with Glow Effect */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-pink rounded-2xl blur-2xl opacity-20" />
                    <div className="relative">
                        <DemoChatWindow />
                    </div>
                </motion.div>
            </div>
        </div>
    )
} 