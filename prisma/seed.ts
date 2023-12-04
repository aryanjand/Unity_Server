import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dummy = await prisma.user.upsert({
    where: { username: 'dummy@mail.com' },
    update: {},
    create: {
      username: 'dummy',
      first_name: 'Dummy',
      last_name: 'User',
      password: '$2a$12$KfR9eNC9fxFBviwsjWffaOeuGNw3QJL6ubqg9KfP9gJw/JMMAMf8O',
    },
  });

  const oscar = await prisma.user.upsert({
    where: { username: 'oscarzhu' },
    update: {},
    create: {
      username: 'oscarzhu',
      first_name: 'Oscar',
      last_name: 'Zhu',
      password: '$2a$12$KfR9eNC9fxFBviwsjWffaOeuGNw3QJL6ubqg9KfP9gJw/JMMAMf8O',
    },
  });

  const aryan = await prisma.user.upsert({
    where: { username: 'aryanjand' },
    update: {},
    create: {
      username: 'aryanjand',
      first_name: 'Aryan',
      last_name: 'Jand',
      password: '$2a$12$KfR9eNC9fxFBviwsjWffaOeuGNw3QJL6ubqg9KfP9gJw/JMMAMf8O',
    },
  });

  console.log({ dummy, oscar, aryan });
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
