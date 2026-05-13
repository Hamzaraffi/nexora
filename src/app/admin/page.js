'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Eye,
  Users,
  MessageSquare,
  TrendingUp,
  Clock
} from 'lucide-react'

const stats = [
  { label: 'Total Pages', value: '4', icon: FileText, change: '+0 this week' },
  { label: 'Total Views', value: '12.4K', icon: Eye, change: '+15% this month' },
  { label: 'Subscribers', value: '234', icon: Users, change: '+12 this week' },
  { label: 'Messages', value: '18', icon: MessageSquare, change: '3 unread' },
]

const recentActivity = [
  { action: 'Page updated', item: 'Home', time: '2 hours ago', user: 'Admin' },
  { action: 'New subscriber', item: 'john@example.com', time: '5 hours ago', user: 'System' },
  { action: 'Message received', item: 'from sarah@company.com', time: '1 day ago', user: 'System' },
  { action: 'Page created', item: 'Portfolio', time: '3 days ago', user: 'Admin' },
]

const quickActions = [
  { label: 'Create New Page', href: '/admin/pages/new', color: 'bg-[#C2A56D]' },
  { label: 'Upload Media', href: '/admin/media', color: 'bg-[#547A95]' },
  { label: 'View Messages', href: '/admin/contact', color: 'bg-[#2C3947]' },
]

export default function AdminDashboard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Dashboard</h1>
        <p className="text-[#7A8FA6]">Welcome back! Here's what's happening with your site.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#243447] rounded-xl p-6 border border-[#2C3947]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2C3947] flex items-center justify-center">
                <stat.icon size={20} className="text-[#C2A56D]" />
              </div>
              <span className="text-xs text-[#7A8FA6] px-2 py-1 bg-[#2C3947] rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#E8EDF2] mb-1">{stat.value}</h3>
            <p className="text-sm text-[#7A8FA6]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#243447] rounded-xl p-6 border border-[#2C3947]"
        >
          <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-[#2C3947] last:border-0">
                <div className="w-8 h-8 rounded-full bg-[#2C3947] flex items-center justify-center">
                  <Clock size={14} className="text-[#7A8FA6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#E8EDF2]">
                    {activity.action}: <span className="text-[#C2A56D]">{activity.item}</span>
                  </p>
                  <p className="text-xs text-[#7A8FA6]">{activity.user} · {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#243447] rounded-xl p-6 border border-[#2C3947]"
        >
          <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={`block px-4 py-3 rounded-lg text-[#E8EDF2] text-sm font-medium ${action.color} hover:opacity-90 transition-opacity`}
              >
                {action.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}