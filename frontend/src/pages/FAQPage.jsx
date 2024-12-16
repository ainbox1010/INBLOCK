import { motion } from 'framer-motion'

export default function FAQPage() {
  const faqs = [
    {
      question: "What is INBLOCK AI?",
      answer: "INBLOCK AI is an advanced AI-powered platform designed to assist crypto traders and investors with market analysis, trading strategies, and real-time insights."
    },
    {
      question: "How does the AI assistant work?",
      answer: "Our AI assistant uses advanced language models and real-time data to provide informed responses about cryptocurrency markets, trading strategies, and historical analysis."
    },
    {
      question: "Is INBLOCK AI free to use?",
      answer: "We offer a free trial period for new users. After that, we have various subscription plans to suit different needs and trading volumes."
    },
    {
      question: "What cryptocurrencies do you support?",
      answer: "Our AI assistant can provide information about all major cryptocurrencies and most altcoins, with a special focus on emerging MEME coins and their market dynamics."
    }
  ]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-4">{faq.question}</h2>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 