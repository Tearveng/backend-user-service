import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from '../../dto/todos/create-todo.dto';
import { Roles } from '../role/roles.decoration';
import { RolesGuard } from '../role/roles.guard';
import { UpdateTodoOrderDto } from '../../dto/todos/update-todo-order.dto';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  // constructor(private readonly adminService: AdminService) {}
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/create-todos')
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(req, createTodoDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async getAllTodos(@Request() req) {
    return this.todosService.getAllTodos(req);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/update-todos/:id')
  async update(@Param('id') id: number, @Body() updateTodoDto: CreateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/delete-todos/:id')
  async delete(@Param('id') id: number) {
    return this.todosService.deleteUser(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/reorder')
  async updateOrder(@Body() body: UpdateTodoOrderDto) {
    return this.todosService.updateOrder(body.orderedTodoIds);
  }
}
