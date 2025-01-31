// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' }, // Access token expiration time
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtModule],
})
export class JwtAuthModule {}
