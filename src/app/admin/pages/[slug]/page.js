'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Eye,
  History,
  ChevronDown,
  Loader2
} from 'lucide-react'

import SectionEditor from '@/components/admin/SectionEditor'
import VersionHistory from '@/components/admin/VersionHistory'
import SeoEditor from '@/components/admin/SeoEditor'

const sectionTypes = [
  { type: 'hero', label: 'Hero Section', icon: '🎯' },
  { type: 'text', label: 'Rich Text', icon: '📝' },
  { type: 'card-grid', label: 'Card Grid', icon: '📋' },
  { type: 'stats', label: 'Stats/Metrics', icon: '📊' },
  { type: 'cta', label: 'Call to Action', icon: '🔔' },
]

function PageEditorContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const slug = params?.slug
  
  const [page, setPage] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddSection, setShowAddSection] = useState(false)
  const [activeTab, setActiveTab] = useState('sections')
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (slug) {
      console.log('Fetching page:', slug)
      fetchPage()
    } else {
      setLoading(false)
    }
  }, [slug])

  const fetchPage = async () => {
    try {
      setError(null)
      const res = await fetch(`/api/pages/${slug}`)
      
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed to fetch')
      }
      
      const data = await res.json()
      setPage(data)
      setSections(data.sections || [])
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const savePage = async () => {
    setSaving(true)
    try {
      await fetch(`/api/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...page })
      })
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to save page:', error)
    } finally {
      setSaving(false)
    }
  }

  const addSection = async (type) => {
    const newSection = {
      key: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      orderIndex: sections.length
    }

    try {
      const res = await fetch(`/api/pages/${slug}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSection)
      })
      const created = await res.json()
      setSections([...sections, created])
      setShowAddSection(false)
    } catch (error) {
      console.error('Failed to add section:', error)
    }
  }

  const updateSection = (index, content) => {
    const updated = [...sections]
    updated[index] = { ...updated[index], content }
    setSections(updated)
    setHasChanges(true)
  }

  const deleteSection = async (index) => {
    const section = sections[index]
    if (!confirm('Delete this section?')) return

    try {
      await fetch(`/api/pages/${slug}/sections?id=${section.id}`, {
        method: 'DELETE'
      })
      const updated = sections.filter((_, i) => i !== index)
      setSections(updated)
    } catch (error) {
      console.error('Failed to delete section:', error)
    }
  }

  const getDefaultContent = (type) => {
    const defaults = {
      hero: JSON.stringify({ headline: 'New Section', subheadline: 'Add your content', ctaText: 'Learn More', ctaLink: '/' }),
      text: JSON.stringify({ content: '<p>Enter your text...</p>' }),
      'card-grid': JSON.stringify({ title: 'Cards', cards: [{ icon: 'Star', title: 'Card', desc: 'Desc' }], columns: 3 }),
      stats: JSON.stringify({ items: [{ number: '100+', label: 'Stat' }] }),
      cta: JSON.stringify({ headline: 'Ready?', subheadline: 'Contact us', buttonText: 'Get Started', buttonLink: '/' })
    }
    return defaults[type] || JSON.stringify({})
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin" style={{ color: '#C2A56D' }} size={40} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-red-400 mb-4">{error}</p>
        <Link href="/admin/pages" className="text-[#C2A56D] hover:underline">Back to Pages</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages" className="p-2 rounded-lg bg-[#243447] text-[#7A8FA6] hover:text-[#E8EDF2]">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#E8EDF2]">Edit: {page?.title}</h1>
            <p className="text-sm text-[#7A8FA6]">/ {slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${slug}`} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#243447] text-[#7A8FA6] hover:text-[#E8EDF2]">
            <Eye size={16} /> Preview
          </Link>
          <button onClick={savePage} disabled={saving || !hasChanges}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 disabled:opacity-50">
            <Save size={18} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-[#243447] rounded-xl border border-[#2C3947]">
            <div className="flex border-b border-[#2C3947]">
              <button onClick={() => setActiveTab('sections')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'sections' ? 'text-[#C2A56D] border-b-2' : 'text-[#7A8FA6]'}`}>
                Sections
              </button>
              <button onClick={() => setActiveTab('seo')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'seo' ? 'text-[#C2A56D] border-b-2' : 'text-[#7A8FA6]'}`}>
                SEO
              </button>
              <button onClick={() => setActiveTab('history')} className={`px-6 py-4 text-sm font-medium ${activeTab === 'history' ? 'text-[#C2A56D] border-b-2' : 'text-[#7A8FA6]'}`}>
                <History size={14} className="inline mr-1" /> History
              </button>
            </div>
            <div className="p-6">
              {activeTab === 'sections' && (
                <div className="space-y-4">
                  {sections.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-[#7A8FA6] mb-4">No sections yet</p>
                      <button onClick={() => setShowAddSection(true)} className="px-4 py-2 bg-[#2C3947] rounded-lg">Add Section</button>
                    </div>
                  ) : (
                    sections.map((section, index) => (
                      <SectionEditor key={section.id} section={section} index={index}
                        onUpdate={(content) => updateSection(index, content)} onDelete={() => deleteSection(index)} />
                    ))
                  )}
                  <button onClick={() => setShowAddSection(true)}
                    className="w-full py-4 border-2 border-dashed border-[#2C3947] rounded-lg text-[#7A8FA6] hover:border-[#C2A56D] flex items-center justify-center gap-2">
                    <Plus size={18} /> Add Section
                  </button>
                </div>
              )}
              {activeTab === 'seo' && <SeoEditor page={page} />}
              {activeTab === 'history' && <VersionHistory />}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-[#243447] rounded-xl border border-[#2C3947] p-6 sticky top-6">
            <h3 className="text-sm font-semibold text-[#E8EDF2] mb-4">Page Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#7A8FA6] mb-2">Status</label>
                <select value={page?.status || 'draft'} onChange={(e) => { setPage({ ...page, status: e.target.value }); setHasChanges(true) }}
                  className="w-full px-3 py-2 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2]">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddSection && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#243447] rounded-xl border border-[#2C3947] w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Add Section</h3>
            <div className="grid grid-cols-2 gap-3">
              {sectionTypes.map((st) => (
                <button key={st.type} onClick={() => addSection(st.type)}
                  className="flex items-center gap-3 p-4 bg-[#2C3947] rounded-lg text-left hover:bg-[#3a4a5c]">
                  <span className="text-2xl">{st.icon}</span>
                  <span className="text-sm text-[#E8EDF2]">{st.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAddSection(false)} className="mt-4 w-full py-2 text-[#7A8FA6]">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PageEditor() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24"><Loader2 className="animate-spin" style={{ color: '#C2A56D' }} size={40} /></div>}>
      <PageEditorContent />
    </Suspense>
  )
}