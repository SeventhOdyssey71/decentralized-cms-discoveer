"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useWalrus } from "@/hooks/useWalrus"
import { useRouter } from 'next/navigation'
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
import Header from '@/components/header'

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [lastSaved, setLastSaved] = useState("Never")
  const [isPublishing, setIsPublishing] = useState(false)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { uploadArticle } = useWalrus()
  const router = useRouter()

  const handleContentChange = (value: string) => {
    setContent(value)
    const words = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    setWordCount(words)
  }

  const applyFormatting = (format: string) => {
    const textarea = document.querySelector('textarea[placeholder="Tell your story..."]') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newContent = content;
    let cursorPosition = end;

    switch (format) {
      case 'bold':
        newContent = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        cursorPosition = start + 2 + selectedText.length + 2;
        break;
      case 'italic':
        newContent = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        cursorPosition = start + 1 + selectedText.length + 1;
        break;
      case 'bullet':
        newContent = content.substring(0, start) + `- ${selectedText}` + content.substring(end);
        cursorPosition = start + 2 + selectedText.length;
        break;
      case 'ordered':
        newContent = content.substring(0, start) + `1. ${selectedText}` + content.substring(end);
        cursorPosition = start + 3 + selectedText.length;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newContent = content.substring(0, start) + `[${selectedText}](${url})` + content.substring(end);
          cursorPosition = start + 1 + selectedText.length + 1 + url.length + 1;
        }
        break;
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          newContent = content.substring(0, start) + `![${selectedText}](${imageUrl})` + content.substring(end);
          cursorPosition = start + 2 + selectedText.length + 1 + imageUrl.length + 1;
        }
        break;
      case 'emoji':
        const emoji = prompt('Enter emoji:');
        if (emoji) {
          newContent = content.substring(0, start) + emoji + content.substring(end);
          cursorPosition = start + emoji.length;
        }
        break;
      default:
        break;
    }

    setContent(newContent);
    setTimeout(() => {
      textarea.selectionStart = cursorPosition;
      textarea.selectionEnd = cursorPosition;
    }, 0);
  }

  const handleSave = () => {
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    setLastSaved(now)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For now, just set the featuredImage state to the file name
      // In a real implementation, you would upload the file to Walrus
      console.log("Selected file:", file.name);
      // You might want to display a preview of the image here
      // For now, we'll just use the URL input or a placeholder in the preview
      // setFeaturedImage(URL.createObjectURL(file)); // Example: create a local URL for preview
    }
  };

  const convertMarkdownToHtml = (markdown: string) => {
    let html = markdown;

    // Convert bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic (*text*)
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert unordered lists (- item)
    // This is a simple conversion and might need refinement for multi-line items and nested lists
    html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
    if (html.includes('<li>')) {
      html = '<ul>' + html + '</ul>';
    }

    // Convert ordered lists (1. item)
    // Simple conversion
    html = html.replace(/^\d\. (.*)$/gm, '<li>$1</li>');
     if (html.includes('<li>')) {
      html = '<ul>' + html + '</ul>'; // Using ul for simplicity for now
    }

    // Convert links ([text](url))
    html = html.replace(/\[(.*?)\]\\((.*?)\\)/g, '<a href="$2">$1</a>');

    // Convert images (![alt](url))
    html = html.replace(/!\[(.*?)\]\\((.*?)\\)/g, '<img src="$2" alt="$1" />');

    // Convert newlines to paragraphs (handle multiple newlines)
    html = html.split(/\n\n+/).map(paragraph => `<p>${paragraph}</p>`).join('\n');

    return html;
  };

  const handlePublish = async () => {
    if (!uploadArticle) {
      console.error("Hooks not initialized yet.");
      return;
    }
    setIsPublishing(true);
    try {
      const htmlContent = convertMarkdownToHtml(content)
      const walrusBlobId = await uploadArticle(htmlContent)
      console.log("Article published successfully! (Metadata not published to contract)")
      // Redirect to dashboard or article page
      router.push('/dashboard')
    } catch (error) {
      console.error("Error publishing article:", error)
      alert("Failed to publish article. See console for details.")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {mounted && (
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
                <div className="flex-1"></div>

                <span className="text-sm text-gray-500">{wordCount} words</span>
                  {!isPreview && (
                    <Button variant="outline" onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2 rounded-full">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  )}
                  {isPreview && (
                    <Button variant="outline" onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2 rounded-full">
                      <Eye className="h-4 w-4" />
                      Hide Preview
                    </Button>
                  )}
                  <Button onClick={handlePublish} disabled={isPublishing} className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                    {isPublishing ? "Publishing..." : "Publish"}
                  </Button>
              </div>

                {/* Featured Image Input */}
                <div className="mb-6 space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="featured-image-url"
                      placeholder="Enter image url (optional)"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="flex-1 text-base border-gray-300 rounded-lg placeholder:text-gray-400 focus-visible:ring-0"
                    />
                    <span className="text-gray-500">or</span>
                    <Input
                      id="featured-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-auto text-sm"
                    />
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

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }}></div>
              </div>
            )}
              </div>
            </div>
          )}
    </div>
  )
}
