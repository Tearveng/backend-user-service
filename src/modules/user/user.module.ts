import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../entities/Users';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    forwardRef(() => TodoModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
