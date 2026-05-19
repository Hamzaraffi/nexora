'use client'

import { useState, useEffect } from 'react'

export default function PagesList() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function loadPages() {
    setLoading(true)
    setError(null)
    async function fetchPages() {
      try {
        const res = await fetch('/api/pages')
        const data = await res.json()
        if (Array.isArray(data)) {
          setPages(data)
        } else {
          setPages([])
        }
      } catch (e) {
        console.error('Failed to fetch pages:', e)
        setError('Failed to load pages. Please try again.')
      }
      setLoading(false)
    }
    fetchPages()
  }

  useEffect(() => {
    loadPages()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading pages...
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Pages</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Manage your website pages ({pages.length} pages)</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={loadPages}
            style={{
              padding: '12px 20px',
              background: '#F3F4F6',
              color: '#374151',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>
          <a href="/admin/pages/create" style={{
            padding: '12px 20px',
            background: '#C2A56D',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            + Create Page
          </a>
        </div>
      </div>

      {error && (
        <div style={{ 
          padding: '16px', 
          background: '#FEE2E2', 
          color: '#DC2626', 
          borderRadius: '10px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button onClick={loadPages} style={{ 
            padding: '8px 16px', 
            background: 'white', 
            border: '1px solid #DC2626', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Retry</button>
        </div>
      )}
      
      {pages.length === 0 && !error ? (
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '80px', 
          textAlign: 'center', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📄</div>
          <p style={{ color: '#6B7280', fontSize: '18px' }}>No pages found</p>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '8px' }}>Click refresh to load pages or create a new one</p>
        </div>
      ) : pages.length > 0 ? (
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Page Name</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>URL Path</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Sections</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '20px', fontWeight: '600', color: '#1A2634' }}>{page.title}</td>
                  <td style={{ padding: '20px' }}>
                    <code style={{ 
                      background: '#F3F4F6', 
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      color: '#C2A56D',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>{page.path || '/' + page.slug}</code>
                  </td>
                  <td style={{ padding: '20px', color: '#6B7280' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      background: '#E8EDF2', 
                      borderRadius: '20px', 
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>{page.sections?.length || 0} sections</span>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={`/admin/pages/${page.slug}`} style={{ 
                        padding: '8px 16px', 
                        background: '#C2A56D', 
                        color: 'white', 
                        borderRadius: '8px', 
                        fontSize: '13px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}>Edit Page</a>
                      <button 
                        onClick={async () => {
                          if (confirm('Delete this page?')) {
                            await fetch(`/api/pages?id=${page.id}`, { method: 'DELETE' })
                            loadPages()
                          }
                        }}
                        style={{ 
                          padding: '8px 16px', 
                          background: '#FEE2E2', 
                          color: '#DC2626', 
                          border: 'none',
                          borderRadius: '8px', 
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}