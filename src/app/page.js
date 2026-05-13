'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useTheme } from '../components/ThemeProvider'
import { 
  ArrowRight, Send, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram,
  ChevronRight, Zap, Shield, Users, CheckCircle
} from 'lucide-react'

export default function Home() {
  const { darkMode } = useTheme()
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [blogs, setBlogs] = useState([])
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    fetch('/api/portfolio').then(r => r.json()).then(setPortfolio).catch(() => {})
    fetch('/api/blogs').then(r => r.json()).then(setBlogs).catch(() => {})
  }, [])

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', service: '', message: '' })
        setTimeout(() => setFormStatus(null), 3000)
      } else setFormStatus('error')
    } catch { setFormStatus('error') }
  }

  const bgColor = darkMode ? '#1A2634' : '#E8EDF2'
  const surfaceColor = darkMode ? '#243447' : '#FFFFFF'
  const textPrimary = darkMode ? '#E8EDF2' : '#2C3947'
  const textSecondary = darkMode ? '#94A3B8' : '#547A95'
  const accent = '#C2A56D'

  const features = [
    { icon: Zap, title: 'Fast & Efficient', desc: 'Quick turnaround without compromise' },
    { icon: Shield, title: 'Transparent', desc: 'Clear reporting always' },
    { icon: Users, title: 'Dedicated Team', desc: 'Your own support squad' },
  ]

  return (
    <div ref={containerRef} className="min-h-screen" style={{backgroundColor: bgColor, color: textPrimary}}>
      <Navigation />

      {/* Hero Section - 3D Floating Shapes Design */}
      <header className="relative min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'mesh-corporate-dark' : 'mesh-corporate'}`} />
        
        {/* 3D Floating Abstract Shapes */}
        <div className="float-container absolute inset-0 pointer-events-none">
          <motion.div 
            className="float-shape float-shape-1"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{top: '10%', right: '5%'}}
          />
          <motion.div 
            className="float-shape float-shape-2"
            animate={{ 
              y: [0, 25, 0],
              rotate: [0, -10, 0],
              x: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            style={{bottom: '15%', left: '15%'}}
          />
          <motion.div 
            className="float-shape float-shape-3"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{top: '35%', right: '25%'}}
          />
          {/* Extra 3D Elements */}
          <motion.div 
            className="float-shape"
            style={{
              width: '100px',
              height: '100px',
              top: '60%',
              left: '5%',
              background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.3), rgba(194, 165, 109, 0.1))',
              border: '1px solid rgba(194, 165, 109, 0.4)',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
            }}
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="float-shape"
            style={{
              width: '80px',
              height: '80px',
              top: '20%',
              left: '30%',
              background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.25), rgba(84, 122, 149, 0.1))',
              border: '1px solid rgba(84, 122, 149, 0.3)',
              borderRadius: '40% 60% 60% 40% / 40% 60% 40% 60%'
            }}
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 20, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="inline-block text-sm font-medium tracking-wide uppercase mb-6 mono" style={{color: accent}}>
                Digital Marketing Agency
              </span>
              
              <h1 className="text-display mb-6" style={{color: textPrimary}}>
                Transform<br />
                <span className="gradient-text-corporate">Your Digital</span><br />
                <span>Presence</span>
              </h1>
              
              <p className="text-body max-w-lg mb-10" style={{color: textSecondary}}>
                Strategic digital marketing that drives measurable growth. We don't just market—we build lasting connections with your audience.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/#contact" className="btn-corporate flex items-center gap-2">
                  Start Your Project <ArrowRight size={18} />
                </Link>
                <Link href="/portfolio" className="btn-outline-corporate flex items-center gap-2">
                  View Our Work <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual - 3D Floating Shapes Container */}
            <div className="hidden lg:flex justify-end items-center relative h-full">
              <div className="relative w-[500px] h-[500px]">
                {/* Large Circle with 3D Effect */}
                <motion.div 
                  animate={{ y: [0, -25, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 right-0 w-80 h-80 rounded-full glass-corporate-3d border-2 flex items-center justify-center"
                  style={{
                    borderColor: 'rgba(194, 165, 109, 0.4)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 60px rgba(194, 165, 109, 0.15), inset 0 -20px 40px rgba(194, 165, 109, 0.1)'
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.15), transparent)'}}>
                    <div className="text-center">
                      <motion.div 
                        className="text-7xl font-bold gradient-text-corporate mb-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        250%
                      </motion.div>
                      <p className="text-sm mono" style={{color: textSecondary}}>Average Growth</p>
                    </div>
                  </div>
                </motion.div>

                {/* Small Floating Circle */}
                <motion.div 
                  animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-24 left-0 w-48 h-48 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.25), rgba(84, 122, 149, 0.1))',
                    border: '1px solid rgba(84, 122, 149, 0.4)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 40px rgba(84, 122, 149, 0.1)'
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <CheckCircle size={36} style={{color: accent}} />
                  </div>
                </motion.div>

                {/* Medium Organic Shape */}
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/3 left-1/4 w-44 h-44 rounded-[40%_60%_60%_40%] glass-corporate-3d"
                  style={{
                    border: '1px solid rgba(194, 165, 109, 0.5)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 50px rgba(194, 165, 109, 0.2)'
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.2), transparent)'}}>
                    <Shield size={32} style={{color: accent}} />
                  </div>
                </motion.div>

                {/* Floating Gold Accent Badge */}
                <motion.div 
                  animate={{ y: [0, 25, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-0 right-16 px-6 py-4 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #C2A56D, #D4B87A)',
                    boxShadow: '0 15px 50px rgba(194, 165, 109, 0.4), 0 0 30px rgba(194, 165, 109, 0.2)'
                  }}
                >
                  <div className="text-xl font-bold" style={{color: '#2C3947'}}>+500 Projects</div>
                </motion.div>

                {/* Additional Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0], x: [0, -15, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 left-0 w-16 h-16 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.3), rgba(194, 165, 109, 0.1))',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                  }}
                />
                <motion.div 
                  animate={{ y: [0, 18, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-40 right-0 w-20 h-20 rounded-[30%_70%_70%_30%]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.2), rgba(84, 122, 149, 0.1))',
                    border: '1px solid rgba(84, 122, 149, 0.3)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section - Bento Grid */}
      <section className="py-24 px-6 lg:px-16 relative" style={{backgroundColor: surfaceColor}}>
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(194, 165, 109, 0.1) 0%, transparent 50%)'
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <h2 className="text-headline mb-4" style={{color: textPrimary}}>Our Impact</h2>
              <p className="text-body" style={{color: textSecondary}}>Numbers that speak for themselves</p>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { number: '500+', label: 'Projects Completed' },
                  { number: '98%', label: 'Client Satisfaction' },
                  { number: '150+', label: 'Happy Clients' },
                  { number: '12+', label: 'Years Experience' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    className="card-corporate text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold mb-2 gradient-text-corporate">{stat.number}</div>
                    <div className="text-sm" style={{color: textSecondary}}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-16 relative" style={{backgroundColor: bgColor}}>
        <div className="absolute inset-0">
          <div className="float-container absolute inset-0 pointer-events-none opacity-50">
            <motion.div 
              className="float-shape"
              style={{
                width: '200px',
                height: '200px',
                top: '20%',
                right: '10%',
                background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.1), transparent)',
                border: '1px solid rgba(194, 165, 109, 0.2)'
              }}
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="float-shape"
              style={{
                width: '150px',
                height: '150px',
                bottom: '30%',
                left: '5%',
                background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.1), transparent)',
                border: '1px solid rgba(84, 122, 149, 0.2)'
              }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <span className="text-sm font-medium tracking-wide uppercase mono" style={{color: accent}}>Why Choose Us</span>
              <h2 className="text-headline mt-4" style={{color: textPrimary}}>What Sets<br />Us Apart</h2>
            </div>
            <div className="flex items-end">
              <p className="text-body" style={{color: textSecondary}}>
                We combine strategic thinking with creative execution to deliver results that matter. Our approach is data-driven, transparent, and focused on your long-term success.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring' }}
              >
                <div className="card-corporate h-full group">
                  <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{color: textPrimary}}>{feature.title}</h3>
                  <p style={{color: textSecondary}}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 lg:px-16 relative" style={{backgroundColor: surfaceColor}}>
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(at 80% 20%, rgba(84, 122, 149, 0.15) 0%, transparent 50%)'
        }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-sm font-medium tracking-wide uppercase mono" style={{color: accent}}>Portfolio</span>
              <h2 className="text-headline mt-4" style={{color: textPrimary}}>Success Stories</h2>
            </div>
            <Link href="/portfolio" className="btn-outline-corporate flex items-center gap-2">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href="/portfolio" className="group block">
                  <div className="card-corporate p-8 transition-all group-hover:scale-[1.02]">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2" style={{color: textPrimary}}>{item.title}</h3>
                      <p style={{color: textSecondary}}>{item.client}</p>
                    </div>
                    <div className="text-3xl font-bold mb-4 gradient-text-corporate">{item.results}</div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies?.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor: 'rgba(84, 122, 149, 0.1)', color: textSecondary}}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6 lg:px-16 relative" style={{backgroundColor: bgColor}}>
        <div className="absolute inset-0">
          <div className="float-container absolute inset-0 pointer-events-none opacity-30">
            <motion.div 
              className="float-shape"
              style={{
                width: '180px',
                height: '180px',
                top: '50%',
                right: '5%',
                background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.1), transparent)',
                borderRadius: '50%'
              }}
              animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-sm font-medium tracking-wide uppercase mono" style={{color: accent}}>Insights</span>
              <h2 className="text-headline mt-4" style={{color: textPrimary}}>Latest from the Blog</h2>
            </div>
            <Link href="/blog" className="btn-outline-corporate flex items-center gap-2">
              Read More <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="card-corporate h-full flex flex-col">
                    <div className="h-48 rounded-2xl mb-6 overflow-hidden" style={{background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.15), rgba(84, 122, 149, 0.05))'}}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-bold" style={{color: 'rgba(84, 122, 149, 0.3)'}}>{post.category?.charAt(0)}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium self-start mb-4" style={{backgroundColor: 'rgba(194, 165, 109, 0.15)', color: accent}}>
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#C2A56D] transition-colors" style={{color: textPrimary}}>
                      {post.title}
                    </h3>
                    <p className="flex-1 text-sm line-clamp-2 mb-4" style={{color: textSecondary}}>{post.excerpt}</p>
                    <p className="text-xs mono" style={{color: textSecondary}}>{post.readTime}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-16 relative overflow-hidden" style={{backgroundColor: surfaceColor}}>
        <div className="absolute inset-0 mesh-corporate opacity-30" />
        <div className="absolute inset-0">
          <motion.div 
            className="float-shape"
            style={{
              width: '300px',
              height: '300px',
              top: '-100px',
              right: '-100px',
              background: 'linear-gradient(135deg, rgba(194, 165, 109, 0.1), transparent)',
              borderRadius: '50%'
            }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity }}
          />
          <motion.div 
            className="float-shape"
            style={{
              width: '200px',
              height: '200px',
              bottom: '-50px',
              left: '-50px',
              background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.1), transparent)',
              borderRadius: '50%'
            }}
            animate={{ rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-sm font-medium tracking-wide uppercase mono" style={{color: accent}}>Get in Touch</span>
              <h2 className="text-headline mt-4 mb-8" style={{color: textPrimary}}>
                Ready to<br />
                <span className="gradient-text-corporate">Grow?</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@nexora.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: MapPin, label: 'Location', value: 'San Francisco, CA 94102' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: 'rgba(84, 122, 149, 0.1)'}}>
                      <item.icon style={{color: accent}} size={20} />
                    </div>
                    <div>
                      <p className="text-sm" style={{color: textSecondary}}>{item.label}</p>
                      <p className="font-medium" style={{color: textPrimary}}>{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{backgroundColor: 'rgba(194, 165, 109, 0.15)', color: accent}}
                    whileHover={{ y: -5 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-corporate p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-6" style={{color: textPrimary}}>Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
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
                    <textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
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