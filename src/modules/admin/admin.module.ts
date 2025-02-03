import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ClientService } from '../../shared/services/ClientService';
import { HttpService } from '@nestjs/axios';
import { AxiosConfigModule } from '../../config/axios/axios-config.module';

@Module({
  imports: [UserModule, AxiosConfigModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    AuthService,
    ClientService,
    HttpService,
    JwtService,
  ],
})
export class AdminModule {}
