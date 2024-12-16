import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'FAQ', href: '/faq' },
]

// Add custom CSS for the pulsing animation
const pulsingEyeStyles = {
  '@keyframes slowPulse': {
    '0%': { backgroundColor: '#991b1b' },
    '50%': { backgroundColor: '#dc2626' },
    '100%': { backgroundColor: '#991b1b' }
  },
  animation: 'slowPulse 3s ease-in-out infinite'
}

export default function Layout({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const authNavigation = isAuthenticated 
    ? [
        { name: 'Chat', href: '/chat' },  // Chat first
        ...navigation  // Then the rest of the navigation items
      ]
    : navigation;

  return (
    <div className="min-h-screen bg-gray-900" style={{backgroundColor: '#111827'}}>
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/" className="flex items-center space-x-2">
                      <div className="relative h-10 w-10 flex items-center justify-center">
                        <div 
                          className="h-6 w-6 rounded-full bg-red-700"
                          style={pulsingEyeStyles}
                        >
                          <div className="absolute inset-1 rounded-full bg-red-900 opacity-75"></div>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-white tracking-wider">
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
                      className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="ml-4 rounded-md bg-gray-800 px-4 py-2 text-sm font-bold text-white hover:bg-gray-700 shadow-xl border border-gray-700 transition-all duration-200"
                    >
                      SIGN OUT
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="ml-4 rounded-md bg-gray-800 px-4 py-2 text-sm font-bold text-white hover:bg-gray-700 shadow-xl border border-gray-700 transition-all duration-200"
                    >
                      SIGN IN
                    </Link>
                  )}
                </div>
                <div className="flex items-center sm:hidden">
                  <Disclosure.Button className="text-gray-400 hover:text-white">
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
                    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main className="text-white">{children}</main>
    </div>
  )
} 