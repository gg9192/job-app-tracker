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
}

clearExpiredSessions().catch((e) => {
  console.error(`caught an error clearing sessions ${e}`);
});
