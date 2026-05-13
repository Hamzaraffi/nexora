import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const page = await prisma.page.findUnique({ where: { slug } })
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const sections = await prisma.section.findMany({
      where: { pageId: page.id },
      orderBy: { orderIndex: 'asc' }
    })

    return NextResponse.json(sections)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { key, type, content, orderIndex } = body

    const page = await prisma.page.findUnique({ where: { slug } })
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const existingSection = await prisma.section.findFirst({
      where: { pageId: page.id, key }
    })

    if (existingSection) {
      return NextResponse.json({ error: 'Section with this key already exists' }, { status: 400 })
    }

    const section = await prisma.section.create({
      data: {
        pageId: page.id,
        key,
        type,
        content: typeof content === 'string' ? content : JSON.stringify(content),
        orderIndex: orderIndex || 0
      }
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const { id, key, type, content, orderIndex } = body

    const section = await prisma.section.update({
      where: { id },
      data: {
        key: key || undefined,
        type: type || undefined,
        content: content ? (typeof content === 'string' ? content : JSON.stringify(content)) : undefined,
        orderIndex: orderIndex !== undefined ? orderIndex : undefined
      }
    })

    return NextResponse.json(section)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Section ID required' }, { status: 400 })
    }

    await prisma.section.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { sections } = body

    const page = await prisma.page.findUnique({ where: { slug } })
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    for (const section of sections) {
      await prisma.section.update({
        where: { id: section.id },
        data: { orderIndex: section.orderIndex }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 })
  }
}