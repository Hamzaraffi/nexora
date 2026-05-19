'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero', icon: '🏠' },
  { value: 'features', label: 'Features', icon: '⭐' },
  { value: 'stats', label: 'Stats', icon: '📊' },
  { value: 'services', label: 'Services', icon: '🔧' },
  { value: 'team', label: 'Team', icon: '👥' },
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'cta', label: 'CTA', icon: '🎯' },
  { value: 'gallery', label: 'Gallery', icon: '🖼️' },
  { value: 'contact', label: 'Contact Info', icon: '📬' },
]

function defaultContent(type) {
  switch (type) {
    case 'hero': return { headline: '', subheadline: '', ctaText: 'Get Started', ctaLink: '/#contact' }
    case 'features': return { items: [{ title: '', description: '' }] }
    case 'stats': return { items: [{ number: '', label: '' }] }
    case 'services': return { items: [{ title: '', description: '', features: [] }] }
    case 'team': return { items: [{ name: '', role: '', bio: '' }] }
    case 'text': return { body: '' }
    case 'cta': return { headline: '', buttonText: 'Learn More', buttonLink: '/#contact' }
    case 'gallery': return { images: [] }
    case 'contact': return { email: '', phone: '', address: '' }
    default: return {}
  }
}

function HeroEditor({ content, onChange }) {
  const c = content || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" value={c.headline || ''} onChange={e => onChange('content', { ...c, headline: e.target.value })} placeholder="Headline" style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', boxSizing: 'border-box' }} />
      <textarea value={c.subheadline || ''} onChange={e => onChange('content', { ...c, subheadline: e.target.value })} placeholder="Subheadline" rows={3} style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <input type="text" value={c.ctaText || ''} onChange={e => onChange('content', { ...c, ctaText: e.target.value })} placeholder="CTA Button Text" style={{ padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
        <input type="text" value={c.ctaLink || ''} onChange={e => onChange('content', { ...c, ctaLink: e.target.value })} placeholder="CTA Link (e.g. /#contact)" style={{ padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
      </div>
    </div>
  )
}

function FeaturesEditor({ content, onChange }) {
  const c = content || { items: [] }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(c.items || []).map((item, i) => (
        <div key={i} style={{ padding: '16px', background: '#F9FAFB', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', fontSize: '13px', color: '#374151' }}>Feature #{i + 1}</span>
            <button onClick={() => onChange('content', { ...c, items: c.items.filter((_, idx) => idx !== i) })} style={{ padding: '4px 8px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
          </div>
          <input type="text" value={item.title || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], title: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Feature title" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', marginBottom: '8px', boxSizing: 'border-box' }} />
          <textarea value={item.description || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], description: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Feature description" rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>
      ))}
      <button onClick={() => onChange('content', { ...c, items: [...(c.items || []), { title: '', description: '' }] })} style={{ padding: '10px', background: '#F3F4F6', border: '2px dashed #D1D5DB', borderRadius: '8px', cursor: 'pointer', color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>+ Add Feature</button>
    </div>
  )
}

function StatsEditor({ content, onChange }) {
  const c = content || { items: [] }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {(c.items || []).map((item, i) => (
          <div key={i} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600', fontSize: '12px', color: '#374151' }}>#{i + 1}</span>
              <button onClick={() => onChange('content', { ...c, items: c.items.filter((_, idx) => idx !== i) })} style={{ padding: '2px 6px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>×</button>
            </div>
            <input type="text" value={item.number || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], number: e.target.value }; onChange('content', { ...c, items }) }} placeholder="e.g. 500+" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', marginBottom: '6px', boxSizing: 'border-box' }} />
            <input type="text" value={item.label || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], label: e.target.value }; onChange('content', { ...c, items }) }} placeholder="e.g. Projects Done" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>
      <button onClick={() => onChange('content', { ...c, items: [...(c.items || []), { number: '', label: '' }] })} style={{ padding: '10px', background: '#F3F4F6', border: '2px dashed #D1D5DB', borderRadius: '8px', cursor: 'pointer', color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>+ Add Stat</button>
    </div>
  )
}

function ServicesEditor({ content, onChange }) {
  const c = content || { items: [] }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(c.items || []).map((item, i) => (
        <div key={i} style={{ padding: '16px', background: '#F9FAFB', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', fontSize: '13px', color: '#374151' }}>Service #{i + 1}</span>
            <button onClick={() => onChange('content', { ...c, items: c.items.filter((_, idx) => idx !== i) })} style={{ padding: '4px 8px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
          </div>
          <input type="text" value={item.title || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], title: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Service title" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', marginBottom: '8px', boxSizing: 'border-box' }} />
          <textarea value={item.description || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], description: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Service description" rows={2} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', marginBottom: '8px', boxSizing: 'border-box' }} />
          <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', marginBottom: '6px' }}>Features (comma separated):</div>
          <input type="text" value={(item.features || []).join(', ')} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) }; onChange('content', { ...c, items }) }} placeholder="Feature 1, Feature 2, Feature 3" style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
        </div>
      ))}
      <button onClick={() => onChange('content', { ...c, items: [...(c.items || []), { title: '', description: '', features: [] }] })} style={{ padding: '10px', background: '#F3F4F6', border: '2px dashed #D1D5DB', borderRadius: '8px', cursor: 'pointer', color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>+ Add Service</button>
    </div>
  )
}

function TeamEditor({ content, onChange }) {
  const c = content || { items: [] }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {(c.items || []).map((item, i) => (
          <div key={i} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '600', fontSize: '12px', color: '#374151' }}>#{i + 1}</span>
              <button onClick={() => onChange('content', { ...c, items: c.items.filter((_, idx) => idx !== i) })} style={{ padding: '2px 6px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>×</button>
            </div>
            <input type="text" value={item.name || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], name: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Name" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', marginBottom: '6px', boxSizing: 'border-box' }} />
            <input type="text" value={item.role || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], role: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Role" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', marginBottom: '6px', boxSizing: 'border-box' }} />
            <input type="text" value={item.initials || ''} onChange={e => { const items = [...c.items]; items[i] = { ...items[i], initials: e.target.value }; onChange('content', { ...c, items }) }} placeholder="Initials (e.g. SJ)" style={{ width: '100%', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>
      <button onClick={() => onChange('content', { ...c, items: [...(c.items || []), { name: '', role: '', initials: '' }] })} style={{ padding: '10px', background: '#F3F4F6', border: '2px dashed #D1D5DB', borderRadius: '8px', cursor: 'pointer', color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>+ Add Team Member</button>
    </div>
  )
}

function TextEditor({ content, onChange }) {
  const c = content || {}
  return (
    <textarea value={c.body || ''} onChange={e => onChange('content', { ...c, body: e.target.value })} placeholder="HTML content" rows={6} style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', resize: 'vertical', fontFamily: 'monospace', boxSizing: 'border-box' }} />
  )
}

function CtaEditor({ content, onChange }) {
  const c = content || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" value={c.headline || ''} onChange={e => onChange('content', { ...c, headline: e.target.value })} placeholder="CTA Headline" style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <input type="text" value={c.buttonText || ''} onChange={e => onChange('content', { ...c, buttonText: e.target.value })} placeholder="Button Text" style={{ padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
        <input type="text" value={c.buttonLink || ''} onChange={e => onChange('content', { ...c, buttonLink: e.target.value })} placeholder="Button Link" style={{ padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
      </div>
    </div>
  )
}

function ContactEditor({ content, onChange }) {
  const c = content || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" value={c.email || ''} onChange={e => onChange('content', { ...c, email: e.target.value })} placeholder="Email address" style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
      <input type="text" value={c.phone || ''} onChange={e => onChange('content', { ...c, phone: e.target.value })} placeholder="Phone number" style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
      <input type="text" value={c.address || ''} onChange={e => onChange('content', { ...c, address: e.target.value })} placeholder="Address" style={{ width: '100%', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
    </div>
  )
}

const SECTION_EDITORS = {
  hero: HeroEditor,
  features: FeaturesEditor,
  stats: StatsEditor,
  services: ServicesEditor,
  team: TeamEditor,
  text: TextEditor,
  cta: CtaEditor,
  contact: ContactEditor,
}

function GalleryEditor({ content, onChange }) {
  const c = content || { images: [] }
  return (
    <div>
      <label style={{ display: 'block', padding: '20px', border: '2px dashed #D1D5DB', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: '#FAFAFA' }}>
        <div style={{ color: '#6B7280', fontSize: '14px' }}>Add images (URLs, one per line)</div>
        <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
      </label>
      <textarea value={(c.images || []).join('\n')} onChange={e => onChange('content', { ...c, images: e.target.value.split('\n').filter(Boolean) })} placeholder="Image URLs (one per line)" rows={4} style={{ width: '100%', marginTop: '12px', padding: '12px 14px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
    </div>
  )
}

SECTION_EDITORS.gallery = GalleryEditor

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const [page, setPage] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pageTitle, setPageTitle] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/pages?slug=${params.slug}`)
        const data = await res.json()
        if (data) {
          setPage(data)
          setPageTitle(data.title || '')
          setSections(data.sections && data.sections.length > 0 ? data.sections : [])
        }
      } catch (e) {}
      setLoading(false)
    }
    load()
  }, [params.slug])

  function addSection() {
    const type = 'text'
    setSections([...sections, { type, title: '', content: defaultContent(type), order: sections.length }])
  }

  function removeSection(index) {
    setSections(sections.filter((_, i) => i !== index))
  }

  function updateSection(index, field, value) {
    const updated = [...sections]
    updated[index] = { ...updated[index], [field]: value }
    setSections(updated)
  }

  function moveSection(index, direction) {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= sections.length) return
    const updated = [...sections];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setSections(updated.map((s, i) => ({ ...s, order: i })))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: page.id, title: pageTitle, sections })
      })
      if (res.ok) router.push('/admin/pages')
    } catch (e) {}
    setSaving(false)
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>Loading...</div>
  }

  if (!page) {
    return <div style={{ textAlign: 'center', padding: '60px', color: '#DC2626' }}>Page not found</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <input type="text" value={pageTitle} onChange={e => setPageTitle(e.target.value)}
            style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', border: 'none', borderBottom: '2px solid #E5E7EB', padding: '8px 0', width: '100%', outline: 'none', background: 'transparent' }} />
          <p style={{ color: '#6B7280', marginTop: '8px' }}>URL: /{page.slug} &middot; {sections.length} sections</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginLeft: '24px' }}>
          <a href="/admin/pages" style={{ padding: '12px 20px', background: '#E8EDF2', color: '#374151', borderRadius: '10px', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>Back</a>
          <button onClick={handleSave} disabled={saving} style={{ padding: '12px 24px', background: '#C2A56D', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '15px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {SECTION_TYPES.map(t => (
            <button key={t.value} onClick={() => setSections([...sections, { type: t.value, title: '', content: defaultContent(t.value), order: sections.length }])}
              style={{ padding: '10px 16px', background: '#1A2634', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {sections.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '80px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📄</div>
          <p style={{ color: '#6B7280', fontSize: '18px' }}>No sections yet</p>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '8px' }}>Click a section type above to start building this page</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.map((section, index) => {
            const Editor = SECTION_EDITORS[section.type] || TextEditor
            const typeInfo = SECTION_TYPES.find(t => t.value === section.type)
            return (
              <div key={index} style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ padding: '6px 12px', background: '#E8EDF2', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{typeInfo?.icon}</span> {typeInfo?.label || section.type}
                    </span>
                    <input type="text" value={section.title || ''} onChange={e => updateSection(index, 'title', e.target.value)} placeholder="Section title (optional)" style={{ padding: '6px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', width: '200px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <select value={section.type} onChange={e => updateSection(index, 'type', e.target.value)}
                      style={{ padding: '6px 10px', border: '2px solid #E5E7EB', borderRadius: '6px', fontSize: '12px' }}>
                      {SECTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
                    </select>
                    <button onClick={() => moveSection(index, -1)} disabled={index === 0} style={{ padding: '6px 10px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', opacity: index === 0 ? 0.5 : 1 }}>↑</button>
                    <button onClick={() => moveSection(index, 1)} disabled={index === sections.length - 1} style={{ padding: '6px 10px', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', opacity: index === sections.length - 1 ? 0.5 : 1 }}>↓</button>
                    <button onClick={() => removeSection(index)} style={{ padding: '6px 10px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>×</button>
                  </div>
                </div>
                <Editor content={section.content} onChange={(field, value) => updateSection(index, field, value)} />
              </div>
            )
          })}
        </div>
      )}

      {sections.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button onClick={handleSave} disabled={saving} style={{ padding: '16px 48px', background: '#C2A56D', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      )}
    </div>
  )
}