import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geolocation } from './geolocation.entity';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Geolocation)
    private readonly geolocationRepository: Repository<Geolocation>,
  ) {}

  async fetchGeolocation(Address: string): Promise<Geolocation | null> {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(Address)}&format=json&limit=1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const geolocation = this.geolocationRepository.create({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });

        await this.geolocationRepository.save(geolocation);
        return geolocation;
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      return null;
    }

    return null;
  }
}
