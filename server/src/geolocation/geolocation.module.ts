import { Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geolocation } from './geolocation.entity';

@Module({
  providers: [GeolocationService],
  exports: [GeolocationService],
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([Geolocation]), // Import Address repository
  ],
})
export class GeolocationModule {}
