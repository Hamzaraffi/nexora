import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(media)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const filename = `${uniqueSuffix}-${file.name}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)

    const url = `/uploads/${filename}`

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url,
        alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        size: buffer.length,
        mimeType: file.type
      }
    })

    return NextResponse.json({ success: true, media }, { status: 201 })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 })
    }

    const media = await prisma.media.findUnique({ where: { id } })
    
    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    if (media.url.startsWith('/uploads/')) {
      const filepath = path.join(process.cwd(), 'public', media.url)
      try {
        await unlink(filepath)
      } catch (err) {
        console.log('File already deleted or not found')
      }
    }

    await prisma.media.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, alt } = body

    const media = await prisma.media.update({
      where: { id },
      data: { alt }
    })

    return NextResponse.json(media)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 })
  }
}