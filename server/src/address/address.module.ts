import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeolocationModule } from 'src/geolocation/geolocation.module';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), GeolocationModule],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}
