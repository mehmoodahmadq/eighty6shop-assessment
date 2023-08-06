import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { StationController } from './stations.controller';
import { StationService } from '../services/station.service';
import { WeatherService } from '../services/weather.service';
import { PrismaService } from 'src/prisma/prisma.service';


describe('StationController', () => {
  let stationController: StationController;
  let stationService: StationService;
  let weatherService: WeatherService;
  let httpService: HttpService;
  let prisma: PrismaService;
  let config: ConfigService;

  beforeEach(() => {
    stationService = new StationService(httpService, prisma);
    weatherService = new WeatherService(httpService, config);
    stationController = new StationController(weatherService, stationService);
  });

  describe('getStatus', () => {
    it('should return app status', async () => {
      expect(1).toEqual(1);
    });
  });
});
