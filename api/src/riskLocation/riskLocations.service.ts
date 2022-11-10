import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  PointLocation,
  RiskLocation,
  RiskLocationDocument,
} from './schemas/riskLocation.schema';
import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';
import { SearchNearToDTO } from './dtos/search-near-to.dto';
import { UsersService } from '../users/users.service';
import { UpdateRiskLocationDTO } from './dtos/update-risk-location.dto';

@Injectable()
export class RiskLocationsService {
  constructor(
    @InjectModel(RiskLocation.name)
    private riskLocationModel: Model<RiskLocationDocument>,
    private usersService: UsersService,
  ) {}

  async create({
    coords,
    risk,
    description,
    created_by,
  }: CreateRiskLocationDTO): Promise<RiskLocationDocument> {
    await this.usersService.findById(created_by);

    return this.riskLocationModel.create({
      location: new PointLocation(coords),
      risk,
      description,
      created_by,
    });
  }

  async update(
    id: string,
    { coords, description, risk }: UpdateRiskLocationDTO,
  ): Promise<RiskLocation> {
    const riskLocation = await this.findById(id);

    const updatePayload = {
      location: new PointLocation(coords),
      risk,
      description,
    };

    const newRiskLocation = {
      _id: riskLocation._id,
      created_by: riskLocation.created_by,
      ...updatePayload,
    };

    await this.riskLocationModel.updateOne(
      {
        _id: id,
      },
      updatePayload,
    );

    return newRiskLocation;
  }

  async delete(id: string): Promise<any> {
    await this.findById(id);

    await this.riskLocationModel.deleteOne({
      _id: id,
    });

    return;
  }

  async findById(id: string): Promise<RiskLocationDocument> {
    const riskLocation = await this.riskLocationModel.findOne({
      _id: id,
    });

    if (!riskLocation) throw new NotFoundException('Risk Location not found');

    return riskLocation;
  }

  async findAll(): Promise<RiskLocationDocument[]> {
    return this.riskLocationModel.find();
  }

  async findNearTo({
    coords,
    radius,
  }: SearchNearToDTO): Promise<RiskLocationDocument[]> {
    const [lat, long] = coords.split(',').map(Number);

    return this.riskLocationModel.find({
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
