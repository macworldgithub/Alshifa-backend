// src/schemas/allergy.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Allergy {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Visit', required: true })
  visit: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  allergyType: string;

  @Prop({ required: true })
  allergySeverity: string;

  @Prop({ required: true })
  allergenCode: string;

  @Prop({ required: true })
  allergenReaction: string;

  @Prop({ required: true })
  onsetDate: string;
}

export type AllergyDocument = Allergy & Document;

export const AllergySchema = SchemaFactory.createForClass(Allergy);
