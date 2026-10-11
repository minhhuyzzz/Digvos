import { Controller, Get, Patch, Body, Param, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IdentityService } from '../../application/identity.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Public } from '../decorators/public.decorator';

@ApiTags('identity')
@ApiBearerAuth()
@Controller('api/v1/identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  /**
   * Get authenticated user's own profile.
   * Uses request.user populated by JwtAuthGuard + JwtStrategy.
   */
  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin tài khoản của người dùng hiện tại' })
  async getMyProfile(@Req() req: any) {
    const auth0Sub = req.user?.auth0Sub;
    if (!auth0Sub) {
      // Fallback for dev: sync or return a placeholder
      return { message: 'No authenticated user found. Ensure JWT is provided.' };
    }

    // Auto-sync user on first access (Just-In-Time provisioning)
    return this.identityService.syncAuth0User({
      auth0Sub: req.user.auth0Sub,
      email: req.user.email || 'unknown@digvos.com',
      role: req.user.role,
      tenantId: req.user.tenantId || 'default-tenant-id',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin tài khoản người dùng theo ID' })
  async getUser(@Param('id') id: string) {
    return this.identityService.getUser(id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Cập nhật thông tin cá nhân' })
  async updateMyProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    const auth0Sub = req.user?.auth0Sub;
    if (!auth0Sub) {
      return { message: 'No authenticated user found.' };
    }

    const profile = await this.identityService.getProfile(auth0Sub);
    return this.identityService.updateProfile(profile.id, dto);
  }

  @Get('health/ping')
  @Public()
  @ApiOperation({ summary: 'Kiểm tra sức khỏe Identity module' })
  async ping() {
    return { status: 'ok', module: 'identity' };
  }
}
