import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StationService } from './station.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly stationService: StationService) {}

  /**
   * This functions runs after every hour to fetch the latest indigo data
   */
  @Cron('0 * * * *')
  async handleCron() {
    this.logger.log('Called');
    await this.stationService.fetchData();
  }
}
