import { PrismaClient } from '@prisma/client';
import { seedSystem } from './system';
import { seedRoles } from './roles';
import { seedTenants } from './tenant';
import { seedAdmin } from './admin';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  await seedSystem(prisma);
  await seedRoles(prisma);
  await seedTenants(prisma);
  await seedAdmin(prisma);

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
