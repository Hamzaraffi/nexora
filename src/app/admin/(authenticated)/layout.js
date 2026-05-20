'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

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

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F4F6' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#1A2634',
        color: 'white',
        position: 'fixed',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        zIndex: 50,
        transition: 'transform 0.3s ease',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      }} className="lg:translate-x-0">
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden" style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {MENU.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                color: isActive(item.href) ? '#C2A56D' : 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive(item.href) ? '600' : '400',
                background: isActive(item.href) ? 'rgba(194, 165, 109, 0.15)' : 'transparent',
                borderLeft: isActive(item.href) ? '3px solid #C2A56D' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
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

      {/* Main content */}
      <div style={{ flex: 1, width: '100%' }} className="lg:ml-[260px]">
        <header style={{ 
          background: 'white', 
          padding: '16px 20px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#1A2634',
                padding: '4px'
              }}
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1A2634', margin: 0 }}>
                {MENU.find(m => isActive(m.href))?.label || 'Admin'}
              </h2>
              <p style={{ color: '#6B7280', fontSize: '12px', margin: '2px 0 0', display: 'none' }} className="sm:block">
                Manage your website content
              </p>
            </div>
          </div>
          <a href="/" target="_blank" style={{
            padding: '8px 16px',
            background: '#F3F4F6',
            color: '#374151',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}>
            View Website →
          </a>
        </header>
        <main style={{ padding: '20px' }} className="sm:p-8">
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          aside {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  )
}
