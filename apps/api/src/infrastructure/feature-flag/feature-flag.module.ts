import { Module, Global } from '@nestjs/common';
import { FeatureFlagService } from './services/feature-flag.service';
import { FeatureFlagGuard } from './guards/feature-flag.guard';

@Global()
@Module({
  providers: [
    {
      provide: 'IFeatureFlagService',
      useClass: FeatureFlagService,
    },
    FeatureFlagGuard,
  ],
  exports: [
    'IFeatureFlagService',
    FeatureFlagGuard,
  ],
})
export class FeatureFlagModule {}
