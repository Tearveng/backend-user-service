import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
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
    @Request() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.paginateUsers(req, page, limit);
  }

  // @Post('/login')
  // async login(@Body() user: LoginDTO) {
  //   return this.authService.login(user);
  // }

  @Get('/user/:id')
  async getById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
