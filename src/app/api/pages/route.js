import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' }
        },
        seo: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(pages)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { slug, title, status } = body

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 })
    }

    const existing = await prisma.page.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Page with this slug already exists' }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: { slug, title, status: status || 'draft' }
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}