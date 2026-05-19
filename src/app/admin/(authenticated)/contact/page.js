'use client'

import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('/api/contact')
        const data = await res.json()
        setMessages(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to fetch messages:', e)
      }
      setLoading(false)
    }
    fetchMessages()
  }, [])

  async function markAsRead(id) {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: id, read: true })
      })
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
    } catch (e) {}
  }

  async function deleteMessage(id) {
    if (!confirm('Delete this message?')) return
    try {
      await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
      setMessages(messages.filter(m => m.id !== id))
    } catch (e) {}
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading messages...
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', marginBottom: '8px' }}>Messages</h1>
      <p style={{ color: '#6B7280', marginBottom: '32px' }}>Contact form submissions ({messages.length} messages)</p>
      
      {messages.length === 0 ? (
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '80px', 
          textAlign: 'center', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📧</div>
          <p style={{ color: '#6B7280', fontSize: '18px' }}>No messages yet</p>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '8px' }}>Messages from your website contact form will appear here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #E5E7EB',
              borderLeft: msg.read ? '1px solid #E5E7EB' : '4px solid #C2A56D'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: '700', color: '#1A2634', fontSize: '18px' }}>{msg.name || 'Anonymous'}</div>
                  <div style={{ color: '#6B7280', fontSize: '14px', marginTop: '4px' }}>{msg.email || 'No email provided'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{msg.date}</span>
                  {!msg.read && (
                    <button onClick={() => markAsRead(msg.id)} style={{ 
                      padding: '6px 12px', 
                      background: '#059669', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '6px', 
                      fontSize: '12px', 
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>Mark Read</button>
                  )}
                  <button onClick={() => deleteMessage(msg.id)} style={{ 
                    padding: '6px 12px', 
                    background: '#FEE2E2', 
                    color: '#DC2626', 
                    border: 'none', 
                    borderRadius: '6px', 
                    fontSize: '12px', 
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>Delete</button>
                </div>
              </div>
              {msg.subject && (
                <div style={{ fontWeight: '600', color: '#374151', marginBottom: '8px' }}>{msg.subject}</div>
              )}
              <div style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '15px' }}>{msg.message || msg.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}