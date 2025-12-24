import { Test, TestingModule } from '@nestjs/testing';
import { FamilyHistoriesService } from './family-histories.service';

describe('FamilyHistoriesService', () => {
  let service: FamilyHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyHistoriesService],
    }).compile();

    service = module.get<FamilyHistoriesService>(FamilyHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
