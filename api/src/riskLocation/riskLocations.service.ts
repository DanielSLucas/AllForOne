import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  RiskLocation,
  RiskLocationDocument,
} from './schemas/riskLocation.schema';
import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';

@Injectable()
export class RiskLocationsService {
  constructor(
    @InjectModel(RiskLocation.name)
    private RiskLocationModel: Model<RiskLocationDocument>,
  ) {}

  async create(
    createRiskLocationDTO: CreateRiskLocationDTO,
  ): Promise<RiskLocationDocument> {
    const createdRiskLocation = new this.RiskLocationModel(
      createRiskLocationDTO,
    );
    return createdRiskLocation.save();
  }

  async findAll(): Promise<RiskLocationDocument[]> {
    return this.RiskLocationModel.find();
  }
}
