'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, RotateCcw, Eye } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function VersionHistory() {
  const params = useParams()
  const slug = params?.slug
  const [versions, setVersions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVersion, setSelectedVersion] = useState(null)

  useEffect(() => {
    if (slug) fetchVersions()
  }, [slug])

  const fetchVersions = async () => {
    try {
      const res = await fetch(`/api/pages/${slug}/versions`)
      if (res.ok) {
        const data = await res.json()
        setVersions(data)
      }
    } catch (error) {
      console.error('Failed to fetch versions:', error)
    } finally {
      setLoading(false)
    }
  }

  const rollbackToVersion = async (version) => {
    if (!confirm('Rollback to this version? Current content will be replaced.')) return

    try {
      const res = await fetch(`/api/pages/${slug}/versions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          versionId: version.id
        })
      })

      if (res.ok) {
        alert('Rollback successful!')
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to rollback:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-6 h-6 border-2 border-[#C2A56D] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {versions.length === 0 ? (
        <div className="text-center py-8">
          <Clock size={32} className="mx-auto text-[#7A8FA6] mb-3" />
          <p className="text-[#7A8FA6]">No version history available.</p>
          <p className="text-xs text-[#7A8FA6] mt-1">Save changes to create a new version.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {versions.map((version, i) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#2C3947] rounded-lg p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#243447] flex items-center justify-center">
                <span className="text-sm font-medium text-[#C2A56D]">v{version.version}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#E8EDF2]">
                    Version {version.version}
                  </span>
                  {i === 0 && (
                    <span className="text-xs px-2 py-0.5 bg-[#C2A56D]/20 text-[#C2A56D] rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#7A8FA6]">
                  {version.createdBy ? `By ${version.createdBy}` : 'Auto-saved'} ·{' '}
                  {new Date(version.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedVersion(version)}
                  className="p-2 rounded-lg hover:bg-[#243447] text-[#7A8FA6] hover:text-[#E8EDF2] transition-colors"
                  title="Preview"
                >
                  <Eye size={16} />
                </button>
                {i !== 0 && (
                  <button
                    onClick={() => rollbackToVersion(version)}
                    className="p-2 rounded-lg hover:bg-[#243447] text-[#7A8FA6] hover:text-[#C2A56D] transition-colors"
                    title="Restore this version"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedVersion && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#243447] rounded-xl border border-[#2C3947] w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="p-4 border-b border-[#2C3947] flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#E8EDF2]">
                Version {selectedVersion.version} Preview
              </h3>
              <button
                onClick={() => setSelectedVersion(null)}
                className="text-[#7A8FA6] hover:text-[#E8EDF2]"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[60vh]">
              <pre className="text-sm text-[#E8EDF2] bg-[#1A2634] p-4 rounded-lg overflow-auto">
                {JSON.stringify(JSON.parse(selectedVersion.data || '{}'), null, 2)}
              </pre>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}