import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodosEntity } from '../../entities/Todos';
import { UsersEntity } from '../../entities/Users';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity, UsersEntity])],
  controllers: [TodoController],
  providers: [TodoService, UserService, JwtService],
  exports: [TodoService],
})
export class TodoModule {}
