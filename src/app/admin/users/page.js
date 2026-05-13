'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Search, Edit2, Trash2, Shield, MoreVertical } from 'lucide-react'

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@nexora.com', role: 'Administrator', status: 'active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Sarah Editor', email: 'sarah@nexora.com', role: 'Editor', status: 'active', lastLogin: '1 day ago' },
  { id: 3, name: 'Mike Writer', email: 'mike@nexora.com', role: 'Writer', status: 'active', lastLogin: '3 days ago' },
  { id: 4, name: 'Emily Guest', email: 'emily@nexora.com', role: 'Guest', status: 'inactive', lastLogin: '2 weeks ago' },
]

export default function UsersPage() {
  const [users] = useState(mockUsers)
  const [search, setSearch] = useState('')

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Users</h1>
          <p className="text-[#7A8FA6]">Manage your team members and their permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 transition-opacity">
          <UserPlus size={18} /> Add User
        </button>
      </motion.div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8FA6]" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#243447] border border-[#2C3947] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D]"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#243447] rounded-xl border border-[#2C3947] overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2C3947]">
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">User</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Role</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Status</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Last Login</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-[#7A8FA6] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-[#2C3947] last:border-0 hover:bg-[#2C3947]/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C2A56D] flex items-center justify-center">
                      <span className="text-[#1A2634] font-bold text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-[#E8EDF2] font-medium">{user.name}</p>
                      <p className="text-xs text-[#7A8FA6]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#2C3947] text-[#E8EDF2]">
                    <Shield size={12} /> {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                    user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#7A8FA6]">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-[#2C3947] text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-500/20 text-[#7A8FA6] hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[#7A8FA6]">No users found.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}