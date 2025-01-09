import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DemoChatWindow from '../../components/DemoChatWindow'
import NetworkNodes from '../../components/backgrounds/NetworkNodes'
import { 
    BeakerIcon, 
    BoltIcon, 
    ChartBarIcon, 
    ShieldCheckIcon, 
    CpuChipIcon, 
    CommandLineIcon 
} from '@heroicons/react/24/outline'

const features = [
    {
        icon: CpuChipIcon,
        title: "AI-Powered Analysis",
        description: "Advanced machine learning models analyze market patterns and predict trends",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: ChartBarIcon,
        title: "Real-time Trading",
        description: "Execute trades automatically based on AI-generated signals",
        gradient: "from-blue-500 to-purple-500"
    },
    {
        icon: ShieldCheckIcon,
        title: "Secure Infrastructure",
        description: "Enterprise-grade security protecting your assets and data",
        gradient: "from-pink-500 to-rose-500"
    },
    {
        icon: BoltIcon,
        title: "Lightning Fast",
        description: "High-frequency trading capabilities with minimal latency",
        gradient: "from-indigo-500 to-blue-500"
    },
    {
        icon: BeakerIcon,
        title: "Strategy Testing",
        description: "Backtest your trading strategies with historical data",
        gradient: "from-rose-500 to-orange-500"
    },
    {
        icon: CommandLineIcon,
        title: "API Integration",
        description: "Connect with major exchanges and trading platforms",
        gradient: "from-green-500 to-teal-500"
    }
]

const FeatureCard = ({ feature, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative p-6 rounded-2xl bg-gray-800/50 border border-gray-700 overflow-hidden group hover:border-gray-600 transition-all duration-300"
    >
        {/* Gradient Background */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${feature.gradient}`} />
        
        {/* Icon */}
        <feature.icon className="h-8 w-8 text-white mb-4" />
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2">
            {feature.title}
        </h3>
        <p className="text-gray-400">
            {feature.description}
        </p>
    </motion.div>
)

export default function LandingPageFeature() {
    return (
        <>
            {/* Background Layer - Fixed position behind everything */}
            <div className="fixed inset-0 z-0">
                <NetworkNodes />
            </div>
            
            {/* Content Layer - Scrollable content */}
            <div className="relative z-10">
                {/* Top Announcement Bar */}
                <motion.div 
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="relative z-10 w-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border-b border-accent-purple/20"
                >
                    <div className="max-w-7xl mx-auto py-2 px-4">
                        <p className="text-sm text-center text-gray-300">
                            🚀 Experience the power of AI-driven trading - Join the revolution now!
                        </p>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                                    Next-Gen Trading
                                </span>
                                {" "}Platform
                            </h1>
                            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
                                Harness the power of artificial intelligence to revolutionize your trading strategy
                            </p>
                            
                            <div className="mt-10 flex justify-center gap-4">
                                <Link 
                                    to="/register"
                                    className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25"
                                >
                                    Start Trading
                                </Link>
                                <Link 
                                    to="/demo"
                                    className="px-8 py-3 text-base font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200 border border-gray-700"
                                >
                                    View Demo
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} index={index} />
                        ))}
                    </div>

                    {/* Demo Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative max-w-4xl mx-auto"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-pink rounded-2xl blur-2xl opacity-20" />
                        <div className="relative">
                            <DemoChatWindow />
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
} 