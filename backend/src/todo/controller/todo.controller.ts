import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Request,
  NotFoundException,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { TodoDto } from '../dto/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Request() req) {
    if (!req.user.id) throw new BadRequestException();
    return await this.todoService.findAll({
      where: { user_id: req.user.id },
      order: { id: 'DESC' },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    if (!req.user.id) throw new BadRequestException();
    const todo = await this.todoService.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  async create(@Request() req, @Body() body: TodoDto) {
    if (!body.title) {
      throw new BadRequestException('Title is required');
    }
    return await this.todoService.create({ ...body, user_id: req.user.id });
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
