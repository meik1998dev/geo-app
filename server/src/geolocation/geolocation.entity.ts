import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Address } from '../address/address.entity';

@Entity()
export class Geolocation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Address, (Address) => Address.geolocation)
  Address: Address;

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
