import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../auth/service/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.authService.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.authService.verifyAsync(token);
      req['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    next();
  }
}
