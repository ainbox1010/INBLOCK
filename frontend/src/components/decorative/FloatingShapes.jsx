import { motion } from 'framer-motion';

export default function FloatingShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating cubes */}
            <motion.div
                className="absolute w-32 h-32"
                style={{
                    background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                    borderRadius: '20%',
                    top: '20%',
                    left: '10%',
                }}
                animate={{
                    y: [0, -50, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            {/* Add more shapes as needed */}
        </div>
    );
} 