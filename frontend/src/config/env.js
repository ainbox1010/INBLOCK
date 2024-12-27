const ENV = {
    development: {
        apiUrl: 'http://localhost:8000'
    },
    production: {
        apiUrl: 'https://api.inblock.ai'  // Your production API URL
    }
};

const currentEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default ENV[currentEnv]; 