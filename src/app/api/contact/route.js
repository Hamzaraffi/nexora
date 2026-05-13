import data from '../../../lib/db'

export async function GET(request) {
  return Response.json(data.contacts)
}

export async function POST(request) {
  const body = await request.json()
  const newContact = {
    id: Date.now().toString(),
    ...body,
    date: new Date().toISOString().split('T')[0],
    read: false
  }
  data.contacts.push(newContact)
  return Response.json(newContact, { status: 201 })
}