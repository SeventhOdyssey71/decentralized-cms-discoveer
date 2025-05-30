"use client"

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Star } from "lucide-react";
import Header from '@/components/header';

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
  const articleId = Number(params.id);
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Walrus Staking Banner */}
      {/* Moved to Header component */}

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
            <p className="text-gray-600 text-lg">{article.subtitle}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="prose max-w-none">
                {article.content}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{article.claps}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link href="/dashboard">
            <Button variant="outline">
              &larr; Back to Dashboard
            </Button>
          </Link>
          {/* Placeholder for Read Next Article - functionality to be added */}
          <Button variant="outline" disabled>
            Read Next Article &rarr;
          </Button>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Discoveer
            </Link>
            {/* Removed navigation links from header */}
            {/* <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-black">
                Home
              </Link>
              <Link href="/pages" className="text-gray-600 hover:text-black">
                Pages
              </Link>
              <Link href="/create" className="text-gray-600 hover:text-black">
                Create
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-black">
                About
              </Link>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
