import { Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from '../../shared/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO, UpdateUserDTO } from '../../dto/RegisterUserDTO';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entities/Users';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // register user
  async registerUser(user: RegisterUserDTO) {
    return this.usersService.createUser({
      ...user,
      roles: ['ADMIN'],
    });
  }

  // update user
  async updateUser(id: number, user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }
}
