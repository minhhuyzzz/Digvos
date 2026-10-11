import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenService } from './token.service';
import { SessionService } from './session.service';
import { EmailService } from '../../../../infrastructure/email/email.service';
import { RedisService } from '../../../../infrastructure/redis/redis.service';
import { PasswordService } from './password.service';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import { SyncAuth0Dto } from '../../presentation/dto/sync-auth0.dto';
import { LoginDto, RegisterDto, TokenResponseDto } from '@digvos/api-contract';
import { Role } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private readonly emailService: EmailService,
    private readonly redisService: RedisService,
    private readonly passwordService: PasswordService,
    private readonly prisma: PrismaService,
  ) {}

  async sendRegisterOtp(email: string): Promise<any> {
    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email này đã được sử dụng để đăng ký tài khoản.');
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    console.log(`\n==================================================`);
    console.log(`[DIGVOS REGISTER OTP] Email: ${email} -> OTP: ${otpCode}`);
    console.log(`==================================================\n`);

    await (this.prisma as any).otpCode.upsert({
      where: { email },
      update: { code: otpCode, expiresAt },
      create: { email, code: otpCode, expiresAt },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #5A96B0; text-align: center;">Xác thực email đăng ký DIGVOS</h2>
        <p>Xin chào,</p>
        <p>Vui lòng sử dụng mã OTP dưới đây để xác thực địa chỉ email và tiếp tục luồng đăng ký tài khoản của bạn:</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #334155; margin: 20px 0; border-radius: 8px;">
          ${otpCode}
        </div>
        <p style="color: #64748b; font-size: 12px; text-align: center;">Mã OTP này có hiệu lực trong vòng 10 phút. Tuyệt đối không chia sẻ mã này với bất kỳ ai.</p>
      </div>
    `;

    await this.emailService.sendMail(email, 'Xác thực email đăng ký - DIGVOS', htmlContent);
    return { success: true };
  }

  async register(dto: RegisterDto & { code: string }, metadata: any): Promise<any> {
    const otpRecord = await (this.prisma as any).otpCode.findUnique({
      where: { email: dto.email }
    });

    if (!otpRecord || otpRecord.code !== dto.code) {
      throw new BadRequestException('Mã xác thực OTP không chính xác.');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('Mã xác thực OTP đã hết hạn. Vui lòng yêu cầu gửi lại.');
    }

    const user = await this.usersService.register(dto);

    try {
      await (this.prisma as any).otpCode.delete({ where: { email: dto.email } });
    } catch (e) {}

    const tokens = await this.generateTokens(user, metadata);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async verifyEmail(email: string, code: string, metadata: any): Promise<any> {
    const user = await this.usersService.verifyEmail(email, code);
    const tokens = await this.generateTokens(user, metadata);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async resendOtp(email: string): Promise<any> {
    const user = await this.usersService.generateNewOtp(email);
    const otpCode = user.verificationCode!;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #5A96B0; text-align: center;">Mã xác thực tài khoản DIGVOS (Gửi lại)</h2>
        <p>Xin chào <strong>${user.name || 'bạn'}</strong>,</p>
        <p>Đây là mã OTP mới được yêu cầu gửi lại để xác thực email của bạn:</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #334155; margin: 20px 0; border-radius: 8px;">
          ${otpCode}
        </div>
        <p style="color: #64748b; font-size: 12px; text-align: center;">Mã OTP này có hiệu lực trong vòng 10 phút. Tuyệt đối không chia sẻ mã này với bất kỳ ai.</p>
      </div>
    `;
    await this.emailService.sendMail(user.email, 'Mã xác thực tài khoản DIGVOS', htmlContent);
    return { success: true };
  }

  async login(dto: LoginDto, metadata: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await this.passwordService.verify(user.passwordHash, dto.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Nếu chưa xác thực email, yêu cầu verify OTP
    if (!user.isEmailVerified) {
      // Tự động sinh lại OTP mới khi họ thử đăng nhập lại để có mã mới
      const updatedUser = await this.usersService.generateNewOtp(user.email);
      const otpCode = updatedUser.verificationCode!;
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #5A96B0; text-align: center;">Xác thực tài khoản DIGVOS</h2>
          <p>Xin chào <strong>${updatedUser.name || 'bạn'}</strong>,</p>
          <p>Tài khoản của bạn chưa được xác thực email. Vui lòng sử dụng mã OTP dưới đây để xác thực và kích hoạt tài khoản:</p>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #334155; margin: 20px 0; border-radius: 8px;">
            ${otpCode}
          </div>
          <p style="color: #64748b; font-size: 12px; text-align: center;">Mã OTP này có hiệu lực trong vòng 10 phút. Tuyệt đối không chia sẻ mã này với bất kỳ ai.</p>
        </div>
      `;
      await this.emailService.sendMail(updatedUser.email, 'Mã xác thực tài khoản DIGVOS', htmlContent);

      return {
        requireVerification: true,
        email: user.email,
      };
    }

    // Check if user has completed onboarding (has profile corresponding to their role)
    const hasOnboarded = 
      (user.role === 'STUDENT' && user.studentProfile) ||
      (user.role === 'TEACHER' && user.teacherProfile) ||
      (user.role === 'EMPLOYER' && user.employerProfile) ||
      user.role === 'ADMIN';

    if (!hasOnboarded) {
      return {
        requireRoleSelection: true,
        email: user.email,
        auth0Sub: user.auth0Sub,
        name: user.name,
      };
    }

    const tokens = await this.generateTokens(user, metadata);
    return {
      requireRoleSelection: false,
      requireVerification: false,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refresh(sessionId: string, oldRefreshToken: string): Promise<TokenResponseDto> {
    // Generate new refresh token
    const newRefreshToken = crypto.randomBytes(32).toString('hex');
    
    // Validate and rotate in DB
    const session = await this.sessionService.validateAndRotateSession(sessionId, oldRefreshToken, newRefreshToken);
    
    // Get user
    const user = await this.usersService.getUserById(session.userId);
    if (!user) throw new UnauthorizedException('User not found');

    // Generate new access token
    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      sessionId: session.id,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 15 * 60, // 15 mins
    };
  }

  async logout(sessionId: string) {
    await this.sessionService.revokeSession(sessionId);
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      // Don't throw error to prevent email enumeration
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    const client = this.redisService.getClient();
    let savedToRedis = false;

    if (client && client.status === 'ready') {
      const cacheKey = `reset-password:${resetToken}`;
      try {
        await client.set(cacheKey, user.id, 'EX', 15 * 60);
        savedToRedis = true;
      } catch (err) {
        // Fallback to database
      }
    }

    if (!savedToRedis) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: expires,
        },
      });
    }

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    
    await this.emailService.sendMail(
      user.email,
      'Password Reset Request - DIGVOS',
      `<p>Hi ${user.name || ''},</p><p>Please click <a href="${resetLink}">here</a> to reset your password. The link is valid for 15 minutes.</p>`
    );
  }

  async resetPassword(token: string, newPassword: string) {
    let userId: string | null = null;
    const client = this.redisService.getClient();

    if (client && client.status === 'ready') {
      const cacheKey = `reset-password:${token}`;
      try {
        userId = await client.get(cacheKey);
        if (userId) {
          await client.del(cacheKey);
        }
      } catch (err) {
        // Fallback to database
      }
    }

    if (!userId) {
      const user = await this.prisma.user.findFirst({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        throw new BadRequestException('Mã khôi phục mật khẩu không hợp lệ hoặc đã hết hạn.');
      }

      userId = user.id;

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });
    }

    // Đổi mật khẩu
    const newPasswordHash = await this.passwordService.hash(newPassword);
    await this.usersService.updatePassword(userId, newPasswordHash);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.passwordHash) {
      throw new NotFoundException('User not found or no password set');
    }

    const isValid = await this.passwordService.verify(user.passwordHash, currentPassword);
    if (!isValid) {
      throw new BadRequestException('Incorrect current password');
    }

    const newPasswordHash = await this.passwordService.hash(newPassword);
    await this.usersService.updatePassword(userId, newPasswordHash);
  }

  async syncAuth0(dto: SyncAuth0Dto, metadata: any) {
    // 1. Check if user already exists by auth0Sub
    let user = await this.prisma.user.findUnique({
      where: { auth0Sub: dto.auth0Sub },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });

    // 2. If not found by auth0Sub, check by email (linked account flow)
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        include: {
          studentProfile: true,
          teacherProfile: true,
          employerProfile: true,
        },
      });

      if (user) {
        // Connect existing account to Auth0
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { auth0Sub: dto.auth0Sub, isEmailVerified: true },
          include: {
            studentProfile: true,
            teacherProfile: true,
            employerProfile: true,
          },
        });
      }
    }

    // 3. If user is completely new (not in DB yet)
    if (!user) {
      const systemTenant = await this.prisma.tenant.findUnique({ where: { domain: 'system.digvos.local' } });
      if (!systemTenant) throw new Error('System Tenant not found');

      const userRole = dto.role || Role.STUDENT;

      user = await this.prisma.user.create({
        data: {
          auth0Sub: dto.auth0Sub,
          email: dto.email,
          name: dto.name,
          role: userRole,
          tenantId: systemTenant.id,
          isEmailVerified: true,
          studentProfile: userRole === 'STUDENT' ? { create: {} } : undefined,
          teacherProfile: userRole === 'TEACHER' ? { create: {} } : undefined,
          employerProfile: userRole === 'EMPLOYER' ? { create: { companyName: 'Chưa cập nhật' } } : undefined,
        },
        include: {
          studentProfile: true,
          teacherProfile: true,
          employerProfile: true,
        },
      });
    }

    // Verify if onboarding is completed (has profile corresponding to their role)
    const hasOnboarded = 
      (user.role === 'STUDENT' && user.studentProfile) ||
      (user.role === 'TEACHER' && user.teacherProfile) ||
      (user.role === 'EMPLOYER' && user.employerProfile) ||
      user.role === 'ADMIN';

    const tokens = await this.generateTokens(user, metadata);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        requireOnboarding: !hasOnboarded,
      },
      ...tokens,
    };
  }

  async onboardUser(userId: string, role: Role) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has already onboarded
    const hasOnboarded = 
      (user.role === 'STUDENT' && user.studentProfile) ||
      (user.role === 'TEACHER' && user.teacherProfile) ||
      (user.role === 'EMPLOYER' && user.employerProfile) ||
      user.role === 'ADMIN';

    if (hasOnboarded) {
      throw new BadRequestException('Tài khoản đã hoàn thành onboarding và không thể thay đổi vai trò.');
    }

    // Cập nhật vai trò và tạo Profile tương ứng
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
        studentProfile: role === 'STUDENT' ? { create: {} } : undefined,
        teacherProfile: role === 'TEACHER' ? { create: {} } : undefined,
        employerProfile: role === 'EMPLOYER' ? { create: { companyName: 'Chưa cập nhật' } } : undefined,
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        employerProfile: true,
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      requireOnboarding: false,
    };
  }

  private async generateTokens(user: any, metadata: any): Promise<TokenResponseDto> {
    const refreshToken = crypto.randomBytes(32).toString('hex');
    
    const session = await this.sessionService.createSession(user.id, refreshToken, metadata);
    
    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      sessionId: session.id,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60, // 15 mins
    };
  }
}
