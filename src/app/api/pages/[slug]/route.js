import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  const { slug } = await params
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }
  
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: { orderBy: { orderIndex: 'asc' } },
        seo: true,
      }
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error in GET /api/pages/[slug]:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { title, status } = body

    const page = await prisma.page.update({
      where: { slug },
      data: {
        title: title || undefined,
        status: status || undefined
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error in PUT /api/pages/[slug]:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params
    await prisma.page.delete({ where: { slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/pages/[slug]:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}