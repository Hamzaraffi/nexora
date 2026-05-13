import data from '../../../lib/db'

export async function GET(request) {
  return Response.json(data.newsletter)
}

export async function POST(request) {
  const body = await request.json()
  const exists = data.newsletter.find(e => e.email === body.email)
  if (exists) {
    return Response.json({ error: 'Email already subscribed' }, { status: 400 })
  }
  const newSubscriber = {
    id: Date.now().toString(),
    email: body.email,
    date: new Date().toISOString().split('T')[0],
    active: true
  }
  data.newsletter.push(newSubscriber)
  return Response.json(newSubscriber, { status: 201 })
}