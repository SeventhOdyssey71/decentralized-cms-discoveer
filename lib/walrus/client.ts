import { SuiClient } from '@mysten/sui.js/client';

// Types for Walrus blob operations
export interface WalrusBlob {
  id: string;
  content: Uint8Array;
  size: number;
  createdAt: Date;
}

export interface WalrusConfig {
  apiUrl: string;
  suiClient: SuiClient;
}

export class WalrusClient {
  private config: WalrusConfig;

  constructor(config: WalrusConfig) {
    this.config = config;
  }

  // Store a blob in Walrus
  async storeBlob(content: Uint8Array): Promise<string> {
    try {
      const response = await fetch(`${this.config.apiUrl}/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: content,
      });

      if (!response.ok) {
        throw new Error(`Failed to store blob: ${response.statusText}`);
      }

      const { blobId } = await response.json();
      return blobId;
    } catch (error) {
      console.error('Error storing blob:', error);
      throw error;
    }
  }

  // Retrieve a blob from Walrus
  async getBlob(blobId: string): Promise<WalrusBlob> {
    try {
      const response = await fetch(`${this.config.apiUrl}/retrieve/${blobId}`);

      if (!response.ok) {
        throw new Error(`Failed to retrieve blob: ${response.statusText}`);
      }

      const content = await response.arrayBuffer();
      return {
        id: blobId,
        content: new Uint8Array(content),
        size: content.byteLength,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Error retrieving blob:', error);
      throw error;
    }
  }

  // Verify blob availability
  async verifyBlob(blobId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiUrl}/verify/${blobId}`);

      if (!response.ok) {
        throw new Error(`Failed to verify blob: ${response.statusText}`);
      }

      const { available } = await response.json();
      return available;
    } catch (error) {
      console.error('Error verifying blob:', error);
      throw error;
    }
  }
} 