import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import IbLogo from '../assets/images/IB_logo1.webp'

const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Protocol', href: '/protocol' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Tokenomics', href: '/tokenomics' },
    { name: 'Blog', href: '/blog' }
]

export default function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/');
    };

    const authNavigation = isAuthenticated 
        ? [{ name: 'Chat', href: '/chat' }, ...navigation]
        : navigation;

    return (
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50 bg-primary-900/80 backdrop-blur-sm border-b border-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to="/" className="flex items-center space-x-3 group">
                                        <img src={IbLogo} alt="InBlock Logo" className="h-10 w-10" />
                                        <span className="text-xl font-bold text-white tracking-wider group-hover:text-accent-purple transition-colors">
                                            INBLOCK
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {authNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`px-3 py-2 text-sm font-medium text-gray-300 hover:text-accent-pink transition-colors ${item.className || ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className="ml-4 rounded-lg bg-accent-purple/10 px-4 py-2 text-sm font-bold text-accent-purple hover:bg-accent-purple/20 border border-accent-purple/20 transition-all duration-200"
                                    >
                                        SIGN OUT
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="ml-4 rounded-lg bg-accent-purple px-4 py-2 text-sm font-bold text-white hover:bg-accent-pink shadow-lg shadow-accent-purple/20 transition-all duration-200"
                                    >
                                        SIGN IN
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-accent-purple/10 hover:text-accent-purple">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {authNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-accent-pink transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="mt-4 w-full rounded-lg bg-accent-purple/10 px-4 py-2 text-sm font-bold text-accent-purple hover:bg-accent-purple/20 border border-accent-purple/20"
                                >
                                    SIGN OUT
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="mt-4 block w-full rounded-lg bg-accent-purple px-4 py-2 text-center text-sm font-bold text-white hover:bg-accent-pink shadow-lg shadow-accent-purple/20"
                                >
                                    SIGN IN
                                </Link>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
} 