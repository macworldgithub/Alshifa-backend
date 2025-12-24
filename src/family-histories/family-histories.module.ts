// src/family-histories/family-histories.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FamilyHistory,
  FamilyHistorySchema,
} from 'src/schemas/family-history.schema';
import { FamilyHistoriesService } from './family-histories.service';
import { FamilyHistoriesController } from './family-histories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FamilyHistory.name, schema: FamilyHistorySchema },
    ]),
  ],
  controllers: [FamilyHistoriesController],
  providers: [FamilyHistoriesService],
})
export class FamilyHistoriesModule {}
