import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const typeOrmConfig: DataSourceOptions = {
  synchronize: process.env.NEST_TYPEORM_SYNC === 'true' || false,
  logging: process.env.NEST_TYPEORM_LOG === 'true' || false,
  migrationsRun: true,
  type: (process.env.DB_DIALECT as unknown as any) || 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quasarnest',
  // entities: entities,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
