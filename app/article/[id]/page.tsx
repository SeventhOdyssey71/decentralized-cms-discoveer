"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Star } from "lucide-react";
import Header from '@/components/header';
import { useWalrus } from '@/hooks/useWalrus';
import { useContract } from '@/hooks/useContract';
import { toast } from 'sonner';

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
  content: string;
  walrusBlobId?: string;
}

// This would typically come from an API or database
const articles = [
  {
    id: 5,
    title: "Understanding Move Programming Language",
    subtitle: "A deep dive into the programming language that powers Sui blockchain.",
    author: "Alex Chen",
    publication: "Developer Weekly",
    readTime: "12 min read",
    date: "May 5, 2025",
    claps: 156,
    responses: 12,
    image: "https://pbs.twimg.com/media/GsI13EmWwAAcsu4?format=jpg&name=large",
    memberOnly: false,
    content: `
      Move is a safe and secure programming language for Web3. It was originally developed by Facebook's Libra project and is now used by the Sui blockchain.

      Move is designed to be a safe and secure language for Web3. It is a statically typed language, which means that the type of a variable is known at compile time. This helps to prevent errors and makes the code more reliable.

      Move is also a resource-oriented language. This means that resources, such as tokens, are treated as first-class citizens in the language. This makes it easier to write secure code for handling tokens and other assets.

      Move is a powerful and flexible language that is well-suited for developing Web3 applications. It is safe, secure, and easy to learn.
    `,
  },
];

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = Number(params.id);
  const { getArticle } = useWalrus();
  const { likeArticle, isLoading: isLiking } = useContract();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // TODO: Fetch article metadata from blockchain
        // For now, using mock data
        const mockArticle: Article = {
          id: 5,
          title: "Understanding Move Programming Language",
          subtitle: "A deep dive into the programming language that powers Sui blockchain.",
          author: "Alex Chen",
          publication: "Developer Weekly",
          readTime: "12 min read",
          date: "May 5, 2025",
          claps: 156,
          responses: 12,
          image: "https://pbs.twimg.com/media/GsI13EmWwAAcsu4?format=jpg&name=large",
          memberOnly: false,
          content: "",
          walrusBlobId: "mock-blob-id", // This would come from the blockchain
        };

        // Fetch content from Walrus
        if (mockArticle.walrusBlobId) {
          const content = await getArticle(mockArticle.walrusBlobId);
          mockArticle.content = content;
        }

        setArticle(mockArticle);
        setError(null);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to load article content');
        toast.error('Failed to load article content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, getArticle]);

  const handleLike = async () => {
    if (!article) return;
    
    try {
      await likeArticle(article.id);
      setArticle(prev => prev ? { ...prev, claps: prev.claps + 1 } : null);
      toast.success('Article liked successfully!');
    } catch (error) {
      console.error('Error liking article:', error);
      toast.error('Failed to like article');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {error || 'Article not found'}
            </h1>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-6">
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>{article.claps} claps</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <p className="font-medium">{article.author}</p>
                <p className="text-sm text-gray-500">{article.publication}</p>
              </div>
            </div>
            <Button 
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              {isLiking ? 'Liking...' : 'Like Article'}
            </Button>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link href="/dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
          <Button variant="outline" disabled>
            Read Next Article →
          </Button>
        </div>
      </main>
    </div>
  );
}
