import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'

const defaultUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@nexora.com',
    password: 'nexora2024',
    role: 'admin',
    createdAt: '2024-01-01'
  }
]

export async function GET() {
  try {
    let users = await kvGet('users')
    if (!users) {
      users = defaultUsers
      await kvSet('users', users)
    }
    return NextResponse.json(users.map(u => ({ ...u, password: undefined })))
  } catch (e) {
    return NextResponse.json(defaultUsers.map(u => ({ ...u, password: undefined })))
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    let users = await kvGet('users') || [...defaultUsers]
    
    if (users.find(u => u.email === body.email)) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      password: body.password || 'password123',
      role: body.role || 'editor',
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    await kvSet('users', users)
    
    return NextResponse.json({ ...newUser, password: undefined })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    let users = await kvGet('users') || [...defaultUsers]
    
    const index = users.findIndex(u => u.id === body.id)
    if (index !== -1) {
      users[index] = { ...users[index], ...body, password: body.password || users[index].password }
      await kvSet('users', users)
      return NextResponse.json({ ...users[index], password: undefined })
    }
    
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id'))
    
    let users = await kvGet('users') || [...defaultUsers]
    if (users.length <= 1) {
      return NextResponse.json({ error: 'Cannot delete last user' }, { status: 400 })
    }
    
    users = users.filter(u => u.id !== id)
    await kvSet('users', users)
    
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}