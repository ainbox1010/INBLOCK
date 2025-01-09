# Project Instructions for Cursor

## Overview
We are building an AI agent integrated into a Django backend. The frontend is React, but focus on the agent logic in Python.

The agent:
- Receives user input (via a `/api/user/message/` endpoint, for example).
- Uses a LangChain-based Conversational ReAct Agent to handle conversation.
- Maintains conversation memory and can recall previous exchanges.
- Uses OpenAI's GPT-3.5-turbo or GPT-4 as the main LLM initially.
- Has a Retriever from a vector database (Chroma) for RAG (Retrieval Augmented Generation), where it stores crypto trading domain knowledge.
- Has a custom Tool to query external crypto data APIs (like CoinGecko) for current price/volume info.

## Requirements
1. **Memory**: Use `ConversationBufferMemory` or `ConversationBufferWindowMemory` for short-term memory.
   - Memory should be easily replaceable if we want to log long-term history in a database.
2. **Vector Store**: Use Chroma as vector DB for embedding and retrieval of domain knowledge.
   - Provide a `Retriever` from Chroma to the agent.
3. **Tools**:
   - Implement a `crypto_price_tool`: a Python function wrapped as a LangChain Tool that takes a coin name and returns price data.
4. **Agent**:
   - Implement a Conversational ReAct agent (LangChain supports `initialize_agent()` with `AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION`).
   - The agent should decide:
     - When to call the crypto tool,
     - When to retrieve from vector store,
     - When to just answer from its own knowledge.
5. **Contradictory or New User Input**:
   - If user input contradicts existing knowledge or introduces new knowledge:
     - Agent should store this info as “pending knowledge” in a database table (e.g., `NewKnowledge`).
     - Agent does NOT update vector store immediately.
     - Admin reviews these once every 24 hours; upon admin approval, a separate maintenance script updates the vector store embeddings.
   - For MVP, we can just code stubs: 
     - A Python function `store_pending_knowledge(info: str)` and 
     - Comments where we’d integrate admin approval.
6. **Architecture**:
   - A single Python file (or a Django service file) where LangChain components (LLM, Memory, Tools, Agent) are set up.
   - Code structured in a way that adding more tools later is easy.
7. **OpenAI Key**:
   - Assume `OPENAI_API_KEY` is set as an environment variable. Use it securely.
8. **Future-Proof**:
   - Keep code organized, use dependency injection where possible.
   - Possibly define interfaces for tools and memory so we can swap implementations.

## Deliverables for Cursor
When asking Cursor to generate code:
- Ensure it creates a `crypto_tool.py` for the crypto data retrieval tool.
- A `agent_setup.py` or similar file for agent initialization (LLM, Memory, Retriever, Tools, Agent).
- A `views.py` endpoint (for reference) that receives user messages and passes them to the agent.

## Final Notes
- The instructions above are for Cursor to reference when generating code.
- Maintain comments in code explaining the steps.

## Visualization Implementation Plan

### Technical Stack
- **Primary Tool**: React Flow
  - Native React integration
  - Built-in animation support
  - Interactive node system
  - Supports custom node types

### Design System
- **Color Scheme**: 
  - Primary: Current website theme colors
  - Accent colors for priority levels:
    - High Priority: accent-purple
    - Medium Priority: accent-blue
    - Lower Priority: accent-pink
  - Background: primary-900 (matching website dark theme)

### Interactive Features
1. **Component Nodes**
  - Expandable on click
  - Custom icons for each component type
  - Hover effects matching website styling
  - Gradient borders (using current website gradients)

2. **Connections**
  - Animated paths using Framer Motion
  - Bidirectional arrows where applicable
  - Flow indicators showing data movement
  - Gradient-colored based on connection type

3. **View Controls**
  - Toggle between:
    - Overview (high-level architecture)
    - Detailed view (component internals)
    - Implementation phases
  - Zoom controls
  - Pan functionality
  - Reset view button

### Multiple Views
1. **Main Architecture View**
  - High-level component overview
  - Primary data flows
  - Implementation priority indicators

2. **Subsystem Views**
  - Detailed component internals
  - Specific interactions
  - Technical specifications

3. **Implementation Timeline View**
  - Phase-based layout
  - Progress tracking
  - Dependencies visualization

### Component Details Panel
When a component is clicked:
- Slides in from side
- Shows:
  - Component description
  - Technical stack
  - Implementation status
  - Dependencies
  - API documentation
  - Code examples

### Animation Specifications
- **Flow Animations**:
  - Smooth path tracing
  - Data packet animations along paths
  - Gentle pulse effects for active components

- **Transition Effects**:
  - Smooth view transitions
  - Component expansion/collapse
  - Panel slide-ins/outs

### Implementation Priority Visualization
- Color-coded borders or accents
- Priority level badges
- Timeline integration
- Dependencies highlighted

Would you like me to:
1. Add more specific technical details?
2. Include example code snippets?
3. Elaborate on any particular section?
