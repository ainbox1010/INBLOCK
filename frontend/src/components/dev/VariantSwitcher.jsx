import { useLandingVariant } from '../../contexts/LandingVariantContext';
import { LANDING_VARIANTS } from '../../utils/constants';

export default function VariantSwitcher() {
    const { currentVariant, setCurrentVariant } = useLandingVariant();

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <select
                value={currentVariant}
                onChange={(e) => setCurrentVariant(e.target.value)}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
                {Object.entries(LANDING_VARIANTS).map(([key, value]) => (
                    <option key={value} value={value}>
                        {key.toLowerCase()}
                    </option>
                ))}
            </select>
        </div>
    );
} 