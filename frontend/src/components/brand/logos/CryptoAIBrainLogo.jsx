import { motion } from 'framer-motion';

export default function CryptoAIBrainLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Brain Outline */}
            <motion.path
                d="M30,50 C30,20 70,20 70,50 C70,80 30,80 30,50"
                className="stroke-accent-purple"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
            />

            {/* Neural Connections */}
            {[...Array(6)].map((_, i) => (
                <motion.path
                    key={i}
                    d={`M${30 + i * 8},30 Q50,50 ${70 - i * 8},70`}
                    className="stroke-accent-pink"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                        pathLength: 1,
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                />
            ))}

            {/* Blockchain Elements */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.g key={i}>
                    <motion.circle
                        cx={50 + 25 * Math.cos((angle * Math.PI) / 180)}
                        cy={50 + 25 * Math.sin((angle * Math.PI) / 180)}
                        r="4"
                        className="fill-accent-purple/20 stroke-accent-purple"
                        strokeWidth="1"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0.8] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                    />
                </motion.g>
            ))}
        </motion.svg>
    );
} 