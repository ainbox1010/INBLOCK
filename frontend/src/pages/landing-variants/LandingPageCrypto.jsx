import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DemoChatWindow from '../../components/DemoChatWindow'
import { ArrowTrendingUpIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import TradingCharts from '../../components/backgrounds/TradingCharts'

const tradingFeatures = [
    {
        icon: ArrowTrendingUpIcon,
        title: "MEME Coin Alpha",
        stats: "+420% ROI",
        description: "Early detection of trending MEME coins"
    },
    {
        icon: CurrencyDollarIcon,
        title: "Whale Tracking",
        stats: "100+ Wallets",
        description: "Monitor large wallet movements"
    },
    {
        icon: ChartBarIcon,
        title: "Market Sentiment",
        stats: "Real-time",
        description: "Social media and trading signals"
    }
]

export default function LandingPageCrypto() {
    return (
        <>
            {/* Background Layer - Fixed position behind everything */}
            <div className="fixed inset-0 z-0">
                <TradingCharts />
            </div>
            
            {/* Content Layer - Scrollable content */}
            <div className="relative z-10">
                {/* Price Ticker Banner */}
                <div className="bg-gray-800/50 py-2 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="mx-4 text-green-400">BTC +2.5%</span>
                        <span className="mx-4 text-green-400">DOGE +15%</span>
                        <span className="mx-4 text-red-400">PEPE -8%</span>
                        <span className="mx-4 text-green-400">SHIB +30%</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Left Column */}
                        <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center justify-center lg:justify-start mb-4">
                                    <span className="px-3 py-1 text-sm text-accent-purple border border-accent-purple rounded-full">
                                        420x Potential
                                    </span>
                                </div>
                                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                    MEME Coin
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                                        AI Trading Bot
                                    </span>
                                </h1>
                                <p className="mt-6 text-lg text-gray-300">
                                    Don't miss the next 100x. Our AI detects MEME coin trends before they go viral.
                                </p>

                                {/* Trading Features */}
                                <div className="mt-8 grid grid-cols-1 gap-4">
                                    {tradingFeatures.map((feature, index) => (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                                        >
                                            <feature.icon className="h-6 w-6 text-accent-purple" />
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-300">{feature.title}</p>
                                                <p className="text-lg font-bold text-accent-pink">{feature.stats}</p>
                                            </div>
                                            <p className="ml-auto text-sm text-gray-400">{feature.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 flex gap-4 sm:justify-center lg:justify-start">
                                    <Link 
                                        to="/register"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25"
                                    >
                                        START TRADING
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
    )
} 