import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'
import { defaultPortfolio } from '@/lib/default-data'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    let cases = await kvGet('case-studies')
    if (!cases) {
      cases = defaultPortfolio
      await kvSet('case-studies', cases)
    }
    if (id) {
      const item = cases.find(c => String(c.id) === String(id))
      if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(item)
    }
    return NextResponse.json(cases)
  } catch (e) {
    return NextResponse.json(defaultPortfolio)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    let cases = await kvGet('case-studies') || [...defaultPortfolio]
    
    const newItem = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...body
    }
    
    cases.unshift(newItem)
    await kvSet('case-studies', cases)
    
    return NextResponse.json(newItem)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    let cases = await kvGet('case-studies') || [...defaultPortfolio]
    
    const index = cases.findIndex(c => String(c.id) === String(body.id))
    if (index !== -1) {
      cases[index] = { ...cases[index], ...body }
      await kvSet('case-studies', cases)
      return NextResponse.json(cases[index])
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id'))
    
    let cases = await kvGet('case-studies') || [...defaultPortfolio]
    cases = cases.filter(c => c.id !== id)
    await kvSet('case-studies', cases)
    
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}