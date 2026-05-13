'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, Users, Briefcase, MessageSquare, Mail, LogOut, Plus, Edit, Trash2, 
  FileText, Shield, TrendingUp, X, Upload, Save, Sun, Moon
} from 'lucide-react'

const permissionsList = [
  { id: 'services', label: 'Services' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'users', label: 'Users' },
  { id: 'roles', label: 'Roles' },
]

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [data, setData] = useState({ services: [], portfolio: [], blogs: [], contacts: [], newsletter: [], users: [], roles: [] })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true)
      }
    }
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [services, portfolio, blogs, contacts, newsletter, users, roles] = await Promise.all([
        fetch('/api/services').then(r => r.json()),
        fetch('/api/portfolio').then(r => r.json()),
        fetch('/api/blogs').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/newsletter').then(r => r.json()),
        fetch('/api/users').then(r => r.json()),
        fetch('/api/roles').then(r => r.json()),
      ])
      setData({ services, portfolio, blogs, contacts, newsletter, users, roles })
    } catch (error) {
      console.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const handleDelete = async (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' })
      fetchData()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = editItem ? 'PUT' : 'POST'
    await fetch(`/api/${activeTab}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editItem ? { ...formData, id: editItem.id } : formData)
    })
    setShowModal(false)
    setEditItem(null)
    fetchData()
  }

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })
      const result = await res.json()
      if (result.success) {
        setFormData({ ...formData, [fieldName]: result.url })
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const openModal = (item = null) => {
    setEditItem(item)
    setFormData(item || getDefaultFormData())
    setShowModal(true)
  }

  const getDefaultFormData = () => {
    switch (activeTab) {
      case 'services': return { title: '', desc: '', icon: 'TrendingUp' }
      case 'portfolio': return { 
        title: '', client: '', clientLogo: '', technologies: [], problem: '', solution: '', 
        results: '', metrics: { leads: '', conversion: '', revenue: '' }, 
        clientReview: '', clientName: '', clientRole: '', clientAvatar: '', rating: 5 
      }
      case 'blogs': return { title: '', slug: '', heading: '', subHeading: '', content: '', excerpt: '', image: '', category: 'General', tags: [], metaTitle: '', metaDescription: '', metaKeywords: '', readTime: '5 min read' }
      case 'users': return { name: '', email: '', password: '', role: '', permissions: [], avatar: '' }
      case 'roles': return { name: '', permissions: [], description: '' }
      default: return {}
    }
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Services', icon: TrendingUp },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Shield },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
  ]

  const stats = [
    { label: 'Total Blogs', value: data.blogs.length, color: '#547A95' },
    { label: 'Portfolio Items', value: data.portfolio.length, color: '#547A95' },
    { label: 'Total Services', value: data.services.length, color: '#547A95' },
    { label: 'New Contacts', value: data.contacts.filter(c => !c.read).length, color: '#C2A56D' },
  ]

  const bgColor = darkMode ? '#1A2634' : '#E8EDF2'
  const surfaceColor = darkMode ? '#243447' : '#FFFFFF'
  const borderColor = darkMode ? 'rgba(232, 237, 242, 0.1)' : 'rgba(84, 122, 149, 0.2)'
  const textColor = darkMode ? '#E8EDF2' : '#2C3947'
  const mutedColor = darkMode ? '#94A3B8' : '#547A95'
  const accent = '#C2A56D'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: bgColor}}>
        <div className="w-16 h-16 border-4 rounded-full animate-spin" style={{borderColor: accent, borderTopColor: 'transparent'}}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: bgColor}}>
      <style jsx>{`
        .glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .mesh-blob {
          position: absolute;
          filter: blur(80px);
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="mesh-blob w-96 h-96 rounded-full" style={{background: '#547A95', top: '-10%', right: '-5%'}}></div>
        <div className="mesh-blob w-80 h-80 rounded-full" style={{background: '#C2A56D', bottom: '10%', left: '-10%', opacity: 0.15}}></div>
      </div>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[60] p-3 rounded-xl glass border shadow-lg transition-all hover:scale-105"
        style={{backgroundColor: surfaceColor, borderColor, color: textColor}}
      >
        <LayoutDashboard size={20} />
      </button>

      <aside className={`fixed top-0 left-0 h-screen transition-all duration-500 z-50 glass border-r ${
        sidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-20'
      }`} style={{backgroundColor: darkMode ? 'rgba(36, 52, 71, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderColor}}>
        <div className="p-6 border-b relative overflow-hidden" style={{borderColor}}>
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30" style={{background: '#547A95'}}></div>
          <div className="relative flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #2C3947, #3D4F5F)'}}>
              <span className="text-white font-bold text-2xl">N</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{background: '#C2A56D'}}></div>
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-xl font-bold" style={{color: textColor}}>Nexora</span>
                <p className="text-xs" style={{color: mutedColor}}>Admin Panel</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group overflow-hidden"
              style={{
                color: activeTab === item.id ? textColor : mutedColor
              }}
            >
              {activeTab === item.id && (
                <div className="absolute inset-0" style={{backgroundColor: 'rgba(194, 165, 109, 0.15)'}}></div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{backgroundColor: 'rgba(84, 122, 149, 0.1)'}}></div>
              <div className="relative z-10">
                <item.icon size={20} />
              </div>
              {sidebarOpen && <span className="relative z-10 font-medium whitespace-nowrap">{item.label}</span>}
              {activeTab === item.id && (
                <div className="absolute right-0 w-1 h-6 rounded-l-full" style={{backgroundColor: accent}}></div>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{borderColor}}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-500/10 group"
            style={{color: '#ef4444'}}
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <main className={`transition-all duration-500 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'} ml-0`}>
        <header className="relative glass border-b sticky top-0 z-30 px-6 py-5" style={{borderColor, backgroundColor: darkMode ? 'rgba(61, 79, 95, 0.6)' : 'rgba(255, 255, 255, 0.6)'}}>
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20" style={{background: '#547A95'}}></div>
          <div className="relative flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" style={{color: textColor, fontFamily: 'Geist, sans-serif'}}>
                {activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h1>
              <p className="text-sm mt-1" style={{color: mutedColor}}>
                {activeTab === 'dashboard' ? 'Overview of your content' : `Manage your ${activeTab}`}
              </p>
            </div>
            {activeTab !== 'dashboard' && activeTab !== 'contacts' && activeTab !== 'newsletter' && (
              <button
                onClick={() => openModal()}
                className="relative group px-6 py-3 rounded-xl font-medium text-white overflow-hidden transition-transform hover:scale-105 active:scale-95"
                style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', boxShadow: '0 4px 15px rgba(194, 165, 109, 0.3)'}}
              >
                <span className="relative flex items-center gap-2">
                  <Plus size={20} />
                  Add New
                </span>
              </button>
            )}
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div 
                    key={i} 
                    className="relative group rounded-2xl p-6 transition-transform hover:scale-[1.02] hover:-translate-y-1 card-corporate"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{background: stat.color}}></div>
                    <div className="relative">
                      <div className="text-5xl font-bold mb-2" style={{color: stat.color, fontFamily: 'Geist, sans-serif'}}>{stat.value}</div>
                      <div className="text-sm font-medium" style={{color: mutedColor}}>{stat.label}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{background: `linear-gradient(90deg, ${stat.color}, transparent)`}}></div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="rounded-2xl p-6 glass border card-corporate">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(194, 165, 109, 0.15)'}}>
                      <MessageSquare size={20} style={{color: accent}} />
                    </div>
                    <h3 className="text-xl font-bold" style={{color: textColor, fontFamily: 'Geist, sans-serif'}}>Recent Contacts</h3>
                  </div>
                  <div className="space-y-3">
                    {data.contacts.slice(0, 5).map(contact => (
                      <div key={contact.id} className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-black/5" style={{backgroundColor: bgColor}}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{backgroundColor: 'linear-gradient(135deg, #C2A56D, #D4B87A)', color: '#2C3947'}}>
                            {contact.name?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium" style={{color: textColor}}>{contact.name}</div>
                            <div className="text-sm" style={{color: mutedColor}}>{contact.email}</div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${contact.read ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {contact.read ? 'Read' : 'New'}
                        </span>
                      </div>
                    ))}
                    {data.contacts.length === 0 && (
                      <p className="text-center py-8" style={{color: mutedColor}}>No contacts yet</p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl p-6 glass border card-corporate">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(84, 122, 149, 0.15)'}}>
                      <Mail size={20} style={{color: '#547A95'}} />
                    </div>
                    <h3 className="text-xl font-bold" style={{color: textColor, fontFamily: 'Geist, sans-serif'}}>Recent Subscribers</h3>
                  </div>
                  <div className="space-y-3">
                    {data.newsletter.slice(0, 5).map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-black/5" style={{backgroundColor: bgColor}}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{backgroundColor: '#547A95'}}>
                            {sub.email?.charAt(0)}
                          </div>
                          <span style={{color: textColor}} className="font-medium">{sub.email}</span>
                        </div>
                        <span style={{color: mutedColor}} className="text-sm">{sub.date}</span>
                      </div>
                    ))}
                    {data.newsletter.length === 0 && (
                      <p className="text-center py-8" style={{color: mutedColor}}>No subscribers yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="rounded-2xl overflow-hidden glass border card-corporate">
              <table className="w-full">
                <thead>
                  <tr style={{backgroundColor: bgColor}}>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.contacts.map(contact => (
                    <tr key={contact.id} className="border-t transition-all hover:bg-black/5" style={{borderColor}}>
                      <td className="px-6 py-4" style={{color: textColor}}>{contact.name}</td>
                      <td className="px-6 py-4" style={{color: mutedColor}}>{contact.email}</td>
                      <td className="px-6 py-4 max-w-xs truncate" style={{color: mutedColor}}>{contact.message}</td>
                      <td className="px-6 py-4" style={{color: mutedColor}}>{contact.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${contact.read ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {contact.read ? 'Read' : 'New'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.contacts.length === 0 && (
                <p className="text-center py-12" style={{color: mutedColor}}>No contacts found</p>
              )}
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="rounded-2xl overflow-hidden glass border card-corporate">
              <table className="w-full">
                <thead>
                  <tr style={{backgroundColor: bgColor}}>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Subscribed Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: mutedColor}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.newsletter.map(sub => (
                    <tr key={sub.id} className="border-t transition-all hover:bg-black/5" style={{borderColor}}>
                      <td className="px-6 py-4" style={{color: textColor}}>{sub.email}</td>
                      <td className="px-6 py-4" style={{color: mutedColor}}>{sub.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${sub.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {sub.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.newsletter.length === 0 && (
                <p className="text-center py-12" style={{color: mutedColor}}>No subscribers found</p>
              )}
            </div>
          )}

          {(activeTab === 'services' || activeTab === 'portfolio' || activeTab === 'blogs' || activeTab === 'users' || activeTab === 'roles') && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data[activeTab]?.map(item => (
                <div key={item.id} className="group relative rounded-2xl p-6 glass border card-corporate transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.05), transparent)'}}></div>
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'linear-gradient(90deg, #C2A56D, #D4B87A)'}}></div>
                  
                  <div className="relative flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg" style={{color: textColor, fontFamily: 'Geist, sans-serif'}}>
                      {item.title || item.name || item.client || item.role || 'Untitled'}
                    </h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(item)} className="p-2 rounded-lg transition-all hover:bg-[#C2A56D]/20 hover:scale-110" style={{color: '#C2A56D'}}>
                        <Edit size={16} />
                      </button>
                      {activeTab !== 'services' && (
                        <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 rounded-lg transition-all hover:bg-red-500/20 hover:scale-110" style={{color: '#ef4444'}}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {activeTab === 'portfolio' && (
                    <div className="space-y-2">
                      <p className="text-sm" style={{color: mutedColor}}>{item.client}</p>
                      {item.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2 py-1 rounded-lg text-xs font-medium" style={{backgroundColor: bgColor, color: '#547A95'}}>{tech}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm mt-2 italic" style={{color: mutedColor}}>"{item.clientReview}"</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: '#C2A56D'}}>
                          {item.clientName?.charAt(0)}
                        </div>
                        <span className="text-sm" style={{color: textColor}}>{item.clientName}</span>
                        <span className="text-xs" style={{color: mutedColor}}>• {item.clientRole}</span>
                      </div>
                    </div>
                  )}
                  {activeTab === 'blogs' && item.excerpt && (
                    <p className="text-sm mb-3 line-clamp-2" style={{color: mutedColor}}>{item.excerpt}</p>
                  )}
                  {activeTab === 'users' && (
                    <div className="space-y-2">
                      <p className="text-sm" style={{color: mutedColor}}>{item.email}</p>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor: 'rgba(84, 122, 149, 0.15)', color: '#547A95'}}>{item.role}</span>
                    </div>
                  )}
                  {activeTab === 'roles' && (
                    <div>
                      <p className="text-sm mb-3" style={{color: mutedColor}}>{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.permissions?.map((perm, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg text-xs font-medium" style={{backgroundColor: bgColor, color: '#547A95'}}>{perm}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-4 ${item.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowModal(false); setEditItem(null) }}></div>
          <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden glass border card-corporate" style={{backgroundColor: darkMode ? 'rgba(61, 79, 95, 0.95)' : 'rgba(255, 255, 255, 0.95)', borderColor}}>
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30" style={{background: '#547A95'}}></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-20" style={{background: '#C2A56D'}}></div>
            
            <div className="relative p-6 border-b flex justify-between items-center" style={{borderColor}}>
              <div>
                <h2 className="text-2xl font-bold" style={{color: textColor, fontFamily: 'Geist, sans-serif'}}>
                  {editItem ? 'Edit' : 'Add'} {activeTab === 'portfolio' ? 'Portfolio' : activeTab.slice(0, -1)}
                </h2>
                <p className="text-sm" style={{color: mutedColor}}>
                  {editItem ? 'Update the existing item' : 'Create a new item'}
                </p>
              </div>
              <button onClick={() => { setShowModal(false); setEditItem(null) }} className="p-3 rounded-xl transition-all hover:bg-black/10 hover:scale-110" style={{color: mutedColor}}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {activeTab === 'services' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Title</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Description</label>
                    <textarea value={formData.desc || ''} onChange={(e) => setFormData({...formData, desc: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Icon</label>
                    <select value={formData.icon || 'TrendingUp'} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}}>
                      <option value="TrendingUp">TrendingUp</option>
                      <option value="Search">Search</option>
                      <option value="PenTool">PenTool</option>
                      <option value="Monitor">Monitor</option>
                      <option value="MessageSquare">MessageSquare</option>
                      <option value="BarChart3">BarChart3</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'portfolio' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Project Title</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Client Name</label>
                      <input type="text" value={formData.client || ''} onChange={(e) => setFormData({...formData, client: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Client Logo</label>
                      <div className="flex items-center gap-2">
                        <input type="text" value={formData.clientLogo || ''} onChange={(e) => setFormData({...formData, clientLogo: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                        <label className="px-4 py-3 rounded-xl cursor-pointer transition-all hover:scale-105" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', color: '#2C3947'}}>
                          <Upload size={16} />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'clientLogo')} />
                        </label>
                      </div>
                      {uploading && <span className="text-xs mt-1" style={{color: accent}}>Uploading...</span>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Technologies (comma separated)</label>
                    <input type="text" value={(formData.technologies || []).join(', ')} onChange={(e) => setFormData({...formData, technologies: e.target.value.split(',').map(t => t.trim())})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} placeholder="React, Node.js, MongoDB" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Problem Statement</label>
                      <textarea value={formData.problem || ''} onChange={(e) => setFormData({...formData, problem: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="3" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Solution</label>
                      <textarea value={formData.solution || ''} onChange={(e) => setFormData({...formData, solution: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="3" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Results</label>
                    <textarea value={formData.results || ''} onChange={(e) => setFormData({...formData, results: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="2" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Leads %</label>
                      <input type="text" value={formData.metrics?.leads || ''} onChange={(e) => setFormData({...formData, metrics: {...formData.metrics, leads: e.target.value}})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Conversion %</label>
                      <input type="text" value={formData.metrics?.conversion || ''} onChange={(e) => setFormData({...formData, metrics: {...formData.metrics, conversion: e.target.value}})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Revenue</label>
                      <input type="text" value={formData.metrics?.revenue || ''} onChange={(e) => setFormData({...formData, metrics: {...formData.metrics, revenue: e.target.value}})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-4" style={{borderColor}}>
                    <h4 className="font-bold mb-3" style={{color: textColor}}>Client Review</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Client Name</label>
                        <input type="text" value={formData.clientName || ''} onChange={(e) => setFormData({...formData, clientName: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Client Role</label>
                        <input type="text" value={formData.clientRole || ''} onChange={(e) => setFormData({...formData, clientRole: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Client Review</label>
                      <textarea value={formData.clientReview || ''} onChange={(e) => setFormData({...formData, clientReview: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="3" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Client Avatar</label>
                        <div className="flex items-center gap-2">
                          <input type="text" value={formData.clientAvatar || ''} onChange={(e) => setFormData({...formData, clientAvatar: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                          <label className="px-4 py-3 rounded-xl cursor-pointer transition-all hover:scale-105" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', color: '#2C3947'}}>
                            <Upload size={16} />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'clientAvatar')} />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Rating (1-5)</label>
                        <input type="number" min="1" max="5" value={formData.rating || 5} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'blogs' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Blog Title</label>
                    <input type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Heading</label>
                      <input type="text" value={formData.heading || ''} onChange={(e) => setFormData({...formData, heading: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Sub Heading</label>
                      <input type="text" value={formData.subHeading || ''} onChange={(e) => setFormData({...formData, subHeading: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Slug</label>
                      <input type="text" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Category</label>
                      <input type="text" value={formData.category || 'General'} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Tags (comma separated)</label>
                    <input type="text" value={(formData.tags || []).join(', ')} onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} placeholder="SEO, Marketing, Content" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Excerpt</label>
                    <textarea value={formData.excerpt || ''} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="2" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Content (HTML supported)</label>
                    <textarea value={formData.content || ''} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="8" style={{backgroundColor: bgColor, borderColor, color: textColor}} placeholder="<p>Your blog content here...</p>" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Featured Image</label>
                    <div className="flex items-center gap-2">
                      <input type="text" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                      <label className="px-4 py-3 rounded-xl cursor-pointer transition-all hover:scale-105" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', color: '#2C3947'}}>
                        <Upload size={16} />
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'image')} />
                      </label>
                    </div>
                    {uploading && <span className="text-xs mt-1" style={{color: accent}}>Uploading...</span>}
                  </div>
                  <div className="border-t pt-4 mt-4" style={{borderColor}}>
                    <h4 className="font-bold mb-3" style={{color: textColor}}>SEO Settings</h4>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Meta Title</label>
                      <input type="text" value={formData.metaTitle || ''} onChange={(e) => setFormData({...formData, metaTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Meta Description</label>
                      <textarea value={formData.metaDescription || ''} onChange={(e) => setFormData({...formData, metaDescription: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" rows="2" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Meta Keywords</label>
                      <input type="text" value={formData.metaKeywords || ''} onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} placeholder="keyword1, keyword2, keyword3" />
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Read Time</label>
                      <input type="text" value={formData.readTime || '5 min read'} onChange={(e) => setFormData({...formData, readTime: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'users' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Name</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Email</label>
                    <input type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Password {editItem && '(leave empty to keep current)'}</label>
                    <input type="password" value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Role</label>
                    <select value={formData.role || ''} onChange={(e) => {
                      const selectedRole = data.roles.find(r => r.name === e.target.value)
                      setFormData({
                        ...formData, 
                        role: e.target.value,
                        permissions: selectedRole?.permissions || []
                      })
                    }} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required>
                      <option value="">Select Role</option>
                      {data.roles.map(role => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Permissions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {permissionsList.map(perm => (
                        <label key={perm.id} className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all hover:bg-black/5" style={{backgroundColor: bgColor}}>
                          <input 
                            type="checkbox" 
                            checked={(formData.permissions || []).includes(perm.id)} 
                            onChange={(e) => {
                              const newPerms = e.target.checked 
                                ? [...(formData.permissions || []), perm.id]
                                : (formData.permissions || []).filter(p => p !== perm.id)
                              setFormData({...formData, permissions: newPerms})
                            }}
                            className="rounded"
                          />
                          <span style={{color: textColor}}>{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'roles' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Role Name</label>
                    <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Description</label>
                    <input type="text" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 transition-all" style={{backgroundColor: bgColor, borderColor, color: textColor}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: mutedColor}}>Permissions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {permissionsList.map(perm => (
                        <label key={perm.id} className="flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all hover:bg-black/5" style={{backgroundColor: bgColor}}>
                          <input 
                            type="checkbox" 
                            checked={(formData.permissions || []).includes(perm.id)} 
                            onChange={(e) => {
                              const newPerms = e.target.checked 
                                ? [...(formData.permissions || []), perm.id]
                                : (formData.permissions || []).filter(p => p !== perm.id)
                              setFormData({...formData, permissions: newPerms})
                            }}
                            className="rounded"
                          />
                          <span style={{color: textColor}}>{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-inherit">
                <button type="submit" className="flex-1 text-white py-3 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', boxShadow: '0 4px 15px rgba(194, 165, 109, 0.3)'}}>
                  <span className="flex items-center justify-center gap-2" style={{color: '#2C3947'}}>
                    <Save size={18} />
                    {editItem ? 'Update' : 'Create'}
                  </span>
                </button>
                <button type="button" onClick={() => { setShowModal(false); setEditItem(null) }} className="flex-1 py-3 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]" style={{backgroundColor: bgColor, color: mutedColor}}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}