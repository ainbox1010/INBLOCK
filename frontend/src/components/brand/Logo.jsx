import { motion } from 'framer-motion';

export default function Logo({ className = "h-8 w-8" }) {
    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outer Circle - Blockchain representation */}
            <circle cx="20" cy="20" r="18" className="stroke-accent-purple" strokeWidth="2" />
            
            {/* Inner Eye - AI representation */}
            <motion.circle 
                cx="20" 
                cy="20" 
                r="8"
                className="fill-accent-pink"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
            
            {/* Connection Lines */}
            <path 
                d="M20 2L20 38M2 20L38 20" 
                className="stroke-accent-purple/50" 
                strokeWidth="1"
            />
        </motion.svg>
    );
} 