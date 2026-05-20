'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCaseStudy() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')
  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const editorRef = useRef(null)
  const initialContentSet = useRef(false)

  const [form, setForm] = useState({
    title: '',
    client: '',
    category: '',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    image: '',
    featured: false
  })

  useEffect(() => {
    if (!initialContentSet.current && editorRef.current) {
      editorRef.current.innerHTML = ''
      initialContentSet.current = true
    }
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result })
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function execCmd(command, value = null) {
    document.execCommand(command, false, value)
  }

  function handleImageAdd(e) {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imgHtml = `<img src="${reader.result}" style="max-width:100%;height:auto;border-radius:8px;margin:16px 0;" />`
        document.execCommand('insertHTML', false, imgHtml)
      }
      reader.readAsDataURL(file)
    })
  }

  function createEditorToolbar(id) {
    return (
      <div style={{ display: 'flex', gap: '4px', padding: '10px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => execCmd('bold')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>B</button>
        <button type="button" onClick={() => execCmd('italic')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', fontStyle: 'italic', cursor: 'pointer' }}>I</button>
        <button type="button" onClick={() => execCmd('underline')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', textDecoration: 'underline', cursor: 'pointer' }}>U</button>
        <div style={{ width: '1px', background: '#E5E7EB', margin: '0 8px' }} />
        <button type="button" onClick={() => execCmd('formatBlock', 'h2')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}>H2</button>
        <button type="button" onClick={() => execCmd('formatBlock', 'h3')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}>H3</button>
        <button type="button" onClick={() => execCmd('insertUnorderedList')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}>• List</button>
        <button type="button" onClick={() => execCmd('justifyLeft')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}>Left</button>
        <button type="button" onClick={() => execCmd('justifyCenter')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}>Center</button>
        <div style={{ width: '1px', background: '#E5E7EB', margin: '0 8px' }} />
        <button type="button" onClick={() => execCmd('formatBlock', 'blockquote')} style={{ padding: '8px 12px', background: 'white', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}>Quote</button>
        <label style={{ padding: '8px 12px', background: '#C2A56D', color: 'white', border: '1px solid #C2A56D', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🖼️</span> Add Image
          <input type="file" accept="image/*" multiple onChange={handleImageAdd} style={{ display: 'none' }} />
        </label>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const description = editorRef.current?.innerHTML || ''
    setLoading(true)
    try {
      const res = await fetch('/api/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          description,
          images
        })
      })
      if (res.ok) {
        router.push('/admin/case-studies')
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Failed to create case study.')
    } catch (e) {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Create Case Study</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Add a new portfolio project</p>
        </div>
        <a href="/admin/case-studies" style={{ padding: '12px 20px', background: '#E8EDF2', color: '#374151', borderRadius: '10px', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
          Back to Case Studies
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Project Title *</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Project name" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Client Name *</label>
                <input type="text" name="client" value={form.client} onChange={handleChange} required placeholder="Client company" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Branding, Web Development" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1A2634', marginBottom: '20px' }}>Project Details</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Description</label>
                <div style={{ border: '2px solid #E5E7EB', borderRadius: '10px', overflow: 'hidden' }}>
                  {createEditorToolbar('desc')}
                   <div ref={editorRef} contentEditable suppressContentEditableWarning style={{ minHeight: '150px', padding: '16px', fontSize: '15px', lineHeight: '1.6', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>The Challenge</label>
                <textarea name="challenge" value={form.challenge} onChange={handleChange} rows={4} placeholder="What problem did the client face?" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>The Solution</label>
                <textarea name="solution" value={form.solution} onChange={handleChange} rows={4} placeholder="How did you solve it?" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Results</label>
                <textarea name="results" value={form.results} onChange={handleChange} rows={4} placeholder="What outcomes were achieved?" style={{ width: '100%', padding: '14px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1A2634', marginBottom: '16px' }}>Publish</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}>
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Feature this project</span>
              </label>
              {error && (
                <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '12px', border: '1px solid #FECACA' }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#C2A56D', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating...' : 'Create Case Study'}
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1A2634', marginBottom: '16px' }}>Featured Image</h3>
              <div style={{ border: '2px dashed #E5E7EB', borderRadius: '12px', padding: '32px', textAlign: 'center', background: '#FAFAFA', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="case-image-upload" style={{ display: 'none' }} />
                <label htmlFor="case-image-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  {preview || form.image ? (
                    <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={preview || form.image} alt="Preview" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>Click to change</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '48px' }}>📷</div>
                      <div style={{ color: '#6B7280', fontSize: '14px' }}>Click to upload</div>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1A2634', marginBottom: '16px' }}>Gallery Images</h3>
              <label style={{ display: 'block', padding: '20px', border: '2px dashed #E5E7EB', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: '#FAFAFA' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</div>
                <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '4px' }}>Add Multiple Images</div>
                <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Select multiple files</div>
                <input type="file" accept="image/*" multiple onChange={(e) => {
                  const files = Array.from(e.target.files)
                  files.forEach(file => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setImages(prev => [...prev, { id: Date.now() + Math.random(), src: reader.result }])
                    }
                    reader.readAsDataURL(file)
                  })
                }} style={{ display: 'none' }} />
              </label>
              {images.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '16px' }}>
                  {images.map((img, idx) => (
                    <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={img.src} alt="" style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                      <button type="button" onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', background: '#DC2626', color: 'white', border: 'none', borderRadius: '50%', fontSize: '12px', cursor: 'pointer' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}