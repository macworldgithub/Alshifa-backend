import { Test, TestingModule } from '@nestjs/testing';
import { SocialHistoriesService } from './social-histories.service';

describe('SocialHistoriesService', () => {
  let service: SocialHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialHistoriesService],
    }).compile();

    service = module.get<SocialHistoriesService>(SocialHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
