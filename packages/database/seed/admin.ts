import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Nạp các biến môi trường từ file .env ở thư mục gốc monorepo
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export async function seedAdmin(prisma: PrismaClient) {
  console.log('Seeding super admin...');

  const email = process.env.INITIAL_ADMIN_EMAIL || 'admin@digvos.local';
  const password = process.env.INITIAL_ADMIN_PASSWORD || 'adminmhuy';

  const existing = await prisma.user.findUnique({
    where: { email }
  });

  const systemTenant = await prisma.tenant.findUnique({
    where: { domain: 'system.digvos.local' }
  });

  if (!systemTenant) {
    throw new Error('System Tenant not found. Please seed tenants first.');
  }

  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1,
  });

  if (existing) {
    console.log(`Admin ${email} already exists. Updating password to sync with config...`);
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        passwordHash: hashedPassword,
        name: 'System Admin',
        role: 'ADMIN',
        isEmailVerified: true,
      }
    });
    console.log(`Super Admin password updated successfully.`);
    return;
  }

  await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      name: 'System Admin',
      role: 'ADMIN',
      tenantId: systemTenant.id,
      isEmailVerified: true,
    }
  });

  console.log(`Super Admin created successfully: ${email}`);
}
