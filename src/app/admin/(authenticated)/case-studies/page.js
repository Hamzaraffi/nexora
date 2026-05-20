'use client'

import { useState, useEffect } from 'react'

export default function CaseStudiesList() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch('/api/case-studies')
        const data = await res.json()
        setCases(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to fetch case studies:', e)
      }
      setLoading(false)
    }
    fetchCases()
  }, [])

  async function deleteCase(id) {
    if (!confirm('Delete this case study?')) return
    try {
      await fetch(`/api/case-studies?id=${id}`, { method: 'DELETE' })
      setCases(cases.filter(c => c.id !== id))
    } catch (e) {}
  }

  async function togglePublish(id, published) {
    try {
      const res = await fetch('/api/case-studies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published: !published })
      })
      const data = await res.json()
      setCases(cases.map(c => c.id === id ? data : c))
    } catch (e) {}
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading case studies...
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Case Studies</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>{cases.length} portfolio projects</p>
        </div>
        <a href="/admin/case-studies/create" style={{
          padding: '14px 24px',
          background: '#C2A56D',
          color: 'white',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '15px'
        }}>
          + Create Case Study
        </a>
      </div>

      {cases.length === 0 ? (
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '80px', 
          textAlign: 'center', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📁</div>
          <p style={{ color: '#6B7280', fontSize: '18px' }}>No case studies yet</p>
          <a href="/admin/case-studies/create" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            background: '#C2A56D',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Create Your First Case Study
          </a>
        </div>
      ) : (
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Project</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Client</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '20px', fontWeight: '600', color: '#1A2634' }}>{item.title}</td>
                    <td style={{ padding: '20px', color: '#6B7280' }}>{item.client || '-'}</td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        background: item.featured ? '#D1FAE5' : '#F3F4F6',
                        color: item.featured ? '#059669' : '#6B7280',
                        borderRadius: '20px', 
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>{item.featured ? 'Featured' : 'Draft'}</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => togglePublish(item.id, item.featured)}
                          style={{ 
                            padding: '8px 12px', 
                            background: item.featured ? '#FEF3C7' : '#D1FAE5', 
                            color: item.featured ? '#D97706' : '#059669',
                            border: 'none', 
                            borderRadius: '6px', 
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          {item.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <a href={`/admin/case-studies/${item.id}`} style={{ 
                          padding: '8px 12px', 
                          background: '#3B82F6', 
                          color: 'white', 
                          borderRadius: '6px', 
                          fontSize: '12px',
                          fontWeight: '500',
                          textDecoration: 'none'
                        }}>Edit</a>
                        <button onClick={() => deleteCase(item.id)} style={{ 
                          padding: '8px 12px', 
                          background: '#FEE2E2', 
                          color: '#DC2626', 
                          border: 'none', 
                          borderRadius: '6px', 
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}