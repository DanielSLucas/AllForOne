import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RiskLocationDocument = RiskLocation & Document;

@Schema()
export class RiskLocation {
  @Prop(
    raw({
      x: { type: Number },
      y: { type: Number },
    }),
  )
  coords: Record<string, number>;

  @Prop({ required: true })
  radius: number;

  @Prop({ required: true })
  risk: string;

  @Prop({ required: true })
  description: string;
}

export const RiskLocationSchema = SchemaFactory.createForClass(RiskLocation);
