
const prisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({ id: '1', email: '', createdAt: new Date() }),
  }
} as any;

export default prisma;