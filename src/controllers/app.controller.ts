import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  /**
   * API status endpoint
   */
  @Get('/')
  public getStatus() {
    return { status: 'working', apiVersion: '0.0.1' };
  }
}
