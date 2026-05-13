'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  Copy,
  MoreVertical,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react'

export default function PagesList() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages')
      const data = await res.json()
      setPages(data)
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePage = async (slug) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    try {
      await fetch(`/api/pages/${slug}`, { method: 'DELETE' })
      fetchPages()
    } catch (error) {
      console.error('Failed to delete page:', error)
    }
  }

  const duplicatePage = async (page) => {
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...page,
          slug: `${page.slug}-copy`,
          title: `${page.title} (Copy)`
        })
      })
      fetchPages()
    } catch (error) {
      console.error('Failed to duplicate page:', error)
    }
  }

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(search.toLowerCase()) ||
    page.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Pages</h1>
          <p className="text-[#7A8FA6]">Manage your website pages and content.</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Create New Page
        </Link>
      </motion.div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8FA6]" />
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#243447] border border-[#2C3947] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-[#C2A56D] border-t-transparent rounded-full" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#243447] rounded-xl border border-[#2C3947] overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2C3947]">
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase tracking-wider">Page</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase tracking-wider">Slug</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase tracking-wider">Sections</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase tracking-wider">Last Updated</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page, i) => (
                <motion.tr
                  key={page.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-[#2C3947] last:border-0 hover:bg-[#2C3947]/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-[#E8EDF2] font-medium">{page.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-[#7A8FA6] bg-[#2C3947] px-2 py-1 rounded">/{page.slug}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      page.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {page.status === 'published' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#7A8FA6]">{page.sections?.length || 0}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#7A8FA6] text-sm">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        className="p-2 rounded-lg hover:bg-[#2C3947] text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-[#2C3947] text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
                        title="View"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button
                        onClick={() => duplicatePage(page)}
                        className="p-2 rounded-lg hover:bg-[#2C3947] text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={() => deletePage(page.slug)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-[#7A8FA6] hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredPages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-[#7A8FA6]">No pages found.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}