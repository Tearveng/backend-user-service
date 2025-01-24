import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/roles.decoration';
import { RolesGuard } from '../role/roles.guard';
import { RegisterUserDTO } from '../../dto/RegisterUserDTO';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  // constructor(private readonly adminService: AdminService) {}
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/users')
  getAllUsersPagination(@Request() request) {
    return 'Welcome to the admin dashboard';
  }

  @Post()
  createUser(@Body() payload: RegisterUserDTO) {}
}
