# Development Guide

## Backend Setup
1. Virtual Environment
```bash
# Activate virtual environment
source inblock/bin/activate  # Unix/MacOS
# or
inblock\Scripts\activate.bat  # Windows
```

2. Environment Variables
- Copy `.env.example` to `.env` for local development
- Use `.env.production` for production settings

3. Database Setup
- Local: SQLite (default)
- Production: PostgreSQL

4. Cache Setup
- Local: LocMemCache
- Production: Redis

## Frontend Setup
1. Environment
- Development API URL: http://localhost:8000
- Production API URL: https://api.inblock.ai

2. Build Commands
```bash
npm run dev     # Development
npm run build   # Production
```

## API Documentation
### Demo Chat Endpoints
- GET `/api/chat/demo/` - Get remaining queries
- POST `/api/chat/demo/` - Send message