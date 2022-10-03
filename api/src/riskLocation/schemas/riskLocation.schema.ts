import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  radius: number;

  @Prop({ required: true })
  risk: string;

  @Prop({ required: true })
  description: string;
}

export const RiskLocationSchema = SchemaFactory.createForClass(RiskLocation);
