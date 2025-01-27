import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDTO } from '../../dto/LoginDTO';
import { AuthService } from '../auth/auth.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAllUsersPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.paginateUsers(page, limit);
  }

  @Post('/login')
  async login(@Body() user: LoginDTO) {
    return this.authService.login(user);
  }
}
