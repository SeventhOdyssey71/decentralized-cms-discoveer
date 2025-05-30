import { useMemo } from 'react';
import { WalrusClient } from '@/lib/walrus/client';
import { walrusConfig } from '@/lib/walrus/config';

export function useWalrus() {
  const client = useMemo(() => new WalrusClient(walrusConfig), []);

  const storeArticle = async (content: string): Promise<string> => {
    const encoder = new TextEncoder();
    const contentBytes = encoder.encode(content);
    return client.storeBlob(contentBytes);
  };

  const getArticle = async (blobId: string): Promise<string> => {
    const blob = await client.getBlob(blobId);
    const decoder = new TextDecoder();
    return decoder.decode(blob.content);
  };

  const verifyArticle = async (blobId: string): Promise<boolean> => {
    return client.verifyBlob(blobId);
  };

  return {
    storeArticle,
    getArticle,
    verifyArticle,
  };
} 