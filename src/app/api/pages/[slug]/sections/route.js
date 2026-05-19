import { NextResponse } from 'next/server'
import { kvGet, kvSet, KV_KEYS } from '@/lib/kv-store'
import { initDefaultData } from '@/lib/init-data'

export async function GET(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    
    const pages = await kvGet(KV_KEYS.PAGES) || []
    const page = pages.find(p => p.slug === slug)
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page.sections || [])
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    const body = await request.json()
    const { section } = body

    const pages = await kvGet(KV_KEYS.PAGES) || []
    const pageIndex = pages.findIndex(p => p.slug === slug)
    
    if (pageIndex === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    if (!pages[pageIndex].sections) {
      pages[pageIndex].sections = []
    }

    const newSection = {
      id: `section-${Date.now()}`,
      ...section,
      order: section.order || pages[pageIndex].sections.length + 1
    }

    pages[pageIndex].sections.push(newSection)
    pages[pageIndex].updatedAt = new Date().toISOString()
    
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json(newSection, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    const body = await request.json()
    const { sectionId, section } = body

    const pages = await kvGet(KV_KEYS.PAGES) || []
    const pageIndex = pages.findIndex(p => p.slug === slug)
    
    if (pageIndex === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const sectionIndex = pages[pageIndex].sections.findIndex(s => s.id === sectionId)
    
    if (sectionIndex === -1) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    pages[pageIndex].sections[sectionIndex] = {
      ...pages[pageIndex].sections[sectionIndex],
      ...section
    }
    pages[pageIndex].updatedAt = new Date().toISOString()
    
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json(pages[pageIndex].sections[sectionIndex])
  } catch (error) {
    console.error('Error updating section:', error)
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await initDefaultData()
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('sectionId')

    const pages = await kvGet(KV_KEYS.PAGES) || []
    const pageIndex = pages.findIndex(p => p.slug === slug)
    
    if (pageIndex === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const sectionIndex = pages[pageIndex].sections.findIndex(s => s.id === sectionId)
    
    if (sectionIndex === -1) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    pages[pageIndex].sections.splice(sectionIndex, 1)
    pages[pageIndex].updatedAt = new Date().toISOString()
    
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting section:', error)
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 })
  }
}