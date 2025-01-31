import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from '../../shared/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { UsersEntity } from '../../entities/Users';
import { decodeToken, isTokenExpired } from '../../utils/Jwt.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async validateRefreshToken(refreshToken: string) {
    const decodedToken = decodeToken(this.jwtService, refreshToken);
    return isTokenExpired(decodedToken);
  }

  async findUserById(id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async refreshToken(refreshToken: string) {
    const expired = await this.validateRefreshToken(refreshToken);
    if (expired) {
      throw new UnauthorizedException('Refresh token is expired or invalid');
    }
    const decodedToken = decodeToken(this.jwtService, refreshToken);
    console.log('decodedToken', decodedToken);
    const user = await this.findUserById(decodedToken.sub);
    return this.login(user);
  }

  async login(user: UsersEntity) {
    const payload: JwtPayload = {
      username: user.username,
      sub: `${user.id}`,
      roles: user.roles,
    };
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profile: user.profile,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      roles: user.roles,
    };
  }
}
