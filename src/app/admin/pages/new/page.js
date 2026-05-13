'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData({ title: value, slug })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title || !formData.slug) {
      setError('Title and slug are required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create page')
      }

      const page = await res.json()
      router.push(`/admin/pages/${page.slug}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/pages"
          className="p-2 rounded-lg bg-[#243447] text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#E8EDF2]">Create New Page</h1>
          <p className="text-sm text-[#7A8FA6]">Add a new page to your website</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-[#243447] rounded-xl border border-[#2C3947] p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Page Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter page title..."
            className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#E8EDF2] mb-2">URL Slug</label>
          <div className="flex items-center gap-2">
            <span className="text-[#7A8FA6] text-sm">/</span>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="page-url-slug"
              className="flex-1 px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
            />
          </div>
          <p className="text-xs text-[#7A8FA6] mt-2">The URL will be: /{formData.slug || 'your-slug'}</p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Link
            href="/admin/pages"
            className="px-6 py-3 rounded-lg text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Page
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  )
}