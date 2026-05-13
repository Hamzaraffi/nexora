'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { useTheme } from '../../components/ThemeProvider'
import { ArrowRight, Clock, Calendar, PenTool, Send } from 'lucide-react'

export default function BlogPage() {
  const { darkMode } = useTheme()
  const [blogs, setBlogs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch('/api/blogs').then(r => r.json()).then(setBlogs)
  }, [])

  const categories = ['All', ...new Set(blogs.map(b => b.category))]
  const filteredBlogs = selectedCategory === 'All' ? blogs : blogs.filter(b => b.category === selectedCategory)

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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="inline-block text-sm font-medium tracking-wide uppercase mb-6 mono" style={{color: accent}}>
              Our Blog
            </span>
            <h1 className="text-display mb-6" style={{color: textPrimary}}>
              Latest<br />
              <span className="gradient-text-corporate">Insights</span>
            </h1>
            <p className="text-body max-w-2xl mx-auto" style={{color: textSecondary}}>
              Expert tips, strategies, and insights to help you stay ahead in the digital marketing world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 lg:px-16 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: selectedCategory === category ? accent : surfaceColor,
                  color: selectedCategory === category ? '#2C3947' : textSecondary,
                  boxShadow: selectedCategory === category ? '0 4px 20px rgba(194, 165, 109, 0.3)' : 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6 lg:px-16" style={{backgroundColor: surfaceColor}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="card-corporate h-full flex flex-col">
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-6" style={{background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.1), rgba(84, 122, 149, 0.05))'}}>
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PenTool size={48} style={{color: 'rgba(84, 122, 149, 0.3)'}} />
                        </div>
                      )}
                      <span className="absolute top-4 left-4 px-4 py-2 rounded-xl text-sm font-medium" style={{backgroundColor: accent, color: '#2C3947'}}>
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="flex items-center gap-2 text-sm mono" style={{color: textSecondary}}>
                          <Calendar size={14} /> {post.date}
                        </span>
                        <span className="flex items-center gap-2 text-sm mono" style={{color: textSecondary}}>
                          <Clock size={14} /> {post.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-[#C2A56D] transition-colors" style={{color: textPrimary}}>
                        {post.title}
                      </h2>
                      
                      <p className="flex-1 text-sm line-clamp-2 mb-4" style={{color: textSecondary}}>
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 font-medium group-hover:gap-3 transition-all" style={{color: accent}}>
                        Read More <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 lg:px-16 relative overflow-hidden" style={{backgroundColor: '#2C3947'}}>
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #C2A56D, #D4B87A)'}} />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full" style={{background: '#E8EDF2'}} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-headline text-white mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8" style={{color: '#3D4F5F'}}>Get the latest digital marketing insights delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl outline-none focus:ring-4 transition-all"
              style={{backgroundColor: '#E8EDF2', color: '#2C3947'}}
              required
            />
            <button type="submit" className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2" style={{backgroundColor: '#2C3947', color: '#E8EDF2'}}>
              <Send size={18} /> Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}