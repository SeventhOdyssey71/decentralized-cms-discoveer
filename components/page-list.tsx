"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Edit2, Trash2 } from "lucide-react"

type Page = {
  id: string
  title: string
  updatedAt: string
  author: string
}

export function PageList() {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", title: "Welcome to Discoveer", updatedAt: "2025-05-28", author: "admin" },
    { id: "2", title: "Getting Started with Sui", updatedAt: "2025-05-27", author: "john" },
    { id: "3", title: "How to Use Walrus Sites", updatedAt: "2025-05-26", author: "sarah" },
  ])

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pages.map((page) => (
            <tr key={page.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <Link href={`/pages/${page.id}`} className="text-sm font-medium text-gray-900 hover:underline">
                    {page.title}
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.updatedAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.author}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
