import { NextResponse } from 'next/server'
import { kvGet } from '@/lib/kv-store'

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  const cookieToken = request.cookies.get('auth_token')?.value
  const token = authHeader?.replace('Bearer ', '') || cookieToken

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const users = await kvGet('users')
  if (!users || !Array.isArray(users)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const user = users.find(u => u.id.toString() === token)
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
}
