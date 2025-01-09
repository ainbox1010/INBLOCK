import env from '../config/env';

const api = {
    // Auth endpoints
    login: async (credentials) => {
        const response = await fetch(`${env.apiUrl}/api/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    // Chat endpoints
    sendMessage: async (message) => {
        const response = await fetch(`${env.apiUrl}/api/chat/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(message)
        });
        const data = await response.json();
        return { data };
    }
};

export default api; 