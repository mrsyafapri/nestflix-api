import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieCast } from './entities/movie-cast.entity';

@Injectable()
export class MovieCastsService {
  constructor(
    @InjectRepository(MovieCast)
    private movieCastRepository: Repository<MovieCast>,
  ) {}

  async findAll(): Promise<any> {
    const movieCasts = await this.movieCastRepository.find({
      relations: ['cast', 'movie'],
    });

    const result = [];
    movieCasts.forEach((movieCast) => {
      const movieIndex = result.findIndex((m) => m.id === movieCast.movieId);
      const castData = {
        name: movieCast.cast.name,
        birthday: movieCast.cast.birthday.toISOString().split('T')[0],
        deadday: movieCast.cast.deadday?.toISOString().split('T')[0] || null,
      };

      if (movieIndex !== -1) {
        result[movieIndex].casts.push(castData);
      } else {
        result.push({
          id: movieCast.movieId,
          name: movieCast.movie.title,
          casts: [castData],
        });
      }
    });
    return result;
  }

  async findOne(movieId: number): Promise<any> {
    const movieCasts = await this.movieCastRepository.find({
      where: { movieId },
      relations: ['cast', 'movie'],
    });

    const result = {};
    movieCasts.forEach((movieCast) => {
      const castData = {
        name: movieCast.cast.name,
        birthday: movieCast.cast.birthday.toISOString().split('T')[0],
        deadday: movieCast.cast.deadday?.toISOString().split('T')[0] || null,
      };

      if (result['id']) {
        result['casts'].push(castData);
      } else {
        result['id'] = movieCast.movieId;
        result['name'] = movieCast.movie.title;
        result['casts'] = [castData];
      }
    });
    return result;
  }
}
