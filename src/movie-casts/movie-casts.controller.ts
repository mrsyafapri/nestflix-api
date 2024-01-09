import { Controller, Get, Param } from '@nestjs/common';
import { MovieCastsService } from './movie-casts.service';

@Controller('movie-casts')
export class MovieCastsController {
  constructor(private readonly movieCastsService: MovieCastsService) {}

  @Get()
  findAll(): Promise<any> {
    return this.movieCastsService.findAll();
  }

  @Get(':movieId')
  findOne(@Param('movieId') movieId: string): Promise<any> {
    return this.movieCastsService.findOne(+movieId);
  }
}
