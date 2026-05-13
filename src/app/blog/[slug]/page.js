'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import { useTheme } from '../../../components/ThemeProvider'
import { Clock, Calendar, ArrowLeft, Share2, Twitter, Linkedin, Facebook, ArrowRight } from 'lucide-react'

export default function BlogPostPage() {
  const params = useParams()
  const { darkMode } = useTheme()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then(data => {
        const found = data.find(b => b.slug === params.slug)
        setBlog(found)
        if (found) {
          setRelatedBlogs(data.filter(b => b.id !== found.id && b.category === found.category).slice(0, 3))
        }
      })
  }, [params.slug])

  const bgColor = darkMode ? '#1A2634' : '#E8EDF2'
  const surfaceColor = darkMode ? '#243447' : '#FFFFFF'
  const textPrimary = darkMode ? '#E8EDF2' : '#2C3947'
  const textSecondary = darkMode ? '#94A3B8' : '#547A95'
  const accent = '#C2A56D'

  if (!blog) {
    return (
      <div style={{backgroundColor: bgColor, minHeight: '100vh'}} className="flex items-center justify-center">
        <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{borderColor: accent, borderTopColor: 'transparent'}}></div>
      </div>
    )
  }

  return (
    <div style={{backgroundColor: bgColor, color: textPrimary, minHeight: '100vh'}}>
      <Navigation />
      
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 font-medium transition-colors hover:text-[#C2A56D]" style={{color: accent}}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>

          <div className="mb-8">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{backgroundColor: 'rgba(194, 165, 109, 0.15)', color: accent}}>
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: textPrimary}}>
              {blog.title}
            </h1>
            
            {blog.heading && (
              <h2 className="text-2xl font-semibold mb-4" style={{color: textSecondary}}>
                {blog.heading}
              </h2>
            )}
            
            {blog.subHeading && (
              <p className="text-xl mb-6" style={{color: textSecondary}}>
                {blog.subHeading}
              </p>
            )}

            <div className="flex items-center gap-6 py-4 border-y" style={{borderColor: 'rgba(84, 122, 149, 0.2)'}}>
              <span className="flex items-center gap-2 text-sm mono" style={{color: textSecondary}}>
                <Calendar size={16} /> {blog.date}
              </span>
              <span className="flex items-center gap-2 text-sm mono" style={{color: textSecondary}}>
                <Clock size={16} /> {blog.readTime}
              </span>
              <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg transition-colors" style={{backgroundColor: surfaceColor, color: textSecondary}}>
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-12" style={{background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.1), rgba(84, 122, 149, 0.05))'}}>
            {blog.image ? (
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl font-bold" style={{color: 'rgba(84, 122, 149, 0.3)'}}>{blog.category?.charAt(0)}</span>
              </div>
            )}
          </div>

          <div 
            className="prose max-w-none mb-12"
            style={{color: textSecondary}}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="flex flex-wrap gap-2 mb-12">
            {blog.tags?.map((tag, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm mono" style={{backgroundColor: surfaceColor, color: textSecondary}}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 p-6 rounded-xl card-corporate">
            <span style={{color: textSecondary}}>Share this article:</span>
            <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110" style={{backgroundColor: '#1DA1F2'}}>
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110" style={{backgroundColor: '#0A66C2'}}>
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110" style={{backgroundColor: '#1877F2'}}>
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </article>

      {relatedBlogs.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: surfaceColor}}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8" style={{color: textPrimary}}>Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="card-corporate">
                    <div className="aspect-video rounded-xl mb-4 overflow-hidden" style={{background: 'linear-gradient(135deg, rgba(84, 122, 149, 0.1), rgba(84, 122, 149, 0.05))'}}>
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl font-bold" style={{color: 'rgba(84, 122, 149, 0.3)'}}>{post.category?.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold group-hover:text-[#C2A56D] transition-colors mb-2" style={{color: textPrimary}}>{post.title}</h3>
                    <p className="text-sm line-clamp-2" style={{color: textSecondary}}>{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium" style={{color: accent}}>
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}