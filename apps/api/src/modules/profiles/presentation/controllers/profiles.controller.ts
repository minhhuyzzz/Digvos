import { Controller, Get, Put, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfilesService } from '../../application/services/profiles.service';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';
import { UpdateProfileDto } from '@digvos/api-contract';

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('api/v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @Roles('ADMIN', 'TEACHER', 'EMPLOYER', 'STUDENT')
  @ApiOperation({ summary: 'Lấy thông tin profile của tôi' })
  async getMyProfile(@Req() req: any) {
    return this.profilesService.getProfile(req.user.id, req.user.role);
  }

  @Put('me')
  @Roles('TEACHER', 'EMPLOYER', 'STUDENT')
  @ApiOperation({ summary: 'Cập nhật thông tin profile cá nhân' })
  async updateMyProfile(@Req() req: any, @Body() data: UpdateProfileDto) {
    return this.profilesService.updateProfile(req.user.id, req.user.role, data);
  }
}
