import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../role/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [UserModule, TodoModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtService],
})
export class AuthModule {}
