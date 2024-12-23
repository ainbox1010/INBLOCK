import { motion } from 'framer-motion';

export default function CyborgBlockLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Base Cube Structure */}
            <motion.path
                d="M20,30 L50,15 L80,30 L50,45 Z"
                className="fill-accent-purple/30 stroke-accent-purple"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Right Face with Circuit Patterns */}
            <motion.path
                d="M80,30 L80,70 L50,85 L50,45 Z"
                className="fill-accent-pink/30 stroke-accent-pink"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Left Face with Circuit Patterns */}
            <motion.path
                d="M20,30 L20,70 L50,85 L50,45 Z"
                className="fill-accent-purple/30 stroke-accent-purple"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            />

            {/* Left Eye ("i") */}
            <motion.g
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* i stem only */}
                <motion.rect
                    x="33"
                    y="50"
                    width="4"
                    height="10"
                    className="fill-accent-pink"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.g>

            {/* Right Eye ("n") */}
            <motion.g
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                }}
            >
                <motion.path
                    d="M60,50 L60,60 M60,50 C65,50 65,50 65,55 L65,60"
                    className="stroke-accent-pink"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </motion.g>

            {/* Nose Bridge / Central Feature */}
            <motion.path
                d="M50,45 L50,65"
                className="stroke-accent-purple"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
            />

            {/* Circuit Patterns */}
            {[1, 2, 3].map((i) => (
                <motion.path
                    key={i}
                    d={`M${30 + i * 15},70 L${35 + i * 15},80`}
                    className="stroke-accent-pink/50"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.2 }}
                />
            ))}

            {/* Energy Flow Effect */}
            <motion.g>
                {[0, 1, 2].map((i) => (
                    <motion.circle
                        key={i}
                        cx={35 + i * 15}
                        cy={55}
                        r="1"
                        className="fill-accent-pink"
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0, 1, 0],
                            y: [-2, 2]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    />
                ))}
            </motion.g>
        </motion.svg>
    );
} 