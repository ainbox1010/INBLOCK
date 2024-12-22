import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import PricingPage from './pages/PricingPage'
import FeaturesPage from './pages/FeaturesPage'
import RoadmapPage from './pages/RoadmapPage'
import FAQPage from './pages/FAQPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'

console.log('Creating router with Layout:', Layout);

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
                path: '/pricing',
                element: <PricingPage />
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
                path: '/faq',
                element: <FAQPage />
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
            }
        ]
    }
])

export default function App() {
    console.log('App rendering');
    return <RouterProvider router={router} />
}
