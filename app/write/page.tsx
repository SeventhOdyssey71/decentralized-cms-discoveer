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

    // Convert newlines to paragraphs
    html = html.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');

    return html;
  };

  const handlePublish = () => {
    const formattedContent = convertMarkdownToHtml(content);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || "Untitled Article"}</title>
    <style>
        body { font-family: "Futura", sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8f8f8; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        img { max-width: 100%; height: auto; display: block; margin: 20px auto; }
        h1 { text-align: center; margin-bottom: 20px; }
        .author-info { text-align: center; margin-bottom: 20px; font-size: 0.9em; color: #555; }
        .content { margin-top: 20px; }
        /* Basic prose styling */
        .prose p { margin-bottom: 1em; }
        .prose ul, .prose ol { margin-bottom: 1em; padding-left: 20px; }
        .prose li { margin-bottom: 0.5em; }
        .prose a { color: #007bff; text-decoration: none; }
        .prose a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title || "Untitled Article"}</h1>
        ${featuredImage ? `<img src="${featuredImage}" alt="Featured Image">` : ''}
        <div class="author-info">
            By Your Name {/* Placeholder */}
        </div>
        <div class="content prose">
            ${formattedContent}
        </div>
    </div>
</body>
</html>
    `;

    // TODO: Implement actual publishing to Walrus with htmlContent
    console.log("Generated HTML for publishing:", htmlContent);
    alert("Article HTML generated. Check the console for the output. \n\nPublishing to Walrus is not yet implemented.");
  };

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
                <Button variant="ghost" size="sm" onClick={() => applyFormatting('bold')}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyFormatting('italic')}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyFormatting('strikethrough')}>
                  <Strikethrough className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <Button variant="ghost" size="sm" onClick={() => applyFormatting('bullet')}>
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyFormatting('ordered')}>
                  <ListOrdered className="h-4 w-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <Button variant="ghost" size="sm" onClick={() => applyFormatting('link')}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyFormatting('image')}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => applyFormatting('emoji')}>
                  <Smile className="h-4 w-4" />
                </Button>

                <div className="flex-1"></div>

                <span className="text-sm text-gray-500">{wordCount} words</span>
              </div>

              {/* Featured Image URL Input */}
              <div className="mb-6">
                <Input
                  placeholder="Enter image url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="text-base border-gray-300 rounded-lg placeholder:text-gray-400 focus-visible:ring-0"
                />
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
    </div>
  )
}
