import { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { CONTRACT_CONFIG } from '@/lib/contracts/config';

export function useContract() {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
  const [isLoading, setIsLoading] = useState(false);

  const grantAuthorAccess = async () => {
    if (!currentAccount) throw new Error('No wallet connected');

    const tx = new TransactionBlock();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]); // 1 SUI

    tx.moveCall({
      target: `${CONTRACT_CONFIG.packageId}::decentralized_cms::grant_author_access`,
      arguments: [
        tx.object(CONTRACT_CONFIG.objects.authorizedAuthors),
        coin,
      ],
    });

    return signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
  };

  const createArticle = async (walrusBlobId: string) => {
    if (!currentAccount) throw new Error('No wallet connected');

    const tx = new TransactionBlock();
    const blobIdBytes = Array.from(new TextEncoder().encode(walrusBlobId));

    tx.moveCall({
      target: `${CONTRACT_CONFIG.packageId}::decentralized_cms::create_article`,
      arguments: [
        tx.object(CONTRACT_CONFIG.objects.authorizedAuthors),
        tx.object(CONTRACT_CONFIG.objects.articles),
        tx.pure(blobIdBytes),
      ],
    });

    return signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
  };

  const likeArticle = async (articleId: number): Promise<void> => {
    if (!currentAccount) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      const tx = new TransactionBlock();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(200000000)]); // 0.2 SUI

      tx.moveCall({
        target: `${CONTRACT_CONFIG.packageId}::decentralized_cms::like_article`,
        arguments: [
          tx.object(CONTRACT_CONFIG.objects.articleLikeCounters),
          tx.pure(articleId),
          coin,
        ],
      });

      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
    } catch (error) {
      console.error('Error liking article:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const publishArticle = async (
    title: string,
    content: string,
    imageUrl: string
  ): Promise<void> => {
    if (!currentAccount) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      const tx = new TransactionBlock();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(1000000000)]); // 1 SUI

      tx.moveCall({
        target: `${CONTRACT_CONFIG.packageId}::decentralized_cms::publish_article`,
        arguments: [
          tx.pure(title),
          tx.pure(content),
          tx.pure(imageUrl),
          coin,
        ],
      });

      await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
    } catch (error) {
      console.error('Error publishing article:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    grantAuthorAccess,
    createArticle,
    likeArticle,
    publishArticle,
    isLoading,
  };
} 