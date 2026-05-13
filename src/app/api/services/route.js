import data from '../../../lib/db'

export async function GET(request) {
  return Response.json(data.services)
}

export async function POST(request) {
  const body = await request.json()
  const newService = {
    id: Date.now().toString(),
    ...body,
    active: true
  }
  data.services.push(newService)
  return Response.json(newService, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  const index = data.services.findIndex(s => s.id === body.id)
  if (index > -1) {
    data.services[index] = { ...data.services[index], ...body }
    return Response.json(data.services[index])
  }
  return Response.json({ error: 'Service not found' }, { status: 404 })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const index = data.services.findIndex(s => s.id === id)
  if (index > -1) {
    data.services.splice(index, 1)
    return Response.json({ success: true })
  }
  return Response.json({ error: 'Service not found' }, { status: 404 })
}