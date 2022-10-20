import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  cellphone: string;

  @Prop({ required: true })
  eula: boolean;

  @Prop({ required: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
