import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config';
import { CloudinaryModule } from './shared/cloudinary/cloudinary.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/role/roles.guard';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { HeadersMiddleware } from './shared/services/HeadersMiddleware';
import { RequestContextService } from './shared/services/RequestContextService';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    CloudinaryModule,
    UserModule,
    TodoModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RequestContextService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply globally
    },
  ],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    // Apply the middleware globally
    consumer.apply(HeadersMiddleware).forRoutes('*');
  }
}
