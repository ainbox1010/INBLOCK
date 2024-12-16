import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import FeaturesPage from './pages/FeaturesPage'
import RoadmapPage from './pages/RoadmapPage'
import FAQPage from './pages/FAQPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
