import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  PointLocation,
  RiskLocation,
  RiskLocationDocument,
} from './schemas/riskLocation.schema';
import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';
import { SearchNearToDTO } from './dtos/search-near-to.dto';

@Injectable()
export class RiskLocationsService {
  constructor(
    @InjectModel(RiskLocation.name)
    private RiskLocationModel: Model<RiskLocationDocument>,
  ) {}

  async create({
    coords,
    risk,
    description,
    created_by,
  }: CreateRiskLocationDTO): Promise<RiskLocationDocument> {
    const createdRiskLocation = new this.RiskLocationModel({
      location: new PointLocation(coords),
      risk,
      description,
      created_by,
    });

    return createdRiskLocation.save();
  }

  async findAll(): Promise<RiskLocationDocument[]> {
    return this.RiskLocationModel.find();
  }

  async findNearTo({
    coords,
    radius,
  }: SearchNearToDTO): Promise<RiskLocationDocument[]> {
    const [lat, long] = coords.split(',').map(Number);

    return this.RiskLocationModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lat, long],
          },
          $maxDistance: Number(radius),
          $minDistance: 10,
        },
      },
    });
  }
}
