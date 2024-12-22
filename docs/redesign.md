# InBlock Frontend Redesign Instructions

## Overview

We are redesigning the **InBlock AI** frontend using **React** + **Tailwind CSS**. Our core feature is the **chat window** with three distinct tiers:
- Demo (5 queries/day)
- Authenticated (20 queries/day)
- Staff (Unlimited queries)

## 1. Page and Component Structure

### Landing Page (Homepage)

1. **Hero Section**  
   - Title: "AI Powered Co-Pilot"
   - Subheading: "Empowering retail crypto traders and investors against the pros and hedge funds"
   - Two CTAs:
     - "JOIN NOW" (primary)
     - "READ ROADMAP" (secondary)

2. **Demo Chat Window**  
   - Shows remaining queries (5/day limit)
   - Query counter with visual feedback
   - "Sign Up" prompt when limit reached
   - Preserves conversation for transfer after registration

3. **Key Features Display**
   - AI Trading Signals
   - Market Analysis
   - Real-time Chat Support
   - Portfolio Optimization
   - Security Features

### Authenticated Experience

1. **Chat Interface**
   - Query counter (20/day for regular users)
   - Conversation history
   - Model settings panel:
     - Temperature control
     - Model selection
   - Response type indicators:
     - RAG responses
     - Direct AI responses
     - Crypto price data

2. **Staff Features**
   - Unlimited queries badge
   - Access to all models
   - Advanced settings panel

## 2. Component Specifications

### DemoChatWindow.jsx
- Query limit tracker (5/day)
- Local storage for demo persistence
- Upgrade prompts
- Basic chat functionality

### AuthenticatedChatWindow.jsx
- Query limit tracker (20/day)
- Token-based authentication
- Conversation persistence
- Advanced features based on user role

### Layout.jsx
- Dynamic navigation based on auth state
- Chat menu item for authenticated users
- User role indicators

## 3. Technical Integration

### Authentication Flow
- JWT token handling
- Token refresh mechanism
- Role-based access control
- Query limit enforcement

### API Integration
- OpenAI connection
- Crypto price tool
- RAG system integration
- Conversation persistence

## 4. Styling Guidelines

### Theme
- Dark mode primary
- Gold accent colors
- Professional trading interface feel

### Components
- Consistent chat window styling
- Clear visual hierarchy
- Role-specific UI elements
- Response type differentiation

## 5. User Experience Flows

### Demo to Authenticated
- Preserve chat history
- Smooth transition
- Clear upgrade benefits

### Query Limit Handling
- Visual countdown
- Clear limit notifications
- Upgrade pathways

### Staff Experience
- Unlimited badge
- Advanced controls
- Admin features

## 6. Implementation Priority

1. Core Chat Experience
2. Authentication Integration
3. Query Limit System
4. Conversation Persistence
5. Advanced Features (RAG, Crypto Tools)

## 7. Future Considerations

- Mobile responsiveness
- Multi-language support
- Analytics integration
- Performance optimization

