'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useTheme } from '../../components/ThemeProvider'
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

const socialIcons = { facebook: Facebook, twitter: Twitter, instagram: Instagram, linkedin: Linkedin, youtube: Youtube }

export default function ContactPage() {
  const { darkMode } = useTheme()
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const [settings, setSettings] = useState(null)

  const bgColor = darkMode ? '#1A2634' : '#E8EDF2'
  const surfaceColor = darkMode ? '#243447' : '#FFFFFF'
  const textPrimary = darkMode ? '#E8EDF2' : '#2C3947'
  const textSecondary = darkMode ? '#94A3B8' : '#547A95'
  const accent = '#C2A56D'

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d)).catch(() => {})
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('sending')
    try {
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).catch(() => {})
      const res = await fetch('https://formspree.io/f/xeenpvjw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', service: '', message: '' })
        setTimeout(() => setFormStatus(null), 3000)
      } else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: settings?.email || 'hello@nexora.com' },
    { icon: Phone, label: 'Phone', value: settings?.phone || '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: settings?.address || 'San Francisco, CA 94102' },
  ]

  return (
    <div className="min-h-screen" style={{backgroundColor: bgColor, color: textPrimary}}>
      <Navigation />

      <section className="relative pt-40 pb-24 px-6 lg:px-16 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'mesh-corporate-dark' : 'mesh-corporate'}`} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <span className="text-sm font-medium tracking-wide uppercase mono" style={{color: accent}}>Get in Touch</span>
            <h1 className="text-5xl lg:text-6xl font-bold mt-4">Contact <span className="gradient-text-corporate">Us</span></h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto" style={{color: textSecondary}}>Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(84, 122, 149, 0.1)'}}>
                      <item.icon style={{color: accent}} size={22} />
                    </div>
                    <div>
                      <p className="text-sm" style={{color: textSecondary}}>{item.label}</p>
                      <p className="font-medium text-lg" style={{color: textPrimary}}>{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {settings && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4 mt-10">
                  {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].filter(k => settings[k]).map((key) => {
                    const Icon = socialIcons[key]
                    return (
                      <a key={key} href={settings[key]} target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{backgroundColor: 'rgba(194, 165, 109, 0.15)', color: accent}}>
                        <Icon size={18} />
                      </a>
                    )
                  })}
                </motion.div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="card-corporate p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-6" style={{color: textPrimary}}>Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: textPrimary}}>Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-4 rounded-xl border outline-none transition-all focus:border-[#C2A56D]"
                        style={{backgroundColor: darkMode ? '#2C3947' : '#E8EDF2', borderColor: 'rgba(84, 122, 149, 0.2)', color: textPrimary}}
                        placeholder="John Doe" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{color: textPrimary}}>Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-4 rounded-xl border outline-none transition-all focus:border-[#C2A56D]"
                        style={{backgroundColor: darkMode ? '#2C3947' : '#E8EDF2', borderColor: 'rgba(84, 122, 149, 0.2)', color: textPrimary}}
                        placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: textPrimary}}>Service</label>
                    <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-4 rounded-xl border outline-none transition-all focus:border-[#C2A56D]"
                      style={{backgroundColor: darkMode ? '#2C3947' : '#E8EDF2', borderColor: 'rgba(84, 122, 149, 0.2)', color: textPrimary}}>
                      <option value="">Select a service</option>
                      <option>Digital Marketing</option>
                      <option>SEO Optimization</option>
                      <option>Content Creation</option>
                      <option>Web Design</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{color: textPrimary}}>Message</label>
                    <textarea rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-4 rounded-xl border outline-none transition-all focus:border-[#C2A56D] resize-none"
                      style={{backgroundColor: darkMode ? '#2C3947' : '#E8EDF2', borderColor: 'rgba(84, 122, 149, 0.2)', color: textPrimary}}
                      placeholder="Tell us about your project..." required />
                  </div>
                  {formStatus === 'success' && (
                    <div className="p-4 rounded-xl text-center font-medium" style={{backgroundColor: 'rgba(194, 165, 109, 0.15)', color: accent}}>Message sent successfully!</div>
                  )}
                  {formStatus === 'error' && (
                    <div className="p-4 rounded-xl text-center font-medium" style={{backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}>Something went wrong. Please try again.</div>
                  )}
                  <button type="submit" className="btn-corporate w-full flex items-center justify-center gap-2">
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}