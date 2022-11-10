import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type RiskLocationDocument = RiskLocation & Document;

type Coords = {
  lat: number;
  long: number;
};

export class PointLocation {
  type: string;
  coordinates: [number, number] = [0, 0];
  constructor({ lat, long }: Coords) {
    this.coordinates = [lat, long];
    this.type = 'Point';
  }
}

@Schema()
export class RiskLocation {
  @Prop({ type: PointLocation, required: true, index: '2dsphere' })
  location: PointLocation;

  @Prop({ required: true })
  risk: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  created_by: User;
}

export const RiskLocationSchema = SchemaFactory.createForClass(RiskLocation);
