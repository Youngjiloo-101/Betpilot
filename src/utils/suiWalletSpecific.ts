// Direct Sui Wallet Extension Integration
// This file contains specialized code to directly interact with the Sui Wallet browser extension

import { suiClient } from './walletAdapter';

// Define window with Sui wallet properties
declare global {
  interface Window {
    suiWallet?: any;
    sui?: any;
    SUI?: any;
  }
}

// Check if Sui wallet extension is available
export const isSuiWalletAvailable = (): boolean => {
  try {
    return !!(
      window.suiWallet || 
      (window.sui && window.sui.wallet) || 
      (window.SUI && window.SUI.wallet)
    );
  } catch (error) {
    console.error('Error checking Sui wallet availability:', error);
    return false;
  }
};

// Get the Sui wallet object directly
export const getSuiWalletObject = (): any | null => {
  try {
    // Try different possible locations of the wallet object
    if (window.suiWallet) {
      return window.suiWallet;
    }
    
    if (window.sui && window.sui.wallet) {
      return window.sui.wallet;
    }
    
    if (window.SUI && window.SUI.wallet) {
      return window.SUI.wallet;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting Sui wallet object:', error);
    return null;
  }
};

// Connect to Sui wallet directly
export const connectToSuiWallet = async (): Promise<string | null> => {
  try {
    const wallet = getSuiWalletObject();
    
    if (!wallet) {
      console.error('Sui wallet extension not found');
      return null;
    }
    
    console.log('Found Sui wallet object:', wallet);
    
    // Try different connection methods
    try {
      if (wallet.connect) {
        console.log('Calling wallet.connect()');
        await wallet.connect();
      } else if (wallet.requestPermissions) {
        console.log('Calling wallet.requestPermissions()');
        await wallet.requestPermissions();
      }
    } catch (connectError) {
      console.error('Error connecting to Sui wallet:', connectError);
      // Continue anyway as some wallets don't require explicit connection
    }
    
    // Try different methods to get the address
    let address = null;
    
    // Method 1: getAccounts
    if (wallet.getAccounts) {
      try {
        console.log('Calling wallet.getAccounts()');
        const accounts = await wallet.getAccounts();
        console.log('Accounts:', accounts);
        if (accounts && accounts.length > 0) {
          address = accounts[0].address || accounts[0];
        }
      } catch (error) {
        console.error('Error getting accounts:', error);
      }
    }
    
    // Method 2: getAccount
    if (!address && wallet.getAccount) {
      try {
        console.log('Calling wallet.getAccount()');
        const account = await wallet.getAccount();
        console.log('Account:', account);
        if (account) {
          address = account.address || account;
        }
      } catch (error) {
        console.error('Error getting account:', error);
      }
    }
    
    // Method 3: account property
    if (!address && wallet.account) {
      try {
        console.log('Accessing wallet.account property');
        address = wallet.account.address || wallet.account;
      } catch (error) {
        console.error('Error accessing account property:', error);
      }
    }
    
    // Method 4: getAddress
    if (!address && wallet.getAddress) {
      try {
        console.log('Calling wallet.getAddress()');
        address = await wallet.getAddress();
      } catch (error) {
        console.error('Error getting address:', error);
      }
    }
    
    // Method 5: getCurrentAccount
    if (!address && wallet.getCurrentAccount) {
      try {
        console.log('Calling wallet.getCurrentAccount()');
        const currentAccount = await wallet.getCurrentAccount();
        if (currentAccount) {
          address = currentAccount.address || currentAccount;
        }
      } catch (error) {
        console.error('Error getting current account:', error);
      }
    }
    
    // Method 6: getActiveAddress
    if (!address && wallet.getActiveAddress) {
      try {
        console.log('Calling wallet.getActiveAddress()');
        address = await wallet.getActiveAddress();
      } catch (error) {
        console.error('Error getting active address:', error);
      }
    }
    
    if (address) {
      console.log('Successfully got Sui wallet address:', address);
      return address;
    }
    
    console.error('Failed to get address from Sui wallet');
    return null;
  } catch (error) {
    console.error('Error connecting to Sui wallet:', error);
    return null;
  }
};

// Sign and execute a transaction using Sui wallet
export const signAndExecuteTransaction = async (transaction: any): Promise<any> => {
  try {
    const wallet = getSuiWalletObject();
    
    if (!wallet) {
      throw new Error('Sui wallet extension not found');
    }
    
    // Try different signing methods
    if (wallet.signAndExecuteTransaction) {
      return await wallet.signAndExecuteTransaction(transaction);
    }
    
    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(transaction);
      return await suiClient.executeTransactionBlock({
        transactionBlock: signedTx.bytes || signedTx,
        signature: signedTx.signature,
      });
    }
    
    if (wallet.signAndExecuteTransactionBlock) {
      return await wallet.signAndExecuteTransactionBlock({
        transactionBlock: transaction,
      });
    }
    
    throw new Error('Sui wallet does not support transaction signing');
  } catch (error) {
    console.error('Error signing transaction:', error);
    throw error;
  }
};
