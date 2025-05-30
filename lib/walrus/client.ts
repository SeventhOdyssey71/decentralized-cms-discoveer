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
  apiKey?: string;
}

interface BlobResponse {
  id: string;
  content: Uint8Array;
}

export class WalrusClient {
  private config: WalrusConfig;

  constructor(config: WalrusConfig) {
    this.config = config;
  }

  // Store a blob in Walrus
  async storeBlob(content: Uint8Array): Promise<string> {
    const response = await fetch(`${this.config.apiUrl}/blobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
      },
      body: content,
    });

    if (!response.ok) {
      throw new Error(`Failed to store blob: ${response.statusText}`);
    }

    const { id } = await response.json();
    return id;
  }

  // Retrieve a blob from Walrus
  async getBlob(id: string): Promise<BlobResponse> {
    const response = await fetch(`${this.config.apiUrl}/blobs/${id}`, {
      headers: {
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get blob: ${response.statusText}`);
    }

    const content = await response.arrayBuffer();
    return {
      id,
      content: new Uint8Array(content),
    };
  }

  // Verify blob availability
  async verifyBlob(id: string): Promise<boolean> {
    const response = await fetch(`${this.config.apiUrl}/blobs/${id}/verify`, {
      headers: {
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to verify blob: ${response.statusText}`);
    }

    const { verified } = await response.json();
    return verified;
  }
} 