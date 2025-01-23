# InBlock AI Chat API Integration Guide

## Authentication
All requests require a JWT token in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```

## Base URL
```
https://backend-production-ac14.up.railway.app/api
```

## Endpoints

### 1. Demo Chat
`POST /api/chat/demo/`

For testing without authentication, limited to 5 queries per day per IP.

#### Request
```json
{
    "message": "What is Bitcoin?"
}
```

### 2. Authenticated Chat
`POST /api/chat/`

Requires JWT authentication token.

### 3. Authentication
`POST /api/auth/login/` - Get JWT token
`POST /api/auth/register/` - Create new account
`POST /api/auth/token/refresh/` - Refresh expired token

## Code Example
```javascript
const API_URL = 'https://backend-production-ac14.up.railway.app';

const sendMessage = async (message) => {
    try {
        const response = await fetch(`${API_URL}/api/chat/demo/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
```

## Code Examples

### JavaScript/Node.js
```javascript
const sendMessage = async (message, token) => {
    try {
        const response = await fetch('https://api.inblock.ai/api/chat/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### Python
```python
import requests

def send_message(message, token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        'https://api.inblock.ai/api/chat/',
        json={'message': message},
        headers=headers
    )
    return response.json()
```

## Rate Limits
- Demo: 5 queries per day per IP
- Authenticated: 20 queries per day per user
- Enterprise: Custom limits available

## Error Codes
- 401: Unauthorized - Invalid or missing token
- 429: Too Many Requests - Rate limit exceeded
- 500: Internal Server Error

## Getting Started
1. Sign up at https://inblock.ai
2. Get your API token from the dashboard
3. Use the token in your API requests
4. Monitor your usage in the dashboard

For support: api-support@inblock.ai 