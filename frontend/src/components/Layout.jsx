import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import WaveTerrain from './backgrounds/WaveTerrain'

export default function Layout() {
    return (
        <div className="min-h-screen bg-primary-900 flex flex-col">
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            <div className="relative z-10 flex-1">
                <Navbar />
                <main className="pt-16">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gradient-to-r from-accent-purple/20 via-accent-pink/20 to-accent-blue/20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-center space-x-8">
                        <a 
                            href="https://x.com/InBlockAI" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-accent-purple transition-colors"
                        >
                            X.com
                        </a>
                        <a 
                            href="https://web.telegram.org/a/#-1001901930536"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-accent-purple transition-colors"
                        >
                            Telegram
                        </a>
                        <Link to="/terms" className="text-gray-400 hover:text-accent-purple transition-colors">
                            Terms
                        </Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-accent-purple transition-colors">
                            Privacy
                        </Link>
                        <span className="text-gray-400">© 2024 InBlock AI</span>
                    </div>
                </div>
            </footer>
        </div>
    )
} 