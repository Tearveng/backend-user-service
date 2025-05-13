import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersEntity } from '../src/entities/Users';
import { TodosEntity } from '../src/entities/Todos';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  // entities: [`${__dirname}/../src/**/*{.ts,.js}`],
  entities: [UsersEntity, TodosEntity],
  synchronize: false,
  logging: configService.get('nodenv') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'user_migrations',
});
