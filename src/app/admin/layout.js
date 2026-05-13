'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Users,
  BarChart3,
  MessageSquare,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Pages', href: '/admin/pages' },
  { icon: Image, label: 'Media', href: '/admin/media' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: MessageSquare, label: 'Contact', href: '/admin/contact' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#1A2634] flex">
      <aside
        className={`${collapsed ? 'w-[70px]' : 'w-[260px]'} bg-[#243447] border-r border-[#2C3947] flex flex-col transition-all duration-300`}
      >
        <div className="p-5 border-b border-[#2C3947]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#C2A56D] flex items-center justify-center">
              <span className="text-[#1A2634] font-bold text-sm">N</span>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E8EDF2] font-semibold text-lg"
              >
                Nexora
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-[#7A8FA6] hover:text-[#E8EDF2] hover:bg-[#2C3947] transition-all group"
            >
              <item.icon size={20} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[#2C3947]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#7A8FA6] hover:text-[#E8EDF2] hover:bg-[#2C3947] transition-all"
          >
            <ExternalLink size={20} />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                View Site
              </motion.span>
            )}
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-[#243447] border-b border-[#2C3947] px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
          >
            <ChevronRight size={20} className={`transform transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[#7A8FA6] text-sm">admin@nexora.com</span>
            <div className="w-8 h-8 rounded-full bg-[#C2A56D] flex items-center justify-center">
              <span className="text-[#1A2634] font-bold text-xs">A</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}