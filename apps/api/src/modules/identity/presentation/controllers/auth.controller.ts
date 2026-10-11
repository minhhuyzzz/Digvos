import { Controller, Post, Body, Req, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from '@digvos/api-contract';
import { SyncAuth0Dto } from '../dto/sync-auth0.dto';
import { OnboardDto } from '../dto/onboard.dto';
import { LocalRegisterDto } from '../dto/register.dto';
import { LocalLoginDto } from '../dto/login.dto';
import { Request, Response } from 'express';
import { Public } from '../decorators/public.decorator';

import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  code: string;
}

export class ResendOtpDto {
  @IsEmail()
  email: string;
}

export class SendRegisterOtpDto {
  @IsEmail()
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('send-register-otp')
  @HttpCode(HttpStatus.OK)
  async sendRegisterOtp(@Body() dto: SendRegisterOtpDto) {
    return this.authService.sendRegisterOtp(dto.email);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: LocalRegisterDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const metadata = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
    const result = await this.authService.register(dto, metadata);
    this.setRefreshTokenCookie(res, result.refreshToken, result.accessToken);
    return { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user };
  }

  @Public()
  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const metadata = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
    const result = await this.authService.verifyEmail(dto.email, dto.code, metadata);
    this.setRefreshTokenCookie(res, result.refreshToken, result.accessToken);
    return { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user };
  }

  @Public()
  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto.email);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LocalLoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const metadata = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
    const result = await this.authService.login(dto, metadata);
    if (result && (result.requireVerification || result.requireRoleSelection)) {
      return result;
    }
    this.setRefreshTokenCookie(res, result.refreshToken, result.accessToken);
    return { 
      accessToken: result.accessToken, 
      expiresIn: result.expiresIn,
      user: result.user 
    };
  }

  @Public()
  @Post('sync-auth0')
  @HttpCode(HttpStatus.OK)
  async syncAuth0(@Body() dto: SyncAuth0Dto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const metadata = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
    const result = await this.authService.syncAuth0(dto, metadata);
    
    this.setRefreshTokenCookie(res, result.refreshToken, result.accessToken);
    return {
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
      user: result.user
    };
  }

  @Post('onboard')
  @HttpCode(HttpStatus.OK)
  async onboard(@Body() dto: OnboardDto, @Req() req: any) {
    const userId = req.user.id;
    return this.authService.onboardUser(userId, dto.role);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    // Note: We need a way to extract sessionId, usually encoded in the access token or stored alongside refresh token.
    // For this example, let's assume the client passes sessionId in header or we decode the old access token.
    // Better approach: Store sessionId in the cookie value itself like `sessionId:refreshTokenString`
    if (!refreshToken) throw new Error('No refresh token');

    const [sessionId, tokenString] = refreshToken.split(':');
    const result = await this.authService.refresh(sessionId, tokenString);
    
    this.setRefreshTokenCookie(res, result.refreshToken, result.accessToken, sessionId);
    return { accessToken: result.accessToken, expiresIn: result.expiresIn };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      const [sessionId] = refreshToken.split(':');
      await this.authService.logout(sessionId);
    }
    res.clearCookie('refresh_token');
    return { success: true };
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto.email);
    return { success: true, message: 'If email exists, a reset link will be sent.' };
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.newPassword);
    return { success: true };
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: any) {
    const userId = req.user.id;
    await this.authService.changePassword(userId, dto.currentPassword, dto.newPassword);
    return { success: true };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string, accessToken: string, existingSessionId?: string) {
    // In a real app, decode access token to get sessionId, or use existing
    let sessionId = existingSessionId;
    if (!sessionId) {
        try {
            const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
            sessionId = payload.sessionId;
        } catch(e) {}
    }

    res.cookie('refresh_token', `${sessionId}:${refreshToken}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
