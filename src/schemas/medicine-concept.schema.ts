// src/schemas/medicine-concept.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MedicineConcept {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  termType: string;

  @Prop({ required: true, unique: true })
  rxcui: string;
}

export type MedicineConceptDocument = MedicineConcept & Document;

export const MedicineConceptSchema = SchemaFactory.createForClass(MedicineConcept);