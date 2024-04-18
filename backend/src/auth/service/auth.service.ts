import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { UserService } from '../../user/service/user.service';
import { compare } from 'bcrypt';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: LoginDto): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { username: data.username },
    });
    if (user && (await compare(data.password, user.password))) return user;
    return null;
  }

  async signAsync(
    payload: Buffer | object,
    options?: JwtSignOptions,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      ...{
        expiresIn: this.configService.get<string>('jwt.expiresIn') || '1d',
        secret: this.configService.get<string>('jwt.secret') || 'secret123',
      },
      ...options,
    });
  }

  async verifyAsync(token: string, options?: JwtVerifyOptions): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      ...{
        secret: this.configService.get<string>('jwt.secret') || 'secret123',
      },
      ...options,
    });
  }

  extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' && token ? token : null;
  }
}
