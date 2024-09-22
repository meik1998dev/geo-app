import { DataSource } from 'typeorm';
import { Geolocation } from './geolocation/geolocation.entity';
import { Address } from './address/address.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Address, Geolocation],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
});
