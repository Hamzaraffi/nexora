import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  
  if (url && url.startsWith('libsql://')) {
    try {
      const { PrismaLibSql } = require('@prisma/adapter-libsql')
      const { createClient } = require('@libsql/client')
      
      const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN })
      const adapter = new PrismaLibSql(client)
      return new PrismaClient({ adapter })
    } catch (e) {
      console.warn('Failed to load libsql adapter, using default client')
    }
  }
  
  return new PrismaClient()
}

const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma