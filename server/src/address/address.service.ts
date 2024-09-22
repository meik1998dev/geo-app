import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { GeolocationService } from '../geolocation/geolocation.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly AddressRepository: Repository<Address>,
    private readonly geolocationService: GeolocationService,
  ) {}

  async findByAddress(address: string): Promise<Address | undefined> {
    return await this.AddressRepository.findOne({
      where: { address },
      relations: ['geolocation'],
    });
  }

  async createAddress(address: string): Promise<Address> {
    const geolocation = await this.geolocationService.fetchGeolocation(address);

    if (!geolocation) {
      throw new HttpException(
        'Geolocation could not be found',
        HttpStatus.NOT_FOUND,
      );
    }

    const newAddress = this.AddressRepository.create({ address, geolocation });
    await this.AddressRepository.save(newAddress);
    return newAddress;
  }
}
