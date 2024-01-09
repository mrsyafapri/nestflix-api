import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<CreateMovieDto> {
    return this.movieRepository.save(createMovieDto);
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }

  update(id: number, updateMovieDto: UpdateMovieDto): Promise<UpdateResult> {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.movieRepository.delete(id);
  }
}
