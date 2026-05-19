import { NextResponse } from 'next/server'

const DEMO_USER = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@nexora.com',
  password: 'nexora2024',
  role: 'admin'
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  const cookieToken = request.cookies.get('auth_token')?.value
  const token = authHeader?.replace('Bearer ', '') || cookieToken

  if (token === 'nexora_admin_token_2024') {
    return NextResponse.json({
      authenticated: true,
      user: {
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        role: DEMO_USER.role
      }
    })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}