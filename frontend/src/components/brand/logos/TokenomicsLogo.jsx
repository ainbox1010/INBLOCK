
import { motion } from 'framer-motion';

const values = [8, 22, 10, 30, 20, 10]; // Values for pie chart
const colors = ["stroke-accent-pink", "stroke-accent-green", "stroke-accent-purple", "stroke-accent-red", "stroke-accent-blue", "stroke-accent-redBright"]; // Colors
const total = 100; // Represents 100% of the circle
const radius = 38; // Circle radius
const center = 50; // Center of the circle
const strokeWidth = 4; // Stroke width to create path-only effect

// Convert value to angle (degrees)
const getAngle = (value) => (value / total) * 360;

// Function to create SVG path for pie slices
const getPath = (startAngle, endAngle) => {
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    const startX = center + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = center + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = center + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = center + radius * Math.sin((Math.PI * endAngle) / 180);
    
    return `M ${startX},${startY} A ${radius},${radius} 0 ${largeArc},1 ${endX},${endY}`;
};

export default function CryptoAIBrainLogo() {
    let startAngle = 0;

    return (
        <motion.svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* New Circle - Pie Chart Representation (Only Stroke) */}
            {values.map((value, index) => {
                const angle = getAngle(value);
                const endAngle = startAngle + angle;
                const path = getPath(startAngle, endAngle);
                const textAngle = startAngle + angle / 2;
                const textX = center + (radius + 8) * Math.cos((Math.PI * textAngle) / 180);
                const textY = center + (radius + 8) * Math.sin((Math.PI * textAngle) / 180);
                startAngle = endAngle;

                return (
                    <g key={index}>
                        <motion.path
                            d={path}
                            className={colors[index]}
                            strokeWidth={strokeWidth}
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5 }}
                        />
                        <text x={textX} y={textY} textAnchor="middle" fontSize="3" className="fill-accent-purple">
                            {`${values[index]}%`}
                        </text>
                    </g>
                );
            })}

            {/* Front Face */}
            <motion.path
                d="M32,42 L50,32 L68,42 L50,51 Z"
                className="fill-accent-purple/30 stroke-accent-purple"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Right Face */}
            <motion.path
                d="M68,42 L68,58 L50,67 L50,51 Z"
                className="fill-accent-pink/30 stroke-accent-pink"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Left Face */}
            <motion.path
                d="M32,42 L32,58 L50,67 L50,51 Z"
                className="fill-accent-purple/30 stroke-accent-purple"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            />

            {/* Particle Effects */}
            {[...Array(12)].map((_, i) => (
                <motion.circle
                    key={i}
                    cx={45 + Math.random() * 14} // Adjusted range for smaller size
                    cy={45 + Math.random() * 14} // Adjusted range for smaller size
                    r="0.6" // Further reduced radius
                    className="fill-accent-pink"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 0.8, 0], // Smaller scaling
                        y: [-5, 5] // Smaller movement range
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