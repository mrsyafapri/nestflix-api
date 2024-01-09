import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column({ type: 'timestamp', nullable: true })
  deadday: Date;

  @Column({ type: 'int' })
  rating: number;

  @ManyToMany(() => Movie, (movie) => movie.casts)
  movies: Movie[];

  horoscope: string;

  isLeap: boolean;
}
