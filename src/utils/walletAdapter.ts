import { 
  SuiClient, 
  getFullnodeUrl, 
  SuiTransactionBlockResponseOptions 
} from '@mysten/sui.js/client';
import { 
  WalletAccount, 
  WalletAdapterList, 
  getWallets 
} from '@mysten/wallet-standard';
import { 
  TransactionBlock 
} from '@mysten/sui.js/transactions';

// Initialize Sui client with testnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl('testnet'),
});

// Interface for wallet adapter
export interface WalletAdapter {
  name: string;
  icon: string | null;
  connected: boolean;
  connecting: boolean;
  wallet: any;
  accounts: WalletAccount[];
  address: string | null;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  signAndExecuteTransactionBlock: (
    transaction: TransactionBlock,
    options?: SuiTransactionBlockResponseOptions
  ) => Promise<any>;
}

// Create a wallet adapter
export function createWalletAdapter(wallet: any): WalletAdapter {
  return {
    name: wallet.name,
    icon: wallet.icon || null,
    connected: false,
    connecting: false,
    wallet,
    accounts: [],
    address: null,

    // Connect to wallet
    async connect(): Promise<boolean> {
      try {
        this.connecting = true;
        
        // Check if wallet has standard connect feature
        if (wallet.features['standard:connect']) {
          await wallet.features['standard:connect'].connect();
        }
        
        // Get accounts
        this.accounts = await wallet.features['standard:getAccounts'].getAccounts();
        
        if (this.accounts.length > 0) {
          this.address = this.accounts[0].address;
          this.connected = true;
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error connecting to wallet:', error);
        return false;
      } finally {
        this.connecting = false;
      }
    },

    // Disconnect from wallet
    async disconnect(): Promise<void> {
      try {
        if (wallet.features['standard:disconnect']) {
          await wallet.features['standard:disconnect'].disconnect();
        }
        
        this.connected = false;
        this.accounts = [];
        this.address = null;
      } catch (error) {
        console.error('Error disconnecting from wallet:', error);
      }
    },

    // Sign and execute transaction block
    async signAndExecuteTransactionBlock(
      transaction: TransactionBlock,
      options?: SuiTransactionBlockResponseOptions
    ): Promise<any> {
      if (!this.connected || !this.address) {
        throw new Error('Wallet not connected');
      }

      try {
        // Check if wallet supports signTransactionBlock
        if (!wallet.features['sui:signTransactionBlock']) {
          throw new Error('Wallet does not support transaction signing');
        }

        // Prepare transaction
        const signedTransaction = await wallet.features['sui:signTransactionBlock'].signTransactionBlock({
          account: this.accounts[0],
          transactionBlock: transaction,
        });

        // Execute transaction
        return await suiClient.executeTransactionBlock({
          transactionBlock: signedTransaction.bytes,
          signature: signedTransaction.signature,
          options,
        });
      } catch (error) {
        console.error('Error signing and executing transaction:', error);
        throw error;
      }
    }
  };
}

// Enable debug mode to help troubleshoot wallet detection issues
const DEBUG_MODE = true;

// Get available wallets with fallback options
export function getAvailableWallets(): WalletAdapter[] {
  try {
    // First try to get wallets using the standard method
    const walletStandard = getWallets();
    const availableWallets = walletStandard.get();
    
    if (DEBUG_MODE) {
      console.log('Available wallets from wallet standard:', availableWallets);
      // Use type assertion to access potential wallet objects
      const windowObj = window as any;
      console.log('Window wallet objects:', windowObj.walletStandard, windowObj.suiWallet);
    }
    
    // If no wallets are detected, provide fallback options
    if (availableWallets.length === 0) {
      console.log('No wallets detected through standard method, adding fallback options');
      
      // Check for non-standard wallet objects that might be available
      if (DEBUG_MODE) {
        console.log('Checking for non-standard wallet objects...');
        const globalKeys = Object.keys(window);
        const potentialWalletKeys = globalKeys.filter(key => 
          key.toLowerCase().includes('wallet') || 
          key.toLowerCase().includes('sui') ||
          key.toLowerCase().includes('ethos')
        );
        console.log('Potential wallet keys found:', potentialWalletKeys);
      }
      
      return getFallbackWallets();
    }
    
    // Filter and map detected wallets
    const filteredWallets = availableWallets
      .filter(wallet => {
        // Log wallet details for debugging
        console.log(`Detected wallet: ${wallet.name}`, {
          hasConnect: !!wallet.features['standard:connect'],
          hasGetAccounts: !!wallet.features['standard:getAccounts'],
          hasSignTx: !!wallet.features['sui:signTransactionBlock']
        });
        
        return wallet.features['standard:connect'] && 
               wallet.features['standard:getAccounts'];
      })
      .map(wallet => createWalletAdapter(wallet));
    
    // If no wallets passed the filter, provide fallback options
    if (filteredWallets.length === 0) {
      return getFallbackWallets();
    }
    
    return filteredWallets;
  } catch (error) {
    console.error('Error getting available wallets:', error);
    // Return fallback options in case of error
    return getFallbackWallets();
  }
}

// Try to detect wallet directly from window object
function tryDirectWalletDetection(): WalletAdapter | null {
  try {
    const windowObj = window as any;
    console.log('Checking window object for wallet extensions:', Object.keys(windowObj));
    
    // Log all potential wallet-related objects for debugging
    const walletRelatedKeys = Object.keys(windowObj).filter(key => 
      key.toLowerCase().includes('wallet') || 
      key.toLowerCase().includes('sui') ||
      key.toLowerCase().includes('ethos') ||
      key.toLowerCase().includes('martian')
    );
    
    console.log('All potential wallet objects:', walletRelatedKeys);
    walletRelatedKeys.forEach(key => {
      console.log(`Wallet object '${key}':`, windowObj[key]);
    });
    
    // Check for common wallet objects
    if (windowObj.suiWallet) {
      console.log('Found Sui Wallet directly on window object');
      return createDirectWalletAdapter('Sui Wallet', windowObj.suiWallet);
    }
    
    if (windowObj.ethosWallet) {
      console.log('Found Ethos Wallet directly on window object');
      return createDirectWalletAdapter('Ethos Wallet', windowObj.ethosWallet);
    }
    
    if (windowObj.suiet) {
      console.log('Found Suiet Wallet directly on window object');
      return createDirectWalletAdapter('Suiet', windowObj.suiet);
    }
    
    // Try to find any object that might be a wallet
    for (const key of walletRelatedKeys) {
      const obj = windowObj[key];
      if (obj && (obj.connect || obj.getAccounts || obj.signTransaction)) {
        console.log(`Found potential wallet object: ${key}`);
        return createDirectWalletAdapter(key, obj);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error in direct wallet detection:', error);
    return null;
  }
}

// Create a wallet adapter for directly detected wallets
function createDirectWalletAdapter(name: string, walletObj: any): WalletAdapter {
  return {
    name,
    icon: '/sui-logo-3d-glow.svg',
    connected: false,
    connecting: false,
    wallet: walletObj,
    accounts: [],
    address: null,
    
    async connect(): Promise<boolean> {
      try {
        this.connecting = true;
        console.log(`Attempting to connect to ${name} wallet:`, walletObj);
        
        // Try to connect using common methods
        if (walletObj.connect) {
          console.log(`Using connect() method on ${name}`);
          try {
            await walletObj.connect();
            console.log(`Successfully called connect() on ${name}`);
          } catch (connectError) {
            console.error(`Error calling connect() on ${name}:`, connectError);
          }
        } else {
          console.log(`No connect() method found on ${name}`);
        }
        
        // Try to get accounts using multiple methods
        let address = null;
        console.log(`Attempting to get accounts from ${name}`);
        
        // Method 1: Using getAccounts()
        if (walletObj.getAccounts) {
          try {
            console.log(`Using getAccounts() method on ${name}`);
            const accounts = await walletObj.getAccounts();
            console.log(`getAccounts() result:`, accounts);
            if (accounts && accounts.length > 0) {
              address = accounts[0].address || accounts[0];
              console.log(`Found address from getAccounts(): ${address}`);
            }
          } catch (accountsError) {
            console.error(`Error calling getAccounts() on ${name}:`, accountsError);
          }
        }
        
        // Method 2: Using account property
        if (!address && walletObj.account) {
          try {
            console.log(`Checking account property on ${name}:`, walletObj.account);
            address = walletObj.account.address || walletObj.account;
            console.log(`Found address from account property: ${address}`);
          } catch (accountError) {
            console.error(`Error accessing account property on ${name}:`, accountError);
          }
        }
        
        // Method 3: Using getCurrentAccount()
        if (!address && walletObj.getCurrentAccount) {
          try {
            console.log(`Using getCurrentAccount() method on ${name}`);
            const account = await walletObj.getCurrentAccount();
            console.log(`getCurrentAccount() result:`, account);
            if (account) {
              address = account.address || account;
              console.log(`Found address from getCurrentAccount(): ${address}`);
            }
          } catch (getCurrentError) {
            console.error(`Error calling getCurrentAccount() on ${name}:`, getCurrentError);
          }
        }
        
        // Method 4: Using getAddress()
        if (!address && walletObj.getAddress) {
          try {
            console.log(`Using getAddress() method on ${name}`);
            address = await walletObj.getAddress();
            console.log(`getAddress() result: ${address}`);
          } catch (getAddressError) {
            console.error(`Error calling getAddress() on ${name}:`, getAddressError);
          }
        }
        
        if (address) {
          console.log(`Successfully connected to ${name} with address: ${address}`);
          this.address = address;
          this.connected = true;
          return true;
        }
        
        // If we still don't have an address, try a mock address for testing
        // ONLY FOR DEVELOPMENT/TESTING - Remove in production
        if (window.location.hostname === 'localhost') {
          console.log(`Using mock address for ${name} on localhost for testing`);
          const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          this.address = mockAddress;
          this.connected = true;
          return true;
        }
        
        console.error(`Failed to get address from ${name} wallet`);
        return false;
      } catch (error) {
        console.error(`Error connecting to ${name}:`, error);
        
        // For testing on localhost, use a mock address
        if (window.location.hostname === 'localhost') {
          console.log(`Using mock address for ${name} on localhost after error`);
          const mockAddress = '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          this.address = mockAddress;
          this.connected = true;
          return true;
        }
        
        return false;
      } finally {
        this.connecting = false;
      }
    },
    
    async disconnect(): Promise<void> {
      try {
        if (walletObj.disconnect) {
          await walletObj.disconnect();
        }
        
        this.connected = false;
        this.address = null;
      } catch (error) {
        console.error(`Error disconnecting from ${name}:`, error);
      }
    },
    
    async signAndExecuteTransactionBlock(transaction: TransactionBlock): Promise<any> {
      if (!this.connected || !this.address) {
        throw new Error('Wallet not connected');
      }
      
      try {
        // Try common signing methods
        if (walletObj.signAndExecuteTransactionBlock) {
          return await walletObj.signAndExecuteTransactionBlock({
            transactionBlock: transaction,
          });
        }
        
        if (walletObj.signTransaction) {
          const signedTx = await walletObj.signTransaction(transaction);
          return await suiClient.executeTransactionBlock({
            transactionBlock: signedTx.bytes || signedTx,
            signature: signedTx.signature,
          });
        }
        
        throw new Error('Wallet does not support transaction signing');
      } catch (error) {
        console.error('Error signing transaction:', error);
        throw error;
      }
    }
  };
}

// Provide fallback wallet options when detection fails
function getFallbackWallets(): WalletAdapter[] {
  // Try direct detection first
  const directWallet = tryDirectWalletDetection();
  if (directWallet) {
    return [directWallet];
  }
  
  // Common wallet options that might be installed
  const fallbackOptions = [
    { name: 'Sui Wallet', icon: '/sui-logo-3d-glow.svg' },
    { name: 'Ethos Wallet', icon: '/sui-logo-3d-glow.svg' },
    { name: 'Suiet', icon: '/sui-logo-3d-glow.svg' },
    { name: 'Martian Wallet', icon: '/sui-logo-3d-glow.svg' }
  ];
  
  // Create mock adapters for these wallets
  return fallbackOptions.map(option => {
    return {
      name: option.name,
      icon: option.icon,
      connected: false,
      connecting: false,
      wallet: null,
      accounts: [],
      address: null,
      
      // When user tries to connect, guide them to install the wallet
      async connect(): Promise<boolean> {
        alert(`${option.name} is not installed. Please install it from the wallet's official website.`);
        // Open wallet website based on selection
        let url = 'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil';
        if (option.name.toLowerCase().includes('ethos')) {
          url = 'https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli';
        } else if (option.name.toLowerCase().includes('suiet')) {
          url = 'https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd';
        } else if (option.name.toLowerCase().includes('martian')) {
          url = 'https://chrome.google.com/webstore/detail/martian-wallet-aptos-sui/efbglgofoippbgcjepnhiblaibcnclgk';
        }
        window.open(url, '_blank');
        return false;
      },
      
      async disconnect(): Promise<void> {
        // No-op for fallback wallets
      },
      
      async signAndExecuteTransactionBlock(): Promise<any> {
        throw new Error('Wallet not installed');
      }
    };
  });
}

// Check if a wallet address is valid
export const isValidSuiAddress = (address: string): boolean => {
  return address && address.startsWith('0x') && address.length >= 42;
};

// Get wallet balance
export const getWalletBalance = async (address: string): Promise<string> => {
  try {
    // Validate address format before making the request
    if (!address || !isValidSuiAddress(address)) {
      console.warn('Invalid wallet address format for balance check:', address);
      return '0';
    }
    
    const balance = await suiClient.getBalance({
      owner: address,
    });
    
    return balance.totalBalance;
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return '0';
  }
};

// Format wallet balance from MIST to SUI (1 SUI = 10^9 MIST)
export const formatBalance = (balance: string): string => {
  try {
    const balanceInSui = parseInt(balance) / 1000000000;
    return balanceInSui.toFixed(4);
  } catch (error) {
    return '0.0000';
  }
};

// Format wallet address for display
export const formatWalletAddress = (address: string | null): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
