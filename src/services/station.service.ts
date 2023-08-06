import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationService {
  private readonly logger = new Logger(StationService.name);

  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  /**
   * This function returns indigo data based on date time and kioskid provided.
   * @param {string} dateString - date time string
   * @param {string} kioskid - (Optional, kioskid for getting specific record)
   */
  public async get(dateString: string, kioskid?: string) {
    try {
      const date = new Date(dateString);

      const data: any = await this.prisma.indigo.findFirst({
        where: {
          last_updated: {
            gte: moment(date).set({ minute: 0, second: 0 }).toISOString(),
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      if (kioskid) {
        return data.data.find((x) => x.properties.id == kioskid);
      } else {
        return data;
      }
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Unable to fetch indigo stations data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * This function fetches the data from indigo and saves in the database
   */
  public async fetchData() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`https://www.rideindego.com/stations/json/`),
      );

      const last_updated = new Date(data.last_updated);

      if (data) {
        await this.prisma.indigo.upsert({
          where: { last_updated: last_updated.toISOString() },
          update: { data: data.features },
          create: {
            last_updated: last_updated.toISOString(),
            data: data.features,
          },
        });
      }
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'Unable to fetch data from Indigo API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
