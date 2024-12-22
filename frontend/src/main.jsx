import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LandingVariantProvider } from './contexts/LandingVariantContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandingVariantProvider>
      <App />
    </LandingVariantProvider>
  </React.StrictMode>,
)
