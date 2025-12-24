import { Test, TestingModule } from '@nestjs/testing';
import { SocialHistoriesController } from './social-histories.controller';
import { SocialHistoriesService } from './social-histories.service';

describe('SocialHistoriesController', () => {
  let controller: SocialHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialHistoriesController],
      providers: [SocialHistoriesService],
    }).compile();

    controller = module.get<SocialHistoriesController>(SocialHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
