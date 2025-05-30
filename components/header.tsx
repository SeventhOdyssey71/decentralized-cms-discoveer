"use client";

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, X, ChevronDown, Wallet } from "lucide-react";
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const handleDisconnectClick = () => {
    disconnect();
    // We won't redirect here, the page component will handle redirection if needed after disconnect
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            Discoveer
          </Link>

          {/* Search and other icons */}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>{formatAddress(account.address)}</span>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180 data-[state=closed]:rotate-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={handleDisconnectClick}>
                    Disconnect
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
          {/* Close button removed for shared component */}
          {/* <Button variant="ghost" size="sm" className="absolute right-4 text-black hover:bg-[#7DE0D3]">
            <X className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </header>
  );
} 