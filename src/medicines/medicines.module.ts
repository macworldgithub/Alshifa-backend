// src/medicines/medicines.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicine, MedicineSchema } from 'src/schemas/medicine.schema';
import { MedicineConcept, MedicineConceptSchema } from 'src/schemas/medicine-concept.schema';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineSchema },
      { name: MedicineConcept.name, schema: MedicineConceptSchema },
    ]),
    HttpModule,
  ],
  providers: [MedicinesService],
  controllers: [MedicinesController],
})
export class MedicinesModule {}
