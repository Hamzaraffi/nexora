import data from '../../../lib/db'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request) {
  return Response.json(data.portfolio)
}

export async function POST(request) {
  const body = await request.json()
  const newItem = {
    id: Date.now().toString(),
    title: body.title || '',
    client: body.client || '',
    clientLogo: body.clientLogo || '',
    technologies: body.technologies || [],
    problem: body.problem || '',
    solution: body.solution || '',
    results: body.results || '',
    metrics: body.metrics || {},
    clientReview: body.clientReview || '',
    clientName: body.clientName || '',
    clientRole: body.clientRole || '',
    clientAvatar: body.clientAvatar || '',
    rating: body.rating || 5,
    active: true
  }
  data.portfolio.push(newItem)
  return Response.json(newItem, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  const index = data.portfolio.findIndex(p => p.id === body.id)
  if (index > -1) {
    data.portfolio[index] = { ...data.portfolio[index], ...body }
    return Response.json(data.portfolio[index])
  }
  return Response.json({ error: 'Portfolio item not found' }, { status: 404 })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const index = data.portfolio.findIndex(p => p.id === id)
  if (index > -1) {
    data.portfolio.splice(index, 1)
    return Response.json({ success: true })
  }
  return Response.json({ error: 'Portfolio item not found' }, { status: 404 })
}