import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CircleIllustration } from "@/components/circle-illustration"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-[#97F0E5] rounded-full mx-4 my-4 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="w-6 h-6 bg-gray-400"></div>
            <div className="w-6 h-6 bg-gray-700"></div>
          </div>
          <span className="text-2xl font-bold text-black">Discoveer</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-gray-700 text-black">
            Home
          </Link>
          <Link href="/pages" className="hover:text-gray-700 text-black">
            Pages
          </Link>
          <Link href="/create" className="hover:text-gray-700 text-black">
            Create
          </Link>
          <Link href="/about" className="hover:text-gray-700 text-black">
            About
          </Link>
        </nav>

        <Button className="rounded-full bg-black text-white px-6 hover:bg-gray-800">Get Started</Button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <CircleIllustration />

        <h1 className="text-5xl font-bold mt-8 text-center">Create, Connect, Explore</h1>

        <p className="text-center max-w-2xl mt-4 text-gray-700 text-lg leading-relaxed">
          Decentralized content management powered by Sui blockchain and Walrus. Create and update content with no
          centralized components.
        </p>

        <Link href="/connect-wallet">
          <Button className="mt-8 rounded-full bg-black text-white px-8 py-6 flex items-center gap-2 hover:bg-black">
            Discoveer now
            <span className="ml-1">▶</span>
          </Button>
        </Link>
      </div>

      <footer className="py-8 border-t border-gray-200">
        <div className="flex justify-center space-x-12">
          <Link href="https://github.com" className="text-gray-600 hover:text-black">
            Github
          </Link>
          <Link href="/docs" className="text-gray-600 hover:text-black">
            Docs
          </Link>
          <Link href="/socials" className="text-gray-600 hover:text-black">
            Socials
          </Link>
        </div>
      </footer>
    </main>
  )
}
