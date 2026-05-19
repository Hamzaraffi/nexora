import { NextResponse } from 'next/server'
import { kvGet, kvSet, KV_KEYS } from '@/lib/kv-store'
import { initDefaultData } from '@/lib/init-data'

const defaultPages = [
  {
    id: 'page-home',
    slug: 'home',
    title: 'Home',
    path: '/',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-about',
    slug: 'about',
    title: 'About Us',
    path: '/about',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-services',
    slug: 'services',
    title: 'Services',
    path: '/services',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-portfolio',
    slug: 'portfolio',
    title: 'Portfolio',
    path: '/portfolio',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact',
    path: '/contact',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    let pages = await kvGet(KV_KEYS.PAGES)

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      await initDefaultData()
      pages = await kvGet(KV_KEYS.PAGES)
    } else if (pages[0]?.sections?.[0]?.id && /^[a-z]+-\d+$/.test(pages[0].sections[0].id)) {
      await kvSet(KV_KEYS.INIT_COMPLETE, false)
      await initDefaultData()
      pages = await kvGet(KV_KEYS.PAGES)
    }

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      pages = defaultPages
    }

    if (slug) {
      const page = pages.find(p => p.slug === slug)
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 })
      }
      return NextResponse.json(page)
    }

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(defaultPages)
  }
}

export async function POST(request) {
  try {
    const { slug, title, path } = await request.json()

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })
    }

    let pages = await kvGet(KV_KEYS.PAGES) || []
    const existing = pages.find(p => p.slug === slug)
    
    if (existing) {
      return NextResponse.json({ error: 'Page with this slug already exists' }, { status: 400 })
    }

    const newPage = {
      id: `page-${Date.now()}`,
      slug,
      title,
      path: path || `/${slug}`,
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    pages.push(newPage)
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json(newPage, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    let pages = await kvGet(KV_KEYS.PAGES) || []
    
    const index = pages.findIndex(p => p.id === body.id)
    if (index !== -1) {
      pages[index] = { ...pages[index], ...body, updatedAt: new Date().toISOString() }
      await kvSet(KV_KEYS.PAGES, pages)
      return NextResponse.json(pages[index])
    }
    
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    let pages = await kvGet(KV_KEYS.PAGES) || []
    pages = pages.filter(p => p.id !== id)
    await kvSet(KV_KEYS.PAGES, pages)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}