# AI Agent MVP: CoinGecko API & Graph Display Integration

## Overview
This document outlines the step-by-step instructions to implement two core features for our AI Agent MVP:
1. **Backend API Integration**: Create a Django API endpoint that queries CoinGecko for historical crypto price and volume data.
2. **Frontend Graph Display**: Update the React chat window to display interactive graphs based on the data fetched from the backend.

Our stack includes Django (backend), React (frontend), LangChain & OpenAI for AI integration, and we plan to use Pinecone for vector storage in future iterations.

---

## Part 1: Backend API Integration with CoinGecko

### 1.1 Set Up the Django Endpoint
- **Create a new Django app** for crypto data retrieval (if not already existing), e.g., `cryptoapi`:
  ```bash
  python manage.py startapp cryptoapi

```

## Agent Tools Implementation

### Crypto Tools
- [ ] Update get_crypto_price to use CoinGecko Pro API as primary source
- [ ] Add get_crypto_history tool for historical price data
  - Use CoinGecko /coins/{id}/market_chart endpoint
  - Support various time ranges (1d, 7d, 30d, etc.)
  - Include price, market cap, and volume data
- [ ] Add get_crypto_sentiment tool using CoinGecko data
  - Include market sentiment analysis
  - Support technical indicators
  - Include social metrics if available

### Search Tools
- [ ] Implement internet_search tool
  - Consider using Google Custom Search API
  - Alternative: Use DuckDuckGo API for no rate limits
  - Include source validation and fact checking
  - Add result caching for performance

### General Improvements
- [ ] Implement proper error handling for all tools
- [ ] Add rate limiting protection
- [ ] Add caching for all API calls
- [ ] Add logging for tool usage and performance
- [ ] Add unit tests for each tool
