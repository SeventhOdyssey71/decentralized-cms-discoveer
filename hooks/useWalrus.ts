// import { useMemo } from 'react'; // No longer needed
import { walrusClient } from '@/lib/walrus/client'; // Import the official client instance
// Remove import for custom config
// import { walrusConfig } from '@/lib/walrus/config';
// Remove import for custom client type
// import { WalrusClient } from '@/lib/walrus/client';

export function useWalrus() {
  // const client = useMemo(() => new WalrusClient(walrusConfig), []); // No longer needed

  const getArticle = async (blobId: string): Promise<string> => {
    try {
      // Use the official SDK's readBlob method
      const blob = await walrusClient.readBlob({ blobId });
      const decoder = new TextDecoder();
      return decoder.decode(blob);
    } catch (error) {
      console.error("Error reading blob from Walrus:", error);
      throw error;
    }
  };

  // Writing blobs requires a signer and is not recommended client-side.
  // Placeholder functions for write operations.
  const uploadArticle = async (content: string): Promise<string> => {
    console.warn("Client-side uploadArticle is not supported with the current Walrus SDK setup. Use a backend service or handle signing separately.");
    // In a real implementation using a backend:
    // Send content to backend API that calls walrusClient.writeBlob
    throw new Error("Client-side article upload not supported");
  };

  const uploadImage = async (file: File): Promise<string> => {
     console.warn("Client-side uploadImage is not supported with the current Walrus SDK setup. Use a backend service or handle signing separately.");
    // In a real implementation using a backend:
    // Send file to backend API that calls walrusClient.writeBlob
    throw new Error("Client-side image upload not supported");
  };

  // The official SDK doesn't have a direct 'getContent' method for string, readBlob returns Uint8Array
  // Remove old getContent/getArticle if it's not directly mapping to readBlob
  // const getContent = async (blobId: string): Promise<string> => { ... };

  return {
    getArticle,
    uploadArticle,
    uploadImage,
  };
}

// Remove unused import if necessary
// import { walrusConfig } from '@/lib/walrus/config'; // Remove this import 