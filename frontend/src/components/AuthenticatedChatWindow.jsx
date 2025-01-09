import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../utils/api'

export default function AuthenticatedChatWindow() {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [queriesLeft, setQueriesLeft] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (user?.is_staff) {
            setQueriesLeft('unlimited')
        } else {
            setQueriesLeft(20 - user?.query_count || 0)
        }
    }, [user])

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!inputMessage.trim() || isLoading) return

        try {
            setIsLoading(true)
            setError('')
            
            const userMessage = {
                type: 'user',
                text: inputMessage
            }
            setMessages(prev => [...prev, userMessage])
            setInputMessage('')

            const response = await api.sendMessage({
                message: inputMessage,
                model: 'gpt-3.5-turbo',
                temperature: 0
            })

            const assistantMessage = {
                type: 'assistant',
                text: response.data.message
            }
            setMessages(prev => [...prev, assistantMessage])
            
            // Update queries left if not staff
            if (!user?.is_staff) {
                setQueriesLeft(prev => typeof prev === 'number' ? prev - 1 : prev)
            }

        } catch (error) {
            console.error('Error sending message:', error)
            if (error.response?.status === 429) {
                setError('Daily query limit reached. Please try again tomorrow.')
            } else {
                setError('Sorry, there was an error processing your message.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg bg-gray-800 shadow-xl border border-gray-700"
        >
            <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-3">
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-400">
                        {queriesLeft === 'unlimited' 
                            ? 'Unlimited Queries' 
                            : `${queriesLeft} queries remaining`}
                    </span>
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
                                    ? 'bg-gray-800 text-white border border-gray-700'
                                    : 'bg-gray-700 text-gray-200'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                {error && (
                    <div className="text-center">
                        <p className="text-red-500 mb-2">{error}</p>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-700 p-4">
                <form onSubmit={sendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask anything..."
                        className="flex-1 rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        disabled={isLoading || (queriesLeft !== 'unlimited' && queriesLeft <= 0)}
                    />
                    <button 
                        type="submit"
                        disabled={isLoading || (queriesLeft !== 'unlimited' && queriesLeft <= 0)}
                        className="rounded-md bg-gray-800 p-2 text-white hover:bg-gray-700 border border-gray-700 transition-all duration-200"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
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
                        )}
                    </button>
                </form>
            </div>
        </motion.div>
    )
}