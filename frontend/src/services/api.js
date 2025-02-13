export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Add a debug log
console.log('API_URL:', API_URL);

// If you're using axios, configure it globally
import axios from 'axios';
axios.defaults.baseURL = API_URL; 