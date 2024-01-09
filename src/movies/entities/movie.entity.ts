import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Cast } from 'src/casts/entities/cast.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  language: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'float' })
  rating: number;

  @ManyToMany(() => Cast, (cast) => cast.movies)
  casts: Cast[];
}
