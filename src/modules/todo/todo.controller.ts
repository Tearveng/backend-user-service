import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../../dto/todos/create-todo.dto';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }
}
