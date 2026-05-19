import { NextResponse } from 'next/server'

export async function POST(request) {
  const response = NextResponse.json({ success: true, message: 'Logged out' })
  
  response.cookies.set('session_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  })

  return response
}