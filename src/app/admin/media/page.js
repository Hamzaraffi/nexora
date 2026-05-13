'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image, Trash2, Copy, Search, Folder } from 'lucide-react'

const mockMedia = [
  { id: 1, name: 'hero-image.jpg', type: 'image', size: '2.4 MB', url: '/uploads/hero.jpg' },
  { id: 2, name: 'logo.svg', type: 'image', size: '45 KB', url: '/uploads/logo.svg' },
  { id: 3, name: 'team-photo.jpg', type: 'image', size: '1.8 MB', url: '/uploads/team.jpg' },
  { id: 4, name: 'document.pdf', type: 'file', size: '890 KB', url: '/uploads/doc.pdf' },
  { id: 5, name: 'background.png', type: 'image', size: '3.2 MB', url: '/uploads/bg.png' },
]

export default function MediaPage() {
  const [media] = useState(mockMedia)
  const [search, setSearch] = useState('')

  const filteredMedia = media.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Media Library</h1>
          <p className="text-[#7A8FA6]">Upload and manage your media files.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 transition-opacity">
          <Upload size={18} /> Upload Files
        </button>
      </motion.div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8FA6]" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#243447] border border-[#2C3947] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMedia.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#243447] rounded-xl border border-[#2C3947] overflow-hidden group hover:border-[#C2A56D] transition-colors"
          >
            <div className="aspect-square bg-[#2C3947] flex items-center justify-center relative">
              {item.type === 'image' ? (
                <Image size={40} className="text-[#7A8FA6]" />
              ) : (
                <Folder size={40} className="text-[#7A8FA6]" />
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button className="p-1.5 bg-[#1A2634] rounded-lg text-[#7A8FA6] hover:text-[#E8EDF2]">
                  <Copy size={14} />
                </button>
                <button className="p-1.5 bg-[#1A2634] rounded-lg text-[#7A8FA6] hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-[#E8EDF2] truncate">{item.name}</p>
              <p className="text-xs text-[#7A8FA6]">{item.size}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-[#243447] rounded-xl border border-[#2C3947]">
          <Image size={48} className="mx-auto text-[#7A8FA6] mb-4" />
          <p className="text-[#7A8FA6]">No media files found.</p>
        </div>
      )}
    </div>
  )
}