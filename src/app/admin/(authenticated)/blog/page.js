'use client'

import { useState, useEffect } from 'react'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs')
        const data = await res.json()
        setBlogs(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to fetch blogs:', e)
      }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  async function deleteBlog(id) {
    if (!confirm('Delete this blog post?')) return
    try {
      await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' })
      setBlogs(blogs.filter(b => b.id !== id))
    } catch (e) {}
  }

  async function togglePublish(id, published) {
    try {
      const res = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published: !published })
      })
      const data = await res.json()
      setBlogs(blogs.map(b => b.id === id ? data : b))
    } catch (e) {}
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading posts...
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Blog Posts</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>{blogs.length} total posts</p>
        </div>
        <a href="/admin/blog/create" style={{
          padding: '14px 24px',
          background: '#C2A56D',
          color: 'white',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '15px'
        }}>
          + Create New Post
        </a>
      </div>

      {blogs.length === 0 ? (
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '80px', 
          textAlign: 'center', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
          <p style={{ color: '#6B7280', fontSize: '18px' }}>No blog posts yet</p>
          <a href="/admin/blog/create" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            background: '#C2A56D',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Create Your First Post
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
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Title</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Author</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '20px', fontWeight: '600', color: '#1A2634' }}>{blog.title}</td>
                  <td style={{ padding: '20px', color: '#6B7280' }}>{blog.author || 'Admin'}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      background: blog.published ? '#D1FAE5' : '#FEF3C7',
                      color: blog.published ? '#059669' : '#D97706',
                      borderRadius: '20px', 
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>{blog.published ? 'Published' : 'Draft'}</span>
                  </td>
                  <td style={{ padding: '20px', color: '#6B7280', fontSize: '14px' }}>{blog.date || blog.createdAt}</td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => togglePublish(blog.id, blog.published)}
                        style={{ 
                          padding: '8px 12px', 
                          background: blog.published ? '#FEF3C7' : '#D1FAE5', 
                          color: blog.published ? '#D97706' : '#059669',
                          border: 'none', 
                          borderRadius: '6px', 
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        {blog.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <a href={`/admin/blog/${blog.id}`} style={{ 
                        padding: '8px 12px', 
                        background: '#3B82F6', 
                        color: 'white', 
                        borderRadius: '6px', 
                        fontSize: '12px',
                        fontWeight: '500',
                        textDecoration: 'none'
                      }}>Edit</a>
                      <button onClick={() => deleteBlog(blog.id)} style={{ 
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
      )}
    </div>
  )
}