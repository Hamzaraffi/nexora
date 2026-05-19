import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'

const defaultSettings = {
  siteName: 'Nexora',
  tagline: 'Digital Marketing Agency',
  email: 'hello@nexora.com',
  phone: '+1 (555) 123-4567',
  address: 'San Francisco, CA 94102',
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  youtube: '',
  tiktok: ''
}

export async function GET() {
  try {
    let settings = await kvGet('settings')
    if (!settings) {
      settings = defaultSettings
      await kvSet('settings', settings)
    }
    return NextResponse.json(settings)
  } catch (e) {
    return NextResponse.json(defaultSettings)
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    await kvSet('settings', body)
    return NextResponse.json(body)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}