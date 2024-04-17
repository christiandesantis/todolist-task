import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Delete,
  // Req,
  // UnauthorizedException,
  NotFoundException,
  Put,
  BadRequestException,
} from '@nestjs/common';
// import { Request } from 'express';
import { TodoService } from '../service/todo.service';
import { TodoDto } from '../todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  private readonly logger = new Logger(TodoController.name);

  @Get()
  async findAll() {
    this.logger.debug('Fetching all todos');
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const todo = await this.todoService.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  async create(@Body() body: TodoDto) {
    this.logger.debug(body);
    if (!body.title) {
      throw new BadRequestException('Title is required');
    }
    return await this.todoService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: TodoDto) {
    const todo = await this.todoService.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    if (!body.title) {
      throw new BadRequestException('Title is required');
    }
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const todo = await this.todoService.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return await this.todoService.remove(id);
  }
}
