import { createContext, useContext, useState } from 'react';
import { LANDING_VARIANTS } from '../utils/constants';

const LandingVariantContext = createContext();

export function LandingVariantProvider({ children }) {
    const [currentVariant, setCurrentVariant] = useState(LANDING_VARIANTS.MODERN);

    const value = {
        currentVariant,
        setCurrentVariant
    };

    return (
        <LandingVariantContext.Provider value={value}>
            {children}
        </LandingVariantContext.Provider>
    );
}

export function useLandingVariant() {
    const context = useContext(LandingVariantContext);
    if (context === undefined) {
        throw new Error('useLandingVariant must be used within a LandingVariantProvider');
    }
    return context;
} 