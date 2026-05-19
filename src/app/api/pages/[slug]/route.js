import { NextResponse } from 'next/server'
import { kvGet, kvSet, KV_KEYS } from '@/lib/kv-store'
import { initDefaultData } from '@/lib/init-data'

export async function GET(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    
    const pages = await kvGet(KV_KEYS.PAGES) || []
    const page = pages.find(p => p.slug === slug || p.path === `/${slug}`)
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    const body = await request.json()
    const { title, sections } = body

    const pages = await kvGet(KV_KEYS.PAGES) || []
    const pageIndex = pages.findIndex(p => p.slug === slug)
    
    if (pageIndex === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    if (title) {
      pages[pageIndex].title = title
    }
    
    if (sections && Array.isArray(sections)) {
      pages[pageIndex].sections = sections
    }
    
    pages[pageIndex].updatedAt = new Date().toISOString()
    
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json(pages[pageIndex])
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    
    const pages = await kvGet(KV_KEYS.PAGES) || []
    const pageIndex = pages.findIndex(p => p.slug === slug)
    
    if (pageIndex === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const protectedPages = ['home', 'about', 'services', 'portfolio', 'contact']
    if (protectedPages.includes(slug)) {
      return NextResponse.json({ error: 'Cannot delete protected pages' }, { status: 403 })
    }

    pages.splice(pageIndex, 1)
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json({ success: true, message: 'Page deleted' })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}