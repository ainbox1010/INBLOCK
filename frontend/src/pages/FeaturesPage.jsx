import { motion } from 'framer-motion';
import { 
    BeakerIcon as BrainIcon,
    ChartBarIcon, 
    ShareIcon, 
    CubeIcon as CubeTransparentIcon 
} from '@heroicons/react/24/outline';

const features = [
    {
        title: "AI Agent for Comprehensive Analysis",
        description: "Our AI Agents analyze extensive crypto market data to generate detailed reports, forecasts, and trend insights, offering actionable intelligence on market movements.",
        icon: BrainIcon
    },
    {
        title: "AI Trading Agent & Wallet Management",
        description: "Beginning with a focus on AI tokens (like Virtuals and ai16z) before expanding to other verticals in crypto, InBlock's AI Agents uncover and execute profitable trading opportunities by monitoring social sentiment, wallet activity, price trends, and other key metrics.",
        icon: ChartBarIcon
    },
    {
        title: "Autonomous Social Sharing",
        description: "Seamlessly integrated with social platforms like X.com and Telegram, our AI Agents autonomously post insights, signals and curated market analysis, engaging followers with timely and relevant content.",
        icon: ShareIcon,
        links: [
            {
                name: "X.com",
                url: "https://x.com/InBlockAI"
            },
            {
                name: "Telegram",
                url: "https://web.telegram.org/a/#-1001901930536"
            }
        ]
    }
];

export default function FeaturesPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            {/* Main Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-lg bg-primary-800/50 border border-accent-purple/20 hover:border-accent-pink/40 transition-colors"
                    >
                        <feature.icon className="w-12 h-12 text-accent-purple mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">
                            {feature.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {feature.description}
                        </p>
                        {feature.links && (
                            <div className="flex gap-4 mt-4">
                                {feature.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent-purple hover:text-accent-pink flex items-center"
                                    >
                                        {link.name}
                                        <span className="text-xs ml-1">↗</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Coming Soon Platform Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-8 rounded-lg bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border border-accent-purple/20"
            >
                <div className="flex items-center mb-4">
                    <CubeTransparentIcon className="w-12 h-12 text-accent-purple mr-4" />
                    <div>
                        <span className="px-3 py-1 text-sm rounded-full bg-accent-purple/20 text-accent-pink">
                            Coming Soon in Q2
                        </span>
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                    InBlock Agentic Platform
                </h3>
                <p className="text-gray-300">
                    Initially launching our AI Agents inhouse, in Q2 InBlock will roll out the InBlock Agentic Platform, 
                    making available a framework for users to create and customise their own AI Agents using our technology 
                    and tools, and benefit from an expanded platform of Plugins and APIs.
                </p>
            </motion.div>
        </div>
    );
} 