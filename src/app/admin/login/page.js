'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@nexora.com')
  const [password, setPassword] = useState('nexora2024')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('nexora_user', JSON.stringify(data.user))
        localStorage.setItem('nexora_auth', 'true')
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid credentials')
        setLoading(false)
      }
    } catch (err) {
      setError('Connection error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1A2634 0%, #2C3947 50%, #1A2634 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '420px', 
        background: 'white', 
        borderRadius: '20px', 
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'linear-gradient(135deg, #C2A56D 0%, #B8944F 100%)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'white',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>N</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1A2634', margin: '0 0 8px' }}>Nexora Admin</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '2px solid #E5E7EB', 
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{ 
              padding: '14px 16px', 
              background: '#FEE2E2', 
              border: '1px solid #FECACA', 
              borderRadius: '10px', 
              color: '#DC2626', 
              fontSize: '14px', 
              marginBottom: '20px', 
              textAlign: 'center' 
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: 'linear-gradient(135deg, #C2A56D 0%, #B8944F 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: '#F9FAFB', 
          borderRadius: '10px',
          fontSize: '13px',
          color: '#6B7280',
          textAlign: 'center'
        }}>
          <strong>Demo Credentials:</strong><br />
          admin@nexora.com / nexora2024
        </div>
      </div>
    </div>
  )
}