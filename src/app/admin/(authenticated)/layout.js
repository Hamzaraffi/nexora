'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const MENU = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { href: '/admin/pages', label: 'Pages', icon: '📄' },
  { href: '/admin/blog', label: 'Blog', icon: '📝' },
  { href: '/admin/case-studies', label: 'Case Studies', icon: '📁' },
  { href: '/admin/contact', label: 'Messages', icon: '📬' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' }
]

export default function AuthenticatedLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('nexora_auth')
    const userData = localStorage.getItem('nexora_user')

    if (auth === 'true' && userData) {
      try {
        setUser(JSON.parse(userData))
        setReady(true)
      } catch (e) {
        window.location.href = '/admin/login'
      }
    } else {
      window.location.href = '/admin/login'
    }
  }, [])

  function logout() {
    localStorage.removeItem('nexora_user')
    localStorage.removeItem('nexora_auth')
    window.location.href = '/admin/login'
  }

  if (!ready) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#F3F4F6'
      }}>
        <div style={{ color: '#6B7280', fontSize: '18px' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F4F6' }}>
      <aside style={{
        width: '260px',
        background: '#1A2634',
        color: 'white',
        position: 'fixed',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              background: 'linear-gradient(135deg, #C2A56D, #B8944F)', 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>N</div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>Nexora</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>Admin Panel</div>
            </div>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {MENU.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <a 
                key={item.href} 
                href={item.href} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 20px',
                  color: isActive ? '#C2A56D' : 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                  background: isActive ? 'rgba(194, 165, 109, 0.15)' : 'transparent',
                  borderLeft: isActive ? '3px solid #C2A56D' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ marginBottom: '12px', padding: '12px', background: 'rgba(194, 165, 109, 0.1)', borderRadius: '10px' }}>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>Logged in as</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>{user?.name}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
          <button 
            onClick={logout} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: 'rgba(220, 38, 38, 0.2)', 
              border: 'none', 
              borderRadius: '10px', 
              color: '#FCA5A5', 
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: '260px', minHeight: '100vh' }}>
        <header style={{ 
          background: 'white', 
          padding: '20px 32px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1A2634', margin: 0 }}>
              {MENU.find(m => pathname === m.href || pathname.startsWith(m.href + '/'))?.label || 'Admin'}
            </h2>
            <p style={{ color: '#6B7280', fontSize: '13px', margin: '4px 0 0' }}>
              Manage your website content
            </p>
          </div>
          <a href="/" target="_blank" style={{
            padding: '10px 20px',
            background: '#F3F4F6',
            color: '#374151',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            View Website →
          </a>
        </header>
        <main style={{ padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}