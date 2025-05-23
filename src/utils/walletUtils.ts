import { getWallets } from '@mysten/wallet-standard'
import { SuiClient } from '@mysten/sui.js/client'

// Initialize Sui client
export const suiClient = new SuiClient({
  url: 'https://fullnode.mainnet.sui.io',
})

// Get all available wallets
export const getAvailableWallets = () => {
  const walletStandard = getWallets()
  const wallets = walletStandard.get()
  
  return wallets.map(wallet => ({
    id: wallet.name.toLowerCase(),
    name: wallet.name,
    icon: wallet.icon || '/sui-logo-3d-glow.svg', // Fallback to default icon
    wallet: wallet
  }))
}

// Connect to a wallet and get the address
export const connectToWallet = async (wallet: any) => {
  // Get wallet accounts
  const accounts = await wallet.getAccounts()
  
  if (accounts.length === 0) {
    // If no accounts, try to connect
    if (wallet.features['standard:connect']) {
      await wallet.features['standard:connect'].connect()
      // Try to get accounts again after connecting
      const newAccounts = await wallet.getAccounts()
      if (newAccounts.length === 0) {
        throw new Error('No accounts available after connection')
      }
      
      // Use the first account
      return newAccounts[0].address
    } else {
      throw new Error('Wallet does not support connection')
    }
  } else {
    // Use the first account if already connected
    return accounts[0].address
  }
}

// Check if a wallet address is valid
export const isValidSuiAddress = (address: string) => {
  // Basic validation for Sui addresses
  return address && address.startsWith('0x') && address.length >= 42
}

// Get wallet balance
export const getWalletBalance = async (address: string) => {
  try {
    // Validate address format before making the request
    if (!address || !isValidSuiAddress(address)) {
      console.warn('Invalid wallet address format for balance check:', address)
      return { totalBalance: '0' }
    }
    
    const balance = await suiClient.getBalance({
      owner: address,
    })
    return balance
  } catch (error) {
    console.error('Error getting wallet balance:', error)
    // Return a default balance object instead of throwing
    return { totalBalance: '0' }
  }
}

// Store wallet address in localStorage
export const storeWalletAddress = (address: string) => {
  localStorage.setItem('walletAddress', address)
}

// Get stored wallet address from localStorage
export const getStoredWalletAddress = () => {
  return localStorage.getItem('walletAddress')
}

// Clear stored wallet address
export const clearWalletAddress = () => {
  localStorage.removeItem('walletAddress')
}

// Create a context provider for wallet state management
export const createWalletContext = () => {
  // This is a placeholder for a more complex context implementation
  // that would manage wallet state across the application
  return {
    address: getStoredWalletAddress(),
    connect: async (wallet: any) => {
      const address = await connectToWallet(wallet)
      storeWalletAddress(address)
      return address
    },
    disconnect: () => {
      clearWalletAddress()
    }
  }
}
