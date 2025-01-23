import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsersPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.paginateUsers(page, limit);
  }
}
