import { motion } from 'framer-motion';

export default function ServiceMeshLogo({ className = "w-32 h-32" }) {
    const services = [
        { x: 50, y: 30, label: "AI" },
        { x: 30, y: 50, label: "SECURITY" },
        { x: 70, y: 50, label: "CRYPTO" },
        { x: 40, y: 70, label: "API" },
        { x: 60, y: 70, label: "DATA" }
    ];

    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Cube Outline */}
            <motion.path
                d="M15,35 L50,15 L85,35 L85,65 L50,85 L15,65 Z"
                className="stroke-accent-purple/30"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
            />

            {/* Service Nodes */}
            {services.map((service, i) => (
                <motion.g key={i}>
                    <motion.circle
                        cx={service.x}
                        cy={service.y}
                        r="6"
                        className="fill-accent-purple/20 stroke-accent-purple"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                    />

                    {/* Service Connections */}
                    {services.slice(i + 1).map((target, j) => (
                        <motion.path
                            key={`${i}-${j}`}
                            d={`M${service.x},${service.y} Q50,50 ${target.x},${target.y}`}
                            className="stroke-accent-pink/30"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 1,
                                delay: (i + j) * 0.2
                            }}
                        />
                    ))}
                </motion.g>
            ))}

            {/* Central Hub */}
            <motion.circle
                cx="50"
                cy="50"
                r="4"
                className="fill-accent-pink"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            />
        </motion.svg>
    );
} 