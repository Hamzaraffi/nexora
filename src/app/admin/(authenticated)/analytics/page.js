'use client'

import { useState, useEffect } from 'react'

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')

  useEffect(() => {
    async function fetchData() {
      try {
        const [pagesRes, blogsRes, messagesRes, usersRes, casesRes] = await Promise.all([
          fetch('/api/pages').catch(() => ({ json: () => [] })),
          fetch('/api/blogs').catch(() => ({ json: () => [] })),
          fetch('/api/contact').catch(() => ({ json: () => [] })),
          fetch('/api/users').catch(() => ({ json: () => [] })),
          fetch('/api/case-studies').catch(() => ({ json: () => [] }))
        ])

        const [pages, blogs, messages, users, cases] = await Promise.all([
          pagesRes.json(), blogsRes.json(), messagesRes.json(), usersRes.json(), casesRes.json()
        ])

        const publishedBlogs = Array.isArray(blogs) ? blogs.filter(b => b.published).length : 0
        const featuredCases = Array.isArray(cases) ? cases.filter(c => c.featured).length : 0
        const unreadMessages = Array.isArray(messages) ? messages.filter(m => !m.read).length : 0

        setStats({
          pages: Array.isArray(pages) ? pages.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          publishedBlogs,
          caseStudies: Array.isArray(cases) ? cases.length : 0,
          featuredCases,
          messages: Array.isArray(messages) ? messages.length : 0,
          unreadMessages,
          users: Array.isArray(users) ? users.length : 0
        })
      } catch (e) {
        console.error('Failed to fetch analytics:', e)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading analytics...
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Analytics</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Overview of your website performance</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['7', '30', '90'].map(days => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              style={{
                padding: '8px 16px',
                background: timeRange === days ? '#C2A56D' : 'white',
                color: timeRange === days ? 'white' : '#6B7280',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <StatCard icon="📄" label="Pages" value={stats.pages} sub="Website pages" color="#3B82F6" />
        <StatCard icon="📝" label="Blog Posts" value={stats.blogs} sub={`${stats.publishedBlogs} published`} color="#8B5CF6" />
        <StatCard icon="📁" label="Case Studies" value={stats.caseStudies} sub={`${stats.featuredCases} featured`} color="#059669" />
        <StatCard icon="👥" label="Team Members" value={stats.users} sub="Active users" color="#C2A56D" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '14px', background: '#FEF3C7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'
            }}>📬</div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634' }}>{stats.messages}</div>
              <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500' }}>Total Messages</div>
            </div>
          </div>
          <div style={{ marginTop: '16px', padding: '12px 16px', background: stats.unreadMessages > 0 ? '#FEF3C7' : '#F3F4F6', borderRadius: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: stats.unreadMessages > 0 ? '#D97706' : '#6B7280' }}>
              {stats.unreadMessages} unread
            </span>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1A2634', marginBottom: '20px' }}>Content Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Pages</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '80px', height: '8px', background: '#E8EDF2', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(stats.pages / Math.max(stats.pages + stats.blogs + stats.caseStudies, 1)) * 100}%`, height: '100%', background: '#3B82F6' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', minWidth: '30px' }}>{stats.pages}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Blog Posts</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '80px', height: '8px', background: '#E8EDF2', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(stats.blogs / Math.max(stats.pages + stats.blogs + stats.caseStudies, 1)) * 100}%`, height: '100%', background: '#8B5CF6' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', minWidth: '30px' }}>{stats.blogs}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Case Studies</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '80px', height: '8px', background: '#E8EDF2', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(stats.caseStudies / Math.max(stats.pages + stats.blogs + stats.caseStudies, 1)) * 100}%`, height: '100%', background: '#059669' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', minWidth: '30px' }}>{stats.caseStudies}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1A2634', marginBottom: '20px' }}>Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F9FAFB', borderRadius: '10px' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Published Content</span>
              <span style={{ fontWeight: '700', color: '#059669' }}>{stats.publishedBlogs + stats.featuredCases}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F9FAFB', borderRadius: '10px' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Total Content</span>
              <span style={{ fontWeight: '700', color: '#374151' }}>{stats.pages + stats.blogs + stats.caseStudies}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#F9FAFB', borderRadius: '10px' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Response Rate</span>
              <span style={{ fontWeight: '700', color: '#374151' }}>{stats.messages > 0 ? Math.round(((stats.messages - stats.unreadMessages) / stats.messages) * 100) : 100}%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '28px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1A2634', marginBottom: '24px' }}>Content Distribution</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px' }}>
          <div style={{ textAlign: 'center', padding: '24px', background: '#F9FAFB', borderRadius: '12px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#3B82F6' }}>{stats.pages}</div>
            <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>Pages</div>
          </div>
          <div style={{ textAlign: 'center', padding: '24px', background: '#F9FAFB', borderRadius: '12px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#8B5CF6' }}>{stats.blogs}</div>
            <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>Blog Posts</div>
          </div>
          <div style={{ textAlign: 'center', padding: '24px', background: '#F9FAFB', borderRadius: '12px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#059669' }}>{stats.caseStudies}</div>
            <div style={{ color: '#6B7280', fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>Case Studies</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '16px', 
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #E5E7EB'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ 
          width: '52px', height: '52px', borderRadius: '12px', background: `${color}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
        }}>{icon}</div>
        <div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#1A2634' }}>{value}</div>
          <div style={{ color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>{label}</div>
        </div>
      </div>
      {sub && <div style={{ marginTop: '12px', color: '#9CA3AF', fontSize: '12px' }}>{sub}</div>}
    </div>
  )
}