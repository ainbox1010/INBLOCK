import { createContext, useContext, useState } from 'react';
import { LANDING_VARIANTS } from '../utils/constants';

const LandingVariantContext = createContext();

export function LandingVariantProvider({ children }) {
    const [currentVariant, setCurrentVariant] = useState(
        localStorage.getItem('landingVariant') || LANDING_VARIANTS.MINIMAL
    );

    const updateVariant = (variant) => {
        setCurrentVariant(variant);
        localStorage.setItem('landingVariant', variant);
    };

    return (
        <LandingVariantContext.Provider value={{ currentVariant, updateVariant }}>
            {children}
        </LandingVariantContext.Provider>
    );
}

export const useLandingVariant = () => useContext(LandingVariantContext); 