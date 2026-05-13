'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowRight, Instagram, Linkedin, Twitter, Mail } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navigation() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { scrollYProgress } = useScroll()

  if (pathname?.startsWith('/admin')) return null
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
  ]

  const textPrimary = darkMode ? '#E8EDF2' : '#2C3947'
  const textSecondary = darkMode ? '#7A8FA6' : '#547A95'
  const accent = '#C2A56D'

  const sidebarVariants = {
    closed: { x: '-100%', opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  const overlayVariants = {
    closed: { opacity: 0, display: 'none' },
    open: { opacity: 1, display: 'block' }
  }

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.05 }
    })
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left"
        style={{
          scaleX,
          background: darkMode 
            ? 'linear-gradient(90deg, #1A2634 0%, #C2A56D 100%)' 
            : 'linear-gradient(90deg, #2C3947 0%, #C2A56D 100%)'
        }}
      />

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: darkMode ? 'rgba(26, 38, 52, 0.9)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: `1px solid ${darkMode ? 'rgba(194, 165, 109, 0.1)' : 'rgba(194, 165, 109, 0.15)'}`
        }}
      >
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(84, 122, 149, 0.08) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(194, 165, 109, 0.05) 0%, transparent 70%)',
              transform: 'translate(50%, -50%)'
            }}
          />
        </div>

        {/* Navigation Content */}
        <div className="relative flex justify-between items-center h-20 px-6 lg:px-12">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="relative w-10 h-10 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4">
                <motion.span
                  animate={sidebarOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="absolute top-0 left-0 w-full h-0.5 rounded-full"
                  style={{ backgroundColor: textPrimary }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={sidebarOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 rounded-full"
                  style={{ backgroundColor: textPrimary }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={sidebarOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                  style={{ backgroundColor: textPrimary }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>

            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div 
                  className="w-full h-full rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #2C3947, #1A2634)' }}
                >
                  <span className="text-xl font-bold tracking-tight" style={{ color: '#E8EDF2' }}>N</span>
                </div>
                <motion.div 
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #C2A56D, #D4B87A)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span 
                className="text-xl font-bold tracking-tight hidden sm:block"
                style={{ color: textPrimary }}
              >
                Nexora
              </span>
            </Link>
          </div>

          

          {/* Right: Nav Links + CTA */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-2 text-sm font-medium tracking-wide transition-colors group"
                style={{ color: pathname === item.href ? textPrimary : textSecondary }}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Gold dot indicator */}
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: accent }}
                  initial={{ scale: 0 }}
                  animate={pathname === item.href ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
                
                {/* Underline animation */}
                <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    style={{ backgroundColor: accent }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </Link>
            ))}

            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ 
                backgroundColor: darkMode ? 'rgba(232, 237, 242, 0.08)' : 'rgba(84, 122, 149, 0.08)',
                color: textPrimary
              }}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link 
              href="/#contact"
              className="relative group px-6 py-2.5 rounded-full text-sm font-semibold overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #C2A56D, #D4B87A)',
                color: '#1A2634'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0"
                style={{ 
                  background: 'linear-gradient(135deg, #D4B87A, #C2A56D)',
                  boxShadow: '0 0 0px rgba(194, 165, 109, 0)'
                }}
                whileHover={{ 
                  boxShadow: '0 0 30px rgba(194, 165, 109, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>

          {/* Mobile: CTA Button */}
          <Link 
            href="/#contact"
            className="md:hidden relative group px-4 py-2 rounded-full text-sm font-semibold"
            style={{ 
              background: 'linear-gradient(135deg, #C2A56D, #D4B87A)',
              color: '#1A2634'
            }}
          >
            <span className="relative z-10">Start</span>
          </Link>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 z-[56] w-80 overflow-hidden"
            style={{
              backgroundColor: darkMode ? 'rgba(26, 38, 52, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRight: `1px solid ${darkMode ? 'rgba(194, 165, 109, 0.1)' : 'rgba(194, 165, 109, 0.15)'}`
            }}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-8 pb-6" style={{ borderBottom: `1px solid ${darkMode ? 'rgba(232, 237, 242, 0.08)' : 'rgba(84, 122, 149, 0.1)'}` }}>
              <Link 
                href="/" 
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative w-12 h-12">
                  <div 
                    className="w-full h-full rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2C3947, #1A2634)' }}
                  >
                    <span className="text-2xl font-bold tracking-tight" style={{ color: '#E8EDF2' }}>N</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #C2A56D, #D4B87A)' }} />
                </div>
                <span className="text-xl font-bold tracking-tight" style={{ color: darkMode ? '#E8EDF2' : '#2C3947' }}>Nexora</span>
              </Link>
              
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: darkMode ? 'rgba(232, 237, 242, 0.08)' : 'rgba(84, 122, 149, 0.08)', color: textSecondary }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-8 space-y-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="relative flex items-center gap-4 py-4 px-4 rounded-xl transition-all group"
                    style={{
                      backgroundColor: pathname === item.href ? 'rgba(194, 165, 109, 0.1)' : 'transparent',
                      color: pathname === item.href ? accent : textSecondary
                    }}
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    
                    {/* Active indicator */}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="sidebarActive"
                        className="absolute left-0 w-1 h-6 rounded-r-full"
                        style={{ backgroundColor: accent }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    <ArrowRight 
                      size={16} 
                      className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      style={{ color: accent }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-8" style={{ borderTop: `1px solid ${darkMode ? 'rgba(232, 237, 242, 0.08)' : 'rgba(84, 122, 149, 0.1)'}` }}>
              <div className="mb-6">
                <p className="text-sm mb-4" style={{ color: textSecondary }}>Get in touch</p>
                <a 
                  href="mailto:hello@nexora.com" 
                  className="flex items-center gap-3 text-base font-medium mb-4 transition-colors hover:text-[#C2A56D]"
                  style={{ color: darkMode ? '#E8EDF2' : '#2C3947' }}
                >
                  <Mail size={18} style={{ color: accent }} />
                  hello@nexora.com
                </a>
              </div>
              
              <div className="flex gap-3">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-[#C2A56D]/10"
                    style={{ 
                      backgroundColor: darkMode ? 'rgba(232, 237, 242, 0.08)' : 'rgba(84, 122, 149, 0.08)',
                      color: textSecondary
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}