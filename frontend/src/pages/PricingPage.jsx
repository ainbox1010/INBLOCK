import { motion } from 'framer-motion'

const tiers = [
  {
    name: 'Basic',
    price: '29',
    period: '/month',
    description: 'Perfect for getting started with crypto trading',
    features: [
      'Basic AI trading signals',
      'Market analysis',
      'Daily trading tips',
      'Basic portfolio tracking',
      'Email support'
    ],
    cta: 'Start Basic',
    featured: false
  },
  {
    name: 'Pro',
    price: '79',
    period: '/month',
    description: 'Advanced features for serious traders',
    features: [
      'Everything in Basic',
      'Advanced AI signals',
      'Real-time alerts',
      'Portfolio optimization',
      'Priority support',
      'Trading bot access'
    ],
    cta: 'Start Pro',
    featured: true
  },
  {
    name: 'Enterprise',
    price: '199',
    period: '/month',
    description: 'Custom solutions for professional traders',
    features: [
      'Everything in Pro',
      'Custom AI models',
      'API access',
      'Dedicated account manager',
      'Custom reporting',
      'White-label options'
    ],
    cta: 'Contact Sales',
    featured: false
  }
]

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing Plans
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choose the perfect plan for your trading journey
          </p>
        </div>
        <motion.div 
          className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 ring-1 ring-gray-700 ${
                tier.featured ? 'bg-gradient-to-b from-gold-700 to-gold-900' : 'bg-gray-800'
              }`}
            >
              <h3 className="text-lg font-semibold leading-8 text-white">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">${tier.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-300">
                  {tier.period}
                </span>
              </p>
              <button
                className={`mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-gray-900 text-gold-400 hover:bg-gray-800'
                    : 'bg-gold-700 text-gray-900 hover:bg-gold-600'
                }`}
              >
                {tier.cta}
              </button>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 