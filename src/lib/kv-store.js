import { Redis } from '@upstash/redis'

let kv = null

function createKVClient() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (url && token) {
    return new Redis({ url, token })
  }
  return null
}

export function getKVClient() {
  if (!kv) kv = createKVClient()
  return kv
}

export async function kvGet(key) {
  const client = getKVClient()
  if (client) {
    try {
      return await client.get(key)
    } catch (e) {
      console.error(`KV GET error for ${key}:`, e.message)
      return null
    }
  }
  return null
}

export async function kvSet(key, value) {
  const client = getKVClient()
  if (client) {
    try {
      const strVal = typeof value === 'string' ? value : JSON.stringify(value)
      await client.set(key, strVal)
      return true
    } catch (e) {
      console.error(`KV SET error for ${key}:`, e.message)
      return false
    }
  }
  return false
}

export async function kvDel(key) {
  const client = getKVClient()
  if (client) {
    try {
      await client.del(key)
      return true
    } catch (e) {
      console.error(`KV DEL error for ${key}:`, e.message)
      return false
    }
  }
  return false
}

export const KV_KEYS = {
  ADMIN_USER: 'admin:user',
  PAGES: 'pages',
  MESSAGES: 'messages',
  SECTIONS: 'sections',
  SETTINGS: 'settings',
  INIT_COMPLETE: 'init:complete',
}
