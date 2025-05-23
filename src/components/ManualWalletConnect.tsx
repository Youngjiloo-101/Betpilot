'use client'

import { useState } from 'react'
import { useWallet } from '@/contexts/WalletContext'
import { motion } from 'framer-motion'
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import GlowingText from './GlowingText'

interface ManualWalletConnectProps {
  onSuccess: (address: string) => void
  onCancel: () => void
}

export default function ManualWalletConnect({ onSuccess, onCancel }: ManualWalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { formatWalletAddress } = useWallet()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Basic validation
    if (!walletAddress) {
      setError('Please enter a wallet address')
      return
    }
    
    if (!walletAddress.startsWith('0x') || walletAddress.length < 42) {
      setError('Please enter a valid Sui wallet address (starts with 0x and at least 42 characters)')
      return
    }
    
    setIsConnecting(true)
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store in localStorage for persistence
      localStorage.setItem('walletAddress', walletAddress)
      localStorage.setItem('walletName', 'Manual Connection')
      
      // Call success callback
      onSuccess(walletAddress)
    } catch (err) {
      console.error('Error in manual wallet connection:', err)
      setError('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }
  
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
          Manual Wallet Connection
        </GlowingText>
        <p className="mt-2 text-gray-300">
          Enter your Sui wallet address to connect manually
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
          <p className="text-red-300 text-sm flex items-center">
            <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            {error}
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300 mb-1">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-2 bg-primary-800/50 border border-primary-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isConnecting}
          />
          <p className="mt-1 text-xs text-gray-400">
            Enter your complete Sui wallet address
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-primary-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            disabled={isConnecting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex justify-center items-center"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <ArrowPathIcon className="animate-spin h-4 w-4 mr-2" />
                Connecting...
              </>
            ) : (
              'Connect'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
