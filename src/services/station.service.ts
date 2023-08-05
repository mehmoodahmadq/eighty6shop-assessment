import { Injectable } from '@nestjs/common';

@Injectable()
export class StationService {
  public async get(date: string) {
    return 'yeah';
  }
}
