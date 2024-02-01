import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  originalUrl: string;
  @Prop({
    required: true,
  })
  shortUrl: string;
  @Prop({
    default: Date.now,
    required: true,
  })
  createdAt: Date;
  @Prop({
    required: true,
  })
  expiresAt: Date;
  @Prop({
    required: true,
  })
  lastUsedAt: Date;
  @Prop({
    default: 0,
    required: true,
  })
  visitsCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
