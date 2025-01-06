import WaveTerrain from '../components/backgrounds/WaveTerrain';

// Reusable layout component with modern theme
export default function PageLayout({ children }) {
    return (
        <>
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </>
    );
} 