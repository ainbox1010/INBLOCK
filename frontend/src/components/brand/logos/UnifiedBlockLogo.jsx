import { motion } from 'framer-motion';

export default function UnifiedBlockLogo({ className = "w-32 h-32" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Core Block */}
            <motion.path
                d="M35,35 L65,35 L65,65 L35,65 Z"
                className="fill-accent-purple/20 stroke-accent-purple"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Converging Elements */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.g key={i}>
                    <motion.path
                        d={`
                            M${50 + 40 * Math.cos((angle * Math.PI) / 180)},
                            ${50 + 40 * Math.sin((angle * Math.PI) / 180)}
                            L${50 + 20 * Math.cos((angle * Math.PI) / 180)},
                            ${50 + 20 * Math.sin((angle * Math.PI) / 180)}
                        `}
                        className="stroke-accent-pink"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.1 }}
                    />

                    <motion.circle
                        cx={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                        cy={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                        r="4"
                        className="fill-accent-purple"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    />
                </motion.g>
            ))}

            {/* Integration Lines */}
            <motion.g>
                {[0, 1, 2].map((i) => (
                    <motion.path
                        key={i}
                        d={`M35,${45 + i * 10} L65,${45 + i * 10}`}
                        className="stroke-accent-pink/30"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                        }}
                    />
                ))}
            </motion.g>
        </motion.svg>
    );
} 