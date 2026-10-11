import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { requestContextStorage } from '../../../../common/core/als.context';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  tenantId: string;
  sessionId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'super-secret-key-for-dev',
    });
  }

  async validate(payload: JwtPayload) {
    // Populate ALS context for the current request
    const store = requestContextStorage.getStore();
    if (store) {
      store.userId = payload.sub;
      store.role = payload.role;
      store.tenantId = payload.tenantId;
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      tenantId: payload.tenantId,
      sessionId: payload.sessionId,
    };
  }
}
