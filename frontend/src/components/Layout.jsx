import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import WaveTerrain from './backgrounds/WaveTerrain'

export default function Layout() {
    return (
        <div className="min-h-screen bg-primary-900">
            <div className="fixed inset-0 z-0">
                <WaveTerrain />
            </div>
            
            <div className="relative z-10">
                <Navbar />
                <main className="pt-16">
                    <Outlet />
                </main>
            </div>
        </div>
    )
} 