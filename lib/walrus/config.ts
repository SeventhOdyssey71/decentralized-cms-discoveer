import { SuiClient } from '@mysten/sui.js/client';
import { WalrusConfig } from './client';

// Get the Walrus API URL from environment variables
const WALRUS_API_URL = process.env.NEXT_PUBLIC_WALRUS_API_URL || 'https://api.wal.app';

// Create a Sui client instance
const suiClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_RPC_URL || 'https://fullnode.testnet.sui.io',
});

// Export the Walrus configuration
export const walrusConfig: WalrusConfig = {
  apiUrl: WALRUS_API_URL,
  suiClient,
}; 