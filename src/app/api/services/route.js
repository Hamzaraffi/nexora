import { defaultServices } from '@/lib/default-data'

export async function GET() {
  return Response.json(defaultServices)
}