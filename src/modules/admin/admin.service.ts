import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../shared/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      roles: user.roles,
    };
  }
}
