import data from '../../../lib/db'

export async function GET(request) {
  const users = data.users.map(u => ({ ...u, password: undefined }))
  return Response.json(users)
}

export async function POST(request) {
  const body = await request.json()
  const exists = data.users.find(u => u.email === body.email)
  if (exists) {
    return Response.json({ error: 'Email already exists' }, { status: 400 })
  }
  const newUser = {
    id: Date.now().toString(),
    name: body.name || '',
    email: body.email || '',
    password: body.password || 'password123',
    role: body.role || 'Viewer',
    permissions: body.permissions || ['view'],
    avatar: body.avatar || '',
    active: true,
    createdAt: new Date().toISOString().split('T')[0]
  }
  data.users.push(newUser)
  return Response.json({ ...newUser, password: undefined }, { status: 201 })
}

export async function PUT(request) {
  const body = await request.json()
  const index = data.users.findIndex(u => u.id === body.id)
  if (index > -1) {
    const updatedUser = { ...data.users[index], ...body }
    if (body.password) {
      updatedUser.password = body.password
    }
    data.users[index] = updatedUser
    return Response.json({ ...updatedUser, password: undefined })
  }
  return Response.json({ error: 'User not found' }, { status: 404 })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id === '1') {
    return Response.json({ error: 'Cannot delete super admin' }, { status: 403 })
  }
  const index = data.users.findIndex(u => u.id === id)
  if (index > -1) {
    data.users.splice(index, 1)
    return Response.json({ success: true })
  }
  return Response.json({ error: 'User not found' }, { status: 404 })
}