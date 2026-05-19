import { kvGet, kvSet, KV_KEYS } from '@/lib/kv-store'
import { initDefaultData } from '@/lib/init-data'

export async function GET() {
  try {
    await initDefaultData()
    const messages = await kvGet(KV_KEYS.MESSAGES) || []
    return Response.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await initDefaultData()
    const body = await request.json()
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...body,
      date: new Date().toISOString().split('T')[0],
      read: false,
      createdAt: new Date().toISOString()
    }

    const messages = await kvGet(KV_KEYS.MESSAGES) || []
    messages.unshift(newMessage)
    await kvSet(KV_KEYS.MESSAGES, messages)
    
    return Response.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Error saving message:', error)
    return Response.json({ error: 'Failed to save message' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { messageId, read } = body
    
    const messages = await kvGet(KV_KEYS.MESSAGES) || []
    const msgIndex = messages.findIndex(m => m.id === messageId)
    
    if (msgIndex !== -1) {
      messages[msgIndex].read = read !== undefined ? read : true
      await kvSet(KV_KEYS.MESSAGES, messages)
      return Response.json(messages[msgIndex])
    }
    
    return Response.json({ error: 'Message not found' }, { status: 404 })
  } catch (error) {
    return Response.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')
    
    const messages = await kvGet(KV_KEYS.MESSAGES) || []
    const msgIndex = messages.findIndex(m => m.id === messageId)
    
    if (msgIndex !== -1) {
      messages.splice(msgIndex, 1)
      await kvSet(KV_KEYS.MESSAGES, messages)
      return Response.json({ success: true })
    }
    
    return Response.json({ error: 'Message not found' }, { status: 404 })
  } catch (error) {
    return Response.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}