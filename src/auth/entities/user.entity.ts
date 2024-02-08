import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  @Prop({ type: String, unique: true })
  email: string;
  @Prop({ type: String, select: false })
  password: string;
  @Prop({ type: String })
  fullName: string;
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
