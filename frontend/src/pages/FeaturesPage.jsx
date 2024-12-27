import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, ChartBarIcon, CpuChipIcon, BoltIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import PageLayout from '../layouts/PageLayout';

const features = [
    {
        name: 'AI-Powered Trading Assistant',
        description: 'Get real-time trading insights and recommendations from our advanced AI models trained on vast amounts of market data.',
        icon: CpuChipIcon,
        color: 'blue'
    },
    {
        name: 'Market Analysis',
        description: 'Advanced technical analysis tools and market indicators to help you make informed trading decisions.',
        icon: ChartBarIcon,
        color: 'green'
    },
    {
        name: 'Smart Alerts',
        description: 'Customizable alerts powered by AI to notify you of potential trading opportunities and market movements.',
        icon: BoltIcon,
        color: 'yellow'
    },
    {
        name: 'Portfolio Management',
        description: 'Track and manage your crypto portfolio with advanced analytics and performance metrics.',
        icon: RocketLaunchIcon,
        color: 'purple'
    },
    {
        name: 'Risk Management',
        description: 'Built-in risk management tools to help you protect your investments and optimize your trading strategy.',
        icon: ShieldCheckIcon,
        color: 'red'
    },
    {
        name: 'AI Chat Support',
        description: '24/7 AI-powered chat support to answer your questions and provide guidance on trading strategies.',
        icon: ChatBubbleLeftRightIcon,
        color: 'indigo'
    }
];

const colorClasses = {
    blue: 'bg-gold-900/20 text-gold-400',
    green: 'bg-green-900/20 text-green-300',
    purple: 'bg-purple-900/20 text-purple-300',
    yellow: 'bg-gold-600/20 text-gold-300',
    red: 'bg-red-900/20 text-red-300',
    indigo: 'bg-gold-800/20 text-gold-300'
};

export default function FeaturesPage() {
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink mb-6">
                            Powerful Features for Smart Trading
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Our AI-powered platform provides you with the tools and insights you need to trade with confidence
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div 
                    className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.name}
                                className="flex flex-col"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white">
                                    <div className={`rounded-lg p-2 ${colorClasses[feature.color]}`}>
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                    <p className="flex-auto">{feature.description}</p>
                                    <p className="mt-6">
                                        <button className="text-sm font-semibold leading-6 text-accent-purple hover:text-accent-pink transition-colors">
                                            Learn more <span aria-hidden="true">→</span>
                                        </button>
                                    </p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </motion.div>

                {/* Coming Soon Section */}
                <motion.div 
                    className="mt-32 sm:mt-40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="bg-primary-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-12 hover:border-accent-purple/50 transition-all duration-300">
                        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple mb-6">
                            Coming Soon: Advanced Trading Bots
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-300">
                            Our next-generation trading bots will combine AI insights with customizable trading strategies to help you trade more effectively in any market condition.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <button className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25">
                                Join Waitlist
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    );
} 