import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/roles.decoration';
import { RolesGuard } from '../role/roles.guard';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  // constructor(private readonly adminService: AdminService) {}
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/users')
  getAllUsersPagination() {
    return 'Welcome to the admin dashboard';
  }
}
