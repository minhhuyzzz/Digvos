import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeatureFlag } from '../domain/enums/feature-flag.enum';
import { IFeatureFlagService } from '../interfaces/feature-flag.service.interface';

@Injectable()
export class FeatureFlagService implements IFeatureFlagService {
  private readonly logger = new Logger(FeatureFlagService.name);

  constructor(private readonly configService: ConfigService) {}

  async isEnabled(flag: FeatureFlag, tenantId?: string): Promise<boolean> {
    try {
      // 1. Kiểm tra cấu hình cụ thể theo Tenant trước (SaaS multi-tenancy override)
      if (tenantId) {
        const tenantOverride = this.configService.get<boolean>(`FF_${flag}_TENANT_${tenantId.toUpperCase()}`);
        if (tenantOverride !== undefined) {
          return tenantOverride;
        }
      }

      // 2. Kiểm tra biến môi trường chung (Global environment override)
      const globalOverride = this.configService.get<string>(`FF_${flag}`);
      if (globalOverride !== undefined) {
        return globalOverride === 'true' || globalOverride === '1';
      }

      // 3. Fallback mặc định cho các flag
      switch (flag) {
        case FeatureFlag.AI_GRADING:
          return true; // Mặc định bật
        case FeatureFlag.REALTIME_NOTIFICATIONS:
          return true; // Mặc định bật
        case FeatureFlag.MAINTENANCE_MODE:
          return false; // Mặc định tắt
        default:
          return false;
      }
    } catch (err) {
      this.logger.error(`Error checking feature flag ${flag}: ${err.message}`);
      return false; // Safe fallback
    }
  }
}
