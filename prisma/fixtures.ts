import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function createFixtures() {
  await prisma.user.deleteMany({});
  await prisma.model.deleteMany({});

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password123',
      balance: 1000,
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'admin123',
      balance: 5000,
      role: Role.ADMIN,
    },
  });

  console.log('Fixtures created:', { user1, user2 });
}

createFixtures()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
