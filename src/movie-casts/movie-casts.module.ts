import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCastsService } from './movie-casts.service';
import { MovieCastsController } from './movie-casts.controller';
import { MovieCast } from './entities/movie-cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCast])],
  controllers: [MovieCastsController],
  providers: [MovieCastsService],
})
export class MovieCastsModule {}
