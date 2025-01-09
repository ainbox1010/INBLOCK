const ENV = {
    development: {
        apiUrl: 'http://localhost:8000'
    },
    production: {
        apiUrl: 'https://backend-production-ac14.up.railway.app'  // Paste your Railway domain here
    }
};

const currentEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default ENV[currentEnv]; 