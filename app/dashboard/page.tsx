"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Edit, Star, X, Clock, Calendar, ChevronDown, Wallet } from "lucide-react"
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';

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
    image: "/placeholder.svg",
    memberOnly: false,
  },
]

export default function Dashboard() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Redirect if no account is connected
  useEffect(() => {
    if (!account) {
      router.push("/connect-wallet");
    }
  }, [account, router]);

  const handleWalletClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDisconnectClick = () => {
    disconnect();
    setIsDropdownOpen(false); // Close dropdown after disconnecting
    router.push('/'); // Redirect to landing page
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex max-w-7xl mx-auto">
          {/* Articles Section - Scrollable */}
          <div className="flex-1 px-4 py-8 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg line-clamp-2 hover:text-blue-600 transition-colors">
                        <Link href={`/article/${article.id}`}>{article.title}</Link>
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3">{article.subtitle}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-2">
                        <Link href={`/article/${article.id}`}>
                          <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                            Read Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - Fixed/Static */}
          <div className="w-80 px-4 py-8 border-l border-gray-200 sticky top-[120px] h-[calc(100vh-120px)] overflow-hidden">
            <div className="space-y-8">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Article of the Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full h-32 rounded-lg overflow-hidden">
                      <img
                        src={articles[0].image || "/placeholder.svg"}
                        alt={articles[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg"><Link href={`/article/${articles[0].id}`}>{articles[0].title}</Link></h3>
                    <p className="text-sm text-gray-600">
                      {articles[0].subtitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">by {articles[0].author} in {articles[0].publication}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{articles[0].readTime}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{articles[0].claps}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
