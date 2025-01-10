const ENV = {
    development: {
        apiUrl: 'http://localhost:8000'
    },
    production: {
        apiUrl: 'https://backend-production-ac14.up.railway.app'
    }
};

const currentEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
//const currentEnv = 'development';
// Add debugging
console.log('Current Environment:', currentEnv);
console.log('API URL:', ENV[currentEnv].apiUrl);

export default ENV[currentEnv]; 