import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'
import { hashPassword, generateSalt } from '@/lib/auth'

export async function GET() {
  try {
    let users = await kvGet('users')
    if (!users || !Array.isArray(users)) {
      users = []
      await kvSet('users', users)
    }
    return NextResponse.json(users.map(u => ({ ...u, password: undefined, salt: undefined })))
  } catch (e) {
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    let users = await kvGet('users') || []

    if (!Array.isArray(users)) users = []

    if (users.find(u => u.email === body.email)) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    if (!body.password || body.password.length < 4) {
      return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })
    }

    const salt = generateSalt()
    const newUser = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      password: hashPassword(body.password, salt),
      salt: salt,
      role: body.role || 'editor',
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    await kvSet('users', users)

    return NextResponse.json({ ...newUser, password: undefined, salt: undefined })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    let users = await kvGet('users') || []

    if (!Array.isArray(users)) users = []

    const index = users.findIndex(u => u.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const update = { ...users[index], name: body.name || users[index].name, email: body.email || users[index].email, role: body.role || users[index].role }

    if (body.password) {
      const salt = generateSalt()
      update.password = hashPassword(body.password, salt)
      update.salt = salt
    }

    users[index] = update
    await kvSet('users', users)

    return NextResponse.json({ ...update, password: undefined, salt: undefined })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id'))

    let users = await kvGet('users') || []
    if (!Array.isArray(users)) users = []

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
