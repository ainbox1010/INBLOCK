# InBlock AI Frontend Integration Guide

## Demo Chat API
The demo chat endpoint allows frontend integration without authentication.

### Base URL
```
https://backend-production-ac14.up.railway.app/api
```

### Endpoints

1. Get Remaining Queries
```javascript
GET /api/chat/demo/
```
Returns: `{ queries_left: number }`

2. Send Message
```javascript
POST /api/chat/demo/
```

### Complete Integration Example

```javascript
// 1. Check remaining queries
const checkQueriesLeft = async () => {
    try {
        const response = await fetch('https://backend-production-ac14.up.railway.app/api/chat/demo/');
        const data = await response.json();
        return data.queries_left;
    } catch (error) {
        console.error('Error checking queries:', error);
        return null;
    }
};

// 2. Send message to AI
const sendChatMessage = async (message) => {
    try {
        const response = await fetch('https://backend-production-ac14.up.railway.app/api/chat/demo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error: 'Failed to send message' };
    }
};

// 3. Initial AI message
const INITIAL_MESSAGE = {
    role: 'assistant',
    content: 'Hello! I am InBlock AI Agent. I can help you with getting familiar with crypto basics, crypto market analysis, trading strategies, and blockchain insights. What would you like to know?'
};

// Usage example:
const startChat = async () => {
    // First check remaining queries
    const queriesLeft = await checkQueriesLeft();
    console.log(`Queries remaining: ${queriesLeft}`);

    if (queriesLeft > 0) {
        // Send a test message
        const response = await sendChatMessage("What is Bitcoin?");
        console.log('AI Response:', response.content);
        console.log('Queries remaining:', response.queries_left);
    }
};
```

### Response Format
```javascript
{
    content: "AI's response text",
    queries_left: 4  // Remaining queries for the day
}
```

### Rate Limiting
- 5 queries per day per IP address
- Check remaining queries with GET request
- Each response includes remaining queries

### Error Handling
- Status 429: Rate limit exceeded
- Status 500: Server error

### Testing Tips
1. Start by checking remaining queries
2. Display the initial AI message
3. Test with basic crypto questions
4. Monitor queries_left in responses
5. Handle rate limit errors gracefully 

### CORS and Allowed Origins
Your frontend domain needs to be whitelisted to access our API. We currently allow:
- localhost development (http://localhost:*)
- Vercel deployments (*.vercel.app)
- Netlify deployments (*.netlify.app)

If you need your domain whitelisted, please contact us with:
1. Your frontend domain
2. Brief description of your integration 