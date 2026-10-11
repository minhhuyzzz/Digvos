import { PrismaClient } from '@prisma/client';

export async function seedTenants(prisma: PrismaClient) {
  console.log('Seeding initial tenants...');
  // Tạo tenant mặc định (VD: DIGVOS System)
  await prisma.tenant.upsert({
    where: { domain: 'system.digvos.local' },
    update: {},
    create: {
      name: 'DIGVOS System Tenant',
      domain: 'system.digvos.local',
    },
  });
}
