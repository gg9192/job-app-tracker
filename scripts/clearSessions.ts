const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function clearExpiredSessions() {
  const result = await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  console.log(`Deleted ${result.count} expired sessions.`);
  await prisma.$disconnect();
}

clearExpiredSessions().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
