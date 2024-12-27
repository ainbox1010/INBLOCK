import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Link } from 'react-router-dom'
import CyborgBlockLogo from './brand/logos/CyborgBlockLogo'
import config from '../config/env'

const DEMO_MESSAGES = [
    {
        role: 'assistant',
        content: 'Hello! I am InBlock AI assistant. I can help you with crypto market analysis, trading strategies, and blockchain insights. What would you like to know?'
    }
];

export default function DemoChatWindow() {
    const [messages, setMessages] = useState(DEMO_MESSAGES);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [queriesLeft, setQueriesLeft] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const storedCount = localStorage.getItem('demoQueriesLeft')
        const lastReset = localStorage.getItem('demoQueriesReset')
        const now = new Date().getTime()

        if (!storedCount || !lastReset || (now - parseInt(lastReset)) > 24 * 60 * 60 * 1000) {
            setQueriesLeft(5)
            localStorage.setItem('demoQueriesLeft', '5')
            localStorage.setItem('demoQueriesReset', now.toString())
        } else {
            setQueriesLeft(parseInt(storedCount))
        }
    }, [])

    useEffect(() => {
        if (queriesLeft !== null) {
            localStorage.setItem('demoQueriesLeft', queriesLeft.toString())
        }
    }, [queriesLeft])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading || queriesLeft <= 0) return;

        try {
            setIsLoading(true);
            setError('');
            
            const userMessage = {
                role: 'user',
                content: input
            };
            setMessages(prev => [...prev, userMessage]);
            setInput('');

            const response = await axios.post(`${config.apiUrl}/api/chat/`, {
                message: input,
                model: 'gpt-3.5-turbo',
                temperature: 0
            });

            const assistantMessage = {
                role: 'assistant',
                content: response.data.message
            };
            setMessages(prev => [...prev, assistantMessage]);
            setQueriesLeft(prev => prev - 1);

        } catch (error) {
            console.error('Error details:', error.response || error);
            if (error.response?.status === 429) {
                setError('Daily query limit reached. Please sign up for more queries!');
            } else {
                setError('Sorry, there was an error processing your message.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-primary-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 bg-primary-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CyborgBlockLogo className="h-8 w-8" />
                        <div>
                            <h3 className="font-bold text-white">InBlock AI Assistant</h3>
                            <p className="text-xs text-gray-400">Demo Version</p>
                        </div>
                    </div>
                    <span className={`text-sm font-medium ${
                        queriesLeft === 0 
                            ? 'text-red-400 animate-pulse font-bold'
                            : 'text-gray-400'
                    }`}>
                        {queriesLeft > 0 ? queriesLeft : 0} queries left
                    </span>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] rounded-xl p-3 ${
                            message.role === 'user' 
                                ? 'bg-accent-purple text-white ml-4' 
                                : 'bg-gray-800/50 text-gray-200 border border-gray-700'
                        }`}>
                            {message.content}
                        </div>
                    </motion.div>
                ))}
                {error && (
                    <div className="text-center">
                        <p className="text-red-500 mb-2">{error}</p>
                        <Link 
                            to="/register" 
                            className="text-accent-purple hover:text-accent-pink transition-colors"
                        >
                            Sign up for full access
                        </Link>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            {queriesLeft > 0 ? (
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-primary-800/50">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about market analysis, trading strategies..."
                            className="flex-1 bg-gray-800/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent placeholder-gray-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-accent-purple hover:bg-accent-pink rounded-lg text-white font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-lg shadow-accent-purple/25 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                <span>Send</span>
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="p-4 border-t border-gray-800 bg-primary-800/50 text-center">
                    <p className="text-gray-400 mb-4">To continue conversation please</p>
                    <div className="flex items-center justify-center space-x-4">
                        <Link 
                            to="/login"
                            className="px-6 py-2 bg-accent-purple hover:bg-accent-pink rounded-lg text-white font-semibold transition-colors duration-200 shadow-lg shadow-accent-purple/25"
                        >
                            SIGN IN
                        </Link>
                        <span className="text-gray-400">or</span>
                        <Link 
                            to="/register"
                            className="px-6 py-2 bg-accent-purple hover:bg-accent-pink rounded-lg text-white font-semibold transition-colors duration-200 shadow-lg shadow-accent-purple/25"
                        >
                            SIGN UP
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
} 