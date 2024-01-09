import { Test, TestingModule } from '@nestjs/testing';
import { MovieCastsController } from './movie-casts.controller';
import { MovieCastsService } from './movie-casts.service';

describe('MovieCastsController', () => {
  let controller: MovieCastsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieCastsController],
      providers: [MovieCastsService],
    }).compile();

    controller = module.get<MovieCastsController>(MovieCastsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
