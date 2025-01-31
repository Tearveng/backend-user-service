// src/auth/guards/refresh-token.guard.ts
import { CanActivate, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RefreshTokenGuard extends JwtAuthGuard implements CanActivate {
  constructor() {
    super();
  }
}
