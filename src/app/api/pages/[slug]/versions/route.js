import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const page = await prisma.page.findUnique({ where: { slug } })
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const versions = await prisma.pageVersion.findMany({
      where: { pageId: page.id },
      orderBy: { version: 'desc' }
    })

    return NextResponse.json(versions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch versions' }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { createdBy } = body

    const page = await prisma.page.findUnique({
      where: { slug },
      include: { sections: true, seo: true }
    })
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const latestVersion = await prisma.pageVersion.findFirst({
      where: { pageId: page.id },
      orderBy: { version: 'desc' }
    })

    const versionData = {
      page: { id: page.id, slug: page.slug, title: page.title, status: page.status },
      sections: page.sections.map(s => ({ id: s.id, key: s.key, type: s.type, content: s.content, orderIndex: s.orderIndex })),
      seo: page.seo
    }

    const version = await prisma.pageVersion.create({
      data: {
        pageId: page.id,
        version: (latestVersion?.version || 0) + 1,
        data: JSON.stringify(versionData),
        createdBy
      }
    })

    return NextResponse.json(version, { status: 201 })
  } catch (error) {
    console.error('Error creating version:', error)
    return NextResponse.json({ error: 'Failed to create version' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params
    const { versionId } = await request.json()

    const version = await prisma.pageVersion.findUnique({
      where: { id: versionId }
    })

    if (!version) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 })
    }

    const versionData = JSON.parse(version.data)

    const page = await prisma.page.findUnique({ where: { slug } })
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    await prisma.section.deleteMany({ where: { pageId: page.id } })

    for (const section of versionData.sections) {
      await prisma.section.create({
        data: {
          pageId: page.id,
          key: section.key,
          type: section.type,
          content: section.content,
          orderIndex: section.orderIndex
        }
      })
    }

    if (versionData.seo) {
      await prisma.seoMeta.upsert({
        where: { pageId: page.id },
        update: versionData.seo,
        create: { ...versionData.seo, pageId: page.id }
      })
    }

    await prisma.page.update({
      where: { id: page.id },
      data: {
        title: versionData.page.title,
        status: versionData.page.status
      }
    })

    const latestVersion = await prisma.pageVersion.findFirst({
      where: { pageId: page.id },
      orderBy: { version: 'desc' }
    })

    const newVersionData = {
      page: { id: page.id, slug: page.slug, title: versionData.page.title, status: versionData.page.status },
      sections: versionData.sections,
      seo: versionData.seo
    }

    const newVersion = await prisma.pageVersion.create({
      data: {
        pageId: page.id,
        version: (latestVersion?.version || 0) + 1,
        data: JSON.stringify(newVersionData),
        createdBy: 'system-rollback'
      }
    })

    return NextResponse.json({ success: true, newVersion })
  } catch (error) {
    console.error('Error restoring version:', error)
    return NextResponse.json({ error: 'Failed to restore version' }, { status: 500 })
  }
}