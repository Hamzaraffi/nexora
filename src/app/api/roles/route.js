import data from '../../../lib/db'

export async function GET(request) {
  return Response.json(data.roles)
}

export async function POST(request) {
  const body = await request.json()
  const newRole = {
    id: Date.now().toString(),
    name: body.name || '',
    permissions: body.permissions || [],
    description: body.description || ''
  }
  data.roles.push(newRole)
  return Response.json(newRole, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  const index = data.roles.findIndex(r => r.id === body.id)
  if (index > -1) {
    data.roles[index] = { ...data.roles[index], ...body }
    return Response.json(data.roles[index])
  }
  return Response.json({ error: 'Role not found' }, { status: 404 })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id === '1') {
    return Response.json({ error: 'Cannot delete Super Admin role' }, { status: 403 })
  }
  const index = data.roles.findIndex(r => r.id === id)
  if (index > -1) {
    data.roles.splice(index, 1)
    return Response.json({ success: true })
  }
  return Response.json({ error: 'Role not found' }, { status: 404 })
}