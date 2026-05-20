import { NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv-store'
import { defaultBlogs } from '@/lib/default-data'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    let blogs = await kvGet('blogs')
    if (!blogs) {
      blogs = defaultBlogs
      await kvSet('blogs', blogs)
    }
    if (id) {
      const blog = blogs.find(b => String(b.id) === String(id))
      if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(blog)
    }
    return NextResponse.json(blogs)
  } catch (e) {
    return NextResponse.json(defaultBlogs)
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    let blogs = await kvGet('blogs') || [...defaultBlogs]
    
    const newBlog = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      published: false,
      ...body
    }
    
    blogs.unshift(newBlog)
    await kvSet('blogs', blogs)
    
    return NextResponse.json(newBlog)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    let blogs = await kvGet('blogs') || [...defaultBlogs]
    
    const index = blogs.findIndex(b => String(b.id) === String(body.id))
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...body }
      await kvSet('blogs', blogs)
      return NextResponse.json(blogs[index])
    }
    
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    let blogs = await kvGet('blogs') || [...defaultBlogs]
    blogs = blogs.filter(b => {
      const blogId = typeof b.id === 'string' ? b.id : String(b.id)
      return blogId !== String(id) && b.id !== parseInt(id)
    })
    await kvSet('blogs', blogs)
    
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}