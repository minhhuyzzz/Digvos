import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { PasswordService } from './password.service';
import { IIdentityProvider } from '../../domain/interfaces/identity-provider.interface';
import { RegisterDto, LoginDto } from '@digvos/api-contract';
import { User, Role } from '@prisma/client';

@Injectable()
export class UsersService implements IIdentityProvider {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password with Argon2
    const hashedPassword = await this.passwordService.hash(dto.password);
    
    // For local dev, put them in the System tenant by default, or require a tenant ID in production
    const systemTenant = await this.prisma.tenant.findUnique({ where: { domain: 'system.digvos.local' }});
    if (!systemTenant) throw new Error('System Tenant not found');

    const userRole = (dto as any).role || Role.STUDENT;

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
        name: dto.name,
        role: userRole,
        tenantId: systemTenant.id,
        isEmailVerified: true,
      },
    });

    // Tự động khởi tạo profile tương ứng ngay khi đăng ký thành công
    if (userRole === Role.STUDENT) {
      await this.prisma.studentProfile.create({ data: { userId: user.id } });
    } else if (userRole === Role.TEACHER) {
      await this.prisma.teacherProfile.create({ data: { userId: user.id } });
    } else if (userRole === Role.EMPLOYER) {
      await this.prisma.employerProfile.create({ data: { userId: user.id, companyName: 'Chưa cập nhật' } });
    }

    return user;
  }

  async verifyEmail(email: string, code: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại.');
    }

    if (user.isEmailVerified) {
      return user;
    }

    if (!user.verificationCode || user.verificationCode !== code) {
      throw new BadRequestException('Mã OTP xác thực không đúng.');
    }

    if (user.verificationExpires && user.verificationExpires < new Date()) {
      throw new BadRequestException('Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại.');
    }

    // Xác thực thành công: Kích hoạt tài khoản và tạo các Profile tương ứng
    return this.prisma.user.update({
      where: { email },
      data: {
        isEmailVerified: true,
        verificationCode: null,
        verificationExpires: null,
        studentProfile: user.role === 'STUDENT' ? { create: {} } : undefined,
        teacherProfile: user.role === 'TEACHER' ? { create: {} } : undefined,
        employerProfile: user.role === 'EMPLOYER' ? { create: { companyName: 'Chưa cập nhật' } } : undefined,
      },
    });
  }

  async generateNewOtp(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại.');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Tài khoản đã được xác thực trước đó.');
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    return this.prisma.user.update({
      where: { email },
      data: {
        verificationCode: otpCode,
        verificationExpires: otpExpires,
      },
    });
  }

  async validateUser(dto: LoginDto): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    const isMatch = await this.passwordService.verify(user.passwordHash, dto.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updatePassword(userId: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }
}
