'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useTheme } from '../../components/ThemeProvider'
import { Star, ArrowRight, Code, Lightbulb, TrendingUp, Quote } from 'lucide-react'

export default function PortfolioPage() {
  const { darkMode } = useTheme()
  const [portfolio, setPortfolio] = useState([])

  useEffect(() => {
    fetch('/api/portfolio').then(r => r.json()).then(d => setPortfolio(Array.isArray(d) ? d : [])).catch(() => {
      setPortfolio([])
    })
  }, [])

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
          >
            <span className="inline-block text-sm font-medium tracking-wide uppercase mb-6 mono" style={{color: accent}}>
              Our Portfolio
            </span>
            <h1 className="text-display mb-6" style={{color: textPrimary}}>
              Success<br />
              <span className="gradient-text-corporate">Stories</span>
            </h1>
            <p className="text-body max-w-2xl" style={{color: textSecondary}}>
              Explore our latest projects and see how we've helped businesses achieve their digital marketing goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Items */}
      <section className="py-24 px-6 lg:px-16" style={{backgroundColor: surfaceColor}}>
        <div className="max-w-7xl mx-auto space-y-24">
          {portfolio.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  {item.clientLogo && (
                    <img src={item.clientLogo} alt={item.client} className="w-14 h-14 rounded-xl object-contain p-2" style={{backgroundColor: bgColor}} />
                  )}
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold" style={{color: textPrimary}}>{item.title}</h3>
                    <p style={{color: textSecondary}}>{item.client}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {item.technologies?.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl text-sm font-medium" style={{backgroundColor: 'rgba(84, 122, 149, 0.1)', color: textSecondary}}>
                      <Code size={14} className="inline mr-1" /> {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-6 mb-8">
                  <div className="p-6 rounded-2xl card-corporate">
                    <div className="flex items-center gap-3 mb-3">
                      <Lightbulb size={20} style={{color: accent}} />
                      <span className="font-bold" style={{color: textPrimary}}>The Problem</span>
                    </div>
                    <p style={{color: textSecondary}}>{item.problem}</p>
                  </div>

                  <div className="p-6 rounded-2xl card-corporate">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp size={20} style={{color: accent}} />
                      <span className="font-bold" style={{color: textPrimary}}>Our Solution</span>
                    </div>
                    <p style={{color: textSecondary}}>{item.solution}</p>
                  </div>

                  <div className="p-6 rounded-2xl border-2" style={{backgroundColor: 'rgba(194, 165, 109, 0.05)', borderColor: 'rgba(194, 165, 109, 0.2)'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <Star size={20} style={{color: accent}} fill="currentColor" />
                      <span className="font-bold" style={{color: textPrimary}}>The Results</span>
                    </div>
                    <p className="text-3xl font-bold mb-4 gradient-text-corporate">{item.results}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {Object.entries(item.metrics || {}).map(([key, value]) => (
                        <div key={key} className="text-center p-3 rounded-xl" style={{backgroundColor: bgColor}}>
                          <div className="text-2xl font-bold" style={{color: accent}}>{value}</div>
                          <div className="text-xs capitalize mono" style={{color: textSecondary}}>{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {item.clientReview && (
                  <div className="p-6 rounded-2xl border-l-4 card-corporate" style={{borderColor: accent}}>
                    <Quote size={32} className="mb-4" style={{color: accent, opacity: 0.5}} />
                    <p className="italic mb-4" style={{color: textSecondary}}>"{item.clientReview}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold" style={{backgroundColor: 'linear-gradient(135deg, #C2A56D, #D4B87A)', color: '#2C3947'}}>
                        {item.clientName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold" style={{color: textPrimary}}>{item.clientName}</p>
                        <p className="text-sm" style={{color: textSecondary}}>{item.clientRole}</p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={16} style={{color: idx < item.rating ? accent : '#ccc'}} fill={idx < item.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={i % 2 === 1 ? 'lg:row-start-1' : ''}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-3xl p-1" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)', boxShadow: '0 20px 60px rgba(194, 165, 109, 0.3)'}}>
                    <div className="w-full h-full rounded-[2.5rem] flex items-center justify-center" style={{backgroundColor: surfaceColor}}>
                      <div className="text-center p-8">
                        {item.clientLogo ? (
                          <img src={item.clientLogo} alt={item.client} className="w-32 h-32 object-contain mx-auto" />
                        ) : (
                          <span className="text-9xl font-bold" style={{color: 'rgba(194, 165, 109, 0.3)'}}>
                            {item.client?.charAt(0)}
                          </span>
                        )}
                        <p className="mt-4 font-medium" style={{color: textSecondary}}>Project Showcase</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full" style={{background: 'rgba(194, 165, 109, 0.2)'}} />
                  <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full" style={{background: 'rgba(84, 122, 149, 0.1)'}} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 relative overflow-hidden" style={{backgroundColor: '#2C3947'}}>
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}} />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full" style={{background: '#E8EDF2'}} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-headline text-white mb-6">Want to Be Our Next Success Story?</h2>
          <p className="text-xl mb-8" style={{color: '#3D4F5F'}}>Let's discuss how we can help transform your business.</p>
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105" style={{backgroundColor: '#2C3947', color: '#E8EDF2'}}>
            Start Your Project <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}