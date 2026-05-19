'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useTheme } from '../../components/ThemeProvider'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const { darkMode } = useTheme()
  const [cmsData, setCmsData] = useState({ hero: null, stats: null, features: null, team: null, cta: null })

  useEffect(() => {
    fetch('/api/pages?slug=about').then(r => r.json()).then(data => {
      if (data?.sections) {
        setCmsData({
          hero: data.sections.find(s => s.type === 'hero')?.content || null,
          stats: data.sections.find(s => s.type === 'stats')?.content || null,
          features: data.sections.find(s => s.type === 'features')?.content || null,
          team: data.sections.find(s => s.type === 'team')?.content || null,
          cta: data.sections.find(s => s.type === 'cta')?.content || null,
        })
      }
    }).catch(() => {})
  }, [])

  const hero = cmsData.hero || {}
  const stats = cmsData.stats?.items || []
  const values = cmsData.features?.items || []
  const team = cmsData.team?.items || []
  const cta = cmsData.cta || {}

  const bgColor = darkMode ? '#1A2634' : '#E8EDF2'
  const surfaceColor = darkMode ? '#243447' : '#FFFFFF'
  const textPrimary = darkMode ? '#E8EDF2' : '#2C3947'
  const textSecondary = darkMode ? '#94A3B8' : '#547A95'
  const accent = '#C2A56D'

  return (
    <div className="min-h-screen" style={{backgroundColor: bgColor, color: textPrimary}}>
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'mesh-corporate-dark' : 'mesh-corporate'}`} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}>
            <span className="inline-block text-sm font-medium tracking-wide uppercase mb-6 mono" style={{color: accent}}>About Us</span>
            <h1 className="text-display mb-6" style={{color: textPrimary}}>
              {hero.headline || 'About Nexora'}
            </h1>
            <p className="text-body max-w-3xl mx-auto" style={{color: textSecondary}}>
              {hero.subheadline || 'A team of passionate digital marketers, creative designers, and tech innovators.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="py-16 px-6 lg:px-16" style={{backgroundColor: '#2C3947'}}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, type: 'spring' }} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2" style={{color: accent}}>{stat.number}</div>
                  <div className="text-sm font-medium" style={{color: '#E8EDF2'}}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {values.length > 0 && (
        <section className="py-24 px-6 lg:px-16" style={{backgroundColor: surfaceColor}}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-wide uppercase mono mb-4 block" style={{color: accent}}>Our Values</span>
              <h2 className="text-headline" style={{color: textPrimary}}>What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="card-corporate h-full">
                    <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}}>
                      <span className="text-white text-lg font-bold">{value.title?.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{color: textPrimary}}>{value.title}</h3>
                    <p style={{color: textSecondary}}>{value.description || value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="py-24 px-6 lg:px-16" style={{backgroundColor: bgColor}}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium tracking-wide uppercase mono mb-4 block" style={{color: accent}}>Our Team</span>
              <h2 className="text-headline" style={{color: textPrimary}}>Meet the Team</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                  <div className="relative mb-6 inline-block">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl p-1 transition-transform group-hover:scale-105" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}}>
                      <div className="w-full h-full rounded-xl flex items-center justify-center" style={{backgroundColor: surfaceColor}}>
                        <span className="text-4xl lg:text-5xl font-bold" style={{color: accent}}>{member.initials || member.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{backgroundColor: '#2C3947'}}>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold" style={{color: textPrimary}}>{member.name}</h3>
                  <p className="text-sm" style={{color: textSecondary}}>{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 relative overflow-hidden" style={{backgroundColor: '#2C3947'}}>
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-headline text-white mb-6">{cta.headline || 'Ready to Start Your Project?'}</h2>
          <a href={cta.buttonLink || '/#contact'} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105" style={{backgroundColor: '#2C3947', color: '#E8EDF2'}}>
            {cta.buttonText || 'Get in Touch'} <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}