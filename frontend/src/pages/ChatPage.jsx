import { motion } from 'framer-motion';
import WaveTerrain from '../components/backgrounds/WaveTerrain';

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-primary-900 relative">
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            <div className="relative z-10 container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink mb-4">
                        Thank You for Registering!
                    </h2>
                    <p className="text-gray-300 mb-6">
                        We're excited to have you on board. We're currently preparing your full access to InBlock AI's advanced features.
                    </p>
                    <p className="text-gray-400">
                        We'll notify you via email when your account is ready for the full experience.
                    </p>
                </motion.div>
            </div>
        </div>
    );
} 