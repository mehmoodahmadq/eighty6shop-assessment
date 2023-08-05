import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';

import { AppController } from './controllers/app.controller';
import { StationController } from './controllers/stations.controller';

import { StationService } from './services/station.service';
import { WeatherService } from './services/weather.service';
import { CronService } from './services/cron.service';
import { SessionMiddleware } from './middlewares/session.middleware';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrismaModule,
  ],
  controllers: [AppController, StationController],
  providers: [StationService, WeatherService, CronService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: '/api/v1/stations', method: RequestMethod.POST });
  }
}
