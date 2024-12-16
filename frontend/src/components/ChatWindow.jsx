import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'How is BNB doing today?',
    },
    {
      type: 'assistant',
      text: `BNB is trading at $308.51 USD. This is a decrease of -0.554% from yesterday's price of $310.22 USD.`,
    },
  ])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-lg bg-gray-800 shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-400">BNB (BNB)</span>
          <span className="text-sm font-medium text-white">$308.51</span>
          <span className="text-sm font-medium text-red-500">▼ -0.554 %</span>
        </div>
      </div>
      <div className="h-96 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 ${
                message.type === 'user'
                  ? 'bg-gold-800 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask anything about crypto..."
            className="flex-1 rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-700"
          />
          <button className="rounded-md bg-gold-700 p-2 text-gray-900 hover:bg-gold-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
} 