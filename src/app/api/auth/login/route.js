import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'
import { verifyPassword } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    let users = await kvGet('users')
    if (!users || !Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: 'No users configured. Please set up your first admin account.' }, { status: 401 })
    }

    const user = users.find(u => u.email === email)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    let valid = false
    if (user.salt) {
      valid = verifyPassword(password, user.password, user.salt)
    } else {
      valid = user.password === password
    }

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}