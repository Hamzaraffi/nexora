'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useTheme } from '../../components/ThemeProvider'
import { TrendingUp, Search, PenTool, Monitor, MessageSquare, BarChart3, CheckCircle, ArrowRight, Zap } from 'lucide-react'

const iconMap = { TrendingUp, Search, PenTool, Monitor, MessageSquare, BarChart3 }

export default function ServicesPage() {
  const { darkMode } = useTheme()
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(setServices)
  }, [])

  const features = [
    'Data-Driven Strategies',
    'ROI-Focused Campaigns',
    'Transparent Reporting',
    '24/7 Support',
    'Custom Solutions',
    'Proven Results'
  ]

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
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-medium tracking-wide uppercase mb-6 mono" style={{color: accent}}>
              Our Services
            </span>
            <h1 className="text-display mb-6" style={{color: textPrimary}}>
              Digital Marketing<br />
              <span className="gradient-text-corporate">Services</span>
            </h1>
            <p className="text-body max-w-2xl" style={{color: textSecondary}}>
              Comprehensive digital solutions tailored to your unique business needs. We help you grow, engage, and convert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 lg:px-16" style={{backgroundColor: surfaceColor}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const IconComponent = iconMap[service.icon] || TrendingUp
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                >
                  <div className="card-corporate h-full group">
                    <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{color: textPrimary}}>{service.title}</h3>
                    <p className="mb-6" style={{color: textSecondary}}>{service.desc}</p>
                    <a href="/#contact" className="inline-flex items-center gap-2 font-medium transition-all group-hover:gap-3" style={{color: accent}}>
                      Learn More <ArrowRight size={18} />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-16" style={{backgroundColor: bgColor}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium tracking-wide uppercase mono mb-4 block" style={{color: accent}}>Why Choose Us</span>
              <h2 className="text-headline mt-4 mb-8" style={{color: textPrimary}}>
                We Deliver<br />Results That Matter
              </h2>
              <p className="text-body mb-8" style={{color: textSecondary}}>
                Our team combines creativity with data-driven strategies to deliver measurable results. We don't just market your brand—we build lasting relationships.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(194, 165, 109, 0.15)'}}>
                      <CheckCircle size={16} style={{color: accent}} />
                    </div>
                    <span className="font-medium" style={{color: textPrimary}}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', boxShadow: '0 20px 60px rgba(194, 165, 109, 0.3)'}}>
                <div className="p-12 text-center">
                  <Zap size={48} className="mx-auto mb-4" style={{color: '#2C3947'}} />
                  <h3 className="text-3xl font-bold mb-2" style={{color: '#2C3947'}}>Ready to Start?</h3>
                  <p className="mb-6" style={{color: '#3D4F5F'}}>Schedule a free consultation today</p>
                  <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105" style={{backgroundColor: '#2C3947', color: '#E8EDF2'}}>
                    Book a Call <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full" style={{background: 'rgba(194, 165, 109, 0.2)'}} />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}