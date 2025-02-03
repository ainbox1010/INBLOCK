import { motion } from 'framer-motion';
import AuthenticatedChatWindow from '../components/AuthenticatedChatWindow'
import WaveTerrain from '../components/backgrounds/WaveTerrain'

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-primary-900 relative">
            {/* Background */}
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <AuthenticatedChatWindow />
                </motion.div>
            </div>
        </div>
    );
} 