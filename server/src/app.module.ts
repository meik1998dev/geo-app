import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeolocationModule } from './geolocation/geolocation.module';
import { GeolocationService } from './geolocation/geolocation.service';
import { AppDataSource } from './data-source';
import { AddressController } from './address/address.controller';
import { Address } from './address/address.entity';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';
import { Geolocation } from './geolocation/geolocation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return {
          ...AppDataSource.options,
        };
      },
    }),
    TypeOrmModule.forFeature([Address, Geolocation]),
    AddressModule,
    GeolocationModule,
  ],
  controllers: [AddressController],
  providers: [AddressService, GeolocationService],
})
export class AppModule {}
