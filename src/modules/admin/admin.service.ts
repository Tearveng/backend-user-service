import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../shared/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO } from '../../dto/RegisterUserDTO';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(user: RegisterUserDTO) {
    return this.usersService.createUser({
      ...user,
      roles: ['USER'],
    });
  }
}
