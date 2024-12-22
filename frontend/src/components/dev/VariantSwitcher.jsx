import { useLandingVariant } from '../../contexts/LandingVariantContext';
import { LANDING_VARIANTS } from '../../utils/constants';

export default function VariantSwitcher() {
    const { currentVariant, updateVariant } = useLandingVariant();

    return process.env.NODE_ENV === 'development' ? (
        <div className="fixed bottom-4 right-4 bg-gray-800 p-2 rounded-lg shadow-xl z-50">
            <select 
                value={currentVariant}
                onChange={(e) => updateVariant(e.target.value)}
                className="bg-gray-700 text-white rounded px-2 py-1"
            >
                {Object.entries(LANDING_VARIANTS).map(([key, value]) => (
                    <option key={value} value={value}>
                        {key}
                    </option>
                ))}
            </select>
        </div>
    ) : null;
} 