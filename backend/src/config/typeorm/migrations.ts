import { typeOrmConfig } from './cli';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(typeOrmConfig);
