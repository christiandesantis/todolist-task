import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  DeleteResult,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { Todo } from '../todo.entity';
import { TodoDto } from '../dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(data: TodoDto): Promise<Todo> {
    const todo = this.todoRepository.save(data);
    return todo;
  }

  async findOne(options: FindOneOptions<Todo>): Promise<Todo> {
    return this.todoRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Todo>): Promise<Todo[]> {
    return this.todoRepository.find(options);
  }

  async update(id: number, data: TodoDto): Promise<Todo> {
    await this.todoRepository.update(id, data);
    return this.todoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }
}
