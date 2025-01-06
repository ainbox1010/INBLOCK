# Project Structure

```
.
├── TODO.md
├── backend
│   ├── api
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── chat
│   │   ├── admin.py
│   │   ├── migrations
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── services.py
│   │   ├── tests
│   │   │   └── test_openai.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── config
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   ├── manage.py
│   ├── requirements.txt
│   ├── subscription
│   │   ├── admin.py
│   │   ├── migrations
│   │   └── models.py
│   ├── subscriptions
│   └── users
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── migrations
│       ├── models.py
│       ├── serializers.py
│       ├── tests.py
│       ├── urls.py
│       └── views.py
├── docs
│   ├── agent.md
│   ├── api-spec.yaml
│   ├── dev.md
│   └── redesign.md
├── frontend
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── images
│   │   │   │   └── logo.svg
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── AuthenticatedChatWindow.jsx
│   │   │   ├── DemoChatWindow.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── backgrounds
│   │   │   │   ├── CircuitGrid.jsx
│   │   │   │   ├── MeshGradient.jsx
│   │   │   │   ├── NetworkNodes.jsx
│   │   │   │   ├── TradingCharts.jsx
│   │   │   │   └── WaveTerrain.jsx
│   │   │   ├── brand
│   │   │   │   ├── Favicon.jsx
│   │   │   │   ├── Logo.jsx
│   │   │   │   └── logos
│   │   │   ├── decorative
│   │   │   │   └── FloatingShapes.jsx
│   │   │   ├── dev
│   │   │   │   └── VariantSwitcher.jsx
│   │   │   ├── protocol
│   │   │   │   ├── ComponentNode.jsx
│   │   │   │   ├── DetailPanel.jsx
│   │   │   │   └── ViewControls.jsx
│   │   │   └── showcase
│   │   │       ├── LandingShowcase.jsx
│   │   │       └── LogoShowcase.jsx
│   │   ├── config
│   │   │   └── env.js
│   │   ├── contexts
│   │   │   ├── LandingVariantContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── index.css
│   │   ├── layouts
│   │   │   └── PageLayout.jsx
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── BlogPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── DesignShowcase.jsx
│   │   │   ├── FeaturesPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProtocolDesigner.jsx
│   │   │   ├── ProtocolPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── RoadmapPage.jsx
│   │   │   ├── TokenomicsPage.jsx
│   │   │   └── landing-variants
│   │   │       ├── LandingPageCrypto.jsx
│   │   │       ├── LandingPageEnterprise.jsx
│   │   │       ├── LandingPageFeature.jsx
│   │   │       ├── LandingPageMinimal.jsx
│   │   │       └── LandingPageModern.jsx
│   │   ├── theme
│   │   │   └── modern
│   │   │       ├── index.js
│   │   │       └── index.jsx
│   │   └── utils
│   │       ├── abTesting.js
│   │       ├── axios.js
│   │       ├── constants.js
│   │       └── protocol
│   │           ├── edges.js
│   │           └── nodes.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── vector-file-source
│   └── Meme Coin Trading GPT Rule Set.md
└── vite.config.js
```

This structure shows a typical full-stack application with:

- Backend (Django)
  - Multiple Django apps (api, chat, users, etc.)
  - Configuration files
  - Database migrations

- Frontend (React/Vite)
  - Source code in src/
  - Components organized by type
  - Pages and layouts
  - Theme and utility functions
  - Public assets

- Documentation
  - API specifications
  - Development guides
  - Agent documentation