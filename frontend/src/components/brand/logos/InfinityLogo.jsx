import { motion } from 'framer-motion';

export default function InfinityLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Möbius Strip / Infinity Path */}
            <motion.path
                d="M30,50 C30,32 45,32 50,50 C55,68 70,68 70,50 C70,32 55,32 50,50 C45,68 30,68 30,50"
                className="stroke-accent-purple"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Circuit Patterns */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <circle
                        key={angle}
                        cx={50 + 25 * Math.cos((angle * Math.PI) / 180)}
                        cy={50 + 25 * Math.sin((angle * Math.PI) / 180)}
                        r="2"
                        className="fill-accent-pink"
                    />
                ))}
            </motion.g>

            {/* Center Glow */}
            <motion.circle
                cx="50"
                cy="50"
                r="8"
                className="fill-accent-purple"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </motion.svg>
    );
} 