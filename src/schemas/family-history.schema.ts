// src/schemas/family-history.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class FamilyHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Visit', required: true })
  visit: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  relationship: string;

  @Prop({ type: [String], required: true })
  conditions: string[];
}

export type FamilyHistoryDocument = FamilyHistory & Document;

export const FamilyHistorySchema = SchemaFactory.createForClass(FamilyHistory);
