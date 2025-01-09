import { motion } from 'framer-motion';

export default function CompositeBlockLogo({ className = "w-32 h-32" }) {
    const layers = [
        { y: 70, label: "API", color: "accent-purple" },
        { y: 55, label: "AI", color: "accent-pink" },
        { y: 40, label: "SECURITY", color: "accent-purple" },
        { y: 25, label: "BLOCKCHAIN", color: "accent-pink" }
    ];

    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Cube Frame */}
            <motion.path
                d="M20,30 L50,15 L80,30 L80,70 L50,85 L20,70 Z"
                className="stroke-accent-purple"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
            />

            {/* Layers */}
            {layers.map((layer, i) => (
                <motion.g key={i}>
                    {/* Layer Rectangle */}
                    <motion.path
                        d={`M25,${layer.y} L50,${layer.y-8} L75,${layer.y} L50,${layer.y+8} Z`}
                        className={`fill-${layer.color}/20 stroke-${layer.color}`}
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.3 }}
                    />
                    
                    {/* Connection Lines */}
                    <motion.line
                        x1="50"
                        y1={layer.y}
                        x2="50"
                        y2={layers[i+1]?.y || layer.y+10}
                        className={`stroke-${layer.color}`}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.3 }}
                    />
                </motion.g>
            ))}

            {/* Pulse Effect */}
            <motion.circle
                cx="50"
                cy="50"
                r="25"
                className="stroke-accent-pink"
                strokeWidth="1"
                fill="none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                    scale: 1.2,
                    opacity: [0, 0.2, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            />
        </motion.svg>
    );
} 