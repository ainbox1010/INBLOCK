import React from 'react';
import WaveTerrain from '../../components/backgrounds/WaveTerrain';
import NetworkNodes from '../../components/backgrounds/NetworkNodes';

const Button = ({ children, ...props }) => (
    <button 
        className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-accent-purple/25" 
        {...props}
    >
        {children}
    </button>
);

const Card = ({ children, ...props }) => (
    <div 
        className="bg-primary-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6" 
        {...props}
    >
        {children}
    </div>
);

export const modernTheme = {
    components: {
        Button,
        Card,
    },
    backgrounds: {
        WaveTerrain,
        NetworkNodes,
    },
    gradients: {
        primary: 'bg-gradient-to-r from-accent-purple to-accent-pink',
        secondary: 'bg-gradient-to-r from-accent-blue to-accent-purple'
    }
}; 