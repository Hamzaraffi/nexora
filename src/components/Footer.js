'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin, Youtube } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Footer() {
  const { darkMode } = useTheme()
  const bgColor = darkMode ? '#1A2634' : '#2C3947'
  const textPrimary = '#E8EDF2'
  const textSecondary = '#94A3B8'
  const accent = '#C2A56D'
  
  const [settings, setSettings] = useState({
    siteName: 'Nexora',
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
    const cached = localStorage.getItem('nexora_settings')
    if (cached) {
      try { setSettings(JSON.parse(cached)) } catch (e) {}
    }
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data)
        localStorage.setItem('nexora_settings', JSON.stringify(data))
      })
      .catch(() => {})
  }, [])

  const socialLinks = [
    { icon: Facebook, key: 'facebook', label: 'Facebook' },
    { icon: Twitter, key: 'twitter', label: 'Twitter' },
    { icon: Instagram, key: 'instagram', label: 'Instagram' },
    { icon: Linkedin, key: 'linkedin', label: 'LinkedIn' },
    { icon: Youtube, key: 'youtube', label: 'YouTube' }
  ]

  return (
    <footer className="relative overflow-hidden" style={{backgroundColor: bgColor}}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          radial-gradient(at 20% 80%, rgba(194, 165, 109, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 20%, rgba(84, 122, 149, 0.2) 0px, transparent 50%)
        `
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <div className="w-full h-full rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #E8EDF2, #C2A56D)'}}>
                  <span className="text-2xl font-bold" style={{color: '#2C3947'}}>N</span>
                </div>
              </div>
              <span className="text-2xl font-bold" style={{color: textPrimary}}>{settings.siteName}</span>
            </div>
            <p className="mb-6" style={{color: textSecondary, lineHeight: '1.7'}}>
              Transforming brands through strategic digital marketing. We create meaningful connections between businesses and their audiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, key, label }) => (
                settings[key] ? (
                  <a 
                    key={key} 
                    href={settings[key]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110" 
                    style={{backgroundColor: 'rgba(194, 165, 109, 0.15)', color: accent}}
                    title={label}
                  >
                    <Icon size={18} />
                  </a>
                ) : null
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6" style={{color: textPrimary}}>Quick Links</h4>
            <div className="space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/about', label: 'About' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/blog', label: 'Blog' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block transition-colors hover:text-[#C2A56D]" style={{color: textSecondary}}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6" style={{color: textPrimary}}>Services</h4>
            <div className="space-y-4">
              {[
                { label: 'Digital Marketing Strategy', href: '/services' },
                { label: 'Search Engine Optimization', href: '/services' },
                { label: 'Content Marketing', href: '/services' },
                { label: 'Social Media Management', href: '/services' },
                { label: 'Brand Development', href: '/services' },
              ].map((service) => (
                <a key={service.label} href={service.href} className="block transition-colors hover:text-[#C2A56D]" style={{color: textSecondary}}>
                  {service.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6" style={{color: textPrimary}}>Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={20} style={{color: accent, marginTop: '2px'}} />
                <span style={{color: textSecondary}}>{settings.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} style={{color: accent, marginTop: '2px'}} />
                <span style={{color: textSecondary}}>{settings.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} style={{color: accent, marginTop: '2px'}} />
                <span style={{color: textSecondary}}>{settings.address}</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t" style={{borderColor: 'rgba(232, 237, 242, 0.1)'}}>
              <p className="text-sm mb-4" style={{color: textSecondary}}>Subscribe to our newsletter</p>
              <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset() }} className="flex gap-2">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg outline-none transition-all"
                  style={{backgroundColor: 'rgba(232, 237, 242, 0.1)', color: textPrimary, border: '1px solid rgba(232, 237, 242, 0.2)'}}
                />
                <button type="submit" className="px-4 py-3 rounded-lg transition-all hover:scale-105" style={{backgroundColor: accent, color: '#2C3947'}}>
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{borderColor: 'rgba(232, 237, 242, 0.1)'}}>
          <p className="text-sm" style={{color: textSecondary}}>
            © 2026 {settings.siteName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/#contact" className="text-sm transition-colors hover:text-[#C2A56D]" style={{color: textSecondary}}>Privacy Policy</a>
            <a href="/#contact" className="text-sm transition-colors hover:text-[#C2A56D]" style={{color: textSecondary}}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}