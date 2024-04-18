import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async exists({
    username,
    email,
  }: {
    username: string;
    email: string;
  }): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) return true;
    return false;
  }

  async create(data: UserDto): Promise<User> {
    const user = this.userRepository.save({
      ...data,
      password: await hash(data.password, 10),
    });
    return user;
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(options);
  }
}
