'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Mail, Phone, CheckCircle, Clock, Search } from 'lucide-react'

const mockContacts = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', phone: '+1 555-0123', company: 'Tech Corp', message: 'Interested in your digital marketing services. Can we schedule a call?', date: '2 hours ago', read: false },
  { id: 2, name: 'Mike Chen', email: 'mike@startup.io', phone: '+1 555-0456', company: 'Startup.io', message: 'Looking for SEO optimization for our new website.', date: '1 day ago', read: false },
  { id: 3, name: 'Emily Davis', email: 'emily@design.co', phone: '+1 555-0789', company: 'Design Co', message: 'Need help with content creation for our blog.', date: '3 days ago', read: true },
  { id: 4, name: 'John Smith', email: 'john@agency.net', phone: '+1 555-0234', company: 'Agency Net', message: 'Inquiry about social media management pricing.', date: '1 week ago', read: true },
]

export default function ContactPage() {
  const [contacts, setContacts] = useState(mockContacts)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const markAsRead = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, read: true } : c))
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Contact Messages</h1>
        <p className="text-[#7A8FA6]">Manage incoming messages from your website visitors.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#243447] rounded-xl border border-[#2C3947] overflow-hidden">
          <div className="p-4 border-b border-[#2C3947]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8FA6]" />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D] text-sm"
              />
            </div>
          </div>
          <div className="divide-y divide-[#2C3947]">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => { setSelected(contact); markAsRead(contact.id) }}
                className={`w-full p-4 text-left hover:bg-[#2C3947] transition-colors ${selected?.id === contact.id ? 'bg-[#2C3947]' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!contact.read && <div className="w-2 h-2 rounded-full bg-[#C2A56D]" />}
                  <span className="text-sm font-medium text-[#E8EDF2]">{contact.name}</span>
                </div>
                <p className="text-xs text-[#7A8FA6] truncate">{contact.message}</p>
                <span className="text-xs text-[#7A8FA6] mt-1 block">{contact.date}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#243447] rounded-xl border border-[#2C3947]">
          {selected ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#E8EDF2]">{selected.name}</h3>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${selected.read ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {selected.read ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {selected.read ? 'Read' : 'New'}
                </span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#7A8FA6]" />
                  <a href={`mailto:${selected.email}`} className="text-sm text-[#C2A56D] hover:underline">{selected.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#7A8FA6]" />
                  <a href={`tel:${selected.phone}`} className="text-sm text-[#E8EDF2]">{selected.phone}</a>
                </div>
              </div>
              <div className="bg-[#2C3947] rounded-xl p-4">
                <p className="text-[#E8EDF2]">{selected.message}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 px-4 py-2 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90">
                  <Mail size={16} /> Reply
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-24">
              <MessageSquare size={48} className="text-[#7A8FA6] mb-4" />
              <p className="text-[#7A8FA6]">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}