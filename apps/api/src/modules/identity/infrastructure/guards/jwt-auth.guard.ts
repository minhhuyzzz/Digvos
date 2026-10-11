import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../presentation/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Allow access to routes marked with @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let authHeader = request.headers['authorization'];
    if (!authHeader && request.query && request.query.token) {
      authHeader = `Bearer ${request.query.token}`;
    }

    // Dev mode bypass: allow mock student/teacher tokens ONLY in non-production environments
    if (process.env.NODE_ENV !== 'production' && authHeader && authHeader.startsWith('Bearer mock-')) {
      const isTeacher = authHeader === 'Bearer mock-teacher' || request.headers['x-user-role'] === 'TEACHER';
      const role = isTeacher ? 'TEACHER' : 'STUDENT';
      const sub = isTeacher ? 'auth0|default-teacher-456' : 'auth0|default-student-123';
      const email = isTeacher ? 'teacher@digvos.edu.vn' : 'student@digvos.edu.vn';

      request.user = {
        auth0Sub: sub,
        email: email,
        role: role,
        tenantId: 'default-tenant-id',
      };
      return true;
    }

    return super.canActivate(context);
  }
}
