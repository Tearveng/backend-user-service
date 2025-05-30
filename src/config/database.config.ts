import { registerAs } from '@nestjs/config';
import { UsersEntity } from '../entities/Users';
import { TodosEntity } from '../entities/Todos';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, //'eiii_kommerce'
  entities: [UsersEntity, TodosEntity],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'user_migrations',
}));
