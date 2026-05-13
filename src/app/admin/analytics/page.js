'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Eye, Clock, Download } from 'lucide-react'

const analyticsData = {
  overview: [
    { label: 'Total Visitors', value: '24.5K', change: '+12%', icon: Users },
    { label: 'Page Views', value: '89.2K', change: '+8%', icon: Eye },
    { label: 'Avg. Session', value: '4m 32s', change: '+15%', icon: Clock },
    { label: 'Bounce Rate', value: '32%', change: '-5%', icon: TrendingUp },
  ],
  pages: [
    { path: '/', views: 12450, avgTime: '2m 15s' },
    { path: '/services', views: 8320, avgTime: '1m 45s' },
    { path: '/about', views: 5680, avgTime: '3m 20s' },
    { path: '/portfolio', views: 4210, avgTime: '2m 10s' },
    { path: '/blog', views: 3890, avgTime: '4m 05s' },
  ]
}

export default function AnalyticsPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Analytics</h1>
        <p className="text-[#7A8FA6]">Track your website performance and user engagement.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.overview.map((stat, i) => (
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
              <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#E8EDF2] mb-1">{stat.value}</h3>
            <p className="text-sm text-[#7A8FA6]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#243447] rounded-xl border border-[#2C3947] overflow-hidden">
        <div className="p-6 border-b border-[#2C3947] flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#E8EDF2]">Top Pages</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2C3947] rounded-lg text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors">
            <Download size={16} /> Export
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2C3947]">
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Page</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Views</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Avg. Time</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.pages.map((page, i) => (
              <motion.tr
                key={page.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-[#2C3947] last:border-0"
              >
                <td className="px-6 py-4">
                  <code className="text-sm text-[#C2A56D] bg-[#2C3947] px-2 py-1 rounded">{page.path}</code>
                </td>
                <td className="px-6 py-4 text-[#E8EDF2]">{page.views.toLocaleString()}</td>
                <td className="px-6 py-4 text-[#7A8FA6]">{page.avgTime}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-[#243447] rounded-xl border border-[#2C3947] p-6">
        <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Traffic Sources</h3>
        <div className="space-y-4">
          {[
            { source: 'Direct', visits: 8950, percent: 42 },
            { source: 'Organic Search', visits: 6820, percent: 32 },
            { source: 'Social Media', visits: 3450, percent: 16 },
            { source: 'Referral', visits: 2180, percent: 10 },
          ].map((item) => (
            <div key={item.source}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E8EDF2]">{item.source}</span>
                <span className="text-sm text-[#7A8FA6]">{item.visits.toLocaleString()} ({item.percent}%)</span>
              </div>
              <div className="h-2 bg-[#2C3947] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #C2A56D, #D4B87A)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}