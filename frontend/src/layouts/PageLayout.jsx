import WaveTerrain from '../components/backgrounds/WaveTerrain';

// Reusable layout component with modern theme
export default function PageLayout({ children }) {
    return (
        <>
            {/* Common Background */}
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </>
    );
} 