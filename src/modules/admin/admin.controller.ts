import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO, UpdateUserDTO } from '../../dto/RegisterUserDTO';
import { UserService } from '../user/user.service';
import { AdminService } from './admin.service';
import { RolesGuard } from '../role/roles.guard';
import { Roles } from '../role/roles.decoration';
import { UsersEntity } from '../../entities/Users';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  // constructor(private readonly adminService: AdminService) {}
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get('/users')
  async getAllUsersPagination(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.paginateUsers(page, limit);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/user-info')
  async getById(@Request() req: any) {
    return this.userService.findById(req.user.userId);
  }

  @Get('/search-users')
  async searchUsers(
    @Query('search') search: string,
    @Query('key') key: keyof UsersEntity,
  ) {
    return this.userService.searchUser(key, search);
  }

  @Post('/create-user')
  createUser(@Body() payload: RegisterUserDTO) {
    return this.adminService.registerUser(payload);
  }

  @Put('/update-users/:id')
  async update(@Param('id') id: number, @Body() payload: UpdateUserDTO) {
    return this.adminService.updateUser(id, payload);
  }

  @Delete('/delete-users/:id')
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
