'use client'

import { useState, useEffect } from 'react'
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon, PencilSquareIcon, CubeIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import GlowingText from './GlowingText'
import { useWallet } from '@/contexts/WalletContext'
import ManualWalletConnect from './ManualWalletConnect'
import { connectToSuiWallet, isSuiWalletAvailable } from '@/utils/suiWalletSpecific'

interface SuiWalletConnectProps {
  onSuccess: (address: string) => void
  onSkip?: () => void
}

export default function SuiWalletConnect({ onSuccess, onSkip }: SuiWalletConnectProps) {
  const { 
    connectWallet, 
    isConnecting, 
    walletAddress, 
    error, 
    availableWallets,
    formattedAddress
  } = useWallet()
  
  const [showManualConnect, setShowManualConnect] = useState(false)
  const [directConnecting, setDirectConnecting] = useState(false)
  const [hasSuiWallet, setHasSuiWallet] = useState(false)
  
  // Check if Sui wallet extension is available
  useEffect(() => {
    setHasSuiWallet(isSuiWalletAvailable())
  }, [])
  
  // Handle wallet connection
  const handleWalletConnect = async (walletName: string) => {
    try {
      const success = await connectWallet(walletName)
      
      if (success && walletAddress) {
        // Call the onSuccess callback with the wallet address
        setTimeout(() => {
          onSuccess(walletAddress)
        }, 1000)
      }
    } catch (err) {
      console.error('Error connecting wallet:', err)
    }
  }
  
  // Handle direct Sui wallet connection
  const handleDirectSuiConnect = async () => {
    try {
      setDirectConnecting(true)
      
      // Connect directly to Sui wallet
      const address = await connectToSuiWallet()
      
      if (address) {
        // Store in localStorage for persistence
        localStorage.setItem('walletAddress', address)
        localStorage.setItem('walletName', 'Sui Wallet')
        
        // Call the onSuccess callback with the wallet address
        setTimeout(() => {
          onSuccess(address)
        }, 1000)
      } else {
        console.error('Failed to get address from Sui wallet')
      }
    } catch (err) {
      console.error('Error connecting to Sui wallet directly:', err)
    } finally {
      setDirectConnecting(false)
    }
  }
  
  // Effect to call onSuccess when wallet is connected
  useEffect(() => {
    if (walletAddress) {
      onSuccess(walletAddress)
    }
  }, [walletAddress, onSuccess])
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-primary-800/30 backdrop-blur-sm border border-primary-700/50 shadow-xl rounded-lg p-6"
    >
      <div className="text-center mb-6">
        <GlowingText 
          as="h2" 
          className="text-2xl font-bold text-white"
          glowColor="rgba(255, 255, 255, 0.6)"
          glowIntensity="medium"
        >
          Connect Your Sui Wallet
        </GlowingText>
        <p className="mt-2 text-gray-300">
          Connect your wallet to access all features of BetPilot
        </p>
      </div>
      
      {showManualConnect ? (
        <ManualWalletConnect 
          onSuccess={onSuccess}
          onCancel={() => setShowManualConnect(false)}
        />
      ) : walletAddress ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <GlowingText 
            as="h3" 
            className="text-xl font-semibold text-white mb-2"
            glowColor="rgba(255, 255, 255, 0.6)"
            glowIntensity="light"
          >
            Wallet Connected!
          </GlowingText>
          <div className="bg-primary-700/30 rounded-md p-3 mb-4 break-all">
            <p className="text-sm text-gray-300">
              {walletAddress}
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
              <p className="text-red-300 text-sm flex items-center">
                <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                {error}
              </p>
            </div>
          )}
          
          {availableWallets.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-300 mb-3">No Sui wallets detected</p>
              <div className="space-y-2 mt-4">
                <p className="text-sm text-gray-400">Install a Sui wallet from these options:</p>
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors duration-200 py-1"
                >
                  Install Sui Wallet
                </a>
                <a 
                  href="https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors duration-200 py-1"
                >
                  Install Ethos Wallet
                </a>
                <a 
                  href="https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors duration-200 py-1"
                >
                  Install Suiet Wallet
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                After installing, refresh this page
              </p>
              
              <div className="mt-6 border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-300 mb-2">Or connect manually:</p>
                <button
                  onClick={() => setShowManualConnect(true)}
                  className="flex items-center justify-center mx-auto px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-white hover:bg-primary-700/50 transition-colors duration-200"
                >
                  <PencilSquareIcon className="h-4 w-4 mr-2" />
                  Manual Connection
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {availableWallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletConnect(wallet.name)}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-between p-3 rounded-md bg-primary-700/50 hover:bg-primary-700/70 transition-colors duration-200 border border-primary-600/50"
                >
                  <div className="flex items-center">
                    {wallet.icon ? (
                      <img src={wallet.icon} alt={wallet.name} className="w-6 h-6 mr-3" />
                    ) : (
                      <div className="w-6 h-6 mr-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{wallet.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-white">{wallet.name}</span>
                  </div>
                  {isConnecting ? (
                    <ArrowPathIcon className="animate-spin h-5 w-5 text-blue-400" />
                  ) : (
                    <span className="text-sm text-blue-400">Connect</span>
                  )}
                </button>
              ))}
              
              {hasSuiWallet && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button
                    onClick={handleDirectSuiConnect}
                    disabled={directConnecting}
                    className="w-full flex items-center justify-between p-3 rounded-md bg-blue-700/50 hover:bg-blue-700/70 transition-colors duration-200 border border-blue-600/30 mb-3"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
                        <CubeIcon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white">Direct Sui Wallet Connect</span>
                    </div>
                    {directConnecting ? (
                      <ArrowPathIcon className="animate-spin h-5 w-5 text-blue-400" />
                    ) : (
                      <span className="text-sm text-blue-300">Try This First</span>
                    )}
                  </button>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowManualConnect(true)}
                  className="w-full flex items-center justify-between p-3 rounded-md bg-primary-800/50 hover:bg-primary-700/70 transition-colors duration-200 border border-primary-600/30"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 bg-gray-600 rounded-full flex items-center justify-center">
                      <PencilSquareIcon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-white">Manual Connection</span>
                  </div>
                  <span className="text-sm text-gray-400">Enter Address</span>
                </button>
              </div>
            </div>
          )}
          
          {onSkip && (
            <div className="mt-6 text-center">
              <button
                onClick={onSkip}
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                Skip for now
              </button>
              <p className="mt-1 text-xs text-gray-500">
                You can connect your wallet later in settings
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}
