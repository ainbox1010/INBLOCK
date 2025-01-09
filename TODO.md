# Query Counting Implementation TODO

## 1. Demo User Query Counting
- [ ] Implement session-based counting in ChatView
- [ ] Add 5-query limit for demo users
- [ ] Add remaining queries display in demo chat
- [ ] Add "upgrade to register" prompt when limit reached
- [ ] Test demo user query counting

## 2. Registered User Query Counting
- [ ] Implement database counting in ChatViewSet
- [ ] Add 20-query limit for free users
- [ ] Add remaining queries endpoint
- [ ] Add query count display in chat interface
- [ ] Test registered user query counting

## 3. Subscription System
- [ ] Set up subscription plans
  - [ ] Free tier (20 queries/day)
  - [ ] Premium tier (100 queries/day)
  - [ ] Enterprise tier (unlimited)
- [ ] Implement subscription checking in query system
- [ ] Add subscription status endpoint
- [ ] Test subscription-based limits

## 4. Frontend Integration
- [ ] Add query counter display
- [ ] Show appropriate upgrade prompts
- [ ] Handle limit-reached scenarios
- [ ] Add subscription plan selection UI
- [ ] Test all user scenarios

## 5. Testing & Documentation
- [ ] Write unit tests for query counting
- [ ] Write integration tests
- [ ] Document query limit system
- [ ] Add admin documentation
- [ ] Test edge cases

## 6. Deployment Preparation
- [ ] Ensure query counting works with PostgreSQL
- [ ] Prepare Railway.app configuration
- [ ] Document deployment process
- [ ] Plan database migration strategy 