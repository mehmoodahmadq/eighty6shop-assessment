import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  public async get(dateString: string) {
    const date = new Date(dateString);

    const dates = [
      moment(date).format('YYYY-MM-DD HH:mm:ss'),
      moment(date).add('1', 'hours').format('YYYY-MM-DD HH:mm:ss'),
      moment(date).add('2', 'hours').format('YYYY-MM-DD HH:mm:ss'),
    ];

    const { data } = await firstValueFrom(
      this.httpService.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=39.9526&lon=75.1652&appid=${this.config.get(
          'weatherApiToken',
        )}`,
      ),
    );

    return data && data.list
      ? data.list.find((x) => dates.includes(x.dt_txt))
      : {};
  }
}
