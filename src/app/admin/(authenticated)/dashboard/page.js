'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({ pages: 0, messages: 0, users: 1, blogs: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pagesRes, messagesRes, blogsRes] = await Promise.all([
          fetch('/api/pages').catch(() => ({ json: () => [] })),
          fetch('/api/contact').catch(() => ({ json: () => [] })),
          fetch('/api/blogs').catch(() => ({ json: () => [] }))
        ])
        
        const pages = await pagesRes.json()
        const messages = await messagesRes.json()
        const blogs = await blogsRes.json()
        
        setStats({
          pages: Array.isArray(pages) ? pages.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          users: 1,
          blogs: Array.isArray(blogs) ? blogs.length : 0
        })
      } catch (e) {
        console.error('Failed to fetch stats:', e)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#6B7280', marginBottom: '32px' }}>Welcome back, Admin!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
        <StatCard icon="📄" label="Pages" value={stats.pages} color="#C2A56D" />
        <StatCard icon="📬" label="Messages" value={stats.messages} color="#059669" />
        <StatCard icon="📝" label="Blog Posts" value={stats.blogs} color="#3B82F6" />
        <StatCard icon="👥" label="Users" value={stats.users} color="#8B5CF6" />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1A2634', marginBottom: '20px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/admin/pages" style={{
            padding: '16px 24px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: '#1A2634',
            fontWeight: '500'
          }}>
            📄 Manage Pages
          </a>
          <a href="/admin/contact" style={{
            padding: '16px 24px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: '#1A2634',
            fontWeight: '500'
          }}>
            📬 View Messages
          </a>
          <a href="/" target="_blank" style={{
            padding: '16px 24px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textDecoration: 'none',
            color: '#1A2634',
            fontWeight: '500'
          }}>
            🌐 View Website
          </a>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '16px', 
      padding: '28px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #E5E7EB'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '36px' }}>{icon}</span>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
      </div>
      <div style={{ fontSize: '36px', fontWeight: '700', color: color }}>{value}</div>
      <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>{label}</div>
    </div>
  )
}