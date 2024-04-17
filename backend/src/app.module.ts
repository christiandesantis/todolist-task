import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';
import { typeOrmAsyncConfig } from './config/typeorm';
import { CommandModule } from 'nestjs-command';
import { CommandService } from './command/command.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CommandModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommandService],
})
export class AppModule {}
