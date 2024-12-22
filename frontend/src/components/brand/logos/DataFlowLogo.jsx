import { motion } from 'framer-motion';

export default function DataFlowLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Blockchain Hexagon */}
            <motion.path
                d="M50 10 L80 25 L80 75 L50 90 L20 75 L20 25 Z"
                className="stroke-accent-purple"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
            />

            {/* AI Core (Binary circles) */}
            {[0, 1, 0, 1, 1, 0].map((value, i) => (
                <motion.circle
                    key={i}
                    cx={35 + (i % 2) * 30}
                    cy={35 + Math.floor(i / 2) * 15}
                    r={value ? 4 : 2}
                    className={value ? "fill-accent-pink" : "fill-accent-purple"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                />
            ))}

            {/* Data Flow Lines */}
            {[15, 45, 75].map((y, i) => (
                <motion.path
                    key={i}
                    d={`M30 ${y} H70`}
                    className="stroke-accent-purple"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{ 
                        pathLength: [0, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                />
            ))}
        </motion.svg>
    );
} 