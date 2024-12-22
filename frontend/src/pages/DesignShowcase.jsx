import { Tab } from '@headlessui/react'
import LogoShowcase from '../components/showcase/LogoShowcase'
import LandingShowcase from '../components/showcase/LandingShowcase'

export default function DesignShowcase() {
    return (
        <div className="min-h-screen bg-primary-900 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Design Showcase</h1>
                
                <Tab.Group>
                    <Tab.List className="flex space-x-4 bg-gray-800/50 p-2 rounded-lg mb-8">
                        <Tab className={({ selected }) =>
                            `px-4 py-2 rounded-lg ${
                                selected 
                                    ? 'bg-accent-purple text-white' 
                                    : 'text-gray-400 hover:text-white'
                            }`
                        }>
                            Logo Concepts
                        </Tab>
                        <Tab className={({ selected }) =>
                            `px-4 py-2 rounded-lg ${
                                selected 
                                    ? 'bg-accent-purple text-white' 
                                    : 'text-gray-400 hover:text-white'
                            }`
                        }>
                            Landing Pages
                        </Tab>
                    </Tab.List>

                    <Tab.Panels>
                        <Tab.Panel>
                            <LogoShowcase />
                        </Tab.Panel>
                        <Tab.Panel>
                            <LandingShowcase />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
} 