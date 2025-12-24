import { Module } from '@nestjs/common';
import { SocialHistoriesService } from './social-histories.service';
import { SocialHistoriesController } from './social-histories.controller';

@Module({
  controllers: [SocialHistoriesController],
  providers: [SocialHistoriesService],
})
export class SocialHistoriesModule {}
