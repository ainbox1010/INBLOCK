export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const API_ENDPOINTS = {
    CHAT: '/api/chat/',
    AUTH: {
        LOGIN: '/api/auth/login/',
        REFRESH: '/api/auth/token/refresh/',
        REGISTER: '/api/auth/register/'
    }
};

export const LANDING_VARIANTS = {
    MINIMAL: 'minimal',
    MODERN: 'modern',
    FEATURE: 'feature',
    CRYPTO: 'crypto',
    ENTERPRISE: 'enterprise'
}; 