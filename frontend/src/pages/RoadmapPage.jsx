import { motion } from 'framer-motion'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

const milestones = [
  {
    quarter: 'Q1 2024',
    title: 'Platform Launch',
    description: 'Initial release of the AI-powered trading assistant with basic features.',
    items: [
      { text: 'AI Chat Interface', completed: true },
      { text: 'Basic Market Analysis', completed: true },
      { text: 'User Authentication', completed: true },
      { text: 'Price Tracking', completed: true }
    ]
  },
  {
    quarter: 'Q2 2024',
    title: 'Enhanced Analytics',
    description: 'Introducing advanced analytics and portfolio management features.',
    items: [
      { text: 'Advanced Technical Analysis', completed: false },
      { text: 'Portfolio Tracking', completed: false },
      { text: 'Custom Alerts', completed: false },
      { text: 'Market Sentiment Analysis', completed: false }
    ]
  },
  {
    quarter: 'Q3 2024',
    title: 'Trading Bots',
    description: 'Launch of automated trading features and API integration.',
    items: [
      { text: 'Basic Trading Bots', completed: false },
      { text: 'Exchange API Integration', completed: false },
      { text: 'Strategy Builder', completed: false },
      { text: 'Risk Management Tools', completed: false }
    ]
  },
  {
    quarter: 'Q4 2024',
    title: 'Advanced Features',
    description: 'Rolling out advanced AI features and social trading capabilities.',
    items: [
      { text: 'Advanced AI Models', completed: false },
      { text: 'Social Trading', completed: false },
      { text: 'Performance Analytics', completed: false },
      { text: 'Mobile App Launch', completed: false }
    ]
  }
]

export default function RoadmapPage() {
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
              Product Roadmap
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our journey to build the most advanced AI-powered trading platform
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.quarter}
                className="relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="rounded-3xl bg-gray-800 p-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-gold-900/10 px-3 py-1 text-sm font-medium text-gold-400 ring-1 ring-inset ring-gold-900/30">
                      {milestone.quarter}
                    </span>
                    <h3 className="text-xl font-semibold text-white">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-gray-300">
                    {milestone.description}
                  </p>
                  <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {milestone.items.map((item) => (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        {item.completed ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClockIcon className="h-5 w-5 text-gold-400" />
                        )}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 