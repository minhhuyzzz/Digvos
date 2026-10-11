import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FEATURE_FLAG_KEY } from '../decorators/feature-flag.decorator';
import { FeatureFlag } from '../domain/enums/feature-flag.enum';
import { IFeatureFlagService } from '../interfaces/feature-flag.service.interface';
import { requestContextStorage } from '../../../common/core/als.context';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('IFeatureFlagService')
    private readonly featureFlagService: IFeatureFlagService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFlag = this.reflector.getAllAndOverride<FeatureFlag>(FEATURE_FLAG_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredFlag) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // Lấy tenantId từ request hoặc ALS context
    const tenantId = requestContextStorage.getStore()?.tenantId || request.headers['x-tenant-id'] || 'default-tenant-id';

    const enabled = await this.featureFlagService.isEnabled(requiredFlag, tenantId);
    if (!enabled) {
      throw new ForbiddenException(`Feature flag '${requiredFlag}' is disabled for tenant '${tenantId}'`);
    }

    return true;
  }
}
