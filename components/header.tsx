"use client";

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, X, ChevronDown, Wallet, LogOut, Sun, Moon } from "lucide-react";
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from 'next-themes';

export default function Header() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { theme, setTheme } = useTheme();

  const handleDisconnectClick = () => {
    disconnect();
    // We won't redirect here, the page component will handle redirection if needed after disconnect
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
              href="https://stake-wal.wal.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline text-black dark:text-gray-300 dark:hover:text-white"
            >
              Stake $WAL
            </a>
          </div>
          {/* Close button removed for shared component */}
          {/* <Button variant="ghost" size="sm" className="absolute right-4 text-black hover:bg-[#7DE0D3]">
            <X className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </header>
  );
} 