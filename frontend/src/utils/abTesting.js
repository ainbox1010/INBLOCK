export const assignVariant = (userId) => {
    // In the future, this could:
    // 1. Check user segments
    // 2. Use analytics data
    // 3. Apply business rules
    // 4. Track conversion rates
    
    const variants = Object.values(LANDING_VARIANTS);
    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex];
}; 