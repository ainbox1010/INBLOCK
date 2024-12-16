import { motion } from 'framer-motion'
import { ChatBubbleLeftRightIcon, ChartBarIcon, CpuChipIcon, BoltIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI-Powered Trading Assistant',
    description: 'Get real-time trading insights and recommendations from our advanced AI models trained on vast amounts of market data.',
    icon: CpuChipIcon,
    color: 'blue'
  },
  {
    name: 'Market Analysis',
    description: 'Comprehensive market analysis including technical indicators, sentiment analysis, and trend predictions.',
    icon: ChartBarIcon,
    color: 'green'
  },
  {
    name: 'Real-time Chat Support',
    description: 'Get instant answers to your trading questions from our AI-powered chat assistant available 24/7.',
    icon: ChatBubbleLeftRightIcon,
    color: 'purple'
  },
  {
    name: 'Automated Trading Bots',
    description: 'Set up and customize trading bots that execute trades based on your predefined strategies and AI recommendations.',
    icon: BoltIcon,
    color: 'yellow'
  },
  {
    name: 'Portfolio Optimization',
    description: 'AI-driven portfolio recommendations to help you achieve the optimal balance of risk and reward.',
    icon: RocketLaunchIcon,
    color: 'red'
  },
  {
    name: 'Security First',
    description: 'Enterprise-grade security measures to protect your data and trading activities.',
    icon: ShieldCheckIcon,
    color: 'indigo'
  }
]

const colorClasses = {
  blue: 'bg-gold-900/20 text-gold-400',
  green: 'bg-green-900/20 text-green-300',
  purple: 'bg-purple-900/20 text-purple-300',
  yellow: 'bg-gold-600/20 text-gold-300',
  red: 'bg-red-900/20 text-red-300',
  indigo: 'bg-gold-800/20 text-gold-300'
}

export default function FeaturesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Powerful Features for Smart Trading
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our AI-powered platform provides you with the tools and insights you need to trade with confidence
            </p>
          </motion.div>
        </div>
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
                    <button className="text-sm font-semibold leading-6 text-gold-400 hover:text-gold-300">
                      Learn more <span aria-hidden="true">→</span>
                    </button>
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        {/* Additional Feature Highlight Section */}
        <motion.div 
          className="mt-32 sm:mt-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gray-800 px-6 py-20 shadow-xl sm:px-24 xl:px-32">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Coming Soon: Advanced Trading Bots
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-300">
              Our next-generation trading bots will combine AI insights with customizable trading strategies to help you trade more effectively in any market condition.
            </p>
            <div className="mt-8 flex justify-center">
              <button className="rounded-md bg-gold-700 px-8 py-3 text-base font-medium text-gray-900 hover:bg-gold-600">
                Join Waitlist
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 