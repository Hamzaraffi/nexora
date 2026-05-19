'use client'

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    siteName: 'Nexora',
    tagline: 'Digital Marketing Agency',
    email: 'hello@nexora.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA 94102',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: ''
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data) setForm(prev => ({ ...prev, ...data }))
      } catch (e) {}
      setLoading(false)
    }
    fetchSettings()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function saveSettings() {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setMessage('Settings saved successfully!')
        localStorage.setItem('nexora_settings', JSON.stringify(form))
      } else {
        setMessage('Failed to save settings')
      }
    } catch (e) {
      setMessage('Error saving settings')
    }
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading settings...
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Settings</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>Configure your website details</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {message && (
            <span style={{ 
              color: message.includes('success') ? '#059669' : '#DC2626',
              fontWeight: '500',
              fontSize: '14px'
            }}>{message}</span>
          )}
          <button 
            onClick={saveSettings} 
            disabled={saving}
            style={{ 
              padding: '12px 24px', 
              background: '#C2A56D', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontSize: '15px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '28px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1A2634', marginBottom: '24px' }}>Site Information</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Site Name</label>
            <input type="text" name="siteName" value={form.siteName} onChange={handleChange} style={{
              width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
            }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Tagline</label>
            <input type="text" name="tagline" value={form.tagline} onChange={handleChange} style={{
              width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
            }} />
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '28px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1A2634', marginBottom: '24px' }}>Contact Information</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} style={{
              width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
            }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} style={{
              width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
            }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} style={{
              width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
            }} />
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '28px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #E5E7EB',
          gridColumn: 'span 2'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1A2634', marginBottom: '24px' }}>Social Media Links</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>📘</span> Facebook
              </label>
              <input type="url" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/..." style={{
                width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box'
              }} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🐦</span> Twitter / X
              </label>
              <input type="url" name="twitter" value={form.twitter} onChange={handleChange} placeholder="https://twitter.com/..." style={{
                width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box'
              }} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>📷</span> Instagram
              </label>
              <input type="url" name="instagram" value={form.instagram} onChange={handleChange} placeholder="https://instagram.com/..." style={{
                width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box'
              }} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>💼</span> LinkedIn
              </label>
              <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." style={{
                width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box'
              }} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>▶️</span> YouTube
              </label>
              <input type="url" name="youtube" value={form.youtube} onChange={handleChange} placeholder="https://youtube.com/..." style={{
                width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box'
              }} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🎵</span> TikTok
              </label>
              <input type="url" name="tiktok" value={form.tiktok} onChange={handleChange} placeholder="https://tiktok.com/@..." style={{
                width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}