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
import { UsersEntity } from '../../entities/Users';
import { Roles } from '../role/roles.decoration';
import { RolesGuard } from '../role/roles.guard';
import { UserService } from '../user/user.service';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  // constructor(private readonly adminService: AdminService) {}
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/users')
  async getAllUsersPagination(
    @Request() req,
    @Query('role') role: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.paginateUsers(req, page, limit, role);
  }

  @Roles('ADMIN')
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

  @Get('/search-users')
  async searchProducts(@Query('search') search: string) {
    return this.userService.searchUsers(search);
  }

  @Put('/update-users/:id')
  async update(@Param('id') id: number, @Body() payload: UpdateUserDTO) {
    return this.adminService.updateUser(id, payload);
  }

  @Delete('/delete-users/:id')
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/change-role/:id')
  async changeRole(@Param('id') id: number, @Query('role') role: string) {
    return this.userService.changeRole(id, role);
  }
}
