import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../generated/prisma/client';

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.$connect();
  const existingSuperAdmin = await prisma.user.findFirst({
    where: {
      role: 'SUPER_ADMIN',
    },
  });

  if (existingSuperAdmin) {
    console.log('SUPER_ADMIN already exists');

    return;
  }

  const hashedPassword = await bcrypt.hash('admin_1234', 10);

  await prisma.user.create({
    data: {
      email: 'super_admin@test.com',
      username: 'Ron',
      password: hashedPassword,
      firstName: 'Ronald',
      lastName: 'Larico',
      role: 'SUPER_ADMIN',
      isVerified: true,
    },
  });

  console.log('SUPER_ADMIN created successfully');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
