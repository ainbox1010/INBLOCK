import { motion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout';

const blogPosts = [
    {
        id: 1,
        title: "AI Trading Agents: The Future of Crypto Markets",
        excerpt: "How autonomous AI agents are revolutionizing cryptocurrency trading strategies and market analysis.",
        date: "March 15, 2024",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Blockchain Meets Machine Learning: A New Era",
        excerpt: "Exploring the synergy between blockchain technology and machine learning algorithms in decentralized finance.",
        date: "March 12, 2024",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "The Rise of AI-Powered DeFi Protocols",
        excerpt: "How artificial intelligence is transforming DeFi protocols and creating more efficient decentralized markets.",
        date: "March 10, 2024",
        readTime: "6 min read"
    }
];

export default function BlogPage() {
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-12">Latest from InBlock AI</h1>
                    
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map(post => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-primary-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-accent-purple/50 transition-all duration-300"
                            >
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-4">{post.title}</h2>
                                <p className="text-gray-300 mb-6">{post.excerpt}</p>
                                <button className="text-accent-purple hover:text-accent-pink transition-colors">
                                    Read more →
                                </button>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    );
} 