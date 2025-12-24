// src/social-histories/social-histories.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SocialHistory,
  SocialHistorySchema,
} from 'src/schemas/social-history.schema';
import { SocialHistoriesService } from './social-histories.service';
import { SocialHistoriesController } from './social-histories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SocialHistory.name, schema: SocialHistorySchema },
    ]),
  ],
  controllers: [SocialHistoriesController],
  providers: [SocialHistoriesService],
})
export class SocialHistoriesModule {}
