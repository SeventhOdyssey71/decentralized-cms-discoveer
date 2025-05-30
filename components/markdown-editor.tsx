"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ImageIcon, LinkIcon } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end)
    onChange(newText)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const handleImageUpload = () => {
    // In a real implementation, this would upload to Walrus
    const imageUrl = prompt("Enter image URL or upload:")
    if (imageUrl) {
      insertMarkdown(`![Image](${imageUrl})`, "")
    }
  }

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="write">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <TabsList>
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")}>
              <Bold className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")}>
              <Italic className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("- ")}>
              <List className="h-4 w-4" />
              <span className="sr-only">List</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleImageUpload}>
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Image</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown("[", "](url)")}>
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
          </div>
        </div>

        <TabsContent value="write" className="p-0 m-0">
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your content in Markdown..."
            className="min-h-[300px] border-0 focus-visible:ring-0 rounded-none"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 prose max-w-none">
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(value) }} />
          ) : (
            <p className="text-gray-400">Nothing to preview</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simple markdown converter for preview (in a real app, use a proper markdown library)
function simpleMarkdownToHtml(markdown: string): string {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')
    .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img alt="$1" src="$2" />')
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^- (.*?)$/gm, "<li>$1</li>")
    .split("\n\n")
    .join("<br />")
}
