import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LandingVariantProvider } from './contexts/LandingVariantContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import FeaturesPage from './pages/FeaturesPage'
import RoadmapPage from './pages/RoadmapPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'
import DesignShowcase from './pages/DesignShowcase'
import ProtocolPage from './pages/ProtocolPage'
import { ThemeProvider } from './contexts/ThemeContext'
import BlogPage from './pages/BlogPage'
import TokenomicsPage from './pages/TokenomicsPage'
import DemoChatWindow from './components/DemoChatWindow'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: '/features',
                element: <FeaturesPage />
            },
            {
                path: '/roadmap',
                element: <RoadmapPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/chat',
                element: <ChatPage />
            },
            {
                path: '/design',
                element: <DesignShowcase />
            },
            {
                path: '/protocol',
                element: <ProtocolPage />
            },
            {
                path: '/blog',
                element: <BlogPage />
            },
            {
                path: '/tokenomics',
                element: <TokenomicsPage />
            },
            {
                path: '/demo-chat',
                element: <div className="container mx-auto px-4 py-20">
                    <DemoChatWindow />
                </div>
            },
            {
                path: '/terms',
                element: <TermsPage />
            },
            {
                path: '/privacy',
                element: <PrivacyPage />
            }
        ]
    }
])

export default function App() {
    return (
        <ThemeProvider>
            <LandingVariantProvider>
                <RouterProvider router={router} />
            </LandingVariantProvider>
        </ThemeProvider>
    )
}
