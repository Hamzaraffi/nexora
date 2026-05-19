'use client'

import { useState, useEffect } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'editor' })

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (e) {}
    setLoading(false)
  }

  function openCreate() {
    setEditingUser(null)
    setForm({ name: '', email: '', password: '', role: 'editor' })
    setShowForm(true)
  }

  function openEdit(user) {
    setEditingUser(user)
    setForm({ name: user.name, email: user.email, password: '', role: user.role })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingUser(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingUser) {
        const res = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUser.id, ...form })
        })
        if (res.ok) {
          const updated = await res.json()
          setUsers(users.map(u => u.id === editingUser.id ? updated : u))
        }
      } else {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
        if (res.ok) {
          const newUser = await res.json()
          setUsers([...users, newUser])
        }
      }
      closeForm()
    } catch (e) {}
  }

  async function deleteUser(id) {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
      if (res.ok) setUsers(users.filter(u => u.id !== id))
    } catch (e) {}
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
        Loading users...
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1A2634', margin: 0 }}>Users</h1>
          <p style={{ color: '#6B7280', marginTop: '8px' }}>{users.length} team members</p>
        </div>
        <button onClick={openCreate} style={{
          padding: '14px 24px',
          background: '#C2A56D',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '15px',
          cursor: 'pointer'
        }}>
          + Add User
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Name</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Email</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: '600', fontSize: '13px', color: '#6B7280', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '20px', fontWeight: '600', color: '#1A2634' }}>{user.name}</td>
                <td style={{ padding: '20px', color: '#6B7280' }}>{user.email}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    background: user.role === 'admin' ? '#D1FAE5' : '#E8EDF2',
                    color: user.role === 'admin' ? '#059669' : '#374151',
                    borderRadius: '20px', 
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>{user.role}</span>
                </td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEdit(user)} style={{ 
                      padding: '8px 12px', 
                      background: '#3B82F6', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '6px', 
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>Edit</button>
                    {users.length > 1 && (
                      <button onClick={() => deleteUser(user.id)} style={{ 
                        padding: '8px 12px', 
                        background: '#FEE2E2', 
                        color: '#DC2626', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}>Delete</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: 'white', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px', margin: '20px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1A2634', marginBottom: '24px' }}>
              {editingUser ? 'Edit User' : 'Create User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{
                  width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
                }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{
                  width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
                }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  {editingUser ? 'New Password (leave blank to keep)' : 'Password'}
                </label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required={!editingUser} style={{
                  width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
                }} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Role</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={{
                  width: '100%', padding: '12px 16px', border: '2px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box'
                }}>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeForm} style={{
                  padding: '12px 20px', background: '#E8EDF2', color: '#374151', border: 'none', borderRadius: '10px', fontWeight: '500', cursor: 'pointer'
                }}>Cancel</button>
                <button type="submit" style={{
                  padding: '12px 20px', background: '#C2A56D', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer'
                }}>
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}