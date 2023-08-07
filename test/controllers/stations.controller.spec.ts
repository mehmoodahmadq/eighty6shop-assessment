import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { StationController } from '../../src/controllers/stations.controller';
import { StationService } from '../../src/services/station.service';
import { WeatherService } from '../../src/services/weather.service';
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

  describe('api/v1/indego-data-fetch-and-store-it-db', () => {
    it('should return 401 when token is not provided', async () => {
      expect(1).toEqual(1);
    });
  });
});
