// src/schemas/social-history.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class SocialHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Visit', required: true })
  visit: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  socialType: string;

  @Prop({ required: true })
  socialDescription: string;

  @Prop({ required: true })
  quantity: string;
}

export type SocialHistoryDocument = SocialHistory & Document;

export const SocialHistorySchema = SchemaFactory.createForClass(SocialHistory);
