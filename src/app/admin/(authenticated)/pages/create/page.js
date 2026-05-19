'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', slug: '', path: '' })

  function generateSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'title' && !form.slug) {
      const slug = generateSlug(value)
      setForm({ ...form, title: value, slug, path: `/${slug}` })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  function handleSlugChange(e) {
    const slug = e.target.value
    setForm({ ...form, slug, path: `/${slug}` })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, slug: form.slug, path: form.path })
      })
      if (res.ok) {
        router.push('/admin/pages')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create page')
      }
    } catch (e) {
      setError('Connection error')
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Create New Page</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Add a custom page to your website</p>
        </div>
        <a href="/admin/pages" style={{ padding: '12px 20px', background: '#E8EDF2', color: '#374151', borderRadius: '10px', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>Back to Pages</a>
      </div>

      <div style={{ maxWidth: '600px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Page Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Our Team" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>URL Slug *</label>
            <input type="text" name="slug" value={form.slug} onChange={handleSlugChange} required placeholder="our-team" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '6px' }}>URL: /{form.slug || 'slug'}</p>
          </div>

          {error && (
            <div style={{ padding: '14px 16px', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626', fontSize: '14px', marginBottom: '20px' }}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#C2A56D', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating...' : 'Create Page'}
          </button>
        </form>
      </div>
    </div>
  )
}