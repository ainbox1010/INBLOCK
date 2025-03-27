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
