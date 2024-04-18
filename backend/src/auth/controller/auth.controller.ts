import {
  Body,
  Request,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { RefreshJwtGuard } from '../guards/refresh.guard';

const EXPIRE_TIME = 20 * 1000;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('register')
  async registerUser(@Body() body: RegisterDto) {
    const { name, lastname, email, username, pswd } = body;
    const userExists = await this.userService.exists({
      email,
      username,
    });
    if (userExists)
      throw new ConflictException('Username or email already taken');
    const user = await this.userService.create({
      name,
      lastname,
      email,
      username,
      password: pswd,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  @Post('login')
  async loginUser(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body);
    if (!user) throw new UnauthorizedException();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, id, ...result } = user;
    const payload = { id, sub: result };
    const accessToken = await this.authService.signAsync(payload, {
      expiresIn: '5h',
    });
    const refreshToken = await this.authService.signAsync(payload, {
      expiresIn: '7d',
    });
    return {
      user: { ...result, ...{ id } },
      accessToken,
      refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const payload = {
      id: req.user.id,
      sub: req.user.sub,
    };
    return {
      accessToken: await this.authService.signAsync(payload, {
        expiresIn: '5h',
      }),
      refreshToken: await this.authService.signAsync(payload, {
        expiresIn: '7d',
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
