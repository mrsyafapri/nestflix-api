import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { Cast } from '../../casts/entities/cast.entity';

@Entity()
export class MovieCast {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @PrimaryColumn({ type: 'bigint', name: 'movie_id' })
  movieId: number;

  @PrimaryColumn({ type: 'bigint', name: 'cast_id' })
  castId: number;

  @ManyToOne(() => Movie, (movie) => movie.casts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: Movie;

  @ManyToOne(() => Cast, (cast) => cast.movies, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'cast_id', referencedColumnName: 'id' })
  cast: Cast;
}
