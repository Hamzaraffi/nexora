'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Type,
  Image,
  AlignLeft,
  BarChart2,
  Megaphone,
  Grid,
  Star
} from 'lucide-react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const typeIcons = {
  hero: '🎯',
  text: '📝',
  'card-grid': '📋',
  stats: '📊',
  cta: '🔔',
  gallery: '🖼️',
  testimonials: '💬',
  faq: '❓'
}

export default function SectionEditor({ section, index, onUpdate, onDelete }) {
  const [collapsed, setCollapsed] = useState(false)
  const [content, setContent] = useState(() => {
    try {
      return typeof section.content === 'string' ? JSON.parse(section.content || '{}') : (section.content || {})
    } catch {
      return {}
    }
  })

  const handleChange = (key, value) => {
    const updated = { ...content, [key]: value }
    setContent(updated)
    onUpdate(JSON.stringify(updated))
  }

  const handleArrayItemChange = (key, index, field, value) => {
    const items = [...(content[key] || [])]
    items[index] = { ...items[index], [field]: value }
    const updated = { ...content, [key]: items }
    setContent(updated)
    onUpdate(JSON.stringify(updated))
  }

  const addArrayItem = (key, defaultItem) => {
    const items = [...(content[key] || []), defaultItem]
    const updated = { ...content, [key]: items }
    setContent(updated)
    onUpdate(JSON.stringify(updated))
  }

  const removeArrayItem = (key, index) => {
    const items = (content[key] || []).filter((_, i) => i !== index)
    const updated = { ...content, [key]: items }
    setContent(updated)
    onUpdate(JSON.stringify(updated))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2C3947] rounded-xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-[#243447] border-b border-[#3a4a5c]">
        <div className="cursor-move text-[#7A8FA6]">
          <GripVertical size={16} />
        </div>
        <span className="text-xl">{typeIcons[section.type] || '📄'}</span>
        <span className="text-sm text-[#E8EDF2] font-medium capitalize">{section.type} Section</span>
        <span className="text-xs text-[#7A8FA6] px-2 py-0.5 bg-[#2C3947] rounded">{section.key}</span>
        <div className="flex-1" />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-[#7A8FA6] hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {!collapsed && (
        <div className="p-4 space-y-4">
          {section.type === 'hero' && (
            <>
              <InputField
                label="Headline"
                value={content.headline}
                onChange={(v) => handleChange('headline', v)}
                placeholder="Enter headline..."
              />
              <TextareaField
                label="Subheadline"
                value={content.subheadline}
                onChange={(v) => handleChange('subheadline', v)}
                placeholder="Enter subheadline..."
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="CTA Text"
                  value={content.ctaText}
                  onChange={(v) => handleChange('ctaText', v)}
                  placeholder="Button text..."
                />
                <InputField
                  label="CTA Link"
                  value={content.ctaLink}
                  onChange={(v) => handleChange('ctaLink', v)}
                  placeholder="/page or https://..."
                />
              </div>
              <InputField
                label="Background Image URL"
                value={content.backgroundImage}
                onChange={(v) => handleChange('backgroundImage', v)}
                placeholder="https://..."
              />
            </>
          )}

          {section.type === 'text' && (
            <div>
              <label className="block text-xs text-[#7A8FA6] mb-2">Content</label>
              <div className="bg-[#1A2634] rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={content.content || ''}
                  onChange={(v) => handleChange('content', v)}
                  className="text-[#E8EDF2]"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['link', 'blockquote'],
                      ['clean']
                    ]
                  }}
                />
              </div>
            </div>
          )}

          {section.type === 'card-grid' && (
            <>
              <InputField
                label="Section Title"
                value={content.title}
                onChange={(v) => handleChange('title', v)}
                placeholder="Section title..."
              />
              <div>
                <label className="block text-xs text-[#7A8FA6] mb-2">Columns</label>
                <select
                  value={content.columns || 3}
                  onChange={(e) => handleChange('columns', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] focus:outline-none focus:border-[#C2A56D]"
                >
                  <option value={2}>2 Columns</option>
                  <option value={3}>3 Columns</option>
                  <option value={4}>4 Columns</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#7A8FA6] mb-2">Cards</label>
                <div className="space-y-3">
                  {(content.cards || []).map((card, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#1A2634] rounded-lg">
                      <InputField
                        label="Icon"
                        value={card.icon}
                        onChange={(v) => handleArrayItemChange('cards', i, 'icon', v)}
                        placeholder="Icon name..."
                        small
                      />
                      <InputField
                        label="Title"
                        value={card.title}
                        onChange={(v) => handleArrayItemChange('cards', i, 'title', v)}
                        placeholder="Card title..."
                        small
                      />
                      <InputField
                        label="Description"
                        value={card.desc}
                        onChange={(v) => handleArrayItemChange('cards', i, 'desc', v)}
                        placeholder="Description..."
                        small
                      />
                      <button
                        onClick={() => removeArrayItem('cards', i)}
                        className="p-2 text-[#7A8FA6] hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('cards', { icon: 'Star', title: 'New Card', desc: 'Description' })}
                    className="w-full py-2 border border-dashed border-[#3a4a5c] rounded-lg text-[#7A8FA6] hover:text-[#E8EDF2] hover:border-[#C2A56D] transition-colors text-sm"
                  >
                    + Add Card
                  </button>
                </div>
              </div>
            </>
          )}

          {section.type === 'stats' && (
            <div>
              <label className="block text-xs text-[#7A8FA6] mb-2">Stats Items</label>
              <div className="space-y-3">
                {(content.items || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#1A2634] rounded-lg">
                    <InputField
                      label="Number"
                      value={item.number}
                      onChange={(v) => handleArrayItemChange('items', i, 'number', v)}
                      placeholder="500+"
                      small
                    />
                    <InputField
                      label="Label"
                      value={item.label}
                      onChange={(v) => handleArrayItemChange('items', i, 'label', v)}
                      placeholder="Projects"
                      small
                    />
                    <button
                      onClick={() => removeArrayItem('items', i)}
                      className="p-2 text-[#7A8FA6] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('items', { number: '100+', label: 'New Stat' })}
                  className="w-full py-2 border border-dashed border-[#3a4a5c] rounded-lg text-[#7A8FA6] hover:text-[#E8EDF2] hover:border-[#C2A56D] transition-colors text-sm"
                >
                  + Add Stat
                </button>
              </div>
            </div>
          )}

          {section.type === 'cta' && (
            <>
              <InputField
                label="Headline"
                value={content.headline}
                onChange={(v) => handleChange('headline', v)}
                placeholder="Enter headline..."
              />
              <TextareaField
                label="Subheadline"
                value={content.subheadline}
                onChange={(v) => handleChange('subheadline', v)}
                placeholder="Enter subheadline..."
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Button Text"
                  value={content.buttonText}
                  onChange={(v) => handleChange('buttonText', v)}
                  placeholder="Get Started"
                />
                <InputField
                  label="Button Link"
                  value={content.buttonLink}
                  onChange={(v) => handleChange('buttonLink', v)}
                  placeholder="/contact"
                />
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  )
}

function InputField({ label, value, onChange, placeholder, small }) {
  return (
    <div className={small ? 'flex-1' : 'w-full'}>
      <label className="block text-xs text-[#7A8FA6] mb-1.5">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D] ${small ? 'text-sm' : ''}`}
      />
    </div>
  )
}

function TextareaField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs text-[#7A8FA6] mb-1.5">{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 bg-[#1A2634] border border-[#3a4a5c] rounded-lg text-[#E8EDF2] placeholder-[#7A8FA6] focus:outline-none focus:border-[#C2A56D] resize-none"
      />
    </div>
  )
}