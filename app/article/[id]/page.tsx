"use client"

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Star } from "lucide-react";
import Header from '@/components/header';
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
// Using mock data for now after removing Walrus/Contract integration
const articles: Article[] = [
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
   {
    id: 6,
    title: "Exploring the Sui Blockchain",
    subtitle: "A beginner's guide to the Sui network and its key features.",
    author: "Sophia Lee",
    publication: "Blockchain Insights",
    readTime: "10 min read",
    date: "June 10, 2025",
    claps: 210,
    responses: 15,
    image: "https://miro.medium.com/v2/resize:fit:1400/1*K2S3vS6_D4b_J_l8_B8mQA.png", // Placeholder image
    memberOnly: false,
    content: `
      Sui is a high-performance blockchain developed by Mysten Labs. It is designed to power the next generation of Web3 applications.

      One of Sui's key features is its object-centric model, which allows for parallel transaction execution, leading to high throughput and low latency.

      Sui also uses a unique consensus mechanism called Narwhal and Tusk, which contributes to its scalability.

      Developers can build smart contracts on Sui using the Move programming language.
    `,
  },
    {
    id: 7,
    title: "Decentralized Content Management with Walrus and Sui",
    subtitle: "Leveraging decentralized storage and smart contracts for censorship-resistant content platforms.",
    author: "Ethan Roberts",
    publication: "Web3 Innovations",
    readTime: "15 min read",
    date: "July 1, 2025",
    claps: 180,
    responses: 20,
    image: "https://example.com/images/decentralized-cms.png", // Placeholder image
    memberOnly: true,
    content: `
      Decentralized Content Management Systems (dCMS) aim to provide alternatives to traditional centralized platforms.

      By storing content on decentralized storage networks like Walrus and managing permissions/metadata via smart contracts on blockchains like Sui, we can build platforms that are more resistant to censorship and single points of failure.

      This approach ensures that content availability and access control are governed by immutable code and distributed networks.
    `,
  },
];

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = Number(params.id);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localClaps, setLocalClaps] = useState(0);
  const [isLiking, setIsLiking] = useState(false); // Local state for liking simulation

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch article from mock data instead of blockchain/Walrus
        const foundArticle = articles.find(art => art.id === articleId);

        if (foundArticle) {
           setArticle(foundArticle);
           setLocalClaps(foundArticle.claps); // Initialize local claps with mock data
        } else {
           setError('Article not found');
        }

      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to load article content');
        toast.error('Failed to load article content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]); // Dependency array only needs articleId now

  const handleLike = async () => {
    if (!article || isLiking) return;

    setIsLiking(true); // Start simulating liking
    try {
      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful like
      setLocalClaps(prevClaps => prevClaps + 1);
      toast.success('Article liked successfully! (Simulated)');
    } catch (error) {
      console.error('Error simulating liking:', error);
      toast.error('Failed to like article (Simulated)');
    } finally {
      setIsLiking(false); // End simulating liking
    }
  };

  if (isLoading) {
  return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8 dark:bg-gray-700"></div>
            <div className="h-64 bg-gray-200 rounded mb-6 dark:bg-gray-700"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 dark:bg-gray-700"></div>
            </div>
          </div>
        </main>
        </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              {error || 'Article not found'}
            </h1>
            <Link href="/dashboard">
              <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Back to Dashboard</Button>
            </Link>
          </div>
        </main>
              </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-6 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
              ← Back to Dashboard
                      </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 dark:text-white">{article.title}</h1>
          <p className="text-xl text-gray-600 mb-6 dark:text-gray-400">{article.subtitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 dark:text-gray-400">
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
              <span>{localClaps} claps</span> {/* Use localClaps state */}
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

        <div className="prose dark:prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>

        <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div>
                <p className="font-medium dark:text-white">{article.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{article.publication}</p>
              </div>
            </div>
            <Button
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Star className="w-4 h-4" />
              {isLiking ? 'Liking...' : 'Like Article'}
            </Button>
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <Link href="/dashboard">
            <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">← Back to Dashboard</Button>
          </Link>
          <Button variant="outline" disabled className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            Read Next Article →
          </Button>
      </div>
    </main>
    </div>
  );
}
