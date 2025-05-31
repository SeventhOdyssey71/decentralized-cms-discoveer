"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useConnectWallet, useWallets, useCurrentAccount } from '@mysten/dapp-kit';
import Link from "next/link"

export default function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()
  const wallets = useWallets();
  const { mutate: connect, isPending, isSuccess } = useConnectWallet();
  const account = useCurrentAccount();

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (account) {
      router.push("/dashboard");
    }
  }, [account, router]);

  // Redirect to dashboard on successful connection
  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess, router]);

  const handleWalletConnect = async () => {
    // We will try to connect to the first available wallet for simplicity
    if (wallets.length > 0) {
      setIsConnecting(true);
      // The connect mutation handles setting isPending and isSuccess
      connect({ wallet: wallets[0] });
    } else {
      console.warn("No wallets found. Please install a Sui wallet extension.");
      
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center grid-background px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Animated Walrus Character */}
        <div className="flex justify-center mb-8">
          <div className="relative animate-bounce-walrus">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#97F0E5] to-[#7DE0D3] p-1 shadow-2xl shadow-[#97F0E5]/50">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="/walrus-character-connect.png"
                  alt="Walrus"
                  className="w-28 h-28 object-contain rounded-full"
                />
              </div>
            </div>
            {/* Neon glow effect */}
            <div className="absolute inset-0 rounded-full bg-[#97F0E5] opacity-40 blur-2xl animate-pulse-glow"></div>
            <div className="absolute inset-0 rounded-full bg-[#97F0E5] opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Connect Your Wallet</h1>
     
        </div>

        {/* Connect Button */}
        <Button
          onClick={handleWalletConnect}
          disabled={isPending}
          className="max-w-sm mx-auto py-6 text-lg rounded-full bg-black text-white hover:bg-gray-800 discover-button-hover"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Connecting...
            </div>
          ) : (
            "Connect Wallet"
          )}
        </Button>


        {/* Back to Landing Link */}
        <div className="mt-8">
          <Link href="/" className="text-gray-600 hover:text-black underline dark:text-white dark:hover:text-gray-300">
            Return to Landing Page
          </Link>
        </div>
      </div>
    </main>
  )
}
