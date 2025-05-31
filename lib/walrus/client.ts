import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { WalrusClient, RetryableWalrusClientError } from '@mysten/walrus';
// Import WASM bindings URL for client-side apps
import walrusWasmUrl from '@mysten/walrus-wasm/web/walrus_wasm_bg.wasm?url';

// Create a Sui client instance (can be shared or created here)
const suiClient = new SuiClient({
	url: process.env.NEXT_PUBLIC_SUI_RPC_URL || getFullnodeUrl('testnet'), // Use env var or testnet
});

// Create an instance of the official WalrusClient
export const walrusClient = new WalrusClient({
	network: 'testnet', // Or derive from env var
	suiClient,
  // Pass WASM URL for client-side bundles
  wasmUrl: walrusWasmUrl,
  // Optional: configure fetch options, error handling, etc. as needed
  // storageNodeClientOptions: {
  //   fetch: (url, options) => { ... },
  //   onError: (error) => console.log(error),
  //   timeout: 60_000,
  // },
}); 