import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type OtpDocument = Otp & Document;

@Schema()
export class Otp {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
