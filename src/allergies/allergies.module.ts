// src/allergies/allergies.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Allergy, AllergySchema } from 'src/schemas/allergy.schema';
import { AllergiesService } from './allergies.service';
import { AllergiesController } from './allergies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Allergy.name, schema: AllergySchema }]),
  ],
  controllers: [AllergiesController],
  providers: [AllergiesService],
})
export class AllergiesModule {}
