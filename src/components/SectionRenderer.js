'use client'

import { motion } from 'framer-motion'

const typeComponents = {
  hero: HeroSection,
  text: TextSection,
  'card-grid': CardGridSection,
  stats: StatsSection,
  cta: CtaSection,
}

export default function SectionRenderer({ section, index }) {
  const Component = typeComponents[section.type]

  if (!Component) {
    return (
      <div className="p-4 bg-[#2C3947] rounded-lg">
        <p className="text-[#7A8FA6]">Unknown section type: {section.type}</p>
      </div>
    )
  }

  const content = typeof section.content === 'string' && section.content.trim()
    ? JSON.parse(section.content)
    : (section.content || {})

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Component content={content} />
    </motion.div>
  )
}

function HeroSection({ content }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#1A2634]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2634] via-[#243447] to-[#1A2634]" />
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#C2A56D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#547A95]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-[#E8EDF2] mb-6 leading-tight"
        >
          {content.headline || 'Welcome'}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-[#7A8FA6] mb-8 max-w-2xl mx-auto"
        >
          {content.subheadline || ''}
        </motion.p>
        
        {content.ctaText && (
          <motion.a
            href={content.ctaLink || '#'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C2A56D] text-[#1A2634] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {content.ctaText}
            <span>→</span>
          </motion.a>
        )}
      </div>
    </section>
  )
}

function TextSection({ content }) {
  return (
    <section className="py-20 bg-[#1A2634]">
      <div className="max-w-3xl mx-auto px-6">
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content || '' }}
        />
      </div>
    </section>
  )
}

function CardGridSection({ content }) {
  const columns = content.columns || 3
  
  return (
    <section className="py-20 bg-[#243447]">
      <div className="max-w-6xl mx-auto px-6">
        {content.title && (
          <h2 className="text-3xl font-bold text-[#E8EDF2] mb-12 text-center">
            {content.title}
          </h2>
        )}
        
        <div className={`grid grid-cols-1 gap-8 ${columns >= 2 ? 'md:grid-cols-2' : ''} ${columns >= 3 ? 'lg:grid-cols-3' : ''}`}>
          {(content.cards || []).map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-[#1A2634] rounded-xl border border-[#2C3947] hover:border-[#C2A56D]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#2C3947] flex items-center justify-center mb-4">
                <span className="text-2xl">{getIconEmoji(card.icon)}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#E8EDF2] mb-2">{card.title}</h3>
              <p className="text-[#7A8FA6]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection({ content }) {
  return (
    <section className="py-20 bg-[#1A2634]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {(content.items || []).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#C2A56D] mb-2">
                {item.number}
              </div>
              <div className="text-[#7A8FA6]">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection({ content }) {
  return (
    <section className="py-20 bg-gradient-to-r from-[#243447] to-[#2C3947]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#E8EDF2] mb-4">
          {content.headline || 'Ready to get started?'}
        </h2>
        <p className="text-xl text-[#7A8FA6] mb-8">
          {content.subheadline || ''}
        </p>
        {content.buttonText && (
          <a
            href={content.buttonLink || '#'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C2A56D] text-[#1A2634] rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {content.buttonText}
            <span>→</span>
          </a>
        )}
      </div>
    </section>
  )
}

function getIconEmoji(icon) {
  const icons = {
    Zap: '⚡',
    Shield: '🛡️',
    Users: '👥',
    Target: '🎯',
    Award: '🏆',
    Heart: '❤️',
    TrendingUp: '📈',
    Search: '🔍',
    PenTool: '✍️',
    Monitor: '🖥️',
    MessageSquare: '💬',
    BarChart3: '📊',
    Star: '⭐',
    Clock: '⏰',
    Check: '✅',
    Settings: '⚙️',
  }
  return icons[icon] || '📌'
}