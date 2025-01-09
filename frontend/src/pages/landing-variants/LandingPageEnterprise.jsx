import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DemoChatWindow from '../../components/DemoChatWindow'
import CircuitGrid from '../../components/backgrounds/CircuitGrid'
import { 
    ShieldCheckIcon, 
    ServerIcon, 
    CpuChipIcon,
    LockClosedIcon,
    CloudArrowUpIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline'

const enterpriseFeatures = [
    {
        icon: ShieldCheckIcon,
        title: "Enterprise Security",
        description: "Military-grade encryption and secure data handling"
    },
    {
        icon: ServerIcon,
        title: "Dedicated Infrastructure",
        description: "High-availability servers with 99.99% uptime"
    },
    {
        icon: CpuChipIcon,
        title: "Custom AI Models",
        description: "Tailored AI solutions for your specific needs"
    },
    {
        icon: LockClosedIcon,
        title: "Compliance Ready",
        description: "GDPR, HIPAA, and SOC2 compliant"
    },
    {
        icon: CloudArrowUpIcon,
        title: "Cloud Integration",
        description: "Seamless integration with major cloud providers"
    },
    {
        icon: CommandLineIcon,
        title: "Advanced API",
        description: "Full-featured REST and GraphQL APIs"
    }
]

export default function LandingPageEnterprise() {
    return (
        <>
            {/* Background Layer - Fixed position behind everything */}
            <div className="fixed inset-0 z-0">
                <CircuitGrid />
            </div>
            
            {/* Content Layer - Scrollable content */}
            <div className="relative z-10">
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
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-800/50 border border-accent-purple/20 mb-8">
                                    <span className="text-accent-purple font-semibold">Enterprise Grade</span>
                                </div>

                                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                                        Secure AI
                                    </span>
                                    {" "}Infrastructure
                                </h1>
                                
                                <p className="mt-6 text-lg text-gray-300 max-w-2xl">
                                    Enterprise-ready AI solutions with military-grade security, dedicated infrastructure, and 24/7 support.
                                </p>

                                {/* Enterprise Features Grid */}
                                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {enterpriseFeatures.map((feature, index) => (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative p-6 rounded-2xl bg-gray-800/50 border border-gray-700 group hover:border-accent-purple/50 transition-all duration-300"
                                        >
                                            <div className="flex items-center">
                                                <feature.icon className="h-6 w-6 text-accent-purple" />
                                                <h3 className="ml-3 text-lg font-semibold text-white">
                                                    {feature.title}
                                                </h3>
                                            </div>
                                            <p className="mt-2 text-gray-400">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-10 flex gap-4 sm:justify-center lg:justify-start">
                                    <Link 
                                        to="/contact"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25"
                                    >
                                        Contact Sales
                                    </Link>
                                    <Link 
                                        to="/documentation"
                                        className="px-8 py-3 text-base font-semibold rounded-lg bg-primary-800 text-white hover:bg-primary-700 transition-all duration-200 border border-accent-purple/20"
                                    >
                                        Documentation
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