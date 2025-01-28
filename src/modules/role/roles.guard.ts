import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtPayload } from 'src/shared/jwt-payload.interface';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload: JwtPayload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
        roles: tokenPayload.roles
      };

      return tokenPayload.roles.includes('ADMIN');
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
