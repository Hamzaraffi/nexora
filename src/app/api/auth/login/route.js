import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { kvGet, KV_KEYS } from '@/lib/kv-store'
import { initDefaultData } from '@/lib/init-data'

export const dynamic = 'force-dynamic'

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    await initDefaultData()
    
    const adminUser = await kvGet(KV_KEYS.ADMIN_USER)
    if (!adminUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    let valid = false
    if (adminUser.salt) {
      valid = adminUser.password === hashPassword(password, adminUser.salt)
    } else {
      valid = adminUser.password === password
    }

    if (valid && adminUser.email === email) {
      return NextResponse.json({
        success: true,
        user: {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role
        }
      })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}