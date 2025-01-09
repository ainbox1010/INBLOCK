import { motion } from 'framer-motion';

export default function AgentNetworkLogo({ className = "w-32 h-32" }) {
    const agents = [
        { x: 50, y: 20 },
        { x: 30, y: 50 },
        { x: 70, y: 50 },
        { x: 50, y: 80 }
    ];

    return (
        <motion.svg 
            className={className} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Agent Nodes */}
            {agents.map((agent, i) => (
                <g key={i}>
                    {/* Agent Circle */}
                    <motion.circle
                        cx={agent.x}
                        cy={agent.y}
                        r="8"
                        className="fill-accent-purple/20 stroke-accent-purple"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                    />
                    
                    {/* AI Symbol */}
                    <motion.path
                        d={`M${agent.x-4} ${agent.y} h8 M${agent.x} ${agent.y-4} v8`}
                        className="stroke-accent-pink"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: i * 0.2 + 0.1 }}
                    />
                </g>
            ))}

            {/* Connection Lines */}
            {agents.map((agent, i) => 
                agents.slice(i + 1).map((target, j) => (
                    <motion.line
                        key={`${i}-${j}`}
                        x1={agent.x}
                        y1={agent.y}
                        x2={target.x}
                        y2={target.y}
                        className="stroke-accent-purple/30"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: (i + j) * 0.2
                        }}
                    />
                ))
            )}
        </motion.svg>
    );
} 