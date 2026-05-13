'use client'

import { useState, useEffect } from 'react'
import { Globe, Image, Tag } from 'lucide-react'

export default function SeoEditor({ page }) {
  const [seo, setSeo] = useState({
    metaTitle: page?.seo?.metaTitle || '',
    metaDescription: page?.seo?.metaDescription || '',
    metaKeywords: page?.seo?.metaKeywords || '',
    ogImage: page?.seo?.ogImage || '',
    canonicalUrl: page?.seo?.canonicalUrl || ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (page?.seo) {
      setSeo({
        metaTitle: page.seo.metaTitle || '',
        metaDescription: page.seo.metaDescription || '',
        metaKeywords: page.seo.metaKeywords || '',
        ogImage: page.seo.ogImage || '',
        canonicalUrl: page.seo.canonicalUrl || ''
      })
    }
  }, [page])

  const handleChange = (field, value) => {
    setSeo({ ...seo, [field]: value })
    setSaved(false)
  }

  const saveSeo = async () => {
    if (!page?.slug) return
    setSaving(true)
    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: page.slug,
          ...seo
        })
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('Failed to save SEO:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#2C3947] rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-[#C2A56D]" />
          <h4 className="text-sm font-medium text-[#E8EDF2]">Search Engine Optimization</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#7A8FA6] mb-1.5">Meta Title</label>
            <input
              type="text"
              value={seo.metaTitle || ''}
              onChange={(e) => handleChange('metaTitle', e.target.value)}
              placeholder="Page title for search engines..."
              maxLength={60}
              className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
            />
            <p className="text-xs text-[#7A8FA6] mt-1">
              {(seo.metaTitle || '').length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-xs text-[#7A8FA6] mb-1.5">Meta Description</label>
            <textarea
              value={seo.metaDescription || ''}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              placeholder="Brief description for search results..."
              rows={3}
              maxLength={160}
              className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D] resize-none"
            />
            <p className="text-xs text-[#7A8FA6] mt-1">
              {(seo.metaDescription || '').length}/160 characters
            </p>
          </div>

          <div>
            <label className="block text-xs text-[#7A8FA6] mb-1.5">Meta Keywords</label>
            <input
              type="text"
              value={seo.metaKeywords || ''}
              onChange={(e) => handleChange('metaKeywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3..."
              className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
            />
            <p className="text-xs text-[#7A8FA6] mt-1">Separate keywords with commas</p>
          </div>
        </div>
      </div>

      <div className="bg-[#2C3947] rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Image size={18} className="text-[#C2A56D]" />
          <h4 className="text-sm font-medium text-[#E8EDF2]">Social Media</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#7A8FA6] mb-1.5">OG Image URL</label>
            <input
              type="text"
              value={seo.ogImage || ''}
              onChange={(e) => handleChange('ogImage', e.target.value)}
              placeholder="https://.../og-image.jpg"
              className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
            />
            <p className="text-xs text-[#7A8FA6] mt-1">Recommended size: 1200x630px</p>
          </div>

          <div>
            <label className="block text-xs text-[#7A8FA6] mb-1.5">Canonical URL</label>
            <input
              type="text"
              value={seo.canonicalUrl || ''}
              onChange={(e) => handleChange('canonicalUrl', e.target.value)}
              placeholder="https://.../page"
              className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
            />
          </div>
        </div>
      </div>

      <button
        onClick={saveSeo}
        disabled={saving}
        className="w-full py-2.5 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save SEO'}
      </button>
    </div>
  )
}