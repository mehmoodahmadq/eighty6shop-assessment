import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  public async get(dateString: string, kioskid?: string) {
    await this.fetchData();

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
  }

  public async fetchData() {
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
  }
}
