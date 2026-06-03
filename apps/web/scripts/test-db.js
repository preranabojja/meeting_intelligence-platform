const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const meetings = await prisma.meeting.findMany();
  console.log(meetings);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });