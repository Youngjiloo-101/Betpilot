'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  getAvailableWallets, 
  WalletAdapter, 
  getWalletBalance, 
  formatBalance,
  formatWalletAddress as formatAddress
} from '@/utils/walletAdapter'

interface WalletContextType {
  walletAddress: string | null
  formattedAddress: string
  isConnecting: boolean
  isConnected: boolean
  walletBalance: string
  formattedBalance: string
  error: string | null
  availableWallets: WalletAdapter[]
  selectedWallet: WalletAdapter | null
  connectWallet: (walletName: string) => Promise<boolean>
  disconnectWallet: () => Promise<void>
  refreshBalance: () => Promise<void>
  formatWalletAddress: (address: string | null) => string
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletBalance, setWalletBalance] = useState<string>('0')
  const [error, setError] = useState<string | null>(null)
  const [availableWallets, setAvailableWallets] = useState<WalletAdapter[]>([])
  const [selectedWallet, setSelectedWallet] = useState<WalletAdapter | null>(null)

  // Load available wallets
  useEffect(() => {
    // Get available wallets
    const wallets = getAvailableWallets()
    setAvailableWallets(wallets)

    // Check if there's a stored wallet address and wallet name
    const storedAddress = localStorage.getItem('walletAddress')
    const storedWalletName = localStorage.getItem('walletName')
    
    if (storedAddress && storedWalletName) {
      // Try to find the stored wallet
      const wallet = wallets.find(w => w.name === storedWalletName)
      
      if (wallet) {
        // Try to reconnect to the wallet
        reconnectWallet(wallet, storedAddress)
      } else {
        // Clear stored data if wallet not found
        localStorage.removeItem('walletAddress')
        localStorage.removeItem('walletName')
      }
    }
    
    // Set up wallet change listener
    const handleWalletChange = () => {
      setAvailableWallets(getAvailableWallets())
    }
    
    // Add event listener for wallet changes
    window.addEventListener('wallet-standard:change', handleWalletChange)
    
    // Clean up event listener
    return () => {
      window.removeEventListener('wallet-standard:change', handleWalletChange)
    }
  }, [])
  
  // Reconnect to wallet
  const reconnectWallet = async (wallet: WalletAdapter, address: string) => {
    try {
      // Try to connect to the wallet
      const connected = await wallet.connect()
      
      if (connected) {
        setSelectedWallet(wallet)
        setWalletAddress(wallet.address)
        setIsConnected(true)
        
        // Get wallet balance
        await refreshBalance()
      } else {
        // Clear stored data if reconnection failed
        localStorage.removeItem('walletAddress')
        localStorage.removeItem('walletName')
      }
    } catch (err) {
      console.error('Error reconnecting to wallet:', err)
      // Clear stored data if reconnection failed
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('walletName')
    }
  }

  // Refresh wallet balance
  const refreshBalance = async () => {
    if (!walletAddress) return
    
    try {
      const balance = await getWalletBalance(walletAddress)
      setWalletBalance(balance)
    } catch (err) {
      console.error('Error fetching wallet balance:', err)
    }
  }

  // Connect wallet
  const connectWallet = async (walletName: string): Promise<boolean> => {
    setIsConnecting(true)
    setError(null)
    
    try {
      // Find the selected wallet provider
      const wallet = availableWallets.find(w => w.name === walletName)
      
      if (!wallet) {
        throw new Error('Wallet not found')
      }
      
      // Connect to wallet
      const connected = await wallet.connect()
      
      if (connected && wallet.address) {
        // Update state
        setSelectedWallet(wallet)
        setWalletAddress(wallet.address)
        setIsConnected(true)
        
        // Store wallet info
        localStorage.setItem('walletAddress', wallet.address)
        localStorage.setItem('walletName', wallet.name)
        
        // Get wallet balance
        await refreshBalance()
        
        return true
      } else {
        throw new Error('Failed to connect wallet')
      }
    } catch (err: any) {
      console.error('Wallet connection error:', err)
      setError(err.message || 'Failed to connect wallet')
      return false
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      if (selectedWallet) {
        await selectedWallet.disconnect()
      }
      
      // Reset state
      setSelectedWallet(null)
      setWalletAddress(null)
      setIsConnected(false)
      setWalletBalance('0')
      
      // Clear stored wallet info
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('walletName')
    } catch (err) {
      console.error('Error disconnecting wallet:', err)
    }
  }
  
  // Format wallet address
  const formatWalletAddress = (address: string | null): string => {
    return formatAddress(address)
  }

  // Calculate formatted values
  const formattedAddress = formatAddress(walletAddress)
  const formattedBalance = formatBalance(walletBalance)
  
  const value = {
    walletAddress,
    formattedAddress,
    isConnecting,
    isConnected,
    walletBalance,
    formattedBalance,
    error,
    availableWallets,
    selectedWallet,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    formatWalletAddress
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export default WalletContext
