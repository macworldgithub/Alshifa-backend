import { Test, TestingModule } from '@nestjs/testing';
import { FamilyHistoriesController } from './family-histories.controller';
import { FamilyHistoriesService } from './family-histories.service';

describe('FamilyHistoriesController', () => {
  let controller: FamilyHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyHistoriesController],
      providers: [FamilyHistoriesService],
    }).compile();

    controller = module.get<FamilyHistoriesController>(FamilyHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
