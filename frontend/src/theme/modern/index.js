// Export modern theme components and styles
export const modernTheme = {
    components: {
        // Extract reusable components from LandingPageModern
        Button: ({ children, ...props }) => (
            <button className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink..." {...props}>
                {children}
            </button>
        ),
        Card: // ... etc
    },
    backgrounds: {
        WaveTerrain,
        NetworkNodes,
        // ... other background components
    },
    gradients: {
        primary: 'bg-gradient-to-r from-accent-purple to-accent-pink',
        secondary: 'bg-gradient-to-r from-accent-blue to-accent-purple'
    }
}; 