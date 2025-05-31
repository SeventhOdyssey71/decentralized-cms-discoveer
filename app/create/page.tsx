"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export default function CreatePage() {
  const router = useRouter()
  // const { createArticle } = useContract()
  // const { uploadArticle } = useWalrus()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPublishing(true)

    try {
      // First, store the article content in Walrus
      // const walrusBlobId = await uploadArticle(content)
      
      // Then, create the article on-chain
      // await createArticle(walrusBlobId)
      
      // toast.success("Article published successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error publishing article:", error)
      // toast.error("Failed to publish article. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }

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
          <Link href="/create" className="hover:text-gray-600 font-medium">
            Create
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
        </nav>

        <Button className="rounded-full bg-black text-white px-6">Get Started</Button>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Page</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="rounded-full"
              >
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-full bg-black text-white"
                disabled={isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish Page"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            {isPreview ? (
              <div className="prose max-w-none dark:text-white">
                <p>{content}</p>
              </div>
            ) : (
              <Textarea
                placeholder="Article Content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] text-lg leading-relaxed border rounded-md p-4 resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
              />
            )}
          </div>
        </form>
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
