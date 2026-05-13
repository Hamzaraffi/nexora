import data from '../../../lib/db'

export async function GET(request) {
  return Response.json(data.blogs)
}

export async function POST(request) {
  const body = await request.json()
  const newBlog = {
    id: Date.now().toString(),
    title: body.title || '',
    slug: body.slug || body.title?.toLowerCase().replace(/\s+/g, '-') || '',
    heading: body.heading || '',
    subHeading: body.subHeading || '',
    content: body.content || '',
    excerpt: body.excerpt || '',
    image: body.image || '',
    category: body.category || 'General',
    tags: body.tags || [],
    metaTitle: body.metaTitle || body.title || '',
    metaDescription: body.metaDescription || '',
    metaKeywords: body.metaKeywords || '',
    readTime: body.readTime || '5 min read',
    date: new Date().toISOString().split('T')[0],
    active: true
  }
  data.blogs.push(newBlog)
  return Response.json(newBlog, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  const index = data.blogs.findIndex(b => b.id === body.id)
  if (index > -1) {
    data.blogs[index] = { ...data.blogs[index], ...body }
    return Response.json(data.blogs[index])
  }
  return Response.json({ error: 'Blog not found' }, { status: 404 })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const index = data.blogs.findIndex(b => b.id === id)
  if (index > -1) {
    data.blogs.splice(index, 1)
    return Response.json({ success: true })
  }
  return Response.json({ error: 'Blog not found' }, { status: 404 })
}