import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
    console.log('Layout component rendering');

    return (
        <div className="min-h-screen bg-primary-900">
            <div className="relative z-50">
                <Navbar />
            </div>

            <main className="relative">
                <Outlet />
            </main>
        </div>
    )
} 