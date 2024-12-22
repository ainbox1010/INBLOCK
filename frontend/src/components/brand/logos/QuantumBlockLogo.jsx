import { motion } from 'framer-motion';

export default function QuantumBlockLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Front Face */}
            <motion.path
                d="M20,30 L50,15 L80,30 L50,45 Z"
                className="fill-accent-purple/30 stroke-accent-purple"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Right Face */}
            <motion.path
                d="M80,30 L80,70 L50,85 L50,45 Z"
                className="fill-accent-pink/30 stroke-accent-pink"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Left Face */}
            <motion.path
                d="M20,30 L20,70 L50,85 L50,45 Z"
                className="fill-accent-purple/30 stroke-accent-purple"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            />

            {/* Particle Effects */}
            {[...Array(8)].map((_, i) => (
                <motion.circle
                    key={i}
                    cx={35 + Math.random() * 30}
                    cy={35 + Math.random() * 30}
                    r="1"
                    className="fill-accent-pink"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        y: [-10, 10]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </motion.svg>
    );
} 