import { motion } from 'framer-motion'

const phases = [
    {
        title: "Phase 1: Initial Launch (Current)",
        timeline: "Q1 2025",
        status: "current",
        features: [
            "Focus on AI Tokens & AI x Crypto",
            "Launch of core AI Agents for analysis",
            "Basic social integration (X.com, Telegram)"
        ]
    },
    {
        title: "Phase 2: Platform Development",
        timeline: "Q2 2025",
        status: "upcoming",
        features: [
            "Launch of InBlock Agentic Platform",
            "Framework for custom AI Agents",
            "Plugin system and API infrastructure"
        ]
    },
    {
        title: "Phase 3: Vertical Expansion",
        timeline: "Q3-Q4 2025",
        status: "planned",
        features: [
            "DeFi Analytics Suite",
            "Layer 1 Protocol Analysis",
            "Layer 1 Ecosystem Tokens"
        ]
    },
    {
        title: "Phase 4: Advanced Features",
        timeline: "2026",
        status: "future",
        features: [
            "DePIN Analytics",
            "RWA Integration",
            "Web3 Gaming Analysis",
            "Enhanced Community Features"
        ]
    }
];

const statusColors = {
    current: "from-accent-purple to-accent-pink",
    upcoming: "from-accent-blue to-accent-purple",
    planned: "from-accent-purple/70 to-accent-pink/70",
    future: "from-accent-purple/50 to-accent-pink/50"
};

export default function RoadmapPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            {/* Vision Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink mb-6">
                    The Vision: Beyond AI Tokens
                </h1>
                <p className="text-gray-300 max-w-3xl mx-auto">
                    While InBlock AI begins with a focus on AI Agents and other AI x Crypto tokens —we are rapidly expanding to become a leading AI agent platform for all crypto verticals.
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
                {phases.map((phase, index) => (
                    <motion.div
                        key={phase.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="mb-12 relative"
                    >
                        {/* Timeline connector */}
                        {index !== phases.length - 1 && (
                            <div className="absolute left-[2.25rem] top-12 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple/20 to-transparent" />
                        )}

                        <div className="flex gap-8">
                            {/* Timeline marker */}
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${statusColors[phase.status]} flex-shrink-0 flex items-center justify-center border border-accent-purple/20`}>
                                <span className="text-white font-bold">{index + 1}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-grow">
                                <div className="bg-primary-800/10 backdrop-blur-sm border border-accent-purple/20 rounded-lg p-6 hover:border-accent-pink/40 transition-all duration-300">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-semibold text-white">
                                            {phase.title}
                                        </h3>
                                        <span className="px-3 py-1 rounded-full bg-primary-900/20 text-accent-purple text-sm">
                                            {phase.timeline}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {phase.features.map((feature, i) => (
                                            <li key={i} className="text-gray-300 flex items-start">
                                                <span className="text-accent-purple mr-2">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 