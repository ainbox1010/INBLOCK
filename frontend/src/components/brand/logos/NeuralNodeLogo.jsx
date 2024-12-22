import { motion } from 'framer-motion';

export default function NeuralNodeLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Central Node */}
            <motion.circle 
                cx="50" 
                cy="50" 
                r="10"
                className="fill-accent-purple"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            
            {/* Radiating Connections */}
            {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                <motion.g key={angle}>
                    <motion.line
                        x1="50"
                        y1="50"
                        x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                        y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                        className="stroke-accent-pink"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: index * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <motion.circle
                        cx={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                        cy={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                        r="5"
                        className="fill-accent-pink"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.2
                        }}
                    />
                </motion.g>
            ))}
        </motion.svg>
    );
} 