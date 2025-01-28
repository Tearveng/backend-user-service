import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDTO } from '../../dto/RegisterUserDTO';
import { UserService } from '../user/user.service';
import { AdminService } from './admin.service';

@Controller('ADMIN')
@ApiTags('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) {}

  // constructor(private readonly adminService: AdminService) {}
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get('/users')
  @Get()
    async getAllUsersPagination(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ) {
      return this.userService.paginateUsers(page, limit);
    }

  @Post('/create-user')
  createUser(@Body() payload: RegisterUserDTO) {
    console.log("payload", payload)
    return this.adminService.registerUser(payload);
  }
}
