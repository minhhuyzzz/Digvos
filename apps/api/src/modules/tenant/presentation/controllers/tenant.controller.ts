import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TenantService } from '../../application/tenant.service';
import { Roles } from '../../../authorization/presentation/decorators/roles.decorator';
import { CreateTenantDto, UpdateTenantDto } from '@digvos/api-contract';

@ApiTags('tenant')
@ApiBearerAuth()
@Controller('api/v1/tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get(':id')
  @Roles('ADMIN', 'TEACHER', 'EMPLOYER', 'STUDENT')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết của Tenant' })
  async getTenant(@Param('id') id: string) {
    return this.tenantService.getTenant(id);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Tạo Tenant mới' })
  async createTenant(@Body() data: CreateTenantDto) {
    return this.tenantService.createTenant(data);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cập nhật Tenant' })
  async updateTenant(@Param('id') id: string, @Body() data: UpdateTenantDto) {
    return this.tenantService.updateTenant(id, data);
  }

  @Get(':id/users')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Danh sách người dùng thuộc Tenant' })
  async listUsers(@Param('id') id: string) {
    return this.tenantService.listUsers(id);
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Danh sách tất cả Tenants (chỉ Admin)' })
  async listTenants() {
    return this.tenantService.listTenants();
  }
}
