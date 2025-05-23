'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, WalletIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import BetPilotLogo from './BetPilotLogo'
import { useWallet } from '@/contexts/WalletContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Reverse Odds', href: '/reverse-odds' },
  { name: 'Bet Planner', href: '/bet-planner' },
  { name: 'Monte Carlo', href: '/monte-carlo' },
  { name: 'BetGPT', href: '/betgpt' },
  { name: 'NFTs', href: '/nfts' },
  { name: 'Portfolios', href: '/portfolios' },
  { name: 'Voting Room', href: '/voting-room' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { 
    walletAddress, 
    isConnected, 
    formattedAddress, 
    formattedBalance,
    disconnectWallet,
    formatWalletAddress
  } = useWallet()

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BetPilot</span>
            <BetPilotLogo size="sm" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-primary-400"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isConnected && walletAddress ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex items-center rounded-full bg-primary-800 px-4 py-2 text-sm text-white hover:bg-primary-700">
                  <WalletIcon className="h-4 w-4 mr-2" />
                  <span>{formattedAddress}</span>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-700">
                    {formattedBalance} SUI
                  </span>
                </Menu.Button>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/dashboard"
                        className={`${active ? 'bg-primary-700' : ''} block px-4 py-2 text-sm text-white`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={`${active ? 'bg-primary-700' : ''} block px-4 py-2 text-sm text-white`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => disconnectWallet()}
                        className={`${active ? 'bg-primary-700' : ''} flex w-full items-center px-4 py-2 text-sm text-white`}
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Disconnect
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold leading-6 text-white mr-4">
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="rounded-md bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">BetPilot</span>
              <BetPilotLogo size="sm" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-primary-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isConnected && walletAddress ? (
                  <>
                    <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-primary-800 mb-2">
                      <div className="flex items-center">
                        <WalletIcon className="h-5 w-5 mr-2" />
                        <span>{formattedAddress}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-400">
                        {formattedBalance} SUI
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        disconnectWallet()
                        setMobileMenuOpen(false)
                      }}
                      className="-mx-3 flex w-full items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-800"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Disconnect
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
