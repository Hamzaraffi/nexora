import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'
import { hashPassword, generateSalt, verifyPassword } from '@/lib/auth'

export async function POST(request) {
  try {
    const { currentPassword, newPassword, userId } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    let users = await kvGet('users')
    if (!users || !Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 500 })
    }

    const userIndex = userId
      ? users.findIndex(u => u.id === userId)
      : users.findIndex(u => u.role === 'admin')

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = users[userIndex]

    let valid = false
    if (user.salt) {
      valid = verifyPassword(currentPassword, user.password, user.salt)
    } else {
      valid = user.password === currentPassword
    }

    if (!valid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    const newSalt = generateSalt()
    const newHash = hashPassword(newPassword, newSalt)

    users[userIndex] = { ...user, password: newHash, salt: newSalt }
    await kvSet('users', users)

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}
