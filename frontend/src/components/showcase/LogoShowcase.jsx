import { motion } from 'framer-motion'
import NeuralNodeLogo from '../brand/logos/NeuralNodeLogo'
import InfinityLogo from '../brand/logos/InfinityLogo'
import QuantumBlockLogo from '../brand/logos/QuantumBlockLogo'
import DataFlowLogo from '../brand/logos/DataFlowLogo'
import AgentNetworkLogo from '../brand/logos/AgentNetworkLogo'
import CryptoAIBrainLogo from '../brand/logos/CryptoAIBrainLogo'
import CompositeBlockLogo from '../brand/logos/CompositeBlockLogo'
import ServiceMeshLogo from '../brand/logos/ServiceMeshLogo'
import UnifiedBlockLogo from '../brand/logos/UnifiedBlockLogo'
import CyborgBlockLogo from '../brand/logos/CyborgBlockLogo'

const logos = [
    {
        name: "Neural Node",
        description: "Combines AI neural networks with blockchain nodes",
        component: NeuralNodeLogo,
        features: [
            "Central node with radiating connections",
            "Animated pulse/data flow",
            "Gradient color scheme",
            "Scalable to favicon size"
        ]
    },
    {
        name: "Infinite Intelligence",
        description: "Möbius strip forming an infinity symbol with embedded circuits",
        component: InfinityLogo,
        features: [
            "Continuous learning representation",
            "Blockchain integration",
            "Dynamic gradient flow",
            "Modern minimalist design"
        ]
    },
    {
        name: "Quantum Block",
        description: "3D cube with AI and blockchain visual elements",
        component: QuantumBlockLogo,
        features: [
            "3D perspective design",
            "Particle effects",
            "Interactive gradients",
            "Multi-faceted symbolism"
        ]
    },
    {
        name: "Data Flow",
        description: "Visualizes AI agents processing blockchain data",
        component: DataFlowLogo,
        features: [
            "Binary data representation",
            "Hexagonal blockchain structure",
            "Animated data flows",
            "Clean geometric design"
        ]
    },
    {
        name: "Agent Network",
        description: "AI agents interacting within blockchain network",
        component: AgentNetworkLogo,
        features: [
            "Distributed agent nodes",
            "Dynamic connections",
            "AI agent symbols",
            "Network visualization"
        ]
    },
    {
        name: "Crypto AI Brain",
        description: "Neural network merged with blockchain",
        component: CryptoAIBrainLogo,
        features: [
            "Brain-inspired design",
            "Neural pathways",
            "Blockchain integration",
            "Organic + geometric fusion"
        ]
    },
    {
        name: "Composite Block",
        description: "Layered services forming a unified block",
        component: CompositeBlockLogo,
        features: [
            "Service layer visualization",
            "Interconnected components",
            "Hierarchical structure",
            "Dynamic assembly animation"
        ]
    },
    {
        name: "Service Mesh",
        description: "Interconnected services within block structure",
        component: ServiceMeshLogo,
        features: [
            "Service node network",
            "Central hub coordination",
            "Dynamic connections",
            "Modular architecture"
        ]
    },
    {
        name: "Unified Block",
        description: "Services converging into cohesive block",
        component: UnifiedBlockLogo,
        features: [
            "Converging elements",
            "Integration visualization",
            "Core block stability",
            "Service unification"
        ]
    },
    {
        name: "Cyborg Block",
        description: "AI agent visualized as cybernetic face within block structure",
        component: CyborgBlockLogo,
        features: [
            "Cybernetic face integration",
            "Animated eye tracking",
            "Circuit pattern details",
            "Energy flow visualization"
        ]
    }
]

export default function LogoShowcase() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logos.map((logo) => (
                <motion.div
                    key={logo.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                    <div className="flex justify-center mb-6">
                        <logo.component className="w-32 h-32" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{logo.name}</h3>
                    <p className="text-gray-400 mb-4">{logo.description}</p>
                    <ul className="space-y-2">
                        {logo.features.map((feature) => (
                            <li key={feature} className="text-gray-300 text-sm flex items-center">
                                <span className="w-2 h-2 bg-accent-purple rounded-full mr-2" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    )
} 