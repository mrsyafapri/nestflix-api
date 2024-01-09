import { Test, TestingModule } from '@nestjs/testing';
import { CastsController } from './casts.controller';
import { CastsService } from './casts.service';

describe('CastsController', () => {
  let controller: CastsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastsController],
      providers: [CastsService],
    }).compile();

    controller = module.get<CastsController>(CastsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
