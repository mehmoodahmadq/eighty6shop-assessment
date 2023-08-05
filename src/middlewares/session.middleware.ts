import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.token &&
      req.headers.token == this.config.get('sessionToken')
    ) {
      next();
    } else {
      return res.status(401).json({ status: 'token invalid' });
    }
  }
}
