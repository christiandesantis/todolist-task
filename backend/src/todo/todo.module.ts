import { Module } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [TypeOrmModule.forFeature([Todo])],
})
export class TodoModule {}
