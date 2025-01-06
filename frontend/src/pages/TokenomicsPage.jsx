import { motion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout';
import CyborgBlockLogo from '../components/brand/logos/TokenomicsLogo'

export default function TokenomicsPage() {
    return (
        <PageLayout>
            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-primary-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-accent-purple/50 transition-all duration-300">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink mb-4">
                            Tokenomics                            
                            <div className="max-w-[600px] mx-auto">
                                <CyborgBlockLogo />
                            </div>
                        </h1>
                    </div>
                </motion.div>
            </div>
        </PageLayout>
    );
} 