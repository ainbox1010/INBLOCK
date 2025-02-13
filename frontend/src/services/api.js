import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Add a debug log
console.log('API_URL:', API_URL);

// Configure axios globally
axios.defaults.baseURL = API_URL;

// Export the configured axios instance
export default axios; 