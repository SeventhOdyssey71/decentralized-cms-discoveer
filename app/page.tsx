"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CircleIllustration } from "@/components/circle-illustration"
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useRouter } from 'next/navigation';

export default function Home() {
  const account = useCurrentAccount();
  const router = useRouter();

  const handleDiscoveerClick = () => {
    if (account) {
      router.push('/dashboard');
    } else {
      router.push('/connect-wallet');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center grid-background">
      {/* Header */}
      <header className="w-full max-w-screen-xl sticky top-4 z-10 bg-[#97F0E5] rounded-full mx-auto px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {/* Placeholder for logo/icon */}
          <div className="flex flex-col">
            <div className="w-4 h-4 bg-gray-600"></div>
            <div className="w-4 h-4 bg-gray-800"></div>
          </div>
          <span className="font-bold text-black font-ppneuebit text-75px leading-none">
            Discoveer
          </span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-700 text-black text-base">
              Home
            </Link>
            <Link href="/pages" className="hover:text-gray-700 text-black text-base">
              Pages
            </Link>
            <Link href="/create" className="hover:text-gray-700 text-black text-base">
              Create
            </Link>
            <Link href="/about" className="hover:text-gray-700 text-black text-base">
              About
            </Link>
          </nav>

          <Button className="rounded-full bg-black text-white px-6 py-2 text-sm hover:bg-gray-800">Get Started</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <CircleIllustration />

        {/* Heading */}
        <h1 className="mt-16 text-center font-ppneuebit text-128px leading-[0.9]">
          Create, Connect, Explore
        </h1>

        {/* Subtitle */}
        <p className="text-center max-w-2xl mt-6 text-gray-700 text-lg leading-relaxed dark:text-white">
          Decentralized content management powered by Sui blockchain and Walrus. Create and update content with no
          centralized components.
        </p>

        {/* Discover Now Button */}
        <Button
          className="mt-10 rounded-full bg-black text-white px-10 py-6 flex items-center gap-2 text-lg hover:bg-black discover-button-hover"
          onClick={handleDiscoveerClick}
        >
          Discoveer now
          <span className="ml-1">▶</span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 mt-auto">
        <div className="flex justify-center space-x-12 text-sm text-gray-600">
          <Link href="https://github.com" className="hover:text-black dark:text-white dark:hover:text-gray-300">
            Github
          </Link>
          <Link href="/docs" className="hover:text-black dark:text-white dark:hover:text-gray-300">
            Docs
          </Link>
          <Link href="/socials" className="hover:text-black dark:text-white dark:hover:text-gray-300">
            Socials
          </Link>
        </div>
      </footer>
    </main>
  )
}
