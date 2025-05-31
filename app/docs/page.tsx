"use client";

import Link from "next/link";
import { useTheme } from 'next-themes';
import { Sun, Moon, Search, ChevronDown, Wallet, LogOut, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';

// Note: This header is duplicated for demonstration. In a real app, you'd use a shared Header component.
function DocsHeader() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { theme, setTheme } = useTheme();

  const handleDisconnectClick = () => {
    disconnect();
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-10 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold dark:text-white">
            Discoveer
          </Link>

          {/* Search and other icons */}
          <div className="flex items-center gap-4">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search" className="pl-10 w-64 border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white placeholder-gray-400" />
            </div>

            <Link href="/write">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 dark:text-gray-300 dark:hover:bg-gray-800">
                <Edit className="h-4 w-4" />
                Write
              </Button>
            </Link>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full px-2 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {account ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>{formatAddress(account.address)}</span>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180 data-[state=closed]:rotate-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 dark:bg-gray-800 dark:border-gray-700">
                  <DropdownMenuItem onClick={handleDisconnectClick} className="text-red-500 flex items-center justify-between dark:text-red-400 dark:hover:bg-gray-700">
                    Disconnect
                    <LogOut className="h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/connect-wallet">
                <Button className="rounded-full bg-black text-white px-6 py-2 flex items-center gap-2 hover:bg-gray-800">
                   Connect Wallet
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

       {/* Walrus Staking Banner */}
       <div className="bg-[#97F0E5] border-b border-[#7DE0D3] px-4 py-2 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-3">
            <img src="/walrus-icon.svg" alt="Walrus" className="w-5 h-5" />
            <span className="text-sm text-black dark:text-gray-300">Walrus staking is live.</span>
            <a
              href="https://stake-walrus.wal.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline text-black dark:text-gray-300 dark:hover:text-white"
            >
              Stake $WAL
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function DocsPage() {
  const { theme } = useTheme(); // Use useTheme hook

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <DocsHeader /> {/* Use the duplicated header for now */}

      <div className="container mx-auto flex flex-col md:flex-row py-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 lg:w-80 md:pr-8 mb-8 md:mb-0">
          <nav className="space-y-2">
            {/* Placeholder Nav Items */}
            <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              Discoveer
            </div>
             <div className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              Overview
            </div>
            {/* Add other navigation links as needed */}
          </nav>

          {/* Powered by GitBook */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            Powered by GitBook
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 prose dark:prose-invert max-w-none">
          <h1>Decentralized Content Management System (CMS)</h1>

          <h2>Overview</h2>
          <p className="dark:text-white">
            Collaborative content creation like wikis and content management systems (CMS) have been popular for groups to create and update content on websites. This project, <strong>Discoveer</strong>, aims to leverage Sui and Walrus, including Walrus Sites to re-create a decentralized CMS.
          </p>
          <p className="dark:text-white">
            The decentralized CMS should allow groups of users to update web pages that are displayed as a Walrus Site. The content of the web-pages resides as blobs on Walrus which may be updated. Permissions and workflows to allow updates are managed by a simple access control system on the Sui blockchain.
          </p>
          <p className="dark:text-white">
            The resulting decentralized CMS should rely on no centralized components: its backend should only be a Sui smart contract and state on the Sui blockchain, combined with blobs on Walrus for content, and a UX hosted on Walrus Sites.
          </p>

          <h2>Desirable Features</h2>
          <ul>
            <li>Admins can make a list of authors that can update content pages.</li>
            <li>Authorized authors can change the content of pages, using markdown or another suitable authoring tool.</li>
            <li>Authorized authors can upload rich media and use it as part of content.</li>
            <li>Content pages are rendered and displayed as Walrus Sites to viewers, and are refreshed when updated.</li>
            <li>Rendering is always client side either at the point of content authoring or viewing.</li>
            <li>All interactions of users, authors, views happen through a web UX rendered as a Walrus Site.</li>
            <li>No centralized backend-components are used.</li>
            <li>An integration with an established template engine to render brand conforming Sites is highly desired.</li>
          </ul>

          {/* Placeholder for other sections */}

        </main>

        {/* Right Sidebar / Table of Contents (Placeholder) */}
        <aside className="hidden lg:block w-64 lg:pl-8">
          <nav className="sticky top-20 space-y-2 text-sm">
            <div className="font-bold">On this page</div>
            {/* Placeholder TOC Items */}
            <div className="text-gray-600 dark:text-gray-400">Overview</div>
            <div className="text-gray-600 dark:text-gray-400">Desirable Features</div>
            {/* Add more TOC items based on main content headings */}
          </nav>
        </aside>
      </div>

      {/* Bottom Right Icons (Placeholder) */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-4">
        {/* Theme Toggle is already in the header, but placing placeholders here based on screenshot */}
        {/* The actual theme toggle in header controls the theme */}
        <span className="text-gray-500 dark:text-gray-400">Theme Icons Placeholder</span>
      </div>

    </div>
  );
} 