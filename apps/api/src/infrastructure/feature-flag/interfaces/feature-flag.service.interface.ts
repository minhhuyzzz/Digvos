import { FeatureFlag } from '../domain/enums/feature-flag.enum';

export interface IFeatureFlagService {
  isEnabled(flag: FeatureFlag, tenantId?: string): Promise<boolean>;
}
