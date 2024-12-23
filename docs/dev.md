# InBlock AI Development Documentation

## 1. Project Overview
InBlock AI is a web application designed to assist crypto traders and investors. It provides:
- AI-powered chat assistance for crypto trading
- Tiered access system (demo, regular users, staff)
- User authentication and management
- Conversation history and persistence
- Token-based security

## 2. Core Functionalities

### Authentication System
- Email-based registration and login
- JWT token authentication (access + refresh tokens)
- Password reset functionality
- Email verification (planned)

### Chat System
- Anonymous users: 5 queries per day
- Regular users: 20 queries per day
- Staff users: Unlimited queries
- Query count reset every 24 hours
- Conversation history for authenticated users
- Preserve demo conversation when user signs up/in

### User Management
- User roles (anonymous, authenticated, staff)
- Query count tracking
- Profile management (planned)
- Usage statistics

### AI Integration
- GPT-3.5 Turbo integration
- Customizable model parameters
- Specialized crypto trading knowledge base
- Response optimization for trading context

## 3. Documentation Needed

### Technical Documentation
- API endpoints and usage
- Authentication flow
- Database schema
- Token refresh mechanism
- Rate limiting implementation

### User Documentation
- Registration and login process
- Chat usage guidelines
- Query limits explanation
- Account management

### Development Documentation
- Project setup guide
- Environment variables
- Testing procedures
- Deployment process

## 4. File Structure

### Frontend (/frontend)
```
src/
├── components/
│   ├── Layout.jsx (Navigation and page structure)
│   ├── DemoChatWindow.jsx (5 queries/day limit chat)
│   └── AuthenticatedChatWindow.jsx (20/unlimited queries chat)
├── pages/
│   ├── LandingPage.jsx (Homepage with demo chat)
│   ├── LoginPage.jsx (User authentication)
│   ├── RegisterPage.jsx (User registration)
│   └── ChatPage.jsx (Full chat access for auth users)
├── utils/
│   └── axios.js (API communication with token handling)
└── App.jsx (Route management)
```

### Backend (/backend)
```
├── config/
│   ├── settings.py (Django settings, JWT config)
│   └── urls.py (Main URL routing)
├── users/
│   ├── models.py (User model with query limits)
│   ├── views.py (Auth endpoints)
│   ├── urls.py (Auth routes)
│   └── admin.py (Admin panel config)
├── chat/
│   ├── models.py (Conversation and Message models)
│   ├── views.py (Chat endpoints)
│   ├── urls.py (Chat routes)
│   └── services.py (OpenAI integration)
└── manage.py
```

### Vector Database
```
vector-file-source/
└── Meme Coin Trading GPT Rule Set.md (AI knowledge base)
```

### Configuration Files
```
├── .env (Environment variables)
├── .gitignore (Git exclusions)
├── requirements.txt (Python dependencies)
└── package.json (Node.js dependencies)
```

### Documentation
```
├── dev.md (Development documentation)
└── README.md (Project overview)
```

# Development Notes

## Security Considerations

### Demo Chat Query Limiting
Current implementation stores the query count in localStorage, which has several security implications:

- Users can reset their count by clearing localStorage
- Count can be manually edited through browser dev tools
- Each browser/device gets a separate count
- No server-side validation

TODO: Future implementation should:
- Track query counts per IP/session on backend
- Implement proper rate limiting middleware
- Remove reliance on client-side storage for critical limitations

## Environment Setup
...

## API Integration
...

## Component Structure
...