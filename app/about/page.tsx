import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-gray-100 rounded-full mx-4 my-4 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="w-6 h-6 bg-gray-400"></div>
            <div className="w-6 h-6 bg-gray-700"></div>
          </div>
          <span className="text-2xl font-bold">Discoveer</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link href="/pages" className="hover:text-gray-600">
            Pages
          </Link>
          <Link href="/create" className="hover:text-gray-600">
            Create
          </Link>
          <Link href="/about" className="hover:text-gray-600 font-medium">
            About
          </Link>
        </nav>

        <Button className="rounded-full bg-black text-white px-6">Get Started</Button>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Discoveer</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Discoveer is a decentralized content management system (CMS) built on Sui blockchain and Walrus technology.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>

          <ul className="space-y-2 list-disc pl-5">
            <li>Fully decentralized architecture with no centralized components</li>
            <li>Content stored as blobs on Walrus</li>
            <li>Permissions and workflows managed by Sui blockchain</li>
            <li>Markdown-based content editing</li>
            <li>Support for rich media uploads</li>
            <li>Role-based access control for authors and admins</li>
            <li>Client-side rendering for all content</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>

          <p>
            Discoveer leverages the power of blockchain technology to create a truly decentralized content management
            system. Content is stored as blobs on Walrus, while permissions and access control are managed by smart
            contracts on the Sui blockchain.
          </p>

          <p>
            When authors create or update content, changes are committed to Walrus and referenced in the blockchain.
            Viewers access content through a client-side application that renders the latest version of each page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Get Involved</h2>

          <p>
            Discoveer is an open project and welcomes contributions from developers, content creators, and blockchain
            enthusiasts. Check out our GitHub repository to learn more about how you can get involved.
          </p>
        </div>
      </div>

      <footer className="py-8 border-t border-gray-200">
        <div className="flex justify-center space-x-12">
          <Link href="https://github.com" className="text-gray-600 hover:text-black dark:text-white dark:hover:text-gray-300">
            Github
          </Link>
          <Link href="/docs" className="text-gray-600 hover:text-black dark:text-white dark:hover:text-gray-300">
            Docs
          </Link>
          <Link href="/socials" className="text-gray-600 hover:text-black dark:text-white dark:hover:text-gray-300">
            Socials
          </Link>
        </div>
      </footer>
    </main>
  )
}
