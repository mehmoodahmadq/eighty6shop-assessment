import { Controller, Param, Post, Query, Res } from '@nestjs/common';

import { StationService } from 'src/services/station.service';
import { WeatherService } from 'src/services/weather.service';

@Controller()
export class StationController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly stationService: StationService,
  ) {}

  /**
   * This endpoint is used to fetch latest data from indigo API and save in DB
   */
  @Post('api/v1/indego-data-fetch-and-store-it-db')
  async fetch(@Res() res) {
    await this.stationService.fetchData();
    return res.status(200).json({ status: 'latest indigo data fetched' });
  }

  /**
   * Get the data of all stations based on provided date
   */
  @Post('/api/v1/stations')
  async getAll(@Res() res, @Query() query) {
    if (!query.at) {
      return res.status(400).json({
        error: 'Empty value for date for field [at] provided',
      });
    }

    const station = await this.stationService.get(query.at);
    const weather = await this.weatherService.get(query.at);

    return res.status(200).json({ at: query.at, station, weather });
  }

  /**
   * Get the data of all stations based on provided date and kioskid
   */
  @Post('/api/v1/stations/:kioskid')
  async getOne(@Res() res, @Query() query, @Param('kioskid') kioskid) {
    if (!query.at) {
      return res.status(400).json({
        error: 'Empty value for date for field [at] provided',
      });
    }

    const station = await this.stationService.get(query.at, kioskid);
    const weather = await this.weatherService.get(query.at);

    return res.status(200).json({ at: query.at, station, weather });
  }
}
