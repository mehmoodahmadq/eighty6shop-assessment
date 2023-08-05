import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  /**
   * API status endpoint
   */
  @Get('/')
  public getStatus() {
    return { status: 'working', apiVersion: '0.0.1' };
  }
}
