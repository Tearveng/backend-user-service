import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../role/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('/refresh-token')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
