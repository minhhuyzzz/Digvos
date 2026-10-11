import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UsersService } from './application/services/users.service';
import { PasswordService } from './application/services/password.service';
import { TokenService } from './application/services/token.service';
import { SessionService } from './application/services/session.service';
import { IdentityService } from './application/identity.service';
import { IdentityController } from './presentation/controllers/identity.controller';
import { IIdentityRepository } from './domain/repositories/identity.repository.interface';
import { PrismaIdentityRepository } from './infrastructure/repositories/prisma-identity.repository';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { PermissionsGuard } from './presentation/guards/permissions.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'super-secret-key-for-dev',
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, IdentityController],
  providers: [
    AuthService,
    UsersService,
    PasswordService,
    TokenService,
    SessionService,
    IdentityService,
    JwtStrategy,
    {
      provide: 'IIdentityRepository',
      useClass: PrismaIdentityRepository,
    },
    // Register JwtAuthGuard globally so all routes require auth by default
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Optionally register PermissionsGuard globally
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [AuthService, UsersService, PasswordService, IdentityService, 'IIdentityRepository'],
})
export class IdentityModule {}
