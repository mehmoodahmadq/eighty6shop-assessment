import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  /**
   * This function fetches data from weather API and returns the data of current date time.
   * Weather API gives data of every 3 hours so this function will select latest upcoming data.
   * @param {string} dateString - date time string
   */
  public async get(dateString: string) {
    try {
      const date = new Date(dateString);

      const dates = [
        moment(date).format('YYYY-MM-DD HH:mm:ss'),
        moment(date).add('1', 'hours').format('YYYY-MM-DD HH:mm:ss'),
        moment(date).add('2', 'hours').format('YYYY-MM-DD HH:mm:ss'),
        moment(date).add('3', 'hours').format('YYYY-MM-DD HH:mm:ss'),
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
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Unable to fetch data from Weather API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
