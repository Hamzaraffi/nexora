'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Globe, Bell, Shield, Palette, Save } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#E8EDF2] mb-2">Settings</h1>
        <p className="text-[#7A8FA6]">Manage your website settings and configurations.</p>
      </motion.div>

      <div className="flex gap-6">
        <div className="w-64 shrink-0">
          <div className="bg-[#243447] rounded-xl border border-[#2C3947] p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-[#C2A56D] text-[#1A2634]' 
                    : 'text-[#7A8FA6] hover:text-[#E8EDF2] hover:bg-[#2C3947]'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[#243447] rounded-xl border border-[#2C3947] p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">General Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Website Name</label>
                  <input type="text" defaultValue="Nexora" className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Tagline</label>
                  <input type="text" defaultValue="Digital Marketing Agency" className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Contact Email</label>
                  <input type="email" defaultValue="hello@nexora.com" className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">SEO Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Default Meta Title</label>
                  <input type="text" defaultValue="Nexora | Digital Marketing Agency" className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Default Meta Description</label>
                  <textarea rows={3} defaultValue="Professional digital marketing, SEO, and content creation services." className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D] resize-none" />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications for new contacts', enabled: true },
                    { label: 'Email notifications for new subscribers', enabled: true },
                    { label: 'Weekly analytics report', enabled: false },
                    { label: 'Product updates and announcements', enabled: false },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#2C3947] rounded-lg">
                      <span className="text-sm text-[#E8EDF2]">{setting.label}</span>
                      <button className={`w-12 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-[#C2A56D]' : 'bg-[#3a4a5c]'}`}>
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Security Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#E8EDF2] mb-4">Appearance Settings</h3>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Primary Color</label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg" style={{ background: '#C2A56D' }} />
                    <input type="text" defaultValue="#C2A56D" className="flex-1 px-4 py-3 bg-[#2C3947] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8EDF2] mb-2">Logo</label>
                  <div className="border-2 border-dashed border-[#3a4a5c] rounded-lg p-8 text-center">
                    <p className="text-[#7A8FA6] mb-2">Drag and drop or click to upload</p>
                    <button className="px-4 py-2 bg-[#2C3947] rounded-lg text-[#E8EDF2] text-sm hover:bg-[#3a4a5c]">Choose File</button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#2C3947]">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C2A56D] text-[#1A2634] rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}