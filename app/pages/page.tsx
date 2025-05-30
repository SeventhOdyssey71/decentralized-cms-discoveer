import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageList } from "@/components/page-list"

export default function Pages() {
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
          <Link href="/pages" className="hover:text-gray-600 font-medium">
            Pages
          </Link>
          <Link href="/create" className="hover:text-gray-600">
            Create
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
        </nav>

        <Button className="rounded-full bg-black text-white px-6">Get Started</Button>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Content Pages</h1>
          <Button className="bg-black text-white">New Page</Button>
        </div>

        <PageList />
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
