"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Edit, Star, X, Clock, Calendar, ChevronDown, Wallet, Loader2 } from "lucide-react"
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { useSuiClient } from '@mysten/dapp-kit';

interface Article {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  publication: string;
  readTime: string;
  date: string;
  claps: number;
  responses: number;
  image: string;
  memberOnly: boolean;
}

export default function Dashboard() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const router = useRouter();
  const suiClient = useSuiClient();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) {
      router.push("/connect-wallet");
    }
  }, [account, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("Attempting to fetch articles from Sui blockchain...");

        const fetchedArticles: Article[] = [];

        setTimeout(() => {
          setArticles(fetchedArticles);
          setLoading(false);
        }, 2000);

      } catch (error) {
        console.error("Error fetching articles from Sui blockchain:", error);
        setLoading(false);
      }
    };

    if (account && suiClient) {
      fetchArticles();
    }
  }, [account, suiClient]);

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        <div className="flex flex-1 max-w-7xl mx-auto px-4 py-8">
          <div className="flex-1 flex justify-center items-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
                <p className="mt-2 text-gray-600">Loading articles from Sui blockchain...</p>
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <p>Articles will be displayed here.</p>
              </div>
            ) : (
              <p>No articles found on the Sui blockchain.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
