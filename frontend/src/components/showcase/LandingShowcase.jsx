import { useLandingVariant } from '../../contexts/LandingVariantContext'
import { LANDING_VARIANTS } from '../../utils/constants'

export default function LandingShowcase() {
    const { setCurrentVariant } = useLandingVariant()

    const variants = [
        {
            name: 'Minimal',
            description: 'Clean, simple aesthetic with focus on typography',
            preview: '/previews/minimal.png',
            variant: LANDING_VARIANTS.MINIMAL
        },
        {
            name: 'Modern',
            description: 'Wave terrain background with gradient accents',
            preview: '/previews/modern.png',
            variant: LANDING_VARIANTS.MODERN
        },
        {
            name: 'Feature',
            description: 'Network nodes animation with technical aesthetic',
            preview: '/previews/feature.png',
            variant: LANDING_VARIANTS.FEATURE
        },
        {
            name: 'Crypto',
            description: 'Trading charts background with financial feel',
            preview: '/previews/crypto.png',
            variant: LANDING_VARIANTS.CRYPTO
        },
        {
            name: 'Enterprise',
            description: 'Circuit grid background with professional feel',
            preview: '/previews/enterprise.png',
            variant: LANDING_VARIANTS.ENTERPRISE
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {variants.map((variant) => (
                <div 
                    key={variant.name}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                    <h3 className="text-xl font-bold text-white mb-2">{variant.name}</h3>
                    <p className="text-gray-400 mb-4">{variant.description}</p>
                    <button
                        onClick={() => setCurrentVariant(variant.variant)}
                        className="px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-accent-purple/80 transition-colors"
                    >
                        View Live
                    </button>
                </div>
            ))}
        </div>
    )
} 