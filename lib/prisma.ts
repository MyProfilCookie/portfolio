import { PrismaClient } from '@prisma/client'

// PrismaClient est attaché au `global` en développement pour éviter
// d'avoir trop de connexions ouvertes pendant le développement
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 