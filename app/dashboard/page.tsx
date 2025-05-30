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

const articles = [
  {
    id: 1,
    title: "Creatine is Overrated",
    subtitle: "But that's ok. The supplement's modest benefits are exactly what makes it so great.",
    author: "Brady Holmer",
    publication: "Sharing Science",
    readTime: "8 min read",
    date: "May 10, 2025",
    claps: 417,
    responses: 15,
    image: "/placeholder.svg?height=200&width=300",
    memberOnly: false,
  },
  {
    id: 2,
    title: "This Brutal Quote Shattered My Beliefs About Hard Work",
    subtitle: "These 18 words changed everything.",
    author: "Tom Addison",
    publication: "Change Your Mind Change Your Life",
    readTime: "5 min read",
    date: "May 8, 2025",
    claps: 61,
    responses: 1,
    image: "/placeholder.svg?height=200&width=300",
    memberOnly: false,
  },
  {
    id: 3,
    title: "Gemini 2 For Mac REVIEW—A Smart Solution For Cleaning Up Your Mac—MacSources",
    subtitle: "Effortlessly remove duplicates and free up space with this intuitive tool",
    author: "MacSources",
    publication: "",
    readTime: "6 min read",
    date: "May 7, 2025",
    claps: 23,
    responses: 0,
    image: "/placeholder.svg?height=200&width=300",
    memberOnly: false,
  },
  {
    id: 4,
    title: "The Future of Blockchain Technology",
    subtitle: "Exploring the next generation of decentralized applications and their impact on society.",
    author: "Sarah Johnson",
    publication: "Tech Insights",
    readTime: "15 min read",
    date: "May 6, 2025",
    claps: 189,
    responses: 8,
    image: "/placeholder.svg?height=200&width=300",
    memberOnly: false,
  },
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
    image: "/placeholder.svg?height=200&width=300",
    memberOnly: false,
  },
  {
    id: 6,
    title: "Web3 Security Best Practices",
    subtitle: "Essential security measures every Web3 developer should know.",
    author: "Mike Rodriguez",
    publication: "Security Today",
    readTime: "10 min read",
    date: "May 4, 2025",
    claps: 203,
    responses: 6,
    image: "/placeholder.svg?height=200&width=300",
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
        <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold">
                Discoveer
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-4 mx-auto">
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
              </nav>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search" className="pl-10 w-64 border-gray-300 rounded-full" />
                </div>

                <Link href="/write">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Write
                  </Button>
                </Link>
                {account ? (
                  <div className="relative">
                    <button
                      onClick={handleWalletClick}
                      className="flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                    >
                      <Wallet className="h-4 w-4" />
                      <span>{formatAddress(account.address)}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDisconnectClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/connect-wallet">
                    <Button className="rounded-full bg-black text-white px-6 py-2 flex items-center gap-2 hover:bg-gray-800">
                      {/* Placeholder for Sui Icon if needed */}
                       Connect Wallet
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Walrus Staking Banner */}
          <div className="bg-[#97F0E5] border-b border-[#7DE0D3] px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-center">
              <div className="flex items-center gap-3">
                <img src="/walrus-icon.svg" alt="Walrus" className="w-5 h-5" />
                <span className="text-sm text-black">Walrus staking is live.</span>
                <a
                  href="https://stake-wal.wal.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline text-black"
                >
                  Stake $WAL
                </a>
              </div>
              <Button variant="ghost" size="sm" className="absolute right-4 text-black hover:bg-[#7DE0D3]">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

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
                        <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                          Read Now
                        </Button>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Article of the Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                    <h3 className="font-bold text-lg">Building Decentralized Applications on Sui</h3>
                    <p className="text-sm text-gray-600">
                      A comprehensive guide to developing dApps using the Sui blockchain and Move programming language.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">by Alex Chen</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>12 min read</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>234</span>
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
