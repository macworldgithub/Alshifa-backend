import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Disease {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;
}

export type DiseaseDocument = Disease & Document;

export const DiseaseSchema = SchemaFactory.createForClass(Disease);
