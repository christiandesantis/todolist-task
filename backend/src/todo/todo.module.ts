import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { AuthService } from '../auth/service/auth.service';
import { UserService } from '../user/service/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Module({
  providers: [TodoService, AuthService, JwtService, UserService, ConfigService],
  controllers: [TodoController],
  imports: [TypeOrmModule.forFeature([Todo, User])],
})

export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TodoController);
  }
}
