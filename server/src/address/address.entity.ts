import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Geolocation } from '../geolocation/geolocation.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  address: string;

  @OneToOne(() => Geolocation, (geo) => geo.Address)
  @JoinColumn()
  geolocation: Geolocation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
