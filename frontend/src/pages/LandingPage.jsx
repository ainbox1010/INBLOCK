import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-gray-900 p-4" style={{minHeight: '100vh', backgroundColor: '#111827'}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                AI Powered
                <br />
                Co-Pilot
              </h1>
              <p className="mt-6 text-lg text-gray-300">
                Empowering retail crypto traders and investors against the pros and hedge funds.
              </p>
              <div className="relative mt-8 flex gap-4 sm:justify-center lg:justify-start">
                <button 
                  className="relative z-10 rounded-md bg-gold-500 px-8 py-3 text-base font-bold text-gold-400 hover:bg-gray-800 shadow-xl border-2 border-gold-400 w-44 transition-all duration-200"
                >
                  JOIN WHITELIST
                </button>
                <Link 
                  to="/roadmap"
                  className="relative z-10 rounded-md bg-transparent px-8 py-3 text-base font-bold text-gold-400 hover:bg-gray-800 shadow-xl border-2 border-gold-400 w-44 transition-all duration-200 text-center inline-flex items-center justify-center"
                >
                  READ ROADMAP
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  )
}
