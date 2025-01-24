import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../shared/jwt-payload.interface';
import { LoginDTO } from '../../dto/LoginDTO';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const validateUser = await this.validateUser(user.email, user.password);
    if (!validateUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {
      username: validateUser.username,
      sub: `${validateUser.id}`,
    };
    return {
      username: validateUser.username,
      email: validateUser.email,
      access_token: this.jwtService.sign(payload),
      roles: validateUser.roles,
    };
  }
}
