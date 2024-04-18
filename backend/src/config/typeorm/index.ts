import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      synchronize: configService.get<boolean>('typeorm.synchronize') || false,
      logging: configService.get<boolean>('typeorm.logging') || false,
      type: configService.get<any>('database.dialect') || 'mysql',
      host: configService.get<string>('database.host') || '127.0.0.1',
      port: configService.get<number>('database.port') || 3306,
      username: configService.get<string>('database.user') || 'root',
      password: configService.get<string>('database.password') || '',
      database: configService.get<string>('database.name') || 'todolist',
      // entities: entities,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    };
  },
};
