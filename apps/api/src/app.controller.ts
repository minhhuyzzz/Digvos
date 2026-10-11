import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@digvos/api-contract';
import { Public } from './modules/identity/presentation/decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  @Get()
  getHello(): ApiResponse<string> {
    return {
      success: true,
      data: 'DIGVOS API System Online',
      error: null,
    };
  }
}
