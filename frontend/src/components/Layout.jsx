import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'FAQ', href: '/faq' },
]

export default function Layout({ children }) {
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
                      <img
                        className="h-10 w-10"
                        src={logo}
                        alt="InBlock AI"
                      />
                      <span className="text-xl font-bold text-white tracking-wider">
                        INBLOCK
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button className="ml-4 rounded-md bg-gray-800 px-4 py-2 text-sm font-bold text-white hover:bg-gray-700 shadow-xl border border-gray-700 transition-all duration-200">
                    SIGN IN
                  </button>
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
                {navigation.map((item) => (
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