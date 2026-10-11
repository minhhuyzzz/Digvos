import { SetMetadata } from '@nestjs/common';
import { FeatureFlag } from '../domain/enums/feature-flag.enum';

export const FEATURE_FLAG_KEY = 'feature_flag';
export const RequireFeatureFlag = (flag: FeatureFlag) => SetMetadata(FEATURE_FLAG_KEY, flag);
