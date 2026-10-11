import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/services/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  hashRefreshToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async createSession(
    userId: string,
    refreshToken: string,
    metadata: { ip?: string; userAgent?: string; deviceId?: string; platform?: string; browser?: string; location?: string }
  ) {
    const hashedToken = this.hashRefreshToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    return this.prisma.userSession.create({
      data: {
        userId,
        refreshTokenHash: hashedToken,
        expiresAt,
        ip: metadata.ip,
        userAgent: metadata.userAgent,
        deviceId: metadata.deviceId,
        platform: metadata.platform,
        browser: metadata.browser,
        location: metadata.location,
      },
    });
  }

  async validateAndRotateSession(
    sessionId: string,
    oldRefreshToken: string,
    newRefreshToken: string
  ) {
    const session = await this.prisma.userSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.revokedAt) {
      throw new Error('Session is invalid or revoked');
    }

    if (session.expiresAt < new Date()) {
      throw new Error('Session expired');
    }

    const oldHashed = this.hashRefreshToken(oldRefreshToken);
    if (session.refreshTokenHash !== oldHashed) {
      // Reuse Detection - someone tried to use an old token!
      await this.revokeAllUserSessions(session.userId);
      throw new Error('Security breach: Token reuse detected. All sessions revoked.');
    }

    // Rotate
    const newHashed = this.hashRefreshToken(newRefreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    return this.prisma.userSession.update({
      where: { id: sessionId },
      data: {
        refreshTokenHash: newHashed,
        expiresAt,
        lastActivity: new Date(),
      },
    });
  }

  async revokeSession(sessionId: string) {
    return this.prisma.userSession.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllUserSessions(userId: string) {
    return this.prisma.userSession.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
