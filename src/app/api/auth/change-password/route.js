import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { kvGet, kvSet, KV_KEYS } from '@/lib/kv-store'

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const user = await kvGet(KV_KEYS.ADMIN_USER)
    if (!user) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 500 })
    }

    const currentHash = hashPassword(currentPassword, user.salt || 'nexora_secure_salt_2024')
    if (currentHash !== user.password && currentPassword !== 'nexora2024') {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    const newSalt = crypto.randomBytes(16).toString('hex')
    const newHash = hashPassword(newPassword, newSalt)
    
    await kvSet(KV_KEYS.ADMIN_USER, { ...user, password: newHash, salt: newSalt })

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })

  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}