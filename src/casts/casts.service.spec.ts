import { Test, TestingModule } from '@nestjs/testing';
import { CastsService } from './casts.service';

describe('CastsService', () => {
  let service: CastsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastsService],
    }).compile();

    service = module.get<CastsService>(CastsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
