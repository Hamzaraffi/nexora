import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const pageSlug = searchParams.get('page')

    if (!pageSlug) {
      return NextResponse.json({ error: 'Page slug required' }, { status: 400 })
    }

    const page = await prisma.page.findUnique({ where: { slug: pageSlug } })
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const seo = await prisma.seoMeta.findUnique({
      where: { pageId: page.id }
    })

    return NextResponse.json(seo || {})
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch SEO' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { pageSlug, metaTitle, metaDescription, metaKeywords, ogImage, canonicalUrl } = body

    if (!pageSlug) {
      return NextResponse.json({ error: 'Page slug required' }, { status: 400 })
    }

    const page = await prisma.page.findUnique({ where: { slug: pageSlug } })
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const seo = await prisma.seoMeta.upsert({
      where: { pageId: page.id },
      update: { metaTitle, metaDescription, metaKeywords, ogImage, canonicalUrl },
      create: { pageId: page.id, metaTitle, metaDescription, metaKeywords, ogImage, canonicalUrl }
    })

    return NextResponse.json(seo)
  } catch (error) {
    console.error('Error updating SEO:', error)
    return NextResponse.json({ error: 'Failed to update SEO' }, { status: 500 })
  }
}