import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../utils/axios'
import CyborgBlockLogo from './brand/logos/CyborgBlockLogo'
import config from '../config/env'

const DEMO_MESSAGES = [
    {
        role: 'assistant',
        content: 'Hello! I am InBlock AI Agent. I can help you with getting familiar with crypto basics, crypto market analysis, trading strategies, and blockchain insights. What would you like to know?'
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
        const fetchQueriesLeft = async () => {
            try {
                const response = await api.get('/api/chat/demo/');
                setQueriesLeft(response.data.queries_left);
            } catch (error) {
                setError('Unable to initialize demo chat');
                setQueriesLeft(0);
            }
        };
        
        fetchQueriesLeft();
    }, []);

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

            const response = await api.post('/api/chat/demo/', {
                message: input,
                model: 'gpt-3.5-turbo',
                temperature: 0
            });

            const assistantMessage = {
                role: 'assistant',
                content: response.data.message
            };
            setMessages(prev => [...prev, assistantMessage]);
            
            setQueriesLeft(response.data.queries_left);

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
        <div className="rounded-xl overflow-hidden bg-primary-900/50 backdrop-blur-sm border border-gray-800">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-accent-purple mr-2 animate-pulse" />
                        <h3 className="font-semibold text-white">
                            InBlock AI Agent
                        </h3>
                    </div>
                    <div className="text-sm text-gray-400">
                        Demo ({queriesLeft} queries left)
                    </div>
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
                            placeholder="Ask about crypto basics, analysis, trading strategies..."
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