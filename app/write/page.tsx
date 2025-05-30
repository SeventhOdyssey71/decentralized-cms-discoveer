"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Smile,
  Eye,
  Upload,
  Save,
  ArrowLeft,
} from "lucide-react"

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [lastSaved, setLastSaved] = useState("Never")

  const handleContentChange = (value: string) => {
    setContent(value)
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    setWordCount(words)
  }

  const handleSave = () => {
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    setLastSaved(now)
  }

  const handlePublish = () => {
    // Handle publish logic
    console.log("Publishing article...")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-black">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Draft • Last saved {lastSaved}</span>
              <Button variant="outline" onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button onClick={handlePublish} className="bg-blue-600 text-white hover:bg-blue-700">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 p-4">
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Articles</h2>

            <div className="space-y-2">
              <div className="flex gap-4 border-b border-gray-200">
                <button className="pb-2 border-b-2 border-black font-medium">Drafts</button>
                <button className="pb-2 text-gray-500">Published</button>
              </div>
            </div>

            <div className="space-y-2">
              <Card className="p-3 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Current Draft</h4>
                    <p className="text-xs text-gray-500">Last saved {lastSaved}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mt-2 line-clamp-2">{title || "Untitled Article"}</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1">
          {!isPreview ? (
            <div className="p-8">
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                <Button variant="ghost" size="sm">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Strikethrough className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ListOrdered className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <Button variant="ghost" size="sm">
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>

                <div className="flex-1"></div>

                <span className="text-sm text-gray-500">{wordCount} words</span>
              </div>

              {/* Featured Image Upload */}
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Click to upload featured image</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Title Input */}
              <Input
                placeholder="Article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-4xl font-bold border-none p-0 mb-6 placeholder:text-gray-300 focus-visible:ring-0"
              />

              {/* Content Editor */}
              <Textarea
                placeholder="Tell your story..."
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[500px] text-lg leading-relaxed border-none p-0 resize-none placeholder:text-gray-300 focus-visible:ring-0"
              />
            </div>
          ) : (
            /* Preview Mode */
            <div className="p-8 max-w-4xl mx-auto">
              {featuredImage && (
                <div className="mb-8">
                  <img
                    src={featuredImage || "/placeholder.svg"}
                    alt="Featured"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <h1 className="text-4xl font-bold mb-6">{title || "Untitled Article"}</h1>

              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Your Name</span>
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">@your.handle</p>
                </div>
              </div>

              <div className="prose max-w-none">
                {content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
